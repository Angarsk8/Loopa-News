import * as types from './mutation-types'
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

  deleteNotification({ commit, dispatch }, id){
    return httpDelete(`${apiURL}/notifications/${id}`)
  },

  addAlert({ commit }, alert) {
    commit(types.ADD_ALERT, alert)
    setTimeout(() => {
      commit(types.REMOVE_ALERT, alert.id)
    }, 5000)
  },

  removeAlert({ commit }, id) {
    commit(types.REMOVE_ALERT, id)
  }
}

export default actions
