import { Modal } from 'antd';
import styles from './index.module.scss';
import { PickerModalProps } from './types';
import { useEffect, useRef, useState } from 'react';

function PickerModal({ isOpen, setIsOpen, options, value, setValue }: PickerModalProps) {
    const [selectedOption, setSelectedOption] = useState(-1);
    function confirm() {
        console.log('当前选择的option是:', selectedOption);
        setValue(selectedOption);
        setIsOpen(0);
    }
    function select(e) {
        const dom = e.target;
        if (![...dom.classList].includes('one-option')) return;
        const { index } = dom.dataset;
        const option = options[index];
        console.log('option', option);
        setSelectedOption(option);
    }
    return (
        <div className={styles.container}>
            <Modal
                open={isOpen}
                centered
                onCancel={() => setIsOpen(0)}
                getContainer={false}
                onOk={confirm}
                closable={false}
            >
                <ul className="options-box beautify-scrollbar" onClick={select}>
                    {options?.length &&
                        options.map((option, idx) => (
                            <li
                                className={`one-option ${option.id == selectedOption.id ? 'active' : ''}`}
                                key={idx}
                                data-index={idx}
                            >
                                {option.name}
                            </li>
                        ))}
                </ul>
            </Modal>
        </div>
    );
}

export default PickerModal;
