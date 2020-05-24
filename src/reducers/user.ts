import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { create, load, login, logout } from '../actions/user'
import { getUser } from '../storage/user'
import { model } from 'interface'

const initialState: {user: Partial<model.User> | null} = {
  user: getUser(),
}

const reducer = reducerWithInitialState(initialState)
  .case(create.async.done, (state, data) => ({user: {...state.user, ...data.result}}))
  .case(login.async.done, (state, data) => ({user: {...state.user, ...data.result}}))
  .case(logout.async.done, () => ({user: null}))
  .case(load.async.done, (state, data) => ({user: {...state.user, ...data.result}}))

export default reducer