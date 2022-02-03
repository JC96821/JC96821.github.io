## 模拟题十一

### async/await常用吧，说说它的实现原理?

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

### React合成事件和原生事件的区别

React合成事件是指将原生事件合成一个React事件，目的是要实现全浏览器的一致性，抹平
不同浏览器之间的差异性
在React中并不是将事件直接绑定在dom上，而是做了一层代理，将事件交给代理函数来处理。
代理函数会监听document的所有事件，当事件触发并冒泡到至document处时，React将事件交给
中间代理层做事件合成处理并分发给指定函数执行

### React处理异常

**组件内异常使用高阶组件统一处理**
```jsx
import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {error: false};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        error ? this.setState({error: true, info}) : this.setState({error: false});
    }

    render() {
        const {error, info} = this.state as {error: boolean, info?: ErrorInfo};
        return !error ? this.props.children : <p>{info?.componentStack}</p>;
    }
}

export default ErrorBoundary;
```

**组件外异常可以使用`window.onerror`统一捕获**

### 浏览器缓存策略

分三个部分说: DNS缓存、CDN缓存、HTTP缓存

- DNS缓存
三步走，先从浏览器缓存中查找当前域名对应的ip，没有的话去电脑磁盘的host文件中找，再没有的话就回去本地DNS服务器中查找，最后如果也没有的话就会去跟DNS服务器中找

- CND缓存
大致分为两步，从浏览器内存中 + DNS服务商的http缓存策略
降低跨地域访问加载时长，减轻服务器压力

- HTTP缓存
强缓存 + 协商缓存
**强缓存: 浏览器直接从本地缓存中取数据，不去请求服务器**

- Expires/Cache-Control，其中Cache-Control优先级更高
- Cache-Control属性:
  - max-age: 单位是秒，缓存时间，如果到时间会发送请求验证内容是否修改过(协商缓存)，修改过返回200，没修改过返回304
  - no-store: 浏览器不使用缓存，直接请求服务器
  - no-cache: 浏览器和缓存服务器都不缓存资源
  - public:  浏览器和缓存服务器都可以缓存页面信息
  - private: 服务器响应的信息只能被单个用户缓存，就是不能用代理服务器缓存
- Expires: GMT格式的时间字段，到期时间，超过这个时间后缓存的资源作废。可以设置0或者负数，此时不用缓存直接请求数据

**协商缓存：还是在本地缓存，但是由服务端判断是否使用本地缓存**

- etag/if-none-match

`etag/if-none-match`都是该资源的唯一标识字符串。第一次请求的时候，响应头会返回`etag`，由服务端生成，再次请求的时候会将上次请求返回的`etag`发送给服务器作比较，这个字段就是`if-none-match`，塞在请求头里。最后服务端会做比较

- 相同: 返回`304 NotModified`
- 不相同: 返回200或者其他，说明资源已经发生了变化，并且会把新生成的`etag`塞在响应头返回给浏览器

***注意***: `etag`值发生变化不一定就是自愿发生变化，它的值由后端算法决定，可能是修改时间+一段hash值

- last-modified/if-modified-since
远离跟上边差不多，只不过上边是用唯一字符串做比对，这里用GMT格式的时间做比对。同样的，请求的时候后端返回一个时间在响应头里`last-modified`，再次发起请求的时候浏览器会把上次服务端返回的时间在请求头中发给服务器，服务器会做一下比对

- 相同: 返回状态码`304 Not Modified`，直接使用本地缓存
- 不相同: 返回200或者其他，说明资源变化了，并且会返回一个新的`last-modified`给浏览器

- 两者区别

`last-modified/if-modified-since`这一对的时间都是精准到秒，如果一秒钟内资源修改过多次，那么就资源内容只会变更一次。

所以`etag/if-none-match`泛用性更强，两者可以同时使用，但是服务器会优先校验`etag/if-none-match`

### 什么是BFC，解决了什么问题，怎么触发

单独形成一个独立空间，内部布局不受外部影响

可以触发BFC的属性如下:
- overflow: hidden
- position: absolute
- position: fixed
- display: flex
- display: inline-block

解决的问题
- 浮动元素父空间高度塌陷
- 两栏布局时有一侧设置了浮动，导致另一侧文字覆盖到浮动侧下面