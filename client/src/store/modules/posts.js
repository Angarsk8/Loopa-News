import * as types from '../mutation-types'
import router from '../../router'
import {
  apiURL,
  httpGet,
  httpPost,
  httpUpdate,
  httpDelete
}  from '../../utils'

const state = {
  post: null,
  posts: null,
  postErrors: {}
}

const actions = {
  getPosts ({ commit }) {
    return httpGet(`${apiURL}/posts`)
      .then(({ posts }) => {
        commit(types.SET_POSTS, posts)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  getPost ({ commit }, id) {
    return httpGet(`${apiURL}/posts/${id}`)
      .then(({ post }) => {
        commit(types.SET_POST, post)
      })
      .catch((error) => {
        console.log(error);
      })
  },

  createPost ({ commit }, post) {
    return httpPost(`${apiURL}/posts`, post)
      .then(({ post }) => {
        router.push(`/post/${post.id}`)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_POST_ERRORS, errorJSON.errors)
        })
      })
  },

  deletePost ({ commit }, id) {
    return httpDelete(`${apiURL}/posts/${id}`)
      .then((_) => {
        router.push('/')
      })
  },

  updatePost ({ commit }, { id, post }) {
    return httpUpdate(`${apiURL}/posts/${id}`, post)
      .then(({ post }) => {
        router.push(`/post/${post.id}`)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_POST_ERRORS, errorJSON.errors)
        })
      })
  },

  createComment ({ commit, dispatch }, { id, comment }) {
    return httpPost(`${apiURL}/posts/${id}/comments`, comment)
      .then((_) => {
        dispatch(types.GET_POST, id)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

const mutations = {
  [types.SET_POST] (state, post) {
    state.post = post
  },
  [types.SET_POSTS] (state, posts) {
    state.posts = posts
  },
  [types.SET_POST_ERRORS] (state, errors) {
    state.postErrors = errors
  },
  [types.CLEAR_POST_ERRORS] (state) {
    state.postErrors = {}
  }
}

export default {
  state,
  actions,
  mutations
}
