<template>
  <div class="com-container">
    <div class="com-chart" ref="rankDom"></div>
  </div>
</template>
<script setup>
import { init } from 'echarts';
import { ref, markRaw, onMounted, onBeforeUnmount ,defineExpose} from 'vue';
import { rankPage } from '@/api/rank.js';
import { useClearEventListener } from '@/common/clearEvent';
import { chalk2 } from '../../assets/static/theme/chalk2';
import { registerTheme } from 'echarts';
// 获取数据
const listData = ref([]);

const getData = async () => {
  const { data, status } = await rankPage();
  //   console.log(status);
  //   console.log(data);

  if (status === 200) {
    listData.value = data;
    updataCharts();
  }
};
// 初始化图表
const rankDom = ref(null);
const rankCharts = ref(null);
const initRank = () => {
  registerTheme('chalk2', chalk2);
  rankCharts.value = markRaw(init(rankDom.value, 'chalk2'));
  const initOption = {
    title: {
      text: '▎销售排行表',
      left: 20,
      top: 20,
    },
    grid: {
      top: '40%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      show: true,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
  };

  initOption && rankCharts.value.setOption(initOption);

  getData();
  // screenAdapter();
  setIntervalRank();
  rankCharts.value.on('mouseover', () => {
    clearInterval(timer.value);
  });
  rankCharts.value.on('mouseout', () => {
    setIntervalRank();
  });
};

// 更新图表
let startValue = ref(0);
let endValue = ref(5);

const updataCharts = () => {
  const xData = listData.value.map((item) => item.name);
  const yData = listData.value.map((item) => item.value);
  //   console.log(xData);
  //   console.log(yData);

  const updataOption = {
    xAxis: {
      data: xData,
    },
    dataZoom: {
      show: false,
      startValue: startValue.value,
      endValue: endValue.value,
    },
    series: [
      {
        type: 'bar',
        data: yData,
        itemStyle: {
          color: (arg) => {
            if (arg.value > 300) {
              return {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0ba82c', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#4ff778', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              };
            } else if (arg.value > 200) {
              return {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#2e72bf', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#23e5e5', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              };
            } else {
              return {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#5052ee', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#AB6EE5', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              };
            }
          },
        },
      },
    ],
  };

  updataOption && rankCharts.value.setOption(updataOption);

  screenAdapter();
};

// 分辨率适配
const screenAdapter = () => {
  const fontSize = (rankDom.value.offsetWidth / 100) * 3.6;
  console.log(fontSize);

  let screenOption = {
    title: {
      textStyle: {
        fontSize: fontSize,
      },
    },
    series: [
      {
        barWidth: fontSize,
        itemStyle: {
          borderRadius: [fontSize / 2, fontSize / 2, 0, 0],
        },
      },
    ],
  };

  screenOption && rankCharts.value.setOption(screenOption);
  rankCharts.value.resize();
};

// 监听事件和销毁事件
useClearEventListener(window, 'resize', screenAdapter);

// 定时器
let timer = ref(null);
const setIntervalRank = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  timer.value = setInterval(() => {
    startValue.value++;
    endValue.value++;
    if (endValue.value > listData.value.length) {
      startValue.value = 0;
      endValue.value = 5;
    }
    updataCharts();
  }, 2000);
};

onMounted(() => {
  initRank();
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
defineExpose({
  screenAdapter
})
</script>
<style lang="less"></style>
