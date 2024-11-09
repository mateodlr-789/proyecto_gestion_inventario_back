import { Router } from 'express';

import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';
import { addOrderProduct, addOrderProductSchema, getOrderProduct, idSchema } from '../controllers/order-product';

const router = Router();

router.get(
    '/:id',
    validateSchema(idSchema, 'params'),
    getOrderProduct
)

router.post(
    '/',
    validateSchema(addOrderProductSchema), 
    addOrderProduct
);

router.use(errorHandler);

export default router;