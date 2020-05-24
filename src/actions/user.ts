import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { AxiosInstance } from 'axios'
import { setUser, deleteUser } from '../storage/user'
import { model } from 'interface'

const userFactory = actionCreatorFactory('USER')
const userAsyncFactory = asyncFactory(userFactory)

// actionの定義
export const create = userAsyncFactory<{ gender: string; name: string; email: string; password: string }, model.User, Error>(
  'CREATE',
  (params, dispatch, getState, client: AxiosInstance) => {
    const user = params
    return client
      .post('/api/users/signup', user)
      .then(res => res.data)
      .then(user => {
        setUser(user)
        return user
      })
      .catch(error => {
        console.error(error)
        return {error}
      })
  }
)

export const login = userAsyncFactory<{ email: string; password: string }, model.User | null, Error>(
  'LOGIN',
  (params, dispatch, getState, client: AxiosInstance) => {
    const user = params
    return client
      .post('/api/users/login', user)
      .then(res => res.data)
      .then(user => {
        setUser(user)
        return user
      })
      .catch(error => {
        // dispatch(loadAction.failed({params: {}, error}))
        console.error(error)
        return error
      })
  }
)

export const logout = userAsyncFactory<{}, null, Error>(
  'LOGOUT',
  () => {
    deleteUser()
    return null
  }
)

export const load = userAsyncFactory<{id: string}, model.User, Error>(
  'LOAD',
  (params, dispatch, getState, client: AxiosInstance) => {
    const id = params.id
    return client
      .get(`/api/users/${id}`)
      .then(res => res.data)
      .then(user => {
        setUser(user)
        return user
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
)
