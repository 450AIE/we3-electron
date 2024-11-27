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
    // 组件卸载，清除它的监听事件
    removeListenerToUpdateState: () =>
        ipcRenderer.removeAllListeners('notify-all-window-update-state-from-main-process'),
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    closeWindow: () => ipcRenderer.send('closeWindow')
});
