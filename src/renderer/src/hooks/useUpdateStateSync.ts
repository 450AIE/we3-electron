import useUserStore from '@renderer/store/userStore';
import { useEffect } from 'react';

function useUpdateStateSync() {
    useEffect(() => {
        IPC.onListenerToUpdateState(updateStateFunc);
        return () => {
            console.log('卸载监听器');
            IPC.removeListenerToUpdateState();
        };
    });
}

function updateStateFunc(funcName, args) {
    const data = JSON.parse(...args);
    const userStore = useUserStore();
    userStore[funcName](data);
}

export default useUpdateStateSync;
