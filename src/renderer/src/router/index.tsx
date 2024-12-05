import { Login } from '@renderer/pages/login';
import { lazy } from 'react';

export const routes = [
    {
        path: '/timeTable',
        name: 'timeTable',
        component: lazy(() => import('@renderer/pages/timeTable'))
    },
    {
        path: '/my',
        name: 'my',
        component: lazy(() => import('@renderer/pages/my'))
    },
    // 独立窗口
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/searchTimeTable',
        name: 'searchTimeTable',
        component: null
    },
    {
        path: '/calender',
        name: 'calender',
        component: lazy(() => import('@renderer/pages/calender'))
    },
    // 这个setting页面要新开一个窗口展示
    {
        path: '/setting',
        name: 'setting',
        component: null
    },
    {
        path: '/more',
        name: 'more',
        component: lazy(() => import('@renderer/pages/more'))
    },
    {
        path: '/reportRepaire',
        name: 'reportRepaire',
        component: lazy(() => import('@renderer/pages/reportRepaire'))
    },
    {
        path: '/electricityFeeInquery',
        name: 'electricityFeeInquery',
        component: lazy(() => import('@renderer/pages/electricityFeeInquiry'))
    },
    {
        path: '/searchBooks',
        name: 'searchBooks',
        component: lazy(() => import('@renderer/pages/searchBooks')),
        children: [
            {
                path: 'bookList/:name',
                name: 'searchBooksList',
                component: lazy(() => import('@renderer/pages/searchBooks/searchBooksList'))
            }
        ]
    },
    {
        path: '/searchSpareClassroom',
        name: 'searchSpareClassroom',
        component: lazy(() => import('@renderer/pages/searchSpareClassroom'))
    },
    {
        path: '/schoolMessage',
        name: 'schoolMessage',
        component: lazy(() => import('@renderer/pages/schoolMessage')),
        children: [
            {
                path: '/schoolMessage/message/:id',
                name: 'message',
                component: lazy(() => import('@renderer/pages/schoolMessage/schoolMessageDetail'))
            }
        ]
    }
];

// 只存储所有二级路由的所有可能，如果没有二级路由的话，就存储为 ，
// 有的话就是  ['一级路由url+二级路由url ',child.component]
export function extractRoutesWithChildren(routes) {
    const result = [];
    routes.forEach((route) => {
        const routeWithChildren = [];
        if (route.children) {
            route.children.forEach((child) => {
                // 将父路由路径和子路由路径拼接起来
                const fullPath = `${route.path}/${child.path}`;
                routeWithChildren.push(fullPath);
                routeWithChildren.push(child.component);
            });
            result.push(routeWithChildren);
        } else {
            result.push(route.path + 'null');
        }
    });
    return result;
}
