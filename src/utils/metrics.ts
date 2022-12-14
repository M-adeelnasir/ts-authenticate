import express from 'express'
import client from 'prom-client'
import log from './logger'
import config from 'config'

const app = express()

const host = config.get<string>('host')

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
})

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
})

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics

  collectDefaultMetrics()

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType)

    return res.send(await client.register.metrics())
  })

  app.listen(9001, () => {
    log.info(`Metrics server started at http://${host}:9100`)
  })
}
