<template>
  <div class="nature-edit">
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
      <el-form style="width: 500px" label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="editImageData.name"></el-input>
        </el-form-item>
        <el-form-item label="简短介绍">
          <el-input v-model="editImageData.front_name"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-image :src="editImageData.img_url"></el-image>
          <el-upload
            v-model:file-list="fileImageList"
            :before-upload="natureEditBeforeUpload"
            :on-success="natureOnSuccess"
            :auto-upload="false"
            class="upload-demo"
          >
            <template #tip>
              <div class="el-upload__tip">
                图片尺寸：顶级分类为690*自定义, 只能上传jpg/png文件
              </div>
            </template>
            <el-button type="primary" v-if="!editImageData">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类图片高度">
          <el-input v-model="editImageData.p_height"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <div class="icon">
            <el-image :src="editImageData.icon_url"></el-image>
            <el-upload
              v-model:file-list="fileIconList"
              :before-upload="natureEditBeforeUpload"
              :on-success="natureOnSuccess"
              :auto-upload="false"
              class="upload-demo"
            >
              <template #tip>
                <div class="el-upload__tip">
                  图片尺寸：顶级分类为690*自定义, 只能上传jpg/png文件
                </div>
              </template>
              <el-button type="primary" v-if="!fileIconList"
                >点击上传</el-button
              >
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editImageData.sort_order" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="handleSure"> 确定 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import type {
  UploadProps,
  UploadFile,
  UploadFiles,
  UploadUserFile,
} from 'element-plus';
import { natureEditCategory, natureStore } from '@/api/nature';

const route = useRoute();
const router = useRouter();

const fileImageList = ref<UploadUserFile[]>([]);
const fileIconList = ref<UploadUserFile[]>([]);

// 获取数据
const editImageData = ref({});
const getData = async () => {
  const { data, errno } = await natureEditCategory({ id: route.query.id });
  if (!errno) {
    editImageData.value = data;
    const iconName = data?.img_url.replace(
      'http://nos.netease.com/yanxuan/',
      '',
    );
    const imageName = data?.icon_url.replace(
      'http://yanxuan.nosdn.127.net/',
      '',
    );

    fileImageList.value.push({
      name: imageName,
      url: data.img_url,
    });
    fileIconList.value.push({
      name: iconName,
      url: data.icon_url,
    });
  }
};

const natureToken = ref('');
const natureUrl = ref('');
const natureEditBeforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  console.log(rawFile);
  return true;
};
// 上传成功
const natureOnSuccess: UploadProps['onSuccess'] = async (
  res: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
) => {
  console.log(res);
  console.log(uploadFile);
  console.log(uploadFiles);
};

const handleSure = async () => {
  const { errno } = await natureStore(editImageData.value);
  if (!errno) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    });
    router.push({ path: '/main/nature' });
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    });
  }
};
const cancel = () => {
  router.push({ path: '/main/nature' });
};
getData();
</script>
<style lang="scss" scoped>
.nature-edit {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
