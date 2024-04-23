import { ApiException, ExceptionType } from '../exceptions/ApiException';
import Database from '../loaders/db';
import { CreateOrderRequest } from '../types/app';

export async function validateOrder(order: CreateOrderRequest) {
  const db = await Database.client();

  const itemsMap = toItemsMap(order);
  const groceryIds = Object.keys(itemsMap);

  const groceries = await db!.grocery.findMany({
    where: {
      id: {
        in: groceryIds,
      },
    },
  });
  if (groceries.length != groceryIds.length) {
    throw new ApiException(
      'One or more groceries not found',
      ExceptionType.BAD_REQUEST
    );
  }

  for (const grocery of groceries) {
    if (itemsMap[grocery.id] > grocery.quantity) {
      throw new ApiException(
        `Grocery ${grocery.id} not available in sufficient quantity`,
        ExceptionType.BAD_REQUEST
      );
    }
  }

  return groceries;
}

export function toItemsMap(order: CreateOrderRequest) {
  return order.items.reduce(
    (
      accumualator: { [groceryId: string]: number },
      { groceryId, quantity }
    ) => {
      accumualator[groceryId] = quantity;
      return accumualator;
    },
    {}
  );
}
