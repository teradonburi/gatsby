import React from 'react'
import { RouteComponentProps } from '@reach/router'

const NotFound: React.FC<RouteComponentProps> = () => {
  const [isMount, setIsMount] = React.useState(false)

  React.useEffect(() => {
    setIsMount(true)
  }, [])

  // expressでホスティングしてる際、defaultパスのレンダリング結果が一瞬出てしまうのでビルド時生成htmlへの出力をしない。
  if (!isMount) {
    return null
  }

  return (
    <div>
      <h1>NOT FOUND</h1>
      <p>お探しのページは残念ながら見つかりませんでした。</p>
    </div>
  )
}

export default NotFound