import { v4 as uuidv4 } from 'uuid';

let playlists = [];

export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist) {
    const newPlaylist = {
      _id: uuidv4(),
      userid: playlist.userid,
      title: playlist.title,
    };
    playlists.push(newPlaylist);
    return newPlaylist;
  },

  async getPlaylistById(id) {
    const found = playlists.find((p) => p._id === id);
    if (!found) return null;
    return { ...found, tracks: [] };
  },

  async getUserPlaylists(userid) {
    return playlists.filter((p) => p.userid === userid);
  },

  async deletePlaylistById(id) {
    const index = playlists.findIndex((p) => p._id === id);
    if (index !== -1) playlists.splice(index, 1);
  },

  async deleteAllPlaylists() {
    playlists = [];
  },
};
