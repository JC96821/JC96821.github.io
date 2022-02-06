import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import Layout from '@/pages/layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import './index.less';

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {logger} from './reduxMiddleware';
import {MyHooks} from '@/utils';
import {Provider as ReducerProvider} from '@/store';

const initState = {
    name: '张三',
    num: -1
};

const store = createStore(reducer, initState, applyMiddleware(thunk, logger));

const render = () => ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <ReducerProvider>
            <Provider store={store}>
                <ErrorBoundary>
                    <Layout />
                </ErrorBoundary>
            </Provider>
        </ReducerProvider>
    </ConfigProvider>,
    document.querySelector('#app')
);
// @ts-ignore
window['hooks'] = new MyHooks(render);
render();