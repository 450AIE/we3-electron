import request from '@renderer/utils/http';

export function submitRepaireAPI(formData) {
    return request({
        url: '/repaire',
        method: 'POST',
        headers: {
            traefik: 'dormitory'
            // we3中这里加了cookie的，我们应该会自动带上吧
        },
        data: formData
    });
}

export function getServiceTypeAPI() {
    return request({
        url: '/repair/type',
        headers: {
            traefik: 'dormitory'
        }
    });
}

export function getRepairAreaAPI() {
    return request({
        url: '/repair/area',
        headers: {
            traefik: 'dormitory'
        }
    });
}

export function getRepairHistoryAPI() {
    return request({
        url: '/repair/list',
        headers: {
            traefik: 'dormitory'
        }
    });
}
