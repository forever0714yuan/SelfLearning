<template>
  <div class="container-box">
    <div class="app-stencil" ref="appStencil"></div>
    <div id="container" class="app-content"></div>
    <!-- <div class="container-btn">
      <el-button type="primary" @click="customEdge">定制边</el-button>
      <el-button type="primary" @click="updateEdgeVertices"
        >修改边节点</el-button
      >
      <el-button type="primary" @click="updateEdgeColor">修改边颜色</el-button>
      <el-button type="primary" @click="PortMetadata">连接桩</el-button>
      <el-button type="primary" @click="addPortMetadataNode"
        >增加带连接桩的节点</el-button
      >
      <el-button type="primary" @click="addPortMetadata">增加连接桩</el-button>
      <el-button type="primary" @click="removePortMetadata"
        >移除连接桩</el-button
      >
      <el-button type="primary" @click="updatePortMetadataColor"
        >修改连接桩颜色</el-button
      >
      <el-button type="primary" @click="addTwoEmptyNode"
        >增加两个空节点</el-button
      >
      <el-button type="primary" @click="onUndo">撤销</el-button>
      <el-button type="primary" @click="onRedo">重做</el-button>

      <el-checkbox-group v-model="checkList" @change="changeCheckboxGroup">
        <el-checkbox label="allowBlank" />
        <el-checkbox label="allowMulti" />
        <el-checkbox label="allowLoop" />
        <el-checkbox label="allowNode" />
        <el-checkbox label="allowEdge" />
        <el-checkbox label="allowPort" />
      </el-checkbox-group>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { Graph, Color } from "@antv/x6";
import { ref, onMounted } from "vue";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { Selection } from "@antv/x6-plugin-selection";
import { Transform } from "@antv/x6-plugin-transform";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { History } from "@antv/x6-plugin-history";
import { Stencil } from "@antv/x6-plugin-stencil";
const data = {
  nodes: [
    {
      id: "node1",
      shape: "rect",
      x: 400,
      y: 40,
      width: 100,
      height: 40,
      label: "hello",
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 600,
      y: 180,
      width: 100,
      height: 40,
      label: "world",
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: "edge",
      source: "node1",
      target: "node2",
      label: "x6",
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ],
};

const graph = ref();
const checkList = ref([
  "allowBlank", // 是否允许连接到画布空白位置的点，默认为 true
  "allowMulti", // 是否允许在相同的起始节点和终止之间创建多条边，默认为 true
  "allowLoop", // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true
  "allowNode", // 是否允许边连接到节点（非节点上的连接桩），默认为 true
  "allowEdge", // 是否允许边连接到另一个边，默认为 true
  "allowPort", // 是否允许边连接到连接桩，默认为 true
]);
// 初始化节点
const initGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA", //北京颜色
    },
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    // autoResize: true, //自动适应画布的大小
    panning: true, // 画布拖拽
    mousewheel: true, // 画布缩放
  });

  graph.value.fromJSON(data); // 渲染元素
  graph.value.centerContent(); // 居中显示
};
// 空画布
const initCleanGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA", //北京颜色
    },
    // 拉线的样式
    connecting: {
      createEdge() {
        return this.createEdge({
          shape: "edge",
          attrs: {
            line: {
              stroke: "#8f8f8f",
              strokeWidth: 1,
            },
          },
        });
      },
    },
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    // autoResize: true, //自动适应画布的大小
    panning: true, // 画布拖拽
    mousewheel: true, // 画布缩放
  });

  graph.value.fromJSON({}); // 渲染元素
  graph.value.centerContent(); // 居中显示
};

// 添加节点 需要在初次渲染之后再次调用addNode  才会有用  否则渲染不出来
const node3 = ref();
const addNode = () => {
  node3.value = graph.value.addNode({
    id: "node3",
    shape: "rect",
    x: 40,
    y: 100,
    width: 100,
    height: 40,
    label: "rect",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
      label: {
        refX: 0.5,
        refY: "100%",
        refY2: 4,
        textAnchor: "middle",
        textVerticalAnchor: "top",
      },
    },
  });
};

