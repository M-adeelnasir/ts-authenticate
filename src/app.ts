import express from 'express'
import config from 'config'
import connectDB from './utils/db'
import log from './utils/logger'

const app = express()
app.use(express())
app.use(express.urlencoded({ extended: true }))

const port = config.get<number>('port')
const host = config.get<string>('host')

const server = app.listen(port, () => {
  log.info(`Server is up on http://${host}:${port}`)
  connectDB()
})

process.on('unhandledRejection', (err) => {
  log.info(`INTERNAL SERVER ERROR ===>${err}`)
  server.close(process.exit(1))
})
