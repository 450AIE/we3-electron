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
        ({
            index: 0,
            name: '课表',
            icon: '',
            status: true
        },
        {
            index: 0,
            name: '更多',
            icon: '',
            status: false
        },
        {
            index: 0,
            name: '日历',
            icon: '',
            status: false
        },
        {
            index: 0,
            name: '物业报修',
            icon: '',
            status: false
        },
        {
            index: 0,
            name: '教室查询',
            icon: '',
            status: false
        })
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
