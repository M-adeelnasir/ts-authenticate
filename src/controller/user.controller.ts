import { Request, Response } from 'express'
import { createUser } from '../service/user.service'
import log from '../utils/logger'
import { omit } from 'lodash'

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    return res.status(201).json({
      success: true,
      user: omit(user.toJSON(), 'password'),
    })
  } catch (err) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
