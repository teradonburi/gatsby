import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function teardown(): Promise<void> {
  await (global as unknown as NodeJS.Global & {mongoServer: MongoMemoryServer}).mongoServer.stop()
}
