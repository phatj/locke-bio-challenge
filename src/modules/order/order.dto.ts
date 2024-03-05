import { z } from 'zod';
import { AdapterTuple } from '~/integration/adapters/adapter-map';

const CustomerDto = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipcode: z.string().min(5),
  country: z.string().min(2),
});

export const OrderCreateDto = z.object({
  pharmacy: z.enum(AdapterTuple),
  product: z.string(),
  quantity: z.number(),
  customer: CustomerDto,
});

export type CreateOrderDto = z.infer<typeof OrderCreateDto>;
