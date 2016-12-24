import { joinUserChannel } from '../../channel'
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
  registrationErrors: state => state.registrationErrors,
}

const actions = {
  signIn({ commit, dispatch }, session) {
    return httpPost(`${apiURL}/sessions`, { session })
      .then(({ jwt, user }) => {
        localStorage.setItem('id_token', jwt)
        joinUserChannel({ id: user.id, jwt })
        commit(types.SET_CURRENT_USER, { ...user, jwt })
        commit(types.CLEAR_SESSION_ERROR)
        dispatch('toggleAuthWidget')
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_SESSION_ERROR, errorJSON.message)
        })
      })
  },

  signOut({ commit }) {
    return httpDelete(`${apiURL}/sessions`)
      .then((_) => {
        localStorage.removeItem('id_token')
        commit(types.USER_SIGNED_OUT)
      })
  },

  signUp({ commit, dispatch }, user) {
    return httpPost(`${apiURL}/registrations`, { user })
      .then(({ jwt, user }) => {
        localStorage.setItem('id_token', jwt)
        joinUserChannel({ id: user.id, jwt })
        commit(types.SET_CURRENT_USER, { ...user, jwt })
        commit(types.CLEAR_REGISTRATIONS_ERRORS)
        dispatch('toggleAuthWidget')
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_REGISTRATIONS_ERRORS, errorJSON.errors)
        })
      })
  },

  currentUser({ commit, dispatch }) {
    return httpGet(`${apiURL}/current_user`)
      .then(({ user }) => {
        const jwt = localStorage.getItem('id_token')
        joinUserChannel({ id: user.id, jwt })
        commit(types.SET_CURRENT_USER, { ...user, jwt })
      })
  },

  clearSessionError({ commit }) {
    commit(types.CLEAR_SESSION_ERROR)
  },

  clearRegistrationErrors({ commit }) {
    commit(types.CLEAR_REGISTRATIONS_ERRORS)
  },
}

const mutations = {
  [types.SET_CURRENT_USER](state, user) {
    state.currentUser = { ...state.currentUser, ...user }
  },

  [types.USER_SIGNED_OUT](state) {
    state.currentUser = null
  },

  [types.SOCKET_CONNECTED](state, { socket, channel }) {
    state.socket  = socket
    state.channel = channel
  },

  [types.SET_SESSION_ERROR](state, error) {
    state.sessionError = error
  },

  [types.CLEAR_SESSION_ERROR](state) {
    state.sessionError = null
  },

  [types.SET_REGISTRATIONS_ERRORS](state, errors) {
    state.registrationErrors = errors
  },

  [types.CLEAR_REGISTRATIONS_ERRORS](state) {
    state.registrationErrors = {}
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
