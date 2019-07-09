import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: 'Home - 主页'},
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {title: 'About - 关于'},
      component: () => import('@/views/About.vue')
    }
  ]
})
