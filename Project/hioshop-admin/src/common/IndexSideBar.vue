<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <el-row style="height: 100%">
          <el-col style="display: flex; flex-direction: column">
            <h5 class="mb-2">
              <img
                class="logo"
                src="/src/assets/images/loading2.gif"
                alt="logo"
              />
            </h5>
            <el-menu
              style="flex-grow: 1"
              default-active="/main/welcome"
              router
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-menu-item index="/main/welcome">
                <el-icon>
                  <IEpHomeFilled />
                </el-icon>
                <span>后台主页</span>
              </el-menu-item>
              <el-menu-item index="/main/order">
                <el-icon>
                  <IEpList />
                </el-icon>
                <span>订单列表</span>
              </el-menu-item>

              <el-sub-menu index="goods">
                <template #title>
                  <el-icon>
                    <IEpShoppingBag />
                  </el-icon>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="/main/goods">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>商品列表</span>
                </el-menu-item>
                <el-menu-item index="/main/nature">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>商品设置</span>
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item index="/main/shopcart">
                <el-icon>
                  <IEpShoppingCart />
                </el-icon>
                <span>购物车</span>
              </el-menu-item>

              <el-menu-item index="/main/user">
                <el-icon>
                  <IEpUser />
                </el-icon>
                <span>用户列表</span>
              </el-menu-item>

              <el-sub-menu index="settings">
                <template #title>
                  <el-icon>
                    <IEpSetting />
                  </el-icon>
                  <span>店铺设置</span>
                </template>
                <el-menu-item index="/main/settings/showset">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>显示设置</span>
                </el-menu-item>
                <!-- <el-menu-item index="/main/ad">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>广告列表</span>
                </el-menu-item> -->
                <el-menu-item index="/main/notice">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>公告管理</span>
                </el-menu-item>
                <!-- <el-menu-item index="/main/freight">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>运费模板</span>
                </el-menu-item> -->
                <!-- <el-menu-item index="/main/shipper">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>快递设置</span>
                </el-menu-item>
                <el-menu-item index="/main/admin">
                  <el-icon>
                    <IEpPlus />
                  </el-icon>
                  <span>管理员</span>
                </el-menu-item> -->
              </el-sub-menu>
              <el-menu-item index="" @click="loginOut">
                <el-icon>
                  <IEpSwitchButton />
                </el-icon>
                <span>退出</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <Header class="header">
            <span>{{ Name }}</span>
            <el-button type="primary" v-if="route.fullPath === '/main/goods'"
              >添加商品</el-button
            >
          </Header>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useIndexSideBar } from './IndexSideBar';

// 路由
const route = useRoute();
const router = useRouter();

// 选择路径
const Name = ref('后台主页');

const handleSelect = (index: string) => {
  console.log(index);

  const { pathName } = useIndexSideBar(index);
  Name.value = pathName.value;
};
// 退出
const loginOut = () => {
  ElMessageBox.confirm('是否要退出?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    localStorage.removeItem('token');
    router.push({ path: '/login' });
  });
};
</script>

<style lang="scss" scoped>
.mb-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  box-sizing: border-box;

  width: 200px;
  height: 120px;

  .logo {
    width: 60px;
    height: 60px;
  }
}
:deep(.el-header) {
  height: 40px;
}
.header {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
// :deep(.el-main) {
//   background-color: #fff;
// }
</style>
