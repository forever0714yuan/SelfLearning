import { get } from '../request';

// 获取饼图数据
export function hotPage(data) {
    return get('hotproduct', data)
}