import axios from '@/server/index copy';


export function getOnsale(data?: object) {
    return axios({
        url: "goods/onsale",
        params: data
    })
}

export function getSalesSort(data?: object) {
    return axios({
        url: "goods/sort",
        params: data
    })
}

export function getQuery(data?: object) {
    return axios({
        url: 'goods',
        params: data
    })
}

export function updateSort(data?: object) {
    return axios({
        url: 'goods/updateSort',
        data: data,
        method: 'post'
    })
}


export function indexShowStatus(data?: object) {
    return axios({
        url: 'goods/indexShowStatus',
        params: data,
    })
}

export function saleStatus(data?: object) {
    return axios({
        url: 'goods/saleStatus',
        params: data,
    })
}


// 商品列表编辑的数据
export function info(data?: object) {
    return axios({
        url: "goods/info",
        params: data
    })
}

// 商品分类
export function getAllCategory(data?: object) {
    return axios({
        url: "goods/getAllCategory",
        params: data
    })
}

// 快递模板
export function getExpressData(data?: object) {
    return axios({
        url: "goods/getExpressData",
        params: data
    })
}

// 型号价格表
export function getGoodsSpec(data?: object) {
    return axios({
        url: "specification/getGoodsSpec",
        data: data,
        method: "post"
    })
}

// 型号价格
export function getAllSpecification(data?: object) {
    return axios({
        url: "goods/getAllSpecification",
        params: data
    })
}


// 商品图片
export function getGalleryList(data?: object) {
    return axios({
        url: "goods/getGalleryList",
        method: "post",
        data: data
    })
}

// 编辑确认保存
export function saveEdite(data?: object) {
    return axios({
        url: "goods/store",
        method: "post",
        data: data
    })
}

// 复制商品
export function copyGoods(data?: object) {
    return axios({
        url: "goods/copygoods",
        method: "post",
        data: data
    })
}

