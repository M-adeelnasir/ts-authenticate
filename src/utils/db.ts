import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

const mongoURI = config.get<string>('dbURI')

const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI)
  log.info(`Monogdb connection is listing on ${conn.connection.host}`)
}

export default connectDB
