import { useState } from 'react';
import styles from './index.module.scss';
import { SelectDrawerProps } from './types';
import { isEqual, unionWith } from 'lodash';

// 可以性能优化，当前是每个选项都加了监听器，可以改为事件委托
function SelectDrawer({ layerItemArr }: SelectDrawerProps) {
    // console.log('receive', layerItemArr);
    if (!layerItemArr) return;
    function judgeActive(optionValue, ItemValue) {
        if (Array.isArray(ItemValue) && ItemValue.includes(optionValue)) return 'active';
        if (optionValue == ItemValue) return 'active';
        return '';
    }
    function triggerSetState(e, canMultiple, selectValue, oldValue, setState) {
        // console.log('new', selectValue, 'old', oldValue);
        // 如果oldValue是数组，代表这一项可以多选，然后toggle这一项
        if (Array.isArray(oldValue) && oldValue.includes(selectValue)) {
            const index = oldValue.findIndex((item) => item == selectValue);
            setState([...oldValue.slice(0, index), ...oldValue.slice(index + 1)]);
            return;
        }
        if (selectValue == oldValue) return;
        // 支持多选
        if (canMultiple) {
            if (oldValue && selectValue) {
                setState(unionWith(oldValue, [selectValue], isEqual));
            } else {
                setState([selectValue]);
            }
        } else {
            setState(selectValue);
        }
    }
    return (
        <ul className={styles.container}>
            {layerItemArr?.length &&
                layerItemArr.map((item, index) => (
                    <li className="one-layer beautify-scrollbar" key={index}>
                        {item.options.map((option, idx) => (
                            <span
                                // 一进入时判断是否有该项的active
                                className={`one-option ${judgeActive(option.value, item.value)}`}
                                key={idx}
                                onClick={(e) =>
                                    triggerSetState(
                                        e,
                                        item?.multiple,
                                        item.options[idx].value,
                                        item.value,
                                        item.setState
                                    )
                                }
                            >
                                {option.name}
                            </span>
                        ))}
                    </li>
                ))}
        </ul>
    );
}

export default SelectDrawer;
