import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TimeTableGlobalParams } from '../../types';
import { getLessonsDataByTimeRange, getTermTime } from '@renderer/apis/timeTable';
import { addDays, daysBetween, getCurrentDate, subtractDaysFromDate } from '@renderer/utils/date';
import { flushSync } from 'react-dom';
import { getLessonDataCache, setLessonDataCache } from '../../utils/cache';
import { isEqual, unionWith } from 'lodash';

const TimeTableContext = createContext<TimeTableGlobalParams | null>(null);

export function useTimeTableContext() {
    return useContext(TimeTableContext);
}

function TimeTableContextProvider({ children }) {
    console.log('context又被执行了');
    // 初始化
    const totalPages = 21;
    // 标记是否初始化成功（是否获取到了第一次的数据，无论是网络请求还是读缓存）
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [term, setTerm] = useState<string>('');
    const [start_date, setStartDate] = useState<string>('');
    const [week_num, setWeekNum] = useState<number>(0);
    const [weekday, setWeekDay] = useState<number>(0);
    const [isOther, setIsOther] = useState<boolean>(false);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [noonShow, setNoonShow] = useState<boolean>(false);
    const [eveningShow, setEveningShow] = useState<boolean>(false);
    const [lessonsInfo, setLessonsInfo] = useState<LessonInfo[]>([]);
    // 保存各周的课程信息
    const lessonInfoMap = useMemo(() => {
        const map = new Map();
        for (let i = 1; i <= totalPages; ++i) {
            map.set(i, getWitchWeekLessonInfo(i));
        }
        return map;
    }, [lessonsInfo]);
    // 浏览翻到第几页了，一般代表第几周
    const [currentPage, setCurrentPage] = useState<number>(0);
    //
    const [currentPageLessonInfo, setCurrentPageLessonInfo] = useState<LessonInfo[]>([]);
    // 初次加载就获取最新周数，避免缓存错误
    useEffect(() => {
        getTime().then((currentWeek) => {
            getLessonData(currentWeek, 1, 1);
            setIsLoading(false);
        });
    }, []);
    // 翻页了就请求最新数据，这里要做缓存
    useEffect(() => {
        getLessonData(currentPage, 1, 1, true);
    }, [currentPage]);
    async function getTime() {
        const res = await getTermTime();
        localStorage.setItem(
            'jwzxTime',
            JSON.stringify({
                start_date: res.data.time.start_date,
                term: res.data.time.term,
                week_num: res.data.time.week_num,
                weekday: res.data.time.weekday
            })
        );
        setWeekNum(res.data.time.week_num);
        setCurrentPage(res.data.time.week_num);
        setStartDate(res.data.time.start_date);
        setTerm(res.data.time.term);
        setWeekDay(res.data.time.weekday);
        return Promise.resolve(res.data.time.week_num);
    }
    // 获取weekNum这一周的所有课程信息
    // backNum和advanceNum表示额外获取前，后几周的课程信息
    async function getLessonData(
        weekNum: number,
        backWeekNum?: number = 0,
        advanceWeekNum?: number = 0,
        changeCurrentPageLessonInfo?: boolean = false
    ) {
        console.log('weekNum', weekNum);
        // 如果这个区域+-1周的缓存都有，就不请求，否则请求
        const thisWeekFirstDay = addDays(start_date, (weekNum - 1) * 7);
        const res = await getLessonsDataByTimeRange(
            subtractDaysFromDate(thisWeekFirstDay, backWeekNum * 7),
            addDays(thisWeekFirstDay, 6 + advanceWeekNum * 7)
        );
        // 缓存的数据的期限是多少，我们先实现带有效期的缓存吧
        if (res) {
            const lessonArr = unionWith(lessonsInfo, res.data.schedules, isEqual);
            if (backWeekNum === 0 && advanceWeekNum === 0) {
                setLessonDataCache(weekNum, lessonArr);
            } else {
                const len = lessonArr.length;
                const weekMap = new Map();
                for (let i = 0; i < len; ++i) {
                    // 获取这个数据属于第几周
                    const week = getTheDateIsInWitchWeek(lessonArr[i].date);
                    if (weekMap.has(week)) {
                        const arr = weekMap.get(week);
                        arr.push(lessonArr[i]);
                    } else {
                        weekMap.set(week, [lessonArr[i]]);
                    }
                }
                const keys = [...weekMap.keys()];
                // 按照周来存储缓存
                for (let i = 0; i < keys.length; ++i) {
                    setLessonDataCache(keys[i], weekMap.get(keys[i]));
                }
            }
            setLessonsInfo(lessonArr);
            if (changeCurrentPageLessonInfo) {
                setCurrentPageLessonInfo(getLessonDataCache(currentPage));
            }
        }
    }
    function getTheDateIsInWitchWeek(date, startDate?: string = start_date) {
        let week = 1;
        while (daysBetween(addDays(startDate, week * 7), date) <= 0) {
            week++;
        }
        return week;
    }
    /**
     *
     * @param dayStr 比如“2024-11-25”
     * @param weekNum 第几周
     * @returns 是这周的第几天
     */
    function getWitchDayInThisWeek(dayStr: string, weekNum: number) {
        const thisWeekFirstDay = addDays(start_date, (weekNum - 1) * 7);
        return daysBetween(dayStr, thisWeekFirstDay);
    }
    // 获取特定weekNum的课表信息，日后要加缓存
    function getWitchWeekLessonInfo(weekNum: number) {
        const len = lessonsInfo.length;
        const weekMap = new Map();
        for (let i = 0; i < len; ++i) {
            // 获取这个数据属于第几周
            const week = getTheDateIsInWitchWeek(lessonsInfo[i].date);
            if (week === weekNum) {
                if (weekMap.has(week)) {
                    const arr = weekMap.get(week);
                    arr.push(lessonsInfo[i]);
                } else {
                    weekMap.set(week, [lessonsInfo[i]]);
                }
            }
        }
        // console.log('value', ...weekMap.values());
        return weekMap.get(weekNum);
    }
    const value: TimeTableGlobalParams = {
        isLoading,
        term,
        start_date,
        week_num,
        weekday,
        totalPages,
        isOther,
        checkAll,
        noonShow,
        eveningShow,
        lessonsInfo,
        currentPage,
        lessonInfoMap,
        currentPageLessonInfo,
        setLessonsInfo,
        setCurrentPage,
        utils: {
            getWitchDayInThisWeek,
            getTheDateIsInWitchWeek
        }
    };
    console.log(value);
    return <TimeTableContext.Provider value={value}>{children}</TimeTableContext.Provider>;
}

export default TimeTableContextProvider;
