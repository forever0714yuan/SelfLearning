<template>
  <div class="nature-categry">
    <div class="btn">
      <el-button type="primary" plain @click="handleCategry"
        >添加分类</el-button
      >
    </div>
    <el-table
      @row-click="handleRowClick"
      :data="tableData"
      style="width: 100%"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      border
      stripe
    >
      <el-table-column prop="name" label="分类名称" />
      <el-table-column label="图标显示">
        <template #default="scope">
          <el-switch v-model="scope.row.is_channel" @change="changeIcon" />
        </template>
      </el-table-column>

      <el-table-column label="首页显示">
        <template #default="scope">
          <el-switch v-model="scope.row.is_show" @change="changeHome" />
        </template>
      </el-table-column>
      <el-table-column label="全部产品页面显示">
        <template #default="scope">
          <el-switch v-model="scope.row.is_category" @change="changeAllHome" />
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template #default="scope">
          <el-input
            v-model="scope.row.sort_order"
            @blur="handleBlur(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="deleteCategory(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="natureDialogForm" title="添加分类">
      <el-form
        ref="ruleFormRef"
        :model="natureForm"
        :rules="rules"
        label-width="120px"
        style="width: 450px"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="natureForm.categoryName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="简短介绍" prop="desc">
          <el-input
            type="textarea"
            v-model="natureForm.desc"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="分类图片" prop="categoryImage">
          <el-upload
            :before-upload="natureBeforeUpload"
            :on-success="natureOnSuccess"
            :headers="headers"
            class="upload-demo"
            action="http://up.qiniu.com"
          >
            <el-button type="primary" :disabled="!isCategoryImage"
              >点击上传</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                图片尺寸：顶级分类为690*自定义, 只能上传jpg/png文件
              </div>
              <div v-if="isCategoryImage">未上传</div>
              <div v-else>已上传</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="分类图片高度" prop="imageHeight">
          <el-input v-model="natureForm.imageHeight" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="natureForm.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="natureForm.sort" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="natureDialogForm = false">取消</el-button>
          <el-button type="primary" @click="handleSure(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {
  getNatureCategory,
  channelStatus,
  showStatus,
  categoryStatus,
  getQiniuToken,
  natureStore,
  natureUpdateSort,
  natureDeletCategory,
} from '@/api/nature';
import {
  type UploadProps,
  type UploadFile,
  type UploadFiles,
  ElMessageBox,
} from 'element-plus';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
const icon = ref(true);
const home = ref(true);
const allHome = ref(true);
const isCategoryImage = ref(true);
const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const natureForm = reactive({
  id: 0,
  parent_id: 0,
  categoryName: '',
  desc: '',
  categoryImage: '/dsadd',
  imageHeight: '',
  icon: '/sda',
  sort: 0,
  level: '',
});
const rules = reactive<FormRules>({
  categoryName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  desc: [{ message: '请输入介绍', trigger: 'blur' }],
  imageHeight: [{ required: true, message: '请输入高度', trigger: 'blur' }],
  categoryImage: [{ message: '请上传图片', trigger: 'change' }],
  icon: [{ message: '请上传图标', trigger: 'change' }],
  sort: [{ message: '请上传图标', trigger: 'blur' }],
});

const natureDialogForm = ref(false);
const tableData = ref<string[]>([]);
const headers = ref({
  token: '',
});
// 获取数据
const gettableData = async () => {
  const res = await getNatureCategory();
  console.log(res);

  if (!res.errno) {
    tableData.value = res.data;
  }
};
// 图表显示
const changeIcon = async (val: boolean) => {
  const data = {
    id: rowId.value,
    status: val,
  };
  const res = await channelStatus(data);
  if (!res.errno) {
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '操作失败',
      type: 'error',
    });
  }
};
// 首页显示
const changeHome = async (val: boolean) => {
  const data = {
    id: rowId.value,
    status: val,
  };
  const res = await showStatus(data);
  if (!res.errno) {
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '操作失败',
      type: 'error',
    });
  }
};
// 全部商品
const changeAllHome = async (val: boolean) => {
  const data = {
    id: rowId.value,
    status: val,
  };
  const res = await categoryStatus(data);
  if (!res.errno) {
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '操作失败',
      type: 'error',
    });
  }
};

// 添加分类
const handleCategry = () => {
  natureDialogForm.value = true;
};

// 上传图片之前
const natureToken = ref('');
const natureUrl = ref('');
const natureBeforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  console.log(rawFile);

  const {
    data: { token, url },
    errno,
  } = await getQiniuToken();
  if (!errno) {
    natureToken.value = token;
    // headers.value['token'] = token;
    // headers.value['X-Hioshop-Token'] = localStorage.getItem('token');
    natureUrl.value = url;
    ElMessage({
      type: 'success',
      message: '上传成功',
    });
    isCategoryImage.value = false;
  } else {
    ElMessage({
      type: 'error',
      message: '上传失败',
    });
    isCategoryImage.value = true;
  }
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
// 确定
const handleSure = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  natureForm.level = natureForm.parent_id == 0 ? 'L1' : 'L2';
  await formEl.validate(async (valid, fields) => {
    console.log(valid);
    console.log(fields);

    const res = await natureStore(natureForm);
    console.log(res);

    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};
// 删除
const deleteCategory = (row: object) => {
  ElMessageBox.confirm('请问您确定要删除吗？', {
    confirmButtonText: '是',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { errno } = await natureDeletCategory({ id: row.id });

      if (!errno) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        router.push({ path: '/main/nature' });
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败',
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 失去焦点
const handleBlur = async (row: object) => {
  console.log(row);
  const data = {
    id: row.id,
    sort: row.sort_order,
  };
  const { errno } = await natureUpdateSort(data);
  if (!errno) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    });
  }
};
// 编辑
const edit = (row) => {
  router.push({ path: '/main/editcategory', query: { id: row.id } });
};

const rowId = ref<number>();
const handleRowClick = (row: any, column: any, event: any) => {
  rowId.value = row.id;
};

gettableData();
</script>
<style lang="scss" scoped>
.nature-categry {
  .btn {
    margin-bottom: 10px;
  }
}
</style>
