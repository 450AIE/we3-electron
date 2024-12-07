import { create } from 'zustand';
import { DateInfo, LeftSiderbarOption, UserInfo } from './types';
import stateSync from '../plugins/stateSync';
import { isEqual, unionWith } from 'lodash';
import { UserInfo } from './types';
import { useState } from 'react';
import { getTermTime } from '@renderer/apis/timeTable';
import ElecticityInqueryFeeImg from '@/renderer/src/assets/home/electric.png';
import CalendarImg from '@/renderer/src/assets/home/CYcleander.png';
import ReportRepaierImg from '@/renderer/src/assets/home/repairReport.png';
import SearchSpareClassroomImg from '@/renderer/src/assets/home/emptyRoom.png';
import SchoolMessageImg from '@/renderer/src/assets/home/schoolMessage.png';
import LoseThingImg from '@/renderer/src/assets/home/loseThing.png';
import SearchBooks from '@/renderer/src/assets/home/booksearch.png';
import SearchTimeTable from '@/renderer/src/assets/home/searchTimeTable.png';

const useUserStore = create((set, get) => {
    const storeName = 'userStore';
    const userInfo: UserInfo = {};
    const dateInfo: DateInfo = {};
    // 这个time可能是自己仓库触发更新，然后打上时间戳，也可能是
    // 接收的其他仓库的time，用来更新自己的time
    function setUserInfo(newUserInfo, time? = Date.now()) {
        console.log(newUserInfo, get().userInfo);
        if (isEqual(newUserInfo, get().userInfo)) return true;
        set((state) => ({
            userInfo: {
                ...state.userInfo,
                ...newUserInfo
            }
        }));
        // 只传递args[0]保证不会将time也传递出去
        // console.log('args和[args[0]]是一个东西吗:', arguments, [arguments[0]]);
        stateSync('setUserInfo', [arguments[0]], time);
        return false;
    }
    // status表示是否选择展示在左侧
    const leftSiderbarOptionsArr: LeftSiderbarOption[] = [
        {
            index: 0,
            name: '课表查询',
            icon: '',
            imgUrl: SearchTimeTable,
            link: '/timeTable',
            status: true
        },
        {
            index: 1,
            name: '重邮校历',
            icon: '',
            imgUrl: CalendarImg,
            link: '/calender',
            status: false
        },
        {
            index: 2,
            name: '物业报修',
            icon: '',
            imgUrl: ReportRepaierImg,
            link: '/reportRepaire',
            status: false
        },
        {
            index: 3,
            name: '教室查询',
            icon: '',
            imgUrl: SearchSpareClassroomImg,
            link: '/searchSpareClassroom',
            status: false
        },
        {
            index: 4,
            name: '更多',
            icon: '',
            imgUrl: '',
            link: '/more',
            status: true
        },
        {
            index: 5,
            name: '校园资讯',
            icon: '',
            imgUrl: SchoolMessageImg,
            link: '/schoolMessage',
            status: false
        },
        {
            index: 6,
            name: '失物招领',
            icon: '',
            imgUrl: LoseThingImg,
            link: '/loseFound',
            status: false
        },
        {
            index: 7,
            name: '图书借阅',
            icon: '',
            imgUrl: SearchBooks,
            link: '/searchBooks',
            status: false
        },
        {
            index: 8,
            name: '电费查询',
            icon: '',
            imgUrl: ElecticityInqueryFeeImg,
            link: '/electricityFeeInquery',
            status: false
        }
    ];
    function setLeftSiderbarOptionsArr(newArr, time? = Date.now()) {
        newArr = newArr.sort((cur, next) => cur.index - next.index);
        const oldArr = get().leftSiderbarOptionsArr.sort((cur, next) => cur.index - next.index);
        if (isEqual(newArr, oldArr)) return true;
        set((state) => ({
            leftSiderbarOptionsArr: newArr
        }));
        stateSync('setLeftSiderbarOptionsArr', [arguments[0]], time);
        return false;
    }
    // 每个窗口的仓库都会自动执行这个，不用状态同步
    async function getDateInfo() {
        const res = await getTermTime();
        const newDateInfo = {
            startData: res.data.time.start_date,
            term: res.data.time.term,
            weekNum: res.data.time.week_num,
            weekday: res.data.time.weekday
        };
        // if (isEqual(newDateInfo, dateInfo)) return true;
        set((state) => ({
            dateInfo: newDateInfo
        }));
        // return false;
    }
    getDateInfo();
    return {
        storeName,
        userInfo,
        setUserInfo,
        leftSiderbarOptionsArr,
        setLeftSiderbarOptionsArr,
        dateInfo
    };
});

export default useUserStore;
