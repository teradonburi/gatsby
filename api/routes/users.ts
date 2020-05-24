import { Response } from 'express'
import { User } from '../models'
import { responseError } from '../libs/errorCode'
import { body, validationResult } from 'express-validator'
import { model, RequestEx, AuthRequest } from 'interface'

type createKeys = 'validate' | 'create'
type createAPI = (req: RequestEx, res: Response) => Promise<Response | createKeys>

export const create: { [key in createKeys]: createAPI } = {
  validate: async function(req: RequestEx, res: Response): Promise<Response | createKeys> {
    await body('gender').isString().run(req)
    await body('name').isString().run(req)
    await body('email').isEmail().run(req)
    await body('password').isString().isLength({ min: 6 }).run(req)

    const result = validationResult(req)
    if (!result.isEmpty()) {
      return responseError(res, 400, {message: result.array()})
    }

    const email = req.body.email
    const exist = await User.exists({email})
    if (exist) {
      return responseError(res, 409)
    }

    return 'create'
  },
  create: async function(req: RequestEx, res: Response): Promise<Response | createKeys> {
    const { gender, name, email, password } = req.body

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
  },
}

type updateKeys = 'validate' | 'update'
type updateAPI = (req: RequestEx, res: Response) => Promise<Response | updateKeys>

export const update: { [key in updateKeys]: updateAPI } = {
  validate: async function(req: RequestEx): Promise<Response | updateKeys> {

    // exclude not related field to model
    const update: Partial<model.User> = {}
    for (const key in User.schema.obj) {
      if (req.body[key]) {
        update[key as keyof model.User] = req.body[key]
      }
    }
    req.data = update

    return 'update'
  },
  update: async function(req: RequestEx, res: Response): Promise<Response | updateKeys> {

    if (req.data.uploadedImageAt) {
      // クライアントの時間は信用しない
      req.data.uploadedImageAt = new Date()
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
      return res.json(user)
    } catch (e) {
      return responseError(res, 500, e)
    }
  },
}

export async function login(req: RequestEx, res: Response): Promise<Response> {
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

export async function show(req: AuthRequest, res: Response): Promise<Response> {
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