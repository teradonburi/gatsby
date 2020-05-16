import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const deleteAll = async (): Promise<void> => {
  for (const key in mongoose.models) {
    const model = mongoose.models[key]
    await model.deleteMany({})
  }
}

const mongooseOpts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

const mongoUri = process.env.mongoUri

mongoose.connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e)
    mongoose.connect(mongoUri as string, mongooseOpts)
  }
  console.log(e)
})

mongoose.connect(mongoUri as string, mongooseOpts)
export const mongo = mongoose