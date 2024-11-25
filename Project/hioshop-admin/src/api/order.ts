import axios from '@/server/index copy';

export function getOrder(data: object) {
    return axios({
        url: "order",
        params: data
    })
}
// 获取地图信息
export function getAllRegion(data: object) {
    return axios({
        url: "order/getAllRegion",
        params: data
    })
}

// 获取订单信息
export function detail(data: object) {
    return axios({
        url: "order/detail",
        params: data
    })
}
// 变更状态
export function changeStatusApi(data?: object) {
    return axios({
        url: "order/changeStatus",
        method: "post",
        data: data
    })
}
export function saveAddress(data?: object) {
    return axios({
        url: "order/saveAddress",
        method: "post",
        data: data
    })
}
export function send(data?: object) {
    return axios({
        url: "order/saveAdminMemo",
        method: "post",
        data: data
    })
}
export function checkExpressInfoApi(data?: object) {
    return axios({
        url: "order/checkExpress",
        params: data
    })
}