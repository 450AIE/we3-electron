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

function OneMounthCalendar({
    startWeekNum,
    timeList,
    mounth,
    year,
    showToday
}: OneMounthCalendarProps) {
    let toMounth = new Date().getMonth() + 1;
    let today = new Date().getDate();
    if (showToday) {
    }
    // 注意不确定这里直接startWeekNum++会不会报错，因为直接修改了props
    return (
        <div className={styles.container}>
            <div className="title">
                {year}年{mounth}月 {timeMap.get(mounth)}
            </div>
            {timeList.map((oneWeekArr, index) => (
                <ul className="one-week-box">
                    <li className="week-num">{startWeekNum++}</li>
                    {oneWeekArr.map((oneDay, idx) => {
                        const isVacation = !oneDay.includes('.');
                        let dayStr = oneDay;
                        if (!isVacation) {
                            dayStr = parseInt(oneDay.split('.')[1]);
                        }
                        const isToday = today === dayStr && toMounth === mounth;
                        return (
                            <li
                                className={`day-num ${isVacation ? 'vacation' : ''} ${isToday ? 'today' : ''}`}
                            >
                                {dayStr}
                            </li>
                        );
                    })}
                </ul>
            ))}
        </div>
    );
}

export default OneMounthCalendar;
