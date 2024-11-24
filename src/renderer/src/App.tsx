import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { login } from './apis/login';
import { RouterView } from './router/routerView';
import LeftSiderbar from './components/LeftSiderbar';
import { Splitter } from 'antd';
import AppOperation from './components/AppOperation';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';

function App() {
    // 登录页不需要动态划分空间
    const location = useLocation();
    if (location.pathname === '/login') return <RouterView />;
    return (
        <>
            <AppOperation />
            <Splitter className={styles.container}>
                <Splitter.Panel defaultSize="30%" min="20%" max="50%">
                    <LeftSiderbar />
                </Splitter.Panel>
                <Splitter.Panel>
                    <RouterView />
                </Splitter.Panel>
            </Splitter>
        </>
    );
}

export default App;
