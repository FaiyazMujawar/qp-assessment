import { Router } from 'express';
import validateUserRole from '../middlewares/rolecheck.middleware';
import {
  createGroceryHandler,
  deleteGroceryHandler,
  getGroceriesHandler,
  getGroceryByIdHandler,
  updateGroceryHandler,
} from '../handlers/grocery';

const router = Router();

router.get('/', getGroceriesHandler);

router.get('/:id', getGroceryByIdHandler);

router.post('/', validateUserRole('ADMIN'), createGroceryHandler);

router.put('/:id', validateUserRole('ADMIN'), updateGroceryHandler);

router.delete('/:id', validateUserRole('ADMIN'), deleteGroceryHandler);

export default router;
