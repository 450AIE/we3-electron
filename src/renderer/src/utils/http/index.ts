import axios from 'axios';

const BaseURL = 'https://we.cqupt.edu.cn/api';
const request = axios.create({
    baseURL: BaseURL,
    adapter: 'fetch',
    timeout: 20000
});

// 请求拦截器
request.interceptors.request.use((config) => {
    return config;
});
// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // console.log(response.headers['Set-Cookie']);
        localStorage.setItem('sessionid', response.headers['Set-Cookie']);
        if (response.data.code === 0) {
            localStorage.setItem('student_id', response.data.data?.user_info?.student_id);
            localStorage.setItem('teacher_id', response.data.data?.user_info?.teacher_id);
        }
        return response.data;
    },
    (err) => {
        console.warn(err);
    }
);

export default request;
