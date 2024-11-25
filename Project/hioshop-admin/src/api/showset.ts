import axios from '@/server/axios copy';
export function getShowset(data?: object) {
    return axios({
        url: "admin/showset",
        params: data
    })
}
// 确定保存
export function showsetStore(data?: object) {
    return axios({
        url: "admin/showsetStore",
        method: "post",
        data: data
    })
}