<template>
  <div class="showset">
    <div class="btn">
      <el-button style="float: right" type="primary" @click="save"
        >确定保存</el-button
      >
    </div>
    <el-card>
      <el-form :model="Setdata" label-width="140px">
        <el-form-item label="广告">
          <el-radio-group v-model="Setdata.banner">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公告">
          <el-radio-group v-model="Setdata.notice">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告下的图标">
          <el-radio-group v-model="Setdata.index_banner_img">
            <el-radio :label="0">显示</el-radio>
            <el-radio :label="1">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页分类图片或文字">
          <el-radio-group v-model="Setdata.channel">
            <el-radio :label="0">图片</el-radio>
            <el-radio :label="1">文字</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">确定保存</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getShowset, showsetStore } from '@/api/showset';

const router = useRouter();

const Setdata = ref({});
const getData = async () => {
  const { data, errno } = await getShowset();
  console.log(data);
  if (!errno) {
    Setdata.value = data.data;
    console.log(Setdata.value);
  }
};

// 确定保存
const save = async () => {
  const { errno } = await showsetStore(Setdata.value);
  if (!errno) {
    ElMessage({
      type: 'success',
      message: '保存成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '保存失败',
    });
  }
};
const cancle = () => {
  router.push({ path: '/main/welcome' });
};

getData();
</script>
<style lang="scss" scoped>
.btn {
  margin-bottom: 10px;
  &::after {
    display: block;
    clear: both;
    content: '';
    visibility: hidden;
    height: 0;
  }
}
</style>
