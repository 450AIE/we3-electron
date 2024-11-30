import request from '@renderer/utils/http';

export function inquiryElectricityFeeAPI() {
    return request({
        url: '/elec',
        headers: {
            traefik: 'dormitory'
        }
    });
}
