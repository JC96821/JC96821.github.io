---
title: EventLoop概念 以及 同步任务、宏任务、微任务执行顺序
date: 2012-01-04
tags:
  - eventloop
  - JavaScript
---

> 所有同步任务都在主线程中执行，
主线程之外有一个任务队列，异步任务只要有了执行结果都会把结果放到这个任务队列中，
主线程同步任务执行完毕后会在这个任务队列中去找哪些异步任务执行完毕了，开始执行执行完毕的任务
主线程会不断重复这一步，不断去找哪些异步任务执行完毕。
只要主线程空了就会不断去找异步任务队列中的任务，这个运行机制叫事件循环。

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