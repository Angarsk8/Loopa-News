const { SCHEME, HOSTNAME } =
  process.env.NODE_ENV == 'production'
  ? {SCHEME: 'https', HOSTNAME: window.location.hostname}
  : {SCHEME: 'http' , HOSTNAME: 'localhost:4000'}

const API_URL          = `${SCHEME}://${HOSTNAME}/api`
const REGISTRATION_URL = `${API_URL}/registrations/`
const SESSION_URL      = `${API_URL}/sessions/`
const CURRENT_USER_URL = `${API_URL}/current_user/`

export default {

  user: {
    authenticated: false
  },

  login (context, creds) {
    context.$http.post(SESSION_URL, creds)
      .then(({ body: { user, jwt } }) => {
        window.localStorage.setItem('id_token', jwt)
        this.user.authenticated = true
      }, ({ body: { message } }) => {
        context.error = message
      })
  },

  getCurrentUser (context) {
    context.$http.get(CURRENT_USER_URL, {headers: this.getAuthHeader()})
      .then(({ body: { user } }) => {
        context.user = user
      }, error => {
        console.log(error)
      })
  },

  signup (context, creds) {
    context.$http.post(REGISTRATION_URL, creds)
      .then(({ body: { user, jwt } }) => {
        window.localStorage.setItem('id_token', jwt)
        this.user.authenticated = true
      }, ({ body: { errors } }) => {
        context.errors = errors
      })
  },

  logout (context, options) {
    context.$http.delete(SESSION_URL, options)
      .then(_ => {
        window.localStorage.removeItem('id_token')
        this.user.authenticated = false
      }, error => {
        console.log(error.message)
      })
  },

  checkAuth() {
    this.user.authenticated = localStorage.getItem('id_token') ? true : false
  },

  getAuthHeader () {
    return {
      'Authorization': window.localStorage.getItem('id_token')
    }
  }
}
