<template>
  首页
</template>
<script setup>
import { RouterView } from 'vue-router';
import SideBar from '@/common/SideBar.vue';
</script>
<style scoped>
body {
  background: #f5f7fa;
  display: block;
}

.container {
  width: 100%;
  height: 100%;
}

.content {
  box-sizing: border-box;
  padding: 20px;
  margin-left: 200px;
  /* background-color: red; */
  min-height: 700px;
  overflow: auto;
}
</style>
