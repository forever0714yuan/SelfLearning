<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="src/assets/images/loading2.gif" alt="" />
      </div>
      <div class="body">
        <p class="tips">海风小店</p>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="submitForm(ruleFormRef)"
              @keyup.enter="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { setStorage } from '@/utils/storage';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { loginFrom } from '@/api/login.js';

const ruleFormRef = ref<FormInstance>();

const router = useRouter();

// 自定义验证规则
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    // if (ruleForm.username !== '') {
    // console.log(ruleFormRef.value);
    //   callback();
    //   // if (!ruleFormRef.value) return;
    //   // ruleFormRef.value.validateField('username', () => null);
    // } else {
    // }
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    // if (ruleForm.password !== '') {
    //   callback();
    //   // if (!ruleFormRef.value) return;
    //   // ruleFormRef.value.validateField('password', () => null);
    // }
    callback();
  }
};
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
});

// 输入数据的接口
interface RuleForm {
  username: string;
  password: string;
}
// 输入数据的实现
const ruleForm: RuleForm = reactive({
  username: '',
  password: '',
});

// const allData = ref([]);
// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      console.log(valid);
      console.log(ruleForm);

      const res = await loginFrom(ruleForm);
      console.log(res);

      const { token, userInfo } = res;

      setStorage('token', token);
      setStorage('userInfo', userInfo);
      router.push('/');
      ElMessage({
        message: '登录成功',
        type: 'success',
        duration: 1500,
      });
    } else {
      ElMessage({
        message: '登录失败',
        type: 'error',
        duration: 1500,
      });
      return false;
    }
  });
};
</script>

<style lang="css">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('src/assets/images/back1.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
  font-family: Lato, Helvetica, sans-serif;
  color: #656565;
}

.login-box {
  width: 320px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 12px #ccc;
}

.login-box .logo {
  height: 100px;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box .logo img {
  width: 80px;
  height: 80px;
}

.login-box .body {
  padding: 10px 30px 30px 30px;
}

.login-box .body .tips {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
