import { JavaScriptOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

function DefaultRouterViewComponent() {
    return (
        <div className={styles.container}>
            <div className="icon-box">
                <div className="icon">
                    <JavaScriptOutlined />
                </div>
                <span className="text">蓝山工作室</span>
            </div>
        </div>
    );
}

export default DefaultRouterViewComponent;
