import VueRouter from 'vue-router'
import Home from '../views/Home'
import SubmitPost from '../views/SubmitPost'
import EditPost from '../views/EditPost'
import NotFound from '../views/NotFound'
import PostPage from '../views/PostPage'
import {
  fetchPosts,
  fetchLatestPosts,
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
      name: 'postSubmit',
      path: '/submit',
      component: SubmitPost
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
      component: EditPost,
      beforeEnter: fetchPost
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router;
