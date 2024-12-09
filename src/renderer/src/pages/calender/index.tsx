import styles from './index.module.scss';
import { Button } from 'antd';
import { convertToChinese } from '@renderer/utils';
import useUserStore from '@renderer/store/userStore';
import { userInfo } from 'os';
import { getTermTimeAPI } from '@renderer/apis/calendar';
import { useEffect, useState } from 'react';
import { TermTime } from './types';
import OneTermCalendar from './components/OneTermCalendar';
import { daysBetween } from '@renderer/utils/date';

// const termMounthArr = [
//     [2024, 9],
//     [2024, 10],
//     [2024, 11],
//     [2024, 12],
//     [2025, 1]
// ];
const firstTermTimeFields = ['9', '10', '11', '12', '1.1', '1.2', '2.1'];
const firstTermMounthArr = ['9', '10', '11', '12', '1', '2'];
const secondTermMounthArr = ['2', '3', '4', '5', '6', '7', '8'];
// const secondTermTimeFields = ['2.2', '3', '4', '5', '6', '7', '8'];

function Calender() {
    const {
        dateInfo: { term }
    } = useUserStore();
    // 存储所有月份信息
    const [termTimeList, setTermTimeList] = useState<TermTime>([]);
    // 当前选择展示第几学期的校历
    const [selectedTerm, setSelectedTerm] = useState<number>(() => (term.includes('一') ? 1 : 2));
    // 第一学期校历
    const [firstTermTimeList, setFirstTermTimeList] = useState([]);
    // 第二学期校历
    const [secondTermTimeList, setSecondTermTimeList] = useState([]);
    useEffect(() => {
        async function getTermTime() {
            const res = await getTermTimeAPI();
            // console.log('res', res);
            setTermTimeList(res.data.ListTerm);
        }
        getTermTime();
    }, []);
    // 当总的月份信息获取后，切出来分别赋值给一二学期校历，其中要将1.1和1.2融合为1
    useEffect(() => {
        const firstTimeList = [];
        const secondTimeList = [];
        for (let key in termTimeList) {
            if (Object.prototype.hasOwnProperty.call(termTimeList, key)) {
                // 这部分字段就是第一学期课表要加入的日程
                if (firstTermTimeFields.includes(key)) {
                    firstTimeList.push(termTimeList[key]);
                } else {
                    secondTimeList.push(termTimeList[key]);
                }
            }
        }
        if (firstTimeList.length && secondTimeList.length) {
            // 这里实现融合1.1和1.2到1月中,7.1,7.2融合到7月中
            const firstPart1mounthIdx = firstTimeList.findIndex(
                (arr) => arr[arr.length - 1][6] === '1.19'
            );
            const secondPart1mounthIdx = firstTimeList.findIndex((arr) => arr[0][0] === '1.20');
            const OneMounth = [
                ...firstTimeList[firstPart1mounthIdx],
                ...firstTimeList[secondPart1mounthIdx]
            ];
            console.log('se', secondTimeList);
            const secondPart7mounthIdx = secondTimeList.findIndex((arr) => arr[0][0] === '7.21');
            const firstPart7mounthIdx = secondTimeList.findIndex((arr) => arr[0][0] === '6.30');
            firstTimeList[firstPart1mounthIdx] = OneMounth;
            const SevenMounth = [
                ...secondTimeList[firstPart7mounthIdx],
                ...secondTimeList[secondPart7mounthIdx]
            ];
            secondTimeList[firstPart7mounthIdx] = SevenMounth;
            firstTimeList.splice(secondPart1mounthIdx, 1);
            secondTimeList.splice(secondPart7mounthIdx, 1);
            secondTimeList.sort(
                (preArr, nextArr) => parseInt(preArr[0][0]) - parseInt(nextArr[0][0])
            );
            console.log('second', secondTimeList);
            setFirstTermTimeList(firstTimeList);
            setSecondTermTimeList(secondTimeList);
        }
    }, [termTimeList]);
    // console.log(useUserStore());
    return (
        <div className={`${styles.container} beautify-scrollbar`}>
            <div className="title">2024-2025年学年</div>
            <div className="term-selector">
                <div className="first-term" onClick={() => setSelectedTerm(1)}>
                    <Button className={`term-btn ${selectedTerm === 1 ? 'active' : ''}`}>
                        第一学期
                    </Button>
                </div>
                <div className="second-term" onClick={() => setSelectedTerm(2)}>
                    <Button className={`term-btn ${selectedTerm === 2 ? 'active' : ''}`}>
                        第二学期
                    </Button>
                </div>
            </div>
            <ul className="weekday-label">
                <li className="one-weekday-label">周</li>
                {new Array(7).fill(null).map((_, index) => (
                    <li className="one-weekday-label">
                        {convertToChinese(index + 1) === '七' ? '日' : convertToChinese(index + 1)}
                    </li>
                ))}
            </ul>
            <div className="calender-scroll">
                <ul className="calender-box">
                    <OneTermCalendar
                        mounthArr={selectedTerm === 1 ? firstTermMounthArr : secondTermMounthArr}
                        termTimeList={selectedTerm === 1 ? firstTermTimeList : secondTermTimeList}
                    />
                </ul>
            </div>
        </div>
    );
}

export default Calender;

{
    /* {termMounthArr.map((item, index) => (
                        <li key={index} className="one-calendar">
                            <OneMounthCalendar
                                year={item[0]}
                                mounth={item[1]}
                                weekNum={index + 1}
                            />
                        </li>
                    ))} */
}
