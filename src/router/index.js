import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登陆界面
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/components/login.vue') },
  {
    path: '/home',
    component: () => import('@/components/home.vue'),
    redirect: '/home/welcome',
    children: [
      { path: 'welcome', component: () => import('@/views/Welcome.vue') },
      { path: '/Users', component: () => import('@/views/user/Users.vue') },
      { path: '/rights', component: () => import('@/views/power/Rights.vue') },
      { path: '/roles', component: () => import('@/views/power/Roles.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 访问登陆页面 直接放行
  // from 表示从那个页面来的
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果没有token 强制跳转
  if (!tokenStr) return next('/login')
  next()
})

export default router
