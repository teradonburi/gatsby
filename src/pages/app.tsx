import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import SignupPage from '../components/main/SignupPage'
import UserPage from '../components/main/UserPage'
import LoginPage from '../components/main/LoginPage'
import PrivateRoute from '../components/PrivateRoute'
import NotFoundPage from './404'

const App: React.FC = () => (
  <Layout>
    <Router>
      <PrivateRoute path='/app/user' component={UserPage} />
      <SignupPage path='/app/signup' />
      <LoginPage path='/app/login' />
      <NotFoundPage />
    </Router>
  </Layout>
)

export default App
