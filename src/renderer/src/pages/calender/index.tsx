import { getApolloConfigAPI } from '@renderer/apis/apollo';
import styles from './index.module.scss';
import { Button } from 'antd';

function Calender() {
    async function get() {
        const res = await getApolloConfigAPI();
        console.log('res', res);
    }
    get();
    return (
        <div className={styles.container}>
            <div className="title">2024-2025年学年</div>
            <div className="term-selector">
                <div className="first-term">
                    <Button className="term-btn">第一学期</Button>
                </div>
                <div className="second-term">
                    <Button className="term-btn">第二学期</Button>
                </div>
            </div>
            <div className="calender-scroll">
                <ul className="weekday">
                    {new Array(8).fill(null).map((_, idx) => (
                        <li className="one-day">周{idx}</li>
                    ))}
                </ul>
                <ul className="calender-box"></ul>
            </div>
        </div>
    );
}

export default Calender;
