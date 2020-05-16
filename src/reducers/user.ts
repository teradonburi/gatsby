import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loadAction, createAction } from '../actions/user'
import { model } from 'interface'
import { getUser } from '../storage/user'

const initialState: {user?: model.User | null} = {
  user: getUser(),
}

const reducer = reducerWithInitialState(initialState)
  .case(createAction.done, (state, data) => ({...state, user: data.result.user}))
  .case(createAction.failed, (state, data) => ({...state, error: data.error}))
  .case(loadAction.done, (state, data) => ({...state, user: data.result.user}))
  .case(loadAction.failed, (state, data) => ({...state, error: data.error}))

export default reducer