import { NextFunction, Request, Response, Router } from 'express';
import Database from '../loaders/db';
import { ApiException, ExceptionType } from '../exceptions/ApiException';
import validateUserRole from '../middlewares/rolecheck.middleware';
import { CreateGroceryRequest } from '../types/app';

const router = Router();

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const grocerydb = (await Database.client())!.grocery;
    const groceries = await grocerydb.findMany();
    return res.json(groceries);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groceryId = req.params.id as string;
    const grocerydb = (await Database.client())!.grocery;
    const grocery = await grocerydb.findFirst({ where: { id: groceryId } });
    if (grocery == null) {
      throw new ApiException(
        `Grocery [${groceryId}] not found`,
        ExceptionType.NOT_FOUND
      );
    }
    return res.json(grocery);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validateUserRole('ADMIN'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req.body as CreateGroceryRequest;
      const grocerydb = (await Database.client())!.grocery;
      const grocery = await grocerydb.create({ data: request });
      return res.status(201).json(grocery);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validateUserRole('ADMIN'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groceryId = req.params.id as string;
      const request = req.body as CreateGroceryRequest;
      const grocerydb = (await Database.client())!.grocery;
      const grocery = await grocerydb.update({
        where: { id: groceryId },
        data: request,
      });
      if (grocery == null) {
        throw new ApiException(
          `Grocery [${groceryId}] not found`,
          ExceptionType.NOT_FOUND
        );
      }
      return res.status(200).json(grocery);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validateUserRole('ADMIN'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groceryId = req.params.id as string;
      const grocerydb = (await Database.client())!.grocery;
      const grocery = await grocerydb.delete({
        where: { id: groceryId },
      });
      if (grocery == null) {
        throw new ApiException(
          `Grocery [${groceryId}] not found`,
          ExceptionType.NOT_FOUND
        );
      }
      return res.status(200).json(grocery);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
