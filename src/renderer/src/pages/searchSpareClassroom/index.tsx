import { getSparceClassroomAPI } from '@renderer/apis/searchSpareClassroom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FloorSpareClassroom } from './types';
import useUserStore from '@renderer/store/userStore';
import styles from './index.module.scss';
import SelectDrawer from './components/SelectDrawer';
import { SelectDrawerLayerItem, SelectDrawerProps } from './components/SelectDrawer/types';
import { throttle } from 'lodash';

// 神经，不知道为什么怎么切换，请求到的空教室基本都是一样的，只有切换几教才切换
function SearchSpareClassroom() {
    const { dateInfo } = useUserStore();
    // 空闲楼层的信息
    const [sparceClassroomInfoList, setSpareClasssroomInfoList] = useState<FloorSpareClassroom>([]);
    // 选择几教
    const [buildingNum, setBuildingNum] = useState<string>('2');
    // 选择课节数。1-2为1,3-4为2,5-6为3，以此类推，最后放到数组['1','2','3']这种
    const [classNums, setClassNums] = useState<number[]>([1]);
    // 选择周几
    const [weekday, setWeekDay] = useState<string>(dateInfo.weekday);
    // 选择第几周
    const [weekNum, setWeekNum] = useState<string>(dateInfo.weekNum);
    //
    const scrollRef = useRef(null);
    const layerItemArr: SelectDrawerProps = [
        {
            options: [
                { name: '二教', value: '2' },
                { name: '三教', value: '3' },
                { name: '四教', value: '4' },
                { name: '五教', value: '5' },
                { name: '八教', value: '8' }
            ],
            value: buildingNum,
            setState: setBuildingNum
        },
        {
            options: [
                { name: '1-2节', value: 1 },
                { name: '3-4节', value: 2 },
                { name: '5-6节', value: 3 },
                { name: '7-8节', value: 4 },
                { name: '9-10节', value: 5 }
            ],
            multiple: true,
            value: classNums,
            setState: setClassNums
        },
        {
            options: [
                { name: '周一', value: '1' },
                { name: '周二', value: '2' },
                { name: '周三', value: '3' },
                { name: '周四', value: '4' },
                { name: '周五', value: '5' },
                { name: '周六', value: '6' },
                { name: '周日', value: '7' }
            ],
            value: weekday,
            setState: setWeekDay
        },
        {
            options: [
                { name: '第 1 周', value: '1' },
                { name: '第 2 周', value: '2' },
                { name: '第 3 周', value: '3' },
                { name: '第 4 周', value: '4' },
                { name: '第 5 周', value: '5' },
                { name: '第 6 周', value: '6' },
                { name: '第 7 周', value: '7' },
                { name: '第 8 周', value: '8' },
                { name: '第 9 周', value: '9' },
                { name: '第 10 周', value: '10' },
                { name: '第 11 周', value: '11' },
                { name: '第 12 周', value: '12' },
                { name: '第 13 周', value: '13' },
                { name: '第 14 周', value: '14' },
                { name: '第 15 周', value: '15' },
                { name: '第 16 周', value: '16' },
                { name: '第 17 周', value: '17' },
                { name: '第 18 周', value: '18' }
            ],
            value: weekNum,
            setState: setWeekNum
        }
    ];
    async function getSparceClassroom(
        week_num: string,
        week_day: string,
        building_num: string,
        class_nums: number[]
    ) {
        const res = await getSparceClassroomAPI(week_num, week_day, building_num, class_nums);
        setSpareClasssroomInfoList(res.data.room_list.floor_rooms);
    }
    useEffect(() => {
        getSparceClassroom(weekNum, weekday, buildingNum, classNums);
    }, [buildingNum, classNums, weekday, weekNum]);
    function listenChangeScrollHeight() {
        const height = window.innerHeight;
        scrollRef.current.style.height = height - 30 - 200 + 'px';
    }
    // 每次都触发，用来加高度scrollbar监听
    useEffect(() => {
        const height = window.innerHeight;
        scrollRef.current.style.height = height - 30 - 200 + 'px';
        const throttleListenChangeScrollHeight = throttle(listenChangeScrollHeight, 500);
        window.onresize = throttleListenChangeScrollHeight;
        return () => {
            window.onresize = null;
        };
    });
    return (
        <div className={styles.container}>
            <ul className="spare-floor-classroom-list beautify-scrollbar" ref={scrollRef}>
                {sparceClassroomInfoList?.length > 0 &&
                    sparceClassroomInfoList.map((floor, index) => (
                        <li className="spare-one-floor-classroom" key={floor.floor}>
                            <div className="floor-icon">{index + 1}F</div>
                            <div className="spare-classroom-box">
                                {floor.room?.length &&
                                    floor.room.map((room) => (
                                        <span className="spare-classroom" key={room}>
                                            {room}
                                        </span>
                                    ))}
                            </div>
                        </li>
                    ))}
            </ul>
            <SelectDrawer layerItemArr={layerItemArr} />
        </div>
    );
}

export default SearchSpareClassroom;
