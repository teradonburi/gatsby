import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title='404: Not found' />
    <h1>NOT FOUND</h1>
    <p>お探しのページは残念ながら見つかりませんでした。</p>
  </Layout>
)

export default NotFoundPage
