import { Document } from 'mongoose'

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

export namespace redux {
  export interface User {
    user?: model.User;
  }
}
