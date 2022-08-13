import { Request, Response } from 'express'
import log from '../utils/logger'
import { get } from 'lodash'
import {
  createSession,
  createAccessToken,
  getUserSessions,
} from '../service/session.service'
import { validateUserEmailAndPassword } from '../service/user.service'
import config from 'config'
import { sign } from '../utils/jwt.utils'

export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    //validate email & password
    const user = (await validateUserEmailAndPassword(req.body)) as any

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid Credentials',
      })
    }

    //create session
    const session = await createSession(user._id, req.get('user-agent') || '')

    //create jwt access token
    const accessToken = await createAccessToken(user, session)
    const refreshToken = await sign(session, {
      expiresIn: config.get('refreshTokenTtl'),
    })
    return res.send({ accessToken, refreshToken })
  } catch (err) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}

//get all sessions
export const getUserSessionHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user')
    const sessions = await getUserSessions({ user: userId, valid: true })
    return res.send(sessions)
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
