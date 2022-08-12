import { DocumentDefinition } from 'mongoose'
import log from '../utils/logger'
import Session, { SessionDocument } from '../model/session.model'

export const createSession = async (userId: string, userAgent: string) => {
  try {
    const session = await Session.create({ user: userId, userAgent })
    return session.toJSON()
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}
