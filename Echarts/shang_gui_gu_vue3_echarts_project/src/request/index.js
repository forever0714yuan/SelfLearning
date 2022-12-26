import axios from './axios'


export async function get(url, params) {
    const res = await axios({
        url: url,
        params: params,
        method: 'GET'
    }).catch(err => {
        console.log('err', err);
    })

    return res.data ? res.data : res;
}