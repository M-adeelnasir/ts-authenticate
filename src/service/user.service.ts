import { DocumentDefinition } from 'mongoose'
import User, { UserDocument } from '../model/user.model'
import log from '../utils/logger'
import { omit } from 'lodash'

//create user
export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const user = await User.create(input)
    return user
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}

//login |Session
export const validateUserEmailAndPassword = async ({
  email,
  password,
}: {
  email: UserDocument['email']
  password: string
}) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return false

    const isMatch = await user.comparedPassword(password)

    if (!isMatch) return false

    return omit(user.toJSON(), 'password')
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}
