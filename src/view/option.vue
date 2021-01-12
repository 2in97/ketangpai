<template>
  <div class="whole">
    <div class="title_part">
      <el-row>
        <el-col :span="12">
          <el-menu class="class-menu" mode="horizontal" @select="handleSelect">
            <div class="logo_part">
              <router-link to="/index">
                <img :src="logo.url" class="lo" />
              </router-link>
            </div>
            <el-menu-item index="1">
              <router-link :to="{name:'main',params:{uid:uid,identity:i}}">课堂</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="12">
          <el-menu class="option_part" mode="horizontal">
            <el-submenu index="9" style="float:right;margin-right:110px">
              <template slot="title">
                <el-avatar size="small" :src="imageUrl" fit="contain"></el-avatar>
              </template>
              <router-link :to="{name:'option',params:{uid:uid,identity:i}}">
                <el-menu-item index="9-1">
                  <i class="el-icon-setting"></i>
                  个人设置
                </el-menu-item>
              </router-link>
              <router-link to="/login">
                <el-menu-item index="9-2" @click.native="logout">
                  <i class="el-icon-close"></i>退出
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="8" style="float:right">
              <template slot="title">
                <el-badge :value="1">
                  <i class="el-icon-message-solid"></i>
                </el-badge>
              </template>
              <div v-for="o in 5" :key="o">
                <el-menu-item>
                  <i class="el-icon-message"></i>
                  <a href="/option">sadasd</a>
                </el-menu-item>
              </div>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="avatar_part">
      <center>
        <el-upload
          class="avatar-uploader"
          action="api/file/upload2"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <h1>{{user.name}}</h1>
      </center>
    </div>
    <div class="setting">
      <div v-if="i=='学生'||i=='2'" class="basic-setting">
        <el-form class="basic-form" :model="basicSetting">
          <div class="setting-title">基本资料</div>
          <br />
          <el-button class="setting-bt" @click="form1()">编辑</el-button>
          <el-form-item label="姓名">
            <el-input v-model="basicSetting.name" :disabled="basic"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="basicSetting.id" :disabled="basic"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="basicSetting.school" :disabled="basic"></el-input>
          </el-form-item>
          <el-button
            @click="saveInfo()"
            class="submit-bt"
            type="primary"
            :style="{ display:visible1 }"
          >提交</el-button>
          <el-button @click="cancel1()" class="cancel-bt" :style="{ display:visible1 }">取消</el-button>
        </el-form>
      </div>
      <div v-if="i=='教师'||i=='1'" class="basic-setting">
        <el-form class="basic-form" :model="basicSetting">
          <div class="setting-title">基本资料</div>
          <br />
          <el-button class="setting-bt" @click="form1()">编辑</el-button>
          <el-form-item label="姓名">
            <el-input v-model="basicSetting.name" :disabled="basic"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="basicSetting.school" :disabled="basic"></el-input>
          </el-form-item>
          <el-form-item label="授课专业">
            <el-input v-model="basicSetting.major" :disabled="basic"></el-input>
          </el-form-item>
          <el-form-item label="所授课程">
            <el-input v-model="basicSetting.teaching" :disabled="basic"></el-input>
          </el-form-item>
          <el-button
            @click="saveInfo()"
            class="submit-bt"
            type="primary"
            :style="{ display:visible1 }"
          >提交</el-button>
          <el-button @click="cancel1()" class="cancel-bt" :style="{ display:visible1 }">取消</el-button>
        </el-form>
      </div>
      <div class="identity-setting">
        <el-form class="identity-form">
          <div class="setting-title">身份角色</div>
          <br />
          <el-button class="setting-bt" @click="form2()">编辑</el-button>
          <el-form-item label="身份">
            <el-select v-model="a" :disabled="identity">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button
              @click="changeIdentity()"
              class="submit-bt"
              type="primary"
              :style="{ display:visible2 }"
            >提交</el-button>
            <el-button @click="cancel2()" class="cancel-bt" :style="{ display:visible2 }">取消</el-button>
          </div>
        </el-form>
      </div>
      <div class="password-setting">
        <el-form class="password-form">
          <div class="setting-title">密码</div>
          <br />
          <el-button class="setting-bt" @click="form3()">编辑</el-button>
          <el-form-item label="密码">
            <el-input show-password v-model="pw" :disabled="password"></el-input>
          </el-form-item>
          <div>
            <el-button
              @click="changePassword()"
              class="submit-bt"
              type="primary"
              :style="{ display:visible3 }"
            >提交</el-button>
            <el-button @click="cancel3()" class="cancel-bt" :style="{ display:visible3 }">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "教师"
        },
        {
          value: "2",
          label: "学生"
        }
      ],
      imageUrl:'',
      uid: "",
      i: "",
      a: "",
      logo: { url: require("../assets/logo-mainblue.png") },
      avatar: "",
      name: "giao",
      basic: true,
      identity: true,
      password: true,
      visible1: "none",
      visible2: "none",
      visible3: "none",
      basicSetting: {
        name: "",
        id: "",
        school: "",
        major: "",
        teaching: ""
      },
      pw: "",
      user: {}
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.$axios
        .get("api/ketangpai/user/uploadAvatar", {
          params: {
            uid: this.uid,
            address: res.url[0],
          }
        })
        .then(res => {
          this.$message.success("上传成功！");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("上传失败！");
        });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    saveInfo() {
      this.basicSetting.id = this.uid;
      this.$axios
        .post("api/ketangpai/user/saveInfo?user=", this.basicSetting)
        .then(res => {
          this.$message.success("保存成功！");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("保存失败！");
        });
    },
    changePassword() {
      this.$axios
        .get("api/ketangpai/user/changePassword", {
          params: { newPassword: this.pw, uid: this.uid }
        })
        .then(res => {
          this.$message.success("保存成功！");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("保存失败！");
        });
    },
    changeIdentity() {
      this.$axios
        .get("api/ketangpai/user/changeIdentity", {
          params: { newIdentity: this.a, uid: this.uid }
        })
        .then(res => {
          this.$message.success("保存成功！");
          this.i = this.a;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("保存失败！");
        });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    form1() {
      this.visible1 = "block";
      this.basic = false;
    },
    form2() {
      this.visible2 = "block";
      this.identity = false;
    },
    form3() {
      this.visible3 = "block";
      this.password = false;
    },
    cancel1() {
      this.visible1 = "none";
      this.basic = true;
    },
    cancel2() {
      this.visible2 = "none";
      this.identity = true;
    },
    cancel3() {
      this.visible3 = "none";
      this.password = true;
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
    },
    getIdentity() {
      this.$axios
        .get("api/ketangpai/user/getIdentity", {
          params: { id: this.uid }
        })
        .then(res => {
          this.i = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.uid = this.$route.params.id;
    this.getIdentity();
    this.$axios
      .get("api/ketangpai/getUser", {
        params: { uid: this.uid }
      })
      .then(res => {
        this.user = res.data;
        this.basicSetting.name = this.user.name;
        this.basicSetting.id = this.user.id;
        this.basicSetting.school = this.user.school;
        this.basicSetting.major = this.user.major;
        this.basicSetting.teaching = this.user.teaching;
        this.a = this.i;
        this.imageUrl=this.user.avatar
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #3f3f3f;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 138px;
    height: 138px;
    display: block;
  }
.setting-bt {
  float: right;
  position: relative;
  right: 20px;
}
.setting {
  margin-top: 20px;
  border: solid 1px #e6e6e6;
}
.identity-setting {
  padding-top: 20px;
  margin-left: 3%;
  width: 94%;
}
.password-setting {
  padding-top: 20px;
  margin-left: 3%;
  width: 94%;
}
.basic-setting {
  padding-top: 20px;
  margin-left: 3%;
  width: 94%;
}
.setting-title {
  font-size: 18px;
  font-weight: bold;
  border-bottom: solid 1px #e6e6e6;
}
.avatar_part {
  height: 230px;
  padding-top: 50px;
  border-bottom: solid 1px #e6e6e6;
}
.option_part {
  width: 100%;
  height: 70px;
}
.option_part.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid transparent;
}
.title_part {
  width: 100%;
  height: 70px;
}
.right_part {
  width: 300px;
  float: right;
}
.logo_part {
  float: left;
  background-position: center center;
  width: 200px;
}
.lo {
  padding-top: 8%;
  padding-left: 30%;
  width: 120px;
  height: 30px;
}
a {
  text-decoration: none;
  color: #909399;
}
.el-menu--horizontal > .el-menu-item {
  height: 70px;
  font-size: 18px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dropdown {
  float: right;
  padding-right: 20px;
}
.class-menu {
  float: left;
  width: 100%;
}
.el-submenu__icon-arrow {
  display: none;
}
.el-input__inner {
  width: 217px;
}
.el-input {
  width: 217px;
}

.cancel-bt {
  position: relative;
  left: 20px;
}
.submit-bt {
  float: left;
}
</style>
<style>
.el-form-item__content {
  width: 400px;
}
.el-icon-arrow-down:before {
  content: "";
}
</style>