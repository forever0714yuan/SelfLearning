import axios from 'axios';


// 设置超时时间
const TIME_OUT = 18000;
axios.defaults.timeout = TIME_OUT;
// 设置基本地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/';

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 设置请求头
    return config;
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    //当响应发生错误
    const { status } = err.response;
    if (status === 401) {

    } else if (status === 403) {
        console.log('您没有访问该模块的权限');
    } else if (status === 500) {
        console.log('服务器错误');
    } else {
        console.log('未知错误');
    }

    return Promise.reject(error);
})

export default axios