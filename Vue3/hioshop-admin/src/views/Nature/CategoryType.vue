<template>
  <div class="nature-type">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/nature' }"
          >商品设置</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="cancel"> 返回列表</el-button>
    </div>
    <el-card>
      <el-form :model="formData" style="width: 400px" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort_order">
          <el-input v-model="formData.sort_order"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sure">确定保存</el-button>
          <el-button type="danger" @click="productTypeDelete">删除</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

import { detailCategory, updateCategory, deleteCategory } from '@/api/nature';
const router = useRouter();
const route = useRoute();
const formData = ref([]);
// 获取数据
const getData = async () => {
  const { errno, data } = await detailCategory({ id: route.query.id });
  if (!errno) {
    formData.value = data;
  }
};
// 取消
const cancel = () => {
  router.push({
    path: '/main/nature',
  });
};
// 确定
const sure = async () => {
  const { errno } = await updateCategory(formData.value);
  if (!errno) {
    ElMessage({
      message: '修改成功',
      type: 'success',
    });
    router.push({
      path: '/main/nature',
    });
  } else {
    ElMessage({
      message: '修改失败',
      type: 'error',
    });
  }
};
// 删除
const productTypeDelete = () => {
  ElMessageBox.confirm('请问您确定要删除吗?', '提示', {
    confirmButtonText: '是',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { errno, errmsg } = await deleteCategory({ id: route.query.id });
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
.nature-type {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
