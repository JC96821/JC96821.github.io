## 模拟题七

### react的事件机制，为什么需要事件机制
> 没有绑在真实的dom上，而是通过事件代理的方式，将所有事件都绑定在`document`上，在组件挂载和销毁的时候统一订阅和销毁，抹平了浏览器之间的兼容问题。

### es5实现继承

```javascript
// 先声明父类的构造函数
function Father (name, age) {
    this.name = name;
    this.age = age;
}
Father.prototype.log = function() {
    console.log(this.name, this.age);
};

// 实现继承
function Son (...args) {
    Father.apply(this, args);
}
Son.prototype = Father.prototype;

// 模拟使用场景👌
const son = new Son('张三', 30);
son.log();
```

### css选择器有哪些

- 全局选择器: *
- id选择器: #app
- class选择器: .app
- 标签选择器: h1
- 子选择器: .app > .child
- 伪类选择器: .app:nth-child(n)
- 属性选择器: input[type=text]
- 兄弟选择器: .app~h1

### redux有哪些原则

- 单一数据源，store唯一
- store中的state只读，只有派发`action`后才能修改
- 需要编写`reducer`来派发`action`，用来描述如何改变`action`，方便追踪数据

### 实现一个链表(单向链表😀)

```javascript

```