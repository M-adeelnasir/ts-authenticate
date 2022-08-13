import { object, string, number } from 'yup'

const payload = {
  body: object({
    title: string().required('Product title is required'),
    description: string()
      .required('Product title is required')
      .min(10, 'Description should be more then 10 chars'),
    price: number().required('Product price is required'),
    image: string(),
  }),
}

const params = {
  params: object({
    productId: string().required('Product id is missing'),
  }),
}

export const createProductScehma = object({
  ...payload,
})
export const updateProductScehma = object({
  ...payload,
})
export const findProductScehma = object({
  ...params,
})
export const deleteProductScehma = object({
  ...payload,
})
