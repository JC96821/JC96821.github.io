/**
* @file
* @author jc
*/

import React from 'react';
import './index.less';

import {Layout} from 'antd';

const PREFIX = 'header-container';
const PREFIX_LEFT = `${PREFIX}-left`;

export default () => {
    return (
        <Layout.Header className={PREFIX}>
            <div className={PREFIX_LEFT}>
                JC技术博客
                <a href='/#/dashboard'>dashboard</a>
                &nbsp;
                <a href='/#/project'>project</a>
                &nbsp;
                <a href='/#/about'>about</a>
                &nbsp;
                <a href='/#/tags'>tags</a>
            </div>
        </Layout.Header>
    );
};