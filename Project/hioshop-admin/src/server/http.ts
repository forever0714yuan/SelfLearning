/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
const apiList = {
    'index': '/index',
    'othersData': '/othersData',
    'index/main': "/index/main",
    'order': "/order",
    "goods/onsale": "/goods/onsale",
    "goods/sort": "/goods/sort",
    'goods': '/goods',
    "goods/updateSort": "/goods/updateSort",
    "goods/indexShowStatus": "/goods/indexShowStatus",
    "goods/saleStatus": "/goods/saleStatus",
    "goods/info": "/goods/info",
    "goods/getAllCategory": "/goods/getAllCategory",
    "goods/getExpressData": "/goods/getExpressData",
    "specification/getGoodsSpec": "/specification/getGoodsSpec",
    "goods/getAllSpecification": "/goods/getAllSpecification",
    "goods/getGalleryList": "/goods/getGalleryList",
    "goods/store": "/goods/store",
    "goods/copygoods": "/goods/copygoods",
    "category": "/category",
    "category/channelStatus": "/category/channelStatus",
    "category/showStatus": "/category/showStatus",
    "category/categoryStatus": "/category/categoryStatus",
    "index/getQiniuToken": "/index/getQiniuToken",
    "category/store": "/category/store",
    "category/updateSort": "/category/updateSort",
    "category/info": "/category/info",
    "category/destory": "/category/destory",
    "specification": "/specification",
    "specification/detail": "/specification/detail",
    "specification/update": "/specification/update",
    "specification/delete": "/specification/delete",
    "shopcart": "/shopcart",
    'user': "/user",
    "admin/showset": "admin/showset",
    "admin/showsetStore": "/admin/showsetStore",
    "notice": "/notice",
    "notice/update": "/notice/update",
    "notice/destory": "/notice/destory",
    "notice/add": "/notice/add",
    "order/getAllRegion": "/order/getAllRegion",
    "order/detail": "/order/detail",
    "order/changeStatus": "/order/changeStatus",
    "order/saveAddress": "/order/saveAddress",
    "order/saveAdminMemo": "/order/saveAdminMemo",
    "order/checkExpress": "/order/checkExpress"
}

/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type apiKeyType = keyof typeof apiList;

/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface apiKeyDataType {
    'index': {
        errno: number;
        errmsg: string;
        data: {
            orderToDelivery: number;
            goodsOnsale: number;
            timestamp: number;
            user: number;
        }
    },
    'index/main': {
        data: {
            addCart: number
            addOrderNum: number
            addOrderSum: number
            newData: Array<[]>
            newUser: number
            oldData: Array<[]>
            oldUser: number
            payOrderNum: number
            payOrderSum: number
        }
        errmsg: string
        errno: number
    }
    'order': {
        data: object
        errmsg: string
        errno: number
    },
    "goods/onsale": {
        data: object
        errmsg: string
        errno: number
    }
    "goods/sort": {
        data: object
        errmsg: string
        errno: number
    }
    "goods": {
        data: object
        errmsg: string
        errno: number
    },
    "goods/updateSort": {
        data: string
        errmsg: string
        errno: number
    },
    "goods/indexShowStatus": {
        data: string
        errmsg: string
        errno: number
    },
    "goods/saleStatus": {
        data: string
        errmsg: string
        errno: number
    },
    "goods/info": {
        data: {
            info: object,
            category_id: string
        }
        errmsg: string
        errno: number
    },
    "goods/getAllCategory": {
        data: object
        errmsg: string
        errno: number
    },
    "goods/getExpressData": {
        data: {
            kd: object
        }
        errmsg: string
        errno: number
    },
    "specification/getGoodsSpec": {
        data: object
        errmsg: string
        errno: number
    },
    "goods/getAllSpecification": {
        data: object
        errmsg: string
        errno: number
    },
    "goods/getGalleryList": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "goods/store": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "goods/copygoods": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "category": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "category/channelStatus": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "category/showStatus": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "category/categoryStatus": {
        data: {
            galleryData: Array<[]>
        }
        errmsg: string
        errno: number
    },
    "index/getQiniuToken": {
        data: {
            token: string,
            url: string
        }
        errmsg: string
        errno: number
    },
    "category/store": {
        data: object,
        errmsg: string
        errno: number
    },
    "category/updateSort": {
        data: number,
        errmsg: string
        errno: number
    },
    "category/info": {
        data: object,
        errmsg: string
        errno: number
    },
    "category/destory": {
        data: object,
        errmsg: string
        errno: number
    },
    "specification": {
        data: object,
        errmsg: string
        errno: number
    },
    "specification/detail": {
        data: object,
        errmsg: string
        errno: number
    },
    "specification/update": {
        data: object,
        errmsg: string
        errno: number
    },
    "specification/delete": {
        data: object,
        errmsg: string
        errno: number
    },
    "shopcart": {
        data: object,
        errmsg: string
        errno: number
    },
    "user": {
        data: object,
        errmsg: string
        errno: number
    },
    "admin/showset": {
        data: object,
        errmsg: string
        errno: number
    },
    "admin/showsetStore": {
        data: object,
        errmsg: string
        errno: number
    },
    "notice": {
        data: object,
        errmsg: string
        errno: number
    },
    "notice/update": {
        data: object,
        errmsg: string
        errno: number
    },
    "notice/destory": {
        data: object,
        errmsg: string
        errno: number
    },
    "notice/add": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/getAllRegion": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/detail": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/changeStatus": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/saveAddress": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/saveAdminMemo": {
        data: object,
        errmsg: string
        errno: number
    },
    "order/checkExpress": {
        data: object,
        errmsg: string
        errno: number
    },
}

export default apiList;
