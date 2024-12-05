import useUserStore from '@renderer/store/userStore';
import { useEffect } from 'react';

function useBeforeCreatedGetUpdatedState(createdWindowName: string) {
    const userStore = useUserStore();
    // 这个确实只会被触发一次
    useEffect(() => {
        IPC.notifyAllWindowNewWindowCreated(createdWindowName);
        IPC.onListenerCreatedWindowToUpdateState((_, jsonStore) => 
            updateState(jsonStore, userStore);
        );
        // 注意这个也要移除
        return () => {
            IPC.removeListenerToUpdateState();
        };
    }, []);
}

function updateState(jsonStore, userStore) {
    console.log('收到的', JSON.parse(jsonStore));
    const store = JSON.parse(jsonStore);
    for (let key in userStore) {
        if (userStore.hasOwnProperty(key)) {
            // 调用set函数修改state
            if (key.startsWith('set') && typeof userStore[key] === 'function') {
                // 获取变量名，没有首字母
                const dataNameWithoutFirstChar = key.slice(4);
                // 获取首字母
                const dataNameFirstChar = key.slice(3, 4).toLowerCase();
                const dataName = dataNameFirstChar + dataNameWithoutFirstChar;
                console.log('data', dataName, 'function', key, userStore[key]);
                userStore[key](store[dataName]);
            }
        }
    }
}

export default useBeforeCreatedGetUpdatedState;
