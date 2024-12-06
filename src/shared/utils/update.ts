import { Update } from '../types/update';

// 主要负责打上时间戳
export function createUpdate(
    storeName: string,
    funcName: string,
    data: string,
    updateMap,
    forceUpdate?: boolean = false
): Update {
    const storeUpdateMap = updateMap.get(storeName);
    // 肯定是经过初始化了的，默认也都是0
    const time = storeUpdateMap.get(getDataNameByStoreFuncName(funcName));
    return {
        storeName,
        funcName,
        data,
        time,
        forceUpdate
    };
}

export function getDataNameByStoreFuncName(funcName: string) {
    if (key.startsWith('set') && typeof userStore[key] === 'function') {
        // 获取变量名，没有首字母
        const dataNameWithoutFirstChar = key.slice(4);
        // 获取首字母
        const dataNameFirstChar = key.slice(3, 4).toLowerCase();
        return (dataName = dataNameFirstChar + dataNameWithoutFirstChar);
    }
}

// 初始化该仓库，以及将该仓库的属性加入map存储时间戳，默认为0
export function traverseInitializeUpdateMap(store, updateMap, time?: number = 0) {
    const storeMap = new Map();
    updateMap.set(store.storeName, storeMap);
    for (let key in store) {
        if (key === 'storeName') continue;
        if (Object.prototype.hasOwnProperty.call(store, key)) {
            // 只保存基本的数据
            if (typeof store[key] !== 'function') {
                // 默认设置的时间戳为0
                storeMap.set(key, time);
            }
        }
    }
}

export function isUpdate() {}
