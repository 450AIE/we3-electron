import { useMemo, useState } from 'react';
import { useTimeTableContext } from '../TimeTableContextProvider';
import TimeTableOnePage from '../TimeTableOnePage';
import styles from './index.module.scss';
import { Carousel } from 'antd';
import { getCurrentDate } from '@renderer/utils/date';

function TimeTableContent() {
    const {
        totalPages,
        setCurrentPage,
        currentPage,
        lessonInfoMap,
        utils: { getTheDateIsInWitchWeek }
    } = useTimeTableContext();
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
    return (
        <div className={styles.container}>
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
        </div>
    );
}

export default TimeTableContent;
