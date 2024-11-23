import request from '@renderer/utils/http';
import { hex2b64, KEYUTIL } from '@utils/http/encrypt_RSA';

const publicKey =
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr9lk2DkxZdoK4KqKNJRW\n' +
    'cIypatbmU+Ou/XvuuFHEK5AJ6e9zaICoo0RwHeBLFPoHdIBUeric+KP51i5FUWOz\n' +
    '3EUfZY0Ogaey7sQHzx1rc3IKXy0pIwM3RASpkVmX70FMxa9wUvXNMtDlxurUbb5w\n' +
    'XJ5wGPZs4tAwo9G+AbU1HfLwfRjrweEs0NpmlodHVeqrBqGQlBjJCUpqenwzJ+WD\n' +
    'ds1FyFjGZmScAulPbChQ7Zlxhy6D1KC01O9LvycZNowZ7ovQ4i5V6b31lG9LNhKz\n' +
    'qjJxbxElxApmpsNh3RSlE72GTHhMU8Y9J7Nc/Tt+an5HKlOU6LsB1PMeyoRbj/SN\n' +
    'BQIDAQAB\n' +
    '-----END PUBLIC KEY-----';

// 加密
const encrypt_rsa = KEYUTIL.getKey(publicKey);

export function loginAPI(account: string, password: string, verification_code?: string) {
    const encryptedPassword = hex2b64(encrypt_rsa.encrypt(password));
    return request({
        url: '/login',
        method: 'POST',
        data: {
            cqupt_id: account,
            password: encryptedPassword,
            verification_code
        }
    });
}

export function getVertificationCodeAPI(account: string) {
    return request({
        defaultErrorToast: false,
        url: `/verification?cqupt_id=${account}`,
        method: 'GET',
        credentials: 'include'
    });
}
