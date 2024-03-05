import { z } from 'zod';
import { DataStoreMap } from '~/db';
import { OrderCreateDto } from './order.dto';

export type Order = z.infer<typeof OrderCreateDto>;
export type OrderModel = DataStoreMap<Order>;

declare module '~/db' {
  interface DataStore {
    orders: OrderModel;
  }
}
