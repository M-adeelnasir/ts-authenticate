import express from 'express'
import deserializUser from '../middleware/deserialize.user'
import morgan from 'morgan'
import Routes from '../routes'

export const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(deserializUser)
  Routes(app)

  return app
}
