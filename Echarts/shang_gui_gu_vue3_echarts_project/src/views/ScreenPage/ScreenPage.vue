<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="" />
      </div>
      <span class="logo">
        <img :src="logoSrc" alt="" />
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <!-- <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" /> -->
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.trend ? 'fullscreen' : '']"
        >
          <!-- 销量趋势图表 -->
          <Trend ref="trend"></Trend>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('trend')"
              :class="[
                'iconfont',
                fullScreenStatus.trend
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.seller ? 'fullscreen' : '']"
        >
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('seller')"
              :class="[
                'iconfont',
                fullScreenStatus.seller
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div
          id="middle-top"
          :class="[fullScreenStatus.map ? 'fullscreen' : '']"
        >
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('map')"
              :class="[
                'iconfont',
                fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="middle-bottom"
          :class="[fullScreenStatus.rank ? 'fullscreen' : '']"
        >
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('rank')"
              :class="[
                'iconfont',
                fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('hot')"
              :class="[
                'iconfont',
                fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.stock ? 'fullscreen' : '']"
        >
          <!-- 库存销量分析图表 -->
          <Stock ref="stock" ></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('stock')"
              :class="[
                'iconfont',
                fullScreenStatus.stock
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Hot from '@/views/HotPage/Hot.vue';
import Map from '@/views/MapPage/Map.vue';
import Rank from '@/views/RankPage/Rank.vue';
import Seller from '@/views/SellerPage/Seller.vue';
import Stock from '@/views/StockPage/Stock.vue';
import Trend from '@/views/TrendPage/Trend.vue';
import { mapState, useStore } from 'vuex';
import { getThemeValue } from '@/utils/theme_utils.js';
import SocketService from '@/utils/socket_service.js';
import {
  ref,
  markRaw,
  onMounted,
  onBeforeUnmount,
  computed,
  getCurrentInstance,
nextTick,
} from 'vue';
import { useRouter } from 'vue-router';
const store = useStore();
const fullScreenStatus = ref({
  trend: false,
  seller: false,
  map: false,
  rank: false,
  hot: false,
  stock: false,
});
const router = useRouter();
onMounted(() => {
  SocketService.Instance.registerCallBack('fullScreen', recvData);
  SocketService.Instance.registerCallBack('themeChange', recvThemeChange);
});

onBeforeUnmount(() => {
  SocketService.Instance.unRegisterCallBack('fullScreen', recvData);
  SocketService.Instance.unRegisterCallBack('themeChange', recvThemeChange);
});

const stock = ref()
const hot = ref()
const rank = ref()
const map = ref()
const seller = ref()
const trend = ref()

const changeSize = (chartName) => {
  // 将数据发送给服务端
  const targetValue = !fullScreenStatus.value[chartName];
  fullScreenStatus.value[chartName] = !fullScreenStatus.value[chartName]
  
  SocketService.Instance.send({
    action: 'fullScreen',
    socketType: 'fullScreen',
    chartName: chartName,
    value: targetValue,
  });
  // console.log(instance.ctx.$refs[chartName].screenAdapter);
  
  nextTick(()=>{
    instance.ctx.$refs[chartName].screenAdapter();
  })

};

const instance = getCurrentInstance();

const recvData = (data) => {
  console.log(data);
  // 取出是哪一个图表需要进行切换
  const chartName = data.chartName;
  // 取出, 切换成什么状态
  const targetValue = data.value;

  fullScreenStatus.value[chartName] = targetValue;
  instance.proxy.$nextTick(() => {
    instance.proxy.$refs[chartName].screenAdapter();
  });
};

const handleChangeTheme = () => {
  // SocketService.Instance.send({
  //   action: 'themeChange',
  //   socketType: 'themeChange',
  //   chartName: '',
  //   value: '',
  // });
  store.commit('changeTheme');
};
const recvThemeChange = () => {
  store.commit('changeTheme');
};
const theme = ref(store.state.theme);
const logoSrc = computed(() => {
  return '/static/img/' + getThemeValue(theme.value).logoSrc;
});
const headerSrc = computed(() => {
  return '/static/img/' + getThemeValue(theme.value).headerBorderSrc;
});
const themeSrc = computed(() => {
  return '/static/img/' + getThemeValue(theme.value).themeSrc;
});
const containerStyle = computed(() => {
  return {
    backgroundColor: getThemeValue(theme.value).backgroundColor,
    color: getThemeValue(theme.value).titleColor,
  };
});

</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
