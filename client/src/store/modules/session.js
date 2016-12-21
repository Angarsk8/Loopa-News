import * as types from '../mutation-types'
import {
  apiURL,
  httpGet,
  httpPost,
  httpDelete
} from '../../utils'

const state = {
  currentUser: null,
  sessionError: null,
  registrationErrors: {}
}

const getters = {
  currentUser: state => state.currentUser,
  sessionError: state => state.sessionError,
  registrationErrors: state => state.registrationErrors
}

const actions = {
  signIn ({ commit }, credentials) {
    return httpPost(`${apiURL}/sessions`, {session: credentials})
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
    return httpPost(`${apiURL}/registrations`, {user: credentials})
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
  },

  clearSessionError({ commit }){
    commit(types.CLEAR_SESSION_ERROR)
  },

  clearRegistrationErrors({ commit }){
    commit(types.CLEAR_REGISTRATIONS_ERRORS)
  },
}

const mutations = {
  [types.SET_CURRENT_USER] (state, user) {
    state.currentUser = { ...state.currentUser, ...user }
  },

  [types.USER_SIGNED_OUT] (state) {
    state.currentUser = null
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
}

export default {
  state,
  actions,
  mutations
}
