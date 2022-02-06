import React from 'react';

const reducer = (state: {count: number}, action: {type: string}) => {
    switch(action.type){
        case 'add':
            return {...state, count: state.count + 1};
        case 'del':
            return {...state, count: state.count - 1};
        default:
            return state;
    }
};

export const context = React.createContext(null);

export const Provider: React.FC<any> = props => {
    const store = React.useReducer<any>(reducer, {count: 0});
    return (
        // @ts-ignore
        <context.Provider value={store}>
            {props.children}
        </context.Provider>
    );
};

export const connect = (WrapperComponent: React.FC<any>) => {
    return (
        <context.Consumer>
            {store => <WrapperComponent {...store} />}
        </context.Consumer>
    );
};