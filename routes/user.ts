import { Router } from 'express';

import { getUser, getUsers, register, login, deleteUser, createUserSchema, idSchema, logingUserSchema } from '../controllers/user';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';

const router = Router();

router.get('/',   getUsers);
router.get(
    '/:id', 
    [validateJWT],
    validateSchema(idSchema, 'params'),   
    getUser 
);
router.delete(
    '/:id',
    validateSchema(idSchema, 'params'),
    deleteUser 
);
router.post(
    '/register',
    validateSchema(createUserSchema),
    register 
);
router.post(
    '/login',
    validateSchema(logingUserSchema), 
    login
);

router.use(errorHandler);

export default router;