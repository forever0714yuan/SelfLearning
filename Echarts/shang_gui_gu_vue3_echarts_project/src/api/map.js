import { get } from '../request';

// 获取柱状图数据
export function mapPage(data) {
    return get('map', data)
}