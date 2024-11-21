import { post } from '@/server';

// 为避免报错，返回值使用any避免数据检查（这里不应该这样使用）
export function loginFrom(data?: object): any {
    return post('auth/login', data)
}