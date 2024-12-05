import useUserStore from '@renderer/store/userStore';
import { useEffect } from 'react';

function useUpdateStateSync() {
    const userStore = useUserStore();
    useEffect(() => {
        IPC.onListenerToUpdateState((_, funcName, args) =>
            updateStateFunc(funcName, args, userStore)
        );
        return () => {
            console.log('卸载监听器');
            IPC.removeListenerToUpdateState();
        };
    });
}

function updateStateFunc(funcName, args, userStore) {
    console.log('收到的数据', funcName);
    // 这里传递多个参数可能有问题
    const data = JSON.parse(args);
    userStore[funcName](data);
}

export default useUpdateStateSync;