// 定制节点
const target = ref();
const customMade = () => {
  Graph.registerNode(
    "custom-node", // 节点名称
    {
      inherit: "rect", // 继承于 rect 节点
      width: 100, // 宽度
      height: 40, // 高度
      markup: [
        {
          tagName: "rect", // 标签名称
          selector: "body", // 选择器
        },
        {
          tagName: "image",
          selector: "img",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        // 选择器 body
        body: {
          stroke: "#8f8f8f", // 描边颜色
          strokeWidth: 1, // 描边宽度
          fill: "red", // 填充色
          rx: 6, // 边框圆角
          ry: 6, // 边框圆角
        },
        // 选择器 img
        img: {
          // "xlink:href":
          // "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png", //图片链接
          width: 16, // 宽度
          height: 16, // 高度
          x: 12, // 横向偏移量
          y: 12, // 纵向偏移量
        },
        // 选择器 label
        label: {
          fill: "#fff", // 字体颜色
          fontSize: 13, // 字体大小
        },
      },
    },
    true
  );

  const source = graph.value.addNode({
    shape: "custom-node", // 可以直接使用上面注册过的 shape
    x: -20,
    y: 0,
    label: "hello",
  });

  target.value = graph.value.addNode({
    shape: "custom-node",
    x: 100,
    y: -80,
    label: "world",
  });

  graph.value.addEdge({
    source,
    target: target.value,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
};

// 修改节点
const updateNode = () => {
  console.log(node3.value);
  // console.log(node3.value.prop());
  node3.value.prop("size", { width: 100, height: 250 });

  const color = Color.random().toHex();
  console.log(color); // 字符串

  node3.value.attr("body/fill", color);
};
// 添加边
const addEdge = () => {
  graph.value.addEdge({
    shape: "edge",
    source: node3.value,
    target: target.value,
    attrs: {
      line: {
        stroke: "#8f8f8f", // 线的颜色
        strokeWidth: 1, // 线的宽度
        // sourceMarker: "block", // 实心箭头
        sourceMarker: {
          tagName: "path", // 指定的 SVG 元素来渲染箭头
          d: "M 20 -10 0 0 20 10 Z",
        }, // 实心箭头
        // targetMarker: {
        //   // x6在目标节点默认带有箭头，如果不需要，可以将其设置为null
        //   name: "ellipse", // 椭圆
        //   rx: 10, // 椭圆箭头的 x 半径
        //   ry: 6, // 椭圆箭头的 y 半径
        // },
        targetMarker: {
          tagName: "path",
          // 箭头默认继承边的填充色 fill 和边框色 stroke。
          fill: "yellow", // 使用自定义填充色
          stroke: "green", // 使用自定义边框色
          d: "M 20 -10 0 0 20 10 Z",
          strokeWidth: 2, // 箭头描边宽度
        },
      },
    },
    // 相当于固定的点，但是点是可以移动的
    vertices: [
      { x: 100, y: 200 },
      { x: 300, y: 120 },
    ],
    // 路由 router 将对 vertices 进一步处理,处理后的边的每一条链接线段都是水平或者垂直的
    router: {
      name: "orth",
      args: {},
    },
    // 将这条边的每段线条的转折点转换成圆弧倒角
    connector: {
      name: "rounded",
      args: {},
    },
    labels: [
      {
        attrs: {
          label: {
            text: "40%", // 边上的文字
            stroke: "#aaa", // 字体的颜色
          },
        },
        position: 0.4, // 字体离源点的位置
      },
      {
        attrs: {
          label: {
            text: "60%",
            stroke: "#aaa",
          },
        },
        position: 0.6,
      },
    ],
  });
};

// 定制边
const customEdge = () => {
  // 通过 markup 和 attrs 来定制边的形状和样式
  Graph.registerEdge("double-edge", {
    inherit: "edge",
    markup: [
      {
        tagName: "path", // 指定的 SVG 元素来渲染箭头
        selector: "outline", //选择器
        attrs: {
          fill: "none",
        },
      },
      {
        tagName: "path",
        selector: "line",
        attrs: {
          fill: "none",
          cursor: "pointer",
        },
      },
    ],
    attrs: {
      line: {
        connection: true,
        stroke: "red", // 内部填充色
        strokeWidth: 4, // 内部填充宽度
        strokeLinejoin: "round",
        targetMarker: {
          tagName: "path",
          stroke: "#ffa",
          d: "M 10 -3 10 -10 -2 0 10 10 10 3",
        },
      },
      outline: {
        connection: true,
        stroke: "#000000",
        strokeWidth: 6,
        strokeLinejoin: "round",
      },
    },
  });

  Graph.registerEdge("shadow-edge", {
    inherit: "edge",
    markup: [
      {
        tagName: "path",
        selector: "shadow",
        attrs: {
          fill: "none",
        },
      },
      {
        tagName: "path",
        selector: "line",
        attrs: {
          fill: "none",
          cursor: "pointer",
        },
      },
    ],
    attrs: {
      line: {
        connection: true,
        stroke: "#dddddd",
        strokeWidth: 20,
        strokeLinejoin: "round",
        targetMarker: {
          name: "path",
          stroke: "none",
          d: "M 0 -10 -10 0 0 10 z",
          offsetX: -5,
        },
        sourceMarker: {
          name: "path",
          stroke: "none",
          d: "M -10 -10 0 0 -10 10 0 10 0 -10 z",
          offsetX: -5,
        },
      },
      shadow: {
        connection: true,
        refX: 3,
        refY: 6,
        stroke: "#000000",
        strokeOpacity: 0.2,
        strokeWidth: 20,
        strokeLinejoin: "round",
        targetMarker: {
          name: "path",
          d: "M 0 -10 -10 0 0 10 z",
          stroke: "none",
          offsetX: -5,
        },
        sourceMarker: {
          name: "path",
          stroke: "none",
          d: "M -10 -10 0 0 -10 10 0 10 0 -10 z",
          offsetX: -5,
        },
      },
    },
  });

  graph.value.addEdge({
    shape: "double-edge",
    source: [800, 100],
    target: [1100, 100],
  });
};
// 修改边
const updateEdge = () => {
  updateEdgeVertices();
  updateEdgeColor();
};

// 修改固定节点
const updateEdgeVertices = () => {
  const edges = graph.value.getEdges();
  edges.forEach((edge: { prop: (arg0: string, arg1: number[][]) => void }) => {
    const x = Math.floor(Math.random() * 600);
    const y = Math.floor(Math.random() * 200);
    edge.prop("vertices", [[x, y]]);
  });
};

// 修改边的颜色
const updateEdgeColor = () => {
  const edges = graph.value.getEdges();
  edges.forEach((edge: { attr: (arg0: string, arg1: string) => void }) => {
    const color = Color.random().toHex();
    edge.attr("line/stroke", color);
  });
};

// 连接桩
/**
 * 1.首先注册节点 在posts/groups 下定义 上下左右的点（定义是否有节点显示）
 * 2.然后再增加节点的时候，在posts/items 下配置连接桩的数量
 */
const PortMetadata = () => {
  // 自定义节点
  Graph.registerNode(
    "custom-node-width-port",
    {
      inherit: "rect", // 继承于 rect 节点
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f", // 节点描边颜色
          strokeWidth: 1, // 节点描边宽度
          fill: "#fff", // 内容填充颜色
          rx: 6, //节点水平轴的半径
          ry: 6, // 节点垂直轴的半径
        },
      },
      ports: {
        groups: {
          top: {
            position: "top", // 连接桩的位置
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
          left: {
            position: "left",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
        },
      },
    },
    true
  );

  const source = graph.value.addNode({
    shape: "custom-node-width-port",
    x: 40,
    y: 40,
    label: "hello",
    ports: {
      items: [
        {
          id: "port_1",
          group: "bottom",
        },
        {
          id: "port_2",
          group: "bottom",
        },
        {
          id: "port_5",
          group: "left",
        },
      ],
    },
  });

  const target = graph.value.addNode({
    shape: "custom-node-width-port",
    x: 160,
    y: 180,
    label: "world",
    ports: {
      items: [
        {
          id: "port_3",
          group: "top",
        },
        {
          id: "port_4",
          group: "top",
        },
      ],
    },
  });

  graph.value.addEdge({
    source: { cell: source, port: "port_2" },
    target: { cell: target, port: "port_3" },
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

  graph.value.centerContent();
};

// 增加带连接桩的节点
const addPortMetadataNode = () => {
  Graph.registerNode(
    "custom-node-width-port",
    {
      inherit: "rect",
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
            label: {
              position: "top",
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
            label: {
              position: "top",
            },
          },
        },
      },
    },
    true
  );
  graph.value.addNode({
    id: "node_port_1",
    shape: "custom-node-width-port",
    x: 150,
    y: 100,
    label: "hello",
  });
  graph.value.centerContent();
};

// 增加连接桩
interface MyNode extends Node {
  getPorts: () => object;
  addPort: ({}) => object;
}

const addPortMetadata = () => {
  const node: MyNode = graph.value.getCellById("node_port_1");
  console.log(node);
  const ports = node.getPorts();

  node.addPort({
    group: "top",
    attrs: {
      text: {
        text: `${ports.length + 1}`,
      },
    },
  });
};
// 移除连接桩
const removePortMetadata = () => {
  const node = graph.value.getCellById("node_port_1") as Node;
  const ports = node.getPorts();
  node.removePortAt(ports.length - 1);
};

// 修改连接桩颜色
const updatePortMetadataColor = () => {
  const node = graph.value.getCellById("node_port_1") as Node;
  const ports = node.getPorts();
  let color: string = Color.random().toHex();
  ports.forEach((port: { id: any }) => {
    node!.portProp(port.id!, "attrs/circle/stroke", color);
  });
};

// 增加两个空节点
const addTwoEmptyNode = () => {
  graph.value.addNode({
    x: 60,
    y: 50,
    width: 100,
    height: 40,
    label: "1",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        in: {
          position: "top",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 5,
            },
          },
        },
        out: {
          position: "bottom",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 5,
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
          group: "in",
        },
        {
          id: "port3",
          group: "in",
        },
        {
          id: "port4",
          group: "out",
        },
        {
          id: "port5",
          group: "out",
        },
      ],
    },
  });

  graph.value.addNode({
    x: 160,
    y: 200,
    width: 100,
    height: 40,
    label: "2",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        in: {
          position: "top",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 5,
            },
          },
        },
        out: {
          position: "bottom",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 5,
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
          group: "in",
        },
        {
          id: "port3",
          group: "in",
        },
        {
          id: "port4",
          group: "out",
        },
        {
          id: "port5",
          group: "out",
        },
      ],
    },
  });
  graph.value.centerContent();
};

