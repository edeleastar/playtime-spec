import * as accounts from './controllers/accounts-controller.js';
import * as dashboard from './controllers/dashboard-controller.js';
import * as playlist from './controllers/playlist-controller.js';

const webRoutes = [
  { method: 'GET', path: '/', options: { auth: false }, handler: accounts.index },
  { method: 'GET', path: '/signup', options: { auth: false }, handler: accounts.showSignup },
  { method: 'POST', path: '/register', options: { auth: false }, handler: accounts.signup },
  { method: 'GET', path: '/login', options: { auth: false }, handler: accounts.showLogin },
  { method: 'POST', path: '/authenticate', options: { auth: false }, handler: accounts.login },
  { method: 'GET', path: '/logout', handler: accounts.logout },
  { method: 'GET', path: '/dashboard', handler: dashboard.index },
  { method: 'POST', path: '/dashboard/addplaylist', handler: dashboard.addPlaylist },
  { method: 'GET', path: '/dashboard/deleteplaylist/{id}', handler: dashboard.deletePlaylist },
  { method: 'GET', path: '/playlist/{id}', handler: playlist.index },
  { method: 'POST', path: '/playlist/{id}/addtrack', handler: playlist.addTrack },
  { method: 'GET', path: '/playlist/{id}/deletetrack/{trackid}', handler: playlist.deleteTrack },
];

export default webRoutes;
