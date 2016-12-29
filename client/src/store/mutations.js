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

  [types.ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification]
  },

  [types.DELETE_NOTIFICATION](state, notification) {
    const notifications = state.notifications
      .filter(_notification => _notification.id !== notification.id)

    state.notifications = [...notifications]
  },

  [types.TOGGLE_AUTH_WIDGET](state) {
    state.isAuthWidgetOpen = !state.isAuthWidgetOpen
  },

  [types.TOGGLE_NOTIFICATION_PANEL](state) {
    state.isNotificationPanelOpen = !state.isNotificationPanelOpen
  },

  [types.ADD_ALERT](state, alert) {
    state.appAlerts = [...state.appAlerts, alert]
  },

  [types.REMOVE_ALERT](state, id) {
    state.appAlerts = state.appAlerts.filter(_alert => _alert.id !== id)
  }
}

export default mutations
