<template>
  <div class="wrap">
    <div class="menu">
      <div class="el-menu" mode="horizontal">
        <a class="nav" @click="drawer = true">
          <i class="iconfont icon-category"></i>
        </a>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>
            <router-link :to="{name:'main',params:{uid:uid}}">课堂</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{course.courseName}} {{course.className}}</el-breadcrumb-item>
        </el-breadcrumb>
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
      </div>
    </div>
    <div id="course-header" class="topbox cl">
      <div class="topm cl">
        <h1 style="padding-top: 0;padding-bottom: 5px">
          {{course.courseName}}
          <div class="edit" v-if="identity=='教师'&&course.teacherId==uid">
            <a style="font-size:25px" class="el-icon-edit-outline" @click="editDialogVisible=true"></a>
          </div>
        </h1>
        <h2>{{course.className}}</h2>
        <div>
          <div class="codetip" style="display:inline-block;">{{course.id}}</div>
          <ul>
            <li class="li5">
              <a>
                <i class="iconfont icon-ico"></i>
                加课码:{{course.courseNum}}
              </a>
            </li>
            <li class="li5">
              <a>
                <i class="iconfont icon-icon-"></i>
                同学 {{studentCount}}
              </a>
            </li>
            <li class="li5">
              <a>
                <i class="iconfont icon-chengji"></i>成绩
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="banner cl coursebanner coursebannernew" style="position: relative; z-index: 2;">
      <el-menu default-active="1" class="inner-menu" mode="horizontal" background-color="#F1F3F4">
        <el-menu-item index="1">作业</el-menu-item>
      </el-menu>
    </div>
    <div class="homework-page">
      <div class="width980 clearfix">
        <div class="cWidth-title">
          <div class="send-an" v-if="identity=='教师'&&course.teacherId==uid">
            <a @click="openBox()" id="act1">发布个人作业</a>
          </div>
        </div>
        <div class="send-box" id="send-box" v-if="show">
          <div class="input-box">
            <el-input type="text" v-model="new_homework.title" placeholder="作业名称"></el-input>
            <div
              class="input-cont"
              style="border: 1px solid #ececec; border-radius: 4px; padding:10px; margin-top:20px;"
            >
              <editor-bar v-model="new_homework.detail" :isClear="isClear" v-on:imgurl="fileUrl"></editor-bar>
            </div>
            <div class="annex-box"></div>
            <div class="jz-time clearfix" style="height:40px">
              <p class="fl">截止日期：</p>
              <div class="date-box fl">
                <el-date-picker
                  v-model="new_homework.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
              <div class="time-box fl">
                <div class="allowouttime">
                  <el-switch
                    inactive-color="#A0A0A0"
                    class="allowouttimetip"
                    style="display: block"
                    v-model="new_homework.isAllow"
                    active-text="若超时，禁止提交"
                    inactive-text
                  ></el-switch>
                </div>
              </div>
            </div>
            <div class="jz-time clearfix">
              <p class="fl">满分值：</p>
              <el-input v-model="new_homework.maxGrade" placeholder style="width:60px;float:left"></el-input>
            </div>
          </div>
          <div class="opt-cont">
            <div class="opt-btn fr">
              <el-button size="medium" plain @click="closeBox()">取消</el-button>
              <el-button size="medium" @click="uploadNew_homework()" type="primary">发布个人作业</el-button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(homework,index) in hwList"
        :key="index"
        class="homework-cont width980 editor-page"
      >
        <div
          v-if="identity=='学生'||(identity=='教师'&&course.teacherId!=uid)"
          class="homework-list clearfix"
        >
          <div class="homework-box">
            <div class="announce-cont-box">
              <div class="title clearfix">
                <div class="work-type" data-time="1573971575">
                  <span>个人作业</span>
                  <span>{{homework.startTime}}</span>
                </div>
              </div>
              <div class="announce-cont clearfix" style="position: relative;">
                <div class="work-new-l" style="margin-right:145px;">
                  <h3 class="work-title">
                    <router-link class="toHw" :to="{name:'detailstu',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">{{homework.title}}</router-link>
                  </h3>
                  <div class="word">
                    <div class="p" v-html="homework.detail"></div>
                  </div>
                </div>
                <br />
                <div class="work-new-r" style="position:absolute">
                  <a class="sc-btn">
                    <router-link style="color:white" :to="{name:'submitHW',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">
                      上传作业
                    </router-link>
                    </a>
                </div>
              </div>
              <div class="comment-new">
                <p>
                  截止日期：
                  <span>{{homework.endTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="identity=='教师'&&course.teacherId==uid"
          class="homework-list clearfix"
        >
          <div class="homework-box">
            <div class="announce-cont-box">
              <div class="title clearfix">
                <div class="work-type">
                  <span>个人作业</span>
                  <span>{{homework.startTime}}</span>
                  <div class="opt">
                    <a href="javascript:;" class="opt-btn">
                      <el-dropdown trigger="click" placement="bottom-start">
                        <i class="el-icon-more"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <a @click="deleteHomework(homework.hwId)">删除</a>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </a>
                  </div>
                </div>
              </div>
              <div class="announce-cont clearfix" style="margin-bottom: 10px">
                <div class="work-new-r fr">
                  <div class="total-cont">
                    <p class="score">
                      <router-link class="toHw" :to="{name:'gradeHW',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">
                      <a>{{homework.read}}</a>
                      <a class="green">已批</a>
                      </router-link>
                    </p>
                    <p class="score">
                      <router-link class="toHw" :to="{name:'gradeHW',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">
                      <a>{{homework.unread}}</a>
                      <a class="grey">未批</a>
                      </router-link>
                    </p>
                    <p class="score">
                      <router-link class="toHw" :to="{name:'gradeHW',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">
                      <a>{{homework.uncommitted}}</a>
                      <a class="red">未交</a>
                      </router-link>
                    </p>
                  </div>
                </div>
                <div class="work-new-l" style="margin-right:340px;">
                  <h3 class="work-title">
                    <router-link class="toHw" :to="{name:'detailtch',params:{uid:uid,courseId:courseId,hwId:homework.hwId}}">{{homework.title}}</router-link>
                  </h3>

                  <div class="word">
                    <div class="p" v-html="homework.detail"></div>
                  </div>
                  <div class="annex">
                    <ul class="clearfix"></ul>
                  </div>
                </div>
              </div>
              <br />
              <div class="comment-new">
                <p>
                  截止日期：
                  <span>{{homework.endTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="23%"
      class="leftNav"
    >
      <el-menu default-active="1" class="left-menu">
        <el-menu-item index="1">
          <i class>
            <span>课堂</span>
          </i>
        </el-menu-item>
        <div class="ltitle">学习的课程</div>
        <el-menu-item v-for="(course,index) in study_course" :key="index">
          <i class="circle">学</i>
          {{course.courseName}}
        </el-menu-item>
        <div class="ltitle">教授的课程</div>
        <el-menu-item v-for="(course,index) in teach_course" :key="index">
          <i class="circle">教</i>
          {{course.courseName}}
        </el-menu-item>
      </el-menu>
    </el-drawer>


    <el-dialog :visible.sync="editDialogVisible" width="560px">
      <div class="editFormTitle"><span>修改课程</span></div>
      <el-form :model="course" label-width="80px">
  <el-form-item label="课程名称">
    <el-input v-model="course.courseName"></el-input>
  </el-form-item>
    <el-form-item label="班级名称">
    <el-input v-model="course.className"></el-input>
  </el-form-item>
   <el-form-item label="选择学期">
          <el-col :span="11">
            <el-select v-model="course.year">
            <el-option label="2017-2018" value="2017-2018"></el-option>
            <el-option label="2018-2019" value="2018-2019"></el-option>
            <el-option label="2019-2020" value="2019-2020"></el-option>
            <el-option label="2020-2021" value="2020-2021"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1" style="padding:0 15px 0 15px">-</el-col>
          <el-col :span="11">
          <el-select v-model="course.term">
            <el-option label="第一学期" value="第一学期"></el-option>
            <el-option label="第二学期" value="第二学期"></el-option>
          </el-select>
          </el-col>
        </el-form-item>
  <el-form-item  class="editBt">
    <el-button type="primary" @click="editCourse()">确 定</el-button>
    <el-button @click="editDialogVisible = false">取 消</el-button>
  </el-form-item>
</el-form>
    </el-dialog>
  </div>
</template>

<script>
import EditorBar from "@/components/WangEditor.vue";
export default {
  data() {
    return {
      editDialogVisible:false,
      show: false,
      isClear: "",
      course: "",
      new_homework: {
        detail: "",
        title: "",
        startTime: "",
        courseId: "",
        endTime: "",
        isAllow: false,
        maxGrade: "",
        file: ""
      },
      activeIndex: "1",
      drawer: false,
      direction: "ltr",
      value4: false,
      value1: "",
      uid: "",
      identity: "",
      courseId: "",
      hwList: [],
      Stu_hwList: [],
      studentCount: "",
      avater: "",
      imageUrl: [],
      all_course: [],
      teach_course: [],
      study_course: [],
      avatar:''
    };
  },
  components: {
    EditorBar
  },
  mounted() {
    this.uid = this.$route.params.id;
    this.courseId = this.$route.params.courseId;
    this.getIdentity();
    this.getCourse();
    this.getHomeWork();
    this.countStudent();
    this.getAllCourse();
    this.getAvatar();
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
    editCourse() {
      this.$axios
        .post("api/ketangpai/teacher/editCourse",  this.course)
        .then(res => {
          this.$message.success("修改成功！");
          this.getCourse();
          this.editDialogVisible=false
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败！");
        });
    },
    deleteHomework(hwId) {
      this.$axios
        .get("api/ketangpai/teacher/deleteHomework", {
          params: { hwId: hwId }
        })
        .then(res => {
          this.$message.success("删除成功!");
          this.getHomeWork();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除失败!");
        });
    },
    fileUrl(imgurl) {
      this.new_homework.file = imgurl;
    },
    getAllCourse() {
      this.$axios
        .get("api/ketangpai/user/getClasses", {
          params: { uid: this.uid }
        })
        .then(res => {
          this.commonCourse = [];
          this.hideCourse = [];
          this.all_course = res.data;
          for (var i in this.all_course) {
            if (
              this.all_course[i].state == 1 &&
              this.uid == this.all_course[i].teacherId
            )
              this.teach_course.push(this.all_course[i]);
            else if (
              this.all_course[i].state == 1 &&
              this.uid != this.all_course[i].teacherId
            )
              this.study_course.push(this.all_course[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadFile() {
      this.$axios
        .post("api/ketangpai/teacher/uploadNew_homework", this.courseForm)
        .then(res => {
          this.imageUrl = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadNew_homework() {
      this.new_homework.file = this.imageUrl;
      this.new_homework.courseId = this.courseId;
      console.log(this.new_homework);
      this.$axios
        .post("api/ketangpai/teacher/uploadNew_homework", this.new_homework)
        .then(res => {
          this.$message.success("发布成功！");
          this.reload();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("发布失败！");
        });
    },
    reload() {
      this.show = false;
      this.new_homework.detail = "";
      this.new_homework.title = "";
      this.new_homework.startTime = "";
      this.new_homework.courseId = "";
      this.new_homework.endTime = "";
      this.new_homework.isAllow = false;
      this.new_homework.maxGrade = "";
      this.new_homework.file = "";
      this.getHomeWork();
      this.countStudent();
    },
    countStudent() {
      this.$axios
        .get("api/ketangpai/user/countStudent", {
          params: { courseId: this.courseId }
        })
        .then(res => {
          this.studentCount = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHomeWork() {
      this.$axios
        .get("api/ketangpai/user/getHomeWork", {
          params: { courseId: this.courseId }
        })
        .then(res => {
          this.hwList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
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
    getIdentity() {
      this.$axios
        .get("api/ketangpai/user/getIdentity", {
          params: { id: this.uid }
        })
        .then(res => {
          this.identity = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openBox() {
      this.show = true;
    },
    closeBox() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.toHw {
  color: black;
}
.editBt{
  position: relative;
  left: 54%
}
.editFormTitle{
  font-size: 20px;
  font-weight: bolder;
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: solid 1px rgb(88, 88, 88);
}
ul {
  margin: 0;
  padding: 0;
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
.menu {
  position: fixed;
  height: 72px;
  width: 100%;
  z-index: 999;
}
.el-menu {
  width: 100%;
  height: 100%;
  line-height: 73px;
  border: none;
}
.inner-menu {
  background: rgba(241, 243, 244, 1);
  border-radius: 0 0 8px 8px;
}
.inner-menu >>> .el-menu-item {
  height: 100%;
  line-height: 73px;
  font-size: 16px;
  background: rgba(241, 243, 244, 1);
  margin: 0px 20px;
  padding: 0px 25px;
}
.inner-menu >>> .el-menu-item:hover {
  background: rgba(241, 243, 244, 1) !important;
  color: #66b1ff;
}
.inner-menu >>> .el-menu-item:active {
  background: rgba(241, 243, 244, 1);
  color: #66b1ff;
}
.nav {
  padding: 0px 40px;
}
.nav .iconfont {
  font-size: 25px;
}
a {
  text-decoration: none;
  cursor: pointer;
}
.message-s {
  top: 50px !important;
}
.avatar-s {
  top: 50px !important;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent;
  color: #66b1ff;
}
.item >>> .el-badge__content.is-fixed {
  top: 20px;
  right: 14px;
}
.item {
  display: block !important;
}
.breadcrumb {
  display: inline-block;
  padding-bottom: 3px;
  font-family: PingFangSC-Regular;
  color: #606266 !important;
  font-weight: 400;
}
.breadcrumb a {
  color: #606266;
  font-weight: 400;
}
.message {
  height: 72px;
  float: right;
}
.avatar {
  height: 72px;
  margin-left: 30px;
  float: right;
  margin-right: 50px;
}
.iconfont.icon-icon-xiaoxi {
  margin-top: 22px;
  cursor: pointer;
  font-size: 28px;
}
.topbox {
  margin: 105px auto 0;
  background: url("../assets/class15plus.png") 0 center no-repeat;
  width: 1224px;
  background-size: cover;
  height: 200px;
  border-radius: 8px 8px 0 0;
  padding: 48px 0 0 40px;
  box-sizing: border-box;
}
.topm h1 .edit {
  display: inline-block;
  width: 24px;
  height: 24px;

  cursor: pointer;
  margin-left: 15px;
}
.topm h1 {
  padding-top: 22px;
  font-size: 36px;
  color: #fff;
}
.topm h1,
.topm h2 {
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.topm h2 {
  font-size: 20px;
  font-family: PingFang SC;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  width: 600px;
}
.codetip + div .codetip {
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  float: left;
  height: 24px;
  line-height: 24px;
  padding: 0 5px;
}
.topm ul li {
  margin-left: 10px;
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  height: 24px;
  line-height: 24px;
}
.topm ul,
.topm ul li {
  display: inline-block;
}
.topm ul {
  margin: 0;
  padding: 0;
}
.topm ul li a {
  font-size: 12px;
  display: block;
  color: #fff;
  font-weight: lighter;
}
.topm ul li a:hover,
.toprx ul li a:hover {
  text-decoration: underline;
}
.coursebannernew {
  height: 72px;
  width: 1224px;
  background: rgba(241, 243, 244, 1);
  border-radius: 0 0 8px 8px;
  margin: 0 auto;
}
.leftNav >>> .el-drawer__header {
  display: none !important;
}
.left-menu {
  font-size: 14px;
  padding-top: 15px;
}
.left-menu .iconfont {
  font-size: 20px;
  color: #000;
}
.left-menu .iconfont:hover {
  color: #66b1ff;
}
.left-menu .iconfont span {
  padding-left: 30px;
  font-size: 13px;
  display: inline-block;
}
.left-menu >>> .el-menu-item {
  padding-left: 0 !important;
  height: 50px;
  line-height: 50px;
  margin: 0;
  padding: 0px 30px !important;
}
.left-menu >>> .el-menu-item:hover {
  color: #66b1ff;
}
.ltitle {
  height: 46px;
  color: #5f6368;
  font-size: 12px;
  line-height: 46px;
  padding-left: 25px;
  cursor: pointer;
}
.circle {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 20px;
  background-color: #2c58ab;
  border-radius: 50%;
  font-style: normal;
  text-align: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.circle:hover {
  color: #fff;
}
.homework-page {
  padding-bottom: 60px;
}
.homework-page .width980 {
  width: 1224px;
  margin-left: auto;
  margin-right: auto;
}
.homework-cont {
  margin-top: 20px;
}
.clearfix {
  zoom: 1;
}
.homework-cont .homework-list .homework-box {
  padding: 0 20px 0 40px;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 20px;
}
.homework-cont .homework-list .homework-box:hover {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}
.announce-cont-box {
  padding-right: 30px;
}
.announce-cont-box {
  padding: 0 0 20px;
}
.homework-cont
  .homework-list
  .homework-box
  .announce-cont-box
  .title
  .work-type {
  padding: 21px 0 0;
}
.announce-cont-box .title .work-type {
  color: #aaa;
  font-size: 0;
  padding: 21px 0 10px;
  line-height: 30px;
}
.fl {
  float: left;
}
.announce-cont-box .title .work-type span:first-child {
  color: #5f6368;
  background: #f1f3f4;
  padding: 3px 5px;
  border-radius: 2px;
}
.announce-cont-box .title .work-type span {
  font-size: 14px;
  margin-right: 15px;
  color: #5f6368;
}
.homework-cont .homework-list .homework-box .announce-cont-box .work-new-l {
  height: auto;
  width: 988px;
}
.work-title a:hover {
  color: #4d90fe;
  text-decoration: underline;
}
.work-title:hover {
  color: #4d90fe;
}
.work-title {
  margin: 0;
}
.homework-cont .homework-list .homework-box .announce-cont-box .work-title a {
  line-height: 38px;
  padding-bottom: 0;
}
.announce-cont-box .work-title a {
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  padding-bottom: 5px;
  word-break: break-all;
  word-wrap: break-word;
}
.word {
  height: auto;
  overflow: auto;
  max-height: inherit;
}
.word {
  line-height: 30px;
  max-height: 100px;
  overflow: hidden;
  font-size: 14px;
  word-wrap: break-word;
  word-break: break-all;
}
.p {
  color: #707070;
  overflow: hidden;
  line-height: 1.8;
}
.work-new-r {
  bottom: 0;
  right: 0;
  margin-right: 25px;
}
.sc-btn {
  background: #409eff;
}
.homework-cont .homework-list .homework-box .announce-cont-box .work-new-r > a {
  float: right;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
}
.comment-new {
  height: 20px;
  line-height: 20px;
}
p {
  padding-right: 10px;
  margin: 0;
}
.comment-new a,
.comment-new p {
  float: left;
  margin-right: 20px;
  color: #a0a0a0;
}
.comment-new p b {
  font-weight: 400;
  margin-left: 10px;
}
.cWidth-title {
  width: auto;
  height: auto;
  padding-top: 40px;
  overflow: hidden;
}
.send-an,
.send-ppt,
.send-weike {
  width: 136px;
  border: 1px solid #409eff;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  background: #fff;
  margin-right: 16px;
  float: left;
}
.send-an a,
.send-ppt a,
.send-weike a {
  color: #409eff;
  display: block;
  cursor: pointer;
}
.opt {
  float: right;
  margin-top: -15px;
  position: relative;
}
.fr {
  float: right;
}
.work-new-r .total-cont {
  min-width: 290px;
  height: 66px;
  margin-top: 5px;
  margin-right: 0;
  border: none;
  background: #fff;
  padding: 0;
}
.total-cont p {
  margin: 0;
  font-size: 0;
  line-height: 20px;
  text-align: center;
  float: left;
}
.total-cont p:first-child:hover a:first-child {
  color: #32c76e;
}

.total-cont p a:first-child {
  font-size: 30px;
  height: 44px;
  line-height: 44px;
}
.total-cont p:hover a:first-child {
  color: #818181;
}
.total-cont p a {
  display: block;
  min-width: 80px;
  padding-left: 15px;
  color: #707070;
  padding-right: 15px;
}
.total-cont p a:last-child {
  font-size: 14px;
  height: 26px;
  line-height: 26px;
}
.total-cont .grey {
  color: #970002;
}
.total-cont p:last-child:hover a:first-child {
  color: #e03838;
}
#send-box {
  border: 1px solid #e2e6ed;
}
.send-box {
  margin-top: 20px;
  border-radius: 8px;
  background: #fff;
  padding: 20px 20px 60px;
}
.jz-time {
  margin-top: 18px;
}
.jz-time p {
  margin: 0;
  width: 75px;
  text-align: right;
  margin-right: 15px;
  line-height: 40px;
  color: #010000;
}
.time-box {
  height: 40px;
  position: relative;
  margin-right: 10px;
}
.allowouttime {
  float: left;
  margin-left: 60px;
}
.allowouttimetip {
  margin-top: 10px;
  height: 20px;
  float: left;
  margin-right: 20px;
}
.opt-cont {
  padding: 40px 0 0;
  font-size: 16px;
}
</style>