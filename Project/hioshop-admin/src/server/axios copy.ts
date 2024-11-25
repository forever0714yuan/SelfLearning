import axios, { type AxiosResponse } from 'axios';
import type { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosInterceptorManager } from 'axios'
import type { apiKeyDataType, apiKeyType } from '@/server/http'
import { getStorage } from '@/utils/storage'
const TIMEOUT: number = 18000

// axios.defaults.retryDelay = 1000;
// axios.defaults.retry = 4; 
// axios.defaults.baseURL = "http://127.0.0.1:8360/admin";
// axios.defaults.timeout = TIMEOUT;
// 接口

type ResultDataType = apiKeyDataType[apiKeyType];

interface MyAxiosInstance extends AxiosInstance {
    /* 
     设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
     */

    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>;
    }
}

const instance: MyAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8360/admin",
    timeout: TIMEOUT
})




// 请求拦截器
instance.interceptors.request.use((config) => {
    // console.log(config.headers);
    const token = getStorage('token');
    // console.log(token);
    if (token) {
        config.headers['X-Hioshop-Token'] = token;
    }

    // config.headers.common['X-Hioshop-Token'] = token;
    return config
}, (error) => {
    return error
});

// // 响应拦截器
// instance.interceptors.response.use((response) => {
//     // console.log(response);

//     if (response.data?.errno === 0) {
//         return response.data.data;
//     } else if (response.data.errno === 400) {

//     }
//     else {
//         return response
//     }

// }, (error) => {
//     console.log(error);

//     return Promise.reject(error)
// });



export default instance;
