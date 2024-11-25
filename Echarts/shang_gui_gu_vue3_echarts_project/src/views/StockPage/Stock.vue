<!-- 库存销量分析 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="stockRefDom"></div>
  </div>
</template>

<script setup>
import SocketService from '@/utils/socket_service.js';
import { mapState, useStore } from 'vuex';
import { ref, markRaw, onMounted, onBeforeUnmount, computed, watch,defineExpose } from 'vue';
import { init, registerTheme } from 'echarts';
import { get } from '../../request';
import { stockPage } from '@/api/stock.js';

const chartInstance = ref(null);
const allData = ref(null);
const currentIndex = ref(0);
const timerId = ref(null);
const stockRefDom = ref(null);
const stockCharts = ref(null);
const store = useStore();
onMounted(() => {
  SocketService.Instance.registerCallBack('stockData', getData);
  initChart();
  // SocketService.Instance.send({
  //   action: 'getData',
  //   socketType: 'stockData',
  //   chartName: 'stock',
  //   value: '',
  // });
  window.addEventListener('resize', screenAdapter);
  screenAdapter();
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', screenAdapter);
  clearInterval(timerId.value);
  SocketService.Instance.unRegisterCallBack('stockData');
});
const theme = ref(store.state.theme);
const initChart = () => {
  console.log(stockRefDom.value);
  stockCharts.value = markRaw(init(stockRefDom.value, theme.value));
  // this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme);
  const initOption = {
    title: {
      text: '▎库存和销量分析',
      left: 20,
      top: 20,
    },
  };

  stockCharts.value.setOption(initOption);
  getData();
  stockCharts.value.on('mouseover', () => {
    clearInterval(timerId.value);
  });
  stockCharts.value.on('mouseout', () => {
    startInterval();
  });
};

const getData = async (ret) => {
  // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
  // const { data: ret } = await this.$http.get('stock')
  // allData.value = ret;
  const { data: res } = await stockPage();
  allData.value = res;
  console.log(allData.value);
  updateChart();
  startInterval();
};
const updateChart = () => {
  const centerArr = [
    ['18%', '40%'],
    ['50%', '40%'],
    ['82%', '40%'],
    ['34%', '75%'],
    ['66%', '75%'],
  ];
  const colorArr = [
    ['#4FF778', '#0BA82C'],
    ['#E5DD45', '#E8B11C'],
    ['#E8821C', '#E55445'],
    ['#5052EE', '#AB6EE5'],
    ['#23E5E5', '#2E72BF'],
  ];
  // 处理图表需要的数据
  const start = currentIndex.value * 5;
  const end = (currentIndex.value + 1) * 5;
  const showData = allData.value.slice(start, end);
  console.log(showData, start, end);
  const seriesArr = showData.map((item, index) => {
    return {
      type: 'pie',
      // radius: [110, 100],
      center: centerArr[index],
      hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
      labelLine: {
        show: false, // 隐藏指示线
      },
      label: {
        show: true,
        position: 'center',
        color: colorArr[index][0],
      },
      data: [
        {
          name: item.name + '\n\n' + item.sales,
          value: item.sales,
          itemStyle: {
            color: {
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorArr[index][0], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: colorArr[index][1], // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: item.name + '\n\n' + item.sales,
          value: item.stock,
          itemStyle: {
            color: '#333843',
          },
        },
      ],
    };
  });
  const dataOption = {
    series: seriesArr,
  };
  stockCharts.value.setOption(dataOption);
};
const screenAdapter = () => {
  const titleFontSize = (stockRefDom.value.offsetWidth / 100) * 3.6;
  const innerRadius = titleFontSize * 2.8;
  const outterRadius = innerRadius * 1.125;
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
    series: [
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2,
        },
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2,
        },
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2,
        },
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2,
        },
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2,
        },
      },
    ],
  };
  stockCharts.value.setOption(adapterOption);
  stockCharts.value.resize();
};

const startInterval = () => {
  if (timerId.value) {
    clearInterval(timerId.value);
  }
  timerId.value = setInterval(() => {
    currentIndex.value++;
    if (currentIndex.value > 1) {
      currentIndex.value = 0;
    }
    updateChart(); // 在更改完currentIndex之后 , 需要更新界面
  }, 5000);
};
watch(theme, (newX) => {
  console.log('主题切换了');
  // chartInstance.value.dispose(); // 销毁当前的图表
  initChart(); // 重新以最新的主题名称初始化图表对象
  screenAdapter(); // 完成屏幕的适配
  updateChart(); // 更新图表的展示
});
defineExpose({
  screenAdapter
})
</script>

<style lang="less" scoped></style>
