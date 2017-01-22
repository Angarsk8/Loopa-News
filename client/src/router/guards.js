import store from '../store'

const { dispatch } = store

export function fetchPosts(to, from, next) {
  next()
  dispatch('showLoading')
  dispatch('getPosts')
    .then(() => {
      dispatch('hideLoading')
    })
}

export function fetchLatestPosts(to, from, next) {
  next()
  const fromHomeAndLimited = from.name === 'home' && to.params.limit

  fromHomeAndLimited
    ? dispatch('showFetchingMore')
    : dispatch('showLoading')

  dispatch('getPosts', to.params.limit)
    .then(() => {
      fromHomeAndLimited
        ? dispatch('hideFetchingMore')
        : dispatch('hideLoading')
    })
}

export function fetchPost(to, _, next) {
  next()
  dispatch('showLoading')
  dispatch('getPost', to.params.postId)
    .then(() => {
      dispatch('hideLoading')
    })
}
