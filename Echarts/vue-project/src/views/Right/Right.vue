<template>
  <div class="right">
    <div id="r1"></div>
    <div id="r2">2222</div>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';

import * as echarts from 'echarts';
const currentInstance = getCurrentInstance();
const { axios } = currentInstance.appContext.config.globalProperties;

const histogram = () => {
  axios
    .get(
      'http://111.231.75.86:8000/api/provinces/CHN/?provinceNames=%E5%9B%9B%E5%B7%9D,%E9%87%8D%E5%BA%86,%E4%BA%91%E5%8D%97,%E8%B4%B5%E5%B7%9E,%E6%96%B0%E7%96%86',
    )
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        let dataValue = ref([]);
        let histogramData = res.data;
        console.log(histogramData);

        histogramData.forEach((item) => {
          dataValue.value.push(Number(item.confirmedCount));
        });

        console.log(dataValue.value);

        let chartDom = document.getElementById('r1');
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          xAxis: {
            type: 'category',
            data: ['重庆', '贵州', '四川', '云南', '新疆'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: dataValue.value,
              type: 'bar',
            },
          ],
          tooltip: {},
        };

        option && myChart.setOption(option);
      }
    });
};

onMounted(() => {
  histogram();
});
</script>

<style lang="less" scoped>
.right {
  position: absolute;
  right: 0;
  top: 10%;
  width: 28%;
  height: 100%;

  #r1 {
    width: 100%;
    height: 50%;
  }
}
</style>
