<template>
  <div class="whole">
    <div class="title_part">
      <el-row>
        <el-col :span="12">
          <el-menu default-active="1" class="class-menu" mode="horizontal" @select="handleSelect">
            <div class="logo_part">
              <router-link to="/index">
                <img :src="logo.url" class="lo" />
              </router-link>
            </div>
            <el-menu-item index="1">
              <router-link :to="{name:'main',params:{uid:uid,identity:identity}}">课堂</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="12">
          <el-menu class="option_part" mode="horizontal">
            <el-submenu index="9" style="float:right;margin-right:110px">
              <template slot="title">
                <el-avatar size="small" :src="avatar"></el-avatar>
              </template>
              <router-link :to="{name:'option',params:{uid:uid}}">
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
                  <a href>sadasd</a>
                </el-menu-item>
              </div>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="class_manage">
      <span style="float:left;padding-left:60px;padding-top:10px">全部课程</span>
      <div v-if="identity=='学生'" class="cm_right">
        <i class="el-icon-sort"></i>
        <a @click="sortDialogVisible = true">课堂排序</a>
        <i class="iconfont icon-guidang"></i>
        <a @click="cmDialogVisible=true">课堂归档</a>
        <el-button type="primary" @click="courseDialogVisible = true">+ 加入课程</el-button>
      </div>
      <div v-if="identity=='教师'" class="cm_right">
        <i class="el-icon-sort" style="  padding-top: 10px"></i>
        <a @click="sortDialogVisible = true" style="  padding-top: 10px">课堂排序</a>
        <i class="iconfont icon-guidang" style="  padding-top: 10px"></i>
        <a @click="cmDialogVisible=true" style="  padding-top: 10px; padding-right:10px">课堂归档</a>
        <el-dropdown>
          <el-button type="primary">创建/加入课程</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a @click="courseDialogVisible = true">加入课程</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="createDialogVisible = true">创建课程</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="classes">
      <div v-for="(classes,index) in commonCourse" :key="index" class="class_part">
        <div v-if="uid!=classes.teacherId">
          <el-card :body-style="{ padding: '0px' }">
            <div class="top_part">
              <!--<router-link style="color: white" :to="{name:'course',params:{uid:uid,courseId:classes.courseId}}">-->
              <router-link
                style="color: white"
                :to="{name:'courseIndex',params:{id:uid,courseId:classes.courseId}}"
              >
                <h3 class="course-name">{{classes.courseName}}</h3>
              </router-link>
                            
                <el-row>
                  <el-col :span="16">
              <span style="padding-left:20px">{{classes.className}}</span>
              <br><br>
              <span class="course-number">
                <i class="iconfont icon-ico" style="  padding-top: 10px"></i>
                加课码:{{classes.courseNum}}</span>
                  </el-col>
                  <el-col :span="8">
                    <br>
                    <span class="year-term">{{classes.year}}<br>{{classes.term}}</span>
                  </el-col>
                </el-row>
            </div>
            <div class="mid_part">
              <span style="  color: #b8bbbe">近期作业</span>
              <div class="homework">
                <p>{{classes.hwTitle[0]}}</p>
                <p>{{classes.hwTitle[1]}}</p>
              </div>
            </div>
            <div class="bottom_part">
              {{classes.teacherName}}
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a @click="changeCourseState(classes.courseId,2)">归档</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a @click="dropCourse(classes.courseId)">退课</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-card>
        </div>
        <div v-if="uid==classes.teacherId">
          <el-card :body-style="{ padding: '0px' }">
            <div class="top_part">
              <!--<router-link style="color: white" :to="{name:'mycourse',params:{uid:uid,courseId:classes.courseId}}">-->
              <router-link
                style="color: white"
                :to="{name:'courseIndex',params:{id:uid,courseId:classes.courseId}}"
              >
                <h3 class="course-name">{{classes.courseName}}<span class="littleTitle">(我的课堂)</span></h3>
              </router-link>
                            
                <el-row>
                  <el-col :span="16">
              <span style="padding-left:20px">{{classes.className}}</span>
              <br><br>
              <span class="course-number">
                <i class="iconfont icon-ico" style="  padding-top: 10px"></i>
                加课码:{{classes.courseNum}}</span>
                  </el-col>
                  <el-col :span="8">
                    <br>
                    <span class="year-term">{{classes.year}}<br>{{classes.term}}</span>
                  </el-col>
                </el-row>
            </div>
            <div class="mid_part">
              <span style="  color: #b8bbbe">近期作业</span>
              <div class="homework">
                <p>{{classes.hwTitle[0]}}</p>
                <p>{{classes.hwTitle[1]}}</p>
              </div>
            </div>
            <div class="bottom_part">
              {{classes.teacherName}}
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!--<el-dropdown-item><a @click="changeCourseState(classes.courseId,2)">编辑</a></el-dropdown-item>-->
                  <el-dropdown-item>
                    <a @click="deleteCourse(classes.courseId)">删除</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-card>
        </div>
      </div>

              <el-card  class="add-card" :body-style="{ padding: '0px' }">
            <div class="top_part">
              <img :src="addcard.url">
            </div>
            <a @click="courseDialogVisible = true">
            <div class="add-card-bottom">
              <h1>+</h1>
              <p>加入课程</p>
            </div>
            </a>
        </el-card>
   
    </div>
    <el-dialog
      title="加入课程"
      :visible.sync="courseDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="courseNum" placeholder="请输入课程编号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="courseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="课程排序" :visible.sync="sortDialogVisible" width="30%">
      <draggable v-model="commonCourse">
        <transition-group tag="ul">
          <li
            v-for="(classes,index) in commonCourse"
            :key="'classes.courseId'+index"
            class="sort_part"
          >{{classes.courseName}}</li>
        </transition-group>
      </draggable>
    </el-dialog>
    <el-dialog title="归档管理" :visible.sync="cmDialogVisible" width="30%">
      <div v-for="(classes,index) in hideCourse" :key="index" class="sort_part">
        {{classes.courseName}}
        <el-button style="margin-left:50%" @click="dropCourse(classes.courseId)">退 课</el-button>
        <el-button type="primary" @click="changeCourseState(classes.courseId,1)">恢 复</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="创建课程"
      :visible.sync="createDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="courseForm" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="courseForm.className"></el-input>
        </el-form-item>
        <el-form-item label="选择学期">
          <el-col :span="11">
            <el-select v-model="courseForm.year">
            <el-option label="2017-2018" value="2017-2018"></el-option>
            <el-option label="2018-2019" value="2018-2019"></el-option>
            <el-option label="2019-2020" value="2019-2020"></el-option>
            <el-option label="2020-2021" value="2020-2021"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="2">  -</el-col>
          <el-col :span="11">
          <el-select v-model="courseForm.term">
            <el-option label="第一学期" value="第一学期"></el-option>
            <el-option label="第二学期" value="第二学期"></el-option>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createCourse()">创 建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      uid: "",
      identity: "",
      ur: { url: require("../assets/class15.png") },
      addcard:{ url: require("../assets/create-course.png") },
      logo: { url: require("../assets/logo-mainblue.png") },
      avatar: "",
      user: [],
      courseDialogVisible: false,
      sortDialogVisible: false,
      cmDialogVisible: false,
      createDialogVisible: false,
      courseId: "",
      courseNum: "",
      commonCourse: [],
      hideCourse: [],
      courseForm:{
        courseName:'',
        className:'',
        term:'',
        year:'',
        teacherId:''
      },
    };
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
    addCourse() {
      this.$axios
        .get("api/ketangpai/user/addCourse", {
          params: { courseNum: this.courseNum, uid: this.uid }
        })
        .then(res => {
          this.$message.success("加入成功！");
          this.courseDialogVisible = false;
          this.getAllCourse();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("该班级不存在！");
        });
    },
    createCourse() {
      this.courseForm.teacherId=this.uid
      this.$axios
        .post("api/ketangpai/teacher/createCourse",  this.courseForm)
        .then(res => {
          this.$message.success("创建成功！");
          this.createDialogVisible = false;
          this.getAllCourse();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("创建失败！");
        });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("identity");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getAllCourse() {
      this.$axios
        .get("api/ketangpai/user/getClasses", {
          params: { uid: this.uid }
        })
        .then(res => {
          this.commonCourse = [];
          this.hideCourse = [];
          this.user = res.data;
          for (var i in this.user) {
            if (this.user[i].state == 1) this.commonCourse.push(this.user[i]);
            else if (this.user[i].state == 2)
              this.hideCourse.push(this.user[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteCourse(courseId) {
      this.$confirm("确认删除？")
        .then(_ => {
          this.$axios
            .get("api/ketangpai/teacher/deleteCourse", {
              params: { courseId: courseId, teacherId: this.uid }
            })
            .then(res => {
              this.getAllCourse();
            })
            .catch(err => {
              console.log(err);
            });
        })
    },
    changeCourseState(courseId, state) {
      this.$axios
        .get("api/ketangpai/changeCourseState", {
          params: {
            courseId: courseId,
            studentId: this.uid,
            courseState: state
          }
        })
        .then(res => {
          this.getAllCourse();
        })
        .catch(err => {
          console.log(err);
        });
    },
    dropCourse(courseId) {
      this.$axios
        .get("api/ketangpai/dropCourse", {
          params: { courseId: courseId, studentId: this.uid }
        })
        .then(res => {
          this.getAllCourse();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getIdentity(){
      this.$axios
        .get("api/ketangpai/user/getIdentity", {
          params: { id: this.uid }
        })
        .then(res => {
          this.identity =res.data

        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.uid = this.$route.params.id;
    this.getIdentity()
    this.getAvatar()
    this.$axios
      .get("api/ketangpai/user/getClasses", {
        params: { uid: this.uid }
      })
      .then(res => {
        this.commonCourse = [];
        this.hideCourse = [];
        this.user = res.data;
        for (var i in this.user) {
          if(this.identity=='学生'){
            if (this.user[i].state == 1 && this.uid!=this.user[i].teacherId) 
              this.commonCourse.push(this.user[i]);
            else if (this.user[i].state == 2  && this.identity!=this.user[i].teacherId) 
              this.hideCourse.push(this.user[i]);
          }else if(this.identity='教师'){
            if (this.user[i].state == 1) 
              this.commonCourse.push(this.user[i]);
            else if (this.user[i].state == 2) 
              this.hideCourse.push(this.user[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.add-card-bottom{
  height: 138px;
  
  text-align:center;
}
.add-card{
  width: 286px;
  height: 289px;
  margin: 50px 0px 50px 50px;
  float: left;
}
.course-name{
padding:20px 0 0 20px;
margin:19px 0 0 0
}
.course-number{
  font-size: 13px;
  background-color: #818181;
  margin-left: 20px
}
.year-term{
  font-size: 10px;
}
.littleTitle {
  color: #b8bbbe;
  font-size: 10px;
}
.sort_part {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: solid 1px #e6e6e6;
  font-size: 17px;
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

.homework {
  font-size: 15px;
}
.mid_part {
  border-bottom: solid 1px #e6e6e6;
  height: 107px;
  padding-left: 20px;
}
.class_part {
  width: 288px;
  margin: 50px 0px 50px 50px;
  float: left;
}
.top_part {
  background-image: url("../assets/class15.png");
  width: 100%;
  height: 130px;
  position: relative;
  top: -20px;
  color: white;
}
.bottom_part {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 13px;
  font-weight: bold;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.cm_right {
  float: right;
  margin-right: 110px;
}
.class_manage {
  padding-top: 20px;
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
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

.class-menu {
  float: left;
  width: 100%;
}
</style>
<style>
.el-card {
  border-radius: 10px;
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
.el-icon-arrow-down:before {
    content: "";
}
</style>