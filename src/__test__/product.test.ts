import { createServer } from './../utils/server'
import request from 'supertest'

const app = createServer()
describe('product', () => {
  describe('get product route', () => {
    describe('given product does not exits', () => {
      it('should return 404', async () => {
        const productId = 'invalidproductid98932'
        await request(app).get(`/api/product/${productId}`).expect(404)
      })
    })
  })
})
