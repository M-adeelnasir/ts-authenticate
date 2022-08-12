import { UserDocument } from './../model/user.model'
import { omit } from 'lodash'
import User from './../model/user.model'
import log from '../utils/logger'
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
    return omit(user.toJSON, 'password')
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}
