export interface LeftSiderbarOption {
    index: number;
    name: string;
    icon: string;
    status: boolean;
}

export interface UserInfo {
    name: string;
    role: string;
    user_id: string;
    cqupt_id: string;
    student_id: string;
    grade: string;
    class: string;
    unit_name: string;
    profession_name: string;
    gender: string;
    counselor_name: string;
    counselor_cqupt_id: string;
    teacher_id: string;
    // 上面的信息login就可以获取，token自己设置
    token: string;
}

export interface DateInfo {
    // 第几学期
    term: string;
    // 这学期开始的那一天
    startDate: string;
    // 第几周
    weekNum: number;
    // 第几周的第几天
    weekday: number;
}
