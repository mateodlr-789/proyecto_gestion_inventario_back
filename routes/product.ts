import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler';

import { createProduct, deleteProduct, getProducts, updateStock } from '../controllers/product';
import { validateSchema } from '../middlewares/validate-schema';
import { createProductSchema } from '../request/product';
import { idSchema } from '../request/shared';
import helmet from 'helmet';

const router = Router();

router.get('/', getProducts);

router.post(
    '/',
    validateSchema(createProductSchema),
    createProduct
);

router.delete(
    '/:id',
    validateSchema(idSchema, 'params'),
    deleteProduct
);

router.post(
    '/:id/stock',
    validateSchema(idSchema, 'params'),
    updateStock
)

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
