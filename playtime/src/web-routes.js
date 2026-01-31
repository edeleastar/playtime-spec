import * as accounts from './controllers/accounts-controller.js';
import * as dashboard from './controllers/dashboard-controller.js';
import * as playlist from './controllers/playlist-controller.js';
import {
  UserSpec,
  UserCredentialsSpec,
  PlaylistSpec,
  TrackSpec,
} from './models/joi-schemas.js';

const webRoutes = [
  { method: 'GET', path: '/', options: { auth: false }, handler: accounts.index },
  { method: 'GET', path: '/signup', options: { auth: false }, handler: accounts.showSignup },
  {
    method: 'POST',
    path: '/register',
    options: {
      auth: false,
      validate: {
        payload: UserSpec,
        failAction: accounts.signupFailAction,
      },
    },
    handler: accounts.signup,
  },
  { method: 'GET', path: '/login', options: { auth: false }, handler: accounts.showLogin },
  {
    method: 'POST',
    path: '/authenticate',
    options: {
      auth: false,
      validate: {
        payload: UserCredentialsSpec,
        failAction: accounts.loginFailAction,
      },
    },
    handler: accounts.login,
  },
  { method: 'GET', path: '/logout', handler: accounts.logout },
  { method: 'GET', path: '/dashboard', handler: dashboard.index },
  {
    method: 'POST',
    path: '/dashboard/addplaylist',
    options: {
      validate: {
        payload: PlaylistSpec,
        failAction: dashboard.addPlaylistFailAction,
      },
    },
    handler: dashboard.addPlaylist,
  },
  { method: 'GET', path: '/dashboard/deleteplaylist/{id}', handler: dashboard.deletePlaylist },
  { method: 'GET', path: '/playlist/{id}', handler: playlist.index },
  {
    method: 'POST',
    path: '/playlist/{id}/addtrack',
    options: {
      validate: {
        payload: TrackSpec,
        failAction: playlist.addTrackFailAction,
      },
    },
    handler: playlist.addTrack,
  },
  { method: 'GET', path: '/playlist/{id}/deletetrack/{trackid}', handler: playlist.deleteTrack },
];

export default webRoutes;
