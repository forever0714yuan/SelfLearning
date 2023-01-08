import axios from 'axios';
import { getStorage } from '@/utils/storage'
const TIMEOUT: number = 18000

// axios.defaults.retryDelay = 1000;
// axios.defaults.retry = 4; 
axios.defaults.baseURL = "http://127.0.0.1:8360/admin";
axios.defaults.timeout = TIMEOUT;
// 请求拦截器
axios.interceptors.request.use((config) => {
    // console.log(config.headers);
    const token = getStorage('token');
    // console.log(token);
    if (token) {
        config.headers['X-Hioshop-Token'] = token;
    }

    // config.headers.common['X-Hioshop-Token'] = token;
    return config
}, (error) => {
    return Promise.reject(error)
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    // console.log(response);

    if (response.data?.errno === 0) {
        return response.data.data;
    } else if (response.data.errno === 400) {

    }
    else {
        return response
    }

}, (error) => {
    console.log(error);

    return Promise.reject(error)
});



export default axios;
