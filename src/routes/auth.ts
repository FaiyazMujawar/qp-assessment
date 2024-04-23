import { Router, Request, Response, NextFunction } from 'express';
import { compareSync, hashSync } from 'bcrypt';
import { LoginRequest, UserRegistrationRequest } from '../types/app';
import Database from '../loaders/db';
import { User } from '@prisma/client';
import { signToken, verifyToken } from '../services/jwt';
import { ApiException, ExceptionType } from '../exceptions/ApiException';
import { JWT_REFRESH_TOKEN_EXPIRATION } from '../config';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registrationRequest = req.body as UserRegistrationRequest;
      registrationRequest.password = hashSync(registrationRequest.password, 10);

      const db = Database.client!;
      const user: User = await db!.user.create({
        data: registrationRequest,
      });

      res.json(generateTokens(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginRequest = req.body as LoginRequest;

      const db = Database.client!;
      const user: User | null = await db!.user.findFirst({
        where: { email: loginRequest.email },
      });

      if (user == null)
        throw new ApiException(
          `User ${loginRequest.email} not found`,
          ExceptionType.NOT_FOUND
        );

      if (!compareSync(loginRequest.password, user.password)) {
        throw new ApiException('Incorrect password', ExceptionType.FORBIDDEN);
      }

      res.json(generateTokens(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/refresh-token',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = (req.headers['refresh-token'] as string) ?? '';

      if (refreshToken.trim().length == 0) {
        throw new ApiException('Refresh token must be provided');
      }
      const { uid } = verifyToken(refreshToken);
      const userdb = Database.client!.user;
      const user: User | null = await userdb.findFirst({ where: { id: uid } });
      if (user == null) {
        throw new ApiException(
          `User ${uid} not found`,
          ExceptionType.NOT_FOUND
        );
      }
      return res.json(generateTokens(user));
    } catch (error) {
      next(error);
    }
  }
);

function generateTokens(user: User) {
  const payload = { uid: user.id, role: user.role };
  return {
    token: signToken(payload),
    'refresh-token': signToken(payload, JWT_REFRESH_TOKEN_EXPIRATION),
  };
}

export default router;
