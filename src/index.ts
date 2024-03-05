import { config } from 'dotenv';
config();

import { serve } from '@hono/node-server';
import axios from 'axios';
import { Hono } from 'hono';
import { OrderController } from './modules/order/order.controller';

const port = parseInt(process.env.PORT) || 3000;
axios.defaults.baseURL = process.env.INTEGRATION_API_URL;

const app = new Hono();
app.route('/orders', OrderController);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Hono is running on port ${port}`);
