import VueRouter from 'vue-router'

import Home from './components/Home'
import SubmitForm from './components/SubmitForm'
import NotFound from './components/NotFound'
import PostPage from './components/PostPage'

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/new/:postLimit?', component: Home },
    { path: '/submit', component: SubmitForm },
    { path: '/post/:id', component: PostPage },
    { path: '/post/:id/edit', component: SubmitForm },
    { path: '*', component: NotFound }
  ]
})
