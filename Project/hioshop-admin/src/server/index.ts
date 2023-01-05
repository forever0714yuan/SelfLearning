import axios from './axios';

export function get(url: string, params?: object) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            params: params,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function post(url: string, params?: object) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            data: params,
            method: "post"
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}