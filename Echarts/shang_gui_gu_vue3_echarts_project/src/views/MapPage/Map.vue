<template>
  <div class="com-container">
    <div class="com-chart" ref="mapDom"></div>
  </div>
</template>

<script setup>
import axios, { all } from 'axios';
import { ref, onMounted, markRaw, onBeforeUnmount,defineExpose } from 'vue';
import { init, registerTheme, registerMap } from 'echarts';
import { chalk2 } from '../../assets/static/theme/chalk2';
import { mapPage } from '../../api/map';
import { useClearEventListener } from '@/common/clearEvent';
import { getProvinceMapInfo } from '@/utils/map_utils.js';
// 初始化图表
const mapDom = ref(null);
const mapCharts = ref(null);

const map = () => {
  registerTheme('chalk', chalk2);
  mapCharts.value = markRaw(init(mapDom.value, 'chalk'));
  mapCharts.value = markRaw(init(mapDom.value));
  // http://127.0.0.1:8999/src/assets/static/map/china.json
  axios
    .get('http://127.0.0.1:8999/src/assets/static/map/china.json')
    .then((res) => {
      //   console.log(res);
      registerMap('china', res.data);
      //#2e72bf
      //#333
      const initOption = {
        title: {
          text: '▎商家地图分布',
          left: 20,
          top: 20,
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2e72bf',
            boderColor: '#333',
          },
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical',
        },
      };

      initOption && mapCharts.value.setOption(initOption);

      mapCharts.value.on('click', handleChange);
    });
};

const handleChange = (params) => {
  const mapInfo = getProvinceMapInfo(params.name);
  console.log(mapInfo);

  axios.get('http://127.0.0.1:8999/' + mapInfo.path).then((res) => {
    registerMap(mapInfo.key, res.data);
    const changeOption = {
      geo: {
        map: mapInfo.key,
      },
    };
    changeOption && mapCharts.value.setOption(changeOption);

    mapCharts.value.off('click', handleChange);
  });
};

const removeMap = () => {
  mapCharts.value.getZr().on('dblclick', function (event) {
    // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
    if (!event.target) {
      // 点击在了空白处，做些什么。

      const removeOption = {
        geo: {
          map: 'china',
        },
      };
      removeOption && mapCharts.value.setOption(removeOption);
      mapCharts.value.on('click', handleChange);
    }
  });
};

// 获取数据
const alllData = ref([]);
const getData = () => {
  mapPage().then((res) => {
    console.log(res);
    alllData.value = res.data;

    updataCharts();
  });
};

// 更新图表
const updataCharts = () => {
  //如果想在地图中显示散点的数据，所以我们需要给散点的图表增加一个配置，coordinateSystem
  console.log(alllData.value);
  const legendArr = alllData.value.map((item) => {
    return item.name;
  });
  const seriesArr = alllData.value.map((item) => {
    return {
      type: 'effectScatter',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke',
      },
      name: item.name,
      data: item.children,
      coordinateSystem: 'geo',
    };
  });

  console.log(seriesArr);
  const updataOption = {
    legend: {
      data: legendArr,
    },
    series: seriesArr,
  };

  updataOption && mapCharts.value.setOption(updataOption);
};

// 分辨率适配
const screenAdapter = () => {
  const fontSize = (mapDom.value.offsetWidth / 100) * 3.6;
  const screenOption = {
    title: {
      textStyle: {
        fontSize: fontSize,
      },
    },
    legend: {
      itemWidth: fontSize / 3,
      itemHeight: fontSize / 3,
      itemGap: fontSize / 3,
      textStyle: {
        fontSize: fontSize / 3,
      },
    },
  };

  screenOption && mapCharts.value.setOption(screenOption);
  mapCharts.value.resize();
};

// 监听事件和销毁事件
useClearEventListener(window, 'resize', screenAdapter);

onMounted(() => {
  map();
  getData();
  screenAdapter();
  removeMap();
});

onBeforeUnmount(() => {});
defineExpose({
  screenAdapter
})
</script>

<style lang="less" scoped></style>
