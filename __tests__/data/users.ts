import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';

export const users = {
  USER: {
    id: '54dc76ca-fa7c-4571-8fb8-8404e8c87f46',
    firstname: 'John',
    lastname: 'John',
    email: 'a@b.com',
    password: '$2b$10$HwpJiqZ3A7xSj2TGqx6UBeGPb5jOVRpwgksJRniSyH0D/lkR97ImG',
    role: Role.USER,
  },
  ADMIN: {
    id: 'f6772b9c-d4a9-4d8d-bd5a-ce88a0b020ae',
    firstname: 'Jane',
    lastname: 'John',
    email: 'admin@app.com',
    password: '$2b$10$HwpJiqZ3A7xSj2TGqx6UBeGPb5jOVRpwgksJRniSyH0D/lkR97ImG',
    role: Role.ADMIN,
  },
};
