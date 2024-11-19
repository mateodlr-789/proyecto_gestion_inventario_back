import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import { fetchOrdersWithProducts, handleCreateOrder, handleDeleteOrder, handleUpdateOrderStatus } from '../services/order';


export const getOrders = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const order = await Order.findAll();
    
        if (!order){
            return res.status(200).json('There are no orders registered');
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
				
				const result = await fetchOrdersWithProducts();

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

    try {

				const order = await handleCreateOrder(req.body);	
			
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

    try {

				const msg = await handleDeleteOrder(req.params.id);

        res.json({
						succes: true,	
						msg,
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
		try {

				const msg = await handleUpdateOrderStatus(req.params.id, req.body.status);      

        res.json({
						success: true,
						msg,
        });
    } catch (error) {
        next(error);
    }
}

