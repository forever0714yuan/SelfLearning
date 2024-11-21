import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
export function useIndexSideBar(path: string) {

    let pathName = ref('');
    if (path) {
        switch (path) {
            case '/main/welcome':
                pathName.value = '后台首页'
                break;
            case '/main/order':
                pathName.value = '订单列表'
                break;
            case '/main/goods':
                pathName.value = '商品列表'
                break;
            case '/main/nature':
                pathName.value = '商品设置'
                break;
            case '/main/shopcart':
                pathName.value = '购物车'
                break;
            case '/main/user':
                pathName.value = '用户列表'
                break;
            case '/main/settings/showset':
                pathName.value = '显示设置'
                break;
            case '/main/ad':
                pathName.value = '广告列表'
                break;
            case '/main/notice':
                pathName.value = '公告管理'
                break;
            case '/main/freight':
                pathName.value = '运费模板'
                break;
            case '/main/shipper':
                pathName.value = '快递设置'
                break;
            case '/main/admin':
                pathName.value = '管理员'
                break;
        }
    }
    return {
        pathName
    }
}