import fetch from 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

const { socketScheme, scheme, hostname } =
  process.env.NODE_ENV === 'production'
  ? { socketScheme: 'wss'
    , scheme: 'https'
    , hostname: window.location.hostname }
  : { socketScheme: 'ws'
    , scheme: 'http'
    , hostname: 'localhost:4000' }

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function buildHeaders() {
  const authToken = localStorage.getItem('id_token')

  return new Headers(Object.assign({}, defaultHeaders, {
    Authorization: authToken
  }))
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const apiURL    = `${scheme}://${hostname}/api`
export const socketURL = `${socketScheme}://${hostname}/socket`

export async function httpGet(url) {
  const response = await fetch(url, {
    headers: buildHeaders()
  })

  return checkStatus(response).json()
}

export async function httpPost(url, data) {
  const body = JSON.stringify(data)
  const response = await fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body
  })

  return checkStatus(response).json()
}

export async function httpDelete(url) {
  const response = await fetch(url, {
    method: 'delete',
    headers: buildHeaders()
  })

  return checkStatus(response).json()
}

export async function httpUpdate(url, data) {
  const body = JSON.stringify(data)
  const response = await fetch(url, {
    method: 'put',
    headers: buildHeaders(),
    body: body
  })

  return checkStatus(response).json()
}
