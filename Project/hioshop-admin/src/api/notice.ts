import axios from '@/server/index copy';


export function getNotice(data?: object) {
    return axios({
        url: "notice",
        params: data
    })
}
export function saveNotice(data?: object) {
    return axios({
        url: "notice/update",
        data: data,
        method: "post"
    })
}
export function deleteNotice(data?: object) {
    return axios({
        url: "notice/destory",
        data: data,
        method: "post"
    })
}

export function addNoticeApi(data?: object) {
    return axios({
        url: "notice/add",
        data: data,
        method: "post"
    })
}