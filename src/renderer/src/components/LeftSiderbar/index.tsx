import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import useUserStore from '@renderer/store/userStore';
import { Input } from 'antd';
import { SearchOutlined, VideoCameraOutlined } from '@ant-design/icons';
import useListenNewWindowCreated from '@renderer/hooks/useListenNewWindowCreated';
import { useEffect } from 'react';
import { LOGIN_WINDOW, MAIN_WINDOW } from '@renderer/utils/windowTypes';
import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';
import useBeforeCreatedGetUpdatedState from '@renderer/hooks/useBeforeCreatedGetUpdatedState';

function LeftSiderbar() {
    // 在登录页不出现
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/login') return;
    // 做这个几乎一直存在，监听
    useBeforeCreatedGetUpdatedState(MAIN_WINDOW);
    useListenNewWindowCreated();
    useUpdateStateSync();
    const userStore = useUserStore();
    const { leftSiderbarOptionsArr, setLeftSiderbarOptionsArr, userInfo } = userStore;
    console.log(leftSiderbarOptionsArr);
    console.log('userInfo', userInfo);
    function navigateTo(e) {
        const { link } = e.target.dataset;
        navigate(link);
    }
    // useEffect(() => {
    //     IPC.destroyWindow(LOGIN_WINDOW);
    // }, []);
    return (
        <div className={styles.container}>
            <div className="input-box">
                <Input placeholder="搜索" prefix={<SearchOutlined />} />
            </div>
            {/* 监听来确保缩小窗口时到底该展示多少个 */}
            <ul className="options-box" onClick={navigateTo}>
                {leftSiderbarOptionsArr?.length &&
                    leftSiderbarOptionsArr.map(
                        (option) =>
                            option.status && (
                                <li
                                    className={`one-option ${location.pathname === option.link ? 'active' : ''}`}
                                    key={option.name}
                                    data-link={option.link}
                                >
                                    <span className="option-icon">
                                        <VideoCameraOutlined />
                                    </span>
                                    <span className="option-name">{option.name}</span>
                                </li>
                            )
                    )}
            </ul>
        </div>
    );
}

export default LeftSiderbar;
