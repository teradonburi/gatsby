import { isBrowser } from './util'

export function getStorage(key: string): unknown {
  if (!isBrowser()) return null
  return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key) || 'null') : null
}

export function setStorage(key: string, obj: unknown): void {
  if (!isBrowser()) return
  window.localStorage.setItem(key, JSON.stringify(obj))
}

export function deleteStorage(key: string): void {
  if (!isBrowser()) return
  window.localStorage.removeItem(key)
}