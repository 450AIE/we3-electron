import { memo, useEffect, useRef, useState } from 'react';
import { darkenColor, getBgColor, getLocation } from '../../utils/common';
import { useTimeTableContext } from '../TimeTableContextProvider';
import styles from './index.module.scss';

const TimeTableOnePage = memo(({ lessonInfo, weekNum, height }) => {
    const {
        utils: { getWitchDayInThisWeek }
    } = useTimeTableContext();
    const [pageHeight, setPageHeight] = useState<number>();
    return (
        <div className={styles.container}>
            {lessonInfo?.length &&
                lessonInfo.map((lesson) => (
                    // 注意后续要根据是否左侧展开加入判断100/12还是13,14
                    <div
                        className="one-lesson"
                        key={lesson.id + lesson.date}
                        data-id={lesson.id}
                        data-startclock={lesson.time_slots[0]}
                        data-date={lesson.date}
                        style={{
                            height: (height / 12).toFixed(3) * lesson.time_slots.length + 'px',
                            width: (100 / 7).toFixed(3) + '%',
                            top: (lesson.time_slots[0] - 1) * (height / 12).toFixed(3) + 'px',
                            left:
                                getWitchDayInThisWeek(lesson.date, weekNum) * (100 / 7).toFixed(3) +
                                '%',
                            backgroundColor: getBgColor(lesson.time_slots),
                            color: darkenColor(getBgColor(lesson.time_slots))
                        }}
                    >
                        <span className="title">
                            {lesson.title.includes('大学体育')
                                ? lesson.title.slice(8)
                                : lesson.title}
                        </span>
                        <span className="location">{getLocation(lesson.location)}</span>
                    </div>
                ))}
        </div>
    );
});

export default TimeTableOnePage;
