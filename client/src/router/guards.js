import store from '../store'

export const fetchPosts = (to, from, next) => {
  next()
  store.dispatch('showLoading')
  store.dispatch('getPosts')
    .then(() => {
      store.dispatch('hideLoading')
    })
}

export const fetchLatestPosts = (to, from, next) => {
  next()
  const fromHomeAndLimited = from.name === 'home' && to.params.limit

  fromHomeAndLimited
    ? store.dispatch('showFetchingMore')
    : store.dispatch('showLoading')

  store.dispatch('getPosts', to.params.limit)
    .then(() => {
      fromHomeAndLimited
        ? store.dispatch('hideFetchingMore')
        : store.dispatch('hideLoading')
    })
}

export const fetchPost = (to, _, next) => {
  next()
  store.dispatch('showLoading')
  store.dispatch('getPost', to.params.postId)
    .then(() => {
      store.dispatch('hideLoading')
    })
}
