<template>
  <div class="whole">
    <div class="loginPart">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="loginForm"
      >
        <span class="title">登录</span>
        <br />
        <br />
        <br />
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" auto-complete="off" placeholder="手机号/账号"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="密码"  prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <br />还没有账号？去
            <router-link to="/enroll">注册</router-link>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submit() {
      this.login();
    },
    login() {
      this.$axios
        .post("api/login", qs.stringify(this.ruleForm), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          localStorage.setItem("id",res.data.msg.id)
          localStorage.setItem("identity",res.data.msg.roles[0].nameZh)
          console.log(res.data.msg.roles[0].nameZh)
          this.$router.push({name:"main",params:{id:res.data.msg.id}});
        })
        .catch(err => {
          alert(err.response.data.msg);
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.bottom {
  margin-top: 30px;
  float: right;
}
.whole {
  top: 0;
  left: 0;
  background: url("../assets/login-bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
}
.loginPart {
  border-radius: 10px;
  width: 580px;
  height: 504px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -65%);
  background: white;
  color: #2d2d2d;
}

.loginForm {
  padding-top: 10%;
  margin-right: 60px;
}
.title {
  font-size: 40px;
  padding-left: 250px;
  margin-bottom: 30px;
}
.loginForm >>> .el-form-item__label {
  line-height: 60px;
}
.el-input >>> .el-input__inner {
  height: 60px;
}
</style>
