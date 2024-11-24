import { LOGIN_WINDOW } from '@renderer/utils/windowTypes';
import { isFunction } from 'lodash';

function stateSync(funcName, args) {
    IPC.notifyAllWindowUpdateState(funcName, JSON.stringify(args));
    console.log('传递的数据:', funcName, ...args);
}

export default stateSync;
