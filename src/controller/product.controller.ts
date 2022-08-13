import { get } from 'lodash'
import { Response, Request } from 'express'
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
  allProducts,
} from '../service/product.service'
import log from '../utils/logger'

//create product
export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body)
    return res.status(201).json({
      success: true,
      product,
    })
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
//update product
export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const productId = get(req, 'params.productId')
    const product = await updateProduct(productId, req.body)
    if (!product) {
      return res.status(400).json({
        success: false,
        msg: 'Product Create Failed',
      })
    }
    return res.status(204).json({
      success: true,
      product,
    })
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}

//find product
export const findProductHandler = async (req: Request, res: Response) => {
  try {
    const productId = get(req, 'params.productId')
    const product = await findProduct(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: 'No product found',
      })
    }
    return res.json({
      success: true,
      product,
    })
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}

//delete product
export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const productId = get(req, 'params.productId')

    const product = await deleteProduct(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: 'No product found',
      })
    }

    return res.sendStatus(200)
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}

//all product
export const allProductHandler = async (req: Request, res: Response) => {
  try {
    const products = await allProducts()
    return res.json({
      success: true,
      products,
    })
  } catch (err: any) {
    log.error(err)
    return res.status(500).json({
      success: false,
      msg: 'INTERNAL SERVER ERROR',
    })
  }
}
