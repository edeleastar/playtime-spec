import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webRoutes from './web-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;

export const init = async () => {
  const server = Hapi.server({
    port,
    host: 'localhost',
  });

  await server.register(Vision);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layouts',
    partialsPath: './views/partials',
    layout: true,
    isCached: false,
  });

  server.route(webRoutes);

  return server;
};

const start = async () => {
  const server = await init();
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
  return server;
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
