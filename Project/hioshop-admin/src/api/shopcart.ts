
import axios from '@/server/axios copy';

export function shopcart(data?: object) {
    return axios({
        url: "shopcart",
        params: data
    })
}