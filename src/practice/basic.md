# 面试题复盘

## react的setState是同步还是异步
异步的，因为需要避免每次setState都去渲染视图，所以在一个渲染周期内会把多次setState的数据变更缓存起来，在最后再执行render

## 什么是高阶组件，请举例说明
接收一个组件并返回一个新的组件，就是对传入的组件进行功能性的包装或增强都算高阶组件

## 解释一下原型链
每个对象都有自己的原型，原型是一个对象，那么原型上也有他自己的原型，像这样无限循环直到Object，而Object的原型是空，这样的话看似就是一个链状的结构就叫原型链

## instanceOf原理
就是利用了原型链来检查
```javascript
const myInstanceOf = (origin, Father) => {
    let proto = origin.__proto__;
    while(true) {
        if (proto === null) {
            return false;
        }
        if (proto === Father.prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
};
```

## call、apply、bind的作用及区别
都是用来改变函数this指向的，只不过是传入参数和返回值有区别
```javascript
// call
Function.prototype.myCall = function(origin, ...args) {
    const fnName = Symbol('fn');
    origin[fnName] = this;
    const res = origin[fnName](...args);
    delete origin[fnName];
    return res;
}
// apply
Function.prototype.myApply = function(origin, args) {
    return this.myCall(origin, ...args);
}
// bind
Function.prototype.myBind = function(origin, ...args) {
    return function(...$args) {
        return this.myApply(origin, [...args, ...$args]);
    }
}
```

## position有哪些值，作用分别是什么
- relative: 相对自己定位
- absolute: 相对父元素为`relative`、`absolute`、`fixed`定位
- fixed: 相对视口定位
- sticky: `relative`、`fixed`混合，常用来实现元素吸顶，有兼容问题
- static: 默认定位

## 重排和重绘是什么，有什么区别
重排: 会导致当前盒子内的元素全部重新计算位置，重新渲染
重绘: 就是元素本身的样式改变，比如背景色的变更
所以说重拍一定导致重绘，重绘不一定导致重拍，项目中尽量少的去触发重拍

## 实现 add(1)(2)(3)，函数柯里化
```javascript
// 方式一
const curry = (initValues) => {
    let result = initValues;
    function exec(fn) {
        result = fn(result);
        return exec
    };

    exec.use = exec;

    exec.result = () => result;

    return exec;
}
const res = curry(10)(res => res++)(res => res * 10);
console.log('res: ', res);
// 方式二
const compose = initValue => (...fnArr) => {
    return fnArr.reduce((result, next) => {
        result = next(result);
        return result;
    }, initValue);
}
const res2 = compose(10)(res => res * 2, res => res * 3);
console.log('res2: ', res2);
```

## 同步任务、宏任务、微任务执行顺序
同步任务 => 微任务 => 宏仁务

## EventLoop是什么?
js执行代码的时候会先执行同步代码，碰到异步代码时会先把异步代码放到异步执行队列中，
当同步任务执行完毕后，回去异步执行队列中是否有执行完毕的任务，有的话执行回调，没有的话
主线程会不断重复这个操作，直到异步队列中任务执行完毕，这种行为称为事件循环，EventLoop

## this指向问题
谁执行指向谁，否则指向window，严格模式下就是undefined，作为构造函数执行的话指向自己

