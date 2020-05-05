import { Schema } from 'mongoose'

// moongoose-lean-methodsライブラリの型定義がないので書く
declare function mongooseLeanMethods(schema: Schema): void;
export = mongooseLeanMethods;