import { Socket } from 'phoenix-elixir'
import router from '../router'
import store from '../store'
import { socketURL } from '../utils'

export const socket = new Socket(socketURL)

export const joinUserChannel = ({ id, jwt }) => {
  const userChannel = socket.channel(`users:${id}`, { token: jwt })

  userChannel.join()
    .receive('ok', _ => {
      console.log('User joined succesfully')
    })

  userChannel.on('user:notifications', ({ ok }) => {
    store.dispatch('getNotifications')
  })

  return userChannel
}

export const joinPostsChannel = () => {
  const postsChannel = socket.channel('posts:lobby')

  postsChannel.join()
    .receive('ok', _ => {
      console.log('joined succesfully to posts:lobby')
    })

  postsChannel.on('posts:refresh', ({ user_id, post_id, type }) => {

    const {
      session: { currentUser },
      route:   { params }
    } = store.state

    store.dispatch('getPosts')

    if(params.postId === post_id) {
      if(type === 'delete') {
        if((currentUser && currentUser.id) !== user_id) {
          store.dispatch('addAppError', 'The post you were looking at was deleted')
        }
        router.push('/')
      } else{
        store.dispatch('getPost', post_id)
          .then(() => {
            store.dispatch('getComments', post_id)
          })
      }
    }
  })

  return postsChannel
}

socket.connect()
