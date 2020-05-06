import React from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Image from '../components/Image'

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    maxWidth: 1024,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))

const IndexPage: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout className={classes.root}>
      <SEO title='トップページ' />
      <Image style={{width: 300, height: 300, margin: '10px 0px'}} filename='gatsby-astronaut.png' />
      <Link to='/app/signup'>ユーザ登録</Link>
      <Link to='/app/login'>ログイン</Link>
    </Layout>
  )
}


export default IndexPage
