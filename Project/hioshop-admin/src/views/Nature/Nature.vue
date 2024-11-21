<template>
  <div class="nature">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="商品分类" name="first">
          <NatureCategy></NatureCategy>
        </el-tab-pane>
        <el-tab-pane label="商品型号" name="second">
          <NatureProductType></NatureProductType>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import NatureCategy from './NatureCategy.vue';
import NatureProductType from './NatureProductType.vue';
import type { TabsPaneContext } from 'element-plus';
const activeName = ref('first');
const handleClick = (tab: TabsPaneContext, event: Event) => {};
</script>
<style lang="scss" scoped></style>
