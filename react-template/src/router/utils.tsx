import React from 'react';
import {CacheSwitch, CacheRoute, CacheRouteProps} from 'react-router-cache-route';

import {map} from 'lodash';

export const renderRoutes = (routes: CacheRouteProps[]) => (
    <CacheSwitch>
        {map(routes, (route: CacheRouteProps) => (
            <CacheRoute
                key={route.path as string}
                {...route}
            />
        ))}
    </CacheSwitch>
);
// export * from 'react-router-config';