## Vue响应式原理
```html
<div id="app">
    <h1 v-text="value"></h1>
    <h1 v-text="msg"></h1>
    <input v-model="value" />
    <button v-click="handleClick">click</button>
</div>
<script>
    class Watcher{
        constructor(dom, exp, data, name) {
            this.$dom = dom;
            this.$exp = exp;
            this.$data = data;
            this.$name = name;
            this.update();
        }
        update() {
            this.$dom[this.$exp] = this.$data[this.$name];
        }
    }
    class Vue{
        constructor(options) {
            const {el, data, methods} = options;
            this.$root = document.querySelector(el);
            this.$data = data();
            this.$methods = methods;
            this.$observer = {};
            this.compile(this.$root);
            this.observer(this.$data);
        }
        observer(data) {
            const that = this;
            for (let key in data) {
                let value = data[key];
                Object.defineProperty(data, key, {
                    get() {
                        return value;
                    },
                    set(newVal) {
                        if (value !== newVal) {
                            value = newVal;
                            that.$observer[key]
                                .forEach(watcher => watcher.update());
                        }
                    }
                });
            }
        }
        compile(dom) {
            const that = this;
            if (dom.children) {
                Array.from(dom.children).forEach($dom => {
                    if ($dom.children) {
                        that.compile($dom);
                    }
                    if ($dom.hasAttribute('v-text')) {
                        const name = $dom.getAttribute('v-text');
                        if (!that.$observer[name]) {
                            that.$observer[name] = [];
                        }
                        that.$observer[name].push(new Watcher(
                            $dom,
                            'innerHTML',
                            that.$data,
                            name
                        ));
                    }
                    if ($dom.hasAttribute('v-model')) {
                        const name = $dom.getAttribute('v-model');
                        const nodeName = $dom.nodeName;
                        if (nodeName === 'INPUT') {
                            if (!that.$observer[name]) {
                                that.$observer[name] = [];
                            }
                            that.$observer[name].push(new Watcher(
                                $dom,
                                'value',
                                that.$data,
                                name
                            ));
                            $dom.addEventListener('input', e => {
                                const value = e.target.value;
                                that.$data[name] = value;
                            })
                        }
                    }
                    if ($dom.hasAttribute('v-click')) {
                        const name = $dom.getAttribute('v-click');
                        $dom.addEventListener('click', e => {
                            const method = that.$methods[name];
                            method.call(that.$data, e);
                        });
                    }
                });
            }
        }
    }
    new Vue({
        el: '#app',
        data() {
            return {
                value: 'hello world',
                msg: 'en?'
            }
        },
        methods: {
            handleClick() {
                this.msg = `${+new Date()}`;
            }
        }
    });
</script>
```

## vuex原理
全局创建一个store,store中分为几个模块
state: 定义的数据
mutations: 修改state的函数
actions: 处理异步操作的函数，用来派发actions
getters: 类似computed
每个处理函数内部都会修改当前的this指向，指向当前组件实例
然后在Vue实例初始话时将这个store挂载到组件上
mapState, mapMutations, mapActions, mapGetters其实就是将
store中定义的属性，函数混入到组件的options中

## 实现一个瀑布流
```html
<style>
    .container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 10px;
        width: 100%;
    }
    img {
        width: 1005;
    }
</style>
```

## 前端路由原理(history、hash模式)
- hash
监听hashchange事件动态渲染，有#号，页面刷新的时候没有问题，但是会影响锚点的使用
- history
新增了popstate事件，可以监听history.go, history.back事件；新增了history.pushState、history.replaceState来改变路由，可以监听事件来动态渲染。好处是没有#号，而且路由更好看了，但是页面刷新的时候会提示没有页面404，所以需要后端来多处理一下，然后不影响锚点的使用

## 全场景的深拷贝
```javascript
const set = new Set();
set.add({a: 'a1'});
set.add({b: 'b1'});
set.add({c: 'c1'});
const map = new Map();
map.set('a', 'aa');
map.set('b', 'bb');
map.set('c', 'cc');
const origin = {
    a: 'a',
    b: 'b',
    c: {
        c1: 'c1',
        c2: new Date(),
        c3: [1, {c31: 'c31', c32: 'c32'}, 3],
        c4: 'c4'
    },
    d: [1, 2, 3],
    f: Symbol('f'),
    g: set,
    h: map,
    i: 'i'
};
const cloneDeep = target => {
    const type = Object.prototype.toString.call(target);
    switch (type) {
        case '[object Object]':
            return Object.keys(target).reduce((result, key) => {
                const value = target[key];
                result[key] = cloneDeep(value);
                return result;
            }, {});
        case '[object Date]':
            return new target.constructor();
        case '[object Array]':
            return target.reduce((result, item) => {
                result.push(cloneDeep(item));
                return result;
            }, []);
        case '[object Set]':
            return [...target].reduce((result, item) => {
                result.add(cloneDeep(item));
                return result;
            }, new Set());
        case '[object Map]':
            const $map = new Map();
            for(let entry of target.entries()) {
                const [key, value] = entry;
                $map.set(key, value);
            }
            return $map;
        default:
            return target;
    }
};
const newObj = cloneDeep(origin);
console.log(origin, newObj);
```

## redux、react-redux实现原理
redux借助了发布订阅的设计模式，订阅视图更新，在派发action时自动更新视图，
react-redux借助了react的context，封装成了两个高阶组件，provider负责提供store数据，connect则是作为了redux和react的桥梁, 负责格式化mapStatetoProps和mapDispatchToProps并作为props注入到组件中

