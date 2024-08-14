import { Router } from 'express';

import { getUser, getUsers, register, login } from '../controllers/user';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get('/',   getUsers);
router.get('/:id', [validateJWT],   getUser );
router.post('/register',    register );
router.post('/login', login);

export default router;