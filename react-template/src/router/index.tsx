/**
* @file
* @author jc
*/

import React from 'react';
import {Redirect} from 'react-router';
import {CacheRouteProps} from 'react-router-cache-route';

export * from './utils';

export const routes: CacheRouteProps[] =  [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to='/dashboard' />
    },
    {
        path: '/dashboard',
        exact: true,
        component: React.lazy(() => import('@/pages/dashboard'))
    },
    {
        path: '/project',
        exact: true,
        component: React.lazy(() => import('@/pages/project'))
    }
];