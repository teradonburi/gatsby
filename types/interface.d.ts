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
    uploadedImageAt?: Date;
  }
}

export type RequestEx = express.Request & {
  data?: object | array | number | string | undefined | null; // carry data between functions
}

export type AuthRequest = Omit<express.Request, 'user'> & {
  user?: models.User.Model & MongoDocument; // overwrite user auth
  data?: object | array | number | string | undefined | null;
}

export namespace redux {
  export interface User {
    user?: model.User;
  }
}
