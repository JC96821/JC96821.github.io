## 模拟题十一

### 说下事件模型

**事件监听**
```javascript
// 实现一
<button onclick="handleClick()">clicked</button>
// 实现二
const btn = document.querySelector('#btn');
btn.onclick = () => {
    // do something
};
// 实现三
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    // do something
});
// 实现四(仅IE)
const btn = document.querySelector('#btn');
btn.attachEvent('click', () => {
    // do something
});
```
**事件捕获和冒泡**
> 分为三个阶段，事件捕获，由父节点向子节点递进;到达目标元素时，做事件处理;事件冒泡，子节点向父节点递进;应用, 父节点可以绑定多个节点事件

