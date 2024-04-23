import { Request, Response, NextFunction } from 'express';
import { ApiException, ExceptionType } from './ApiException';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function errorHandler(
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  if (error) {
    let message = error.message ?? error;
    let status = ExceptionType.INTERNAL_SERVER_ERROR;

    if (error instanceof ApiException) {
      status = error.type;
    }
    res.status(status.valueOf()).json({ message });
    return;
  }
  next();
}
