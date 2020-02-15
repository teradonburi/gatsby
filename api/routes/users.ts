import { Request, Response } from 'express'
import { model, route } from '../../types/interface'
import { User } from '../models'

async function index(req: Request, res: Response): Promise<Response | undefined> {
  const users: model.User[] = await User.find().lean({virtuals: true})
  const results: route.User[] = users.map(u => ({
    gender: u.gender,
    name: {
      first: u.first,
      last: u.last,
    },
    email: u.email,
    picture: {
      thumbnail: u.thumbnail,
    },
  }))
  return res.json(results)
}

async function create(req: Request, res: Response): Promise<Response | undefined> {
  const user = req.body
  const result = await User.create({
    gender: user.gender,
    first: user.name?.first,
    last: user.name?.last,
    email: user.email,
  })
  return res.json(result)
}

export default {
  index,
  create,
}