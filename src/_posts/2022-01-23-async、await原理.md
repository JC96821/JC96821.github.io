---
title: async、await原理
date: 2022-01-23
tags:
  - Promise
  - JavaScript
  - generator
  - async/await
---

`async/await`是`generator`的语法糖，本质上是利用了`generator`的暂停手动执行的特性

```javascript
const getData = value => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value * 10);
        }, 1000);
    })
};

function* execFn(x) {
    const res1 = yield getData(x);
    console.log('res1: ', res1);
    const res2 = yield getData(res1);
    console.log('res2: ', res2);
    const res3 = yield 3 * 4;
    console.log('res3: ', res3);
    return res3;
}

const asyncExector = (gen, ...args) => {
    const exec = gen(...args);
    const firstResult = exec.next();
    const range = value => {
        if (value instanceof Promise) {
            value.then(promiseResult => {
                const result = exec.next(promiseResult);
                range(result.value);
            });
        }
        else if(value) {
            const res = exec.next(value);
            range(res.value);
        }
        else {
            exec.next(value);
        }
    };
    range(firstResult.value);
};
asyncExector(execFn, 1);
```