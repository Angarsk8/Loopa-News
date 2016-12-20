import fetch        from 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

const { SCHEME, HOSTNAME } =
  process.env.NODE_ENV == 'production'
  ? {SCHEME: 'https', HOSTNAME: window.location.hostname}
  : {SCHEME: 'http' , HOSTNAME: 'localhost:4000'}

const API_URL = `${SCHEME}://${HOSTNAME}/api`

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

function buildHeaders() {
  const authToken = localStorage.getItem('id_token')
  return { ...defaultHeaders, Authorization: authToken }
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export function httpGet(url) {

  return fetch(url, {
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function httpPost(url, data) {
  const body = JSON.stringify(data)

  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function httpDelete(url) {

  return fetch(url, {
    method: 'delete',
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function setDocumentTitle(title) {
  document.title = `${title} | Microscope`
}

export const REGISTRATION_URL = `${API_URL}/registrations/`
export const SESSION_URL      = `${API_URL}/sessions/`
export const CURRENT_USER_URL = `${API_URL}/current_user/`
