import request from '@renderer/utils/http';

export function getSparceClassroomAPI(
    week_num: string,
    week_day: string,
    building_num: string,
    class_nums: number[]
) {
    const class_nums_str = '[' + class_nums.toString() + ']';
    return request({
        url: '/empty_room',
        headers: {
            traefik: 'jwzx'
        },
        params: new URLSearchParams({
            week_num,
            week_day,
            building_num,
            class_nums: class_nums_str
        })
    });
}
