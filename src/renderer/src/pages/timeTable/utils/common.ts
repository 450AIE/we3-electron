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

export function getBgColor(time_slots) {
    const startDate = time_slots[0];
    if (startDate < 5) {
        return '#baf7c0';
    } else if (startDate < 9) {
        return '#a7d4ff';
    } else {
        return '#cfb8ff';
    }
}

export function darkenColor(colorHex) {
    // 去除颜色字符串开头的#号
    const hex = colorHex.startsWith('#') ? colorHex.slice(1) : colorHex;
    // 判断颜色是三位缩写形式（如#ccc）还是六位形式（如#cccccc）
    const isShortForm = hex.length === 3;
    // 将颜色字符串转换为RGB数组
    const rgb = [];
    for (let i = 0; i < (isShortForm ? 3 : 6); i += isShortForm ? 1 : 2) {
        const component = hex.substr(i, isShortForm ? 1 : 2);
        rgb.push(parseInt(component, 16));
    }
    // 调整每个RGB分量值，使其变小来让颜色变深，这里可以根据需要调整减小的比例
    const factor = 0.65; // 调整因子，取值范围0到1，越小颜色越深
    const darkenedRgb = rgb.map((component) => Math.max(0, Math.floor(component * factor)));
    // 将调整后的RGB数组转换回十六进制字符串
    const darkenedHex = `#${darkenedRgb.map((component) => component.toString(16).padStart(2, '0')).join('')}`;
    return darkenedHex;
}
