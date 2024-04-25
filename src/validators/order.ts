import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      groceryId: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
});
