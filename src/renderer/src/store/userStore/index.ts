import { create } from 'zustand';
import { LeftSiderbarOption, UserInfo } from './types';
import stateSync from '../plugins/stateSync';
import { isEqual, unionWith } from 'lodash';
import { UserInfo } from './types';

const useUserStore = create((set, get) => {
    const userInfo: UserInfo = {};
    function setUserInfo(newUserInfo) {
        if (isEqual(newUserInfo, userInfo)) return true;
        set((state) => ({
            userInfo: {
                ...state.userInfo,
                ...newUserInfo
            }
        }));
        stateSync('setUserInfo', arguments);
        return false;
    }
    // status表示是否选择展示在左侧
    const leftSiderbarOptionsArr: LeftSiderbarOption[] = [
        {
            index: 0,
            name: '课表',
            icon: '',
            link: '/timeTable',
            status: true
        },
        {
            index: 1,
            name: '日历',
            icon: '',
            link: '/calender',
            status: false
        },
        {
            index: 2,
            name: '物业报修',
            icon: '',
            link: '/reportRepaire',
            status: false
        },
        {
            index: 3,
            name: '教室查询',
            icon: '',
            link: '/searchClassroom',
            status: false
        },
        {
            index: 4,
            name: '更多',
            icon: '',
            link: '/more',
            status: false
        },
        {
            index: 5,
            name: '校园资讯',
            icon: '',
            link: '/schoolMessage',
            status: false
        },
        {
            index: 6,
            name: '失物招领',
            icon: '',
            link: '/loseFound',
            status: false
        },
        {
            index: 7,
            name: '图书借阅',
            icon: '',
            link: '/searchBooks',
            status: false
        },
        {
            index: 8,
            name: '电费查询',
            icon: '',
            link: '/electricityFeeInquery',
            status: false
        }
    ];
    function setLeftSiderbarOptionsArr(newArr) {
        newArr = newArr.sort((cur, next) => cur.index - next.index);
        const oldArr = leftSiderbarOptionsArr.sort((cur, next) => cur.index - next.index);
        if (isEqual(newArr, oldArr)) return true;
        set((state) => ({
            leftSiderbarOptionsArr: unionWith(oldArr, newArr, isEqual)
        }));
        stateSync('setLeftSiderbarOptionsArr', arguments);
        return false;
    }
    return {
        userInfo,
        setUserInfo,
        leftSiderbarOptionsArr,
        setLeftSiderbarOptionsArr
    };
});
export default useUserStore;
