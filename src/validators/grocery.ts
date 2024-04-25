import { z } from 'zod';

export const createGrocerySchema = z.object({
  name: z.string({ message: 'Name is required' }),
  price: z
    .number({ message: 'Price is required' })
    .positive({ message: 'Price must be positive' }),
  quantity: z
    .number({ message: 'Price is required' })
    .int()
    .positive({ message: 'Quantity must be positive' }),
});
