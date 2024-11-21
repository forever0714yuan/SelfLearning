<template>
  <div class="order-details">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/order' }"
          >订单管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="back">返回列表</el-button>
    </div>
    <el-card class="first-card">
      <div>{{ orderInfo.order_status_text }}</div>
      <el-button type="danger" @click="changeStatus">变更状态</el-button>
    </el-card>

    <el-card>
      <el-tabs v-model="activeDetails" class="demo-tabs">
        <el-tab-pane label="订单信息" name="first">
          <!-- 买家信息： -->
          <div class="receiver">
            <span>买家信息：</span>
            <el-table style="width: 100%" :data="orderInfoData">
              <el-table-column prop="user_id" label="用户id" width="180" />
              <el-table-column prop="user_name" label="昵称" width="180" />
              <el-table-column prop="avatar" label="头像">
                <template #default="scope">
                  <el-image
                    style="width: 40px; height: 40px"
                    :src="scope.row.avatar"
                    fit="fill"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="mobile" label="客户手机" />
              <el-table-column prop="allAddress" label="客户地址" />
              <el-table-column prop="postscript" label="买家备注" />
              <el-table-column prop="address" label="操作">
                <template #default="scope">
                  <el-button @click="receiverEdit(scope.row)">编辑 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 货物信息： -->
          <div class="receiver">
            <span>货物信息：</span>
            <el-table style="width: 100%" :data="goodsList">
              <el-table-column prop="goods_sn" label="商品SKU" width="180" />
              <el-table-column prop="avatar" label="商品图">
                <template #default="scope">
                  <el-image
                    style="width: 40px; height: 40px"
                    :src="scope.row.list_pic_url"
                    fit="fill"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="goods_name" label="商品名" />
              <el-table-column
                prop="goods_specifition_name_value"
                label="型号"
              />
              <el-table-column prop="retail_price" label="售价" />
              <el-table-column prop="number" label="购买数量" />
              <el-table-column prop="postscript" label="小计">
                <template #default="scope">
                  {{ scope.row.number * scope.row.retail_price }}
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作">
                <template #default="scope">
                  <el-button @click="goodsEdit(scope.row)">编辑 </el-button>
                  <el-button>删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="detail-wrap">
            <div class="total-price">
              优惠：¥{{ orderInfo.promotions_price }}
            </div>
            <div class="total-price">
              合计：¥{{ orderInfo.actual_price }}（含运费：¥{{
                orderInfo.freight_price
              }}）
            </div>
            <div class="total-price">
              改价前：¥{{ orderInfo.change_price }}（含运费：¥{{
                orderInfo.freight_price
              }}）
            </div>
            <div class="total-price">
              {{
                orderInfo.change_price - orderInfo.actual_price > 0
                  ? '优惠金额：' +
                    (orderInfo.change_price - orderInfo.actual_price).toFixed(2)
                  : '涨价金额：' +
                    (orderInfo.actual_price - orderInfo.change_price).toFixed(2)
              }}
            </div>
          </div>
          <!-- 卖家备注： -->
          <div class="memo-wrap">
            <div class="content-title">卖家备注：</div>
            <el-input
              class="memo-input"
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="seller"
            >
            </el-input>
            <el-button size="small" type="primary" @click="sendDesc"
              >保存
            </el-button>
          </div>
          <div class="footer">
            <div class="item">
              <div class="t">订单ID：</div>
              <div class="c">{{ orderInfo.id }}</div>
            </div>
            <div class="item">
              <div class="t">订单号：</div>
              <div class="c">{{ orderInfo.order_sn }}</div>
            </div>
            <div class="item">
              <div class="t">加入时间：</div>
              <div class="c">{{ orderInfo.add_time }}</div>
            </div>
            <div class="item" v-if="orderInfo.pay_time">
              <div class="t">付款时间：</div>
              <div class="c">{{ orderInfo.pay_time }}</div>
            </div>
            <div class="item" v-if="orderInfo.shipping_time">
              <div class="t">发货时间：</div>
              <div class="c">{{ orderInfo.shipping_time }}</div>
            </div>
            <div class="item" v-if="orderInfo.confirm_time">
              <div class="t">确认时间：</div>
              <div class="c">{{ orderInfo.confirm_time }}</div>
            </div>
            <div class="item" v-if="orderInfo.dealdone_time">
              <div class="t">完成时间：</div>
              <div class="c">{{ orderInfo.dealdone_time }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物流信息" name="second">Config</el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 变更状态 -->
    <el-dialog title="变更状态" v-model="statusVisible" width="30%">
      <el-form>
        <el-form-item label="状态:" label-width="120px">
          <el-select
            class="el-select-class"
            v-model="statusValue"
            placeholder="选择状态"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="statusVisible = false">取 消</el-button>
          <el-button type="primary" @click="statusConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改地址 -->
    <el-dialog title="修改地址" v-model="updateAddressDialog">
      <el-form class="demo-form-inline" :model="orderInfo" label-width="100px">
        <el-form-item label="所在地区">
          <el-cascader
            style="width: 100%"
            v-model="area"
            :options="Region"
            clearable
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="orderInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="orderInfo.consignee"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="orderInfo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="留言">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateAddressCancel">取消</el-button>
          <el-button type="primary" @click="updateAddressSure">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改商品 -->
    <el-dialog title="修改商品" v-model="dialogGoodsListVisible">
      <el-form :model="goodsData">
        <el-form-item label="id:" label-width="120px">
          <label>{{ goodsData.goods_id }}</label>
        </el-form-item>
        <el-form-item label="商品图:" label-width="120px">
          <template scope="scope">
            <img
              :src="goodsData.list_pic_url"
              style="width: 60px; height: 60px"
            />
          </template>
        </el-form-item>
        <el-form-item label="商品名:" label-width="120px">
          <label>{{ goodsData.goods_name }}</label>
        </el-form-item>
        <el-form-item label="商品型号:" label-width="120px">
          <label>{{ goodsData.goods_specifition_name_value }}</label>
        </el-form-item>
        <el-form-item label="售价:" label-width="120px">
          <label>{{ goodsData.retail_price }}</label>
        </el-form-item>
        <el-form-item label="购买数量:" label-width="120px">
          <el-input-number
            v-model="goodsData.number"
            :min="1"
            label="购买的数量"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsListVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogGoodsListVisible = false"
          >保存并返回</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  getAllRegion,
  detail,
  changeStatusApi,
  saveAddress,
  send,
} from '@/api/order';
const router = useRouter();
const route = useRoute();
const activeDetails = ref('first');
const statusVisible = ref(false);
const updateAddressDialog = ref(false);
const dialogGoodsListVisible = ref(false);
const area = ref<any>([]);
const statusValue = ref('');
const statusList = ref([
  {
    value: '101',
    label: '待付款',
  },
  {
    value: '102',
    label: '交易关闭',
  },
  {
    value: '300',
    label: '待发货',
  },
  {
    value: '301',
    label: '已发货',
  },
  {
    value: '401',
    label: '交易成功',
  },
]);
//获取数据
const Region = ref<any>([]);
const orderInfo = ref<any>({});
const receiver = ref<any>({});
const sender = ref<any>({});
const orderInfoData = ref<any>([]);
const goodsList = ref<any>([]);
const getData = async () => {
  const res = await Promise.all([
    getAllRegion({}),
    detail({ orderId: route.query.id }),
  ]);
  console.log(res);
  if (!res[0].errno) {
    Region.value = res[0].data;
  }

  if (!res[1].errno) {
    orderInfoData.value = [res[1].data.orderInfo];
    goodsList.value = res[1].data.orderInfo.goodsList;
    orderInfo.value = res[1].data.orderInfo;
    receiver.value = res[1].data.receiver;
    sender.value = res[1].data.sender;
  }
};

