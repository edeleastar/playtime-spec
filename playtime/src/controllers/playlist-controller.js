import { playlistStore, trackStore } from '../models/db.js';

export const index = async (request, h) => {
  const user = request.auth.credentials;
  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : '';
  const { id } = request.params;
  const playlist = await playlistStore.getPlaylistById(id);
  if (!playlist || playlist.userid !== user._id) {
    return h.redirect('/dashboard');
  }
  const tracks = await trackStore.getTracksByPlaylistId(id);
  const playlistWithTracks = { ...playlist, tracks };
  return h.view('playlist-view', {
    title: playlist.title,
    menu: 'auth',
    user,
    userName,
    playlist: playlistWithTracks,
  });
};

export const addTrack = async (request, h) => {
  const user = request.auth.credentials;
  const { id } = request.params;
  const playlist = await playlistStore.getPlaylistById(id);
  if (!playlist || playlist.userid !== user._id) {
    return h.redirect('/dashboard');
  }
  const { title, artist, duration } = request.payload;
  await trackStore.addTrack(id, { title, artist, duration });
  return h.redirect(`/playlist/${id}`);
};

export const deleteTrack = async (request, h) => {
  const user = request.auth.credentials;
  const { id, trackid } = request.params;
  const playlist = await playlistStore.getPlaylistById(id);
  if (!playlist || playlist.userid !== user._id) {
    return h.redirect('/dashboard');
  }
  await trackStore.deleteTrack(trackid);
  return h.redirect(`/playlist/${id}`);
};
