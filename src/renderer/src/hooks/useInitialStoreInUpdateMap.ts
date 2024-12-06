import useUserStore from '@renderer/store/userStore';

// 将该store加入updateMap
function useInitialStoreInUpdateMap(store) {
    IPC.initializeUpdateMap(store);
}

export default useInitialStoreInUpdateMap;
