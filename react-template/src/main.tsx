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

const initState = {
    name: '张三',
    num: -1
};

const store = createStore(reducer, initState, applyMiddleware(thunk, logger));

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <ErrorBoundary>
                <Layout />
            </ErrorBoundary>
        </Provider>
    </ConfigProvider>,
    document.querySelector('#app')
);