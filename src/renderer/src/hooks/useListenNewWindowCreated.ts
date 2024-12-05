import useUserStore from '@renderer/store/userStore';
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
    // 我这里的状态暂时只同步userStore
    console.log('监听到新窗口创建了,传递数据:', JSON.stringify(userStore));
    IPC.sendToMainZustandStoreJSON(createdWindowName, JSON.stringify(userStore));
}

export default useListenNewWindowCreated;