// 初始化节点交互
const allowInitGraph = (options: object) => {
  if (graph.value) {
    graph.value.dispose();
  }
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 800,
    height: 300,
    background: {
      color: "#F2F7FA",
    },
    connecting: {
      ...options,
      createEdge() {
        return this.createEdge({
          attrs: {
            line: {
              stroke: "#8f8f8f",
              strokeWidth: 1,
            },
          },
        });
      },
    },
  });
  addTwoEmptyNode();
};

// 选择多选框更新
let changeCheckboxGroupData = ref({
  allowBlank: true,
  allowMulti: true,
  allowLoop: true,
  allowNode: true,
  allowEdge: true,
  allowPort: true,
});
const changeCheckboxGroup = (value: any) => {
  console.log(value);

  console.log(value.findIndex((v: string) => v === "allowBlank"));

  if (value.findIndex((v: string) => v === "allowBlank") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowBlank: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowBlank: false }
    );
  }

  if (value.findIndex((v: string) => v === "allowMulti") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowMulti: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowMulti: false }
    );
  }

  if (value.findIndex((v: string) => v === "allowLoop") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowLoop: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowLoop: false }
    );
  }

  if (value.findIndex((v: string) => v === "allowNode") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowNode: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowNode: false }
    );
  }

  if (value.findIndex((v: string) => v === "allowEdge") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowEdge: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowEdge: false }
    );
  }

  if (value.findIndex((v: string) => v === "allowPort") !== -1) {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowPort: true }
    );
  } else {
    changeCheckboxGroupData.value = Object.assign(
      changeCheckboxGroupData.value,
      { allowPort: false }
    );
  }
  console.log(changeCheckboxGroupData.value);

  allowInitGraph(changeCheckboxGroupData.value);
};
// 空画布，交互处的
const initmutualCleanGraph = () => {
  Graph.registerNode(
    "custom-node-width-port",
    {
      inherit: "rect",
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                magnet: true,
                stroke: "#8f8f8f",
                r: 5,
              },
            },
          },
        },
      },
    },
    true
  );

  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA", //背景颜色
    },
    connecting: {
      allowNode: false,
      allowBlank: false,
      highlight: true,
      createEdge() {
        return this.createEdge({
          attrs: {
            line: {
              stroke: "#8f8f8f",
              strokeWidth: 1,
            },
          },
        });
      },
      // 在元素被按下的时候，判断连接桩是否能够创建边
      validateMagnet({ magnet }) {
        // 节点上方的连接桩无法创建连线

        return magnet.getAttribute("port-group") !== "top";
      },
      //在移动边的时候判断连接是否有效
      validateConnection({
        sourceCell,
        targetCell,
        sourceMagnet,
        targetMagnet,
      }) {
        // console.log(sourceCell);
        // console.log(targetCell);
        // console.log(sourceMagnet);
        // console.log(targetMagnet);

        // 不能连接自身
        if (sourceCell === targetCell) {
          return false;
        }

        // 只能从 bottom 连接桩开始连接，连接到 top 连接桩
        if (
          !sourceMagnet ||
          sourceMagnet.getAttribute("port-group") === "top"
        ) {
          return false;
        }
        if (
          !targetMagnet ||
          targetMagnet.getAttribute("port-group") !== "top"
        ) {
          return false;
        }

        // 不能重复连线
        const edges = this.getEdges();
        const portId = targetMagnet.getAttribute("port");
        if (edges.find((edge) => edge.getTargetPortId() === portId)) {
          return false;
        }

        return true;
      },
    },
    highlighting: {
      // 连接桩可以被连接时在连接桩外围围渲染一个包围框，即按住鼠标的时候，允许连接的连接桩都会高亮
      magnetAvailable: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#A4DEB1",
            strokeWidth: 4,
          },
        },
      },
      // 连接桩吸附连线时在连接桩外围围渲染一个包围框,即当从源连接桩将箭头移动到目标节点连接桩上的时候高亮
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#31d0c6",
            strokeWidth: 4,
          },
        },
      },
    },
    //将一个节点拖动到另一个节点中，使其成为另一节点的子节点
    embedding: {
      enabled: true,
      findParent({ node }) {
        // 获取移动节点的包围盒
        const bbox = node.getBBox();
        // 找到 data 中配置 { parent: true } 的节点，并且移动节点和找到的节点包围盒相交时，返回 true
        return this.getNodes().filter((node) => {
          const data = node.getData<{ parent: boolean }>();
          if (data && data.parent) {
            const targetBBox = node.getBBox();
            return bbox.isIntersectWithRect(targetBBox);
          }
          return false;
        });
      },
    },
    // autoResize: true, //自动适应画布的大小
    panning: true, // 画布拖拽
    mousewheel: true, // 画布缩放
  });

  graph.value.addNode({
    shape: "custom-node-width-port",
    id: "node1",
    x: 40,
    y: 40,
    label: "parent",
    ports: {
      items: [
        {
          id: "port_1",
          group: "top",
        },
        {
          id: "port_2",
          group: "top",
        },
        {
          id: "port_3",
          group: "bottom",
        },
        {
          id: "port_4",
          group: "bottom",
        },
      ],
    },
    data: {
      parent: true,
    },
  });

  graph.value.addNode({
    shape: "custom-node-width-port",
    id: "node2",
    x: 160,
    y: 180,
    label: "child",
    ports: {
      items: [
        {
          id: "port_5",
          group: "top",
        },
        {
          id: "port_6",
          group: "top",
        },
        {
          id: "port_7",
          group: "bottom",
        },
        {
          id: "port_8",
          group: "bottom",
        },
      ],
    },
  });

  graph.value.centerContent(); // 居中显示
};

