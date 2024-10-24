import { NextFunction, Request, Response } from 'express';
import Product from '../models/product'
import { BadRequestError, DuplicateItem, NotFoundError } from '../helpers/http-errors';
import * as yup from 'yup';

export const getProducts = async( 
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await Product.findAll();
        if (product.length === 0)  {
            return next(new NotFoundError('There are no products registered'))
        }
        res.status(200).json({ 
            succes: true,
            message: 'The product was succesfully found',
            data: product 
        });
    } catch (error: any) {
        
        next(error);
    }
    
   

    
}

export const createProduct = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { body } = req;
    const { name } = req.body;

    try {

        const productName = await Product.findOne({ where: { name: name }});
        
        if (productName) {
            return next(new DuplicateItem(`The product ${name} already exist`));
        }

        const product = await Product.create(body);

        res.status(201).json({
            success: true,
            message: 'Successfully created product',
            data: product,
        });
    } catch (error: any) {
        
        if (error.name === 'SequelizeValidationError') {
            return next(new BadRequestError('Invalid data: ' + error.errors.map((e: any) => e.message).join(', ')));
        }

       
        next(error);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        
        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }
        
        else if (!product) {
            return next(new NotFoundError(`There is not a product with the id ${id}`));
        }
               

        await product.destroy();

        res.json({
            msg: 'Product was logically eliminated',
        });
    } catch (error) {

        next(error);
    }
};

export const createProductSchema = yup.object({
    name: yup
      .string()
      .strict()
      .max(255, 'The name cannot be longer than 255 characters')
      .required('Name is required'),
  
    price: yup
      .number()
      .typeError('The price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is mandatory'),
  
    types_id: yup
      .number()
      .typeError('The type should be an integer')
      .integer('The type should be an integer')
      .required('The type is mandatory'),
  
    stock: yup
      .number()
      .typeError('Stock must be a whole number')
      .integer('Stock must be a whole number')
      .min(0, 'Stock cannot be negative')
      .required('Stock is mandatory'),
  
    image_url: yup
      .string()
      .strict()
      .url('The URL of the image must be valid')
      .max(255, 'The URL cannot be longer than 255 characters')
      .required('Image URL is required'),
  });

export const idSchema = yup.object({
    id: yup.number().integer('The ID must be an integer').required('ID is required'),
});