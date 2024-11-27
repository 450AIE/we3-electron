/**
 *
 * @param dateStr 原始日期字符串，比如"2020-02-10"
 * @param daysToAdd 增加的日期
 * @returns 返回增加后的最终日期
 */
export function addDays(dateStr, daysToAdd): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 *
 * @returns 获取的时间是"2020-10-03"这种格式
 */
export function getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function daysBetween(date1: string, date2: string): number {
    const date1Parts = date1.split('-').map(Number);
    const date2Parts = date2.split('-').map(Number);
    const date1Obj = new Date(date1Parts[0], date1Parts[1] - 1, date1Parts[2]);
    const date2Obj = new Date(date2Parts[0], date2Parts[1] - 1, date2Parts[2]);
    const timeDiff = date1Obj.getTime() - date2Obj.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

export function subtractDaysFromDate(dateStr, daysToSubtract) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - daysToSubtract);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
