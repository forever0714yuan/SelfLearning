import axios from './axios';

export async function post(url: string, data?: object) {
    const res = await axios({
        url: url,
        data: data,
        method: "post"
    }).catch(error => {
        console.log(error);
    })

    // console.log(res);
    return res;
}

export async function get(url: string, params?: object | string) {
    const res = await axios({
        url: url,
        params: params,
        method: 'get'
    }).catch(error => {
        console.log(error);
    })
    return res;
}



// //类型
// type ID = string;

// interface ResponseOriginal<T> {
//   statusCode?: number;
//   message?: string;
//   value: T;
// }
// type Response<T> = ResponseOriginal<T> | undefined;

// //value
// interface Value{
//   item1: {name:string | null,num:number};
//   item2: ArrayValueItem3 [];
//   item3: any[];  //或any一步到位....
//   }
// interface ArrayValueItem3 {
//   key:number | string,
//   id:string,
//   label:string
// }

// //接口
// export const GetData = (
//   id: ID
// ): Promise<Response<Value>> =>   //或Promise<Response<any>>不过这样未知value里面的数据
//   get({
//     url: `${https://10.0.1.1}/GetData`,
//     config: { params: { id } },
//   });
