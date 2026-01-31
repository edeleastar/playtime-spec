import { playlistStore, trackStore } from '../models/db.js';

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

export const deletePlaylist = async (request, h) => {
  const user = request.auth.credentials;
  const { id } = request.params;
  const playlist = await playlistStore.getPlaylistById(id);
  if (!playlist || playlist.userid !== user._id) {
    return h.redirect('/dashboard');
  }
  const tracks = await trackStore.getTracksByPlaylistId(id);
  await Promise.all(tracks.map((track) => trackStore.deleteTrack(track._id)));
  await playlistStore.deletePlaylistById(id);
  return h.redirect('/dashboard');
};
