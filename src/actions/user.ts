import actionCreatorFactory from 'typescript-fsa'
import { AxiosInstance } from 'axios'
import { Store } from 'redux'
import { model } from 'interface'
import { setUser, deleteUser } from '../auth/user'

const actionCreator = actionCreatorFactory()

// typescript-fsaで<params,result,error>の型を定義
export const createAction = actionCreator.async<{user: Partial<model.User>}, {user: model.User}, {error: Error}>('user/CREATE')
export const loadAction = actionCreator.async<{}, {user: model.User | null}, {error: Error}>('user/LOAD')

// actionの定義
export function create(user: Partial<model.User>) {
  // clientはaxiosの付与したクライアントパラメータ
  // 非同期処理をPromise形式で記述できる
  return (dispatch: Store['dispatch'], getState: Store['getState'], client: AxiosInstance): Promise<void> => {
    return client
      .post('/api/users/signup', user)
      .then(res => res.data)
      .then(user => {
        setUser(user)
        dispatch(createAction.done({
          params: { user },
          result: { user },
        }))
      })
      .catch(error => {
        dispatch(createAction.failed({params: { user }, error}))
      })
  }
}

export function login(user: Partial<model.User>) {
  return (dispatch: Store['dispatch'], getState: Store['getState'], client: AxiosInstance): Promise<void> => {
    return client
      .post('/api/users/login', user)
      .then(res => res.data)
      .then(user => {
        setUser(user)
        dispatch(loadAction.done({
          params: {},
          result: { user },
        }))
      })
      .catch(error => {
        dispatch(loadAction.failed({params: {}, error}))
      })
  }
}

export function logout() {
  return (dispatch: Store['dispatch']): void => {
    deleteUser()
    dispatch(loadAction.done({
      params: {  },
      result: { user: null },
    }))
  }
}

export function load(id: string) {
  return (dispatch: Store['dispatch'], getState: Store['getState'], client: AxiosInstance): Promise<void> => {
    return client
      .get(`/api/users/${id}`)
      .then(res => res.data)
      .then(user => {
        dispatch(loadAction.done({
          params: {},
          result: { user },
        }))
      })
      .catch(error => {
        dispatch(loadAction.failed({params: {}, error}))
      })
  }
}
