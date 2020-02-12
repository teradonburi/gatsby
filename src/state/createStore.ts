import { combineReducers, createStore as reduxCreateStore, Store, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import client from 'axios'
import user from '../reducers/user'

const thunkWithClient = thunk.withExtraArgument(client)
const reducer = combineReducers({
  user,
})

const initialData = {}
const createStore = (): Store => reduxCreateStore(reducer, initialData, compose(applyMiddleware(thunkWithClient)))

export default createStore