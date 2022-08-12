import { DocumentDefinition } from 'mongoose'
import log from '../utils/logger'
import Session, { SessionDocument } from '../model/session.model'
import { decode, sign } from '../utils/jwt.utils'
import { get } from 'lodash'
import User from '../model/user.model'

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

//re issue jwt access token
export const reIssueAccessToken = async (token: string) => {
  const decoded = (await decode(token)) as any
  if (!decoded || !get(decoded, '_id')) return false

  //get the session
  const session = await Session.findById(get(decoded, '_id'))

  //make sure that the session is valid
  if (!session || !session?.valid) return false
  //find the user
  const user = await User.findById({ _id: session.user })
  if (!user) return false
  //and again genrate a token
  const newAccessToken = await createAccessToken(user, session)
  return newAccessToken
}
