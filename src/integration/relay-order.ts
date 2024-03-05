import { isAxiosError } from '@/is-axios-error';
import axios from 'axios';
import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';
import { Order, OrderModel } from '~/modules/order/order.model';
import { AdapterMap } from './adapters/adapter-map';

export async function relayOrder(
  integrationId: keyof AdapterMap,
  order: Order
): Promise<OrderModel> {
  const adapter = AdapterMap[integrationId];
  const payload = adapter.toPayload(order);

  let externalId: string;

  try {
    const endpoint = [integrationId, 'orders'].join('/');
    const { data: externalResponse } = await axios.post(endpoint, payload);

    const { id } = adapter.fromPayload(externalResponse);
    externalId = id;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('%s', error);

      throw new HTTPException(error.response.status as StatusCode, {
        message: error.message,
      });
    } else {
      throw new HTTPException(500, { message: 'An unknown error occurred' });
    }
  }

  return {
    ...order,
    integration: {
      externalId,
      integrationId,
    },
  };
}
