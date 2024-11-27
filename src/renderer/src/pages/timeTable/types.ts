export interface TimeTableGlobalParams {
    term: string;
    start_date: string;
    // 表示当前第几周
    week_num: number;
    // 课表总共21页
    totalPages: number;
    // 是否是别人访问别人的课表
    isOther: boolean;
    checkAll: boolean;
    // 左侧边栏中午的箭头是否点击过
    noonShow: boolean;
    // 左侧边栏傍晚的箭头是否点击过
    eveningShow: boolean;
    // 存储课表信息，用来展示数据
    lessonsInfo: LessonInfo[];
    // 表示今天是本周的第几天
    weekday: number;
    // 当前翻到第几页（第几周）
    currentPage: number;
    // key为周，val为对应周的课程信息
    lessonInfoMap: Map<number, LessonInfo[]>;
    // 当前所翻到页所要展示的课表数据
    currentPageLessonInfo: LessonInfo[];
    setCurrentPage: Function;
    // 更新课表信息的函数
    setLessonsInfo: Function;
    // unitHeight: number;
    // unitWidth: number;
    utils: {
        getWitchDayInThisWeek: Function;
        getTheDateIsInWitchWeek: Function;
    };
    // 这些我也不知道是什么
    // ifStorage: boolean;
    // detailTime: string[][];
    // pickTimeList: string[][];
    // updateDetailTime: Function;
    // reloadObj: {
    //     reloadFlag: number;
    //     reload: Function;
    // };
    // modal: {
    //     isOpen: boolean;
    //     changeStatus: Function;
    //     setComponent: Function;
    // };
    // action: {
    //     changeAtActionSheetAttrs: Function;
    //     setConfirmCallback: Function;
    // };
    // changePageT: Function;
    // changeAtToastAttrs: Function;
}

interface LessonInfo {
    data: {
        chief_invigilator: string;
        class_id: string;
        class_name: string;
        course_id: string;
        course_name: string;
        course_type: string;
        deputy_invigilators: string;
        exam_type: string;
        lecturer: string;
        qualification: string;
        schedule_id: string;
        seat: string;
        teacher_name: string;
        date: string;
        description: string;
        end_time: string;
        id: string;
        location: string;
        start_time: string;
    };
    time_slots: number[];
    title: string;
    type: number;
    type_id: string;
    week_num: number;
    week_nums: number[];
}
