import db from "../db/connection";
import { BadRequestError } from "../helpers/http-errors";
import Order from "../models/order";
import OrderProduct from "../models/order-product";
import Product from "../models/product";

export const handleAddOrderProduct = async (orderProductData: { order_id: number; products: { product_id: number; total: number }[] }) => {
    const { order_id, products } = orderProductData;

    const transaction = await db.transaction();

    try {
        const order = await Order.findByPk(order_id);
        if (!order) {
            throw new BadRequestError(`There is no order with id ${order_id}`);
        }

        const productIds = products.map((p) => p.product_id);
        const stocks = await Product.findAll({
            where: { id: productIds },
            attributes: ['id', 'stock'],
            transaction,
            lock: true,
        });

        if (stocks.length !== productIds.length) {
            const missingIds = productIds.filter((id) => !stocks.some((stock:any) => stock.id === id));
            throw new BadRequestError(`The following products are missing: ${missingIds.join(', ')}`);
        }

        const stockMap = stocks.reduce((accumulator:any, product:any) => {
            accumulator[product.id] = product.stock;
            return accumulator;
        }, {});

        for (const { product_id, total } of products) {
            if (!stockMap[product_id] || stockMap[product_id] < total) {
                throw new BadRequestError(`There is not enough stock for the product ${product_id}`);
            }
        }

        const orderProducts = products.map(({ product_id, total }) => ({
            order_id,
            product_id,
            total,
        }));
        const orderProductAdded = await OrderProduct.bulkCreate(orderProducts, { transaction });

        for (const { product_id, total } of products) {
            await Product.update(
                { stock: db.literal(`stock - ${total}`) },
                { where: { id: product_id }, transaction }
            );
        }

        await transaction.commit();
        return orderProductAdded;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

