import { Router } from 'express';
import authenticateUser from '../middlewares/auth.middleware';
import { createOrderHandler, getOrdersHandler } from '../handlers/order';
import validateRequestBody from '../middlewares/body.validation.middleware';
import { createOrderSchema } from '../validators/order';

const router = Router();

router.get('/', authenticateUser, getOrdersHandler);

router.post(
  '/',
  authenticateUser,
  validateRequestBody(createOrderSchema),
  createOrderHandler
);

export default router;
