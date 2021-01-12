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
        <el-menu default-active="2" class="elmenu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" v-if="courseId=1">
            <router-link class="toHw" :to="{name:'gradeHW',params:{id:uid,courseId:courseId,hwId:homework.hwId}}">
              学生作业
            </router-link>
            </el-menu-item>
          <el-menu-item index="2">
            <router-link class="toHw" :to="{name:'detailtch',params:{id:uid,courseId:courseId,hwId:homework.hwId}}">
              作业详情
            </router-link>
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
    <div class="homework-page">
      <div id="viewer-discuss" class="homework-cont gWidth">
        <div class="homework-list clearfix editor-page">
          <div class="homework-box" style="padding: 0 20px;">
            <div class="announce-cont-box">
              <div class="title clearfix">
                <h2 title="343">{{homework.title}}</h2>
              </div>
              <div class="time">
                <div class="lefttime fl">
                  截至：
                  <span class="dates">{{homework.endTime}}</span>
                </div>
              </div>
              <div class="announce-cont">
                <div class="word">
                  <div class="p special" v-html="homework.detail"></div>
                </div>
              <div></div>
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
      avatar:'',
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
        logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
    },
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
.word{
  padding-top: 30px
}
.time{
  color: #676767
}
.homework-page {
  padding-bottom: 60px;
}
.homework-cont {
  margin-top: 20px;
}
.gWidth {
  width: 810px;
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
  border: 1px solid #E2E6ED;
    border-radius: 8px;
}
.announce-cont-box {
  padding: 0 20px 10px 30px;
  position: relative;
}
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
  white-space: nowrap;
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