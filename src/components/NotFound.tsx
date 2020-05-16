import React from 'react'
import { RouteComponentProps } from '@reach/router'

const NotFound: React.FC<RouteComponentProps> = () => (
  <div>
    <h1>NOT FOUND</h1>
    <p>お探しのページは残念ながら見つかりませんでした。</p>
  </div>
)

export default NotFound