import {
    createUpdate,
    getDataNameByStoreFuncName,
    updateUpdateMapFiledTime
} from '@shared/utils/update';
// 不仅发送数据，还要更新updateMap中的时间戳
function stateSync(funcName, args, time) {
    updateUpdateMapFiledTime('userStore', getDataNameByStoreFuncName(funcName), time);
    // console.log('stateSync更新数据完毕');
    const update = createUpdate('userStore', funcName, JSON.stringify(...args));
    console.log('stateSync发送的同步update:', update);
    IPC.notifyAllWindowUpdateState(update);
}
export default stateSync;
