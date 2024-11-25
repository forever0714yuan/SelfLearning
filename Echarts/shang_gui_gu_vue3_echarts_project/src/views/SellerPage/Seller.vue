<template>
  <div class="com-container">
    <div class="com-chart" ref="sellerDom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw,defineExpose,watch ,computed} from 'vue';
import { sellerPage } from '../../api/seller';
import { init, registerTheme } from 'echarts';
import { chalk2 } from '../../assets/static/theme/chalk2';
import {vintage2} from '../../assets/static/theme/vintage2';
import { useClearEventListener } from '@/common/clearEvent';
import { mapState, useStore } from 'vuex';
const store = useStore();

//初始化图表
const sellerDom = ref(null);
const sellerCharts = ref(null);
const Seller = () => {
  registerTheme('chalk2', chalk2);
  registerTheme('vintage2', vintage2);
  sellerCharts.value = markRaw(init(sellerDom.value, 'chalk2'));
  // console.log(sellerCharts.value);

  // 初始化适配
  let initOption = {
    title: {
      text: '▎商家销售统计',
      textStyle: {
        fontSize: 66,
      },
      left: 20,
      top: 20,
    },
    grid: {
      top: '20%',
      right: '3%',
      bottom: '6%',
      left: '3%',
      containLabel: true, //坐标轴是包含坐标轴的文字
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        z: 2,
        lineStyle: {
          width: 66,
          type: 'solid',
          color: '#2D3433',
        },
      },
    },
    series: [
      {
        type: 'bar',
        barWidth: 66,
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'white',
          },
        },
        itemStyle: {
          borderRadius: [0, 33, 33, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#5052EE', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#AB6EE5', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  };

  initOption && sellerCharts.value.setOption(initOption);

  sellerCharts.value.on('mouseover', function () {
    clearInterval(timer.value);
  });

  sellerCharts.value.on('mouseout', function () {
    setIntervalData();
  });
};

// 获取数据
const data = ref([]);
const dataNames = ref([]);
const dataValues = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);

const getData = () => {
  sellerPage().then((res) => {
    console.log(res);
    data.value = res.data;
    // 数据排序
    data.value = data.value.sort((a, b) => a.value - b.value);

    // 总页面数
    // console.log(data.value.length % 5);
    // console.log(data.value.length % 5);
    totalPage.value =
      data.value.length % 5 === 0
        ? data.value.length / 5
        : data.value.length / 5 + 1;
    updataCharts();
    // 开启定时器
    setIntervalData();
  });
};

// 更新图表
const updataCharts = () => {
  // 分页展示
  const start = (currentPage.value - 1) * 5;
  const end = currentPage.value * 5;
  const currentData = data.value.slice(start, end);

  dataNames.value = currentData.map((item) => item.name);
  dataValues.value = currentData.map((item) => item.value);

  // 数据适配
  let dataOption = {
    yAxis: {
      data: dataNames.value,
    },
    series: [
      {
        data: dataValues.value,
      },
    ],
  };
  sellerCharts.value.setOption(dataOption);
};

// 开启定时器循环播放
const timer = ref(null);
const setIntervalData = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }

  timer.value = setInterval(() => {
    currentPage.value++;

    if (currentPage.value > totalPage.value) {
      currentPage.value = 1;
    }
    updataCharts();
  }, 3000);
};

// 分辨率适配
const screenAdapter = () => {
  const titleFontSize = (sellerDom.value.offsetWidth / 100) * 3.6;

  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          width: titleFontSize,
        },
      },
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          borderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
        },
      },
    ],
  };

  adapterOption && sellerCharts.value.setOption(adapterOption);
  sellerCharts.value.resize();
};
// 监听事件和销毁事件
useClearEventListener(window, 'resize', screenAdapter);

onMounted(() => {
  Seller();
  getData();
  screenAdapter();
  // updataCharts();
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});

defineExpose({
  screenAdapter
})

const theme = computed(()=>store.state.theme)

watch(()=>theme.value,(val)=>{
  // console.log(store.state.theme);
  sellerCharts.value.dispose()
  Seller()
  screenAdapter()
  updataCharts()
})
</script>

<style lang="less" scoped></style>
