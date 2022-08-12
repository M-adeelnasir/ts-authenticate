import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey') as string
export const sign = async (input: Object, options?: SignOptions) => {
  const token = await jwt.sign(input, privateKey, options)
  return token
}
