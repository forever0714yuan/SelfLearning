<template>
  <div class="shopcart">
    <el-card>
      <el-form class="form" :model="shopCartForm">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model="shopCartForm.shopName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 10px" @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <el-table style="width: 100%" :data="shopCartData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="user_id" label="用户ID" />
        <el-table-column prop="nickname" label="用户昵称" />
        <el-table-column prop="goods_id" label="商品ID" />
        <el-table-column prop="address" label="图片">
          <template #default="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.list_pic_url"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" />
        <el-table-column prop="goods_specifition_name_value" label="型号" />
        <el-table-column prop="number" label="数量" />
        <el-table-column prop="retail_price" label="成交价" />
        <el-table-column prop="add_time" label="加入时间" />
        <el-table-column prop="is_delete" label="是否删除">
          <template #default="scope">
            <div>
              {{ scope.row.is_delete === 0 ? '未删除' : '已删除' }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { shopcart } from '@/api/shopcart';
const shopCartForm = reactive({
  shopName: '',
});
const page = ref(1);
const shopCartData = ref<string[]>([]);
// 获取数据
const getData = async () => {
  const { data, errno } = await shopcart({
    page: page,
    name: shopCartForm.shopName,
  });

  if (!errno) {
    shopCartData.value = data.data.data;
  }
};

const search = () => {
  getData();
};

getData();
</script>
<style lang="scss" scoped>
.form {
  display: flex;
}
</style>
