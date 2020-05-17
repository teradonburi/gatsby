import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import SignupPage from '../components/main/SignupPage'
import UserPage from '../components/main/UserPage'
import LoginPage from '../components/main/LoginPage'
import PrivateRoute from '../components/PrivateRoute'
import NotFound from '../components/NotFound'

// アプリケーションメイン、主にランディングページ以外でログイン認証済みのページ群、Router path別にSSGをする必要がない
const App: React.FC = () => (
  <Layout>
    <Router>
      <PrivateRoute path='/app/user' component={UserPage} />
      <SignupPage path='/app/signup' />
      <LoginPage path='/app/login' />
      <NotFound default />
    </Router>
  </Layout>
)

export default App
