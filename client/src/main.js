import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import { sync } from 'vuex-router-sync'
import init from './init'

Vue.use(VueRouter)
Vue.use(Vuex)


sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

init()

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
