import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { login } from './apis/login';
import { FirstRouterView, RouterView, SecondaryRoutes } from './router/routerView';
import LeftSiderbar from './components/LeftSiderbar';
import { Splitter } from 'antd';
import AppOperation from './components/AppOperation';
import styles from './index.module.scss';
import { Routes, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import TopPadding from './components/TopPadding';

function App() {
    // 登录页不需要动态划分空间
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/my') return <RouterView />;
    return (
        <>
            <Fragment>
                <TopPadding />
            </Fragment>
            <Fragment>
                <Splitter className={styles.container}>
                    <Splitter.Panel defaultSize="20%" min="10%" max="30%">
                        <LeftSiderbar />
                    </Splitter.Panel>
                    <Splitter.Panel defaultSize="30%" min="10%" max="50%">
                        {/* 一级路由 */}
                        {/* <FirstRouterView /> */}
                        <RouterView />
                    </Splitter.Panel>
                    <Splitter.Panel>
                        {/* 二级路由 */}
                        <SecondaryRoutes />
                        {/* <RouterView /> */}
                    </Splitter.Panel>
                </Splitter>
            </Fragment>
        </>
        // <>
        //     <AppOperation />
        //     <Splitter className={styles.container}>
        //         <Splitter.Panel defaultSize="30%" min="20%" max="50%">
        //             <LeftSiderbar />
        //         </Splitter.Panel>
        //         <Splitter.Panel>
        //             <RouterView />
        //         </Splitter.Panel>
        //     </Splitter>
        // </>
    );
}

export default App;
