## 模拟题十

### 实现发布订阅

``` javascript
class Observer{
    constructor() {
        this.observer = {};
    }
    listener(type, fn) {
        if (!type ||  typeof fn !== 'function') {
            return;
        }
        if (!this.observer[type]) {
            this.observer[type] = [];
        }
        this.observer[type].push(fn);
    }
    emit(type) {
        if (!type || !this.observer[type]) {
            return;
        }
        this.observer[type].forEach(fn => fn());
    }
    remove(type) {
        if (!type) {
            return;
        }
        delete this.observer[type];
    }
}

// 模拟使用场景👌
const obserber = new Observer();
const addListener = () => {
    obserber.listener('t1', () => {
        console.log(`t1: ${+new Date()}`);
    });
};
const handleEmit = () => {
    obserber.emit('t1');
};
```

### React15和React16的区别

**React15：9个生命周期**
- construct: 数据初始化
- componentWillReceiveProps: 初始化、props变更时触发
- shouldComponentUpdate: 组件更新时拦截方法，可根据state和props判定是否该渲染，优化性能
- componentWillMount: 初始化渲染前
- componentDidiMount: 初始化渲染后
- componentWillUpdate: 组件更新前
- componentDidUpdate: 组件更新后
- render: 生成虚拟dom
- componentWillUnMount: 组件将卸载

> 初始化时执行顺序: construct => componentWillMount => render => componentDidMount

> 更新后执行顺寻: componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidMount

**React16**
- construct: 组件初始化，初始化数据
- getDerivedStateFromProps：代替WillMount和ReviceProps生命周期，静态方法，访问不了this组件实- 例，在这里做props数据的派发
- getSnapShotBeforeUpdate: 可以访问更新前的组件状态和dom状态并且可以返回参数给DidUpdate
- shouldComponentUpdate: 组件更新时拦截方法，可根据state和props判定是否该渲染，优化性能
- componentDidMount: 初始化渲染后
- componentDidUpdate: 组件更新后
- render: 生成虚拟dom
- componentWillUnMount: 组件卸载前，做定时器，事件监听的卸载

> 初始化时执行顺序: construct => getDerivedStateFromProps => render => componentDidMount

> 更新时执行顺寻: getDerivedStateFromProps => shouldComponentUpdate => render => getSnapShotBeforeUpdate => componentDidUpdate


### React16为什么要废弃 componentWillMount、componentWiiReveiceProps、componentWillUpdate这三个生命周期

> 其实也没有完全废弃，只是不在建议使用，在开发环境会报错，代替的生命周期是`UNSAFE_componentWillMount`、`UNSAFE_componentWiiReveiceProps`、`UNSAFE_componentWillUpdate`

> 主要是配合React16的Fiber架构带来的异步渲染机制，因为js是单线程的，所以Reacr16是允许组件在更新时中断、重新执行的，避免了render方法在做diff或其他js处理时造成页面卡顿。这三个被废弃的生命周期如果不合理使用会不合理地重复执行，容易造成bug，比如ReveiceProps中更新状态造成组件死循环。

### 为什么有时react两次setState，只执行一次

> 为了优化性能，`react`不会在每次`setState`时都触发`render`，而是将数据的变更缓存起来，而是在渲染周期结束时统一`render`，在类组件中可以使用`settimeout`中更新组件或者使用`this.forceUpdate()`

