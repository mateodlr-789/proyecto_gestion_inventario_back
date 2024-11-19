import { BadRequestError, DuplicateItem, NotFoundError } from "../helpers/http-errors";
import Product from "../models/product";
import db from "../db/connection";

export const handleCreateProduct = async (productData: any) => {
    const { name } = productData;

    const productExists = await Product.findOne({ where: { name } });
    if (productExists) {
        throw new DuplicateItem(`The product ${name} already exist`);
    }

    try {

        return await Product.create(productData);

    } catch (error: any) {

        if (error.name === 'SequelizeValidationError') {
            throw new BadRequestError('Invalid data: ' + error.errors.map((e: any) => e.message).join(', '));
        }
        throw error; 
    }
};

export const handleDeleteProduct = async (id: string) => {
    if (!/^\d+$/.test(id)) {
        throw new BadRequestError('The id that was sent is not correct');
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new NotFoundError(`There is no product with the id ${id}`);
    }

    await product.destroy();

    return 'Product was logically eliminated';
};

export const handleUpdateStock = async (id: string, addition: number) => {
    if (!/^\d+$/.test(id)) {
        throw new BadRequestError('The id that was sent is not correct');
    }

    if (typeof addition !== 'number' || addition <= 0) {
        throw new BadRequestError('The addition value must be a positive number');
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new NotFoundError(`There is no product with the id ${id}`);
    }

    await product.update({ stock: db.literal(`stock + ${addition}`) });

    return 'Stock was updated';
};
