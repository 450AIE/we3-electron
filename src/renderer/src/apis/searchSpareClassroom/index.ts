import request from '@renderer/utils/http';

// class_nums类型暂时不知道，先尝试
export function getSparceClassroomAPI(
    week_num: string,
    week_day: string,
    building_num: string,
    class_nums
) {
    return request({
        url: '/empty_room',
        headers: {
            traefik: 'jwzx'
        },
        data: {
            week_num,
            week_day,
            building_num,
            class_nums
        }
    });
}
