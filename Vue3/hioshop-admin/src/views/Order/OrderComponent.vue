<template>
  <div class="order-common">
    <el-form :model="form" label-width="60px" :inline="true">
      <el-form-item label="订单号">
        <el-input v-model="form.order" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="form.username" placeholder="请输入收货人" />
      </el-form-item>
      <el-form-item label="快递号">
        <el-input v-model="form.express" placeholder="请输入快递号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="order-details">
      <div class="details" v-for="list in listData" :key="list.id">
        <div class="details-top">
          <div class="top-left">
            <span class="status">{{ list.order_status_text }}</span>
            <span class="time">下单时间：{{ list.add_time }}</span>
            <span class="pay"> 付款时间：{{ list.pay_time }}</span>
            <span class="order-num">订单号：{{ list.order_sn }}</span>
          </div>
          <div class="top-right">
            <span class="sum">共{{ list.goodsCount }}件商品</span>
            <span class="sum-money"
              >当前合计{{ list.order_price }}元（含运费{{
                list.offline_pay
              }}元）
            </span>
          </div>
        </div>
        <div class="details-bottom">
          <div class="goods-list">
            <div
              class="details-shop"
              v-for="(item, index) in list.goodsList"
              :key="index"
            >
              <img :src="item.list_pic_url" alt="" class="shop-img" />
              <div class="shop-name">{{ item.goods_aka }}</div>
              <div class="shop-num">
                <span class="num-name">数量:</span>
                <span class="number">{{ item.number }}</span>
              </div>
            </div>
          </div>
          <div class="details-username">
            <div class="name">
              <div class="name-info">
                <img :src="list.userInfo.avatar" alt="" class="name-img" />
                <div class="nickname">{{ list.userInfo.nickname }}</div>
              </div>
              <div class="username-info">姓名：{{ list.userInfo.name }}</div>
              <div class="phone">手机：{{ list.userInfo.mobile }}</div>
            </div>
          </div>
          <div class="details-express">
            <div class="express-con">
              <div class="express-info">{{ list.expressInfo }}</div>
              <div class="express-phone">手机：{{ list.mobile }}</div>
              <div class="express-address">{{ list.full_region }}</div>
              <!-- <div class="express-text">
                <textarea></textarea>
              </div> -->
              <el-form>
                <el-form-item>
                  <el-input
                    type="textarea"
                    placeholder="备注"
                    style="width: 280px"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="details-operate">
            <el-form class="operate">
              <el-form-item class="operate-item">
                <!-- <el-button @click="print(list)">打印快递单</el-button> -->
                <el-button type="primary" link @click="handleDetail(list)"
                  >查看详情</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkExpressInfoApi } from '@/api/order';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
// import { form } from '@/views/Order/OrderCommon';
const router = useRouter();
const props = defineProps({
  listData: { type: Array },
});
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
interface From {
  order: number | null;
  username: string;
  express: number | null;
}

const form: From = reactive({
  order: null,
  username: '',
  express: null,
});

const emit = defineEmits<{
  (e: 'form', v: object): void;
}>();

const onSubmit = () => {
  // console.log('submit!');
  emit('form', form);
};

const handleDetail = (list: object) => {
  router.push({
    path: '/main/orderdetails',
    query: { id: list.id },
  });
};

// 打印
// const dialogExpressVisible = ref(false);
// const order_id = ref();
// const rePrintStatus = ref(0);
// const print = (list: object) => {
//   rePrintStatus.value = 0;
//   console.log(0);
//   order_id.value = list.id;
//   if (list.order_status == 300 || list.order_status == 301) {
//     rePrintStatus.value = 0;
//     checkExpressInfo();
//   } else if (list.order_status == 101) {
//     this.getOrderInfo(this.order_id);
//     this.dialogPriceVisible = true;
//   } else if (list.order_status == 301 && list.is_fake == 1) {
//     this.dialogVisible2 = true;
//   }
// };

// const checkExpressInfo = async () => {
//   const res = await checkExpressInfoApi({
//     orderId: order_id.value,
//   });
//   if (res.data.errno === 0) {
//     dialogExpressVisible.value = true;
//   } else {
//     dialogFormVisible = true;
//   }
// };

// 重新打印
const rePrintExpress = () => {};

// 直接打印
const directPrintExpress = () => {};
</script>

<style lang="scss" scoped>
.order-common {
  .order-details {
    .details {
      margin-top: 10px;
      border-left: 1px solid #d1dbe5;
      border-bottom: 1px solid #d1dbe5;
      border-top: 1px solid #d1dbe5;

      .details-top {
        display: flex;
        justify-content: space-between;
        background-color: #f5faff;
        align-items: center;
        height: 40px;
        // line-height: 40px;
        .top-left {
          width: 60%;
          display: flex;
          font-size: 14px;

          .status {
            color: #f0797f;
            margin-left: 10px;
          }
          .time {
            margin-left: 10px;
          }
          .pay {
            margin-left: 10px;
          }
          .order-num {
            margin-left: 10px;
          }
        }

        .top-right {
          display: flex;
          .sum {
            font-size: 14px;
          }
          .sum-money {
            font-size: 14px;
            margin: 0 20px;
          }
        }
      }
      .details-bottom {
        display: flex;
        height: 204px;

        .goods-list {
          display: flex;
          width: 40%;
          height: 100%;
          border-right: 1px solid #d1dbe5;
          .details-shop {
            display: flex;
            //   justify-content: center;
            padding: 0 10px;
            align-items: center;
            height: 40px;
            box-sizing: border-box;
            .shop-img {
              width: 40px;
              height: 40px;
            }
            .shop-name {
              font-size: 14px;
              color: #5e7382;
              margin: 0 10px;
              width: 180px;
            }
            .shop-num {
              font-size: 14px;

              .number {
                color: #ff3456;
              }
            }
          }
        }
        .details-username {
          width: 10%;
          border-right: 1px solid #d1dbe5;
          .name {
            height: 40px;
            // height: 100%;
            .name-info {
              display: flex;
              // justify-content: center;
              align-items: center;
              .name-img {
                width: 40px;
                height: 40px;
              }
              .nickname {
                font-size: 14px;
                margin: 0 10px;
              }
            }
            .username-info {
              font-size: 14px;
              color: #000;
              margin: 10px 0;
            }
            .phone {
              font-size: 14px;
              color: #000;
            }
          }
        }
        .details-express {
          width: 40%;
          box-sizing: border-box;
          padding: 20px 10px;
          border-right: 1px solid #d1dbe5;

          .express-con {
            height: 100%;

            .express-info {
              height: 40px;
              box-sizing: border-box;
              line-height: 20px;
              color: #ff3456;
              background-color: #f0f0f0;
              padding: 10px;
              font-size: 14px;
            }

            .express-phone {
              font-size: 14px;
              margin: 10px 0;
            }
            .express-address {
              font-size: 14px;
              margin-bottom: 10px;
            }
            // .express-text {
            //   textarea {
            //     border: ;
            //   }
            // }
          }
        }
        .details-operate {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #d1dbe5;

          .operate {
            // width: 100%;
            // height: 100%;

            .operate-item {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}

:deep(.el-form-item__content) {
  // justify-content: center;
}
</style>
