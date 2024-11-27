import request from '@renderer/utils/http';

export function getLessonsDataByTimeRange(start_date, end_date, types = '[1,2,3]') {
    const params = new URLSearchParams({ start_date, end_date, types });
    return request({
        url: '/timetable',
        params: params
    });
}

export function getTermTime() {
    return request({
        url: '/time',
        headers: {
            traefick: 'jwzx'
        }
    });
}
