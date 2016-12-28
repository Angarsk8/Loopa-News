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

  addAppError({ commit }, error) {
    commit(types.ADD_ERROR, error)
    setTimeout(() => { commit(types.REMOVE_ERROR) }, 4000)
  }
}

export default actions
