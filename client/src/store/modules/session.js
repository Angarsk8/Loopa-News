import * as types from '../mutation-types'
import {
  apiURL,
  httpGet,
  httpPost,
  httpDelete
} from '../utils'

const state = {
  currentUser: null,
  sessionError: null,
  registrationErrors: {}
}

const actions = {
  signIn ({ commit }, credentials) {
    return httpPost(`${apiURL}/sessions`, credentials)
      .then(({ jwt, user: { username, id } }) => {
        localStorage.setItem('id_token', jwt)
        commit(types.SET_CURRENT_USER, { username, id, jwt })
        commit(types.CLEAR_SESSION_ERROR)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_SESSION_ERROR, errorJSON.message)
        })
      })
  },

  signOut ({ commit }) {
    return httpDelete(`${apiURL}/sessions`)
      .then((_) => {
        localStorage.removeItem('id_token')
        commit(types.USER_SIGNED_OUT)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  signUp ({ commit }, credentials) {
    return httpPost(`${apiURL}/registrations`, credentials)
      .then(({ jwt, user: { username, id } }) => {
        localStorage.setItem('id_token', jwt)
        commit(types.SET_CURRENT_USER, { username, id, jwt })
        commit(types.CLEAR_REGISTRATIONS_ERRORS)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_REGISTRATIONS_ERRORS, errorJSON.errors)
        })
      })
  },

  currentUser ({ commit }) {
    return httpGet(`${apiURL}/current_user`)
      .then(({ user: { username, id } }) => {
        const jwt = localStorage.getItem('id_token');
        commit(types.SET_CURRENT_USER, { username, id, jwt })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  [types.SET_CURRENT_USER] (state, currentUser) {
    state.currentUser = { ...state.currentUser, ...currentUser }
  },
  [types.SET_SESSION_ERROR] (state, error) {
    state.sessionError = error
  },
  [types.CLEAR_SESSION_ERROR] (state) {
    state.sessionError = null
  },
  [types.SET_REGISTRATIONS_ERRORS] (state, errors) {
    state.registrationErrors = errors
  },
  [types.CLEAR_REGISTRATIONS_ERRORS] (state) {
    state.registrationErrors = {}
  },
  [types.USER_SIGNED_OUT] (state) {
    state.currentUser = null
  },
}

export default {
  state,
  actions,
  mutations
}
