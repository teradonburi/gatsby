import { Link } from 'gatsby'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Image from '../components/Image'
import { Maybe } from '../../types/graphql-types'

const Header: React.FC<{siteTitle?: Maybe<string>}> = ({ siteTitle }) => (
  <AppBar position="static">
    <Toolbar>
      <Link
        to='/'
        style={{
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image style={{width: 30, height: 30, marginRight: 8}} filename='gatsby-icon.png' />
        {siteTitle}
      </Link>
    </Toolbar>
  </AppBar>
)

Header.defaultProps = {
  siteTitle: '',
}

export default Header
