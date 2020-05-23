import { pathToRegexp } from 'path-to-regexp'
import path from 'path'
import fs from 'fs'
import http from 'http'
import { Request, Response, NextFunction } from 'express'
import express from 'express'
const app = express()
const server = new http.Server(app)

import {default as mongoose} from 'mongoose'
mongoose.connect('mongodb://localhost/gatsby-template', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
import { User } from './models'

import * as websocket from './websocket'

type API = (req: Request, res: Response, next?: NextFunction) => Promise<Response | undefined>

// APIエラーハンドリング
const wrap = (fn: API | API[]) => async (req: Request, res: Response, next?: NextFunction): Promise<Response | undefined> => {
  if (Array.isArray(fn)) {
    for (const f of fn) {
      try {
        if (res.headersSent) return
        await f(req, res, next)
      } catch (error) {
        console.error(error)
        if (!res.headersSent) {
          return res.status(500).json({message: 'Internal Server Error'})
        }
      }
    }
    return
  }
  return fn(req, res, next).catch((err: Error) => {
    console.error(err)
    if (!res.headersSent) {
      return res.status(500).json({message: 'Internal Server Error'})
    }
  })
}


// NodeJSエラーハンドリング
process.on('uncaughtException', (err) => console.error(err))
process.on('unhandledRejection', (err) => console.error(err))


import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
const authenticate = passport.authenticate('bearer', {session: false})
const partialAuth = passport.authenticate(['bearer', 'anonymous'], {session: false})

import { secret } from './config'
passport.use(new BearerStrategy(function(token, done) {
  // 認証APIの場合はここを通るよ
  jwt.verify(token, secret, async function(err) {
    if (err) return done(err) // 不正なトークン

    const user = await User.findOne({token})
    if (!user) return done(null, false) // ユーザが見つからない
    return done(null, user) // 認証OK
  })
}))
passport.use(new AnonymousStrategy())

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

import { users, webpush } from './routes'

app.use(
  '/api/users',
  express.Router()
    .post('/signup', wrap(users.create))
    .post('/login', wrap(users.login))
)

app.use(
  '/api/users',
  authenticate,
  express.Router()
    .get('/:id', wrap(users.show))
)

app.use(
  '/api/webpush',
  partialAuth,
  express.Router()
    .get('/key', wrap(webpush.getWebPushKey))
    .post('/subscription', wrap(webpush.createSubscription))
)

const io = websocket.listen(server)
app.set('socketio', io)

app.use(express.static(path.join(__dirname, '../public')))
// 本番時はexpressでホスティングするため、React AppのRouting情報で正しいHTTPレスポンスコードを返す必要がある
if (process.env.NODE_ENV === 'production') {
  const routes = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../gatsby-express.json'), 'utf-8'))
  app.get('*', wrap(async (req: Request, res: Response): Promise<Response | undefined>  => {
    // React Appのルーティングに存在していないページの場合は404レスポンスコードを返す
    const page = routes.pages.find((p: {path: string; matchPath?: string}) =>
      pathToRegexp(p.path).exec(req.path)
      || p.matchPath ? pathToRegexp((p.matchPath || '').replace('*', '(.*)')).exec(req.path) : false
    )
    if (page) {
      res.sendFile(path.join(__dirname + '/../public/' + page.path + 'index.html'))
    } else {
      res.status(404).sendFile(path.join(__dirname + '/../public/index.html'))
    }
    return
  }))
}

// サーバを起動
server.listen(process.env.PORT || 8080, () => console.log('Server started http://localhost:8080'))
