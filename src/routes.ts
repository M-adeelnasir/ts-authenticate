import { validateRequest } from './middleware/validateRequest'
import { userCreateSchema, userSessionScehma } from './schema/user.schema'
import { Express, Response, Request } from 'express'
import { createUserHandler } from './controller/user.controller'
import {
  createSessionHandler,
  getUserSessionHandler,
} from './controller/session.controller'
import { requireSignIn } from './middleware/requireSignin'

export default function (app: Express) {
  //test end point
  app.get('/', requireSignIn, (req: Request, res: Response) =>
    res.sendStatus(200)
  )

  //create user
  app.post('/api/users', validateRequest(userCreateSchema), createUserHandler)

  //login session
  app.post(
    '/api/session',
    validateRequest(userSessionScehma),
    createSessionHandler
  )
  //get all sessions
  app.get('/api/session', requireSignIn, getUserSessionHandler)
}
