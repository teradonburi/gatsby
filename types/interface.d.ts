import { Document } from 'mongoose'

declare module 'express' {
  export interface Request {
    data?: unknown;
    user?: models.User.Model & MongoDocument; // overwrite user auth
  }
}

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

export namespace redux {
  export interface User {
    user?: model.User;
  }
}
