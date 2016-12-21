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
  postErrors: {},
  posts: null,
  post: null
}

// const getters = {
//   post: state => state.post,
//   posts: state => state.posts,
//   postErrors: state => state.postErrors,
//   comments: state => state.post && state.post.comments
// }

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

  updatePost ({ commit }, post) {
    return httpUpdate(`${apiURL}/posts/${post.id}`, { post })
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

  createComment ({ commit, dispatch }, comment) {
    return httpPost(`${apiURL}/posts/${comment.post_id}/comments`, { comment })
      .then((_) => {
        dispatch('getPost', comment.post_id)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  clearPostErrors({ commit }){
    commit(types.CLEAR_POST_ERRORS)
  },
}

const mutations = {
  [types.SET_POSTS] (state, payload) {
    state.posts = payload
  },

  [types.SET_POST] (state, payload) {
    state.post = payload
  },

  [types.SET_POST_ERRORS] (state, payload) {
    state.postErrors = payload
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
