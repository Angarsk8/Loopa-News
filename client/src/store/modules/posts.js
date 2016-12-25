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
  post: null,
  comments: null
}

const getters = {
  post: state => state.post,
  posts: state => state.posts,
  postErrors: state => state.postErrors,
  comments: state => state.comments,
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
      .then(() => {
        dispatch('getComments', id)
      })
  },

  createPost({ commit }, post) {
    return httpPost(`${apiURL}/posts`, { post })
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

  deletePost({ commit }, id) {
    return httpDelete(`${apiURL}/posts/${id}`)
      .then((_) => {
        router.push('/')
      })
  },

  updatePost({ commit }, post) {
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

  upvotePost({ commit, dispatch }, vote) {
    return httpPost(`${apiURL}/posts/${vote.post_id}/votes`, { vote })
  },

  getComments({ commit, dispatch }, id) {
    return httpGet(`${apiURL}/posts/${id}/comments`)
      .then(({ comments }) => {
        commit(types.SET_COMMENTS, comments)
      })
  },

  createComment({ commit, dispatch }, comment) {
    return httpPost(`${apiURL}/posts/${comment.post_id}/comments`, { comment })
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

  [types.SET_COMMENTS](state, comments) {
    state.comments = comments
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
