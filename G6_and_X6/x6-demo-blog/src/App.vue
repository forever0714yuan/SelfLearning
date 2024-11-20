<template>
  <div class="graph">
    <div id="container" class="container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Angle, Graph } from "@antv/x6";
import bgcImage from "@/assets/bg2.b4f49dec.png";
import bgcImage1 from "@/assets/4.jpg";

const graph = ref();

// const data = {
//   nodes: [
//     {
//       id: "node1",
//       shape: "rect",
//       x: 40,
//       y: 40,
//       width: 100,
//       height: 40,
//       label: "hello",
//       attrs: {
//         // body 是选择器名称，选中的是 rect 元素
//         body: {
//           stroke: "#8f8f8f",
//           strokeWidth: 1,
//           fill: "#fff",
//           rx: 6,
//           ry: 6,
//         },
//       },
//     },
//     {
//       id: "node2",
//       shape: "rect",
//       x: 160,
//       y: 180,
//       width: 100,
//       height: 40,
//       label: "world",
//       attrs: {
//         body: {
//           stroke: "#8f8f8f",
//           strokeWidth: 1,
//           fill: "#fff",
//           rx: 6,
//           ry: 6,
//         },
//       },
//     },
//   ],
//   edges: [
//     {
//       shape: "edge",
//       source: "node1",
//       target: "node2",
//       label: "x6",
//       attrs: {
//         // line 是选择器名称，选中的边的 path 元素
//         line: {
//           stroke: "#8f8f8f",
//           strokeWidth: 1,
//         },
//       },
//     },
//   ],
// };

onMounted(() => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 800,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
    autoResize: true,
  });
  graph.value.addNode({
    id: "rect1",
    shape: "rect",
    label: "矩形",
    points: "100,10 40,198 190,78 10,78 160,198",
    x: 100,
    y: 40,
    width: 100,
    height: 40,
  });
  graph.value.addNode({
    id: "rect2",
    shape: "rect",
    label: "矩形",
    points: "100,10 40,198 190,78 10,78 160,198",
    x: 400,
    y: 80,
    width: 100,
    height: 40,
  });

  graph.value.addEdge({
    shape: "edge",
    source: "rect1",
    target: "rect2",
  });

  graph.value.addEdge({
    shape: "edge",
    source: [100, 100],
    target: [400, 100],
  });
});
</script>

<style scoped lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.graph {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
