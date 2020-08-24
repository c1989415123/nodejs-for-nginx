// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import * as filters from '@/filter'
import store from '@/store/store'
import inject from '@/plugins/inject'
import '@/assets/styles/variable.less'
import VConsole from 'vconsole'
import Vue2OrgTree from 'vue2-org-tree'

// import '@/assets/js/go.js'
Vue.config.productionTip = false

Vue.use(inject)
// new VConsole()
// Vue.use(Vue2OrgTree)




//自定义全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
