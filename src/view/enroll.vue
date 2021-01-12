<template>
  <div class="whole">
    <div class="enrollPart">
      <div class="choose_identity" v-if="show1">
        <div class="title">
          <h1>注册账号</h1>
          <span>请选择您在日常教学中的实际身份</span>
        </div>
        <div class="tp">
          <img :src="teacherPic.url" />
          <el-button class="choose_bt" type="primary" @click="show_tch">我是教师/助教</el-button>
        </div>
        <div class="sp">
          <img :src="studentPic.url" />
          <el-button class="choose_bt" type="primary" @click="show_stu">我是学生</el-button>
        </div>
        <div class="bottom">
          已有账号？去
          <router-link to="/login">登录</router-link>
        </div>
      </div>
      <div class="stu_enroll" v-if="show2">
        <div class="title">
          <a class="el-icon-back" @click="show_choose"></a>
          <span class="title1">学生注册</span>
        </div>
        <el-form
          :model="student"
          :rules="rules"
          ref="student"
          label-width="100px"
          class="enroll_form"
        >
          <el-form-item prop="username">
            <el-input
              class="enroll_input"
              v-model="student.username"
              auto-complete="off"
              placeholder="账号(手机号/邮箱号)"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="enroll_input"
              type="password"
              v-model="student.password"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              class="enroll_input"
              v-model="student.name"
              auto-complete="off"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="id">
            <el-input
              class="enroll_input"
              v-model="student.id"
              auto-complete="off"
              placeholder="学号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="school">
            <el-input
              class="enroll_input"
              v-model="student.school"
              auto-complete="off"
              placeholder="学校"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="code_input" v-model="code" auto-complete="off" placeholder="验证码"></el-input>
            <div class="code" @click="refreshCode">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="enroll_bt" type="primary" @click="enrollAsStu('student')">注册为学生</el-button>
          </el-form-item>
        </el-form>
        <div class="bottom1">
          已有账号？去
          <router-link to="/login">登录</router-link>
        </div>
      </div>
      <div class="tch_enroll" v-if="show3">
        <div class="title">
          <a class="el-icon-back" @click="show_choose"></a>
          <span class="title1">教师/助教注册</span>
        </div>
        <el-form
          :model="teacher"
          :rules="rules"
          ref="teacher"
          label-width="100px"
          class="enroll_form"
        >
          <el-form-item prop="username">
            <el-input
              class="enroll_input"
              v-model="teacher.username"
              auto-complete="off"
              placeholder="账号(手机号/邮箱号)"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="enroll_input"
              type="password"
              v-model="teacher.password"
              auto-complete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              class="enroll_input"
              v-model="teacher.name"
              auto-complete="off"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="school">
            <el-input
              class="enroll_input"
              v-model="teacher.school"
              auto-complete="off"
              placeholder="学校"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="code_input" v-model="code" auto-complete="off" placeholder="验证码"></el-input>
            <div class="code" @click="refreshCode">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="enroll_bt" type="primary" @click="enrollAsTch('teacher')">注册为教师/助教</el-button>
          </el-form-item>
        </el-form>
        <div class="bottom1">
          已有账号？去
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidentify from "@/components/identify";
export default {
  components: {
    Sidentify
  },
  data() {
    return {
      studentPic: { url: require("../assets/student.png") },
      teacherPic: { url: require("../assets/teacher.png") },
      teacher: {
        username: "",
        password: "",
        name: "",
        school: "",
        role:""
      },
      student: {
        username: "",
        password: "",
        name: "",
        school: "",
        id: "",
        role:""
      },
      code: "",
      show1: true,
      show2: false,
      show3: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        school: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        name: [{ required: true, message: "请输入学校", trigger: "blur" }],
        id: [{ required: true, message: "请输入学号", trigger: "blur" }]
      }
    };
  },
  methods: {
    show_choose() {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
    },
    show_stu() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
    },
    show_tch() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
    },
    enrollAsStu(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.student.role=2
          console.log(this.student)
          if (this.identifyCode == this.code) {
            this.$axios.post('api/ketangpai/enroll', this.student)
              .then(res => {
                this.$message.success("注册成功");
                 this.$router.push('login');
              })
              .catch(err => {
                console.log(err);
                this.$message.error("账号已存在！");
                this.refreshCode()
              });
          } else {
            this.$message.error("验证码错误");
            this.refreshCode()
          }
        }
      });
    },
    enrollAsTch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.teacher.role=1
          console.log(this.teacher)
          if (this.identifyCode == this.code) {
            this.$axios.post('api/ketangpai/enroll', this.teacher)
              .then(res => {
                this.$message.success("注册成功");
                 this.$router.push('login');
              })
              .catch(err => {
                console.log(err);
                this.$message.error("账号已存在！");
                this.refreshCode()
              });
          } else {
            this.$message.error("验证码错误");
            this.refreshCode()
          }
        }
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>
<style scoped>
.code_input {
  width: 50%;
  float: left;
  height: 60px;
}
.enroll_input {
  width: 80%;
  height: 60px;
}
.el-input >>> .el-input__inner {
  height: 50px;
}
.enrollPart {
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
.el-icon-back {
  font-size: 50px;
}
.title1 {
  font-size: 30px;
  font-weight: bold;
  position: relative;
  bottom: 8px;
}
.bottom {
  margin-top: 60px;
  float: right;
  margin-right: 20px;
}
.bottom1 {
  float: right;
  margin-right: 20px;
}
.enroll_bt {
  position: relative;

  width: 80%;
  height: 60px;
}
.choose_bt {
  width: 80%;
  height: 60px;
  position: relative;
  top: -20px;
}
.tp {
  margin-left: 50px;
  margin-top: 50px;
}
.sp {
  margin-left: 50px;
  margin-top: 50px;
}
.whole {
  top: 0;
  left: 0;
  background: url("../assets/reg-bg.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
}
.title {
  padding-left: 50px;
}
.code {
  width: 35%;
  height: 50px;
  float: left;
  padding-left: 5%;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>