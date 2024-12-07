import useUserStore from '@renderer/store/userStore';
import { getDataNameByStoreFuncName, isCanUpdate } from '@shared/utils/update';
import { useEffect } from 'react';

function useBeforeCreatedGetUpdatedState(createdWindowName: string) {
    const userStore = useUserStore();
    // 这个确实只会被触发一次
    useEffect(() => {
        IPC.notifyAllWindowNewWindowCreated(createdWindowName);
        IPC.onListenerCreatedWindowToUpdateState((_, update) => updateState(update, userStore));
        // 注意这个也要移除
        return () => {
            IPC.removeListenerCreatedWindowToUpdateState();
        };
    }, []);
}

function updateState(update, userStore) {
    update = JSON.parse(update);
    console.log('新创建窗口收到的update:', update);
    const store = JSON.parse(update.args);
    for (let key in userStore) {
        if (userStore.hasOwnProperty(key)) {
            // 调用set函数修改state
            if (key.startsWith('set') && typeof userStore[key] === 'function') {
                console.log('进入判断是否调用函数');
                const filedMap = update.time.find(
                    (filed) => filed[0] === getDataNameByStoreFuncName(key)
                );
                const filedName = filedMap[0];
                const receiveLatestUpdateTime = filedMap[1];
                // 根据时间判断是否更新
                console.log('字段', filedName, '收到的最后更新时间', receiveLatestUpdateTime);
                if (isCanUpdate(filedName, receiveLatestUpdateTime)) {
                    userStore[key](store[filedName], receiveLatestUpdateTime);
                }
            }
        }
    }
}

export default useBeforeCreatedGetUpdatedState;
