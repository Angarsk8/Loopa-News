import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
