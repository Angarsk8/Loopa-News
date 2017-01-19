import * as types from '../mutation-types'
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
  posts: [],
  pagination: null,
  currentPost: null
}

const getters = {
  postErrors: state => state.postErrors,
  posts: state => state.posts,
  pagination: state => state.pagination,
  currentPost: state => state.currentPost
}

const actions = {
  getPosts({ commit }, limit = 5) {
    return httpGet(`${apiURL}/posts?page_size=${limit}`)
      .then(({ posts, pagination }) => {
        commit(types.SET_POSTS, posts)
        commit(types.SET_POSTS_PAGINATION, pagination)
      })
  },

  getPost({ commit, dispatch }, id) {
    return httpGet(`${apiURL}/posts/${id}`)
      .then(({ post }) => {
        commit(types.SET_CURRENT_POST, post)
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch('addAlert', {
            id: uniqueId('alert_'),
            type: 'danger',
            message: errorJSON.message
          })
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

  deletePost(_, id) {
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

  upvotePost({ dispatch }, vote) {
    return httpPost(`${apiURL}/posts/${vote.post_id}/votes`, { vote })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch('addAlert', {
            id: uniqueId('alert_'),
            type: 'danger',
            message: errorJSON.message
          })
        })
      })
  },

  downvotePost(_, { post_id, voteId }) {
    return httpDelete(`${apiURL}/posts/${post_id}/votes/${voteId}`)
  },

  createComment(_, comment) {
    return httpPost(`${apiURL}/posts/${comment.post_id}/comments`, { comment })
  },

  updateComment(_, comment) {
    const { post_id, id } = comment
    return httpUpdate(`${apiURL}/posts/${post_id}/comments/${id}`, { comment })
  },

  deleteComment(_, { post_id, id }) {
    return httpDelete(`${apiURL}/posts/${post_id}/comments/${id}`)
  },

  clearPostErrors({ commit }){
    commit(types.CLEAR_POST_ERRORS)
  },
}

const mutations = {

  /* START <POSTS MUTATION HANDLERS> */
  [types.SET_POSTS](state, posts) {
    state.posts = posts
  },

  [types.SET_POSTS_PAGINATION](state, pagination) {
    state.pagination = pagination
  },

  [types.ADD_POST](state, post) {
    state.posts = [post, ...state.posts]
  },

  [types.UPDATE_POST](state, post) {
    state.posts = state.posts
      .map(_post => _post.id === post.id ? post : _post)
  },

  [types.DELETE_POST](state, post) {
    state.posts = state.posts.filter(_post => _post.id !== post.id)
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
    post.comments = post.comments
      .filter(_comment => _comment.id !== comment.id)
  },

  [types.DOWNVOTE_POST](state, _vote) {
    const post = state.posts.find(post => post.id === _vote.post_id)
    post.votes =  post.votes.filter(vote => vote.id !== _vote.id)
  },

  [types.UPVOTE_POST](state, vote) {
    const post = state.posts.find(post => post.id === vote.post_id)
    post.votes = [...post.votes, vote]
  },

  [types.INCREMENT_PAGINATION_ENTRIES](state) {
    state.pagination.total_entries += 1
  },

  [types.DECREMENT_PAGINATION_ENTRIES](state) {
    state.pagination.total_entries -= 1
  },
  /* END <POSTS MUTATION HANDLERS> */

  /* START <CURRENT POST MUTATION HANDLERS> */
  [types.SET_CURRENT_POST](state, post) {
    state.currentPost = post
  },

  [types.DELETE_CURRENT_POST](state) {
    state.currentPost = null
  },

  [types.ADD_COMMENT_IN_CURRENT_POST](state, comment) {
    state.currentPost.comments = [...state.currentPost.comments, comment]
  },

  [types.UPDATE_COMMENT_IN_CURRENT_POST](state, comment) {
    state.currentPost.comments = state.currentPost.comments
      .map(_comment => _comment.id === comment.id ? comment : _comment)
  },

  [types.DELETE_COMMENT_IN_CURRENT_POST](state, comment) {
    state.currentPost.comments = state.currentPost.comments
      .filter(_comment => _comment.id !== comment.id)
  },

  [types.UPVOTE_POST_IN_CURRENT_POST](state, vote) {
    state.currentPost.votes = [...state.currentPost.votes, vote]
  },

  [types.DOWNVOTE_POST_IN_CURRENT_POST](state, _vote) {
    state.currentPost.votes =  state.currentPost.votes
      .filter(vote => vote.id !== _vote.id)
  },
  /* END <CURRENT POST MUTATION HANDLERS> */

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