## axios cancelToken实现原理
原理就是将promise的resolve控制权分离，生成一个promise注入到axios实例中，然后在封装ajax的promise中进行拦截，如果用户手动cancel了，那么就是手动执行了resolve,ajax promise的promise结束执行，并且同时abort掉请求

## promise实现原理
```javascript
class MyPromise{
    constructor(fn) {
        this.PENDING = Symbol('PENDING');
        this.FULFIELD = Symbol('FULFIELD');
        this.REJECT = Symbol('REJECT');
        this.value = null;
        this.reason = null;
        this.status = this.PENDING;
        this.resolveTaskList = [];
        this.rejectTaskList = [];
        const resolve = value => {
            this.value = value;
            this.status = this.FULFIELD;
            this.resolveTaskList.forEach(exec => exec());
        };
        const reject = reason => {
            this.reason = reason;
            this.status = this.REJECT;
            this.rejectTaskList.forEach(exec => exec());
        };
        try {
            fn(resolve, reject);
        }
        catch(err) {
            reject(err);
        }
    }
    then(onFulfiled, onReject) {
        const that = this;
        return new MyPromise((resolve, reject) => {
            const resolveTask = () => {
                const x = onFulfiled(that.value);
                x instanceof MyPromise
                    ? x.then(resolve, reject)
                    : resolve(x);
            };
            const rejectTask = () => {
                const x = onReject(that.reason);
                x instanceof MyPromise
                    ? x.then(resolve, reject)
                    : reject(x);
            };
            if (that.status === that.PENDING) {
                that.resolveTaskList.push(resolveTask);
                that.rejectTaskList.push(rejectTask);
            }
            if (that.status === that.FULFIELD) {
                resolveTask();
            }
            if (that.status === that.REJECT) {
                rejectTask();
            }
        });
    }
    static resolve(value) {
        return new MyPromise(resolve => resolve(value));
    }
    static reject(reason) {
        return new MyPromise((_resolve, reject) => reject(reason));
    }
    catch(exector) {
        return this.then(null, exector);
    }
    finally(exector) {
        return this.then(
            value => new MyPromise(exector).then(() => value),
            reason => new MyPromise(exector).then(() => {
                throw reason;
            })
        );
    }
    static all(taskList = []) {
        return new MyPromise((resolve, reject) => {
            const result = [];
            let count = 0;
            taskList.forEach((task, index) => {
                task.then(res => {
                    result[index] = res;
                    count++;
                    if (count === taskList.length) {
                        resolve(result);
                    }
                });
            });
        });
    }
}
const p1 = new MyPromise(resolve => {
    setTimeout(() => {
        resolve('aaa');
    }, 1000);
});
const p2 = new MyPromise(resolve => {
    setTimeout(() => {
        resolve('bbb');
    }, 2000);
});
const p3 = new MyPromise(resolve => {
    setTimeout(() => {
        resolve('ccc');
    }, 3000);
});
MyPromise.all([p1, p2, p3]).then(res => {
    console.log('res: ', res.join(','));
});
```

## flex:1 是哪几种属性的简写?各个属性都有什么用?
- flex-shrink： 0 当外边不够内部宽度时，根据这个比例进行缩小，0就是不缩小
- flex-grow: 1 当外边超出内部宽度时，根据这个比例进行放大
- flex-basis: auto 当前元素在flex中的宽度

## redux 有哪些原则
- store唯一
- store中的数据时只读的，禁止外部修改数据
- 只有派发action才可以修改store的数据

## es5实现继承
```javascript
function Father(name, age) {
    this.name = name;
    this.age = age;
}
Father.prototype.getInfo = function() {
    return {name: this.name, age: this.age, ee: 'ee'};
}
function Son(...args) {
    Father.apply(this, args);
}
Son.prototype = new Father();
const son = new Son('ff', 30);
console.log('son: ', son);
```

## CSS选择器有哪些
标签、id、class、伪类、属性、全局选择器

## 说下事件模型
```javascript
const root = document.querySelector('#root');
root.onclick = e => {

};
root.addEventListener('click', e => {

});
<div onclick="handleClick"></div>
root.attachEvent('click', e => {

});
```
事件捕获 document => dom 从上至下，依次检查是否触发，触发则执行。
事件冒泡 dom => document 事件触发后从下至上冒泡，依次检查是否触发，触发则执行。

## 如何减少白屏的时间，如何优化首屏加载?(不考虑SSR)
cdn加速
http缓存 二次加载加速
js css 压缩
图片压缩, 加载优化
代码层级上，减少冗余代码

