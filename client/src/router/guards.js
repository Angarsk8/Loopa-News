import store from '../store'

export const fetchPosts = (to, from, next) => {
  next()
  store.dispatch('showLoading')
  store.dispatch('getPosts', {})
    .then(() => {
      store.dispatch('hideLoading')
    })
}

export const fetchLatestPosts = (to, from, next) => {
  next()
  if(from.name === 'home' && to.params.limit) {
    store.dispatch('showfetchingMore')
    store.dispatch('getPosts', {limit: to.params.limit})
      .then(() => {
        store.dispatch('hidefetchingMore')
      })
  } else {
    store.dispatch('showLoading')
    store.dispatch('getPosts', {limit: to.params.limit})
      .then(() => {
        store.dispatch('hideLoading')
      })
  }
}

export const fetchBestPosts = (to, from, next) => {
  next()
  if(from.name === 'home' && to.params.limit) {
    store.dispatch('showfetchingMore')
    store.dispatch('getPosts', {limit: to.params.limit, by: 'most_upvoted'})
      .then(() => {
        store.dispatch('hidefetchingMore')
      })
  } else {
    store.dispatch('showLoading')
    store.dispatch('getPosts', {limit: to.params.limit, by: 'most_upvoted'})
      .then(() => {
        store.dispatch('hideLoading')
      })
  }
}

export const fetchPost = (to, _, next) => {
  next()
  store.dispatch('showLoading')
  store.dispatch('getPost', to.params.postId)
    .then(() => {
      store.dispatch('hideLoading')
    })
}
