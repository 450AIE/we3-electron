import { useContext } from 'react';
import styles from './index.module.scss';
import { useTimeTableContext } from '../TimeTableContextProvider';
import { addDays } from '@renderer/utils/date';
import { convertToChinese } from '@renderer/utils';

function TopNav() {
    const { start_date, currentPage } = useTimeTableContext();
    const thisWeekFirstDay = addDays(start_date, (currentPage - 1) * 7);
    return (
        <div className={styles.container}>
            <div className="week-icon" />
            {new Array(7).fill(null).map((item, idx) => (
                <div className="item" key={idx}>
                    <span className="week-name">
                        周{idx === 6 ? '日' : convertToChinese(idx + 1)}
                    </span>
                    <span>{addDays(thisWeekFirstDay, idx).slice(5)}</span>
                </div>
            ))}
        </div>
    );
}

export default TopNav;
