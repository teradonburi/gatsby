import {default as mongoose, MongooseDocument} from 'mongoose'
const Schema = mongoose.Schema
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import mongooseLeanDefaults from 'mongoose-lean-defaults'
import mongooseLeanMethods from 'mongoose-lean-methods'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { model } from '../../types/interface'
import { createHash } from '../libs/hash'
import { secret } from '../config'

const schema = new Schema({
  gender: {type: String, enum: ['male', 'female', 'other']},
  name: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
    validate: {
      validator: (v: string): boolean => validator.isEmail(v),
      message: (props: {value: string}): string => `${props.value}は正しいメールアドレスではありません。`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: function(v: string): string {
      return createHash(v)
    },
  },
  token: {
    type: String,
    select: false,
    validate: {
      validator: (v: string): boolean => validator.isJWT(v),
      message: (): string => '不正なトークンです。',
    },
    default: function(): string {
      return jwt.sign((this as MongooseDocument)._id.toString(), secret)
    },
  },
},
{
  versionKey: false,
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    transform: (doc, user): model.User => {
      delete user.__v
      delete user.password
      return user
    },
  },
})

schema.pre('update', async function(next) {
  this.setOptions({runValidators: true})
  return next()
})
schema.pre('findOneAndUpdate', async function(next) {
  this.setOptions({runValidators: true, new: true})
  return next()
})

schema.virtual('thumbnail').get(function () {
  // TODO:固定じゃなくて変える
  return 'https://avatars1.githubusercontent.com/u/771218?s=460&v=4'
})

schema.plugin(mongooseLeanVirtuals)
schema.plugin(mongooseLeanDefaults)
schema.plugin(mongooseLeanMethods)

export default mongoose.model<model.User>('User', schema)