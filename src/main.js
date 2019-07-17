import Vue from 'vue'
import App from './App.vue'
import store from './store'

/* highlight 代码高亮插件 */
import highlight from '@/utils/highlight.js'
Vue.use(highlight)

/* Vue-Router 路由 */
import router from '@/router/router.js'

/* iveiw UI库 */
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
