import * as types from './mutation-types'

const mutations = {
  [types.SHOW_LOADING](state) {
    state.isLoading = true
  },

  [types.HIDE_LOADING](state) {
    state.isLoading = false
  },

  [types.SET_NOTIFICATIONS](state, notifications) {
    state.notifications = notifications
  },

  [types.TOGGLE_AUTH_WIDGET](state) {
    state.isAuthWidgetOpen = !state.isAuthWidgetOpen
  },

  [types.TOGGLE_NOTIFICATION_PANEL](state) {
    state.isNotificationPanelOpen = !state.isNotificationPanelOpen
  },

  [types.ADD_ERROR](state,error) {
    state.appError = error
  },

  [types.REMOVE_ERROR](state) {
    state.appError = null
  }
}

export default mutations
