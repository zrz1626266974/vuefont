import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenId = 'User-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setIdToken (token) {
  return Cookies.set(TokenId, token)
}

export function getIdToken () {
  return Cookies.get(TokenId)
}
