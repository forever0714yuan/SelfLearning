<template>
  <div class="canvas-node">
    <div class="header">画布节点</div>
    <div class="node-content-top-icon" @click="ahndle">icon</div>
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
const node: any = inject("getNode");

node().on("change:data", ({ current }: { current: any }) => {
  const { name } = current;

  console.log(name, "name");
});

const ahndle = () => {
  console.log("画布节点");
};
</script>

<style lang="less" scoped>
.canvas-node {
  width: 320px;
  height: 200px;
  box-sizing: border-box;
  background: #3f4041;
  overflow: hidden;
  border-left: 4px solid #04b39c;
  display: flex;
  flex-direction: column;

  .node-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
    width: 100%;
    height: 60px;
    color: #d8d8d8;
    font-size: 14px;
    font-weight: 700;
    background: #3f4041;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .node-content {
    display: flex;
    flex-direction: column;
  }

  .node-content-top,
  .node-content-center,
  .node-content-bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #3f4041;
    .content-keyvalue {
      flex: 1 0;
      display: flex;
      align-items: center;
      width: 0;
      margin-left: 10px;
      color: #d8d8d8;
      font-size: 14px;
      .node-content-center-key {
        display: flex;
        align-items: center;
      }
      .node-content-center-value {
        width: 0;
        flex: 1 0;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .node-content-top-icon,
    .node-content-center-icon,
    .node-content-bottom-icon {
      margin: 0 10px;
      color: #d8d8d8;
      cursor: pointer;
    }
  }
}
</style>
