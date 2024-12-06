import { LOGIN_WINDOW } from '@shared/types/windows';

// 不仅发送数据，还要更新updateMap中的时间戳
function stateSync(funcName, args) {
    IPC.notifyAllWindowUpdateState(funcName, JSON.stringify(...args));
    IPC.updateUpdateMap();
    console.log('传递的数据:', funcName, ...args);
    // console.log('JSON.parse(args)', JSON.stringify(args));
    // console.log('args', args);
    // console.log('...args', ...args);
    // console.log('JSON.parse(...args)', JSON.stringify(...args));
}
export default stateSync;
