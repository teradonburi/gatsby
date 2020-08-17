
# My Qiita posts
[![My Qiita followers](https://qiita-badge.apiapi.app/s/@teradonburi/posts.svg)](http://qiita.com/@teradonburi)
# My Qiita contributions
[![My Qiita contributions](https://qiita-badge.apiapi.app/s/@teradonburi/contributions.svg)](http://qiita.com/@teradonburi)
# My Qiita followers
[![My Qiita followers](https://qiita-badge.apiapi.app/s/@teradonburi/followers.svg)](http://qiita.com/@teradonburi)
                

# Gatsby Full Template(with TypeScript & ESLint)

- TypeScript
- ESLint
- Redux
- Material-UI
- express
- mongoose
- webpush
- websocket

Get starting from 

```
$ gatsby new yourProjectName https://github.com/teradonburi/gatsby.git
$ cd gatsby
$ yarn
$ yarn start
```

## Release
change .env.production to prod server url

```
SERVER=http://localhost:8080
WS_SERVER=http://localhost:8080
NODE_ENV='production'
```

set enviroment variables in config/default.ts with .env or export command

```
export = {
  secret: process.env.SECRET,
  mongoDB: process.env.MONGO_DB,
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
  vapidSecretKey: process.env.VAPID_PRIVATE_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}
```

create VAPID keys (for webpush) by follow command

```
$ npx ts-node api/scripts/webpush.ts
```

release build client sources to public folder

```
$ yarn build
```

production server start

```
$ yarn serve
```