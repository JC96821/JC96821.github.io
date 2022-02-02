## 模拟题六

### 实现瀑布流，多写几种实现方式

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <title></title>
        <style>
            body{
                margin: 0;
            }
            /* grid布局 */
            .container{
                width: 100%;
                column-count: 4;
            }
            img {
                display: block;
                object-fit: contain;
                margin: 10px;
                width: 100%;
            }

            /* flex布局， 缺点较多 */
            /* .container{
                width: 100%;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                height: 100vh;
            }
            img {
                display: block;
                margin: 10px;
                width: calc(100% / 4 - 30px);
            } */

            /* grid布局 */
            /* .container{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                column-gap: 10px;
                width: 100%;
            }
            img {
                width: 100%;
                margin: 10px;
            } */
        </style>
    </head>
    <body>
        <div id="root" class="container"></div>

        <script>
            let img = null;
            const fragement = new Array(30).fill().reduce((fragement, img) => {
                const randomIndex = (Math.random() * 4).toFixed(0);
                img = document.createElement('img');
                img.src = `./assets/pic${randomIndex}.jpg`;
                fragement.appendChild(img);
                return fragement;
            }, document.createDocumentFragment());
            const el = document.querySelector('#root');
            el.appendChild(fragement);
        </script>
    </body>
</html>
```

### cancel token实现原理

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

### axios是xhr的promise封装，那么用xhr实现发一个简单请求?

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    // XHR.readyState == 状态（0，1，2，3，4），而且状态也是不可逆的：
    // 0：请求未初始化，还没有调用 open()。
    // 1：请求已经建立，但是还没有发送，还没有调用 send()。
    // 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
    // 3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
    // 4：响应已完成；您可以获取并使用服务器的响应了。
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('res: ', xhr.responseText);
        }
        else {
            console.log('some error');
        }
    }
    else {
        console.log('pending');
    }
};
xhr.open('POST', '/api/test', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('username=admin&password=root');
```