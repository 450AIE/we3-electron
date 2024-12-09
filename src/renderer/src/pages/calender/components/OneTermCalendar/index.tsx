import useUserStore from '@renderer/store/userStore';
import { OneTermCalendarProps } from '../../types';
import OneMounthCalendar from '../OneMounthCalendar';
// import styles from './index.module.scss';

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

function isYearAddOne(mounth) {
    return mounth >= 1 && mounth <= 8;
}

function OneTermCalendar({ termTimeList, mounthArr }: OneTermCalendarProps) {
    const {
        dateInfo: { term }
    } = useUserStore();
    // 学年，标记着第一学期的年份，1--8月就为该学年+1
    const termYear = parseInt(term.slice(0, 4));
    let weekNum = 1;
    return (
        // <ul className={styles.container}>
        <ul>
            {termTimeList &&
                termTimeList.map((mounth, index) => {
                    const startWeek = weekNum;
                    weekNum += mounth.length;
                    return (
                        <li className="one-mounth-calendar-box">
                            <OneMounthCalendar
                                startWeekNum={startWeek}
                                mounth={parseInt(mounthArr[index])}
                                year={
                                    isYearAddOne(parseInt(mounthArr[index]))
                                        ? termYear + 1
                                        : termYear
                                }
                                timeList={mounth}
                            />
                        </li>
                    );
                })}
        </ul>
    );
}

export default OneTermCalendar;
