/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'
import { SiteTitleQuery } from '../../types/graphql-types'

const titleQuery = graphql`
  query SiteTitle {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout: React.FC<{children: JSX.Element[] | JSX.Element}> = ({ children }) => {
  const data: SiteTitleQuery = useStaticQuery(titleQuery)

  return (
    <>
      <Header siteTitle={data?.site?.siteMetadata?.title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
