import * as accounts from './controllers/accounts-controller.js';
import * as dashboard from './controllers/dashboard-controller.js';

const webRoutes = [
  { method: 'GET', path: '/', options: { auth: false }, handler: accounts.index },
  { method: 'GET', path: '/signup', options: { auth: false }, handler: accounts.showSignup },
  { method: 'POST', path: '/register', options: { auth: false }, handler: accounts.signup },
  { method: 'GET', path: '/login', options: { auth: false }, handler: accounts.showLogin },
  { method: 'POST', path: '/authenticate', options: { auth: false }, handler: accounts.login },
  { method: 'GET', path: '/logout', handler: accounts.logout },
  { method: 'GET', path: '/dashboard', handler: dashboard.index },
];

export default webRoutes;
