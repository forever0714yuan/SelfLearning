<template>
  <div class="interlayer">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Graph, NumberExt } from "@antv/x6";

export default defineComponent({
  setup() {
    Graph.registerEdge("double-edge", {
      inherit: "edge",
      markup: [
        {
          tagName: "path",
          selector: "outline",
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
          strokeWidth: 4,
          strokeLinejoin: "round",
          targetMarker: {
            tagName: "path",
            stroke: "#000000",
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
    // 带边框的图片
    Graph.registerNode(
      "image-bordered",
      {
        inherit: "rect", // 继承于 rect 节点
        width: 98,
        height: 28,
        markup: [
          {
            tagName: "rect", // 标签名称
            selector: "body", // 选择器
          },
          {
            tagName: "image",
            selector: "img",
          },
        ],
        attrs: {
          body: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
            fill: "#fff",
            rx: 6,
            ry: 6,
          },
          img: {
            "xlink:href":
              "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
            width: 98,
            height: 28,
            x: 0,
            y: 0,
          },
        },
      },
      true
    );
    // 内嵌图片
    Graph.registerNode(
      "image-embedded",
      {
        inherit: "rect", // 继承于 rect 节点
        width: 100,
        height: 40,
        markup: [
          {
            tagName: "rect", // 标签名称
            selector: "body", // 选择器
          },
          {
            tagName: "image",
            selector: "img",
          },
        ],
        attrs: {
          body: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
            fill: "#fff",
            rx: 6,
            ry: 6,
          },
          img: {
            "xlink:href":
              "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
            width: 53,
            height: 16,
            x: 10,
            y: 10,
          },
        },
      },
      true
    );
    // 内嵌图片到椭圆
    Graph.registerNode(
      "image-inscribed",
      {
        inherit: "ellipse", // 继承于 rect 节点
        width: 100,
        height: 40,
        markup: [
          {
            tagName: "ellipse", // 标签名称
            selector: "body", // 选择器
          },
          {
            tagName: "image",
            selector: "img",
          },
        ],
        attrs: {
          body: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
            fill: "#fff",
            rx: 6,
            ry: 6,
          },
          img: {
            "xlink:href":
              "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
            width: 53,
            height: 16,
            x: 10,
            y: 10,
          },
        },
      },
      true
    );

    // 圆柱
    Graph.registerNode("cylinder", {
      markup: [
        {
          tagName: "path",
          selector: "body",
        },
        {
          tagName: "ellipse",
          selector: "top",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        body: {
          fill: "#ffffff",
          stroke: "#333333",
          strokeWidth: 2,
          lateral: 10,
        },
        top: {
          fill: "#ffffff",
          stroke: "#333333",
          strokeWidth: 2,
          refCx: "50%",
          refRx: "50%",
          cy: 10,
          ry: 10,
        },
      },
      attrHooks: {
        lateral: {
          set(t: number | string, { refBBox }) {
            const isPercentage = NumberExt.isPercentage(t);
            if (isPercentage) {
              // eslint-disable-next-line
              t = parseFloat(t as string) / 100;
            }

            const x = refBBox.x;
            const y = refBBox.y;
            const w = refBBox.width;
            const h = refBBox.height;

            // curve control point variables
            const rx = w / 2;
            const ry = isPercentage ? h * (t as number) : (t as number);

            const kappa = 0.551784;
            const cx = kappa * rx;
            const cy = kappa * ry;

            // shape variables
            const xLeft = x;
            const xCenter = x + w / 2;
            const xRight = x + w;

            const ySideTop = y + ry;
            const yCurveTop = ySideTop - ry;
            const ySideBottom = y + h - ry;
            const yCurveBottom = y + h;

            // return calculated shape
            const data = [
              "M",
              xLeft,
              ySideTop,
              "L",
              xLeft,
              ySideBottom,
              "C",
              x,
              ySideBottom + cy,
              xCenter - cx,
              yCurveBottom,
              xCenter,
              yCurveBottom,
              "C",
              xCenter + cx,
              yCurveBottom,
              xRight,
              ySideBottom + cy,
              xRight,
              ySideBottom,
              "L",
              xRight,
              ySideTop,
              "C",
              xRight,
              ySideTop - cy,
              xCenter + cx,
              yCurveTop,
              xCenter,
              yCurveTop,
              "C",
              xCenter - cx,
              yCurveTop,
              xLeft,
              ySideTop - cy,
              xLeft,
              ySideTop,
              "Z",
            ];

            return { d: data.join(" ") };
          },
        },
      },
    });

    // 1.准备数据
    const data = {
      // 节点
      nodes: [
        {
          id: "node1", //节点的唯一标识
          x: 200, // 节点位置的x值
          y: 300,
          shape: "rect",
          width: 80,
          height: 40,
          label: "矩形",
        },
        {
          id: "node2",
          shape: "circle",
          x: 400,
          y: 300,
          width: 80,
          height: 40,
          label: "圆形",
        },
        {
          id: "node3",
          shape: "ellipse",
          x: 600,
          y: 300,
          width: 80,
          height: 40,
          label: "椭圆",
        },
        // 多边形
        {
          id: "node4",
          shape: "polygon",
          x: 800,
          y: 300,
          width: 80,
          height: 40,
          label: "菱形",
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
              refPoints: "0,10 10,0 20,10 10,20",
            },
          },
        },
        // 折线
        {
          id: "node5",
          shape: "polyline",
          x: 1000,
          y: 300,
          width: 80,
          height: 40,
          label: "折线",
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
              refPoints: "0,0 0,10 10,10 10,0",
            },
          },
        },

        // 路径
        {
          id: "node6",
          shape: "path",
          x: 1200,
          y: 300,
          width: 80,
          height: 40,
          label: "路径",
          path: "M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z",
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
            },
          },
        },
        // 图片
        {
          id: "node7",
          shape: "image",
          x: 1400,
          y: 300,
          width: 80,
          height: 40,
          imageUrl:
            "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
        },
        // 带边框的图片
        {
          id: "node8",
          shape: "image-bordered",
          x: 1400,
          y: 500,
          width: 80,
          height: 40,
        },
        // 内嵌入矩形的图片
        {
          id: "node9",
          shape: "image-embedded",
          x: 1200,
          y: 500,
          width: 80,
          height: 40,
        },
        // 内嵌入椭圆的图片
        {
          id: "node10",
          shape: "image-inscribed",
          x: 1000,
          y: 500,
          width: 80,
          height: 40,
        },
        // 文本节点
        {
          id: "node11",
          shape: "text-block",
          text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          width: 360,
          height: 120,
          x: 500,
          y: 460,
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
              rx: 4,
              ry: 4,
            },
          },
        },
        // 圆柱
        {
          id: "node12",
          shape: "cylinder",
          width: 80,
          height: 120,
          x: 200,
          y: 460,
          label: "圆柱",
          attrs: {
            top: {
              fill: "#efdbff",
              fillOpacity: 0.5,
            },
            body: {
              fill: "#efdbff",
              fillOpacity: 0.8,
            },
          },
        },
      ],
      // 边
      edges: [
        {
          source: "node1", // 起始节点
          target: "node2", // 目标节点
          shape: "edge",
        },
        {
          source: "node2",
          target: "node3",
          shape: "shadow-edge",
        },
        {
          source: "node3",
          target: "node4",
          shape: "edge",
        },
        {
          source: "node4",
          target: "node5",
          shape: "double-edge",
        },
        {
          source: "node5",
          target: "node6",
          shape: "double-edge",
        },
        {
          source: "node6",
          target: "node7",
        },
        {
          source: "node7",
          target: "node8",
        },
        {
          source: "node8",
          target: "node9",
        },
        {
          source: "node9",
          target: "node10",
        },
        {
          source: "node10",
          target: "node11",
        },
        {
          source: "node11",
          target: "node12",
        },
      ],
    };

    let graph: Graph;

    onMounted(() => {
      // 2.定义画布
      graph = new Graph({
        container: document.querySelector("#container") as HTMLElement,
        width: 1600,
        height: 800,
        background: {
          color: "#fffbe6",
        },
        grid: {
          size: 10,
          visible: true,
        },
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
