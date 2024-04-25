import { Request, Response, NextFunction } from 'express';
import Database from '../loaders/db';
import { ApiException, ExceptionType } from '../exceptions/ApiException';
import { CreateGroceryRequest } from '../types/app';

export const getGroceriesHandler = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const grocerydb = Database.client!.grocery;
    const groceries = await grocerydb.findMany();
    return res.json(groceries);
  } catch (error) {
    next(error);
  }
};

export const getGroceryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groceryId = req.params.id as string;
    const grocerydb = Database.client!.grocery;
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
};

export const createGroceryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body as CreateGroceryRequest;
    const grocerydb = Database.client!.grocery;
    const grocery = await grocerydb.create({ data: request });
    return res.status(201).json(grocery);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateGroceryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body as CreateGroceryRequest;
    const grocerydb = Database.client!.grocery;
    const grocery = await grocerydb.create({ data: request });
    return res.status(201).json(grocery);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteGroceryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groceryId = req.params.id as string;
    const grocerydb = Database.client!.grocery;
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
};
