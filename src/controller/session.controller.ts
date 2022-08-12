import { Request, Response } from 'express'
import log from '../utils/logger'
import { get } from 'lodash'
import { createSession } from '../service/session.service'
import { validateUserEmailAndPassword } from '../service/user.service'
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

    const session = await createSession(user._id, req.get('user-agent') || '')
  } catch (err) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
