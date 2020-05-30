/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
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

const Layout: React.FC<{className?: string; children: React.ReactNode}> = ({ className, children }) => {
  const data: SiteTitleQuery = useStaticQuery(titleQuery)

  return (
    <>
      <Header siteTitle={data?.site?.siteMetadata?.title} />
      <main className={className}>{children}</main>
    </>
  )
}

export default Layout
