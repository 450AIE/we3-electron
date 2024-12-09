import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';
import styles from './index.module.scss';
import TopNav from './components/TopNav';
import LeftBar from './components/LeftBar';
import TimeTableContent from './components/TimeTable';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { getLessonsDataByTimeRange, getTermTime } from '@renderer/apis/timeTable';
import { addDays, getCurrentDate } from '@renderer/utils/date';
import TimeTableContextProvider from './components/TimeTableContextProvider';
import { throttle } from 'lodash';

export default function TimeTable() {
    const bottomRef = useRef(null);
    const [pageHeight, setPageHeight] = useState<number>();
    // window resize就改变pageHeight传递
    useEffect(() => {
        if (bottomRef.current) {
            const height = bottomRef.current.offsetHeight;
            setPageHeight(height);
        }
        // 可能会有闭包的问题，尝试一下看看有没有
        // 这里可以正确获取到最新的bottomRef
        function listenPageHeightChange() {
            if (bottomRef.current) {
                const height = bottomRef.current.offsetHeight;
                setPageHeight(height);
            }
        }
        const throttleListenPageHeight = throttle(listenPageHeightChange, 500);
        window.onresize = throttleListenPageHeight;
        return () => {
            window.onresize = null;
        };
    }, []);
    return (
        <TimeTableContextProvider>
            <div className={styles.container}>
                <div className="top">
                    <TopNav />
                </div>
                <div className="bottom" ref={bottomRef}>
                    <div className="left-bar">
                        <LeftBar />
                    </div>
                    <div className="time-table-content">
                        <TimeTableContent height={pageHeight} />
                    </div>
                </div>
            </div>
        </TimeTableContextProvider>
    );
}
