import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { load, logout } from '../../actions/user'
import { redux } from 'interface'
import { sendSubscription } from '../../libs/webpush'

const UserPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatch()
  const loadUser = bindActionCreators(load, dispatch)
  const logoutUser = bindActionCreators(logout, dispatch)

  React.useEffect(() => {

    if (user) {
      sendSubscription()
      loadUser(user._id)
    }
  }, [])

  const onClickLogout = (): void => {
    logoutUser()
  }

  return (
    <div>
      <div>
        <div>ようこそ、{user?.name}さん</div>
        {user?.email && <div>メールアドレス: {user.email}</div>}
      </div>
      <Button variant='contained' color='primary' onClick={onClickLogout}>ログアウト</Button>
    </div>
  )
}

export default UserPage