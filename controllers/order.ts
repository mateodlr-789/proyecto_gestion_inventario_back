import { NextFunction, Request, Response } from 'express';
import db from '../db/connection';
import Order from '../models/order';
import { BadRequestError, DuplicateItem, NotFoundError } from '../helpers/http-errors';
import User from '../models/user';
import * as yup	from 'yup';
import OrderProduct from '../models/order-product';



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


export const createOrder = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { body } = req;
    const { name, user_id } = req.body;

    try {
        const orderName = await Order.findOne({ where: { name: name }});
        const userId = await User.findByPk( user_id );

        if (orderName){
            return next(new DuplicateItem(`The order ${name} already exist`));
        }
        else if (!userId){
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

export const deleteOrder = async(
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

        if (!order){
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

export const createOrderSchema = yup.object({
    name: yup
      .string()
      .strict()
      .max(255, 'The name cannot be longer than 255 characters')
      .required('Name is required'),
    
    user_id: yup
      .number()
      .typeError('The user id should be an integer')
      .integer('The user id should be an integer')
      .required('The user id is mandatory'),
      
    types_id: yup
      .number()
      .typeError('The type should be an integer')
      .integer('The type should be an integer')
      .required('The type is mandatory'),
})

export const idSchema = yup.object({
    id: yup.number().integer('The ID must be an integer').required('ID is required'),
});