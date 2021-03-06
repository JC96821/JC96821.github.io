## 模拟题五

### 全场景的深拷贝

```javascript
// type tag
const objTag = '[object Object]';
const arrTag = '[oject Array]';
const dateTag = '[object Date]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
/**
 * clone function
 * 写这几种类型就够，当然实际场景下根据需求扩展
*/
const cloneDeep = target => {
    const type = Object.prototype.toString.call(target);
    switch (type) {
        // 对象类型
        case objTag:
            return Object.keys(target).reduce((result, key) => {
                const value = target[key];
                result[key] = cloneDeep(value);
                return result;
            }, {});
        // 数组类型
        case arrTag:
            return target.reduce((result, key) => {
                const value = target[key];
                result[key] = cloneDeep(value);
                return result;
            }, []);
        // 日期类型
        case dateTag:
            return new target.constructor(target);
        // set集合
        case setTag:
            const cloneSet = new Set();
            return [...target].reduce((result, item) => {
                result.add(item);
                return result;
            }, cloneSet);
        // map映射表
        case mapTag:
            const cloneMap = new Map();
            target.forEach((item, key) => {
                cloneMap.set(key, item);
            });
            return cloneMap;
        // 其他默认为基本类型返回自己就行
        default:
            return target;
    }
};

// 模拟使用场景👌
// new map
const g = new Map();
g.set('a', 'aaa');
g.set('b', 'bbb');
// new set
const h = new Set([1, 2, 3]);
// object
const test = {
    a: 'a',
    b: {
        b1: 'b1',
        b2: {
            b21: 'b21',
            b22: 'b22',
            b23: {
                b231: 'b231',
                b232: 'b232'
            }
        },
        b3: 'b3'
    },
    c: 1000,
    d: Error('this is a error'),
    e: [1, 2, 3],
    f: new Date('2022-12-12'),
    g,
    h,
    i: false
};
const obj = cloneDeep(test);
// 测试一下，木有问题
obj.h.add(999);
obj.i = true;
console.log('obj: ', obj, test);
```