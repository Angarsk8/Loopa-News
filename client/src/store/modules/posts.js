import * as types from '../mutation-types'
import store from '../../store'
import uniqueId from 'uniqid'
import {
  apiURL,
  httpGet,
  httpPost,
  httpUpdate,
  httpDelete
}  from '../../utils'

const state = {
  postErrors: {},
  posts: null
}

const getters = {
  postErrors: state => state.postErrors,
  posts: state => state.posts
}

const actions = {
  getPosts({ commit, dispatch }) {
    return httpGet(`${apiURL}/posts`)
      .then(({ posts }) => {
        commit(types.SET_POSTS, posts)
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

  upvotePost({ commit }, vote) {
    return httpPost(`${apiURL}/posts/${vote.post_id}/votes`, { vote })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          store.dispatch('addAlert', {
            id: uniqueId('alert_'),
            type: 'danger',
            message: errorJSON.message
          })
        })
      })
  },

  downvotePost({ commit }, { post_id, voteId }) {
    return httpDelete(`${apiURL}/posts/${post_id}/votes/${voteId}`)
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

  clearPostErrors({ commit }){
    commit(types.CLEAR_POST_ERRORS)
  },
}

const mutations = {
  [types.SET_POSTS](state, posts) {
    state.posts = posts
  },

  [types.ADD_POST](state, post) {
    state.posts = [...state.posts, post]
  },

  [types.UPDATE_POST](state, post) {
    state.posts = state.posts
      .map(_post => _post.id === post.id ? post : _post)
  },

  [types.DELETE_POST](state, post) {
    const posts = state.posts.filter(_post => _post.id !== post.id)
    state.posts = [...posts]
  },

  [types.ADD_COMMENT](state, comment) {
    const post = state.posts.find(post => post.id === comment.post_id)
    post.comments = [...post.comments, comment]
  },

  [types.UPDATE_COMMENT](state, comment) {
    const post = state.posts.find(post => post.id === comment.post_id)
    post.comments = post.comments
      .map(_comment => _comment.id === comment.id ? comment : _comment)
  },

  [types.DELETE_COMMENT](state, comment) {
    const post = state.posts.find(post => post.id === comment.post_id)
    const comments = post.comments.filter(_comment => _comment.id !== comment.id)

    post.comments = [...comments]
  },

  [types.UPVOTE_POST](state, vote) {
    const post = state.posts.find(post => post.id === vote.post_id)

    post.votes = [...post.votes, vote]
  },

  [types.DOWNVOTE_POST](state, _vote) {
    const post = state.posts.find(post => post.id === _vote.post_id)
    const votes = post.votes.filter(vote => vote.id !== _vote.id)

    post.votes = [...votes]
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
