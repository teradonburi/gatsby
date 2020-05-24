import { mongo, deleteAll } from '../mongo'
import { User } from '../../models'

afterEach(async () => {
  await deleteAll()
})

afterAll(async () => {
  await mongo.disconnect()
})

describe('user', () => {

  test('user create', async () => {
    const name = 'test'
    const user = await User.create({name, email: 'test@gmail.com', password: 'pw'})
    expect(user.name).toBe(name)
    expect(!!user.token).toBeTruthy()
  })

})
