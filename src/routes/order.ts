import { Router } from 'express';
import authenticateUser from '../middlewares/auth.middleware';
import { createOrderHandler, getOrdersHandler } from '../handlers/order';

const router = Router();

router.get('/', authenticateUser, getOrdersHandler);

router.post('/', authenticateUser, createOrderHandler);

export default router;
