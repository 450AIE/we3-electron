import styles from './index.module.scss';

function TodayLessonCard({ lessonInfo }) {
    if (!lessonInfo || lessonInfo.length <= 0) return;
    const { title, location, start_time, end_time, time_slots } = lessonInfo;
    return (
        <div className={styles.container}>
            <span className="title">{title}</span>
            <div className="location">{location}</div>
            <div className="time">
                <span>
                    {start_time}-{end_time}
                </span>
                <span>
                    第{time_slots[0]}节-第{time_slots[time_slots.length - 1]}节
                </span>
            </div>
        </div>
    );
}

export default TodayLessonCard;
