import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { OrderCreateDto } from './order.dto';

export const OrderController = new Hono();

OrderController.post('/', zValidator('json', OrderCreateDto), (c) => {
  const data = c.req.valid('json');

  return c.json(data);
});
