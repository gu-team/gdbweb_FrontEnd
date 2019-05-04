import Vue from 'vue'
import App from './App.vue'

// highlight.js代码高亮插件
import Highlight from './utils/highlight';
Vue.use(Highlight);

// iveiw
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入路由
import router from './router/router'

// 生产环境关掉提示
Vue.config.productionTip = false

// 全局Vue实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
