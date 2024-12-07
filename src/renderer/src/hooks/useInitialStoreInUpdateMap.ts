import useUserStore from '@renderer/store/userStore';
import { traverseInitializeUpdateMap } from '@shared/utils/update';
import { useEffect } from 'react';

// 将该store加入updateMap
function useInitialStoreInUpdateMap(store, isNewCreatedWindow? = false) {
    useEffect(() => {
        const time = isNewCreatedWindow ? Date.now() : 0;
        // 遍历初始化该store的所有字段，默认时间戳都为0
        traverseInitializeUpdateMap(store, time);
    }, []);

    // console.log('updateMap', updateMap);
}

export default useInitialStoreInUpdateMap;
