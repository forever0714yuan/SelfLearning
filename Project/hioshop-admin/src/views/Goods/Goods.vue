<template>
  <div class="goods">
    <el-card>
      <div>
        <el-button>按销量排序</el-button>
        <el-button>按售价排序</el-button>
        <el-button>按库存排序</el-button>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部商品" name="first"> </el-tab-pane>
        <el-tab-pane label="出售中" name="second">
          <GoodsComponent></GoodsComponent>
        </el-tab-pane>
        <el-tab-pane label="已售完" name="third"> </el-tab-pane>
        <el-tab-pane label="已下架" name="fourth"> </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import GoodsComponent from '@/components/GoodsComponent/GoodsComponent.vue';
const activeName = ref('second');

const handleClick = (tab: TabsPaneContext, event: Event) => {};
</script>
<style scoped lang="scss"></style>
