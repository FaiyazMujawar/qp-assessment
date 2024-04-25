import { Router } from 'express';

import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../handlers/auth';
import validateRequestBody from '../middlewares/body.validation.middleware';
import { loginSchema, registerUserSchema } from '../validators/auth';

const router = Router();

router.post(
  '/register',
  validateRequestBody(registerUserSchema),
  registerHandler
);

router.post('/login', validateRequestBody(loginSchema), loginHandler);

router.post('/refresh-token', refreshTokenHandler);

export default router;
