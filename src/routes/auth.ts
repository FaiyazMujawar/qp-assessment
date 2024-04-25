import { Router } from 'express';

import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../handlers/auth';

const router = Router();

router.post('/register', registerHandler);

router.post('/login', loginHandler);

router.post('/refresh-token', refreshTokenHandler);

export default router;
