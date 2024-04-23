import { NextFunction, Request, Response, Router } from 'express';
import authenticateUser from '../middlewares/auth.middleware';
import Database from '../loaders/db';
import { CreateOrderRequest } from '../types/app';
import { toItemsMap, validateOrder } from '../utils/order';
import { Grocery, User } from '@prisma/client';

const router = Router();

router.get(
  '/',
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const orderdb = (await Database.client())!.order;
      const orders = await orderdb.findMany({
        where: req.user.role === 'ADMIN' ? {} : { userId },
        select: {
          items: {
            select: {
              order: { select: { id: true } },
              grocery: { select: { name: true } },
            },
          },
        },
      });
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  authenticateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderRequest = req.body as CreateOrderRequest;
      const itemsMap = toItemsMap(orderRequest);
      const groceries = await validateOrder(orderRequest);

      const order = await createOrder(groceries, itemsMap, req.user);
      updateGroceryQuantity(groceries, itemsMap);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

async function createOrder(
  groceries: Grocery[],
  itemsMap: { [grocery: string]: number },
  user: User
) {
  const orderdb = (await Database.client())!.order;
  return await orderdb.create({
    data: {
      user: {
        connect: user,
      },
      items: {
        createMany: {
          data: groceries.map(({ id }) => ({
            groceryId: id,
            quantity: itemsMap[id],
          })),
        },
      },
    },
    select: {
      items: {
        select: {
          grocery: { select: { name: true } },
          quantity: true,
        },
      },
    },
  });
}

async function updateGroceryQuantity(
  groceries: Grocery[],
  itemsMap: { [grocery: string]: number }
) {
  const grocerydb = (await Database.client())!.grocery;
  groceries.forEach(async ({ id, quantity }) => {
    await grocerydb.update({
      where: { id },
      data: {
        quantity: quantity - itemsMap[id],
      },
    });
  });
}

export default router;
