import axios from '@/server/axios copy';


export function getUser(data?: object) {
    return axios({
        url: "user",
        params: data
    })
}