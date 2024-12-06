export interface Update {
    // 对应的仓库名
    storeName: string;
    // 更新的函数
    funcName: string;
    // 主进程和渲染进程之间只可以传递字符串
    data: string;
    // 该更新制作完成时的时间戳
    time: number;
    // 是否强制更新
    forceUpdate: boolean;
}
