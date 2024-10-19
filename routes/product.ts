import { Router } from 'express';
import { errorHandler } from '../middlewares/error-handler';

import { createProduct, deleteProduct, getProducts } from '../controllers/product';

const router = Router();

router.get('/',   getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

router.use(errorHandler);

export default router;