import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useSelector } from 'react-redux'
import { useDispatchThunk } from '../hooks/useDispatchThunk'
import Button from '@material-ui/core/Button'
import { load, logout } from '../../actions/user'
import { sendSubscription } from '../../actions/webpush'
import { getSignedUrl, uploadFile } from '../../actions/aws'
import { connect, disconnect, receive, send } from '../../libs/websocket'
import { redux } from 'interface'

const UserPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatchThunk()

  React.useEffect(() => {
    connect().then(() => {
      receive((data) => {
        console.log(data)
      })
      send({msg: 'hello'})
    })
    if (user) {
      dispatch(sendSubscription())
      dispatch(load({id: user._id}))
    }
    return (): void => disconnect()
  }, [])

  const onClickLogout = React.useCallback((): void => {
    dispatch(logout())
  }, [])

  const upload = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0]
    if (file) {
      dispatch(getSignedUrl({file}))
        .then(data => {
          if (data.signedUrl) {
            dispatch(uploadFile({file, signedUrl: data.signedUrl}))
          }
        })
    }
  }, [])

  return (
    <div>
      <div style={{marginBottom: 20}}>
        <div>ようこそ、{user?.name}さん</div>
        {user?.email && <div>メールアドレス: {user.email}</div>}
        <input type='file' onChange={upload} />
      </div>
      <Button variant='contained' color='primary' onClick={onClickLogout}>ログアウト</Button>
    </div>
  )
}

export default UserPage