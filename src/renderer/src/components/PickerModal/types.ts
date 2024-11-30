export interface PickerModalProps {
    // 如果有多个picker出现，一次只打开一个，就会用
    // id来标识不同的picker，setIsOpen来修改为-1等
    // 标记关闭
    isOpen: boolean | number;
    setIsOpen: Function;
    options: any;
    // 双向绑定的数据
    value: any;
    setValue: Function;
}
