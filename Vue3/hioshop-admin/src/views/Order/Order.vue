<template>
  <div class="order">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="待付款" name="first">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="second">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="third">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
        <el-tab-pane label="已收货" name="fourth">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
        <el-tab-pane label="已关闭" name="fourth1">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
        <el-tab-pane label="全部订单" name="fourth2">
          <OrderComponent @form="formData" :listData="listData">
          </OrderComponent>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import OrderComponent from '@/views/Order/OrderComponent.vue';
import { getOrder } from '@/api/order';

const activeName = ref('second');
const order_status: Ref<string | number> = ref(300);
const page = ref(1);

interface From {
  order: number | null;
  username: string;
  express: number | null;
}

const form: From = reactive({
  order: null,
  username: '',
  express: null,
});
let formList = reactive({
  order: null,
  username: '',
  express: null,
});
const formData = (v: object) => {
  console.log(v);
  formList = Object.assign(formList, v);
  getOrderData({
    page: page.value,
    orderSn: formList.order,
    consignee: formList.username,
    logistic_code: formList.express,
    status: order_status.value,
  });
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
  let index = tab.index;
  console.log(index);

  if (index == '0') {
    order_status.value = '101,801';
  } else if (index == '1') {
    order_status.value = 300;
  } else if (index == '2') {
    order_status.value = 301;
  } else if (index == '3') {
    order_status.value = 401;
  } else if (index == '4') {
    order_status.value = '102,103';
  } else if (index == '5') {
    order_status.value = '101,102,103,202,203,300,301,302,303,401,801,802';
  }

  getOrderData({
    page: page.value,
    orderSn: formList.order,
    consignee: formList.username,
    logistic_code: formList.express,
    status: order_status.value,
  });
};
// 获取数据
interface OrderDataFace {
  count?: number | null;
  currentPage?: number | null;
  data?: Array<[]>;
  pageSize?: number | null;
  totalPages?: number | null;
}

interface OrderParamsFace {
  page: number;
  status: string | number;
  orderSn: string | null;
  consignee: string | null;
  logistic_code: string | null;
}
let allData: OrderDataFace = reactive({
  count: null,
  currentPage: null,
  data: [],
  pageSize: null,
  totalPages: null,
});
const listData: Ref<any> = ref([]);

const getOrderData = async (data: OrderParamsFace) => {
  const res = await getOrder(data);

  if (res.errno === 0) {
    allData = res.data;
    listData.value = allData.data;
  }
};

onMounted(() => {
  getOrderData({
    page: page.value,
    orderSn: formList.order,
    consignee: formList.username,
    logistic_code: formList.express,
    status: order_status.value,
  });
});
</script>
<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
