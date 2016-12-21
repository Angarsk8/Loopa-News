import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import posts from './modules/posts'
import session from './modules/session'
import * as types from './mutation-types'
import {
  apiURL,
  httpGet,
  httpPost,
  httpDelete,
  httpUpdate
}  from '../utils'

Vue.use(Vuex)

const state = {
  ...session.state,
  ...posts.state
}

const actions = {
  ...session.actions,
  ...posts.actions,
}

const mutations = {
  ...session.mutations,
  ...posts.mutations,
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

store.dispatch('currentUser')

export default store
