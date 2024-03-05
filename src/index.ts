import { config } from 'dotenv';
config();

import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
