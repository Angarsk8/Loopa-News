import store from './store'
import { socket, joinPostsChannel } from './channel'

export default function init() {

  /* Connect the socket to establish the WS connection with the server */
  socket.connect()

  /* Join the :posts channel to receive RT messages related to the posts */
  joinPostsChannel()

  /* Fetch and Set the current user in case there's one */
  if (localStorage.getItem('id_token')) {
    store.dispatch('currentUser')
  }

  /* Fetch the initial data (posts) from the server */
  store.dispatch('showLoading')
  store.dispatch('getPosts')
    .then(() => {
      store.dispatch('hideLoading')
    })

  /* Register "global" event listener on the HTML Document */
  document.addEventListener('click', event => {
    if(store.getters.isAuthWidgetOpen) {
      store.dispatch('toggleAuthWidget', event)
    }
    if(store.getters.isNotificationPanelOpen) {
      store.dispatch('toggleNotificationPanel', event)
    }
  })
}
