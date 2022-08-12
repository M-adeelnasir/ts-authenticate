import { DocumentDefinition } from 'mongoose'
import User, { UserDocument } from '../model/user.model'
import log from '../utils/logger'

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
