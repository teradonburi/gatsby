import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { load, update, logout } from '../../actions/user'
import { sendSubscription } from '../../actions/webpush'
import { getSignedUploadUrl, uploadFile } from '../../actions/aws'
import { connect, disconnect, receive, send } from '../../libs/websocket'
import { redux } from 'interface'

const UserPage: React.FC<RouteComponentProps> = () => {
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    connect().then(() => {
      receive((data) => {
        console.log(data)
      })
      send({msg: 'hello'})
    })
    if (user) {
      dispatch(sendSubscription())
      dispatch(load({_id: user._id}))
    }
    return (): void => disconnect()
  }, [])

  const onClickLogout = React.useCallback((): void => {
    dispatch(logout())
  }, [])

  const upload = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0]
    if (file && user) {
      dispatch(getSignedUploadUrl({file, path: user._id}))
        .then(data => {
          if (data?.signedUrl) {
            dispatch(uploadFile({file, signedUrl: data.signedUrl}))
              .then(() => dispatch(update({_id: user._id, uploadedImageAt: new Date()})))
          }
        })
    }
  }, [])

  return (
    <div>
      <div style={{marginBottom: 20}}>
        <div>ようこそ、{user?.name}さん</div>
        {user?.email && <div>メールアドレス: {user.email}</div>}
        {user?.thumbnail && <img style={{objectFit: 'contain', maxWidth: 100}} src={user.thumbnail} />}
        <input type='file' onChange={upload} />
      </div>
      <Button variant='contained' color='primary' onClick={onClickLogout}>ログアウト</Button>
    </div>
  )
}

export default UserPage