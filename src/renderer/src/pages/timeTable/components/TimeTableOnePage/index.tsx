import { memo } from 'react';
import { getLocation } from '../../utils/common';
import { useTimeTableContext } from '../TimeTableContextProvider';
import styles from './index.module.scss';

const TimeTableOnePage = memo(({ lessonInfo, weekNum }) => {
    const {
        utils: { getWitchDayInThisWeek }
    } = useTimeTableContext();
    // console.log('one-page又被执行了', weekNum);
    // console.log('传递的lessonInfo', lessonInfo);
    return (
        <div className={styles.container}>
            {lessonInfo?.length &&
                lessonInfo.map((lesson) => (
                    // 注意后续要根据是否左侧展开加入判断100/12还是13,14
                    <div
                        className="one-lesson"
                        key={lesson.id}
                        style={{
                            height: (100 / 12).toFixed(3) * lesson.time_slots.length + '%',
                            width: (100 / 7).toFixed(3) + '%',
                            top: (lesson.time_slots[0] - 1) * (100 / 12).toFixed(3) + '%',
                            left:
                                getWitchDayInThisWeek(lesson.date, weekNum) * (100 / 7).toFixed(3) +
                                '%'
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