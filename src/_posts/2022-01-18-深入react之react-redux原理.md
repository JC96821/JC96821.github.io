---
title: redux的实现原理
date: 2022-01-18
tags:
  - react
  - react-redux
  - redux
---

### redux实现原理

**实现**
```javascript
/**
 * 创建store的方法，接受两个参数
 * @params reducer 指令函数
 * @params initState 初始化数据
*/
export const createStore = (reducer, initState) => {
    let state = initState; // store中保存的数据
    const subscribers = []; // 订阅的事件列表，dispatch派发事件时批量执行

    // 订阅事件的方法
    const subscribe = fn => {
        subscribers.push(fn);  
    };

    // 派发方法，用户调用时批量执行订阅的事件
    const dispatch = action => {
        state = reducer(state, action);
        subscribers.forEach(fn => fn());
    };

    // 额外暴露一个获取state数据的方法
    const getState = () => {
        return state;
    };

    return {
        subscribe,
        dispatch,
        getState
    };
};
```

**reducer.js**
```javascript
export const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                num: state.num + 1
            };
        case 'minus':
            return {
                ...state,
                num: state.num - 1
            };
        default:
            return state;
    };
};

export const initState = {
    num: 0
};
```

**main.js**
```javascript
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from './lib/redux';
import { reducer, initState } from './reducer';

// 创建全局store
const store = createStore(reducer, initState);

// 渲染函数
const render = () => ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

// store订阅渲染函数
store.subscribe(render);

// 初始化渲染
render();
```

### react-redux实现原理

**实现**
> 上边`redux`的实现里利用了`subscribe`订阅`ReactDOM.render`的方式来完成数据与视图的绑定，但是这种方式耦合度太高，需要优化; 这里的实现需要导出两个模块: `Provider`组件和`connect`方法，前者用来注入store,后者用来连接react组件, 核心原理就是react的`context`
```jsx
import React from "react";
const context = React.createContext();

// provider组件，这里很简单，只提供了数据注入的能力
export const Provider = ({
    store,
    children
}) => {
    return (
        <context.Provider value={store}>
            {children}
        </context.Provider>
    );
};

/**
 * connect方法，这里是一个闭包，第一个函数传入两个参数
 * @params mapStateToProps 将store的数据转换后导入props
 * @params mapDispatchToProps 将action-type映射为dispatch方法后导入props
 * @returns 处理后连接context.Consumer能力返回一个组件
*/
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => WrapComponent => {
    return () => {
        const [props, updateProps] = useState({});
        const storeRef = useRef();

        const update = () => {
            const store = storeRef.current;
            // 处理store和props的映射关系
            const stateProps = mapStateToProps(store.getState());
            // 处理action-type和props的映射关系
            const dispatchProps = Object.keys(mapDispatchToProps)
                .reduce((result, key) => {
                    const type = mapDispatchToProps[key];
                    result[key] = () => store.dispatch({type});
                    return result;
                }, {});
            updateProps({
                store,
                ...stateProps,
                ...dispatchProps
            });
        };

        /**
         * 初始化时订阅update方法
         * 当dispatch派发事件时会调用update方法，更新注入的props
        */
        useEffect(() => {
            storeRef.current.subscribe(update);
            update();
        }, [storeRef.current]);

        const renderer = store => {
            storeRef.current = store;
            return <WrapComponent {...props} />;
        };

        // 注入组件后返回
        return (
            <context.Consumer>
                {renderer}
            </context.Consumer>
        );
    };
};
```

**使用**
> reducer的定义和上边一样，组件中的用法如下

*main.js*
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from './lib/redux';
import { reducer, initState } from './reducer';
import { Provider } from './lib/react-redux';

const store = createStore(reducer, initState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
*App.js*
```jsx

import { connect } from "./lib/react-redux";

// 子组件1
const Child1 = connect(
  state => state.app,
  {
    addAction: 'add',
    minusAction: 'minus'
  }
)(props => {
  const { num, addAction } = props;
  return (
    <button onClick={addAction}>add counter: {num}</button>
  );
});
// 子组件2
const Child2 = connect(
  state => state.app,
  {
    minusAction: 'minus'
  }
)(props => {
  const { num, minusAction } = props;
  return (
    <button onClick={minusAction}>minus counter: {num}</button>
  );
});
// 父组件
const App = props => {
  const { num } = props;

  return (
    <div>
      <h1>{num}</h1>
      <Child1 />
      <br></br>
      <Child2 />
    </div>
  );
};

export default connect(state => state.app)(App);
```