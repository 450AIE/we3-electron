import { Button, Modal } from 'antd';
import styles from './index.module.scss';
import { useState } from 'react';

function LessonDetail({ lessonInfo, isOpen, setIsOpen }) {
    if (!lessonInfo || !isOpen) return;
    const {
        time_slots,
        location,
        type_id,
        title,
        data: { teacher_name, class_id },
        week_nums,
        week_num
    } = lessonInfo;
    return (
        <div className={styles.container}>
            <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={null}
                closable={false}
                centered
                getContainer={false}
                className={'box'}
            >
                <ul className="info-box">
                    <li className="info-item">第{week_num}周</li>
                    <li className="info-item">22</li>
                    <li className="info-item title">{title}</li>
                    <li className="info-item">
                        课程周数:
                        <i className="margin-3px" />第
                        {`${week_nums[0]}-${week_nums[week_nums.length - 1]}`}周
                    </li>
                    <li className="info-item">
                        地点:
                        <i className="margin-3px" />
                        {location}
                    </li>
                    <li className="info-item">
                        教师:
                        <i className="margin-3px" />
                        {teacher_name}
                    </li>
                    <li className="info-item">
                        教学班:
                        <i className="margin-3px" />
                        {class_id}
                    </li>
                    <li className="info-item select-list">选课名单</li>
                    <li className="btn-box">
                        <Button className="btn">添加备注</Button>
                    </li>
                </ul>
            </Modal>
        </div>
    );
}

export default LessonDetail;
