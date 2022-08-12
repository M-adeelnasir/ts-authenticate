import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import { decode } from '../utils/jwt.utils'
import { reIssueAccessToken } from '../service/session.service'

const deserializUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = await get(req, 'headers.authorization').replace(
    /^Bearer\s/,
    ''
  )
  console.log(accessToken)
  if (!accessToken) return next()

  const { expired, decoded } = (await decode(accessToken)) as any

  if (decoded) {
    //   @ts-ignore
    req.user = decoded
    return next()
  }

  const refreshToken = await get(req, 'headers.x-refresh')
  console.log(refreshToken)

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken)
    console.log('REFRESH TOKEN===>', newAccessToken)
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
      const { decoded } = (await decode(newAccessToken)) as any
      //@ts-ignore
      req.user = decoded
      return next()
    }
  }
  next()
}

export default deserializUser
