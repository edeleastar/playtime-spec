import { playlistStore } from '../models/db.js';

export const index = async (request, h) => {
  const user = request.auth.credentials;
  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : '';
  const playlists = await playlistStore.getUserPlaylists(user._id);
  return h.view('dashboard-view', {
    title: 'Dashboard',
    menu: 'auth',
    user,
    userName,
    playlists,
  });
};

export const addPlaylist = async (request, h) => {
  const user = request.auth.credentials;
  const { title } = request.payload;
  await playlistStore.addPlaylist({ userid: user._id, title });
  return h.redirect('/dashboard');
};
