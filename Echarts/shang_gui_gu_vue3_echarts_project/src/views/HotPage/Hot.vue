<template>
  <div class="com-container">
    <div class="com-chart" ref="hotDom"></div>
    <span
      class="iconfont arr-left"
      @click="hanleLeft"
      :style="{ fontSize: fontSize + 'px' }"
      >&#xe6ef;</span
    >
    <span
      class="iconfont arr-right"
      @click="handleRight"
      :style="{ fontSize: fontSize + 'px' }"
      >&#xe6ed;</span
    >
    <span class="title" :style="{ fontSize: fontSize + 'px' }">{{ name }}</span>
  </div>
</template>
<script setup>
import { init, registerTheme } from 'echarts';
import { markRaw, onMounted, ref,defineExpose } from 'vue';
import { chalk2 } from '../../assets/static/theme/chalk2';
import { useClearEventListener } from '@/common/clearEvent';
import { hotPage } from '@/api/hot.js';

// 获取数据
const allData = ref([]);
const getData = async () => {
  const { status, data } = await hotPage();
  console.log(data);
  if (status === 200) {
    allData.value = data;
    updataCharts();
    screenAdapter();
  }
};

const hotDom = ref(null);
const hotCharts = ref(null);

// 初始化图表
const initChart = () => {
  registerTheme('chalk2', chalk2);
  hotCharts.value = markRaw(init(hotDom.value, 'chalk2'));
  const initOption = {
    title: {
      text: '▎热销商品占比',
      left: 20,
      top: 20,
    },
    legend: {
      top: '10%',
      icon: 'circle',
      itemHeight: 20,
      itemWidth: 20,
      textStyle: {
        fontSize: 20,
      },
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        const threeData = params.data.children;

        let str = '';
        threeData.forEach((item) => {
          str += `
                ${item.name} ${parseInt(
            (threeData[0].value / params.value) * 100,
          )}%<br>
            `;
        });
        return str;
      },
    },
    series: [
      {
        type: 'pie',
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
          },
          labelLine: {
            show: false,
          },
        },
      },
    ],
  };
  initOption && hotCharts.value.setOption(initOption);
  getData();
};
// 更新图表
const name = ref('');

const updataCharts = () => {
  const pieData = allData.value[currentIndex.value].children.map((item) => {
    return {
      name: item.name,
      value: item.value,
      children: item.children,
    };
  });
  const legendData = allData.value[currentIndex.value].children.map(
    (item) => item.name,
  );
  name.value = allData.value[currentIndex.value].name
    ? allData.value[currentIndex.value].name
    : '';
  const updataOption = {
    legend: {
      data: legendData,
    },
    series: [
      {
        data: pieData,
      },
    ],
  };
  updataOption && hotCharts.value.setOption(updataOption);
};

// 分辨率适配
const fontSize = ref(0);
const screenAdapter = () => {
  fontSize.value = (hotDom.value.offsetWidth / 100) * 3.6;
  const screenOption = {
    title: {
      textStyle: {
        fontSize: fontSize.value,
      },
    },
    series: [
      {
        radius: fontSize.value * 4.5,
        center: ['50%', '50%'],
      },
    ],
    legend: {
      itemWidth: fontSize.value ,
      itemHeight: fontSize.value ,
      itemGap: fontSize.value / 2,
      textStyle: {
        fontSize: fontSize.value / 2,
      },
    },
  };
  screenOption && hotCharts.value.setOption(screenOption);
  hotCharts.value.resize();
};

// 监听事件
useClearEventListener(window, 'resize', screenAdapter);

const currentIndex = ref(0);
const hanleLeft = () => {
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = allData.value.length - 1;
  }
  updataCharts();
};

const handleRight = () => {
  currentIndex.value++;
  if (currentIndex.value >= allData.value.length) {
    currentIndex.value = 0;
  }
  updataCharts();
};

onMounted(() => {
  initChart();
});
defineExpose({
  screenAdapter
})
</script>
<style lang="less">
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  color: aliceblue;
  cursor: pointer;
  font-size: 50px;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  color: aliceblue;
  cursor: pointer;
  font-size: 50px;
}
.title {
  position: absolute;
  left: 80%;
  bottom: 50px;
  font-size: 50px;
  color: aliceblue;
}
</style>
