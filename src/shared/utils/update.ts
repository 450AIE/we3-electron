import { Update } from '../types/update';

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
 *      args: JSON化的数据
 *      time: 时间戳
 *      forceUpdate: 是否强制更新
 * }
 */
export const updateMap: Map<string, Map<string, number>> = new Map();

// 主要负责打上时间戳
export function createUpdate(
    storeName: string,
    // funcName为StoreJSON表示传递的整个仓库
    funcName: string,
    args: string,
    time?: number | Array<Array<string, number>>,
    forceUpdate?: boolean = false
): Update {
    let filedName = getDataNameByStoreFuncName(funcName);
    const storeUpdateMap = updateMap.get(storeName);
    // console.log('createUpdate', storeUpdateMap);
    // 肯定是经过初始化了的，默认也都是0
    // 如果funcName为StoreJSON，那么必定会传递time
    if (funcName !== 'StoreJSON') {
        time = storeUpdateMap.get(filedName);
    } else {
        // 表示这是传递的是整个仓库
        funcName = 'StoreJSON';
    }
    return {
        storeName,
        funcName,
        args,
        time,
        filedName,
        forceUpdate
    };
}

// 根据函数名获取对应变量名
export function getDataNameByStoreFuncName(funcName: string) {
    // 获取变量名，没有首字母
    const dataNameWithoutFirstChar = funcName.slice(4);
    // 获取首字母
    const dataNameFirstChar = funcName.slice(3, 4).toLowerCase();
    return dataNameFirstChar + dataNameWithoutFirstChar;
}

// 获取对应仓库对应字段的最后更新时间
export function getStoreFiledLatestUpdateTime(storeName, fieldName) {
    const filedsMap = updateMap.get(storeName);
    return filedsMap.get(fieldName);
}

// 初始化该仓库，以及将该仓库的属性加入map存储时间戳，默认为0
export function traverseInitializeUpdateMap(store, time?: number = 0) {
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

export function isCanUpdate(fieldName, receiveUpdateTime) {
    const updateLatestTime = getStoreFiledLatestUpdateTime('userStore', fieldName);
    console.log('上次更新时间:', updateLatestTime, '这次接收时间', receiveUpdateTime);
    // 收到的更新的时间更晚，才更新
    return receiveUpdateTime - updateLatestTime > 0;
}

export function extractUpdateMapTo2DArray() {
    const result = [];
    // 遍历外层Map的每一项
    updateMap.forEach((innerMap, outerKey) => {
        // 遍历内层Map的每一项
        innerMap.forEach((val, innerKey) => {
            result.push([innerKey, val]);
        });
    });
    return result;
}

export function updateUpdateMapFiledTime(storeName, field, time) {
    const fieldMap = updateMap.get(storeName);
    fieldMap.set(field, time);
    // console.log(`将${field}字段时间戳更新为${time}`, updateMap);
}
