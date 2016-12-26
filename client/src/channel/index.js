import { Socket } from 'phoenix-elixir'
import router from '../router'
import store from '../store'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export const socket = new Socket('ws://localhost:4000/socket')

export const joinUserChannel = ({ id, jwt }) => {
  const userChannel = socket.channel(`users:${id}`, { token: jwt })

  userChannel.join()
    .receive('ok', _ => {
      console.log("User joined succesfully")
    })

  userChannel.on("user:notifications", ({ ok }) => {
    store.dispatch('getNotifications')
  })

  return userChannel
}

export const joinPostsChannel = () => {
  const postsChannel = socket.channel('posts:lobby')

  postsChannel.join()
    .receive('ok', _ => {
      console.log("joined succesfully to posts:lobby")
    })

  postsChannel.on('posts:refresh', ({ user_id, post_id, type }) => {
    if(store.state.session.currentUser.id !== user_id){
      store.dispatch('getPosts')
      if(store.state.route.params.postId === post_id) {
        if(type === 'delete') {
          store.dispatch('addAppError', "The post you were looking at was deleted")
          router.push('/')
        } else{
          store.dispatch('getPost', post_id)
        }
      }
    }
  })

  return postsChannel
}

socket.connect()
