import { z } from 'zod';

const CustomerDto = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipcode: z.string().min(5),
  country: z.string().min(2),
});

const ProductOrderDto = z.object({
  product: z.string(),
  quantity: z.number(),
});

export const OrderCreateDto = z.object({
  order: ProductOrderDto,
  customer: CustomerDto,
});
