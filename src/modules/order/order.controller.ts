import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createModel, db } from '~/db';
import { OrderCreateDto } from './order.dto';
import { relayOrder } from '~/integration/relay-order';
import { OrderModel } from './order.model';

export const OrderController = new Hono();

// initialize the database for orders
db.orders = new Map();

// create an order
OrderController.post('/', zValidator('json', OrderCreateDto), async (c) => {
  const { pharmacy, ...data } = c.req.valid('json');

  const orderWithIntegrationId = await relayOrder(pharmacy, data);

  const order = createModel<OrderModel>(orderWithIntegrationId);
  db.orders.set(order.id, order);

  return c.json(order);
});

// list orders
OrderController.get('/', (c) => {
  const orders = Array.from([...db.orders.values()]);
  return c.json(orders);
});
