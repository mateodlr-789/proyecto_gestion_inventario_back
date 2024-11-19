import { NextFunction, Request, Response } from 'express';
import OrderProduct from '../models/order-product'
import { NotFoundError } from '../helpers/http-errors';
import { handleAddOrderProduct } from '../services/order-product';

export const getOrderProduct = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const orderProduct = await OrderProduct.findAll({where: {order_id: id}});

        if (orderProduct.length === 0){
            return next(new NotFoundError(`There are no products registered to the order with id ${id}`))
        }

        res.json({ orderProduct });

    } catch (error) {
        next(error);
    }
}

export const addOrderProduct = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

				const data = await handleAddOrderProduct(req.body);

        res.status(201).json({ 
            succes: true,
            message: 'Products successfully added to order',
            data, 
        })

    } catch (error) {
        next(error);
    }
}
