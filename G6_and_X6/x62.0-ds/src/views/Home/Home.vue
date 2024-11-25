<template>
  <div class="home">
    <SFButton type="primary" @click="handleToGraph">前往画布</SFButton>

    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRouter } from "vue-router";
import SFButton from "@sefon/sefon-design/lib/button";
// import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";

const router = useRouter();
// 前往画布
const handleToGraph = () => {
  router.push({ path: "/graph" });
};
</script>
<style lang="less"></style>
