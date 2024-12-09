import { OneMounthCalendarProps } from '../../types';
import styles from './index.module.scss';

const timeFormat = 'YYYY年M月';
const timeMap = new Map();
function initilizeTimeMap(timeMap) {
    const arr = [
        [1, 'JAN'],
        [2, 'FEB'],
        [3, 'MAR'],
        [4, 'APR'],
        [5, 'MAY'],
        [6, 'JUN'],
        [7, 'JUL'],
        [8, 'AUG'],
        [9, 'SEP'],
        [10, 'OCT'],
        [11, 'NOV'],
        [12, 'DEC']
    ];
    for (let innerArr of arr) {
        timeMap.set(innerArr[0], innerArr[1]);
    }
}

initilizeTimeMap(timeMap);

function OneMounthCalendar({ startWeekNum, timeList, mounth, year }: OneMounthCalendarProps) {
    // 注意不确定这里直接startWeekNum++会不会报错，因为直接修改了props
    return (
        <div className={styles.container}>
            <div className="title">
                {year}年{mounth}月 {timeMap.get(mounth)}
            </div>
            {timeList.map((oneWeekArr, index) => (
                <ul className="one-week-box">
                    <li className="week-num">{startWeekNum++}</li>
                    {oneWeekArr.map((oneDay, idx) => (
                        <li className={`day-num ${oneDay.includes('.') ? '' : 'vacation'}`}>
                            {oneDay.includes('.') ? oneDay.split('.')[1] : oneDay}
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default OneMounthCalendar;
