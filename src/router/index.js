import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import enroll from '@/view/enroll'
import index from '@/view/index'
import main from '@/view/main'
import option from '@/view/option'
import courseIndex from '@/view/courseIndex'
import submitHW from '@/view/submitHW'
import gradeHW from '@/view/gradeHW'
import detailstu from '@/view/detailstu'
import detailtch from '@/view/detailtch'
Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
    redirect:'index'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录',
      }
    },{
      path: '/enroll',
      name: 'enroll',
      component: enroll,
      meta: {
        title: '注册',
      }
    },{
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/courseIndex/:id/:courseId',
      name: 'courseIndex',
      component: courseIndex
    },{
      path: '/main/:id',
      name: 'main',
      component: main,
      meta: {
        title: '首页',
        requiresAuth: true // 是否需要判断是否登录
      }
    },{
      path: '/option/:id',
      name: 'option',
      component: option,
      meta: {
        title: '个人设置',
        requiresAuth: true 
      }
    },
    {
      path:'/gradeHW/:id/:courseId/:hwId',
      name:'gradeHW',
      component: gradeHW,
    },
    {
      path:'/submitHW/:id/:courseId/:hwId',
      name:'submitHW',
      component: submitHW,
    },
    {
      path:'/detailtch/:id/:courseId/:hwId',
      name:'detailtch',
      component: detailtch,
    },
    {
      path:'/detailstu/:id/:courseId/:hwId',
      name:'detailstu',
      component: detailstu,
    }
  ]
})
