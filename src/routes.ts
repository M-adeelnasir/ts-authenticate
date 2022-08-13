import {
  createProductScehma,
  updateProductScehma,
  findProductScehma,
  deleteProductScehma,
} from './schema/product.schema'
import { validateRequest } from './middleware/validateRequest'
import { userCreateSchema, userSessionScehma } from './schema/user.schema'
import { Express, Response, Request } from 'express'
import { createUserHandler } from './controller/user.controller'
import {
  findProductHandler,
  createProductHandler,
  updateProductHandler,
  allProductHandler,
  deleteProductHandler,
} from './controller/product.controller'
import {
  createSessionHandler,
  getUserSessionHandler,
  deleteUserSessionHandler,
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

  //logout session
  app.delete('/api/session', requireSignIn, deleteUserSessionHandler)

  //create product
  app.post(
    '/api/product',
    requireSignIn,
    validateRequest(createProductScehma),
    createProductHandler
  )
  //update update
  app.put(
    '/api/product/:productId',
    requireSignIn,
    validateRequest(updateProductScehma),
    updateProductHandler
  )
  //find product
  app.get(
    '/api/product/:productId',
    validateRequest(findProductScehma),
    findProductHandler
  )
  //delete product
  app.delete(
    '/api/product/:productId',
    requireSignIn,
    validateRequest(deleteProductScehma),
    deleteProductHandler
  )
  //all product
  app.get('/api/products', allProductHandler)
}
