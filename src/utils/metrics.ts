import client from 'prom-client'
import express, { Response, Request } from 'express'
import config from 'config'
import log from './logger'

const app = express()
const port = config.get<number>('merticsPort')
const host = config.get<string>('host')

export const startMetricsServer = async () => {
  app.get('/matrics', (req: Request, res: Response) => {
    const collectDefaultMetrics = client.collectDefaultMetrics
    collectDefaultMetrics()
    res.set('Content-Type', client.register.contentType)
    return res.send(client.register.metrics())
  })

  app.listen(port, () => {
    log.info(`Server is up on http://${host}:${port}`)
  })
}
