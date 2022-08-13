import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey') as string
export const sign = async (input: Object, options?: SignOptions) => {
  const token = await jwt.sign(input, privateKey, options)
  return token
}

export const decode = async (token: string) => {
  try {
    const decoded = jwt.verify(token, privateKey)

    return { valid: true, expired: false, decoded }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
      return {
        valid: false,
        expired: err.message === 'jwt expired',
        decoded: null,
      }
    }
  }
}