// 返回
const back = () => {
  router.replace({ path: '/main/order' });
};
// 确定
const statusConfirm = async () => {
  const data = {
    orderSn: orderInfo.value.order_sn,
    status: statusValue.value,
  };
  const { errno } = await changeStatusApi(data);
  if (!errno) {
    ElMessage({
      type: 'success',
      message: '变更状态成功',
    });
    statusValue.value = '';
    statusVisible.value = false;
  } else {
    ElMessage({
      type: 'error',
      message: '变更状态失败',
    });
    statusValue.value = '';
    statusVisible.value = false;
  }
};
// 变更状态
const changeStatus = () => {
  statusVisible.value = true;
};

// 买家编辑
const receiverEdit = (row: object) => {
  console.log(row);
  updateAddressDialog.value = true;
  area.value.push(
    orderInfo.value.province,
    orderInfo.value.city,
    orderInfo.value.district,
  );
};
// 修改地址确定
const updateAddressSure = async () => {
  console.log(orderInfo.value);
  const data = {
    addOptions: area.value,
    address: orderInfo.value.allAddress,
    avatar: orderInfo.value.avatar,
    cAddress: orderInfo.value.address,
    mobile: orderInfo.value.mobile,
    name: orderInfo.value.consignee,
    nickname: orderInfo.value.user_name,
    order_sn: orderInfo.value.order_sn,
    postscript: orderInfo.value.postscript,
    user_id: orderInfo.value.user_id,
  };
  const { errno } = await saveAddress(data);

  if (!errno) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    });
    updateAddressCancel();
    getData();
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    });
    updateAddressCancel();
  }
};
// 修改地址取消
const updateAddressCancel = () => {
  updateAddressDialog.value = false;
  area.value = [];
};

// 货物编辑
const goodsData = ref({});
const goodsEdit = (row: object) => {
  console.log(row);
  dialogGoodsListVisible.value = true;
  goodsData.value = row;
};
// 卖家备注
const seller = ref('');
const sendDesc = async () => {
  const data = {
    id: orderInfo.value.id,
    text: seller.value,
  };

  const { errno } = await send(data);
  if (!errno) {
    if (!errno) {
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
      seller.value = '';
      getData();
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
      });
    }
  }
};
getData();
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.detail-wrap {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #f1f1f1;
  margin: 20px 0;
  .total-price {
    width: 100%;
    font-size: 14px;
    margin: 6px 0;
  }
}

.memo-wrap {
  display: flex;
  align-items: center;

  .memo-input {
    width: 500px;
    margin-right: 10px;
  }
}

.footer {
  width: 100%;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid #d1dbe5;
  .item {
    font-size: 14px;
    color: #5e7382;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;

    .t {
      width: 80px;
    }
  }
}
.first-card {
  margin-bottom: 10px;
}
:deep(.first-card > .el-card__body) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
