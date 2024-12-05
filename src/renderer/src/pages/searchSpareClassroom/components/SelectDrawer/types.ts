export interface SelectDrawerProps {
    layerItemArr: SelectDrawerLayerItem[];
}

export interface SelectDrawerLayerItem {
    // 可选项，比如['二教','三教']
    options: Array<{
        name: string;
        value: any;
    }>;
    // 这一行是否支持多选，支持的话最后setState会用数组包裹
    multiple?: boolean;
    // 对应的useState的数据，主要是多选要用来[...]结合旧数据
    value: any;
    // 选择对应选项后触发的更新函数
    setState: Function;
}
