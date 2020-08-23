import { ThunkDispatch } from 'redux-thunk'
import { AxiosInstance } from 'axios'
import { Action } from 'redux'

declare module 'react-redux' {
  function useDispatch(): ThunkDispatch<unknown, AxiosInstance, Action>;
}
