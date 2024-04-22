import { Request, Response, NextFunction } from 'express';
import { ApiException, ExceptionType } from './ApiException';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function errorHandler(
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    let message = error.message;
    let status = ExceptionType.INTERNAL_SERVER_ERROR;

    if (error instanceof ApiException) {
      status = error.type;
    }

    res.status(status.valueOf()).json({ message });
  }
  next();
}
