import { Prisma } from '@prisma/client';

export const groceries = [
  {
    id: '54dc76ca-fa7c-4571-8fb8-8404e8c87f46',
    name: 'g1',
    price: new Prisma.Decimal(100),
    quantity: 50,
  },
];
