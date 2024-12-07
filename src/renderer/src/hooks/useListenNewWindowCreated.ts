import useUserStore from '@renderer/store/userStore';
import { createUpdate, extractUpdateMapTo2DArray, updateMap } from '@shared/utils/update';
import { useEffect } from 'react';

function useListenNewWindowCreated() {
    const userStore = useUserStore();
    useEffect(() => {
        IPC.onListenerNewWindowCreated((_, createdWindowName) =>
            sendUpdatedStateToNewCreatedWindow(createdWindowName, userStore)
        );
        return () => {
            IPC.removeListenerNewWindowCreated();
        };
    });
}

function sendUpdatedStateToNewCreatedWindow(createdWindowName, userStore) {
    const time = extractUpdateMapTo2DArray();
    // 传递整个仓库
    const update = createUpdate('userStore', 'StoreJSON', JSON.stringify(userStore), time);
    // 我这里的状态暂时只同步userStore
    console.log('监听到新窗口创建了,传递数据,这是创建的update', update);
    IPC.sendToMainZustandStoreJSON(createdWindowName, update);
}

export default useListenNewWindowCreated;
