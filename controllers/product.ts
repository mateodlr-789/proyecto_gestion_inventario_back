import { NextFunction, Request, Response } from 'express';
import Product from '../models/product'
import { BadRequestError, NotFoundError } from '../helpers/http-errors';
import { handleCreateProduct, handleDeleteProduct, handleUpdateStock } from '../services/product';

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await Product.findAll();
        if (product.length === 0) {
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

    try {

				const product = await handleCreateProduct(req.body);

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

				const msg = await handleDeleteProduct(id);

        res.json({
						succes: true,
						msg,
        });
    } catch (error) {

        next(error);
    }
};

export const updateStock = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

				const msg = await handleUpdateStock(req.params.id, req.body.addition);

        res.json({
            msg
        });

    } catch (error) {

        next(error);
    }
};
