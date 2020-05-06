import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { logout } from '../../actions/user'
import { redux } from 'interface'

const UserPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatch()
  const logoutUser = bindActionCreators(logout, dispatch)

  const onClickLogout = (): void => {
    logoutUser()
  }

  return (
    <div>
      {user && <div>ようこそ、{user.name}さん</div>}
      <Button variant='contained' color='primary' onClick={onClickLogout}>ログアウト</Button>
    </div>
  )
}

export default UserPage