import { getTodayDate } from '@renderer/utils/date';
import styles from './index.module.scss';
import { Carousel, Tabs } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { getBannerAPI, getJWZXMessageListAPI, getTodayLessonDataAPI } from '@renderer/apis/more';
import useUserStore from '@renderer/store/userStore';
import TodayLessonCard from './components/TodayLessonCard';
import { group } from 'console';
import { cloneDeep } from 'lodash';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

// num表示切分标准为几个为一组
function splitArrayByNum(arr, num) {
    const result = [];
    let processedIndices = new Set();
    for (let i = 0; i < arr.length; i += num) {
        const group = [];
        let currentIndex = i;
        let count = 0;
        while (count < num && currentIndex < arr.length) {
            if (!processedIndices.has(currentIndex) && arr[currentIndex].name !== '更多') {
                group.push(arr[currentIndex]);
                processedIndices.add(currentIndex);
                count++;
            }
            currentIndex++;
        }
        result.push(group);
    }
    return result.filter((arr) => arr.length > 0);
}

function More() {
    const date = getTodayDate();
    const { leftSiderbarOptionsArr, setLeftSiderbarOptionsArr } = useUserStore();
    const sliceOptionsArr = splitArrayByNum(leftSiderbarOptionsArr, 8);
    const [bannerImgArr, setBannerImgArr] = useState([]);
    const [todayLessonData, setTodayLessonData] = useState([]);
    const [jwzxMessageList, setJwzxMessageList] = useState([]);
    useEffect(() => {
        async function getBanner() {
            const res = await getBannerAPI();
            setBannerImgArr(res);
        }
        async function getTodayLessonData() {
            const res = await getTodayLessonDataAPI();
            setTodayLessonData(res.data.schedules);
        }
        async function getJWZXMessageList() {
            const res = await getJWZXMessageListAPI();
            setJwzxMessageList(res.data);
        }
        getTodayLessonData();
        getBanner();
        getJWZXMessageList();
    }, []);
    const tabs = [
        {
            key: '0',
            label: '今日日程',
            children:
                todayLessonData.length > 0 ? (
                    <ul className="today-lessons-box  beautify-scrollbar">
                        {todayLessonData.map((lesson) => (
                            <li className="today-one-lesson">
                                <TodayLessonCard lessonInfo={lesson} />
                            </li>
                        ))}
                    </ul>
                ) : null
        },
        {
            key: '1',
            label: '教务公告',
            children: null
        }
    ];
    function optionsClickFunc(e, option) {
        let dom = e.target;
        const newOption = {
            ...option,
            status: !option.status
        };
        const index = leftSiderbarOptionsArr.findIndex((options) => options.name === option.name);
        const newLeftSiderbarOptionsArr = cloneDeep(leftSiderbarOptionsArr);
        newLeftSiderbarOptionsArr[index] = newOption;
        // console.log('old:', leftSiderbarOptionsArr, 'new:', newLeftSiderbarOptionsArr);
        setLeftSiderbarOptionsArr(newLeftSiderbarOptionsArr);
    }
    return (
        <div className={styles.container}>
            <div className="today">
                <span className="icon"></span>
                <span>
                    今天是{date.slice(0, 4)}年{date.slice(5, 7)}月{date.slice(8)}日
                </span>
            </div>
            <div className="banner">
                <Carousel>
                    {bannerImgArr?.length &&
                        bannerImgArr.map((banner) => (
                            <div className="one-banner-img-box" key={banner.id}>
                                <img
                                    src={banner}
                                    alt=""
                                    data-link={banner.link_url}
                                    className="one-banner-img"
                                />
                            </div>
                        ))}
                </Carousel>
            </div>
            <div className="options-box">
                <Carousel adaptiveHeight draggable>
                    {sliceOptionsArr.map((optionArr, idx) => (
                        <ul key={idx} className="one-page-option-box">
                            {optionArr.map((option) => (
                                <li
                                    key={option.name}
                                    className="one-option"
                                    onClick={(e) => optionsClickFunc(e, option)}
                                >
                                    <div className="one-option-icon">
                                        {option.status ? (
                                            <div className="btn cancel-select">
                                                <PlusOutlined className="icon" />
                                            </div>
                                        ) : (
                                            <div className="btn confirm-select">
                                                <MinusOutlined className="icon" />
                                            </div>
                                        )}
                                        <img src={option.imgUrl} alt="" />
                                    </div>
                                    <span className="one-option-name">{option.name}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </Carousel>
            </div>
            <div className="schedule-and-notice">
                <Tabs items={tabs}></Tabs>
            </div>
        </div>
    );
}

export default More;
