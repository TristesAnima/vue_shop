<template>
  <div class="login-container">
    <div class="login">
      <!-- 头像区域 -->
      <div class="photo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="login-main">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px">
          <el-form-item label="账号:" prop="username">
            <i class="el-icon-s-custom"></i>
            <el-input style="width: 250px" v-model.trim="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <i class="el-icon-key"></i>
            <el-input type="password" style="width: 250px" v-model.trim="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item style="float: right; padding-right: 30px">
            <el-button @click="resetLoginForm">重置</el-button>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证方式
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$axios.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.warning('登录失败')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
  .photo {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 6px #efefef;
    z-index: 999;
    img {
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px rgba(166, 164, 161, 0.5);

    .login-main {
      position: absolute;
      bottom: 35px;
      right: 20%;
      /deep/.el-form-item__label {
        color: black;
      }
      .el-icon-s-custom,
      .el-icon-key {
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        line-height: 40px;
        transform: translate(0, -1px);
        background-color: #dcdfe6;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      /deep/.el-input__inner {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>
