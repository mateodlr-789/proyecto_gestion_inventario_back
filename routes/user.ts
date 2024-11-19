import { Router } from 'express';

import { getUser, getUsers, register, login, deleteUser, updateRole } from '../controllers/user';
import { validateJWT } from '../middlewares/validate-jwt';
import { validateSchema } from '../middlewares/validate-schema';
import { errorHandler } from '../middlewares/error-handler';
import { idSchema } from '../request/shared';
import { createUserSchema, logingUserSchema } from '../request/user';
import helmet from 'helmet';

const router = Router();

router.get('/', getUsers);
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
router.post(
    '/:id/role',
    validateSchema(idSchema, 'params'),
    updateRole
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
