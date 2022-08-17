import { createServer } from './utils/server'
import dotenv from 'dotenv'
import config from 'config'
import { startMetricsServer } from './utils/metrics'
import swaggerDocs from './utils/swagger'
import connectDB from './utils/db'
import log from './utils/logger'
const app = createServer()

dotenv.config()

const port = config.get<number>('port')
const host = config.get<string>('host')

const dbURI = config.get<string>('dbURI')
console.log(dbURI)

const server = app.listen(port, async () => {
  log.info(`Server is up on http://${host}:${port}`)
  startMetricsServer()
  swaggerDocs(app, port)
  await connectDB()
})

process.on('unhandledRejection', (err) => {
  log.error(`INTERNAL SERVER ERROR ===>${err}`)
  server.close(process.exit(1))
})
