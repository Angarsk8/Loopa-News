import VueRouter from 'vue-router'
import Home from './components/Home'
import SubmitForm from './components/SubmitForm'
import EditForm from './components/EditForm'
import NotFound from './components/NotFound'
import PostPage from './components/PostPage'
import store from './store'

const requireAuth = (to, _from, next) => {
  if (store.state.currentUser) {
    next()
  } else {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  }
}

const fetchPost = (to, _from, next) => {
  store.dispatch('GET_POST', to.params.id)
    .then(() => {
      next()
    })
}

const fetchPosts = (_to, _from, next) => {
  store.dispatch('GET_POSTS')
    .then(() => {
      next()
    })
}

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      beforeEnter: fetchPosts
    },
    {
      name: 'newPosts',
      path: '/new/:postLimit?',
      component: Home,
      beforeEnter: fetchPosts
    },
    { name: 'postSubmit', path: '/submit', component: SubmitForm },
    {
      name: 'postPage',
      path: '/post/:id',
      component: PostPage,
      beforeEnter: fetchPost
    },
    {
      name: 'postEdit',
      path: '/post/:id/edit',
      component: EditForm,
      beforeEnter: fetchPost
    },
    { path: '*', component: NotFound }
  ]
})
