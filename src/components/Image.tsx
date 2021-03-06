import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img, { FluidObject }  from 'gatsby-image'
import { Maybe, GatsbyImageSharpFluidFragment } from '../../types/graphql-types'

// useStaticQueryでないのでgatsby-plugin-graphql-codegenで生成してくれないから自前で型定義する
type ImageQuery = {
  images: Maybe<{
    edges: Maybe<{
      node: Maybe<{
        relativePath: string;
        name: string;
        childImageSharp: Maybe<{
          fluid: Maybe<GatsbyImageSharpFluidFragment>;
        }>;
      }>;
    }>[];
  }>;
};

// GraphQLのクエリ引数には何も指定しない！
const imageQuery = graphql`
  query {
    images: allFile {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

// 画像ファイルパスをプロパティに取るようなコンポーネントを定義
const Image = ({ filename, className, style }: {filename: string; className?: string; style?: React.CSSProperties}): JSX.Element => (

  // ページじゃないコンポーネントでもGraphQLが使えるように
  // StaticQueryタグを使う
  <StaticQuery
    query={imageQuery}
    // 全画像情報がdataに代入されている
    render={(data: ImageQuery): JSX.Element | null => {

      // 指定した画像ファイルパス（コンポーネントのプロパティ）と
      // 一致するgatsby-image用の情報を取得
      let image = null
      if (data && data.images && data.images.edges) {
        image = data.images.edges.find(n => {
          if (!n || !n.node) return false
          return n.node.relativePath.includes(filename)
        })
      }

      if (!image || !image.node || !image.node.childImageSharp) return null

      // Imgタグでgatsby-imageで最適化された画像を表示する
      const fluid = image.node.childImageSharp.fluid
      return <Img fluid={fluid as FluidObject} className={className} style={style} />
    }}
  />
)

export default Image