const getters = {
  isLoading: state => state.isLoading,
  notifications: state => state.notifications,
  isAuthWidgetOpen: state => state.isAuthWidgetOpen,
  isNotificationPanelOpen: state => state.isNotificationPanelOpen,
  routeParams: state => state.route.params,
  appAlerts: state => state.appAlerts
}

export default getters
