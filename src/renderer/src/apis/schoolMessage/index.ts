import request from '@renderer/utils/http';

/**
 *
 * @param type 1 为教务公告 ， 2为综合新闻，4为学术讲座
 * @param page
 * @param limit
 * @returns
 */
export function getSchoolMessageAPI(type, page, limit? = 12) {
    return request({
        url: `/news/list?types=[${type}]&page=${page}&limit=${limit}`,
        headers: {
            traefik: 'jwzx'
        }
    });
}

export function getSchoolMessageDetailAPI(id: string) {
    return request({
        url: '/news/content',
        params: {
            id
        },
        headers: {
            traefik: 'jwzx'
        }
    });
}

export function searchSchoolMessageAPI(content, page, limit? = 12) {
    // 或者[1,2,3,4,5,6,7,8,9,10,11] 不知道是什么区别
    const types = [1, 2, 3, 4, 5];
    return request({
        url: `/news?types=[${types}]&year_duration=1&content=${content}&page=${page}&limit=${limit}`,
        headers: {
            traefik: 'jwzx'
        }
    });
}
