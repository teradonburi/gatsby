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

export type AuthRequest = Omit<express.Request, 'user'> & {
  user?: models.User.Model & MongoDocument;
}

export namespace redux {
  export interface User {
    user?: model.User;
  }
}
