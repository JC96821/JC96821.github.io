/**
* @file
* @author jc
*/

import React from 'react';
import './index.less';

const PRE_FIX = 'project-container';

import {connect} from 'react-redux';
import {addNumAction} from '@/actionCreators';

const compose = (...fns: any[]) => {
    return (num: number) => {
        return fns.reduce((res, nextFn) => {
            res = nextFn(res);
            return res;
        }, num);
    };
};

const fn1 = (res: number) => {
    return res * 2;
};

const fn2 = (res: number) => {
    return res * 3
};

const fn3 = (res: number) => {
    return res * 4;
};

const exec = compose(fn1, fn2, fn3);



const nextTick = (el: string, callback: () => void, options?: any) => {
    const observer = new MutationObserver(callback);
    observer.observe(document.querySelector(el) as HTMLDivElement, options);
};

nextTick('#app', () => {
    console.log('change');
}, {
    // childList: true,
    subtree: true,
    // attributes: true,
    // attributeOldValue: true,
    characterData: true
});

const Project: React.FC = (props: any) => {
    const domRef = React.createRef<HTMLDivElement>();
    const handleClick = async () => {
        // @ts-ignore
        const result = exec(20);
        // console.log('result: ', result);
        await props.add();
    };

    // React.useEffect(() => {
    //     const dom = domRef.current;
    //     if (!dom) {
    //         return;
    //     }
     
    // }, [domRef]);
    return (
        <div className={PRE_FIX}>
            project
            <h1>{props.name}</h1>
            <h2 ref={domRef}>{props.num}</h2>
            <button onClick={handleClick}>dispatch</button>
        </div>
    );
};

export default connect(
    state => state,
    dispatch => ({
        // @ts-ignore
        add: async () => dispatch(addNumAction)
    })
)(Project);