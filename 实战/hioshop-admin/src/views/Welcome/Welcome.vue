<template>
  <div class="content-page">
    <!-- <div class="content-nav">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>后台主页</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="content-main">
      <div class="notice">
        <div class="l">
          本演示后台数据为演示数据，可以随意操作，系统每5分钟重置一次
        </div>
        <div class="r">
          <label>重置倒计时</label>
          <!-- <count-down class="count" endTime="" :callback="callback" endText="已经结束了"></count-down> -->
        </div>
      </div>
      <div class="github">
        <a href="#" class="link">github 地址</a>
        <span class="remark">请您在github给个star.技术交流</span>
      </div>
      <div class="header">
        <div class="red">
          <span class="order-ship-count">3</span>
          <a href="#" class="order-shipp">待发货订单</a>
        </div>
        <div class="green">
          <span class="on-shelf-count">48</span>
          <a href="#" class="on-shelf">上架中的商品</a>
        </div>
        <div class="black">
          <span class="user-count">3</span>
          <a href="#" class="user-name">总用户数</a>
        </div>
      </div>
      <div class="main"></div>
    </div>
  </div>
</template>
<script setup>
// import CountDown from '@/components/CountDown/CountDown.vue';
</script>
<style scoped lang="scss">
.content-page {
  width: 100%;
  height: 100%;
  // background-color: #fff;
}
.content-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  .notice {
    width: 100%;
    height: 60px;
    padding: 30px;
    box-sizing: border-box;
    background: #ffecd5;
    margin-bottom: 20px;
    font-size: 16px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .r {
      display: flex;
      justify-content: space-between;
    }
  }
  .github {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    background-color: #f8f8f8;
    padding-left: 30px;

    .link {
      text-decoration: none;
      margin-right: 20px;
    }
  }

  .header {
    display: flex;
    color: #fff;
    .red {
      flex: 1;
      background-color: #e64242;
    }

    .green {
      flex: 1;
      background-color: #11b95c;
    }

    .black {
      flex: 1;
      background-color: #1f2d3d;
    }
  }
}
</style>
