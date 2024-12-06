import { contextBridge, ipcRenderer } from 'electron';
// import { electronAPI } from '@electron-toolkit/preload'

contextBridge.exposeInMainWorld('IPC', {
    request: (config) => ipcRenderer.invoke('request', JSON.stringify(config)),
    createWindow: (windowName) => ipcRenderer.send('createWindow', windowName),
    destroyWindow: (windowName) => ipcRenderer.send('destoryWindow', windowName),
    notifyAllWindowUpdateState: (funcName, args) =>
        ipcRenderer.send('notify-all-window-update-state-from-renderer-process', funcName, args),
    onListenerToUpdateState: (cb) =>
        ipcRenderer.on('notify-all-window-update-state-from-main-process', cb),
    notifyAllWindowNewWindowCreated: (createdWindowName) =>
        ipcRenderer.send('notify-all-window-new-window-created', createdWindowName),
    // 新创建的窗口监听接收传来的仓库信息
    onListenerCreatedWindowToUpdateState: (cb) =>
        ipcRenderer.on('main-send-updated-state-to-new-created-window', cb),
    // 监听新窗口的创建
    onListenerNewWindowCreated: (cb) => ipcRenderer.on('new-window-created', cb),
    sendToMainZustandStoreJSON: (createdWindowName, jsonStore) =>
        ipcRenderer.send(
            'renderer-send-main-to-send-updated-state-to-new-created-window',
            createdWindowName,
            jsonStore
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
});
