import React from 'react'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'
import { redux } from 'interface'
import { RouteComponentProps } from '@reach/router'

const PrivateRoute: React.FC<{component: React.ComponentType} & React.ComponentProps<React.ComponentType> & RouteComponentProps> = (props): JSX.Element | null => {
  const { component: Component, location, ...rest } = props
  const user = useSelector((state: {user: redux.User}) => state.user.user)
  if (!user && location?.pathname !== '/app/login') {
    // If we’re not logged in, redirect to the login page.
    navigate('/app/login')
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute