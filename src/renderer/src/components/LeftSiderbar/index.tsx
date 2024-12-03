import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import useUserStore from '@renderer/store/userStore';
import { Input } from 'antd';
import { SearchOutlined, VideoCameraOutlined } from '@ant-design/icons';

function LeftSiderbar() {
    // 在登录页不出现
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/login') return;
    const userStore = useUserStore();
    const { leftSiderbarOptionsArr, setLeftSiderbarOptionsArr, userInfo } = userStore;
    console.log(leftSiderbarOptionsArr);
    function navigateTo(e) {
        const { link } = e.target.dataset;
        navigate(link);
    }
    return (
        <div className={styles.container}>
            <div className="input-box">
                <Input placeholder="搜索" prefix={<SearchOutlined />} />
            </div>
            {/* 监听来确保缩小窗口时到底该展示多少个 */}
            <ul className="options-box" onClick={navigateTo}>
                {leftSiderbarOptionsArr?.length &&
                    leftSiderbarOptionsArr.map((option) => (
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
                    ))}
            </ul>
        </div>
    );
}

export default LeftSiderbar;
