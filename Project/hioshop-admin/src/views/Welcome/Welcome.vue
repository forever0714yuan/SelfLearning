<template>
  <div class="content-page">
    <div class="content-main">
      <div class="notice">
        <div class="l">
          本演示后台数据为演示数据，可以随意操作，系统每5分钟重置一次
        </div>
        <!-- <div class="r">
          <label>重置倒计时</label>
        </div> -->
      </div>
      <div class="github">
        <a href="#" class="link">github 地址</a>
        <span class="remark">请您在github给个star.技术交流</span>
      </div>
      <div class="header">
        <div class="red common">
          <span class="order-ship-count text-number">
            {{ allData.orderToDelivery }}
          </span>
          <a href="#" class="order-shipp text-des">待发货订单</a>
        </div>
        <div class="green common">
          <span class="on-shelf-count text-number">
            {{ allData.goodsOnsale }}
          </span>
          <a href="#" class="on-shelf text-des">上架中的商品</a>
        </div>
        <div class="black common">
          <span class="user-count text-number">
            {{ allData.user }}
          </span>
          <a href="#" class="user-name text-des">总用户数</a>
        </div>
      </div>
      <div class="main">
        <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="今天" name="today">
            <div class="today-card">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>顾客</span>
                    <el-button
                      class="button"
                      type="primary"
                      @click="handleCustomer"
                      >查看</el-button
                    >
                  </div>
                </template>
                <div class="text item">
                  <span>新增</span>
                  <span class="count">{{ mainData.newUser }}</span>
                </div>
                <div class="text item">
                  <span>老顾客</span>
                  <span class="count">{{ mainData.oldUser }}</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>下单</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>加入购物车</span>
                  <span class="count">{{ mainData.addCart }}</span>
                </div>
                <div class="text item">
                  <span>提交订单数/金额</span>
                  <span class="count"
                    >{{ mainData.addOrderNum }}/{{ mainData.addOrderSum }}</span
                  >
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>支付</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>成交订单数</span>
                  <span class="count">{{ mainData.payOrderNum }}</span>
                </div>
                <div class="text item">
                  <span>成交金额</span>
                  <span class="count">{{ mainData.payOrderSum }}</span>
                </div>
              </el-card>
            </div>
            <el-divider />
            <div class="today-bottom">
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>客单价</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>成交金额/成交订单数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>下单转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>下单人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>下单-支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/下单人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="昨天" name="yesterday">
            <div class="today-card">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>顾客</span>
                    <el-button
                      class="button"
                      type="primary"
                      @click="handleCustomer"
                      >查看</el-button
                    >
                  </div>
                </template>
                <div class="text item">
                  <span>新增</span>
                  <span class="count">{{ mainData.newUser }}</span>
                </div>
                <div class="text item">
                  <span>老顾客</span>
                  <span class="count">{{ mainData.oldUser }}</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>下单</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>加入购物车</span>
                  <span class="count">{{ mainData.addCart }}</span>
                </div>
                <div class="text item">
                  <span>提交订单数/金额</span>
                  <span class="count"
                    >{{ mainData.addOrderNum }}/{{ mainData.addOrderSum }}</span
                  >
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>支付</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>成交订单数</span>
                  <span class="count">{{ mainData.payOrderNum }}</span>
                </div>
                <div class="text item">
                  <span>成交金额</span>
                  <span class="count">{{ mainData.payOrderSum }}</span>
                </div>
              </el-card>
            </div>
            <el-divider />
            <div class="today-bottom">
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>客单价</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>成交金额/成交订单数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>下单转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>下单人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>下单-支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/下单人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="前7天" name="last-seven"
            ><div class="today-card">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>顾客</span>
                    <el-button
                      class="button"
                      type="primary"
                      @click="handleCustomer"
                      >查看</el-button
                    >
                  </div>
                </template>
                <div class="text item">
                  <span>新增</span>
                  <span class="count">{{ mainData.newUser }}</span>
                </div>
                <div class="text item">
                  <span>老顾客</span>
                  <span class="count">{{ mainData.oldUser }}</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>下单</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>加入购物车</span>
                  <span class="count">{{ mainData.addCart }}</span>
                </div>
                <div class="text item">
                  <span>提交订单数/金额</span>
                  <span class="count"
                    >{{ mainData.addOrderNum }}/{{ mainData.addOrderSum }}</span
                  >
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>支付</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>成交订单数</span>
                  <span class="count">{{ mainData.payOrderNum }}</span>
                </div>
                <div class="text item">
                  <span>成交金额</span>
                  <span class="count">{{ mainData.payOrderSum }}</span>
                </div>
              </el-card>
            </div>
            <el-divider />
            <div class="today-bottom">
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>客单价</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>成交金额/成交订单数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>下单转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>下单人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>下单-支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/下单人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="前30天" name="last-thirty">
            <div class="today-card">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>顾客</span>
                    <el-button
                      class="button"
                      type="primary"
                      @click="handleCustomer"
                      >查看</el-button
                    >
                  </div>
                </template>
                <div class="text item">
                  <span>新增</span>
                  <span class="count">{{ mainData.newUser }}</span>
                </div>
                <div class="text item">
                  <span>老顾客</span>
                  <span class="count">{{ mainData.oldUser }}</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>下单</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>加入购物车</span>
                  <span class="count">{{ mainData.addCart }}</span>
                </div>
                <div class="text item">
                  <span>提交订单数/金额</span>
                  <span class="count"
                    >{{ mainData.addOrderNum }}/{{ mainData.addOrderSum }}</span
                  >
                </div>
              </el-card>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>支付</span>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                  </div>
                </template>
                <div class="text item">
                  <span>成交订单数</span>
                  <span class="count">{{ mainData.payOrderNum }}</span>
                </div>
                <div class="text item">
                  <span>成交金额</span>
                  <span class="count">{{ mainData.payOrderSum }}</span>
                </div>
              </el-card>
            </div>
            <el-divider />
            <div class="today-bottom">
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>客单价</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>成交金额/成交订单数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>下单转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>下单人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
              <!-- <div class="bottom-contain"> -->
              <el-card class="box-card">
                <div class="text item">
                  <span>下单-支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/下单人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div class="text item">
                  <span>支付转化率</span>
                  <span class="count">0</span>
                </div>
                <div class="text-deal item item-deal">
                  <span>支付人数/访问人数</span>
                  <span class="count">0</span>
                </div>
              </el-card>
              <!-- </div> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-dialog v-model="dialogTableVisible">
        <el-tabs
          v-model="checkActiveName"
          type="card"
          class="demo-tabs"
          @tab-click="handleCheckClick"
        >
          <el-tab-pane label="新增" name="first">
            <el-table :data="checkData">
              <el-table-column property="date" label="头像" width="150" />
              <el-table-column property="name" label="昵称" width="200" />
              <el-table-column property="address" label="性别" />
              <el-table-column property="address" label="注册时间" />
              <el-table-column property="address" label="最近登录" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="老顾客" name="second">
            <el-table :data="checkData">
              <el-table-column property="date" label="头像" width="150" />
              <el-table-column property="name" label="昵称" width="200" />
              <el-table-column property="address" label="性别" />
              <el-table-column property="address" label="注册时间" />
              <el-table-column property="address" label="最近登录" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { getWelCome, getMain } from '@/api/welcome.js';
