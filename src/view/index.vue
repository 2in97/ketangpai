<template>
<div class="homePage">
<div class="top">
    <router-link to="/index">
    <div class="logo">
    </div>
    </router-link>
    <div class="loginPart" v-if="!isLogin">
        <el-button type="info" @click="toEnroll()">注册</el-button>
        <el-button type="primary" @click="toLogin()">登录</el-button>
    </div>
    <div  class="loginPart" v-if="isLogin">
        <el-button type="primary" @click="toMain()">进入课堂</el-button>
    </div>
</div>
<div class="section1">
    <el-carousel :interval="4000" height="520px">
    <el-carousel-item v-for="item in s1pic" :key="item.id">
        <img :src="item.url" style="width:100%;height:100%">
    </el-carousel-item>
  </el-carousel>
</div>
<div class="section2">
<el-row>
  <el-col :span="6" v-for="item in s2pic" :key="item.id" >
    <el-card :body-style="{ padding: '0px' }">
      <img :src="item.url">
      <div style="padding: 14px;height:130px">
        <h3>{{item.title}}</h3>
        <span>{{item.content}}</span>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
        isLogin:false,
        logo:{url:require('../assets/logo.png')},
        s1pic:[
        {url:require('../assets/6.png'),id:1},
        {url:require('../assets/8.png'),id:2},
        ],
        s2pic:[
        {url:require('../assets/index1.png'),id:1,title:"极简教学主义",content:"无安装，无插件，无需专门学习；掌握简单，三分钟上手；上传一个课件，即可开启精彩的课堂"},
        {url:require('../assets/index2.png'),id:2,title:"精彩的课堂教学",content:"提供更多课堂互动场景：课件讲解，手机遥控，标记疑问，评论，弹幕互动，同屏课件，语音直播..."},
        {url:require('../assets/index3.png'),id:3,title:"有趣的课堂互动",content:"抢答，点名和随机提问，多种表现奖励形式，记录混合教学过程，激发学生学习原动力，创造更精彩的课堂"},
        {url:require('../assets/index4.png'),id:4,title:"实时随堂试题互动",content:"上课讲解课件时，随时发起随堂试题互动：投票、评价、拍照、选择、简答等多种题型，实时作答，即时分析"},
        {url:require('../assets/index5.png'),id:5,title:"精准的考勤签到",content:"二维码，数字口令，GPS，传统考勤等多种考勤形式；杜绝代签，一键导出考勤记录"},
        {url:require('../assets/index6.png'),id:6,title:"作业神器",content:"81种文档格式作业在线展示和批阅，随时随地批改作业；实时查重，精准比对，避免学生抄袭；自动管理成绩，一键下载作业数据..."},
        {url:require('../assets/index7.png'),id:7,title:"智能成绩管理",content:"汇总考勤、表现、作业、测试、平时成绩、期末成绩；自由调整成绩权重，汇总最终教学成绩，科学权威"},
        {url:require('../assets/index8.png'),id:8,title:"教学全过程数据分析",content:"教学全过程活动数据自动生成，实时查看课程和学生数据面板和报表，教学数据可留存，可追溯"},
        ],
    }
  },
  mounted(){
    if(localStorage.getItem('id')){
      this.isLogin=true;
    }
  },
  methods:{
      toLogin(){
        this.$router.push({path:'/login'})
      },
      toEnroll(){
        this.$router.push({path:'/enroll'})
      },
      toMain(){
        var id=localStorage.getItem('id');
        var role=localStorage.getItem('identity');
        console.log(id,role);
        this.$router.push({name:"main",params:{id:id,identity:role}});
      }
  }
}
</script>
<style scoped>
    .top{
        height: 80px;
        width: 100%;
        background-color: #212325;
    }
    .logo{
        float: left;
        background-position:center center;
        height: 80px;
        width: 200px;
        background-image: url('../assets/logo.png');
        background-repeat: no-repeat
    }
    .loginPart{
        padding-top: 20px;
        padding-right: 30px;
        float: right;
    }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>