import axios from '@/server/index copy';

export function getNatureCategory(data?: object) {
    return axios({
        url: "category",
        params: data
    })
}
export function channelStatus(data?: object) {
    return axios({
        url: "category/channelStatus",
        params: data
    })
}
export function showStatus(data?: object) {
    return axios({
        url: "category/showStatus",
        params: data
    })
}
export function categoryStatus(data?: object) {
    return axios({
        url: "category/categoryStatus",
        params: data
    })
}

// 上传图片之前获取
export function getQiniuToken(data?: object) {
    return axios({
        url: "index/getQiniuToken",
        method: 'post',
        data: data
    })
}
// 点击确定
export function natureStore(data?: object) {
    return axios({
        url: "category/store",
        method: 'post',
        data: data
    })
}
// 失去焦点
export function natureUpdateSort(data?: object) {
    return axios({
        url: "category/updateSort",
        method: 'post',
        data: data
    })
}
// 编辑分类
export function natureEditCategory(data?: object) {
    return axios({
        url: "category/info",
        params: data
    })
}
// 删除
export function natureDeletCategory(data?: object) {
    return axios({
        url: "category/destory",
        method: "post",
        data: data
    })
}

export function specificationCategory(data?: object) {
    return axios({
        url: "specification",
        method: "post",
        data: data
    })
}
export function detailCategory(data?: object) {
    return axios({
        url: "specification/detail",
        method: "post",
        data: data
    })
}

export function updateCategory(data?: object) {
    return axios({
        url: "specification/update",
        method: "post",
        data: data
    })
}
// 删除商品类型
export function deleteCategory(data?: object) {
    return axios({
        url: "specification/delete",
        method: "post",
        data: data
    })
}


