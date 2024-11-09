import { number, array, object } from 'yup';

const addOrderProductSchema = object({
    order_id: number().integer().positive().required(),

    products: array()
        .of(
            object({
                product_id: number().integer().positive().required(),
                total: number().integer().positive().required(),
            })
        )
        .min(1)
        .required(),

});

export { addOrderProductSchema }