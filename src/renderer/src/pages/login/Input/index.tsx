import { memo, useEffect, useState } from 'react';
import { LoginInputProps } from '../types';
import styles from './index.module.scss';
import { Input } from 'antd';
import { UserOutlined, SafetyOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function LoginInput(props: LoginInputProps) {
    const { type, flushVertificationFunc, placeholder, setStateFunc, className, width, height } =
        props;
    // 控制是否展示密码
    const [isHidden, setIsHidden] = useState(false);
    // 保存input内的数值
    const [value, setValue] = useState('');
    return (
        <div className={styles.container + className ? className : ''}>
            <Input
                onChange={(e) => setStateFunc(e.target.value)}
                placeholder={placeholder}
                prefix={
                    flushVertificationFunc ? (
                        ''
                    ) : type === 'password' ? (
                        <SafetyOutlined />
                    ) : (
                        <UserOutlined />
                    )
                }
                style={{ width: '100%', height: '100%' }}
                suffix={
                    type === 'password' ? isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined /> : ''
                }
            />
        </div>
    );
}

export default LoginInput;
