import VueRouter from 'vue-router'
import Home from '../components/Home'
import SubmitForm from '../components/SubmitForm'
import EditForm from '../components/EditForm'
import NotFound from '../components/NotFound'
import PostPage from '../components/PostPage'
import store from '../store'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'newPosts',
      path: '/new/:postLimit?',
      component: Home
    },
    {
      name: 'postSubmit',
      path: '/submit',
      component: SubmitForm
    },
    {
      name: 'postPage',
      path: '/post/:id',
      component: PostPage
    },
    {
      name: 'postEdit',
      path: '/post/:id/edit',
      component: EditForm
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(store.state.session.currentUser) {
    store.dispatch('getNotifications').then(() => { next() })
  }else {
    next()
  }
})

export default router;
