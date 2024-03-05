import { Order, OrderModel } from '~/modules/order/order.model';
import { AdapterMap } from './adapters/adapter-map';

export async function relayOrder(
  integrationId: keyof AdapterMap,
  order: Order
): Promise<OrderModel> {
  console.log(integrationId, order);

  const adapter = AdapterMap[integrationId];
  const payload = adapter.toPayload(order);

  console.log(payload);
  // todo: send payload

  // todo: transform response

  return {
    ...order,
    integration: {
      externalId: '123',
      integrationId,
    },
  };
}
