import { get } from '../request';

// 获取柱状图数据
export function sellerPage(data) {
    return get('seller', data)
}