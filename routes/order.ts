import { Router } from 'express';

import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';
import { createOrder, deleteOrder, getOrders, getOrdersWithProducts, updateOrderStatus, } from '../controllers/order';
import { createOrderSchema, updateOrderSchema } from '../request/order';
import { idSchema } from '../request/shared';
import helmet from 'helmet';


const router = Router();

router.get('/', getOrders);

router.get('/products', getOrdersWithProducts);

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

router.post(
    '/:id/status',
    validateSchema(idSchema, 'params'),
    validateSchema(updateOrderSchema),
    updateOrderStatus
);

router.use(errorHandler);
router.use(  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], 
        styleSrc: ["'self'", "'unsafe-inline'"], 
        imgSrc: ["'self'", "data:"], 
        frameSrc: ["'none'"], 
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
  })
);

export default router;
