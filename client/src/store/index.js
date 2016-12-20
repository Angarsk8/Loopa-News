import Vue from 'vue'
import Vuex from 'vuex'
import { httpGet, httpPost, httpDelete }  from '../utils'
import { SESSION_URL, REGISTRATION_URL }  from '../utils'

Vue.use(Vuex)

const initialState = {
  currentUser: {
    username: '',
    jwt: ''
  },
  sessionError: '',
  registrationErrors: {
    username: '',
    password: '',
    password_confirmation: ''
  },
  showWidgetClass: 'dropdown'
}

const store = new Vuex.Store({
  state: { ...initialState },
  actions: {
    SIGN_IN: ({ commit }, credentials) => {
      return httpPost(SESSION_URL, credentials)
        .then(({jwt, user}) => {
          localStorage.setItem('id_token', jwt)
          commit('SET_CURRENT_USER', {username: user.username, jwt: jwt})
          commit('CLEAR_SESSION_ERROR')
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_SESSION_ERROR', errorJSON.message)
          })
        })
    },
    SIGN_OUT: ({ commit }, session) => {
      return httpDelete(SESSION_URL, session)
        .then(_ => {
          localStorage.removeItem('id_token')
          commit('USER_SIGNED_OUT')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    SIGN_UP: ({ commit }, credentials) => {
      return httpPost(REGISTRATION_URL, credentials)
        .then(({jwt, user}) => {
          localStorage.setItem('id_token', jwt)
          commit('SET_CURRENT_USER', {username: user.username, jwt: jwt})
          commit('CLEAR_REGISTRATIONS_ERRORS')
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_REGISTRATIONS_ERRORS', errorJSON.errors)
          })
        })
    }
  },

  mutations: {
    SET_CURRENT_USER (state, payload) {
      state.currentUser = {...state.currentUser, ...payload}
    },
    SET_SESSION_ERROR (state, payload) {
      state.sessionError = payload
    },
    CLEAR_SESSION_ERROR (state) {
      state.sessionError = initialState.sessionError
    },
    SET_REGISTRATIONS_ERRORS (state, payload) {
      state.registrationErrors = payload
    },
    CLEAR_REGISTRATIONS_ERRORS (state) {
      state.registrationErrors = initialState.registrationErrors
    },
    USER_SIGNED_OUT (state) {
      state.currentUser = initialState.currentUser
    }
  },

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    // activeIds (state) {
    //   const { activeType, itemsPerPage, lists } = state
    //   const page = Number(state.route.params.page) || 1
    //   if (activeType) {
    //     const start = (page - 1) * itemsPerPage
    //     const end = page * itemsPerPage
    //     return lists[activeType].slice(start, end)
    //   } else {
    //     return []
    //   }
    // },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    // activeItems (state, getters) {
    //   return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    // }
  }
})

export default store
