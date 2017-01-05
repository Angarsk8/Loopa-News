import fetch from 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

const { SOCKET_SCHEME, SCHEME, HOSTNAME } =
  process.env.NODE_ENV === 'production'
  ? { SOCKET_SCHEME: 'ws'
    , SCHEME: 'http'
    , HOSTNAME: 'localhost:4000' }
  : { SOCKET_SCHEME: 'ws'
    , SCHEME: 'http'
    , HOSTNAME: 'localhost:4000' }
// const { SOCKET_SCHEME, SCHEME, HOSTNAME } =
//   process.env.NODE_ENV === 'production'
//   ? { SOCKET_SCHEME: 'wss'
//     , SCHEME: 'https'
//     , HOSTNAME: window.location.hostname }
//   : { SOCKET_SCHEME: 'ws'
//     , SCHEME: 'http'
//     , HOSTNAME: 'localhost:4000' }

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

function buildHeaders() {
  const authToken = localStorage.getItem('id_token')
  return { ...defaultHeaders, Authorization: authToken }
}

export const apiURL = `${SCHEME}://${HOSTNAME}/api`

export const socketURL = `${SOCKET_SCHEME}://${HOSTNAME}/socket`

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

export function httpUpdate(url, data) {
  const body = JSON.stringify(data)

  return fetch(url, {
    method: 'put',
    headers: buildHeaders(),
    body: body,
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function setDocumentTitle(title) {
  document.title = `${title} | Microscope`
}
