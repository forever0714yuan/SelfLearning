import { post } from '@/server';

export function loginFrom(data?: object) {
    return post('auth/login', data)
}