import { lessonTimeArr } from '../../utils/common';
import styles from './index.module.scss';

function LeftBar() {
    return (
        <div className={styles.container}>
            {lessonTimeArr.map((item, idx) => (
                <div className="item" key={idx}>
                    <div className="number">{idx + 1}</div>
                    <div className="clock">{item[0]}</div>
                    <div className="clock">{item[1]}</div>
                </div>
            ))}
        </div>
    );
}

export default LeftBar;
