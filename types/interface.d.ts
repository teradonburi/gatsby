import { Document } from 'mongoose'
import express from 'express'

export namespace model {
  export interface User extends Document {
    gender: string;
    name: string;
    email: string;
    password: string;
    token: string;
    thumbnail?: string;
  }
}

export type AuthRequest<T = {}> = Omit<express.Request, 'body'> & {
  user?: models.User.Model & MongoDocument;
  body: T;
}

export namespace redux {
  export interface User {
    user?: model.User;
  }
}
