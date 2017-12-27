import Vue from 'vue'
import App from './App'
import router from './router'
import * as components from './components'
import * as directives from './directives'

import { Http, Url } from './utils'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
