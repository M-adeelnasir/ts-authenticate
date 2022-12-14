import { ref, object, string } from 'yup'

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - name
 *          - email
 *          - password
 *          - passwordConfirmation
 *       properties:
 *         name:
 *             type: string
 *             default: adeel nasir
 *         email:
 *             type: string
 *             default: adnasirkbw@gmail.com
 *         password:
 *             type: string
 *             default: strongPassword123
 *         passwordConfirmation:
 *             type: string
 *             default: strongPassword123
 */

export const userCreateSchema = object({
  body: object({
    name: string().required('Name in required'),
    email: string()
      .required('Email is required')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: string()
      .required('Password is required')
      .min(6, 'Password Should be more then 6 chars'),
    passwordConfirmation: string().oneOf(
      [ref('password'), null],
      'Password must match'
    ),
  }),
})

export const userSessionScehma = object({
  body: object({
    email: string()
      .required('Email is required')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: string()
      .required('Password is required')
      .min(6, 'Password Should be more then 6 chars'),
  }),
})
