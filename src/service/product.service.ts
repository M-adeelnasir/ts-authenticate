import {
  DocumentDefinition,
  QueryOptions,
  UpdateQuery,
  FilterQuery,
} from 'mongoose'
import Product, { ProductDocument } from '../model/product.model'
import { SessionDocument } from '../model/session.model'
import log from '../utils/logger'
import { databaseResponseTimeHistogram } from '../utils/metrics'
//create Product
export const createProduct = async (
  input: DocumentDefinition<
    Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'productId'>
  >
) => {
  const matricsLabels = {
    operation: 'createProduct',
  }
  const timer = databaseResponseTimeHistogram.startTimer()
  try {
    const product = await Product.create(input)
    timer({ ...matricsLabels, success: 'true' })
    return product
  } catch (err: any) {
    timer({ ...matricsLabels, success: 'false' })
    log.error(err)
    throw new Error(err)
  }
}

//update product
export const updateProduct = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
  options: QueryOptions = { new: true, runValidators: true }
) => {
  try {
    const product = await Product.findOneAndUpdate(query, update, options)

    return product
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}

//delete Product
export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  try {
    return await Product.findOneAndDelete(query)
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}

//find product
export const findProduct = async (
  query: FilterQuery<SessionDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    const product = await Product.findOne(query, {}, options)
    return product
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}

//find all products
export const allProducts = async () => {
  try {
    return await Product.find({})
  } catch (err: any) {
    log.error(err)
    throw new Error(err)
  }
}
