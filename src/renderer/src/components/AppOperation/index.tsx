import { BorderOutlined, CloseOutlined, ExpandOutlined, MinusOutlined } from '@ant-design/icons';
import { memo } from 'react';
import styles from './index.module.scss';

const AppOperation = memo(() => {
    const iconList = [<MinusOutlined />, <BorderOutlined />, <CloseOutlined />];
    return (
        <ul className={styles.container}>
            {iconList.map((item, idx) => (
                <li className="icon">{item}</li>
            ))}
        </ul>
    );
});

export default AppOperation;
