import { get } from '@/server';

export function getWelCome(data?: object) {
    get('index', data).then(res => {
        console.log(res);
    })
}