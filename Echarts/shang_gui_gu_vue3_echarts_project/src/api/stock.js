import { get } from '../request';

// 获取饼图数据
export function stockPage(data) {
    return get('stock', data)
}