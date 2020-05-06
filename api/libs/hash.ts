
import * as CryptoJS from 'crypto-js'

export function createHash(value: string): string {
  const sha512 = CryptoJS.algo.SHA512.create()
  sha512.update(value)
  const sign = CryptoJS.enc.Hex.stringify(sha512.finalize())
  return sign
}