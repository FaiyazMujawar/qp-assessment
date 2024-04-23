import { config } from 'dotenv';

config({ path: `.env/${process.env.NODE_ENV}` });

export const PORT = (process.env.PORT ?? 3000) as number;

export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION!;
export const JWT_REFRESH_TOKEN_EXPIRATION = process.env
  .JWT_REFRESH_TOKEN_EXPIRATION!;
