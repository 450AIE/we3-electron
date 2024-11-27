export function setLessonDataCache(weekNumKey, lessonDataValue) {
    // 我以  统一认证码 + 周数 表示key，val为这些周的课程信息
    localStorage.setItem(`1686965-${weekNumKey}`, JSON.stringify(lessonDataValue));
}

export function getLessonDataCache(weekNumKey) {
    return JSON.parse(localStorage.getItem(`1686965-${weekNumKey}`));
}
