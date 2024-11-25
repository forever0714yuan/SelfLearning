<template>
  <div class="interlayer">
    <el-button @click="translate">平移</el-button>
    <el-button type="primary" @click="reduce">缩放0.5</el-button>
    <el-button @click="expand">放大0.5</el-button>
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Graph } from "@antv/x6";

export default defineComponent({
  setup() {
    // 1.准备数据
    const data = {
      // 节点
      nodes: [
        {
          id: "node1", //节点的唯一标识
          x: 0, // 节点位置的x值
          y: 0,
          width: 80,
          height: 40,
          label: "节点1",
        },
        {
          id: "node2",
          x: 160,
          y: 80,
          width: 80,
          height: 40,
          label: "节点2",
        },
      ],
      // 边
      edges: [
        {
          source: "node1", // 起始节点
          target: "node2", // 目标节点
        },
      ],
    };
    let graph: Graph;

    // 平移方法
    const translate = () => {
      graph.translate(40, 80);
    };

    // 缩小/放大是整个画布都变小
    // 缩小
    const reduce = () => {
      graph.zoom(-0.5);
    };
    // 放大
    const expand = () => {
      graph.zoom(0.5);
    };

    onMounted(() => {
      graph = new Graph({
        container: document.querySelector("#container") as HTMLElement,
        width: 1500,
        height: 800,
        background: {
          color: "#fffbe6",
        },
        grid: {
          size: 10,
          visible: true,
        },
      });

      graph.fromJSON(data);
    });
    return {
      translate,
      reduce,
      expand,
    };
  },
});
</script>
<style scoped>
.interlayer {
  width: 90%;
  height: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
}
</style>
