import { object, number, string } from 'yup';

const createProductSchema = object({
    name: string()
        .strict()
        .max(255, 'The name cannot be longer than 255 characters')
        .required('Name is required'),

    price: number()
        .typeError('The price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is mandatory'),

    types_id: number()
        .typeError('The type should be an integer')
        .integer('The type should be an integer')
        .required('The type is mandatory'),

    stock: number()
        .typeError('Stock must be a whole number')
        .integer('Stock must be a whole number')
        .min(0, 'Stock cannot be negative')
        .required('Stock is mandatory'),

    image_url: string()
        .strict()
        .url('The URL of the image must be valid')
        .max(255, 'The URL cannot be longer than 255 characters')
        .required('Image URL is required'),
    description: string()
        .strict()
        .max(255, 'The description cannot be longer than 255 characters')
        .required('description is required'),
});

export { createProductSchema }