import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import { decode } from '../utils/jwt.utils'
import { reIssueAccessToken } from '../service/session.service'

const deserializUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = await get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )
  console.log(accessToken)
  if (!accessToken) return next()

  const { expired, decoded } = (await decode(accessToken)) as any

  if (decoded) {
    // console.log('1decoded===>', decoded)
    //   @ts-ignore
    req.user = decoded
    console.log('ITEM====1', decoded)
    //   @ts-ignore
    // console.log('1user===>', req.user)
    return next()
  }

  const refreshToken = await get(req, 'headers.x-refresh')

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken)

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
      const { decoded } = (await decode(newAccessToken)) as any
      //   console.log('2decoded===>', decoded)
      console.log('-----REFRESH TOKEN-----')
      //@ts-ignore

      req.user = decoded
      //   @ts-ignore

      //   console.log('2user===>', req.user)
      return next()
    }
  }
  next()
}

export default deserializUser
