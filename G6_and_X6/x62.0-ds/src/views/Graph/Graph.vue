<template>
  <div class="graph">
    <!-- 左侧 -->
    <div class="stencil" id="stencil" ref="stencil">
      <div class="stencil-title">
        <SFIcon color="white" style="margin: 0 5px">
          <DownOutlined />
        </SFIcon>
        执行条件
      </div>
      <div data-type="rect" class="left-stencil" @mousedown="startDrag">
        <div class="canvas-node-list">CS</div>
      </div>
      <div class="stencil-title">
        <SFIcon color="white" style="margin: 0 5px">
          <DownOutlined />
        </SFIcon>
        执行动作
      </div>
      <div data-type="rect" class="left-stencil" @mousedown="startDrag">
        <div class="canvas-node-list">CS</div>
      </div>
    </div>

    <!-- 右侧 -->
    <a-button
      type="primary"
      style="position: absolute; left: 210px; top: 10px; z-index: 1000"
      @click="deleteClick"
      >删除</a-button
    >
    <a-button
      type="primary"
      style="position: absolute; left: 310px; top: 10px; z-index: 1000"
      @click="saveClick"
      >保存</a-button
    >
    <a-button
      type="primary"
      style="position: absolute; left: 410px; top: 10px; z-index: 1000"
      @click="autoLayout"
      >自动布局</a-button
    >
    <div id="container" class="container"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";

import { Graph, Shape } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { register } from "@antv/x6-vue-shape";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Selection } from "@antv/x6-plugin-selection";
import { GridLayout, DagreLayout } from "@antv/layout";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { Keyboard } from "@antv/x6-plugin-keyboard";

import axios from "axios";
import SFIcon from "@sefon/sefon-design/es/icon";
import { DownOutlined } from "@ant-design/icons-vue";

import CanvasNode from "./component/CanvasNode.vue";
import bgcImage from "@/assets/bg2.b4f49dec.png";
import "ant-design-vue/dist/antd.css";
import type { Edge, Node } from "./graphType";

const graph = ref();
const dnd = ref();

// 注册组件节点
register({
  shape: "custom-vue-node",
  primer: "rect",
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

Shape.Edge.config({
  attrs: {
    line: {
      strokeDasharray: "3 2",

      stroke: "#8F9498",

      targetMarker: {
        name: "block",
        stroke: "#8F9498",
        fill: "#8F9498",
        size: 7,
      },

      className: "custom-line",
    },
  },
});

const ports = {
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
          r: 5,
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
          r: 5,
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
};

// 移动节点
const startDrag = (e: any) => {
  const node = graph.value.createNode({
    x: 20,
    y: 20,
    width: 320,
    height: 200,
    shape: "custom-vue-node",
    ports: ports,
    data: {
      name: "xiaomi",
    },
  });
  dnd.value.start(node, e as any);
};

// 处理边和节点的关系
const handleNodeEdgeRelation = () => {
  const data = {
    nodes: [],
    edges: [],
  };
  const edges = graph.value.getEdges();
  const nodes = graph.value.getNodes();

  const nodesRelations = nodes.map((node: Node) => {
    return {
      id: node.id,
      shape: "custom-vue-node",
      ports: {
        ...node.ports,
      },
      ...node.size(),
      ...node.position(),
    };
  });

  const edgesRelations = edges.map((edge: Edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      attr: {
        ...edge.attr,
      },
    };
  });

  data.nodes = nodesRelations;
  data.edges = edgesRelations;

  return data;
};

// 自动布局
const autoLayout = () => {
  const data: object = handleNodeEdgeRelation();

  const dagreLayout = new DagreLayout({
    type: "dagre",
    rankdir: "LR",
    // align: "UR",
    ranksep: 150,
    nodesep: 80,
  });
  const model = dagreLayout.layout(data);
  graph.value.fromJSON(model);

  graph.value.zoomToFit({ maxScale: 1 });
  graph.value.centerContent();
};

// 保存节点
const saveClick = async () => {
  const data: { nodes: Array<any>; edges: Array<any> } =
    handleNodeEdgeRelation();

  // 判断是否存在节点
  const res = await axios.post("http://localhost:3000/nodes", {
    nodesRelations: data.nodes,
    edgesRelations: data.edges,
  });
  console.log(res);
};

// 删除节点
const nodeCell = ref();
const deleteClick = () => {
  if (nodeCell.value && nodeCell.value.length !== 0) {
    nodeCell.value.forEach((item: any) => {
      graph.value.removeCell(item);
    });
  }
};

// 获取数据
const edgesRelations = ref([]);
const nodesRelations = ref([]);

const getData = async () => {
  const res = await axios.get("http://localhost:3000/nodes");
  console.log(res);
  edgesRelations.value = res.data[0].edgesRelations;
  nodesRelations.value = res.data[0].nodesRelations;

  renderNodeEdges();
};

// 生成节点和线
const renderNodeEdges = () => {
  nodesRelations.value.forEach((node: Node) => {
    graph.value.addNode({
      id: node.id,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      shape: "custom-vue-node",
      ports: ports,
      data: {
        name: "xiaomi",
      },
    });
  });

  edgesRelations.value.forEach((edge: Edge) => {
    const data = {
      id: edge.id,
      source: Object.assign({}, edge.source),
      target: Object.assign({}, edge.target),
    };
    graph.value.addEdge(data);
  });
};

// 监听事件
const watchEvent = () => {
  graph.value.on("cell:selected", function ({ cell }: { cell: any }) {
    console.log(cell, "selected");

    cell.attr("body/stroke", "red");
    cell.attr("line/stroke", "red");

    cell.setData({
      name: "huawei",
    });

    nodeCell.value = graph.value.getSelectedCells();
  });

  graph.value.on("cell:unselected", function ({ cell }: { cell: any }) {
    cell.attr("body/stroke", "#154938");
    cell.attr("line/stroke", "#d8d8d8");
  });
};

// 绑定事件
const bindKeyEvent = () => {
  graph.value.bindKey("ctrl+c", () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.copy(cells);
    }
    return false;
  });

  graph.value.bindKey("ctrl+v", () => {
    if (!graph.value.isClipboardEmpty()) {
      const cells = graph.value.paste({ offset: 32 });
      graph.value.cleanSelection();
      graph.value.select(cells);
    }
    return false;
  });
};

