import {default as mongoose, MongooseDocument} from 'mongoose'
const Schema = mongoose.Schema
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import mongooseLeanDefaults from 'mongoose-lean-defaults'
import mongooseLeanMethods from 'mongoose-lean-methods'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { createHash } from '../libs/hash'
import { secret } from '../config'
import { model } from 'interface'

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
  return `https://${process.env.S3_BUCKET || test}.s3.ap-northeast-1.amazonaws.com/${this._id}?${Date.now()}`
})

schema.plugin(mongooseLeanVirtuals)
schema.plugin(mongooseLeanDefaults)
schema.plugin(mongooseLeanMethods)

export default mongoose.model<model.User>('User', schema)