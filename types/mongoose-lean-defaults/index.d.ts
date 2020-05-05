import { Schema } from 'mongoose'

// moongoose-lean-defaultsライブラリの型定義がないので書く
declare function mongooseLeanDefaults(schema: Schema): void;
export = mongooseLeanDefaults;