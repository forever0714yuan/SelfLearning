<template>
  <div class="goods-common">
    <el-form :inline="true">
      <el-form-item label="商品名称">
        <el-input placeholder="商品名称" v-model="producrName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="props.allData.data"
      stripe
      :border="parentBorder"
      style="width: 100%"
      @row-click="handleClickRow"
      :row-key="
        (row) => {
          return row.id;
        }
      "
      :expand-row-keys="expandedRowKeys"
      @expand-change="expandOpen"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.product" :border="childBorder">
            <el-table-column label="id" prop="id"> </el-table-column>
            <el-table-column label="商品SKU" prop="sell_volume">
              <template #default="scope">
                <el-input v-model="scope.row.goods_sn"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="快递单上的简称" prop="goods_name">
              <template #default="scope">
                <el-input v-model="scope.row.goods_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="型号/规格" prop="value">
              <template #default="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="成本(元)" prop="cost">
              <template #default="scope">
                <el-input v-model="scope.row.cost"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="零售(元)" prop="retail_price">
              <template #default="scope">
                <el-input v-model="scope.row.retail_price"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="重量(KG)" prop="goods_weight">
              <template #default="scope">
                <el-input v-model="scope.row.goods_weight"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存(元)" prop="goods_number">
              <template #default="scope">
                <el-input v-model="scope.row.goods_number"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="is_on_sale">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.is_on_sale"
                  active-value="1"
                  inactive-value="0"
                />
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="list_pic_url" label="商品图片">
        <template #default="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.https_pic_url"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="300" />
      <el-table-column prop="address" label="排序" width="150">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.sort_order"
            :min="1"
            :max="10"
            size="small"
            controls-position="right"
            @change="handleChange"
          />
        </template>
      </el-table-column>
      <el-table-column prop="sell_volume" label="销量" />
      <el-table-column prop="goods_number" label="库存" />
      <el-table-column prop="address" label="首页显示">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_index"
            @change="mainStatusChange($event, scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="上架">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_on_sale"
            @change="putAwayChange($event, scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" width="200px" label="上架操作">
        <template #default="scope">
          <el-button plain @click="handleEdite(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const expandedRowKeys = ref<string[]>([]);

const remove = function (array: any[], val: any) {
  const index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1);
    return false;
  }
  return true;
};

const expandOpen = async (row: any, expand: any) => {
  console.log(row, expand);
  if (!remove(expandedRowKeys.value, row.recordId)) {
    expandedRowKeys.value.push(row.recordId);
  }
  // 业务实现
};

const emit = defineEmits<{
  (e: 'query', producrName: string): void;
  (e: 'sort', sortData: object): void;
  (e: 'mainStatusChange', statusChange: object): void;
  (e: 'putAway', statusChange: object): void;
}>();
const props = defineProps<{
  allData: object;
}>();

const producrName = ref('');
const query = () => {
  emit('query', producrName.value);
};
const clear = () => {
  producrName.value = '';
  emit('query', producrName.value);
};

const handleEdite = (index: string, row: any) => {
  // console.log(row);

  router.push({ path: '/goodsadd', query: { id: row.id, title: '编辑' } });
};

//
const handleClickRow = (row: any, column: any, event: any) => {
  emit('sort', { id: row.id, sort: row.sort_order });
  // console.log(row);
  // console.log(column);
  // console.log(event);
};

// const listData = ref(props.allData.data);
// const listData = ref([]);

// console.log(listData);
// 排序
const handleChange = (value: number, cur: number) => {
  console.log(cur); // 旧值
  console.log(value); //当前值
};

// 首页显示
const mainStatusChange = (status: boolean, id: number) => {
  emit('mainStatusChange', { status: status, id: id });
};

// 上架
const putAwayChange = (status: boolean, id: number) => {
  emit('putAway', { status: status, id: id });
};

const parentBorder = ref(true);
const childBorder = ref(false);

onMounted(() => {});

// watch(props, (n, o) => {
//   // console.log(n.allData);
//   listData.value = n.allData;
// });
</script>

<style lang="scss" scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
