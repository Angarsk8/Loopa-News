import VueRouter from 'vue-router'
import Home from '../components/Home'
import SubmitForm from '../components/SubmitForm'
import EditForm from '../components/EditForm'
import NotFound from '../components/NotFound'
import PostPage from '../components/PostPage'
import {
  requireAuth,
  fetchPosts,
  fetchPost,
} from './guards'

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
    {
      name: 'postSubmit',
      path: '/submit',
      component: SubmitForm
    },
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
    {
      path: '*',
      component: NotFound
    }
  ]
})
