import * as types from './mutation-types'
import router from '../router'
import {
  apiURL,
  httpGet,
  httpPost,
  httpDelete
} from '../utils'

const actions = {
  showLoading({ commit }) {
    commit(types.SHOW_LOADING)
  },

  hideLoading({ commit }) {
    commit(types.HIDE_LOADING)
  },

  toggleAuthWidget({ commit }, event) {
    if(event){
      event.stopPropagation()
    }
    commit(types.TOGGLE_AUTH_WIDGET)
  },

  toggleNotificationPanel({ commit }, event) {
    if(event){
      event.stopPropagation()
    }
    commit(types.TOGGLE_NOTIFICATION_PANEL)
  },

  getNotifications({ commit }){
    return httpGet(`${apiURL}/notifications`)
      .then(({ notifications }) => {
        commit(types.SET_NOTIFICATIONS, notifications)
      })
  },

  createNotification({ commit }, notification){
    return httpPost(`${apiURL}/notifications`, { notification })
  },

  deleteNotification({ commit, dispatch }, notification){
    const { id, post_id }  = notification
    return httpDelete(`${apiURL}/notifications/${id}`)
      .then(() => {
        dispatch('toggleNotificationPanel')
        router.push(`/post/${post_id}`)
      })
  }
}

export default actions
