import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/Login'
// import Foo from '@/components/foo'
// import Bar from '@/components/bar'
// import Notice from '@/components/notice'
// import homework from '@/components/homework'
// import c_notice from '@/components/createNotice'
// import firstTab from '@/components/tabbar'
// import pictureView from '@/components/picture'
// import pageNav from '@/components/pageNav'
// import yearIndex from '@/components/yearIndex'
// import comments from '@/components/comments'
import home from '@/components/home'
import picker from '@/components/picker'
import cityList from '@/components/cityList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:home
    },
    {
      path:'/picker',
      name:'picker',
      component:picker
    },
    {
      path:'/cityList',
      name:'cityList',
      component:cityList
    }
  ]
})
