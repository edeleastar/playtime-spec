/**
 * Playlist JSON store - persists playlists to db.json via LowDB.
 */

import { v4 as uuidv4 } from 'uuid';
import { getDb } from './store-utils.js';

function playlists() {
  return getDb().data.playlists;
}

export const playlistJsonStore = {
  async getAllPlaylists() {
    return playlists();
  },

  async addPlaylist(playlist) {
    const newPlaylist = {
      _id: uuidv4(),
      userid: playlist.userid,
      title: playlist.title,
    };
    await getDb().update((data) => data.playlists.push(newPlaylist));
    return newPlaylist;
  },

  async getPlaylistById(id) {
    const found = playlists().find((x) => x._id === id);
    if (!found) return null;
    return { ...found, tracks: [] };
  },

  async getUserPlaylists(userid) {
    return playlists().filter((p) => p.userid === userid);
  },

  async deletePlaylistById(id) {
    const idx = playlists().findIndex((p) => p._id === id);
    if (idx !== -1) {
      await getDb().update((data) => data.playlists.splice(idx, 1));
    }
  },

  async deleteAllPlaylists() {
    await getDb().update((data) => {
      /* eslint-disable-next-line no-param-reassign -- lowdb update() expects mutation */
      data.playlists = [];
    });
  },
};
