<template>
  <div id="header">
    <div id="data">
      <a href="#">于金元</a> | <a href="#">疫苗接种情况监控</a><br />
      <a href="#">世界疫情实时追踪</a> |
      <a href="#">中国疫情追踪</a>
    </div>
    <div id="tit">全国疫情实时追踪</div>
    <div id="time">{{ time }}</div>
  </div>
  <left></left>
  <Center></Center>
  <Right></Right>
  <div id="footer"></div>
</template>
<script setup>
import { ref } from 'vue';
import Left from '../Left/Left.vue';
import Center from '../Center/Center.vue';
import Right from '@/views/Right/Right.vue';

// 获取当前时间
const time = ref('');
const timer = ref(null);
const getNowTime = () => {
  const date = new Date();

  const year = date.getFullYear();//获取年份
  const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
  const hour = date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours();
  const minute = date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes();
  const second = date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds();

  time.value = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
};

clearInterval(timer);
setInterval(() => {
  getNowTime()
}, 0);

</script>
<style scoped lang="less">
#header {
  position: relative;
  height: 10%;
  width: 100%;
  background: url(../../assets/header.png) 0 0 / 100% 100% no-repeat;

  #time {
    position: absolute;
    top: 50%;
    right: 5%;
  }
}

#data {
  position: absolute;
  height: 10%;
  left: 2%;
  top: 50%;
  color: #fff;
  font-family: serif;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #f09694;
  }
}

#tit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 34%;
  top: 2%;
  width: 30%;
  font-family: serif;
  font-size: 26px;
  color: #fff;
}

#footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2%;
  background: url(../../assets/footer.png) 0 0 / 100% 100% no-repeat;
}
</style>