// 锚点和连接点
const anchor = () => {
  // 注册节点
  Graph.registerNode(
    "anchorNode",
    {
      inherit: "rect",
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    true
  );

  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });

  const source = graph.value.addNode({
    shape: "anchorNode",
    x: 40,
    y: 200,
    label: "hello",
  });

  const target = graph.value.addNode({
    shape: "anchorNode",
    x: 300,
    y: 80,
    label: "world",
  });

  graph.value.addEdge({
    // 源节点配置
    source: {
      cell: source,
      anchor: {
        name: "right", //锚点的位置
        args: {
          dy: 0, //y轴移动的距离
          dx: 0, //x轴移动的距离
        },
      },
      connectionPoint: "anchor", // 连接点计算方法，默认使用锚点作为连接点。
    },
    target: {
      cell: target,
      anchor: {
        name: "left",
        args: {
          dy: -10,
        },
      },
      connectionPoint: "anchor",
    },
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

  // graph.value.addEdge({
  //   source: {
  //     cell: source,
  //     anchor: {
  //       name: "right",
  //     },
  //     connectionPoint: "anchor",
  //   },
  //   target: {
  //     cell: target,
  //     anchor: {
  //       name: "left",
  //     },
  //     connectionPoint: "anchor",
  //   },
  //   attrs: {
  //     line: {
  //       stroke: "#8f8f8f",
  //       strokeWidth: 1,
  //     },
  //   },
  // });

  // graph.value.addEdge({
  //   source: {
  //     cell: source,
  //     anchor: {
  //       name: "right",
  //       args: {
  //         dy: 10,
  //       },
  //     },
  //     connectionPoint: "anchor",
  //   },
  //   target: {
  //     cell: target,
  //     anchor: {
  //       name: "left",
  //       args: {
  //         dy: 10,
  //       },
  //     },
  //     connectionPoint: "anchor",
  //   },
  //   attrs: {
  //     line: {
  //       stroke: "#8f8f8f",
  //       strokeWidth: 1,
  //     },
  //   },
  // });
  graph.value.centerContent(); // 居中显示
};

// 工具
const tools = () => {
  Graph.registerNode(
    "tools-node",
    {
      inherit: "rect",
      width: 100,
      height: 40,
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    true
  );

  const graph = new Graph({
    container: document.getElementById("container") as HTMLElement,
    background: {
      color: "#F2F7FA",
    },
    width: 1400,
    height: 600,
  });

  const source = graph.addNode({
    shape: "tools-node",
    x: 40,
    y: 40,
    label: "Source",
    tools: [
      "button-remove", //在指定的位置处，渲染一个删除按钮，点击时删除对应的节点。
      "boundary", //根据节点的包围盒渲染一个包围节点的矩形。注意，该工具仅仅渲染一个矩形，不带任何交互。
    ],
  });
  const target = graph.addNode({
    shape: "tools-node",
    x: 160,
    y: 240,
    label: "Target",
    tools: ["button-remove"],
  });
  graph.addEdge({
    source,
    target,
    vertices: [
      { x: 90, y: 160 },
      { x: 210, y: 160 },
    ],
    tools: [
      "vertices", // 在路径点位置渲染一个小圆点，拖动小圆点修改路径点位置，双击小圆点删除路径点，在边上单击添加路径点。
      "segments", // 在边的每条线段的中心渲染一个工具条，可以拖动工具条调整线段两端的路径点的位置。
      "boundary", // 根据边的包围盒渲染一个包围边的矩形。注意，该工具仅仅渲染一个矩形，不带任何交互。
      {
        name: "button-remove", // 在指定的位置处，渲染一个删除按钮，点击时删除对应的边。
        args: { distance: "50%" },
      },
      {
        name: "source-arrowhead", // 在边的起点渲染一个图形(默认是箭头)，拖动该图形来修改边的起点。
      },
    ],
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
  graph.centerContent(); // 居中显示
};

// 图形变换
interface State {
  enabled: true;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  orthogonal?: boolean;
  restricted?: boolean;
  preserveAspectRatio?: boolean;
  grid?: number;
}
const graphicTransformation = (options: State) => {
  if (graph.value) {
    graph.value.dispose();
  }
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });
  graph.value.use(
    new Transform({
      resizing: options,
      rotating: options,
    })
  );

  const source = graph.value.addNode({
    shape: "rect",
    x: 32,
    y: 32,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const target = graph.value.addNode({
    shape: "circle",
    x: 160,
    y: 180,
    width: 60,
    height: 60,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  });

  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

  graph.value.centerContent();
};

// 对齐线
const alignmentLine = () => {
  if (graph.value) {
    graph.value.dispose();
  }
  graph.value = new Graph({
    width: 1400,
    height: 600,
    container: document.getElementById("container") as HTMLElement,
    background: {
      color: "#F2F7FA",
    },
  });
  graph.value.use(
    // 开启对齐线
    new Snapline({
      enabled: true,
      clean: false,
      sharp: true,
      resizing: true,
    })
  );
  graph.value.use(
    // 放大缩小
    new Transform({
      resizing: {
        enabled: true,
      },
    })
  );

  graph.value.addNode({
    x: 200,
    y: 100,
    width: 100,
    height: 40,
    label: "Drag Me",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const source = graph.value.addNode({
    x: 32,
    y: 32,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const target = graph.value.addNode({
    shape: "circle",
    x: 160,
    y: 180,
    width: 60,
    height: 60,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  });

  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
};
// 复制粘贴
const copyPaste = () => {
  graph.value = new Graph({
    width: 1400,
    height: 600,
    container: document.getElementById("container") as HTMLElement,
    background: {
      color: "#F2F7FA",
    },
  });

  graph.value.use(
    new Selection({
      enabled: true,
      showNodeSelectionBox: true,
    })
  );

  graph.value.use(
    new Clipboard({
      enabled: true,
      useLocalStorage: true,
    })
  );

  graph.value.addNode({
    x: 280,
    y: 80,
    width: 100,
    height: 40,
    label: "Rect",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const source = graph.value.addNode({
    x: 32,
    y: 32,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const target = graph.value.addNode({
    shape: "circle",
    x: 180,
    y: 160,
    width: 60,
    height: 60,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  });

  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
  graph.value.centerContent(); // 居中显示
};
// 快捷键
const keyboard = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });

  graph.value.use(
    new Clipboard({
      enabled: true,
    })
  );
  graph.value.use(
    new Selection({
      enabled: true,
      showNodeSelectionBox: true,
    })
  );
  graph.value.use(
    new Keyboard({
      enabled: true,
      global: true,
    })
  );

  graph.value.addNode({
    x: 280,
    y: 100,
    width: 100,
    height: 40,
    label: "Rect",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const source = graph.value.addNode({
    x: 32,
    y: 32,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const target = graph.value.addNode({
    shape: "circle",
    x: 160,
    y: 180,
    width: 60,
    height: 60,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  });

  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });

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

// 撤销重做
const historys = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });

  graph.value.use(
    new History({
      enabled: true,
    })
  );

  graph.value.addNode({
    x: 100,
    y: 60,
    width: 100,
    height: 40,
    label: "Drag Me",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  // graph.value.on("history:change", () => {
  //   this.setState({
  //     canRedo: graph.canRedo(),
  //     canUndo: graph.canUndo(),
  //   });
  // });
};
const onUndo = () => {
  graph.value.undo();
};
const onRedo = () => {
  graph.value.redo();
};
// 框选
const selectionBox = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });

  graph.value.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    })
  );

  graph.value.addNode({
    x: 320,
    y: 100,
    width: 100,
    height: 40,
    label: "Rect",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const source = graph.value.addNode({
    x: 80,
    y: 50,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });

  const target = graph.value.addNode({
    shape: "circle",
    x: 240,
    y: 200,
    width: 60,
    height: 60,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
      },
    },
  });

  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
};

// 流程图
const appStencil = ref();
const stencilGraph = () => {
  // 定义公共部分
  const commonAttrs = {
    body: {
      fill: "#fff",
      stroke: "#8f8f8f",
      strokeWidth: 1,
    },
  };
  // 生成画布
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    width: 1400,
    height: 600,
    background: {
      color: "#F2F7FA",
    },
  });
  // 使用线对齐
  graph.value.use(
    new Snapline({
      enabled: true,
      sharp: true,
    })
  );
  // 源节点
  const source = graph.value.addNode({
    x: 130,
    y: 30,
    width: 100,
    height: 40,
    label: "Hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });
  // 目标节点
  const target = graph.value.addNode({
    x: 320,
    y: 240,
    width: 100,
    height: 40,
    label: "World",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  });
  // 添加边
  graph.value.addEdge({
    source,
    target,
    attrs: {
      line: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
      },
    },
  });
  // 居中显示
  graph.value.centerContent();

  const stencil = new Stencil({
    title: "Components",
    target: graph.value,
    search(cell, keyword) {
      return cell.shape.indexOf(keyword) !== -1;
    },
    placeholder: "Search by shape name",
    notFoundText: "Not Found",
    collapsable: true,
    stencilGraphWidth: 200,
    stencilGraphHeight: 100,
    groups: [
      {
        name: "group1",
        title: "Group(Collapsable)",
      },
      {
        name: "group2",
        title: "Group",
        collapsable: false,
      },
    ],
  });

  appStencil.value.appendChild(stencil.container);

  const n1 = graph.value.createNode({
    shape: "rect",
    x: 40,
    y: 40,
    width: 80,
    height: 40,
    label: "rect",
    attrs: commonAttrs,
  });

  const n2 = graph.value.createNode({
    shape: "circle",
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: "circle",
    attrs: commonAttrs,
  });

  const n3 = graph.value.createNode({
    shape: "ellipse",
    x: 280,
    y: 40,
    width: 80,
    height: 40,
    label: "ellipse",
    attrs: commonAttrs,
  });

  const n4 = graph.value.createNode({
    shape: "path",
    x: 420,
    y: 40,
    width: 40,
    height: 40,
    // https://www.svgrepo.com/svg/13653/like
    path: "M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z",
    attrs: commonAttrs,
    label: "path",
  });

  stencil.load([n1, n2], "group1");
  stencil.load([n3, n4], "group2");
};
onMounted(() => {
  stencilGraph();
  // selectionBox();
  // historys();
  // keyboard();
  // copyPaste();
  // alignmentLine();
  // graphicTransformation({
  //   enabled: true, // 能否修改节点尺寸
  //   minWidth: 1, // 缩放的最小宽度
  //   maxWidth: 200, // 缩放的最大宽度
  //   minHeight: 1, // 缩放的最小高度
  //   maxHeight: 150, // 缩放的最大高度
  //   orthogonal: false, // 是否显示中间调整点
  //   restricted: false, // 调整大小边界是否可以超出画布边缘
  //   preserveAspectRatio: false, // 调整大小过程中是否保持节点的宽高比例
  //   grid: 15,
  // });
  // tools();
  // anchor();
  // initGraph();
  // initCleanGraph();
  // initmutualCleanGraph();
  // addNode();
  // customMade();
  // updateNode();
  // addEdge();
  // customEdge();
  // allowInitGraph({
  //   allowBlank: true,
  //   allowMulti: true,
  //   allowLoop: true,
  //   allowNode: true,
  //   allowEdge: true,
  //   allowPort: true,
  // });
});
</script>

<style scoped lang="scss">
// .container-box {
//   display: flex;
// }
// .container-btn {
//   display: flex;
//   flex-wrap: wrap;
// }

.container-box {
  display: flex;
  padding: 0;
  font-family: sans-serif;

  .app-stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
  }

  .app-content {
    flex: 1;
    height: 350px;
    margin-right: 8px;
    margin-left: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }
}
</style>
