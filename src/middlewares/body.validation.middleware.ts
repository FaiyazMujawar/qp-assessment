import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';
import { ApiException, ExceptionType } from '../exceptions/ApiException';

export default function validateRequestBody(schema: Schema) {
  return function (req: Request, _: Response, next: NextFunction) {
    try {
      const { success, error } = schema.safeParse(req.body);
      if (!success) {
        const errors = error.issues.map(({ message }) => message);
        throw new ApiException(
          'Invalid Data',
          ExceptionType.BAD_REQUEST,
          errors
        );
      }
    } catch (error) {
      next(error);
    }
  };
}
