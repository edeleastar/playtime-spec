import { playlistStore } from '../models/db.js';

export const index = async (request, h) => {
  const user = request.auth.credentials;
  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : '';
  const { id } = request.params;
  const playlist = await playlistStore.getPlaylistById(id);
  if (!playlist || playlist.userid !== user._id) {
    return h.redirect('/dashboard');
  }
  return h.view('playlist-view', {
    title: playlist.title,
    menu: 'auth',
    user,
    userName,
    playlist,
  });
};
