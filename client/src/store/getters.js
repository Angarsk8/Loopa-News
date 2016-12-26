const getters = {
  isLoading: state => state.isLoading,
  notifications: state => state.notifications,
  isAuthWidgetOpen: state => state.isAuthWidgetOpen,
  isNotificationPanelOpen: state => state.isNotificationPanelOpen,
  routeParams: state => state.route.params,
  appError: state => state.appError
}

export default getters
