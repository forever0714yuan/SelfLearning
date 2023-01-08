import axios from '@/server/index copy';

export function getOrder(data: object) {
    return axios({
        url: "order",
        params: data
    })
}