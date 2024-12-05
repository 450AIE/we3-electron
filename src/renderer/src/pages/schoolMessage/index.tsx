import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getSchoolMessageAPI } from '@renderer/apis/schoolMessage';
import { SchoolMsgInfo } from './types';

function SchoolMessage() {
    const [schoolMsgInfoList, setSchoolMsgInfoList] = useState<SchoolMsgInfo[]>([]);
    async function getSchoolMsg(type, page, limit? = 12) {
        const res = await getSchoolMessageAPI(type, page, limit);
        setSchoolMsgInfoList(res.data.list);
    }
    useEffect(() => {
        getSchoolMsg(1, 1);
    }, []);
    return <div className={styles.container}></div>;
}

export default SchoolMessage;
