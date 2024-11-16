import { object, string, number } from 'yup';


const createOrderSchema = object({
  name: string()
    .strict()
    .max(255, 'The name cannot be longer than 255 characters')
    .required('Name is required'),

  user_id: number()
    .typeError('The user id should be an integer')
    .integer('The user id should be an integer')
    .required('The user id is mandatory'),

  types_id: number()
    .typeError('The type should be an integer')
    .integer('The type should be an integer')
    .required('The type is mandatory'),
})

const updateOrderSchema = object({
  status: string()
    .strict()
    .max(255, 'The status cannot be longer than 255 characters')
    .required('Status is required'),
})

export { createOrderSchema, updateOrderSchema }
