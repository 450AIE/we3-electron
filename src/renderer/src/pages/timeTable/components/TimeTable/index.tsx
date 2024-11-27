import { useMemo, useState } from 'react';
import { useTimeTableContext } from '../TimeTableContextProvider';
import TimeTableOnePage from '../TimeTableOnePage';
import styles from './index.module.scss';
import { Carousel } from 'antd';
import { getCurrentDate } from '@renderer/utils/date';
import LessonDetail from '../LessonDetail';
import { LessonInfo } from '../../types';

function TimeTableContent() {
    const {
        totalPages,
        setCurrentPage,
        currentPage,
        lessonInfoMap,
        utils: { getTheDateIsInWitchWeek, findOneLessonInfo }
    } = useTimeTableContext();
    const [isOpenLessonDetai, setIsOpenLessonDetail] = useState<boolean>(false);
    const [clickLessonInfo, setClickLessonInfo] = useState<LessonInfo | null>(null);
    // console.log('table渲染了', currentPage);
    function swiperToSetCurrentPage(current, next) {
        console.log(current, next);
        if (current === next) return;
        const isGoBack = next - current > 0 ? false : true;
        if (isGoBack) {
            setCurrentPage(currentPage - 1 <= 0 ? 0 : currentPage - 1);
        } else {
            setCurrentPage(currentPage + 1 >= totalPages ? totalPages : currentPage + 1);
        }
    }
    // 只有currentPage的前后才传递信息渲染
    function isConveyLessonInfo(weekNum) {
        return (
            weekNum === currentPage - 1 || weekNum === currentPage + 1 || weekNum === currentPage
        );
    }
    // 返回第weekNum周的课程信息
    function conveyLessonInfo(weekNum) {
        // if (isConveyLessonInfo(weekNum)) {
        return lessonInfoMap.get(weekNum);
        // }
    }
    function openLessonDetail(e) {
        let findTimes = 0;
        let dom = e.target;
        let parent = dom;
        while (![...dom.classList].includes('one-lesson')) {
            // 优化一下，不能一直走，否则太浪费性能，4次没找到说明点击的不是课程
            if (findTimes >= 3) return;
            parent = parent.parentNode;
            dom = parent;
            findTimes++;
        }
        const { date, id, startclock: startClock } = dom.dataset;
        const lessonInfo = findOneLessonInfo(date, id, startClock);
        setClickLessonInfo(lessonInfo);
        setIsOpenLessonDetail(true);
    }
    return (
        // 事件委托打开课表详情
        <div className={styles.container} onClick={openLessonDetail}>
            <Carousel
                dots={false}
                adaptiveHeight
                draggable
                beforeChange={swiperToSetCurrentPage}
                infinite={false}
                initialSlide={getTheDateIsInWitchWeek(getCurrentDate(), '2024-09-09')}
            >
                {/* idx就代表周数，第0周要做总的课表 */}
                {new Array(totalPages).fill(null).map((_, idx) => (
                    <div className="one-page" key={idx}>
                        <TimeTableOnePage lessonInfo={conveyLessonInfo(idx)} weekNum={idx} />
                    </div>
                ))}
            </Carousel>
            <LessonDetail
                isOpen={isOpenLessonDetai}
                lessonInfo={clickLessonInfo}
                setIsOpen={setIsOpenLessonDetail}
            />
        </div>
    );
}

export default TimeTableContent;
