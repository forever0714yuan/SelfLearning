<template>
  <div class="rankpage fullscreen">
    <Rank></Rank>
    <div class="resize">
      <!-- icon-compress-alt -->
      <span class="iconfont icon-compress-alt"></span>
    </div>
  </div>
</template>
<script setup>
import Rank from './Rank.vue';
</script>
<style lang="less">
.rankpage {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  color: aliceblue;
}
</style>
