<template>
  <div class="com-container">
    <div class="com-title" :style="fontSize">
      <div class="title">
        <span class="title-text">▎{{ titleShow }}</span>
        <span
          class="iconfont select-icon"
          @click="chiceType = !chiceType"
          :style="fontSize"
          >&#xe6eb;</span
        >
      </div>
      <div class="select" v-show="chiceType" :style="marginLeft">
        <div
          class="select-item"
          v-for="type in typeData"
          :key="type.key"
          @click="handleSelect(type.key)"
        >
          {{ type.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trendDom"></div>
  </div>
</template>

<script setup>
import { ref, markRaw, onMounted, onBeforeUnmount, computed ,defineExpose} from 'vue';
import { init, registerTheme } from 'echarts';
import { trendPageAPI } from '../../api/trend';
import { chalk2 } from '../../assets/static/theme/chalk2';
import SocketService from '@/utils/socket_service.js';
import { useClearEventListener } from '../../common/clearEvent';

// 下拉
const chiceType = ref(false);
const choiceKey = ref('map');
const handleSelect = (key) => {
  choiceKey.value = key;
  chiceType.value = false;
  // console.log(allData.value[choiceKey.value].title);
  // console.log(titleShow.value);
  updataCharts();
};

// 初始化图表
const trendDom = ref(null);
const trendCharts = ref(null);

const trendInit = () => {
  registerTheme('chalk', chalk2);
  trendCharts.value = markRaw(init(trendDom.value, 'chalk'));

  const initOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '3%',
      top: '34%',
      right: '4%',
      bottom: '2%',
      containLabel: true,
    },
    legend: {
      left: 20,
      top: '15%',
      icon: 'circle',
    },
    tooltip: {
      trigger: 'axis',
    },
  };

  initOption && trendCharts.value.setOption(initOption);
};

// 获取数据
const allData = ref({});
const xData = ref([]);
const yData = ref([]);
const titleShow = ref("")
const getData = (ret) => {
  console.log(ret);

  allData.value = ret;
  xData.value = ret.common.month;
  titleShow.value = 
  allData.value[choiceKey.value]?.title;
  updataCharts();
  // trendPageAPI().then((res) => {
  //   allData.value = res.data;
  //   // console.log(allData.value[choiceKey.value].title);
  //   xData.value = res.data.common.month;
  //   updataCharts();
  // });
};

// 更新图表
const legendData = ref([]);
const updataCharts = () => {
  // 半透明的颜色值
  const colorArr1 = [
    'rgba(11,168,44,0.5)',
    'rgba(44,110,255, 0.5)',
    'rgba(22,242,217,0.5)',
    'rgba(254,33,30,0.5)',
    'rgba(250,105,0,0.5)',
  ];
  //全透明的颜色值
  const colorArr2 = [
    'rgba(11,168,44,0)',
    'rgba(44,110,255,0)',
    'rgba(22,242,217,0)',
    'rgba(254,33,30,0)',
    'rgba(250,105,0,0)',
  ];

  yData.value = allData.value[choiceKey.value].data?.map((item, index) => {
    return {
      name: item.name,
      type: 'line',
      data: item.data,
      stack: 'map',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: colorArr1[index], // 0% 处的颜色
            },
            {
              offset: 1,
              color: colorArr2[index], // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    };
  });

  legendData.value = allData.value[choiceKey.value].data?.map(
    (item) => item.name,
  );

  const updataOption = {
    xAxis: {
      data: xData.value,
    },
    series: yData.value,
    legend: {
      data: legendData.value,
    },
  };

  updataOption && trendCharts.value.setOption(updataOption);
};

// 分辨率适配
const offsetWidth = ref(0);
const screenAdapter = () => {
  offsetWidth.value = trendDom.value.offsetWidth;
  // console.log(offsetWidth.value);

  const adapterOption = {
    legend: {
      itemWidth: (offsetWidth.value / 100) * 3.6,
      itemHeight: (offsetWidth.value / 100) * 3.6,
      textStyle: {
        fontSize: offsetWidth.value / 100 * 3.6 /2,
      },
    },
  };

  adapterOption && trendCharts.value.setOption(adapterOption);
  trendCharts.value.resize();
};


// 计算属性
const typeData = computed(() => {
  return allData.value.type?.filter((item) => item.key !== choiceKey.value);
});

const fontSize = computed(() => {
  return {
    fontSize: (offsetWidth.value / 100) * 3.6 + 'px',
  };
});

const marginLeft = computed(() => {
  return {
    marginLeft: (offsetWidth.value / 100) * 3.6 - 20 + 'px',
  };
});

// 监听和销毁事件
useClearEventListener(window, 'resize', screenAdapter);

onMounted(() => {
  trendInit();
  // getData();
  SocketService.Instance.send({
    action: 'getData',
    socketType: 'trendData',
    chartName: 'trend',
    value: '',
  });
  SocketService.Instance.registerCallBack('trendData', getData);
  screenAdapter();
});
onBeforeUnmount(() => {
  SocketService.Instance.unRegisterCallBack('trendData');
});
defineExpose({
  screenAdapter
})

</script>

<style lang="less" scoped>
.com-title {
  position: absolute;
  color: aliceblue;
  left: 20px;
  top: 20px;
  z-index: 10;

  .title {
    .title-text {
      // font-size: 66px;
    }

    .select-icon {
      cursor: pointer;
      // font-size: 66px;
    }
  }

  .select {
    background-color: #222733;

    .select-item {
      cursor: pointer;
      // font-size: 66px;
      // margin-left: 40px;
    }
  }
}
</style>
