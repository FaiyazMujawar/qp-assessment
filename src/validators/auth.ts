import { z } from 'zod';

export const registerUserSchema = z.object({
  firstname: z.string({ message: 'First name is required' }),
  lastname: z.string({ message: 'Last name is required' }),
  email: z.string({ message: 'Email is required' }).email(),
  password: z
    .string({ message: 'Password is required' })
    .min(5, 'Passowrd must be min 5 characters long'),
});

export const loginSchema = z.object({
  email: z.string({ message: 'Email is required' }).email(),
  password: z.string({ message: 'Password is required' }),
});
