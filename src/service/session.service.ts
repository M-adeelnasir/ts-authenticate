import { DocumentDefinition } from 'mongoose'
import log from '../utils/logger'
import Session, { SessionDocument } from '../model/session.model'
import { sign } from '../utils/jwt.utils'

export const createSession = async (userId: string, userAgent: string) => {
  try {
    const session = await Session.create({ user: userId, userAgent })
    return session.toJSON()
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}

//sign token
export const createAccessToken = async (user: Object, session: any) => {
  const acessToekn = await sign({
    ...user,
    session: session._id,
  })
  return acessToekn
}
