import { Request, Response, NextFunction } from 'express';
import { ApiException, ExceptionType } from '../exceptions/ApiException';
import Database from '../loaders/db';
import { verifyToken } from '../services/jwt';
import { User } from '@prisma/client';

export default async function authenticateUser(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization ?? '';
    if (!/^Bearer .+/.test(authHeader)) {
      throw new ApiException(
        'Token must be provided',
        ExceptionType.UNAUTHORIZED
      );
    }
    const { uid } = verifyToken(authHeader.substring(7));
    const userdb = Database.client!.user;
    const user: User | null = await userdb.findFirst({ where: { id: uid } });
    if (user === null) {
      throw new ApiException(`User ${uid} not found`, ExceptionType.NOT_FOUND);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
