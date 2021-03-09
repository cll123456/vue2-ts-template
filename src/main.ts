import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@babel/polyfill'

// 样式重置
import 'normalize.css'
// 导入样式库
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// 重置element 样式
import '@/styles/element-variables.scss'
// 导入样式
import '@/styles/index.scss'
// 使用svg图标
import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
import '@/icons/components/index'

// 引入阿里图标库里面的图标
import '@/icons/iconfont/iconfont.css';
// 引入阿里图标库里面含有颜色的图标
import '@/icons/iconfont/iconfont.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
