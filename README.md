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
```

change api/config.js enviroment variables

```
export const secret = process.env.SECRET
export const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
export const vapidSecretKey = process.env.VAPID_PRIVATE_KEY
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