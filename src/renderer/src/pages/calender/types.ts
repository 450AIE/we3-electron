export interface TermTime {
    '1.1': Array<string[]>;
    '1.2': Array<string[]>;
    '2.1': Array<string[]>;
    '2.1': Array<string[]>;
    '3': Array<string[]>;
    '4': Array<string[]>;
    '5': Array<string[]>;
    '6': Array<string[]>;
    '7.1': Array<string[]>;
    '7.2': Array<string[]>;
    '8': Array<string[]>;
    '9': Array<string[]>;
    '10': Array<string[]>;
    '11': Array<string[]>;
    '12': Array<string[]>;
}

export interface OneTermCalendarProps {
    mounthArr: string[];
    termTimeList: Array<string[]>;
}

export interface OneMounthCalendarProps {
    startWeekNum: number;
    mounth: number;
    year: number;
    showToday: boolean;
    timeList: Array<string[]>;
}
