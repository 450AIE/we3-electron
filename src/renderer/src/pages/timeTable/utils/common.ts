export const weekNameArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export const lessonTimeArr = [
    ['08:00', '08:45'],
    ['08:55', '09:40'],
    ['10:15', '11:00'],
    ['11:10', '11:55'],
    ['14:00', '14:45'],
    ['14:55', '15:40'],
    ['16:15', '17:00'],
    ['17:10', '17:55'],
    ['19:00', '19:45'],
    ['19:55', '20:40'],
    ['20:50', '21:35'],
    ['21:45', '22:30']
];

export function getLocation(inputStr) {
    if (!isNaN(inputStr)) {
        return inputStr;
    }
    const pattern = /[A-Z]\d{3}|[A-Z]\d{2}|[A-Z]\d/g;
    const matches = inputStr.match(pattern);
    if (matches && matches.length > 0) {
        return matches.join(' ');
    }
    return inputStr;
}
