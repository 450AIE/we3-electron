import { UserOutlined } from '@ant-design/icons';
import AppOperation from '../AppOperation';
import styles from './index.module.scss';

function TopPadding() {
    return (
        <>
            <div className={styles.container}>
                <div className="avatar">
                    <UserOutlined />
                </div>
            </div>
            <AppOperation />
        </>
    );
}

export default TopPadding;
