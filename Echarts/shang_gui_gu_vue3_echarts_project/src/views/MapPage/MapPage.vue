<template>
  <div class="mappage fullscreen">
    <Map></Map>
    <div class="resize">
      <!-- icon-compress-alt -->
      <span class="iconfont icon-compress-alt"></span>
    </div>
  </div>
</template>

<script setup>
import Map from './Map.vue';
</script>

<style lang="less" scoped>
.mappage {
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
