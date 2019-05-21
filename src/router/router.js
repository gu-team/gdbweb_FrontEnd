import VueRouter from 'vue-router'
import Vue from 'vue'

// 在Vue中加载 VueRouter
Vue.use(VueRouter)

import Home from '@/view/home'

// 将该VueRouter实例导出
export default new VueRouter({
    // 该属性名为 routes 而非 routers，害苦我也
    routes: [
        { path: '/', name: 'Home', meta: {title: 'Home - 主页'}, component: Home }
    ]
})