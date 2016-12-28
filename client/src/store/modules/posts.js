import * as types from '../mutation-types'
import store from '../../store'
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
  post: null,
  comments: null
}

const getters = {
  post: state => state.post,
  posts: state => state.posts,
  postErrors: state => state.postErrors,
  comments: state => {
    return [...state.post.comments]
      .sort((a, b) => {
        return new Date(a.inserted_at) - new Date(b.inserted_at);
      })
  },
  votes: state => state.post.votes,
  upvoters: state => state.post.votes.map(vote => vote.author)
}

const actions = {
  getPosts({ commit, dispatch }) {
    return httpGet(`${apiURL}/posts`)
      .then(({ posts }) => {
        commit(types.SET_POSTS, posts)
      })
  },

  getPost({ commit, dispatch }, id) {
    return httpGet(`${apiURL}/posts/${id}`)
      .then(({ post }) => {
        commit(types.SET_POST, post)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          store.dispatch('addAppError', errorJSON.message)
          commit(types.CLEAR_POST)
        })
      })
  },

  createPost({ commit }, post) {
    return httpPost(`${apiURL}/posts`, { post })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_POST_ERRORS, errorJSON.errors)
        })
      })
  },

  deletePost({ commit }, id) {
    return httpDelete(`${apiURL}/posts/${id}`)
  },

  updatePost({ commit }, post) {
    return httpUpdate(`${apiURL}/posts/${post.id}`, { post })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          commit(types.SET_POST_ERRORS, errorJSON.errors)
        })
      })
  },

  clearPost({ commit }) {
    commit(types.CLEAR_POST)
  },

  upvotePost({ commit }, vote) {
    return httpPost(`${apiURL}/posts/${vote.post_id}/votes`, { vote })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          store.dispatch('addAppError', errorJSON.message)
        })
      })
  },

  downvotePost({ commit }, { post_id, voteId }) {
    return httpDelete(`${apiURL}/posts/${post_id}/votes/${voteId}`)
  },

  getComments({ commit }, id) {
    return httpGet(`${apiURL}/posts/${id}/comments`)
      .then(({ comments }) => {
        commit(types.SET_COMMENTS, comments)
      })
  },

  createComment({ commit }, comment) {
    return httpPost(`${apiURL}/posts/${comment.post_id}/comments`, { comment })
  },

  updateComment({ commit }, comment) {
    const { post_id, id } = comment
    return httpUpdate(`${apiURL}/posts/${post_id}/comments/${id}`, { comment })
  },

  deleteComment({ commit }, { post_id, id }) {
    return httpDelete(`${apiURL}/posts/${post_id}/comments/${id}`)
  },

  clearComments({ commit }) {
    commit(types.CLEAR_COMMENTS)
  },

  clearPostErrors({ commit }){
    commit(types.CLEAR_POST_ERRORS)
  },
}

const mutations = {
  [types.SET_POSTS](state, posts) {
    state.posts = posts
  },

  [types.SET_POST](state, post) {
    state.post = post
  },

  [types.CLEAR_POST](state) {
    state.post = null
  },

  [types.SET_COMMENTS](state, comments) {
    state.comments = comments
  },

  [types.CLEAR_COMMENTS](state) {
    state.comments = null
  },

  [types.SET_POST_ERRORS](state, errors) {
    state.postErrors = errors
  },

  [types.CLEAR_POST_ERRORS](state) {
    state.postErrors = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
