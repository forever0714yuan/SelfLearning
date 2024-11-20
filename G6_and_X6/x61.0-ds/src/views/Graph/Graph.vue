<template>
  <div class="graph">
    <!-- 左侧 -->
    <div class="stencil" id="stencil" ref="stencil">
      <div class="stencil-title">执行条件</div>
      <div data-type="rect" class="left-stencil" @mousedown="startDrag">
        <div class="canvas-node-list">CS</div>
      </div>
    </div>
    <!-- 右侧 -->
    <div id="container" class="container"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { Graph, Addon } from "@antv/x6";
import "@antv/x6-vue-shape";

import CanvasNode from "./component/CanvasNode.vue";
import bgcImage from "@/assets/bg2.b4f49dec.png";

const graph = ref();
const dnd = ref();

// 注册vue组件节点
Graph.registerNode("canvas-node", {
  inherit: "vue-shape",
  x: 200,
  y: 150,
  width: 150,
  height: 100,
  component: CanvasNode,
});

// 注册连线的样式
Graph.registerConnector(
  "algo-edge",
  (source, target) => {
    const offset = 4;
    const control = 80;
    const v1 = { x: source.x + offset + control, y: source.y };
    const v2 = { x: target.x - offset - control, y: target.y };

    return `M ${source.x + 1} ${source.y}
       L ${source.x + offset} ${source.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x - offset} ${target.y}
       L ${target.x} ${target.y}`;
  },
  true
);

// 移动节点
const startDrag = (e: any) => {
  const node = graph.value.createNode({
    shape: "canvas-node",
    width: 320,
    height: 200,
    ports: {
      groups: {
        // 输入链接桩群组定义
        in: {
          position: {
            name: "absolute",
            args: {
              x: "-2%",
              y: 20,
            },
          },
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              fill: "#8F9498",
              stroke: "#8F9498",
            },
          },
        },
        // 输出链接桩群组定义
        out: {
          position: {
            name: "absolute",
            args: {
              x: "102%",
              y: 20,
            },
          },
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              fill: "#8F9498",
              stroke: "#8F9498",
            },
          },
        },
      },
      items: [
        {
          id: "port1",
          group: "in",
        },
        {
          id: "port2",
          group: "out",
        },
      ],
    },
  });
  dnd.value.start(node, e as any);
};

onMounted(() => {
  //渲染画布
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 800,
    height: 600,
    background: {
      color: "#3f4041", // 设置画布背景颜色
      image: bgcImage,
    },
    connecting: {
      snap: {
        radius: 30,
      },
      allowBlank: false, // 是否允许连接到画布空白位置的点，默认为 true。
      allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true。
      allowEdge: false, // 是否允许边连接到另一个边，默认为 true。
      allowNode: false, // 是否允许边连接到节点（非节点上的连接桩），默认为 true。
      connector: "algo-edge", // 加工router返回的点
      highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点，默认值为 false 。一般都会与 highlighting 联合使用。
      router: {
        name: "orth",
      }, // 将路径点vertices 做进一步转换处理

      // 当在连接桩按下鼠标时触发，生成边
      validateMagnet(obj) {
        console.log(obj, "obj");
        return obj.magnet.getAttribute("port-group") !== "in";
      },

      // 移动边的时候判断连接是否有效
      validateConnection({
        sourceView,
        targetView,
        sourceMagnet,
        targetMagnet,
      }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute("port-group") === "in") {
          return false;
        }

        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute("port-group") !== "in") {
          return false;
        }

        return true;
      },
    },

    highlighting: {
      // 连线过程中，节点可以被链接时被使用。
      nodeAvailable: {
        name: "className",
        args: {
          className: "available",
        },
      },
      // 当连接桩可以被链接时，在连接桩外围渲染一个 1px 宽的红色矩形框
      magnetAvailable: {
        name: "stroke",
        args: {
          attrs: {
            strokeWidth: 1,
            fill: "#4EFFB2",
            stroke: "#f00",
          },
        },
      },
      // 连线过程中，自动吸附到连接桩时被使用
      magnetAdsorbed: {
        name: "className",
        args: {
          className: "adsorbed",
        },
      },
    },
  });
  // 初始化拖拽
  dnd.value = new Addon.Dnd({
    target: graph.value,
    scaled: false,
    dndContainer: document.getElementById("stencil") as HTMLElement,
  });

  nextTick(() => {
    graph.value.on("cell:click", ({ e, x, y, cell, view }) => {
      console.log(e);
      console.log(x);
      console.log(y);
      console.log(cell.attr());
      console.log(cell);
      cell.attr("body/stroke", "red");
      console.log(graph.value);

      console.log(view);
    });
  });
});
</script>
<style lang="less" scoped>
.graph {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  font-family: sans-serif;

  .stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    .stencil-title {
      display: flex;
      align-items: center;
      height: 33px;
      border-bottom: 1px solid #4b4d4f;
      color: #d8d8d8;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .left-stencil {
      width: 100%;
      .canvas-node-list {
        text-align: left;
        color: #8f8f8f;
        font-size: 12px;
        text-indent: 20px;
        line-height: 26px;
        cursor: pointer;

        &:hover {
          background: #00856c !important;
          color: #fff !important;
        }
      }
    }
  }

  .container {
    flex: 1;
    // height: 350px;
    height: 100%;
    margin-right: 8px;
    margin-left: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
    overflow: hidden;
  }
}
</style>
