import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('IPC', {
    request: (config) => ipcRenderer.invoke('request', JSON.stringify(config)),
    createWindow: (windowName) => ipcRenderer.send('createWindow', windowName),
    destroyWindow: (windowName) => ipcRenderer.send('destoryWindow', windowName),
    notifyAllWindowUpdateState: (update) =>
        ipcRenderer.send(
            'notify-all-window-update-state-from-renderer-process',
            JSON.stringify(update)
        ),
    onListenerToUpdateState: (cb) =>
        ipcRenderer.on('notify-all-window-update-state-from-main-process', cb),
    notifyAllWindowNewWindowCreated: (createdWindowName) =>
        ipcRenderer.send('notify-all-window-new-window-created', createdWindowName),
    // 新创建的窗口监听接收传来的仓库信息
    onListenerCreatedWindowToUpdateState: (cb) =>
        ipcRenderer.on('main-send-updated-state-to-new-created-window', cb),
    // 监听新窗口的创建
    onListenerNewWindowCreated: (cb) => ipcRenderer.on('new-window-created', cb),
    sendToMainZustandStoreJSON: (createdWindowName, update) =>
        ipcRenderer.send(
            'renderer-send-main-to-send-updated-state-to-new-created-window',
            createdWindowName,
            JSON.stringify(update)
        ),
    // 组件卸载，清除它的监听事件
    removeListenerToUpdateState: () =>
        ipcRenderer.removeAllListeners('notify-all-window-update-state-from-main-process'),
    removeListenerNewWindowCreated: () => ipcRenderer.removeAllListeners('new-window-created'),
    // 清除监听新窗口对zustand仓库传递的监听
    removeListenerCreatedWindowToUpdateState: () =>
        ipcRenderer.removeAllListeners('main-send-updated-state-to-new-created-window'),
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    closeWindow: () => ipcRenderer.send('closeWindow')
    // isNewCreatedWindow表示是否是新创建的窗口，是的话时间戳就不是全为0了,
    // 而是旧窗口的发送时间
    // initializeUpdateMap: (store: any, isNewCreatedWindow?: boolean = false) => {
    //     const time = isNewCreatedWindow ? Date.now() : 0;
    //     // 遍历初始化该store的所有字段，默认时间戳都为0
    //     traverseInitializeUpdateMap(store, updateMap, time);
    //     // console.log('updateMap', updateMap);
    // }
});
