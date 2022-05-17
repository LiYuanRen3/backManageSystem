import { storageLocal } from './storage'

export const setTokenTime = () => {
  storageLocal.setItem(import.meta.env.VITE_TOKEN_TIME, `${Date.now()}`)
}

export const getTokenTime = () => {
  return storageLocal.getItem(import.meta.env.VITE_TOKEN_TIME)
}

export const diffTokenTime = () => {
  let currentTime = Date.now()
  let tokenTime = getTokenTime()
  let tokenTimeValue =
    parseFloat(import.meta.env.VITE_TOKEN_TIME_VALUE) * (1000 * 60 * 60 * 24)

  return currentTime - tokenTime > tokenTimeValue
}
