import { UnknownObject } from '~/db';
import { Order } from '~/modules/order/order.model';

export interface IntegrationAdapter<
  Payload extends UnknownObject,
  Id extends keyof Payload,
> {
  toPayload: (order: Order) => Omit<Payload, Id>;
  fromPayload: (payload: Payload) => Order & { id: string };
}
