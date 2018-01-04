import Vue from 'vue'
import VueScroller from 'vue-scroller'
import App from './App'
import router from './router'
import * as components from './components'
import * as directives from './directives'

import { Http, Url } from './utils'

// 引入svg文件
const requireAllSvg = requireContext => requireContext.keys().map(requireContext)
requireAllSvg(require.context('./assets/svg', true, /\.svg$/))

Vue.config.productionTip = false

Object.keys(components).forEach((name) => {
  // 注册全局组件
  Vue.component(name, components[name])
})

Object.keys(directives).forEach((key) => {
  // 注册全局指令
  Vue.directive(key, directives[key])
})

Vue
  .use(Http)
  .use(Url)
  .use(VueScroller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
