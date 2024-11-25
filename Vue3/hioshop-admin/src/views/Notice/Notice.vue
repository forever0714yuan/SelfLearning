<template>
  <div class="notice">
    <div class="btn">
      <el-button style="float: right" @click="addNotice">添加公告</el-button>
    </div>
    <el-table :data="noticeData">
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="内容" prop="content"> </el-table-column>
      <el-table-column label="结束时间" prop="end_time"> </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <div>
            {{ scope.row.is_delete === 0 ? '启用中' : '已到期下线' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteN(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="noticeDialog" :title="title">
      <el-form :model="form" label-width="100px" style="width: 400px">
        <el-form-item label="内容">
          <el-input
            v-model="form.content"
            autocomplete="off"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            class="time"
            style="width: 100%"
            v-model="form.time"
            type="datetime"
            format="YYYY/MM/DD HH:mm:ss"
            value-format="YYYY/MM/DD HH:mm:ss"
            placeholder="选择日期 时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="save"> 确定{{ title }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {
  getNotice,
  saveNotice,
  deleteNotice,
  addNoticeApi,
} from '@/api/notice';

import { reactive, ref } from 'vue';
const title = ref('');
interface Form {
  content: string;
  time: string;
  id?: string;
}
let form: Form = reactive({
  content: '',
  time: '',
  id: '',
});

const noticeDialog = ref(false);
const noticeData = ref<string[]>([]);
const getData = async () => {
  const { data, errno } = await getNotice();
  if (!errno) {
    noticeData.value = data;
  }
};

const edit = (row: object) => {
  console.log(row);
  title.value = '编辑';
  form.content = row.content;
  form.time = row.end_time;
  form.id = row.id;
  noticeDialog.value = true;
};

const deleteN = (row: object) => {
  ElMessageBox.confirm('您确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { errno, errmsg } = await deleteNotice({ id: row.id });

      if (!errno) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
      } else {
        ElMessage({
          type: 'error',
          message: errmsg,
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
const save = async () => {
  if (title.value === '编辑') {
    const { errno } = await saveNotice(form);
    if (!errno) {
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
      resetForm();
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
      });
    }
  } else {
    delete form.id;
    console.log(form);
    const { errmsg, errno } = await addNoticeApi(form);

    if (!errno) {
      ElMessage({
        type: 'success',
        message: '添加成功',
      });
      getData();
      resetForm();
    } else {
      ElMessage({
        type: 'error',
        message: '添加失败',
      });
    }
  }
};

const addNotice = () => {
  title.value = '添加';
  noticeDialog.value = true;
};

const resetForm = () => {
  form = Object.assign(form, {
    content: '',
    time: '',
    id: '',
  });
  noticeDialog.value = false;
};
getData();
</script>
<style lang="scss" scoped>
:deep(.time > .el-input__wrapper) {
  width: 93%;
}
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
