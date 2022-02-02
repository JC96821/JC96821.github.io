---
title: call、apply、bind的作用、区别以及实现原理
date: 2012-01-02
tags:
  - JavaScript
---

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