# Day1
## 模拟题一
### react setState是同步还是异步
> 在普通事件中，如`onClick`中是异步的，不会立即执行结果，多次执行的话只会render一次。

> 在异步中，则会调用多次，每次执行都会render一次。

### 什么是高阶组件，举例说明
> 使用高阶组件主要是逻辑复用的一种处理手段。一个组件做功能复用、强化处理，返回一个新的组件都算是高阶组件。

### 解释一下原型链
> 访问一个对象的属性的时候，会现在当前属性中找一遍，如果没找着，接着会在这个对象的原型对象中找，如果也没有，程序不会死心，会继续在对象的原型对象的原型对象中接着找，直到访问到`Object`对象，而`Object`对象的原型对象是`null`，到这里如果还没找到的话则查找中止，这一系列操作下来就像在一条长链中找东西，所以叫`原型链`。

### instanceof实现原理
> 沿着原型链去查找指定对象，如果被查找对象的某个原型等于这个对象，那么就会返回`true`，否则返回`false`。
```javascript
function myInstanceOf(leftValue, rightValue) {
    const rightPrototype = rightValue.prototype;
    let leftPrototype = leftValue.__proto__;
    while(true) {
        if (leftPrototype === null) {
            return false;
        }
        if (leftPrototype === rightPrototype) {
            return true;
        }
        leftPrototype = leftPrototype.__proto__;
    }
}
```

### typeof实现原理
> js底层存储变量的时候会在机器码地位存储类型信息
- 000： 对象
- 100:  字符串
- 110:  布尔值
- 1:    整数

> `typeof`一般用来判断`number`、`string`、`symbol`、`boolean`、`function`、`undefined`、`object`这7中数据类型，`typeof`不能用来判断一个`object`具体是那种类型，而且不能用来判断`null`。

### new关键字实现原理
``` javascript
function myNew(Constructor, ...args) {
    const obj = {};
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj, args);
    return typeof ret === 'object' ? ret || obj : obj;
};
function Person(name, age) {
    this.name = name;
    this.age = age;
};
const person = myNew(Person, '张三', 30);
console.log(person);
```

### call、apply、bind的作用、区别以及实现原理

都是用来改变`this`指向，只不过是传入参数类别以及返回值有差别。

- call
```javascript
Function.prototype.myCall = function(obj, ...args) {
    const $name = Symbol();
    obj[$name] = this;
    obj[$name](...args);
    delete obj[$name];
};
const obj = {
    name: 'name',
    age: 30
};
function test (params) {
    console.log(this.name, params);
}
test.myCall(obj, {test: 'test'});
```

- apply

```javascript
Function.prototype.myApply = function(obj, args) {
    const $name = Symbol();
    obj[$name] = this;
    obj[$name](...args);
    delete obj[$name];
};
const obj = {
    name: 'name',
    age: 30
};
function test (params) {
    console.log(this.name, params);
}
test.myApply(obj, [{test: 'test'}]);
```

- bind
```javascript
Function.prototype.myBind = function(obj, ...args1) {
    const that = this;
    return function(...args2) {
        that.myApply(obj, [...args1, ...args2]);
    };
};
const obj = {
    name: 'name',
    age: 30
};
function test (params, params2) {
    console.log(this.name, params, params2);
}
test.myBind(obj, {test: 'test'})('fffff');
```

### position有哪些值，作用分别是什么

- static 默认定位
- relative 相对自己定位
- absolute 相对父元素定位
- fixed 相对视口定位
- sticky `relative`和`fixed`的结合，粘性布局中使用，不兼容低版本浏览器

### 重排和重绘是什么，区别
- 重排
重新生成布局，重新排列元素。
局部重排，重新渲染dom内部元素，不影响外界。
- 重绘
元素外观发生改变，没有改变布局，把元素重新渲染一遍。

### 函数柯里化，实现 add(1)(2)(3)

```javascript
function curry(val) {
    let result = val;
    function exec(fn) {
        result = fn(result);
        return exec;
    };
    exec.use = fn => {
        result = fn(result);
        return exec;
    }
    exec.result = () => result;
    return exec;
};
const exec = res => {
    return res + 1;
};
const fn = curry(1).use(exec).use(exec);
console.log(fn.result());
```

### EventLoop概念 以及 同步任务、宏任务、微任务执行顺序

> 每办理完一个业务，柜员就会问当前的客户，是否还有其他需要办理的业务。（检查还有没有微任务需要处理）
而客户明确告知说没有事情以后，柜员就去查看后边还有没有等着办理业务的人。（结束本次宏任务、检查还有没有宏任务需要处理）
这个检查的过程是持续进行的，每完成一个任务都会进行一次，而这样的操作就被称为Event Loop

> 执行顺序是 `同步代码` => `微任务` => `宏任务`

```javascript
setTimeout(_ => console.log(4));

async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(3);
}

main();

console.log(2);

// 结果是
// 1
// 2
// 3
// 4
```

### this指向问题

> 谁执行的指向谁，没有的话就是window，作为构造函数执行的话指向自己