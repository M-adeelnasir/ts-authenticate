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
  //awager docs

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *       - Healthcheck
   *     description: Respond if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and runing.
   */

  //test end point
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  /**
   * @openapi
   * /api/users:
   *  post:
   *     tags:
   *       - User
   *     summary: Adds a new user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - password
   *               - passwordConfirmation
   *             properties:
   *               name:
   *                   type: string
   *                   default: adeel
   *               email:
   *                   type: string
   *                   default: adnasirskbw@gmail.com
   *               password:
   *                   type: string
   *                   default: strongPasssword123
   *               passwordConfirmation:
   *                   type: string
   *                   default: strongPassword123
   *     responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  _id:
   *                      type: string
   *                  name:
   *                      type: string
   *                  email:
   *                      type: string
   *                  createdAt:
   *                      type: string
   *                  updateAt:
   *                      type: string
   *        '400':
   *          description: Bad Request
   *        '409':
   *          description: Conflict
   */

  //create user
  app.post('/api/users', validateRequest(userCreateSchema), createUserHandler)

  //swagger for create seesion route

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
    [requireSignIn, validateRequest(createProductScehma)],
    createProductHandler
  )
  //update update
  app.put(
    '/api/product/:productId',
    [requireSignIn, validateRequest(updateProductScehma)],
    updateProductHandler
  )

  /**
   * @openapi
   * /api/product/{produtuctId}:
   *  get:
   *     tags:
   *        - Product
   *     summary: Get a single product by productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       '200':
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - title
   *                 - description
   *                 - price
   *                 - image
   *               properties:
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   *                 price:
   *                   type: string
   *                 image:
   *                   type: string
   */

  //find product
  app.get(
    '/api/product/:productId',
    validateRequest(findProductScehma),
    findProductHandler
  )
  //delete product
  app.delete(
    '/api/product/:productId',
    [requireSignIn, validateRequest(deleteProductScehma)],
    deleteProductHandler
  )

  /**
   * @openapi
   * /api/products:
   *  get:
   *    tags:
   *      - Products
   *    summary: Get all Products
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: object
   *                required:
   *                  - title
   *                  - description
   *                  - price
   *                  - image
   *                properties:
   *                  title:
   *                       type: string
   *                  description:
   *                       type: string
   *                  price:
   *                       type: string
   *                  image:
   *                       type: string
   */

  //all product
  app.get('/api/products', allProductHandler)
}
