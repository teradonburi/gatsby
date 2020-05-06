import { model } from 'interface'
export const isBrowser = (): boolean => typeof window !== 'undefined'

export function getUser(): model.User | null {
  if (!isBrowser()) return null
  return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user') || 'null') : null
}

export function setUser(user: model.User): void {
  if (!isBrowser()) return
  window.localStorage.setItem('user', JSON.stringify(user))
}

export function deleteUser(): void {
  if (!isBrowser()) return
  window.localStorage.removeItem('user')
}