import { Router } from 'express';

import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';
import { addOrderProduct, getOrderProduct } from '../controllers/order-product';
import { idSchema } from '../request/shared';
import { addOrderProductSchema } from '../request/order-product';
import helmet from 'helmet';

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
