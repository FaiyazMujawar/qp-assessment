import { Request, Response, NextFunction } from 'express';
import { ApiException, ExceptionType } from './ApiException';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    let message = error.message ?? error;
    let status = ExceptionType.INTERNAL_SERVER_ERROR;
    let errors: any[] = [];

    if (error instanceof ApiException) {
      status = error.type;
      errors = error.errors;
    }
    res
      .status(status.valueOf())
      .json({ path: req.baseUrl, message, errors, timestamp: new Date() });
    return;
  }
  next();
}
