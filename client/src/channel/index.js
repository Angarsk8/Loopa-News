import { Socket } from 'phoenix-elixir'
import store from '../store'

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

  postsChannel.on('posts:refresh', ({ id }) => {
    store.dispatch('getPosts')
    store.dispatch('getPost', id)
  })

  return postsChannel
}

socket.connect()
