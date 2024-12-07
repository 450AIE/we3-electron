import { isCanUpdate } from '@shared/utils/update';
import useUserStore from '@renderer/store/userStore';
import { useEffect } from 'react';

function useUpdateStateSync() {
    const userStore = useUserStore();
    useEffect(() => {
        IPC.onListenerToUpdateState((_, update) => updateState(update, userStore));
        return () => {
            console.log('卸载监听器');
            IPC.removeListenerToUpdateState();
        };
    });
}

function updateState(update, userStore) {
    console.log('收到的update', JSON.parse(update));
    // 这里传递多个参数可能有问题
    update = JSON.parse(update);
    // 判断是否更新
    if (isCanUpdate(update.filedName, update.time)) {
        const args = JSON.parse(update.args);
        console.log('更新的...args', args);
        userStore[update.funcName](args, update.time);
    }
}

export default useUpdateStateSync;
