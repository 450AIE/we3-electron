import useUserStore from '@renderer/store/userStore';
import styles from './index.module.scss';
import AppOperation from '@renderer/components/AppOperation';
import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';
import useBeforeCreatedGetUpdatedState from '@renderer/hooks/useBeforeCreatedGetUpdatedState';
import { MY_WINDOW, USER_DETAIL_WINDOW } from '@shared/types/windows';
import { useEffect, useState } from 'react';
import useInitialStoreInUpdateMap from '@renderer/hooks/useInitialStoreInUpdateMap';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Copyright from '@renderer/components/Copyright';

const optionList = [
    {
        name: '在线客服',
        icon: '#icon-liaotian-fang-xianxing'
    },
    {
        name: '问题反馈',
        icon: '#icon-youjian'
    },
    {
        name: '产品介绍',
        icon: '#icon-zhekou'
    },
    {
        name: '开发团队',
        icon: '#icon-yonghu'
    }
];

function My() {
    useUpdateStateSync();
    useBeforeCreatedGetUpdatedState(MY_WINDOW);
    const userStore = useUserStore();
    const {
        userInfo: { student_id, name }
    } = userStore;
    useInitialStoreInUpdateMap();
    function openStudentDetail() {
        IPC.createWindow(USER_DETAIL_WINDOW);
    }
    return (
        <div className={styles.container}>
            <AppOperation />
            <div className="top-card">
                <div className="avatar">
                    <Avatar size={100} icon={<UserOutlined />} className="avatar-icon" />
                </div>
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="student-id">{student_id}</div>
                </div>
                <div className="detail-box" onClick={openStudentDetail}>
                    <span>详情</span>
                </div>
            </div>
            <ul className="option-list">
                {optionList.map((option) => (
                    <li className="one-option-box" key={option.name}>
                        <div className="one-option">
                            <div className="option-icon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={option.icon} />
                                </svg>
                            </div>
                            <span className="option-name">{option.name}</span>
                            <div className="option-arrow"></div>
                        </div>
                    </li>
                ))}
            </ul>
            <Copyright />
        </div>
    );
}

export default My;
