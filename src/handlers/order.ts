import { Request, Response, NextFunction } from 'express';
import Database from '../loaders/db';
import { CreateOrderRequest } from '../types/app';
import { toItemsMap, validateOrder } from '../utils/order';
import { Grocery, User } from '@prisma/client';

export const getOrdersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const orderdb = Database.client!.order;
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
};

export const createOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

async function createOrder(
  groceries: Grocery[],
  itemsMap: { [grocery: string]: number },
  user: User
) {
  const orderdb = Database.client!.order;
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
  const grocerydb = Database.client!.grocery;
  groceries.forEach(async ({ id, quantity }) => {
    await grocerydb.update({
      where: { id },
      data: {
        quantity: quantity - itemsMap[id],
      },
    });
  });
}
