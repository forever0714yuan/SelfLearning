<template>
  <div class="flyfront">
    <div class="app-stencil" id="stencil" ref="appStencil"></div>
    <div id="container" class="app-content"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Graph, Shape } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import insertCss from "insert-css";
// 为了协助代码演示
// preWork();
const graph = ref();
const appStencil = ref();
// 初始化画布;
function preWork() {
  // 这里协助演示的代码，在实际项目中根据实际情况进行调整
  const container = document.getElementById("container")!;
  const stencilContainer = document.createElement("div");
  stencilContainer.id = "stencil";
  const graphContainer = document.createElement("div");
  graphContainer.id = "graph-container";
  container.appendChild(stencilContainer);
  container.appendChild(graphContainer);
  insertCss(`
    #container {
      display: flex;
      border: 1px solid #dfe3e8;
    }
    #stencil {
      width: 180px;
      height: 100%;
      position: relative;
      border-right: 1px solid #dfe3e8;
    }
    #graph-container {
      width: calc(100% - 180px);
      height: 100%;
    }
    .x6-widget-stencil  {
      background-color: #fff;
    }
    .x6-widget-stencil-title {
      background-color: #fff;
    }
    .x6-widget-stencil-group-title {
      background-color: #fff !important;
    }
    .x6-widget-transform {
      margin: -1px 0 0 -1px;
      padding: 0px;
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div {
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div:hover {
      background-color: #3dafe4;
    }
    .x6-widget-transform-active-handle {
      background-color: #3dafe4;
    }
    .x6-widget-transform-resize {
      border-radius: 0;
    }
    .x6-widget-selection-inner {
      border: 1px solid #239edd;
    }
    .x6-widget-selection-box {
      opacity: 0;
    }
  `);
}
onMounted(() => {
  // 初始化画布
  graph.value = new Graph({
    container: document.getElementById("container")!,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: "manhattan",
      connector: {
        name: "rounded",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF",
          },
        },
      },
    },
  });

  // 使用插件;
  graph.value
    .use(
      new Transform({
        resizing: true,
        rotating: true,
      })
    )
    .use(
      new Selection({
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      })
    )
    .use(
      new Snapline({
        enabled: true,
      })
    )
    .use(
      new Keyboard({
        enabled: true,
      })
    )
    .use(
      new Clipboard({
        enabled: true,
      })
    )
    .use(
      new History({
        enabled: true,
      })
    );
  // 初始化流程
  const stencil = new Stencil({
    title: "流程图",
    target: graph.value,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    collapsable: true,
    groups: [
      {
        title: "基础流程图",
        name: "group1",
      },
      {
        title: "特殊符号",
        name: "group2",
        graphHeight: 250,
        layoutOptions: {
          rowHeight: 70,
        },
      },
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  });
  // 将 stencil 推进目标节点
  appStencil.value.appendChild(stencil.container);

  // 绑定快捷键
  // ctrl+c 复制
  graph.value.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.copy(cells);
    }
    return false;
  });
  // 剪切
  graph.value.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.cut(cells);
    }
    return false;
  });

  // ctrl+v 粘贴
  graph.value.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.value.isClipboardEmpty()) {
      const cells = graph.value.paste({ offset: 32 });
      graph.value.cleanSelection();
      graph.value.select(cells);
    }
    return false;
  });

  // 撤销
  graph.value.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.value.canUndo()) {
      graph.value.undo();
    }
    return false;
  });
  // 前进
  graph.value.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.value.canRedo()) {
      graph.value.redo();
    }
    return false;
  });

  // 全选
  graph.value.bindKey(["meta+a", "ctrl+a"], () => {
    const nodes = graph.value.getNodes();
    if (nodes) {
      graph.value.select(nodes);
    }
  });

  // 删除
  graph.value.bindKey("backspace", () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.removeCells(cells);
    }
  });

  // 放大
  graph.value.bindKey(["ctrl+1", "meta+1"], () => {
    const zoom = graph.value.zoom();
    if (zoom < 1.5) {
      graph.value.zoom(0.1);
    }
  });
  // 缩小
  graph.value.bindKey(["ctrl+2", "meta+2"], () => {
    const zoom = graph.value.zoom();
    if (zoom > 0.5) {
      graph.value.zoom(-0.1);
    }
  });

  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };

  graph.value.on("node:mouseenter", (value: object) => {
    console.log(value);

    const container = document.getElementById("container")!;
    const ports = container.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;

    showPorts(ports, true);
  });

  graph.value.on("node:mouseleave", () => {
    const container = document.getElementById("container")!;
    const ports = container.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;

    showPorts(ports, false);
  });

  // #region 初始化图形
  const ports = {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
    },
    items: [
      {
        group: "top",
      },
      {
        group: "right",
      },
      {
        group: "bottom",
      },
      {
        group: "left",
      },
    ],
  };

  Graph.registerNode(
    "custom-rect",
    {
      inherit: "rect",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-polygon",
    {
      inherit: "polygon",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: {
        ...ports,
        items: [
          {
            group: "top",
          },
          {
            group: "bottom",
          },
        ],
      },
    },
    true
  );

  Graph.registerNode(
    "custom-circle",
    {
      inherit: "circle",
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-image",
    {
      inherit: "rect",
      width: 52,
      height: 52,
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "image",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        body: {
          stroke: "#5F95FF",
          fill: "#5F95FF",
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: "left",
          textVerticalAnchor: "top",
          fontSize: 12,
          fill: "#fff",
        },
      },
      ports: { ...ports },
    },
    true
  );

  const r1 = graph.value.createNode({
    shape: "custom-rect",
    label: "开始",
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  });

  const r2 = graph.value.createNode({
    shape: "custom-rect",
    label: "过程",
  });

  const r3 = graph.value.createNode({
    shape: "custom-rect",
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: "可选过程",
  });

  const r4 = graph.value.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "0,10 10,0 20,10 10,20",
      },
    },
    label: "决策",
  });

  const r5 = graph.value.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "10,0 40,0 30,20 0,20",
      },
    },
    label: "数据",
  });
  const r6 = graph.value.createNode({
    shape: "custom-circle",
    label: "连接",
  });

  stencil.load([r1, r2, r3, r4, r5, r6], "group1");

  const imageShapes = [
    {
      label: "Client",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg",
    },
    {
      label: "Http",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
    },
    {
      label: "Api",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg",
    },
    {
      label: "Sql",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg",
    },
    {
      label: "Clound",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg",
    },
    {
      label: "Mq",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg",
    },
  ];

  const imageNodes = imageShapes.map((item) =>
    graph.value.createNode({
      shape: "custom-image",
      label: item.label,
      attrs: {
        image: {
          "xlink:href": item.image,
        },
      },
    })
  );
  stencil.load(imageNodes, "group2");
});
</script>
<style lang="less">
body,
html,
#app {
  width: 100%;
  height: 100%;
}
.flyfront {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  font-family: sans-serif;

  .app-stencil {
    position: relative;
    width: 200px;
    border: 1px solid #f0f0f0;
    overflow: hidden;
  }

  .app-content {
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
