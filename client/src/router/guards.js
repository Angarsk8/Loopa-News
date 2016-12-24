import store from '../store'

export const requireAuth = (to, _from, next) => {
  if (store.state.currentUser) {
    next()
  } else {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  }
}
