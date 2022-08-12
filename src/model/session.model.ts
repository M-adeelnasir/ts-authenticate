import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface SessionDocument extends mongoose.Document {
  user: UserDocument['_id']
  userAgent: string
  valid: boolean
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userAgent: {
      type: String,
    },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Session = mongoose.model<SessionDocument>('Session', sessionSchema)
export default Session
