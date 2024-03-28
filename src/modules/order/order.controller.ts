import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createModel, db } from '~/db';
import { relayOrder } from '~/integration/relay-order';
import { OrderCreateDto } from './order.dto';
import { OrderModel } from './order.model';

export const OrderController = new Hono();

/**
 * I chose a map here to be able to quickly retrieve, update, and remove items.
 * This also probably shouldn't be initialized here; it would be better to do
 * this in the model file.
 *
 * https://nodejs.org/docs/latest/api/modules.html#caching
 */
// initialize the database for orders
db.orders = new Map();

// create an order
OrderController.post('/', zValidator('json', OrderCreateDto), async (c) => {
  const { pharmacy, ...data } = c.req.valid('json');

  /**
   * Normally, we don't want to tie an external process to the core of this route,
   * even if we have to talk to the database multiple times.
   *
   * A proper implementation would be:
   *  - create the resource and send a 201 accepted back to the client
   *  - add the request to a queue to ensure deliverability
   *  - out of band: process the queue and update the database with its result
   */
  const orderWithIntegrationId = await relayOrder(pharmacy, data);

  const order = createModel<OrderModel>(orderWithIntegrationId);
  db.orders.set(order.id, order);

  return c.json(order);
});

// list orders
OrderController.get('/', (c) => {
  const orders = Array.from(db.orders.values());
  return c.json(orders);
});
