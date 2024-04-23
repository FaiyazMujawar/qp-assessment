import { Role, User } from '@prisma/client';

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

export type CreateGroceryRequest = {
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderRequest = {
  items: OrderItem[];
};

type OrderItem = {
  groceryId: string;
  quantity: number;
};
