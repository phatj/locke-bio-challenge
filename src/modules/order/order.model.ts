import { z } from 'zod';
import { DataStoreMap } from '~/db';
import { OrderCreateDto } from './order.dto';
import { AdapterMap } from '~/integration/adapters/adapter-map';

export type Order = z.infer<typeof OrderCreateDto>;

type Integration = {
  integrationId: keyof AdapterMap;
  externalId: string;
};

export type OrderModel = Order & { integration: Integration };
export type OrderModelMap = DataStoreMap<OrderModel>;

declare module '~/db' {
  interface DataStore {
    orders: OrderModelMap;
  }
}
