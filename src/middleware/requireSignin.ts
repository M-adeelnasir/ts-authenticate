import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import log from '../utils/logger'

export const requireSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, 'user')
    if (!user) {
      return res.sendStatus(403)
    }
    next()
  } catch (err) {
    if (err instanceof Error) {
      log.error(err.message)
    }
  }
}
