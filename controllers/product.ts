import { NextFunction, Request, Response } from 'express';
import Product from '../models/product'
import { BadRequestError, DuplicateItem, NotFoundError } from '../helpers/http-errors';
import db from '../db/connection';

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
    const { body } = req;
    const { name } = req.body;

    try {

        const productName = await Product.findOne({ where: { name: name } });

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

export const updateStock = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { addition } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }

        else if (!product) {
            return next(new NotFoundError(`There is not a product with the id ${id}`));
        }

        await product.update({ stock: db.literal(`stock + ${addition}`) });

        res.json({
            msg: 'Stock was updated',
        });

    } catch (error) {

        next(error);
    }
};