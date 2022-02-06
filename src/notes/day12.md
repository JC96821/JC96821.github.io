## 模拟题十二

### 实现一个斐波那契数列

形如1, 1, 2, 3, 5, 8, 13, 21, 34, 55
值等于前两个值之和`(n项) = (n-1项) + (n-2项)`
```javascript
// 斐波那契数列
const fibonaci = n => {
    let slow = 1;
    let fast = 1;
    for (let count = 1; count < n; count++) {
        [slow, fast] = [fast, slow + fast];
        console.table({
            slow,
            fast
        });
    }
    return fast;
};
```

### 异步加载图片
```javascript
const loadImg = async (url: string) => {
    const img = document.createElement('img');
    img.src = url;
    return new Promise(resolve => {
        img.onload = e => {
            resolve(e);
        }
    });
};

loadImg('https://img-blog.csdnimg.cn/img_convert/402dfc6166ad0291cdacf31e95e2d4a0.png')
.then(res => {
    console.log('res: ', res);
});
```