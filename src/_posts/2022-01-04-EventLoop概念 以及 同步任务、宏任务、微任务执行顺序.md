---
title: EventLoop概念 以及 同步任务、宏任务、微任务执行顺序
date: 2012-01-04
tags:
  - eventloop
  - JavaScript
---

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