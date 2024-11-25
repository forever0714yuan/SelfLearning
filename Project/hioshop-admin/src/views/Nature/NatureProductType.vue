<template>
  <div class="nature-categry">
    <div class="btn">
      <el-button type="primary" plain>添加型号</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="型号" />
      <el-table-column prop="sort_order" label="排序" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="editType(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="productTypeDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { specificationCategory, deleteCategory } from '@/api/nature';
const tableData = ref([]);
const router = useRouter();
// 获取数据
const getData = async () => {
  const { errno, data } = await specificationCategory();
  if (!errno) {
    tableData.value = data;
  }
};
// 编辑
const editType = async (row: object) => {
  console.log(row);

  router.push({
    path: '/main/categorytype',
    query: { id: row.id },
  });
};
// 删除
const productTypeDelete = (row: object) => {
  ElMessageBox.confirm('请问您确定要删除吗?', '提示', {
    confirmButtonText: '是',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { errno, errmsg } = await deleteCategory({ id: row.id });
      if (!errno) {
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
        getData();
      } else {
        ElMessage({
          message: errmsg,
          type: 'error',
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};
getData();
</script>
<style lang="scss" scoped>
.nature-categry {
  .btn {
    margin-bottom: 10px;
  }
}
</style>
