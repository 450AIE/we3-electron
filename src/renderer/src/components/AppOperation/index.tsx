import { BorderOutlined, CloseOutlined, ExpandOutlined, MinusOutlined } from '@ant-design/icons';
import { memo } from 'react';
import styles from './index.module.scss';

const AppOperation = memo(() => {
    const iconList = [<MinusOutlined />, <BorderOutlined />, <CloseOutlined />];
    function appOperate(e) {
        // console.log(e.target);
        let dom = e.target;
        let parent = dom;
        while (![...dom.classList].includes('icon')) {
            parent = parent.parentNode;
            dom = parent;
        }
        const { id } = dom.dataset;
        switch (id) {
            case '0':
                IPC.minimize();
                break;
            case '1':
                IPC.maximize();
                break;
            case '2':
                IPC.closeWindow();
                break;
            default:
                break;
        }
    }
    return (
        <ul className={styles.container} onClick={appOperate}>
            {iconList.map((item, idx) => (
                <li className="icon" data-id={idx}>
                    {item}
                </li>
            ))}
        </ul>
    );
});

export default AppOperation;