onMounted(() => {
  //渲染画布
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 800,
    height: 910,
    background: {
      color: "#3f4041", // 设置画布背景颜色
      image: bgcImage,
      size: "cover",
    },
    autoResize: true,
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
        name: "manhattan",
        args: {
          padding: 10,
        },
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
    panning: true, // 画布拖拽
    mousewheel: true, // 画布缩放
  });

  dnd.value = new Dnd({
    target: graph.value,
    scaled: false,
    dndContainer: document.getElementById("stencil") as HTMLElement,
  });

  nextTick(() => {
    getData();
  });

  graph.value
    //对齐线
    .use(
      new Snapline({
        enabled: true,
        clean: false,
      })
    )
    // 框选
    .use(
      new Selection({
        enabled: true, // 是否开启框选功能
        multiple: true, // 是否启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
        rubberband: true, // 是否启用框选节点功能
        movable: true, // 拖动选框时框选的节点是否一起移动
        showNodeSelectionBox: true, // 是否显示节点的选择框
        modifiers: "shift", // 框选使用
        className: "select-graph",
      })
    )
    // 复制粘贴
    .use(
      new Clipboard({
        enabled: true,
      })
    )
    // 快捷键
    .use(
      new Keyboard({
        enabled: true,
      })
    );

  nextTick(() => {
    watchEvent();
    bindKeyEvent();

    window.addEventListener("keydown", function (e) {
      if (e.key === "Shift") {
        graph.value.disablePanning();
      }
    });

    window.addEventListener("keyup", function (e) {
      graph.value.enablePanning();
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
    background-color: #1d1e1f;
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
:deep(.container) {
  .select-graph {
    .x6-widget-selection-inner,
    .x6-widget-selection-box-node {
      border: none;
      box-shadow: none;
    }
  }
}

:deep(.container.x6-graph.x6-graph-pannable) {
  .x6-widget-selection.select-graph.x6-widget-selection-selected {
    .x6-widget-selection-box.x6-widget-selection-box-node {
      width: 0;
      height: 0;
    }
  }
}
</style>

<style lang="less"></style>
