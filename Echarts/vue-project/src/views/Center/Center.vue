<template>
  <div class="center">
    <div id="c1">
      <div class="confirme-count">
        <span class="confirme">{{ confirmedCount }}</span>
        <span class="text">累计确诊</span>
      </div>
      <div class="suspected-count">
        <span class="suspected">{{ suspectedIncr }}</span>
        <span class="text">剩余疑似</span>
      </div>
      <div class="cured-count">
        <span class="cured">{{ curedCount }}</span>
        <span class="text">累计治愈</span>
      </div>
      <div class="dead-count">
        <span class="dead">{{ deadCount }}</span>
        <span class="text">累计死亡</span>
      </div>
    </div>
    <div id="c2"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import $ from 'jquery';
// {
//   confirmedCount: 1539; 确诊
//   countryCode: 'CHN';
//   curedCount: 1526; 治愈数量
//   currentConfirmedCount: 7;
//   currentUrl: null;
//   dailyUrl: 'https://file1.dxycdn.com/2020/0223/734/3398299753820971301-135.json'; 详细
//   deadCount: 6; 死亡数量
//   provinceCode: 'AH';
//   provinceName: '安徽';
//   suspectedCount: 2; 无症状感染
// }

// 处理地图数据
const tidyData = (res) => {
  let newData = ref([]);
  let data = {};
  if (res) {
    res.forEach((item) => {
      if (
        item.provinceName === '北京' ||
        item.provinceName === '天津' ||
        item.provinceName === '上海' ||
        item.provinceName === '重庆'
      ) {
        data = Object.assign(data, {
          name: item.provinceName + '市',
        });
      } else if (
        item.provinceName === '内蒙古' ||
        item.provinceName === '西藏'
      ) {
        data = Object.assign(data, {
          name: item.provinceName + '自治区',
        });
      } else if (item.provinceName === '新疆') {
        data = Object.assign(data, {
          name: item.provinceName + '维吾尔自治区',
        });
      } else if (item.provinceName === '宁夏') {
        data = Object.assign(data, {
          name: item.provinceName + '回族自治区',
        });
      } else if (item.provinceName === '广西') {
        data = Object.assign(data, {
          name: item.provinceName + '壮族自治区',
        });
      } else if (item.provinceName === '香港' || item.provinceName === '澳门') {
        data = Object.assign(data, {
          name: item.provinceName + '特别行政区',
        });
      } else {
        data = Object.assign(data, {
          name: item.provinceName + '省',
        });
      }

      data = Object.assign(data, {
        provinceCode: item.provinceCode,
        value: item.confirmedCount,
      });

      newData.value.push(data);

      data = {};
    });
  }
  return newData;
};
// 地图
const center = async () => {
  // 1.初始化DOM
  const myChart = echarts.init(document.querySelector('#c2'));
  // 2.引入中国地图
  const mapList = await $.get(
    'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
  );
  // const mapData = tidyData(mapList.features);
  // console.log(mapList);
  // 3.注册地图
  echarts.registerMap('china', mapList); //地图数据

  // 4.获取疫情数据
  const res = await $.get('http://111.231.75.86:8000/api/provinces/CHN/');
  // console.log(res);

  // 累计确诊
  let confirmedCount = ref(tidyData(res));
  console.log(tidyData(res));

  // console.log(confirmedCount.value);

  const option = {
    series: [
      {
        name: '省份',
        type: 'map',
        // map: 'china',
        geoIndex: 0,
        data: confirmedCount.value,
      },
    ],
    geo: {
      map: 'china', // 需要与注册的名字一样
      // type: 'map',
      zoom: 1.2, // 初始放大比例
      roam: true, //是否缩放和平移
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
        },
        emphasis: {
          //高亮的显示设置
          areaColor: 'skyblue', //鼠标选择区域颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    tooltip: {
      formatter: function (params, callback) {
        console.log(params);
        return params.seriesName + '<br />' + params.name + '：' + params.value;
      },
    },
    visualMap: {
      show: true, //图注
      type: 'piecewise', // 连续的竖线  piecewise 分段的竖线
      min: 1,
      max: 50000,
      bottom: 80, // visualMap 组件离容器上侧的距离。
      left: 10, // visualMap 组件离容器右侧的距离。
      // color: ['red', 'yellow'], //从大到小
      inRange: {
        color: ['#aaa', 'rgb(201, 31, 55)', 'rgb(157, 41, 51)'], // 从小到大
      },
      splitNumber: 6, //竖线分的段数
      pieces: [
        // 具体的标识值
        { gt: 100000 },
        { gt: 50000, lte: 99999 },
        { gt: 10000, lte: 49999 },
        { gt: 5000, lte: 9999 },
        { gt: 1000, lte: 4999 },
        { gt: 300, lte: 999 },
      ],
    },
  };

  // console.log(option);

  option && myChart.setOption(option);
};

// 顶部数据
const currendtInstance = getCurrentInstance();
const { axios } = currendtInstance.appContext.config.globalProperties;
// 累计确诊
const confirmedCount = ref(0);
// 疑似剩余
const suspectedIncr = ref(0);
// 累计治愈
const curedCount = ref(0);
// 累计死亡
const deadCount = ref(0);
const topData = () => {
  axios.get('http://111.231.75.86:8000/api/statistics/latest/').then((res) => {
    // console.log(res);
    if (res.status === 200) {
      confirmedCount.value = res.data.domesticStatistics.confirmedCount;
      suspectedIncr.value = res.data.domesticStatistics.suspectedIncr;
      curedCount.value = res.data.domesticStatistics.curedCount;
      deadCount.value = res.data.domesticStatistics.deadCount;
    }
  });
};

onMounted(() => {
  topData();
  center();
});
</script>
<style lang="less">
.center {
  position: absolute;
  width: 40%;
  height: 100%;
  left: 30%;
  top: 10%;

  #c1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;

    .text {
      color: #fff;
      // color: #000;
    }

    .confirme-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;

      .confirme {
        font-size: 42px;
        padding: 20px 0;
        color: #f31c73;
      }
    }

    .suspected-count {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .suspected {
        font-size: 42px;
        padding: 20px 0;
        color: #ff8d1a;
      }
    }

    .cured-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;

      .cured {
        font-size: 42px;
        padding: 20px 0;
        color: #35c5c8;
      }
    }

    .dead-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;

      .dead {
        font-size: 42px;
        padding: 20px 0;
        color: #a9b9cb;
      }
    }
  }

  #c2 {
    // position: absolute;
    height: 70%;
    width: 100%;
    // left: 0;
    // top: 28%;
  }
}
</style>
