import request from '@renderer/utils/http';

export function getTermTimeAPI(env? = 'dev', name_space? = 'cy_calendar') {
    return request({
        url: `/apollo/config?env=${env}&name_space=${name_space}`
    });
}
