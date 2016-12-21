import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { Socket } from 'phoenix-elixir'
import { httpGet, httpPost, httpDelete, httpUpdate }  from '../utils'
import { SESSION_URL, REGISTRATION_URL, CURRENT_USER_URL }  from '../utils'

Vue.use(Vuex)

const initialState = {
  currentUser: null,
  sessionError: null,
  registrationErrors: {},
  postErrors: {},
  socket: null,
  channel: null,
  posts: null,
  post: null
}

export function setCurrentUser(commit, user) {
  commit('SET_CURRENT_USER', user)
  const socket = new Socket('ws://localhost:4000/socket', {
    params: { token: localStorage.getItem('id_token') },
  })
  socket.connect();
  const channel = socket.channel(`users:${user.id}`)
  channel.join().receive('ok', () => {
    commit('SOCKET_CONNECTED', { socket, channel })
  })
}

const store = new Vuex.Store({
  state: { ...initialState },
  actions: {
    SIGN_IN ({ commit }, credentials) {
      return httpPost(SESSION_URL, credentials)
        .then(({ jwt, user: { username, id } }) => {
          localStorage.setItem('id_token', jwt)
          setCurrentUser(commit, { username, id, jwt })
          commit('CLEAR_SESSION_ERROR')
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_SESSION_ERROR', errorJSON.message)
          })
        })
    },
    SIGN_OUT ({ commit }) {
      return httpDelete(SESSION_URL)
        .then(_ => {
          localStorage.removeItem('id_token')
          commit('USER_SIGNED_OUT')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    SIGN_UP ({ commit }, credentials) {
      return httpPost(REGISTRATION_URL, credentials)
        .then(({ jwt, user: { username, id } }) => {
          localStorage.setItem('id_token', jwt)
          setCurrentUser(commit, { username, id, jwt })
          commit('CLEAR_REGISTRATIONS_ERRORS')
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_REGISTRATIONS_ERRORS', errorJSON.errors)
          })
        })
    },
    GET_CURRENT_USER ({ commit }) {
      return httpGet(CURRENT_USER_URL)
        .then(({ user: { username, id } }) => {
          const jwt = localStorage.getItem('id_token');
          setCurrentUser(commit, { username, id, jwt })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    GET_POSTS ({ commit }) {
      return httpGet('http://localhost:4000/api/posts')
        .then(({ posts }) => {
          commit('SET_POSTS', posts)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    GET_POST ({ commit }, id) {
      return httpGet(`http://localhost:4000/api/posts/${id}`)
        .then(({ post }) => {
          commit('SET_POST', post)
        })
        .catch((error) => {
          console.log(error);
        })
    },
    CREATE_POST ({ commit }, post) {
      return httpPost("http://localhost:4000/api/posts", post)
        .then(({ post }) => {
          router.push(`/post/${post.id}`)
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_POST_ERRORS', errorJSON.errors)
          })
        })
    },
    DELETE_POST ({ commit }, id) {
      return httpDelete(`http://localhost:4000/api/posts/${id}`)
        .then(_ => {
          router.push('/')
        })
    },
    UPDATE_POST ({ commit }, { id, post }) {
      return httpUpdate(`http://localhost:4000/api/posts/${id}`, post)
        .then(({ post }) => {
          router.push(`/post/${post.id}`)
        })
        .catch((error) => {
          error.response.json()
          .then((errorJSON) => {
            commit('SET_POST_ERRORS', errorJSON.errors)
          })
        })
    },
  },

  mutations: {
    SET_CURRENT_USER (state, payload) {
      state.currentUser = { ...state.currentUser, ...payload }
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
    },
    SOCKET_CONNECTED (state, payload) {
      state.socket  =  payload.socket
      state.channel =  payload.channel
    },
    SET_POSTS (state, payload) {
      state.posts = payload
    },
    SET_POST (state, payload) {
      state.post = payload
    },
    SET_POST_ERRORS (state, payload) {
      state.postErrors = payload
    },
    CLEAR_POST_ERRORS (state) {
      state.postErrors = initialState.postErrors
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

store.dispatch('GET_CURRENT_USER')

export default store
