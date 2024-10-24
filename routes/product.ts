import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler';

import { createProduct, createProductSchema, deleteProduct, getProducts, idSchema } from '../controllers/product';
import { validateSchema } from '../middlewares/validate-schema';

const router = Router();

router.get('/',   getProducts);

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

router.use(errorHandler);

export default router;