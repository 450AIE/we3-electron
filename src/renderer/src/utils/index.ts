export function convertToChinese(num) {
    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chineseUnits = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];

    if (num === 0) {
        return '零';
    }

    if (num < 10) {
        return chineseNumbers[num];
    }

    if (num < 20) {
        return '十' + (num % 10 === 0 ? '' : chineseNumbers[num % 10]);
    }

    const digits = num.toString().split('').map(Number);
    let result = '';
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== 0) {
            result += chineseNumbers[digits[i]] + chineseUnits[digits.length - 1 - i];
        } else if (i < digits.length - 1 && digits[i + 1] !== 0) {
            result += '零';
        }
    }
    return result;
}
