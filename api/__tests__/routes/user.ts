import express from 'express'
import { mongo, deleteAll } from '../mongo'
import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response'
import { users } from '../../routes'

let request: Request
let response: Response

beforeEach(async () => {
  request = new Request()
  response = new Response()
  await deleteAll()
})

afterEach(() => {
  request.resetMocked()
  response.resetMocked()
})

afterAll(async () => {
  await mongo.disconnect()
})

describe('users', () => {

  test('create.validate invalid', async () => {
    request.setBody({
      gender: 'male',
      name: 'test',
      email: 'test@gmail.com',
      password: 'hoge',
    })
    const result = await users.create.validate(
      request as unknown as express.Request,
      response as unknown as express.Response
    ) as express.Response
    expect(result.statusCode).toBe(400)
  })
  test('create.validate valid', async () => {
    request.setBody({
      gender: 'male',
      name: 'test',
      email: 'test@gmail.com',
      password: 'hogefuga',
    })
    const result = await users.create.validate(
      request as unknown as express.Request,
      response as unknown as express.Response
    )
    expect(result).toBe('create')
  })
})