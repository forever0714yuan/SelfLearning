<template>
  <div class="goods">
    <el-card>
      <div>
        <el-button @click="salesSort(1)">按销量排序</el-button>
        <el-button @click="salesSort(2)">按售价排序</el-button>
        <el-button @click="salesSort(3)">按库存排序</el-button>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部商品" name="first"> </el-tab-pane>
        <el-tab-pane label="出售中" name="second">
          <GoodsComponent
            :allData="allData"
            v-if="isLoading"
            @query="query"
            @sort="sort"
            @mainStatusChange="mainStatusChange"
            @putAway="putAway"
          ></GoodsComponent>
        </el-tab-pane>
        <el-tab-pane label="已售完" name="third"> </el-tab-pane>
        <el-tab-pane label="已下架" name="fourth"> </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import GoodsComponent from '@/components/GoodsComponent/GoodsComponent.vue';
import { onBeforeMount, onMounted } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import type { Ref } from 'vue';
import { ref } from 'vue';
import {
  getOnsale,
  getQuery,
  getSalesSort,
  updateSort,
  indexShowStatus,
  saleStatus,
} from '@/api/goods';
const activeName = ref('second');
const handleClick = (tab: TabsPaneContext, event: Event) => {};

// 查询
const query = async (v: any) => {
  console.log(v);
  // page=1&size=10&name=1
  const res = await getQuery({ page: 1, size: 10, name: v });

  if (res.errno === 0) {
    allData.value = res.data;
  }
};
// 排序
const sort = async (v: object) => {
  console.log(v);
  const res = await updateSort(v);

  if (res.errno === 0) {
    // getDefaultData();
  }
};

// 首页显示
const mainStatusChange = async (v: object) => {
  const res = await indexShowStatus(v);
};

// 上架

const putAway = async (v: object) => {
  const res = await saleStatus(v);
};

interface AllData {
  count?: null | number;
  currentPage?: null | number;
  data?: Array<[]>;
  pageSize?: null | number;
  totalPages?: null | number;
}

let allData: Ref<AllData> = ref({
  count: null,
  currentPage: null,
  data: [],
  pageSize: null,
  totalPages: null,
});

// 默认数据
// 获取数据值
// const listData: Ref<Array<[]> | undefined> = ref([]);
let isLoading = ref(false);
const getDefaultData = async () => {
  const res = await getOnsale();
  // console.log(res);
  if (res.errno === 0) {
    isLoading.value = true;
    allData.value = res.data;
  }
};

// 按销量排序
const salesSort = (index: number) => {
  getSortData({
    page: 1,
    size: 10,
    index: index,
  });
};

const getSortData = async (data?: object) => {
  const res = await getSalesSort(data);
  // console.log(res);

  if (res.errno === 0) {
    allData.value = res.data;
  }
};

onBeforeMount(() => {
  getDefaultData();
});

// watch(allData, (newQuestion, oldQuestion) => {
//   console.log(newQuestion);
//   allData.value = newQuestion;
// });
</script>
<style scoped lang="scss"></style>
