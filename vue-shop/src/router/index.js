/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Initial from '../components/Initial.vue'
import User from '../components/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    component: Home,
    redirect: '/initial',
    children: [{
      path: '/initial',
      component: Initial
    },
    {
      path: '/users',
      component: User
    }]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫（是否登录）
router.beforeResolve((to, from, next) => {
  if (to.path === '/login') { return next() }
  let getToken = window.sessionStorage.getItem('token')
  if (!getToken) {
    return next('/login')
  } else {
    return next()
  }
})
export default router
