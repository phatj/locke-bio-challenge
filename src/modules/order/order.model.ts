import { DataStoreMap } from '~/db';
import { AdapterMap } from '~/integration/adapters/adapter-map';
import { CreateOrderDto } from './order.dto';

type Integration = {
  integrationId: keyof AdapterMap;
  externalId: string;
};

export type Order = Omit<CreateOrderDto, 'pharmacy'>;
export type OrderModel = Order & {
  integration: Integration;
};
export type OrderModelMap = DataStoreMap<OrderModel>;

declare module '~/db' {
  interface DataStore {
    orders: OrderModelMap;
  }
}
