import useBeforeCreatedGetUpdatedState from '@renderer/hooks/useBeforeCreatedGetUpdatedState';
import useUserStore from '@renderer/store/userStore';
import styles from './index.module.scss';
import { Avatar, Button } from 'antd';
import AppOperation from '@renderer/components/AppOperation';
import { UserOutlined } from '@ant-design/icons';
import { LOGIN_WINDOW, USER_DETAIL_WINDOW } from '@shared/types/windows';
import useInitialStoreInUpdateMap from '@renderer/hooks/useInitialStoreInUpdateMap';
import { useEffect, useState } from 'react';

function UserDetail() {
    useInitialStoreInUpdateMap();
    useBeforeCreatedGetUpdatedState(USER_DETAIL_WINDOW);
    // 标记是否点击了切换绑定，避免多次点击产生错误
    const [isClick, setIsClick] = useState<boolean>(false);
    const {
        userInfo: { name, cqupt_id, student_id, class: Class, profession_name, unit_name }
    } = useUserStore();
    function changeAccount() {
        IPC.createWindow(LOGIN_WINDOW);
        IPC.destroyAllWindows();
    }
    useEffect(() => {
        if (isClick) {
            changeAccount();
        }
    }, [isClick]);
    return (
        <div className={styles.container}>
            <AppOperation />
            <div className="card">
                <div className="avatar-box">
                    <Avatar size={100} icon={<UserOutlined />} className="avatar-icon" />
                </div>
                <div className="name-box">
                    <span className="name">{name}</span>
                </div>
                <ul className="info-box">
                    <li className="one-info">
                        <span className="field">学号</span>{' '}
                        <span className="gray">{student_id}</span>
                    </li>
                    <li className="one-info">
                        <span className="field">统一认证码</span>{' '}
                        <span className="gray">{cqupt_id}</span>
                    </li>
                    <li className="one-info">
                        <span className="field">学院</span>{' '}
                        <span className="gray">{unit_name}</span>
                    </li>
                    <li className="one-info">
                        <span className="field">专业</span>{' '}
                        <span className="gray">{profession_name}</span>
                    </li>
                    <li className="one-info">
                        <span className="field">班级</span> <span className="gray">{Class}</span>
                    </li>
                </ul>
                <div className="change-btn">
                    <Button className="btn" onClick={() => setIsClick(true)}>
                        切换绑定
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
