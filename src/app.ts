import express from 'express'
import config from 'config'
import log from './utils/logger'
const app = express()
const port = config.get<number>('port')
const host = config.get<string>('host')

const server = app.listen(port, () => {
  log.info(`Server is up on http://${host}:${port}`)
})

process.on('unhandledRejection', (err) => {
  log.info(`INTERNAL SERVER ERROR ===>${err}`)
  server.close(process.exit(1))
})
