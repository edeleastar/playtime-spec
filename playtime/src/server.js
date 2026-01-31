import './load-env.js';
import Hapi from '@hapi/hapi';
import Joi from 'joi';
import Vision from '@hapi/vision';
import Cookie from '@hapi/cookie';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webRoutes from './web-routes.js';
import { init as dbInit } from './models/db.js';
import * as accounts from './controllers/accounts-controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const cookieName = process.env.cookie_name || 'playtime_session';
const cookiePassword =
  process.env.cookie_password || 'dev-password-32-chars-minimum!!!';

export const init = async () => {
  await dbInit();
  const server = Hapi.server({
    port,
    host: 'localhost',
  });

  server.validator(Joi);
  await server.register(Vision);
  await server.register(Cookie);

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: cookieName,
      password: cookiePassword,
      isSecure: false,
    },
    redirectTo: '/',
    validate: accounts.validate,
  });
  server.auth.default('session');

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
