// import { get } from '@/server';
import axios from '@/server/index copy';

export function getWelCome(data?: object) {
    return axios({
        url: "index",
    })
}

export function getMain(data?: object) {
    // console.log(data);
    return axios({
        url: "index/main",
        params: data
    })
}

