import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import useUserStore from '@renderer/store/userStore';

function LeftSiderbar() {
    // 在登录页不出现
    const location = useLocation();
    if (location.pathname === '/login') return null;
    const userStore = useUserStore();
    const { leftSiderbarOptionsArr, setLeftSiderbarOptionsArr, userInfo } = userStore;
    console.log(userInfo);
    return <div>我是侧边栏</div>;
}

export default LeftSiderbar;
