import express from 'express'
import config from 'config'
import connectDB from './utils/db'
import log from './utils/logger'
import Routes from './routes'
import deserializUser from './middleware/deserialize.user'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(deserializUser)

const port = config.get<number>('port')
const host = config.get<string>('host')

const server = app.listen(port, () => {
  log.info(`Server is up on http://${host}:${port}`)
  connectDB()
  Routes(app)
})

process.on('unhandledRejection', (err) => {
  log.error(`INTERNAL SERVER ERROR ===>${err}`)
  server.close(process.exit(1))
})
