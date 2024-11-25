<template lang="">
  <div>
    <el-row class="mb-4">
      <el-button @click="$router.push({ path: '/index01' })"
        >快速开始01</el-button
      >
      <el-button type="primary" @click="$router.push({ path: '/index02' })"
        >快速开始02</el-button
      >

      <el-button type="success" @click="$router.push({ path: '/index03' })"
        >快速开始03</el-button
      >
      <el-button type="info">快速开始04</el-button>
      <el-button type="warning">快速开始05</el-button>
      <el-button type="danger">快速开始06</el-button>
    </el-row>
    <router-view></router-view>
  </div>
</template>
<script></script>
<style lang=""></style>