## 判断链表是否有环
```javascript
const isRange1 = chain => {
    let head = chain.head;
    const set = new Set();
    while(head.next) {
        if (set.has(head.value)) {
            return true;
        }
        set.add(head.value);
        head = head.next;
    }
    return false;
};
const isRange2 = chain => {
    let slow = chain.head;
    let fast = chain.head;
    if (!fast.next || !slow.next.next) {
        return false;
    }
    while(head.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};
```


## 实现一个发布订阅
```javascript
class Observer{
    constructor() {
        this.observer = {};
    }

    addListener(type, exector) {
        if (!this.observer[type]) {
            this.observer[type] = [];
        }
        this.observer[type].push(exector);
    }

    emit(type) {
        if (!this.observer[type]) {
            return;
        }
        this.observer[type].forEach(exector => exector());
    }

    remove(type) {
        delete this.observer[type];
    }
}
const observer = new Observer();
observer.addListener('test', () => {
    console.log('test!!');
});
observer.emit('test');
```

## react为什么需要合成事件
抹平浏览器差异，统一捕获事件优化性能

## 为什么有时react两次setState，只执行一次
不可能每次setState都render，如果是这样的话会十分消耗性能，所以react会在一次渲染周期内把变更的数据缓存起来，等到最后再统一渲染，但是有时候这个机制会失效，比如在settimeout中setState

## react16生命周期和react15的区别，为什么要这样做?
**react15生命周期**
<!-- constructor
componentWillMount
componentDidMount
componentWillReviceProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
render
componentWillUnMount -->
- 初始化
constructor => componentWillRevideProps => compnentWillMount => render => componentDidMount
- 更新时
componentWillReviceProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate
- 卸载时
componentWillUnMount
**react16生命周期**
<!-- constructor 初始化数据
static getDeviredStateFromProps 从props中派生state,静态函数访问不到this
shouldComponentUpdate 返回布尔值，用户控制是否应该更新
render
getSnapeshotBeforeUpdate 更新前的处理，返回值可以作为第三个参数传给DidUpdate
更新
componentDidMount
componentDidUpdate
componentWillUnMount -->
初始化
constructor => getDerviedStateFromProps => render => componentDidMount
更新时
getDerviedStateFromProps => shouldComponentUpdate
 => render => getSnapeShotBeforeUpdate => componentDidUpdate
卸载
componentDidUnMount
额外的
componentDidCatch

为了配合React16的Fiber架构的异步渲染机制，强制性去掉了componentWillMount、componentWillUpdate确保视图安全，也确保生命周期更加纯粹

## react发起网络请求应该在哪个生命周期中?
componentDidUpdate

## react如何处理异常
在组件中可以做一个全局的高阶组件，在组件外可以使用bom的window.onerror来统一获取
```jsx
class ErrorBoundary extends React.Component{
    construct(props) {
        super(props);
        this.state = {
            error: false,
            info: null
        };
    }

    componentDidCatch(err, info) {
        if (err) {
            this.setState({error: true, info: info.stack});
        }
        else {
            this.setState({error: false, info: null});
        }
    }

    render() {
        const {error, info} = this.state;
        if (error) {
            return <h1>{info}</h1>;
        }
        return (
            <>{this.props.children}</>
        );
    }
}
```

## 闭包的作用域和原理
函数被执行完毕之后，它的内部作用域会被垃圾回收机制回收，但是闭包可以阻止这种事情发生。一般来说，回调函数都算闭包的应用。

## 0.1+0.2为什么不等于0.3
个人理解啊，1/3在十进制中是无限不循环小数，转到二进制后也是一个无限不循环的，但是数字存储长度是有限的，所以就是0.3000004这种失精小数

## node环境中path.resolve和path.join的区别
path.resolve会解析并返回一个绝对路径
path.join就是两个路径的拼接

## async/await常用吧，说说它的实现原理?
async/await就是generator的语法糖，generator可以暂停并手动执行函数，那么就可以利用这个特性在每个异步函数resolve后执行next方法，就是做了一个自动的异步执行
异步处理的四个历史阶段: callback => promise => generator => async/await

## 防抖/节流
- 节流
```javascript
const throttle = (fn, delay) => {
    let timer = null;
    return () => {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn();
            clearTimeout(timer);
            timer = null;
        }, delay);
    };
};

const exector = throttle(() => {
    console.log('throttle');
}, 1000);
```

- 防抖
```javascript
const shaking = (fn, delay) => {
    let timer = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
};

const exector = shaking(() => {
    console.log('shaking');
}, 1000);
```