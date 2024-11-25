<template>
  <div class="user">
    <el-card>
      <el-form class="form" :model="userForm">
        <el-form-item label="商品名称">
          <el-input placeholder="商品名称" v-model="userForm.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 10px">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table style="width: 100%" :data="usersData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="user_id" label="头像">
          <template #default="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.avatar"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="register_time" label="注册时间" />
        <el-table-column prop="last_login_time" label="最近登录" />
        <el-table-column prop="is_delete" label="操作">
          <template #default="scope">
            <el-button>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getUser } from '@/api/user';
const page = ref(1);
const userForm = reactive({
  name: '',
});

// 获取数据
const usersData = ref<string[]>([]);

const userData = async () => {
  const res = await getUser({ page: page.value });
  console.log(res);

  if (!res.data.errno) {
    usersData.value = res.data.data.userData.data;
  }
};

userData();
</script>
<style lang="scss" scoped>
.form {
  display: flex;
}
</style>
