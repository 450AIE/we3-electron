import request from '@renderer/utils/http';

export async function getBannerAPI() {
    const res = await request({
        url: '/banner',
        headers: {
            traefik: 'user'
        }
    });
    const imgArr = res.data.list.map(
        (item) => `https://minio.cqupt.edu.cn/wecqupt/banner/${item.id}`
    );
    return imgArr;
}

export function getTodayLessonDataAPI(types? = '[1, 2, 3]') {
    const params = new URLSearchParams({ types });
    return request({
        url: '/timetable/today',
        params: params
    });
}

// 获取教务在线的咨询列表
export function getJWZXMessageListAPI(pageNo? = '1', pageSize? = '100') {
    const params = new URLSearchParams({ pageNo, pageSize });
    return request({
        url: 'http://jwzx.cqupt.edu.cn/data/json_files.php',
        params: params
    });
}
