<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="static/images/loading2.gif" alt="" />
      </div>
      <div class="body">
        <p class="tips">海风小店</p>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitForm(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { reqLogin } from '../../api/login';
// import { setStore } from '../../utils/storage';
const ruleFormRef = ref(null);
const router = useRouter();

// 自定义验证规则
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    if (ruleForm.username !== '') {
      callback();
    }
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};

// 校验项目
const ruleForm = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await reqLogin('auth/login', {
        username: ruleForm.username,
        password: ruleForm.password,
      });
      const token = res.data.data.token;
      const info = res.data.data.userInfo;

      setStore('token', token);
      setStore('userInfo', info);

      router.replace('/');
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
  background: url('/static/images/back1.jpg');
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
