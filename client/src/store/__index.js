import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import session from './modules/session'
import {
  httpGet,
  httpPost,
  httpDelete,
  httpUpdate,
  apiURL
}  from '../utils'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    posts,
    session
  },
  strict: debug
})

store.dispatch(GET_CURRENT_USER)

export default store
