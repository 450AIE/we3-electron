import request from '@renderer/utils/http';

export function getApolloConfigAPI(env = 'dev', name_space = 'test') {
    return request({
        url: `/apollo/config?env=${env}&name_space=${name_space}`
    });
}
