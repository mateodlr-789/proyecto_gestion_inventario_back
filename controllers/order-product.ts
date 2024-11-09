import { NextFunction, Request, Response } from 'express';
import OrderProduct from '../models/order-product'
import { BadRequestError, NotFoundError } from '../helpers/http-errors';
import db from '../db/connection';
import Product from '../models/product';
import Order from '../models/order';

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
    const { order_id, products } = req.body;   
    const transaction = await db.transaction();

    try {

        const order = await Order.findByPk(order_id);

        if (!order) {
            await transaction.rollback();
            return next(new BadRequestError(`There is no order with id ${order_id}`))
        }

        const productIds = products.map((p:{ product_id: number}) => p.product_id);

        const stocks = await Product.findAll({
            where: {id: productIds},
            attributes: ['id', 'stock'],
            transaction, 
            lock: true,
        });

        if (stocks.length !== productIds.length){
            const missingIds = productIds.filter(
                (id: number) => !stocks.some((stock: any) => stock.id === id)
            );
            await transaction.rollback();

            return next(
                new BadRequestError(`The following products are missing: ${missingIds.join(', ')}`)
            )
        }

        const stockMap = stocks.reduce((acumulator: any, product: any) => {
            acumulator[product.id] = product.stock;
            return acumulator;
        }, {}) 

        for (const { product_id, total } of products) {
            if (!stockMap[product_id] || stockMap[product_id] < total) {
                await transaction.rollback();
                return next(new BadRequestError(`There is not enough stock for the product ${product_id}`));
            }
          }
        
        const orderProducts = products.map(
            ({ product_id, total}: {product_id: number, total:number}

            ) =>({
            order_id,
            product_id,
            total
        }))

        const orderProductAdded = await OrderProduct.bulkCreate(orderProducts, { transaction });

        for ( const {product_id, total } of products ){
            await Product.update(
                { stock: db.literal(`stock - ${total}`)},
                { where: { id: product_id }, transaction }
            );
        }

        await transaction.commit();
        res.status(201).json({ 
            succes: true,
            message: 'Products successfully added to order',
            data: orderProductAdded 
        })

    } catch (error) {
        await transaction.rollback();
        next(error);
    }
}
