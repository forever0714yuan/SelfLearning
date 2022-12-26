import { get } from '../request';

// 获取柱状图数据
export function trendPageAPI(data) {
    return get('trend', data)
}