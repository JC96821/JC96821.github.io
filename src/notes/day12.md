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