import { getSparceClassroomAPI } from '@renderer/apis/searchSpareClassroom';
import { useEffect, useState } from 'react';

function SearchSpareClassroom() {
    const [sparceClassroomInfoList, setSpareClasssroomInfoList] = useState([]);
    useEffect(() => {
        async function getSparceClassroom() {
            const res = await getSparceClassroomAPI('13', '2', '2', ['1-2']);
            console.log('res', res);
        }
        getSparceClassroom();
    }, []);
    return <div>nihao</div>;
}

export default SearchSpareClassroom;
