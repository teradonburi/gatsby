import { MongoMemoryServer } from 'mongodb-memory-server'
const mongoServer = new MongoMemoryServer()


export default async function setup(): Promise<void> {
  const mongoUri = await mongoServer.getUri()
  process.env.mongoUri = mongoUri
  ;(global as unknown as NodeJS.Global & {mongoServer: MongoMemoryServer}).mongoServer = mongoServer
}

