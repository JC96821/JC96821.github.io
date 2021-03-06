## 模拟题八

### 实现一个链表

- 单向链表

``` javascript
class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    add(value) {
        const $node = new Node(value);
        if (!this.head) {
            this.head = $node;
        }
        else {
            let node = this.head;
            while(node.next) {
                node = node.next;
            }
            node.next = $node;
        }
        this.length++;
    }
    findIndex(value) {
        let node = this.head;
        let index = 0;
        while(node) {
            if (node.value === value) {
                return index;
            }
            node = node.next;
            index++;
        }
        return -1;
    }
    findNodeFromValue(value) {
        let node = this.head;
        while(node) {
            if (node.value === value) {
                return node;
            }
            node = node.next;
        }
    }
    findNodeFromIndex(index) {
        let node = this.head;
        let $index = 0;
        while(node) {
            if ($index === index) {
                return node;
            }
            node = node.next;
            $index++;
        }
    }
    findPrevNode(index) {
        let node = this.head;
        if (index === 0) {
            return node;
        }
        let $index = 0;
        while(node) {
            if ($index === index - 1) {
                return node;
            }
            node = node.next;
            $index++;
        }
    }
    remove(index) {
        const prevNode = this.findPrevNode(index);
        const removeNode = this.findNodeFromIndex(index);
        prevNode.next = removeNode.next;
        removeNode.next = null;
        this.length--;
    }
}

// 模拟使用场景👌
const list = new LinkedList();
list.add('张三');
list.add('李四');
list.add('王五');
list.add('吴六');
list.remove(1);
console.log('list: ', list);
```

- 双向链表
``` javascript
class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
class DoubleList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    find(index) {
        let $index = 0;
        let node = this.head;
        while(node) {
            if ($index === index) {
                return node;
            }
            node = node.next;
            $index++;
        }
    }
    lastNode() {
        let node = this.head;
        if (!node) {
            return node;
        }
        while(node.next) {
            node = node.next;
        }
        return node;
    }
    add(value) {
        const $node = new Node(value);
        let lastNode = this.lastNode();
        if (!lastNode) {
            this.head = $node;
        }
        else {
            lastNode.next = $node;
            $node.prev = lastNode;
        }
        this.length++;
    }
    remove(index) {
        let node = this.find(index);
        const prev = node.prev;
        const next = node.next;
        node.prev = null;
        node.next = null;
        prev.next = next;
        next.prev = prev;
        this.length--;
    }
}

// 模拟使用场景👌
const list = new DoubleList();
list.add(100);
list.add(200);
list.add(300);
list.add(400);
list.remove(1);
console.log(list);
```

- 循环链表
```javascript
class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
class CircleList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    find(index) {
        let $index = 0;
        let node = this.head;
        while (node) {
            if ($index === index) {
                return node;
            }
            node = node.next;
            $index++;
        }
    }
    findPrev(index) {
        let $index = 0;
        let node = this.head;
        if (!node) {
            return null;
        }
        while (node) {
            if ($index === index - 1) {
                return node;
            }
            node = node.next;
            $index++;
        }
    }
    findLastNode() {
        let node = this.head;
        if (!node.next) {
            return node;
        }
        else {
            while(node.next && node.next !== this.head) {
                node = node.next;
            }
        }
        return node;
    }
    add(value) {
        let node = this.head;
        const newNode = new Node(value);
        if (!node) {
            this.head = newNode;
            newNode.next = this.head;
        }
        else {
           const lastNode = this.findLastNode();
           newNode.next = this.head;
           lastNode.next = newNode;
        }
        this.length++;
    }
    remove(index) {
        const node = this.find(index);
        const prevNode = this.findPrev(index);
        prevNode.next = node.next;
        node.next = null;
    }
}

// 模拟使用场景👌
const list = new CircleList();
list.add(100);
list.add(200);
list.add(300);
list.add(400);
list.remove(1);
console.log(list);
```

### 判断链表是否有环

```javascript
// 生成链表
const list = new CircleList();
list.add(100);
list.add(200);
list.add(300);
list.add(400);

// 方法一: 利用set特性判断
const isCircle = chain => {
    let set = new Set();
    let node = chain.head;
    while(node) {
        if (set.has(node)) {
            return true;
        }
        set.add(node);
        node = node.next;
    }
    return false;
};
// 模拟使用场景👌
console.log(isCircle(list));

// 方法二: 利用快慢指针
const hasCycle = chain => {
    let fast = chain.head,
        slow = chain.head;
    // 零个结点或者一个结点，肯定无环
    if (fast.next == null || fast.next.next == null) return false;
    while (fast && fast.next) {
        //走一步
        slow = slow.next;
        //走二步
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};
console.log(hasCycle(list));
```