import { Login } from '@renderer/pages/login';
import { lazy } from 'react';

export const routes = [
    {
        path: '/timeTable',
        name: 'timeTable',
        component: null
    },
    {
        path: '/my',
        name: 'my',
        component: null
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
        path: '/cleander',
        name: 'cleander',
        component: null
    },
    {
        path: '/home',
        name: 'home',
        component: null
    },
    // 这个setting页面要新开一个窗口展示
    {
        path: '/setting',
        name: 'setting',
        component: null
    }
];
