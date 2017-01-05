import VueRouter from 'vue-router'
import Home from '../components/Home'
import SubmitForm from '../components/SubmitForm'
import EditForm from '../components/EditForm'
import NotFound from '../components/NotFound'
import PostPage from '../components/PostPage'
import {
  fetchPosts,
  fetchLatestPosts,
  fetchBestPosts,
  fetchPost
} from './guards'

const router = new VueRouter({
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
      name: 'latest',
      path: '/latest/:limit?',
      component: Home,
      beforeEnter: fetchLatestPosts
    },
    {
      name: 'best',
      path: '/best/:limit?',
      component: Home,
      beforeEnter: fetchBestPosts
    },
    {
      name: 'postSubmit',
      path: '/submit',
      component: SubmitForm
    },
    {
      name: 'postPage',
      path: '/post/:postId',
      component: PostPage,
      beforeEnter: fetchPost
    },
    {
      name: 'postEdit',
      path: '/post/:postId/edit',
      component: EditForm,
      beforeEnter: fetchPost
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router;
