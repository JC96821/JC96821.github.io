import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';

import Layout from '@/pages/layout';
import './index.less';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Layout />
    </ConfigProvider>,
    document.querySelector('#app')
);