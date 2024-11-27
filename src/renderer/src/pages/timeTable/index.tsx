import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';
import styles from './index.module.scss';
import TopNav from './components/TopNav';
import LeftBar from './components/LeftBar';
import TimeTableContent from './components/TimeTable';
import { createContext, useEffect, useMemo, useState } from 'react';
import { getLessonsDataByTimeRange, getTermTime } from '@renderer/apis/timeTable';
import { addDays, getCurrentDate } from '@renderer/utils/date';
import TimeTableContextProvider from './components/TimeTableContextProvider';

export default function TimeTable() {
    // 保证获取最新状态
    useUpdateStateSync();
    return (
        <TimeTableContextProvider>
            <div className={styles.container}>
                <div className="top">
                    <TopNav />
                </div>
                <div className="bottom">
                    <div className="left-bar">
                        <LeftBar />
                    </div>
                    <div className="time-table-content">
                        <TimeTableContent />
                    </div>
                </div>
            </div>
        </TimeTableContextProvider>
    );
}
