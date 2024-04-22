import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config';

export function signToken(payload: object, expirationTime = JWT_EXPIRATION) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expirationTime,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function decodeToken(token: string): JwtPayload {
  return jwt.decode(token) as JwtPayload;
}
