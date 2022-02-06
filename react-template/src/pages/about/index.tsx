/**
* @file
* @author jc
*/

import React from 'react';
import {MyHooks} from '@/utils';
import CacheCompontnt from '@/components/CacheComponent';
import {useHistory} from 'react-router';
import {context} from '@/store';

// @ts-ignore
const hooks: MyHooks = window?.hooks;

const reducer = (state: {name: string}, action: {type: string, params?: any}) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                name: `${+new Date()}`
            };
        case 'del':
            return {
                ...state,
                name: `${+new Date()}`
            };
        default:
            return state;
    }
};

const About = () => {
    const history = useHistory();
    const pathname = history.location.pathname;
    const [count, setCount] = hooks.useState<{count: number, name: string}>({count: 10, name: 'name'});
    const [values, dispatch] = React.useReducer(reducer, {name: 'init name'});

    const handleAdd = () => {
        setCount({count: count.count + 1, name: `name${count.count + 1}`});
    };


    const [active, updateActive] = hooks.useState(false);
    const handleActive = () => {
        // updateActive(!active);
    };

    React.useEffect(() => {
        updateActive(pathname === '/about');
    }, [pathname]);

    return (
        <context.Consumer>
            {store => {
                const [state, dispatchState] = store || [];
                return (
                    <CacheCompontnt active={true}>
                        <div>
                            <h1>{count.name} {count.count}</h1>
                            <button onClick={handleAdd}>add</button>
                            <button onClick={handleActive}>{`${active}`}</button>
                            <h1>{values.name}</h1>
                            <button onClick={() => dispatch({type: 'add'})}>add</button>
                            <button onClick={() => dispatch({type: 'del'})}>del</button>
                            {/* @ts-ignore */}
                            <h1>{state.count}</h1>
                            {/* @ts-ignore */}
                            <button onClick={() => dispatchState({type: 'add'})}>add</button>
                        </div>
                    </CacheCompontnt>
                );
            }}
        </context.Consumer>
        
        
    );
};

export default About;