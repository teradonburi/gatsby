import path from 'path'
import { Request, Response, NextFunction } from 'express'
import express from 'express'
import bodyParser from 'body-parser'
import {default as mongoose} from 'mongoose'
mongoose.connect('mongodb://localhost/gatsby-template', { useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

// APIエラーハンドリング
const wrap = (fn: (req: Request, res: Response, next?: NextFunction) => Promise<Response | undefined>) => (req: Request, res: Response, next?: NextFunction): Promise<Response | undefined> => fn(req, res, next).catch((err: Error) => {
  console.error(err)
  if (!res.headersSent) {
    return res.status(500).json({message: 'Internal Server Error'})
  }
})
// NodeJSエラーハンドリング
process.on('uncaughtException', (err) => console.error(err))
process.on('unhandledRejection', (err) => console.error(err))

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

import { users } from './routes'

app.use(
  '/api/users',
  express.Router()
    .get('/', wrap(users.index))
    .post('/', wrap(users.create))
)

// サーバを起動
app.listen(8080, () => console.log('Server started http://localhost:8080'))