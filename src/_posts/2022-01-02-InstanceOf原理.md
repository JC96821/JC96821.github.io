---
title: instanceof实现原理
date: 2012-01-02
tags:
  - 原型链
  - JavaScript
---

## 关于instanceof
**语法**

```javascript
object instanceof constructor
```
用来检测构造函数的原型是否在实例的原型链上

## 实现方式
```javascript
const myInstanceof = (target, origin) => {
    while (target) {
      if (target.__proto__ === origin.prototype) {
        return true
      }
      target = target.__proto__
    }
    return false
  }
```
遍历实例的原型链，找到对应原型返回`true`，反之返回false