import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import { joinPostsChannel } from './channel'

Vue.use(VueRouter)
Vue.use(Vuex)

sync(store, router)

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

joinPostsChannel()
