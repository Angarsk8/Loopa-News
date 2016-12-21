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

export const fetchPost = (to, _from, next) => {
  store.dispatch('GET_POST', to.params.id)
    .then(() => {
      next()
    })
}

export const fetchPosts = (_to, _from, next) => {
  store.dispatch('GET_POSTS')
    .then(() => {
      next()
    })
}
