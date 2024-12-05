import { UserOutlined } from '@ant-design/icons';
import AppOperation from '../AppOperation';
import styles from './index.module.scss';
import { MY_WINDOW } from '@renderer/utils/windowTypes';

function TopPadding() {
    function openMyPage() {
        IPC.createWindow(MY_WINDOW);
    }
    return (
        <>
            <div className={styles.container}>
                <div className="avatar" onClick={openMyPage}>
                    <UserOutlined />
                </div>
            </div>
            <AppOperation />
        </>
    );
}

export default TopPadding;
