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
  apis: ['./src/routes.ts', './src/shema/*.ts'],
}

const openapiSpecification = swaggerJsDoc(options)
