<!--
针对于 /stockpage 这条路径而显示出来的
在这个组件中, 通过子组件注册的方式, 要显示出Stock.vue这个组件
-->
<template>
  <div class="stockpage fullscreen">
    <stock></stock>
    <div class="resize">
      <!-- icon-compress-alt -->
      <span class="iconfont icon-compress-alt"></span>
    </div>
  </div>
</template>

<script>
import Stock from './Stock.vue';
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    stock: Stock,
  },
};
</script>

<style lang="less" scoped>
.stockpage {
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
