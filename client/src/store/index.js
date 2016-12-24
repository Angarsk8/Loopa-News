import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import posts from './modules/posts'
import session from './modules/session'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  notifications: [],
  isLoading: false,
  isAuthWidgetOpen: false,
  isNotificationPanelOpen: false
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    session,
    posts
  },
  strict: debug
})

export default store
