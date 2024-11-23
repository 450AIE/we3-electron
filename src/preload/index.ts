import { contextBridge, ipcRenderer } from 'electron';
// import { electronAPI } from '@electron-toolkit/preload'

contextBridge.exposeInMainWorld('IPC', {
    request: (config) => ipcRenderer.invoke('request', JSON.stringify(config))
});
