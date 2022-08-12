import { Express, Response, Request } from 'express'

export default function (app: Express) {
  //test end point
  app.get('/', (req: Request, res: Response) => res.sendStatus(200))
}
