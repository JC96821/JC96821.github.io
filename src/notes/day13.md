## 模拟题十三

### react hooks原理
简单写俩，多了放弃
```javascript
class MyHooks {
    stateList: any[];
    stateCursor: number;
    render: Function;
    state: any;
    allDeps: any[];
    effectCursor: number;
    constructor(render: any) {
        this.render = () => {
            render();
            this.stateCursor = 0;
        };

        this.stateList = [];
        this.stateCursor = 0;

        this.allDeps = [];
        this.effectCursor = 0;
    }

    useState<T>(initValue?: T): [T, (newState: T) => void] {
        const currCursor = this.stateCursor;
        this.stateList[currCursor] = this.stateList[currCursor] || initValue;
        const setState = (newState: any) => {
            if (this.stateList[currCursor] === newState) {
                return;
            }
            this.stateList[currCursor] = newState;
            this.render();
        };
        ++this.stateCursor;
        return [this.stateList[currCursor], setState];
    }

    useEffect(callback: () => void, deps: any[]) {
        // 初次渲染
        if (!this.allDeps[this.effectCursor]) {
            this.allDeps[this.effectCursor] = deps;
            ++this.effectCursor;
            callback();
            return;
        }
        const currCursor = this.effectCursor;
        const currDeps = this.allDeps[currCursor];
        const isChange = deps.some((item, index) => item !== currDeps[index]);
        if (isChange) {
            callback();
            this.allDeps[currCursor] = deps;
        }
        ++this.effectCursor;
    }
}
```

## React怎么实现KeepAlive
核心思想就是保存react组件实例
```javascript
/**
* @file
* @author jc
*/

import React from 'react';
import ReactDOM from 'react-dom';

interface ICacheComponent {
    active: boolean;
    children: any;
};

const CacheCompontnt: React.FC<ICacheComponent> = ({
    active,
    children
}) => {
    const ref = React.createRef<HTMLDivElement>(); // 挂载节点
    const [targetElement] = React.useState<any>(document.createElement('div')); // 缓存到内存中
    
    React.useLayoutEffect(() => {
        if (active) {
            ref.current?.appendChild(targetElement)
        }
        else {
            try {
                ref.current?.removeChild(targetElement);
            }
            catch(e) {
            }
        }
    }, [active]);

    return (
        <>
            <div ref={ref}></div>
            {ReactDOM.createPortal(children, targetElement)}
        </>
    );
};

export default CacheCompontnt;
```