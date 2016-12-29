import { Socket } from 'phoenix-elixir'
import router from '../router'
import store from '../store'
import { socketURL } from '../utils'
import uniqueId from 'uniqid'
import * as types from '../store/mutation-types'

export const socket = new Socket(socketURL)

export const joinUserChannel = ({ id, jwt }) => {
  const userChannel = socket.channel(`users:${id}`, { token: jwt })

  userChannel.join()
    .receive('ok', _ => {
      console.log('User joined succesfully')
    })

  userChannel.on('user:add_notification', notification => {
    store.commit(types.ADD_NOTIFICATION, notification)
    store.dispatch('addAlert', {
      id: uniqueId('alert_'),
      type: 'info',
      notification: notification,
      message: `${notification.username} commented in your post`
    })
  })

  userChannel.on('user:delete_notification', _ => {
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

  postsChannel.on('posts:add_post', post => {
    store.commit(types.ADD_POST, post)
  })

  postsChannel.on('posts:update_post', post => {
    store.commit(types.UPDATE_POST, post)
  })

  postsChannel.on('posts:delete_post', post => {
    const { currentUser, routeParams } = store.getters
    if(routeParams.postId == post.id) {
      if ((currentUser && currentUser.id) !== post.user_id) {
        store.dispatch('addAlert', {
          id: uniqueId('alert_'),
          type: 'danger',
          message: 'The post you were looking was deleted by its author 😓'
        })
      }
      router.push('/')
    }
    store.commit(types.DELETE_POST, post)
  })

  postsChannel.on('posts:add_comment', comment => {
    store.commit(types.ADD_COMMENT, comment)
  })

  postsChannel.on('posts:update_comment', comment => {
    store.commit(types.UPDATE_COMMENT, comment)
  })

  postsChannel.on('posts:delete_comment', comment => {
    store.commit(types.DELETE_COMMENT, comment)
  })

  postsChannel.on('posts:upvote_post', vote => {
    store.commit(types.UPVOTE_POST, vote)
  })

  postsChannel.on('posts:downvote_post', vote => {
    store.commit(types.DOWNVOTE_POST, vote)
  })

  return postsChannel
}

// socket.connect()
