/**
* @file pages/layout
* @description 页面布局
* @author jc
*/

import React from 'react';
import {HashRouter} from 'react-router-dom';
import Loading from '@/components/Loading';
import Header from './Header';

import {Layout} from 'antd';
import {routes, renderRoutes} from '@/router';
const {Content} = Layout;

import './index.less';

const PREFIX = 'layout-container';

export default () => {
    return (
        <Layout className={PREFIX}>
            <Header />
            <Content>
                <HashRouter>
                    <React.Suspense fallback={<Loading />}>
                        {renderRoutes(routes)}
                    </React.Suspense>
                </HashRouter>
            </Content>
        </Layout>
    );
};