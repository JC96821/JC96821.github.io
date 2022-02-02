---
title: cancel token实现原理
date: 2022-01-20
tags:
  - axios
  - cancel token
---

## cancel token实现原理

> 是`promise`执行任务的分离控制，将resolve能力抛给外部控制，当用户执行`cancel`方法时，`resolve`掉`axios`中的`promise`任务并`abort`请求。

```javascript
var Cancel = require('./Cancel');

/**
 * @class
 * @param {Function} executor 传入的执行函数，用于获取获取promise的resolve能力
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * 返回一个对象
 * @returns token axios中会判断是否有这个token,有的话则插入token提供的promise任务
 * @returns cancel 暴露的token => promise => resolve方法，用于用户手动终端promise任务
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
```