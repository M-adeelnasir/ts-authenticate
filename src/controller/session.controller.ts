import { Request, Response } from 'express'
import log from '../utils/logger'
import { validateUserEmailAndPassword } from '../service/session.service'
export const createSessionHandler = async (req: Request, res: Response) => {
  try {
    //validate email & password
    const user = await validateUserEmailAndPassword(req.body)
  } catch (err) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
