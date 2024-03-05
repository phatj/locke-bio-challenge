import { UnknownObject } from '~/db';
import { Order } from '~/modules/order/order.model';

export interface IntegrationAdapter<Payload extends UnknownObject> {
  toPayload: (order: Order) => Payload;
  fromPayload: (payload: Payload) => Order;
}
