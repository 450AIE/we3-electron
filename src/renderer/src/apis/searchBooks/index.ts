import request from '@renderer/utils/http';

export function getBorrowBooksRankListAPI() {
    return request({
        url: '/book/rank',
        headers: {
            traefik: 'jwzx'
        }
    });
}

export function getBookDetailAPI(id) {
    return request({
        url: '/book',
        headers: {
            traefik: 'jwzx'
        },
        data: {
            id
        }
    });
}

export function getSearchBookHotListAPI(limit?: number = 15) {
    return request({
        url: `/book/search/list?limit=${limit}`,
        headers: {
            traefik: 'jwzx'
        }
    });
}

export function getSearchBookListAPI(name, pages, limit? = 20) {
    return request({
        url: `/book/search?limit=${limit}`,
        headers: {
            traefik: 'jwzx'
        },
        data: {
            name,
            page: pages
        }
    });
}
