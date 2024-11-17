import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import { BadRequestError, DuplicateItem, NotFoundError } from '../helpers/http-errors';
import User from '../models/user';
import Type from '../models/types';
import OrderProduct from '../models/order-product';
import Product from '../models/product';


export const getOrders = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const order = await Order.findAll();
    
        if (!order){
            return next(new NotFoundError('There are no orders registered'));
        }
    
        res.json({ order });
    } catch (error) {
        next(error);
    }
}

export const getOrdersWithProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await Order.findAll({
            where: { types_id: 9 },
            attributes: ['id', 'name', 'createdAt'],
        });

        if (!orders.length) {
            return next(new NotFoundError('There are no orders registered'));
        }

        const orderIds = orders.map(order => order.get('id') as number);

        const orderProducts = await OrderProduct.findAll({
            where: { order_id: orderIds },
            attributes: ['order_id', 'product_id', 'total'],
        });

        const productIds = orderProducts.map(op => op.get('product_id') as number);

        const products = await Product.findAll({
            where: { id: productIds },
            attributes: ['id', 'name'],
        });

        const productMap = products.reduce((acc: any, product) => {
            acc[product.get('id') as number] = product.get('name');
            return acc;
        }, {} as Record<number, string>);

        const result = orders.map(order => {
            const orderId = order.get('id') as number;
            const productsForOrder = orderProducts
                .filter(op => op.get('order_id') === orderId)
                .map(op => ({
                    name: productMap[op.get('product_id') as number],
                    total: op.get('total'),
                }));

            return {
                id: orderId,
                name: order.get('name'),
                createdAt: order.get('createdAt'),
                products: productsForOrder,
            };
        });

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { body } = req;
    const { name, user_id } = req.body;

    try {
        const orderName = await Order.findOne({ where: { name: name } });
        const userId = await User.findByPk(user_id);

        if (orderName) {
            return next(new DuplicateItem(`The order ${name} already exist`));
        }
        else if (!userId) {
            return next(new NotFoundError(`There is no user with the id ${user_id}`))
        }

        const order = await Order.create(body);

        res.status(201).json({
            succes: true,
            message: 'Successfully created order',
            data: order
        });

    } catch (error) {
        next(error);
    }
}

export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {

        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return next(new NotFoundError(`There is no order with id ${id}`));
        }

        await order.destroy();

        res.json({
            msg: 'User was logically eliminated',
        });

    } catch (error) {
        next(error)
    }

}

export const updateOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStates = ['confirmed', 'preparing', 'done', 'delivered'];

    if (!validStates.includes(status)) {
        return next(new BadRequestError('The status that was sent it is not correct'));
    }

    try {
        if (!/^\d+$/.test(id)) {
            return next(new BadRequestError('The id that was sent it is not correct'));
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return next(new NotFoundError(`There is no order with id ${id}`));
        }

        const statusid = await Type.findOne({
            where: { name: status },
            attributes: ['id'],
        }).then(order => order ? order.get('id') : null);

        await order.update({ types_id: statusid });

        res.json({
            msg: 'Order status updated',
        });
    } catch (error) {
        next(error);
    }
}

