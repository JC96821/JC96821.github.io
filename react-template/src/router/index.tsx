/**
* @file
* @author jc
*/

import React from 'react';
import {Redirect} from 'react-router';
// import {CacheRouteProps} from 'react-router-cache-route';
import {RouteConfig} from 'react-router-config';
export * from './utils';

export const routes: RouteConfig[] =  [
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
    },
    {
        path: '/about',
        exact: true,
        component: React.lazy(() => import('@/pages/about'))
    },
    {
        path: '/tags',
        exact: true,
        // @ts-ignore
        component: React.lazy(() => import('@/pages/tags'))
    }
];