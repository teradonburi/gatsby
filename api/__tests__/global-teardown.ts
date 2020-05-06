import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function teardown(): Promise<void> {
  await (global as NodeJS.Global & {mongoServer: MongoMemoryServer}).mongoServer.stop()
}
