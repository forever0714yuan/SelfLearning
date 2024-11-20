<template>
  <div>
    <div id="mountNode"></div>
  </div>
</template>

<script setup lang="ts">
import G6 from "@antv/g6";
import { onMounted, ref } from "vue";

let data = ref({
  nodes: [
    { id: "0", label: "n0", class: "c0", x: 1000, y: -100 },
    { id: "1", label: "n1", class: "c0", x: 300, y: -10 },
    { id: "2", label: "n2", class: "c0", x: 10, y: 10 },
    { id: "3", label: "n3", class: "c0", x: 320, y: -100 },
    { id: "4", label: "n4", class: "c0", x: 100, y: 900 },
    { id: "5", label: "n5", class: "c0", x: 120, y: 213 },
    { id: "6", label: "n6", class: "c1", x: 543, y: 12 },
    { id: "7", label: "n7", class: "c1", x: 543, y: -100 },
    { id: "8", label: "n8", class: "c1", x: 1, y: 0 },
    { id: "9", label: "n9", class: "c1", x: 0, y: -222 },
    { id: "10", label: "n10", class: "c1", x: 435, y: 69 },
    { id: "11", label: "n11", class: "c1", x: 23, y: 10 },
    { id: "12", label: "n12", class: "c1", x: -129, y: 39 },
    { id: "13", label: "n13", class: "c2", x: 234, y: 843 },
    { id: "14", label: "n14", class: "c2", x: -301, y: 129 },
    { id: "15", label: "n15", class: "c2", x: -20, y: -76 },
    { id: "16", label: "n16", class: "c2", x: 1220, y: -34 },
    { id: "17", label: "n17", class: "c2", x: -10, y: 954 },
    { id: "18", label: "n18", class: "c2", x: 492, y: 123 },
    { id: "19", label: "n19", class: "c2", x: 123, y: -241 },
  ],
  edges: [
    { source: "0", target: "1", label: "e0-1", weight: 1 },
    { source: "0", target: "2", label: "e0-2", weight: 2 },
    { source: "0", target: "3", label: "e0-3", weight: 3 },
    { source: "0", target: "4", label: "e0-4", weight: 1.4 },
    { source: "0", target: "5", label: "e0-5", weight: 2 },
    { source: "0", target: "7", label: "e0-7", weight: 2 },
    { source: "0", target: "8", label: "e0-8", weight: 2 },
    { source: "0", target: "9", label: "e0-9", weight: 1.3 },
    { source: "0", target: "10", label: "e0-10", weight: 1.5 },
    { source: "0", target: "11", label: "e0-11", weight: 1 },
    { source: "0", target: "13", label: "e0-13", weight: 10 },
    { source: "0", target: "14", label: "e0-14", weight: 2 },
    { source: "0", target: "15", label: "e0-15", weight: 0.5 },
    { source: "0", target: "16", label: "e0-16", weight: 0.8 },
    { source: "2", target: "3", label: "e2-3", weight: 1 },
    { source: "4", target: "5", label: "e4-5", weight: 1.4 },
    { source: "4", target: "6", label: "e4-6", weight: 2.1 },
    { source: "5", target: "6", label: "e5-6", weight: 1.9 },
    { source: "7", target: "13", label: "e7-13", weight: 0.5 },
    { source: "8", target: "14", label: "e8-14", weight: 0.8 },
    { source: "9", target: "10", label: "e9-10", weight: 0.2 },
    { source: "10", target: "14", label: "e10-14", weight: 1 },
    { source: "10", target: "12", label: "e10-12", weight: 1.2 },
    { source: "11", target: "14", label: "e11-14", weight: 1.2 },
    { source: "12", target: "13", label: "e12-13", weight: 2.1 },
    { source: "16", target: "17", label: "e16-17", weight: 2.5 },
    { source: "16", target: "18", label: "e16-18", weight: 3 },
    { source: "17", target: "18", label: "e17-18", weight: 2.6 },
    { source: "18", target: "19", label: "e18-19", weight: 1.6 },
  ],
});
// 初始化
const graph = ref()
const initGrapg = () => {

  if (data.value) {
    // 缩略图 
    const minimap = new G6.Minimap({
      size: [100, 100],
      className: 'minimap',
      type: 'delegate',
    })

    // 实例化 Image Minimap 插件
    const imageMinimap = new G6.ImageMinimap({
      width: 100,
      height: 100,
      graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
    });

    // 实例化图
    const grid = new G6.Grid();

    graph.value = new G6.Graph({
      container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      // fitView: true, // 自动缩放，将所有点都放在画布中
      modes: {
        default: [
          "drag-node", // 节点拖动
          "drag-canvas", // 画布拖动
          "zoom-canvas", //画布缩放
          {
            type: "tooltip", //移入节点产生提示框
            // (data: { [key: string]: unknown; }) => string
            formatText(model: any): string {
              // 提示框文本内容
              const text = 'label: ' + model.label + '<br/> class: ' + model.class;
              return text;
            }
          },
          {
            type: 'edge-tooltip', // 边提示框
            formatText(model) {
              // 边提示框文本内容
              const text =
                'source: ' +
                model.source +
                '<br/> target: ' +
                model.target +
                '<br/> weight: ' +
                model.weight;
              return text;
            },
          }
        ], // 设置交互模式
      },
      defaultNode: {
        size: 30, // 节点大小
        // 节点样式设置
        style: {
          fill: "#82adcb", // 节点填充色
          stroke: "#666", // 节点描边色
          lineWidth: 1, // 节点描边粗细
        },
        // 节点上的标签文本设置
        labelCfg: {
          // 节点上的标签文本样式配置
          style: {
            fill: '#fff', // 节点标签文字颜色
          },
        },
      },
      defaultEdge: {
        // 边的样式设置
        style: {
          opacity: 0.6, // 边的透明度
          stroke: "grey", // 边的颜色
        },
        labelCfg: {
          autoRotate: true, // 边上的标签文本根据边的方向旋转
        }
      },
      layout: {
        type: "force",// 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        linkDistance: 200, // 指定边距离为100
      },
      animate: true,
      // 节点不同状态下的样式集合,比如点击,hover等
      nodeStateStyles: {
        hover: {
          fill: "lightsteelblue"
        },
        click: {
          stroke: "#000",
          lineWidth: 3
        }
      },
      // 边不同状态下的样式集合,比如点击,hover等
      edgeStateStyles: {
        click: {
          stroke: "steelblue"
        }
      },
      plugins: [imageMinimap, grid]
    });

    const nodes = data.value.nodes;
    nodes.forEach((node) => {
      if (!node.style) {
        node.style = {};
      }
      switch (node.class) {
        case 'c0':
          node.type = 'circle';// class = 'c0' 时节点图形为 circle
          break;
        case 'c1': {
          node.type = 'rect'; // class = 'c1' 时节点图形为 rect
          node.size = [35, 20]; // class = 'c1' 时节点大小
          break;
        }
        case 'c2': {
          node.type = 'ellipse'; // class = 'c2' 时节点图形为 ellipse
          node.size = [35, 20]; // class = 'c2' 时节点大小
          break;
        }
      }

    })

    const edges = data.value.edges;
    edges.forEach((edge) => {
      if (!edge.style) {
        edge.style = {};
      }

      edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值

      // 移到此处
      // edge.style.opacity = 0.6;
      // edge.style.stroke = 'grey';
    })


    graph.value.data(data.value); // 读取 Step 2 中的数据源到图上
    graph.value.render();

  }
};




// 交互
const mutual = () => {
  // 鼠标进入节点
  graph.value.on("node:mouseenter", (e: any) => {
    // console.log(e);
    const nodeItem = e.item;
    graph.value.setItemState(nodeItem, 'hover', true)
  })

  // 鼠标离开节点
  graph.value.on("node:mouseleave", (e: any) => {
    const nodeItem = e.item;
    graph.value.setItemState(nodeItem, 'hover', false)
  })


  // 点击节点
  graph.value.on('node:click', (e: any) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.value.findAllByState('node', 'click');
    clickNodes.forEach((cn: any) => {
      graph.value.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    graph.value.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
  });
  // 点击边
  graph.value.on('edge:click', (e: any) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.value.findAllByState('edge', 'click');
    clickEdges.forEach((ce: any) => {
      graph.value.setItemState(ce, 'click', false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
    graph.value.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
  });
}

onMounted(() => {
  // 初始化
  initGrapg();
  // 交互 点击 移入移出
  mutual()

});


</script>

<style scoped>
:deep(.g6-tooltip) {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(254, 249, 249, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
</style>
