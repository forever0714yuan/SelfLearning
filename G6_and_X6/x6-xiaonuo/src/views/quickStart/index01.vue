<template>
  <div class="interlayer">
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

    onMounted(() => {
      // 2.定义画布
      graph = new Graph({
        container: document.querySelector("#container") as HTMLElement,
        width: 1500,
        height: 800,
        grid: true,
      });
      // 3.加载数据
      graph.fromJSON(data);
    });
    return {};
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
