export interface Update {
    // 对应的仓库名
    storeName: string;
    // 更新的函数
    funcName: string;
    // 更新的字段名
    filedName: string;
    // 主进程和渲染进程之间传递的参数，主进程和渲染进程之间
    // 只可以传递字符串
    args: string;
    // 该更新制作完成时的时间戳
    // number时表示这是某个字段更新，其的最后更新的时间戳
    // Array<Array<string, number>表示传递的是仓库，
    // 其中存放的是[ 0: [key对应字段,val字段的时间戳]]格式
    time: number | Array<Array<string, number>>;
    // 是否强制更新，true就会强制走到set函数，
    forceUpdate: boolean;
}
