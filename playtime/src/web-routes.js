import * as accounts from './controllers/accounts-controller.js';
import * as dashboard from './controllers/dashboard-controller.js';

const webRoutes = [
  { method: 'GET', path: '/', handler: accounts.index },
  { method: 'GET', path: '/signup', handler: accounts.showSignup },
  { method: 'POST', path: '/register', handler: accounts.signup },
  { method: 'GET', path: '/login', handler: accounts.showLogin },
  { method: 'POST', path: '/authenticate', handler: accounts.login },
  { method: 'GET', path: '/logout', handler: accounts.logout },
  { method: 'GET', path: '/dashboard', handler: dashboard.index },
];

export default webRoutes;
