module.exports = {
  siteMetadata: {
    title: 'Gatsbyサンプル',
    description: 'Gatsbyサイトのサンプルです',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // サイトのアイコン
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`${__dirname}/src/sw.js`),
        // オフラインキャッシュする対象のリソースパターン、画像ウェブフォントにするだけが無難
        globPatterns: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|woff|woff2)$/,
        runtimeCaching: [
          {
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|woff|woff2)$/,
            handler: `StaleWhileRevalidate`, // ネットワーク取得とオフラインキャッシュの参照を並列で行う、ネットワーク取得時にオフラインキャッシュを更新する
          },
        ]
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
      },
      documentPaths: [
        './src/components/Image.tsx',
        './src/components/Header.tsx',
        './src/components/Layout.tsx',
        './node_modules/gatsby-transformer-sharp/**/*.js'
      ],
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    'gatsby-theme-material-ui',
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        // id: "YOUR_GOOGLE_TAGMANAGER_ID"
      }
    },
  ],
  proxy: {
    prefix: "/api",
    url: "http://localhost:8080",
  },
}
