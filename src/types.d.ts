import { Role } from '@prisma/client';

export type UserRegistrationRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};
