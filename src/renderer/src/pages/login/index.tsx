import { getVertificationCodeAPI, loginAPI } from '@renderer/apis/login';
import { isElement, throttle } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import styles from './index.module.scss';
import LoginInput from './Input';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LOGIN_WINDOW, MAIN_WINDOW } from '@renderer/utils/windowTypes';
import useUserStore from '@renderer/store/userStore';
import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';

export function Login() {
    useUpdateStateSync();
    //
    const { userInfo, setUserInfo } = useUserStore();
    // 隐私政策
    const [checkPrivity, setCheckPrivity] = useState<Boolean>(true);
    // 帮助弹窗
    const [modal, setModalOpen] = useState(false);
    // 统一认证码的值
    const [account, setAccount] = useState<string>('1686965');
    // 密码的值
    const [password, setPassword] = useState<string>('1104850836L');
    // 验证码的值
    const [vertification, setVertification] = useState<string>();
    // 表示是否需要验证码
    const [isNeedVertification, setIsNeedVertification] = useState<boolean>(false);
    // base64字符串验证码
    const [vertificationBase64, setVertificationBase64] = useState<string>('');
    useEffect(() => {
        getVertification();
    }, [account]);
    async function getVertification() {
        if (account && account.length === 7) {
            const res = await getVertificationCodeAPI(account);
            if (res.data) {
                setIsNeedVertification(true);
                setVertificationBase64(res.data.vertification_code);
            } else {
                setIsNeedVertification(false);
                setVertificationBase64('');
            }
        } else {
            setIsNeedVertification(false);
            setVertificationBase64('');
        }
    }
    // 通知
    const [messageAPI, contextHolder] = message.useMessage();
    async function login() {
        if (!checkPrivity) {
            messageAPI.info('请确认隐私政策');
        } else if (!account) {
            messageAPI.info('请输入统一认证码');
        } else if (!password) {
            messageAPI.info('请输入密码');
        } else if (isNeedVertification && !vertification) {
            messageAPI.info('请输入验证码');
        } else {
            try {
                const res = await loginAPI(account, password, vertification);
                setUserInfo(res.data.user_info);
                // console.log(userInfo);
                if (res.msg === '登录成功') {
                    // 开辟新窗口，销毁登陆页的窗口
                    IPC.createWindow(MAIN_WINDOW);
                    IPC.destroyWindow(LOGIN_WINDOW);
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }
    const getVertificationCodeWithThrottle = throttle(getVertification, 1000);
    return (
        <div className={styles.container}>
            {contextHolder}
            <div className="input-box">
                <LoginInput
                    setStateFunc={setAccount}
                    placeholder="请输入统一验证码"
                    className="input"
                />
                <LoginInput
                    type="password"
                    setStateFunc={setPassword}
                    placeholder="请输入密码"
                    className="input"
                />
                <LoginInput
                    setStateFunc={setVertification}
                    placeholder="请输入验证码"
                    type="vertification"
                    base64={vertificationBase64}
                    flushVertificationFunc={getVertificationCodeWithThrottle}
                    className="input"
                />
            </div>
            <div className="privacy">
                <span>
                    我已阅读并同意 <span style={{ color: '#47ce7c' }}>隐私政策</span>
                </span>
                <span style={{ marginLeft: '10px' }}>
                    <QuestionCircleOutlined />
                    <span style={{ marginLeft: '4px' }}>帮助</span>
                </span>
            </div>
            <Button onClick={login} className="login-btn">
                登陆
            </Button>
        </div>
    );
}
