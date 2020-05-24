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
  }
)

export const update = userAsyncFactory<Partial<model.User> & {_id: string}, model.User, Error>(
  'UPDATE',
  (params, dispatch, getState, client: AxiosInstance) => {
    const user = params
    return client
      .put(`/api/users/${params._id}`, user)
      .then(res => res.data)
      .then(user => {
        return user
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
  }
)

export const logout = userAsyncFactory<{}, void, Error>(
  'LOGOUT',
  () => {
    deleteUser()
    return
  }
)

export const load = userAsyncFactory<{_id: string}, model.User, Error>(
  'LOAD',
  (params, dispatch, getState, client: AxiosInstance) => {
    const _id = params._id
    return client
      .get(`/api/users/${_id}`)
      .then(res => res.data)
      .then(user => {
        return user
      })
  }
)
