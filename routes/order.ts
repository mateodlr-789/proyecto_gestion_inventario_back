import { Router } from 'express';

import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';
import { createOrder,  deleteOrder,  getOrders,  } from '../controllers/order';
import { createOrderSchema} from '../request/order';
import { idSchema } from '../request/shared';


const router = Router();

router.get('/', getOrders);

router.post(
    '/',
    validateSchema(createOrderSchema), 
    createOrder
);

router.delete(
    '/:id',
    validateSchema(idSchema, 'params'),
    deleteOrder
);

router.use(errorHandler);

export default router;