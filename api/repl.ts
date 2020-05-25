import mongoose from 'mongoose'
import config from 'config'
mongoose.Promise = global.Promise
mongoose.connect(config.get('mongoDB'), {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

import * as moment from 'moment'
import repl from 'repl'

const replInstance = repl.start({ prompt: '> ' })
replInstance.context.moment = moment

const HISTORY_DIRECTORY = __dirname + '/.ym_history'
// require node version above v11.10.0
replInstance.setupHistory(HISTORY_DIRECTORY, (err: Error | null) => {
  if (err) console.log(err)
})

import * as models from './models'

for (const key in models) {
  replInstance.context[key] = (models as {[key: string]: unknown})[key]
}

replInstance.on('exit', () => {
  mongoose.disconnect()
})