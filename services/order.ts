import { BadRequestError, DuplicateItem, NotFoundError } from "../helpers/http-errors";
import Order from "../models/order";
import OrderProduct from "../models/order-product";
import Product from "../models/product";
import Type from "../models/types";
import User from "../models/user";

export const fetchOrdersWithProducts = async () => {

    const orders = await Order.findAll({
        where: { types_id: 9 },
        attributes: ['id', 'name', 'createdAt'],
    });

    if (!orders.length) {
        return {
					msg: 'No orders found'
		};
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

    const productMap = products.reduce((acc: Record<number, string>, product) => {
        acc[product.get('id') as number] = product.get('name') as string;
        return acc;
    }, {});

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

    return result;
};

export const handleUpdateOrderStatus = async (id: string, status: string) => {
    const validStates = ['confirmed', 'preparing', 'done', 'delivered'];

    if (!validStates.includes(status)) {
        throw new BadRequestError('The status that was sent is not correct');
    }

    if (!/^\d+$/.test(id)) {
        throw new BadRequestError('The id that was sent is not correct');
    }

    const order = await Order.findByPk(id);
    if (!order) {
        throw new NotFoundError(`There is no order with id ${id}`);
    }

    const statusId = await Type.findOne({
        where: { name: status },
        attributes: ['id'],
    }).then(type => type ? type.get('id') : null);

    if (!statusId) {
        throw new BadRequestError(`The status '${status}' is not valid`);
    }

    await order.update({ types_id: statusId });

    return 'Order status updated';
};

export const handleCreateOrder = async (orderData: { name: string; user_id: number }) => {
    const { name, user_id } = orderData;

    const existingOrder = await Order.findOne({ where: { name } });
    if (existingOrder) {
        throw new DuplicateItem(`The order ${name} already exists`);
    }

    const user = await User.findByPk(user_id);
    if (!user) {
        throw new NotFoundError(`There is no user with the id ${user_id}`);
    }

    const order = await Order.create(orderData);

    return order;
};

export const handleDeleteOrder = async (id: string) => {
    if (!/^\d+$/.test(id)) {
        throw new BadRequestError('The id that was sent is not correct');
    }

    const order = await Order.findByPk(id);
    if (!order) {
        throw new NotFoundError(`There is no order with id ${id}`);
    }

    await order.destroy();

    return 'Order was logically eliminated';
};

