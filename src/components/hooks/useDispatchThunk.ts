import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AxiosInstance } from 'axios'
import { Action } from 'redux'

export function useDispatchThunk(): ThunkDispatch<unknown, AxiosInstance, Action> {
  return useDispatch<ThunkDispatch<unknown, AxiosInstance, Action>>()
}