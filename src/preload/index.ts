import { contextBridge, ipcRenderer } from 'electron';
import { traverseInitializeUpdateMap } from '@shared/utils/update';

/**
 * 灵感来自Vue3的targetMap
 *
 *  key为仓库名，val为该仓库对应的属性字段Map，该字段的val收到的最新更新的时间戳,
 * (可能是自己更新的，也可能是接收的更新，总之，要在仓库set就更新这个值)
 * 就可以比较该字段来判读是否更新，有如下好处:
 * 1. 不用再进入仓库isEqual对比，优化性能
 * 2. 可以根据时间戳判断该更新发送的时间，可以避免新的更新先到，旧的更新后到造成的
 *    仓库状态为旧状态
 *
 * 例子:
 *  1.key : userStore ,  val: [
 *                  key:   userInfo ,  val: 2000 (代表该数据最后更新时间为2000)
 *                  key:   dateInfo ,  val: 1800
 * ]
 *
 * --------------------------------------------------------------------------
 * 要让渲染进程和主进程传递的数据格式为
 * {
 *      data: JSON化的数据
 *      time: 时间戳
 *      forceUpdate: 是否强制更新
 * }
 */
const updateMap: Map<string, Map<string, number>> = new Map();

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
    closeWindow: () => ipcRenderer.send('closeWindow'),
    // isNewCreatedWindow表示是否是新创建的窗口，是的话时间戳就不是全为0了,
    // 而是旧窗口的发送时间
    initializeUpdateMap: (store: any, isNewCreatedWindow?: boolean = false) => {
        const time = isNewCreatedWindow ? Date.now() : 0;
        // 遍历初始化该store的所有字段，默认时间戳都为0
        traverseInitializeUpdateMap(store, updateMap, time);
        // console.log('updateMap', updateMap);
    },
    updateUpdateMapByField: (storeName, filedName, time) => {
        const filedsMap = updateMap.get(storeName);
        filedsMap.set(filedName, time);
    }
});
