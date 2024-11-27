import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { login } from './apis/login';
import { RouterView } from './router/routerView';
import LeftSiderbar from './components/LeftSiderbar';
import { Splitter } from 'antd';
import AppOperation from './components/AppOperation';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import TopPadding from './components/TopPadding';

function App() {
    // 登录页不需要动态划分空间
    const location = useLocation();
    if (location.pathname === '/login') return <RouterView />;
    return (
        <>
            <Fragment>
                <TopPadding />
            </Fragment>
            <Fragment>
                <Splitter className={styles.container}>
                    <Splitter.Panel defaultSize="30%" min="20%" max="30%">
                        <LeftSiderbar />
                    </Splitter.Panel>
                    <Splitter.Panel>
                        <RouterView />
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
