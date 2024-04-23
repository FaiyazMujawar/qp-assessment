import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ApiException, ExceptionType } from '../exceptions/ApiException';

export default function validateUserRole(role: Role) {
  return function (req: Request, _: Response, next: NextFunction) {
    try {
      if (req.user?.role != role) {
        throw new ApiException(
          'Action not allowed',
          ExceptionType.UNAUTHORIZED
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
