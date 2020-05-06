import { Request, Response } from 'express'
import { User } from '../models'
import { responseError } from '../libs/errorCode'
import { model, AuthRequest } from '../../types/interface'

export async function create(req: Request, res: Response): Promise<Response | undefined> {
  const gender = req.body.gender
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  const exist = await User.exists({email})
  if (exist) {
    return responseError(res, 409)
  }

  try {
    const user = await User.create({
      gender,
      name,
      email,
      password,
    })
    return res.json(user)
  } catch (e) {
    return responseError(res, 500, e)
  }

}

export async function login(req: Request, res: Response): Promise<Response | undefined> {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return responseError(res, 400)
  }

  const user: model.User | null = await User.findOne({email, password})
    .select('+token')

  if (!user) {
    return responseError(res, 404)
  }

  return res.json(user)
}

export async function show(req: AuthRequest, res: Response): Promise<Response | undefined> {
  const id = req.params.id
  if (!req.user) {
    return responseError(res, 404)
  }
  if (req.user._id.toString() !== id) {
    return responseError(res, 400)
  }

  const user = await User.findById(id).select('name email')

  return res.json(user)
}