import axios from 'axios';

// 弹窗
const dialogTableVisible = ref(false);
const checkData = ref([]);
const checkActiveName = ref('first');
const handleCheckClick = (tab: TabsPaneContext, event: Event) => {};
const handleCustomer = () => {
  dialogTableVisible.value = true;
};

// 获取数据
interface AllData {
  orderToDelivery?: number;
  goodsOnsale?: number;
  user?: number;
  timestamp?: number;
}

let allData: AllData = reactive({});

const getInfo = async () => {
  // console.log(getWelCome());
  // getWelCome().then((res) => {
  //   // console.log(res);
  //   if (res.errno === 0) {
  //     Object.assign(allData, res.data);
  //   }
  // });
  const res = await getWelCome();
  if (res.errno === 0) {
    Object.assign(allData, res.data);
  }
};

const activeName = ref('today');
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
  const index = tab.index;
  // console.log(index);
  getMainData(index);
};

// 切换下单时间返回的函数
interface GetMainData {
  addCart?: number;
  addOrderNum?: number;
  addOrderSum?: number;
  newData?: Array<[]>;
  newUser?: number;
  oldData?: Array<[]>;
  oldUser?: number;
  payOrderNum?: number;
  payOrderSum?: number;
}

const mainData: GetMainData = reactive({});

const getMainData = async (index: string | undefined) => {
  const res = await getMain({ pindex: index });
  if (res.errno === 0) {
    Object.assign(mainData, res.data);
  }
  console.log(mainData);
};
onMounted(() => {
  getInfo();
});
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
    margin-bottom: 30px;
    .common {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 113px;
      padding: 20px;

      .text-number {
        font-size: 30px;
        color: #fff;
        font-weight: 700;
      }

      .text-des {
        text-decoration: none;
        color: #fff;
        margin-top: 10px;
        font-weight: 300;
      }
    }
    .red {
      background-color: #e64242;
    }

    .green {
      background-color: #11b95c;
    }

    .black {
      background-color: #1f2d3d;
    }
  }
  .main {
    .today-card {
      display: flex;
      justify-content: space-around;

      .box-card {
        width: 480px;
        height: 190px;

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text {
          font-size: 16px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;

          .count {
            font-weight: 700;
          }
        }
      }
    }
    .today-bottom {
      // width: 100%;
      display: flex;
      flex-direction: row;
      // justify-content: space-around;
      padding-left: 34px;
      flex-wrap: wrap;

      // .bottom-contain {
      //   display: flex;
      //   // justify-content: space-around;

      //   .box-card {
      //     width: 480px;
      //     height: 90px;

      //     .text {
      //       font-size: 16px;
      //     }

      //     .item {
      //       display: flex;
      //       justify-content: space-between;
      //       margin-bottom: 18px;

      //       .count {
      //         font-weight: 700;
      //       }
      //     }
      //   }
      //   &:first-child {
      //     margin-bottom: 10px;
      //   }
      // }
      // .bottom-contain {
      // display: flex;
      // justify-content: space-around;

      .box-card {
        width: 480px;
        height: 90px;
        margin: 0 64px 20px 0;

        .text {
          font-size: 16px;
        }
        .text-deal {
          color: #8c939d;
          font-size: 16px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;

          .count {
            font-weight: 700;
          }
        }
        .item-deal {
          font-size: 12px;
          font-weight: 300;
        }
      }
      &:first-child {
        margin-bottom: 10px;
      }
      // }
    }
  }
}
:deep(.el-divider--horizontal) {
  margin: 16px 0;
}
</style>
