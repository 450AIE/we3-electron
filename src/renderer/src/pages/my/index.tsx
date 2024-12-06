import useUserStore from '@renderer/store/userStore';
import styles from './index.module.scss';
import AppOperation from '@renderer/components/AppOperation';
import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';
import useBeforeCreatedGetUpdatedState from '@renderer/hooks/useBeforeCreatedGetUpdatedState';
import { MY_WINDOW } from '@renderer/utils/windowTypes';
import { useEffect, useState } from 'react';

const optionList = [
    {
        name: '在线客服',
        icon: ''
    },
    {
        name: '问题反馈',
        icon: ''
    },
    {
        name: '产品介绍',
        icon: ''
    },
    {
        name: '开发团队',
        icon: ''
    }
];

function My() {
    useUpdateStateSync();
    useBeforeCreatedGetUpdatedState(MY_WINDOW);
    const userStore = useUserStore();
    console.log('userStore', userStore);
    const [state, setState] = useState(0);
    return (
        <div className={styles.container}>
            <AppOperation />
            <div className="top-card" onClick={() => setState(state + 1)}>
                <div className="avatar">{state}</div>
                <div className="info">
                    <div className="name"></div>
                    <div className="student-id"></div>
                </div>
                <div className="detail">
                    <span>详情</span>
                </div>
            </div>
            <ul className="option-list">
                {optionList.map((option) => (
                    <li className="one-option" key={option.name}>
                        <div className="option-icon"></div>
                        <span className="option-name">{option.name}</span>
                        <div className="option-arrow"></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default My;
