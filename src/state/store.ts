import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { isBrowser } from '../libs/util'
import { logout } from '../actions/user'
import user from '../reducers/user'
import { getUser } from '../storage/user'

const client = axios.create({baseURL: process.env.SERVER})
const thunkWithClient = thunk.withExtraArgument(client)
const reducer = combineReducers({
  user,
})

interface WindowEx extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}
declare let window: WindowEx

const composeEnhancers = isBrowser() && process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const initialData = {}
const store = reduxCreateStore(reducer, initialData, composeEnhancers(applyMiddleware(thunkWithClient)))

client.interceptors.request.use(req => {
  const token = getUser()?.token

  if (token) {
    // ieのリクエストキャッシュ対策
    document.execCommand && document.execCommand('ClearAuthenticationCache', false)
    req.url += (req.url?.indexOf('?') == -1 ? '?' : '&') + '_=' + Date.now()
    // 認証トークン
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
}, err => Promise.reject(err))

client.interceptors.response.use(res => res, err => {
  if (axios.isCancel(err)) {
    return Promise.reject({code: 999, message: 'cancel'})
  }
  if (err.response && err.response.status && err.response.status === 401) {
    // connectしていないので明示的にdispatchを渡す
    store.dispatch(logout)
  }
  return Promise.reject(err.response || {})
})

export default store