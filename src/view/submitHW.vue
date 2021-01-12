<template>
  <div class="wrap">
    <div
      class="in-header"
      style="box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.04);background: none repeat scroll 0% 0% #fff;"
    >
      <router-link :to="{name:'courseIndex',params:{id:uid,courseId:courseId}}" class="return">
        <i class="el-icon-back"></i>
        <span style="background:#2c58ab">{{course.courseName}}</span>
      </router-link>
      <div class="nav gWidth" id="third-nav" style="box-shadow: none">
        <el-menu default-active="1" class="elmenu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <router-link
              class="toHw"
              :to="{name:'submitHW',params:{id:uid,courseId:courseId,hwId:homework.hwId}}"
            >提交作业</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link
              class="toHw"
              :to="{name:'detailstu',params:{id:uid,courseId:courseId,hwId:homework.hwId}}"
            >作业详情</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <ul class="nav-menu-right">
        <el-dropdown trigger="click" class="avatar" placement="bottom-end">
          <el-avatar size="small" :src="avatar" style="margin-top:22px; cursor: pointer;"></el-avatar>
          <el-dropdown-menu slot="dropdown" class="avatar-s">
            <router-link :to="{name:'option',params:{uid:uid}}">
              <el-dropdown-item>
                <i class="el-icon-setting"></i>个人设置
              </el-dropdown-item>
            </router-link>
            <router-link to="/login">
              <el-dropdown-item @click.native="logout">
                <i class="el-icon-close"></i>退出登录
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" class="message" placement="bottom">
          <el-badge :value="5" class="item">
            <i class="el-icon-message-solid"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown" class="message-s"></el-dropdown-menu>
        </el-dropdown>
      </ul>
    </div>
    <div class="mywork-page">
      <div class="gWidth cWidth-new">
        <div class="work-title clearfix">
          <h3>{{homework.title}}</h3>
          <p>
            截至日期：
            <span>{{homework.endTime}}</span>
          </p>
        </div>
        <div id="viewer-handup">
          <div class="sc-tj-box"></div>
          <div class="homework-box">
            <div class="sc-tj-box sc-tj-box-new">
              <div class="sc-tj">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="api/file/upload2"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-success="handleFileSuccess"
                  :before-upload="isOntime"
                  list-type="picture"
                >
                  <el-button slot="trigger" size="small" type="primary">
                    <i class="iconfont icon--"></i>选取文件
                  </el-button>
                  <el-button
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="submitUpload"
                  >提交</el-button>
                  <div slot="tip" class="el-upload__tip">支持各类文档、图片、代码、压缩包格式</div>
                </el-upload>
                <a href></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      course: {},
      courseId: "",
      uid: "",
      hwId: "",
      homework: "",
      fileList: [],
      addressList: [],
      nowtime: "",
      ontime:'',
      avatar:''
    };
  },
  mounted() {
    this.hwId = this.$route.params.hwId;
    this.uid = this.$route.params.id;
    this.courseId = this.$route.params.courseId;
    this.getCourse();
    this.getHomeworkByhwId();
    this.getAvatar()
  },
  methods: {
    getAvatar(){
      this.$axios
        .get("api/ketangpai/user/getAvatar", {
          params: { uid: this.uid }
        })
        .then(res => {
          this.avatar=res.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    nowTime() {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let date = myDate.getDate();
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let seconds = myDate.getSeconds();
      hours = this.check(hours);
      minutes = this.check(minutes);
      seconds = this.check(seconds);
      this.nowtime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },
    check(i) {
      let num;
      i < 10 ? (num = "0" + i) : (num = i);
      return num;
    },
        logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
    },
    isOntime(file) {
      if (this.homework.allow==false) {
        this.nowTime();
        let reg = new RegExp("-", "g");
        if (
          new Date(this.nowtime.replace(reg, "/")) <
          new Date(this.homework.endTime.replace(reg, "/"))
        ) {
          this.ontime=1
          return true;
        } else if (
          new Date(this.nowtime.replace(reg, "/")) >
          new Date(this.homework.endTime.replace(reg, "/"))
        ) {
          this.$message.error("已超时！作业已停止提交！");
          return false;
        }
      } else {
        if (
          new Date(this.nowtime.replace(reg, "/")) <
          new Date(this.homework.endTime.replace(reg, "/"))
        ) {
          this.ontime=1
        } else if (
          new Date(this.nowtime.replace(reg, "/")) >
          new Date(this.homework.endTime.replace(reg, "/"))
        ) {
          this.ontime=0
        }
        return true;
        }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleFileSuccess(response, file, fileList) {
      this.$axios
        .get("api/ketangpai/user/uploadHomework", {
          params: {
            hwId: this.hwId,
            address: response.url[0],
            studentId: this.uid,
            ontime:this.ontime,
            time:this.nowtime
          }
        })
        .then(res => {
          this.$message.success("提交成功！");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("提交失败！");
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    getHomeworkByhwId() {
      this.$axios
        .get("api/ketangpai/user/getHomeWorkByhwId", {
          params: { hwId: this.hwId }
        })
        .then(res => {
          this.homework = res.data;
          console.log(this.homework);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourse() {
      this.$axios
        .get("api/ketangpai/user/getCourse", {
          params: { courseId: this.courseId }
        })
        .then(res => {
          this.course = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.tip {
  color: #999;
  font-size: 12px;
  display: block;
  line-height: 12px;
}
.mywork-page .sc-tj-box {
  height: 40px;
  line-height: 40px;
}

.mywork-page {
  padding-top: 40px;
  padding-bottom: 60px;
}
.mywork-page .homework-box {
  margin-top: 20px;
  border: 1px solid #e2e6ed;
  background: #fff;
  border-radius: 8px;
}
.sc-tj-box-new {
  width: 330px;
  margin: 20px 0 44px 24px;
}
.mywork-page .work-title p {
  font-size: 14px;
  padding: 0 5px;
  line-height: 20px;
  margin-right: 10px;
  background-color: #f1f3f4;
  color: #5f6368;
  border-radius: 2px;
  float: left;
}
.mywork-page .work-title h3 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 650px;
}
.cWidth-new,
.coursebannernew,
.topbox {
  width: 60%;
}
.word {
  padding-top: 30px;
}
.time {
  color: #676767;
}
.homework-page {
  padding-bottom: 60px;
}
.homework-cont {
  margin-top: 20px;
}
.cWidth,
.cWidth-new,
.gWidth {
  margin-left: auto;
  margin-right: auto;
}
.homework-cont .homework-list .homework-box .announce-cont-box {
  padding-bottom: 10px;
  padding-right: 37px;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
}
.announce-cont-box {
  padding: 0 20px 10px 30px;
  position: relative;
}
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "PingFang SC", tahoma, arial, "helvetica neue",
    "hiragino sans gb", "microsoft yahei ui", "microsoft yahei", simsun,
    sans-serif;
  font-size: 14px;
}
.in-header {
  height: 72px;
  position: relative;
  z-index: 999;
}
.return {
  position: absolute;
  top: 24px;
  left: 2%;
  height: 32px;
  display: block;
  font-size: 0;
}
.in-header .return i {
  display: inline-block;
  width: 27px;
  height: 25px;
  vertical-align: middle;
}
.el-icon-back {
  font-size: 20px;
  color: #5f6368;
  font-weight: 900;
}
.return span {
  line-height: 32px;
  vertical-align: middle;
  margin-left: 14px;
  display: inline-block;
  height: 32px;
  border-radius: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  padding: 0 10px;
  min-width: 80px;
  text-align: center;
}
.return span {
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav {
  height: 72px;
  text-align: center;
  width: 930px;
  margin: auto;
}
.in-header .nav a.active {
  border-bottom: 4px solid #2c58ab;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  font-size: 16px;
  font-weight: 500;
  color: rgba(59, 61, 69, 1);
}
.in-header .nav a {
  min-width: 80px;
  height: 67px;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(95, 99, 104, 1);
}
.in-header .nav .item,
.in-header .nav a,
.in-header .nav span {
  line-height: 70px;
  display: inline-block;
  text-align: center;
}
a {
  text-decoration: none;
  outline: 0;
  cursor: pointer;
}
.in-header .nav-menu-right {
  position: absolute;
  right: 70px;
  top: 0;
  padding: 0;
}
.nav-menu-right {
  margin: 0;
}
.nav-menu-right {
  float: right;
}
.message-s {
  top: 50px !important;
}
.avatar-s {
  top: 50px !important;
}
.item >>> .el-badge__content.is-fixed {
  top: 22px;
  right: 14px;
}
.item {
  display: block !important;
  height: 72px;
}
.message {
  height: 72px;
  float: right;
  line-height: 72px;
}
.avatar {
  height: 72px;
  margin-left: 30px;
  float: right;
}
.iconfont.icon-icon-xiaoxi {
  cursor: pointer;
  font-size: 28px;
}
.elmenu {
  margin-left: 35%;
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  height: 72px !important;
  line-height: 72px !important;
}
</style>