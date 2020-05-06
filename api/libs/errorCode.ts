import { Response } from 'express'

export const codes: {[key: number]: {code: number; message: string}} = {
  301: {code: 301, message: 'page moved'},
  400: {code: 400, message: 'bad request'},
  404: {code: 404, message: 'not found'},
  409: {code: 409, message: 'conflict'},
  410: {code: 410, message: 'page is gone'},
  500: {code: 500, message: 'server error'},
}

export const responseError = function(res: Response, code: number, error?: Error): Response {
  const result = codes[code]
  if (error) {
    result.message = error?.message
  }
  return res.status(code).json(result)
}