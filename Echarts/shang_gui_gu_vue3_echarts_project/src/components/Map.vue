<template>
    <div class="com-container">
        <div class="com-chart" ref="mapDom"></div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, markRaw, onBeforeUnmount } from 'vue';
import { init, registerTheme, registerMap } from 'echarts';
import { chalk2 } from '../assets/static/theme/chalk2';
import { mapPage } from '../api/map';

// 初始化图表
const mapDom = ref(null);
const mapCharts = ref(null);

const map = () => {
    // registerTheme('chalk', chalk2);
    // mapCharts.value = markRaw(init(mapDom.value, 'chalk'))
    mapCharts.value = markRaw(init(mapDom.value))
    // http://127.0.0.1:8999/src/assets/static/map/china.json
    axios
        .get('http://127.0.0.1:8999/src/assets/static/map/china.json')
        .then(res => {
            console.log(res);
            registerMap('china', res.data)

            const initOption = {
                geo: {
                    type: 'map',
                    map: 'china'
                },
            };

            initOption && mapCharts.value.setOption(initOption)
        })


}

// 获取数据
const getData = () => {
    mapPage().then(res => {
        console.log(res);
    })
    updataCharts()
}

// 更新图表
const updataCharts = () => {
    const updataOption = {};

    updataOption && mapCharts.value.setOption(updataOption);
}

// 分辨率适配
const screenAdapter = () => {
    const screenOption = {};

    screenOption && mapCharts.value.setOption(screenOption)
}


onMounted(() => {
    map();
    getData();
    screenAdapter()
})

onBeforeUnmount(() => {

})

</script>

<style lang="less" scoped>

</style>