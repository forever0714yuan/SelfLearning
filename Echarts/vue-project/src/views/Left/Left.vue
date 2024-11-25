<template>
  <div class="left">
    <div id="l1"></div>
    <div id="l2"></div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import $ from 'jquery';

// 疫情实时图
const realTime = () => {
  const myDom = document.querySelector('#l1');
  const myChart = echarts.init(myDom);

  // {
  //   confirmedCount: 217,  确诊数量
  //   confirmedIncr: 217, 确诊增加
  //   curedCount: 25, // 治愈的数量
  //   curedIncr: 25, //
  //   currentConfirmedCount: 188, 今日确证
  //   currentConfirmedIncr: 188, 今日增加
  //   dateId: 20200119, //日期
  //   deadCount: 4, // 死亡数量
  //   deadIncr: 4, //死亡增加量
  //   suspectedCount: 0, 无症状
  //   suspectedCountIncr: 0, 无症状增加
  //   countryCode: "CHN", 代码
  //   countryName: "中国" 国家
  // }

  $.get('http://111.231.75.86:8000/api/countries/CHN/daily/', function (res) {
    // console.log(res);
    const xData = [];
    const confirmedCount = [];
    const curedCount = [];
    const currentConfirmedCount = [];
    const deadCount = [];
    const suspectedCount = [];

    res.forEach((item) => {
      xData.push(item.dateId);
      confirmedCount.push(item.currentConfirmedCount);
      curedCount.push(item.curedCount);
      currentConfirmedCount.push(item.currentConfirmedCount);
      deadCount.push(item.deadCount);
      suspectedCount.push(item.suspectedCount);
    });

    const option = {
      title: {
        text: '疫情实时图',
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      legend: {
        data: ['确诊数量', '治愈数量', '今日确诊', '死亡数量', '无症状'],
        left: 'center',
        orient: 'horizontal', //vertical 竖直
      },
      tooltip: {
        trigger: 'axis', //在什么类型的图中触发
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
            formatter: function (params) {
              if (params.axisDimension === 'x') {
                let value = params.value;
                const date = `${value.substr(0, 4)}-${value.substr(
                  4,
                  2,
                )}-${value.substr(6, 2)}`;

                return `${date}\n`;
              }
            },
          },
        }, //坐标轴指示器配置项。
      },
      series: [
        {
          data: confirmedCount,
          name: '确诊数量',
          type: 'line',
        },
        {
          data: curedCount,
          name: '治愈数量',
          type: 'line',
        },
        {
          data: currentConfirmedCount,
          name: '今日确诊',
          type: 'line',
        },
        {
          data: deadCount,
          name: '死亡数量',
          type: 'line',
        },
        {
          data: suspectedCount,
          name: '无症状',
          type: 'line',
        },
      ],
    };

    option && myChart.setOption(option);
  });
};

// 累计数据
// http://111.231.75.86:8000/api/statistics/
// {
//   "confirmedCount": 84341, 确诊
//   "curedCount": 78558, 治愈数量
//   "deadCount": 4643, 死亡数量
//   "seriousCount": 974, 严重的数量
//   "currentConfirmedCount": 1140, 确诊数量
//   "suspectedCount": 1636 疑似
// }
const addUp = () => {
  const myDom = document.querySelector('#l2');
  const myChart = echarts.init(myDom);
  $.get('http://111.231.75.86:8000/api/statistics/', function (res) {
    // console.log(res);
    const confirmedCount = [];
    const curedCount = [];
    const deadCount = [];
    const seriousCount = [];
    const currentConfirmedCount = [];
    const suspectedCount = [];
    const xData = [];
    res.forEach((item) => {
      confirmedCount.push(item.domesticStatistics.confirmedCount);
      curedCount.push(item.domesticStatistics.curedCount);
      deadCount.push(item.domesticStatistics.deadCount);
      seriousCount.push(item.domesticStatistics.seriousCount);
      currentConfirmedCount.push(item.domesticStatistics.currentConfirmedCount);
      suspectedCount.push(item.domesticStatistics.suspectedCount);
      xData.push(item.createTime);
    });

    const option = {
      title: {
        text: '累计',
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      legend: {
        data: [
          '累计确诊',
          '累计治愈',
          '累计死亡',
          '严重数量',
          '疑似',
          '当前确诊',
        ],
        left: 'center',
        orient: 'horizontal', //vertical 竖直
      },
      tooltip: {
        trigger: 'axis', //在什么类型的图中触发
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
            formatter: function (params) {
              if (params.axisDimension === 'x') {
                let value = params.value;
                const date = `${value.substr(0, 4)}-${value.substr(
                  4,
                  2,
                )}-${value.substr(6, 2)}`;

                return `${date}\n`;
              }
            },
          },
        }, //坐标轴指示器配置项。
      },
      series: [
        {
          data: confirmedCount,
          name: '累计确诊',
          type: 'line',
        },
        {
          data: curedCount,
          name: '累计治愈',
          type: 'line',
        },
        {
          data: currentConfirmedCount,
          name: '当前确诊',
          type: 'line',
        },
        {
          name: '严重数量',
          data: seriousCount,
          type: 'line',
        },
        {
          data: deadCount,
          name: '累计死亡',
          type: 'line',
        },
        {
          data: suspectedCount,
          name: '疑似',
          type: 'line',
        },
      ],
    };
    option && myChart.setOption(option);
  });
};

onMounted(() => {
  realTime();
  addUp();
});
</script>
<style lang="less" scoped>
.left {
  position: absolute;
  width: 32%;
  height: 90vh;

  #l1 {
    position: absolute;
    width: 100%;
    height: 45%;
    left: 0;
    top: 2%;
  }

  #l2 {
    position: absolute;
    width: 100%;
    height: 45%;
    left: 0;
    top: 50%;
  }
}
</style>
