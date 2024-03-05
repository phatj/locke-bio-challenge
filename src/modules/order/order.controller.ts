import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createModel, db } from '~/db';
import { OrderCreateDto } from './order.dto';

export const OrderController = new Hono();

// initialize the database for orders
db.orders = new Map();

// create an order
OrderController.post('/', zValidator('json', OrderCreateDto), (c) => {
  const data = c.req.valid('json');

  const order = createModel(data);
  db.orders.set(order.id, order);

  return c.json(order);
});

// list orders
OrderController.get('/', (c) => {
  const orders = Array.from([...db.orders.values()]);
  return c.json(orders);
});
