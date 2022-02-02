## 模拟题三

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

### promise实现原理

```javascript
class MyPromise {
    /**
     * 定义了三种状态
     * @params PENDING 等待中
     * @params REJECT 发生了异常
     * @params FULFILED 执行完毕
    */
    PENDING = Symbol('PENDING');
    REJECT = Symbol('REJECT');
    FULFIELD = Symbol('FULFIELD');

    /**
     * 构造函数，接受一个函数参数
     * @params exector 执行函数，这个函数也接受两个参数 resolve、reject
    */
    constructor(exector) {
        this.status = this.PENDING; // 当前执行状态
        this.value = null; // resolve的值
        this.reason = null; // reject的值
        this.resolveTaskList = []; // 订阅的resolve事件列表，执行成功时批量执行
        this.reasonTaskList = []; // 订阅的reject事件列表，执行失败时批量执行
        
        /**
         * resolve函数
         * @params value 手动resolve的值
         * @description 批量执行订阅的列表
        */
        const resolve = value => {
            this.status = this.FULFIELD;
            this.value = value;
            this.resolveTaskList.forEach(task => task());
        };

        /**
         * reject函数
         * @params reason 手动reject的值
         * @description 批量执行订阅的列表
        */
        const reject = reason => {
            this.status = this.REJECT;
            this.reason = reason;
            this.reasonTaskList.forEach(task => task());
        };

        // 执行，异常用reject全局捕获
        try {
            exector(resolve, reject);
        }
        catch(err) {
            reject(err);
        }
    }

    /**
     * then函数，接受两个函数参数
     * @params onFulfield resolve的执行函数，函数执行成功时触发
     * @params onReject reject的执行函数，函数执行失败时触发
     * @returns 返回一个MyPromise，用于链式调用.then(xxx).then(xxx)...
    */
    then(onFulfield, onReject){
        const that = this;
        return new MyPromise((resolve, reject) => {
            // resolve函数的内部包装，内部做了类型兼容处理
            const fulfieldTask = () => {
                const x = onFulfield(that.value);
                x instanceof MyPromise
                    ? x.then(resolve, reject)
                    : resolve(x);
            };
            // reject函数的内部包装，也做了类型兼容处理
            const rejectTask = () => {
                const x = onReject(that.reason);
                x instanceof MyPromise
                    ? x.then(resolve, reject)
                    : reject(x);
            };
            // 如果函数没有执行完毕，则将两个执行函数都订阅起来
            if (that.status === that.PENDING) {
                that.resolveTaskList.push(fulfieldTask);
                that.reasonTaskList.push(rejectTask);
            }
            // 如果执行成功，则直接执行包装函数即可
            if (that.status === that.FULFIELD) {
                fulfieldTask();
            }
            // 如果执行失败，也直接执行包装函数
            if (that.status === that.REJECT) {
                rejectTask();
            }
        });
    }

    /**
     * catch异常捕获函数，接收一个执行函数
     * @params fn 异常执行函数，调用链中发生异常时执行
     * @returns MyPromise对象
    */
    catch(fn) {
        return this.then(null, fn);
    }

    /**
     * finally必执行的函数，接受一个执行函数
     * @params fn 执行函数，无论执行成功失败都会先执行这个处理
     * @returns MyPromse对象
    */
    finally(fn) {
        return this.then(
            value => MyPromise.resolve(fn()).then(() => value),
            reason => MyPromise.resolve(fn()).then(() => {throw reason})
        );
    }

    /**
     * resolve静态函数，接收resolve的值
     * @params value 手动resolve的值
     * @returns MyPromise对象
    */
    static resolve(value) {
        return new MyPromise(resolve => resolve(value));
    }

    /**
     * all 并发执行函数，支持MyPromise的并发执行，全执行完毕后返回
     * @params taskList MyPromise执行列表
     * @returns MyPromise对象
    */
    static all(taskList = []) {
        return new MyPromise((resolve, reject) => {
            const result = [];
            let count = 0;
            taskList.forEach((task, index) => {
                if (!task instanceof MyPromise) {
                    result[index] = task;
                    count++;
                    if (count === taskList.length) {
                        resolve(result);
                    }
                }
                else {
                    task.then(res => {
                        result[index] = res;
                        count++;
                        if (count === taskList.length) {
                            resolve(result);
                        }
                    });
                }
            });
        });
    }

    /**
     * race 并发执行函数，支持MyPromise并发执行，只resolve最先执行完毕的任务
     * @params taskList MyPromise执行列表
     * @returns MyPromise对象
    */
    static race(taskList = []) {
        return new MyPromise((resolve, reject) => {
            let done = false;
            taskList.forEach(task => {
                task instanceof MyPromise
                    ? task.then(res => {
                        !done && resolve(res);
                        done = true;
                    })
                    : resolve(task);
            });
        });
    }

    // 模拟使用场景号👌
    const task1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1');
        }, 1000);
    });
    const task2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p2');
        }, 500);
    });
    const task3 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p3');
        }, 2000);
    });
    MyPromise.all([task1, task2, task3]).then(res => {
        console.log('res: ', res);
    });
}
```