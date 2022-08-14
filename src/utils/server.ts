import express, { Request, Response } from 'express'
import deserializUser from '../middleware/deserialize.user'
import morgan from 'morgan'
import Routes from '../routes'
import responseTime from 'response-time'
import {
  restResponseTimeHistogram,
  databaseResponseTimeHistogram,
} from './metrics'

export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(deserializUser)

  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode,
          },
          time * 1000
        )
      }
    })
  )

  Routes(app)

  return app
}
