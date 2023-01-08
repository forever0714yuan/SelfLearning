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
    'order': "/order"
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
    }
}

export default apiList;
