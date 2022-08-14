import { Express, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// import { version } from '../../pakage.json'
import log from './logger'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with typescript',
      version: '1.0.0',
    },
    componets: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'],
}

const swaggerDocument = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number) {
  //swager page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  //DOCS in JSON formate
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })
  log.info(`Docs are available on http://localhost:${port}/docs`)
}

export default swaggerDocs
