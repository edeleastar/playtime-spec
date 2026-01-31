/**
 * Playlist Mongo store - persists playlists to MongoDB via Mongoose.
 * getPlaylistById includes tracks from the track store.
 */

import { v4 as uuidv4 } from 'uuid';
import { Playlist } from './playlist-model.js';
import { Track } from './track-model.js';

export const playlistMongoStore = {
  async getAllPlaylists() {
    const docs = await Playlist.find().lean();
    return docs;
  },

  async addPlaylist(playlist) {
    const _id = uuidv4();
    const doc = new Playlist({
      _id,
      userid: playlist.userid,
      title: playlist.title,
    });
    await doc.save();
    return doc.toObject ? doc.toObject() : { _id, ...playlist };
  },

  async getPlaylistById(id) {
    const doc = await Playlist.findById(id).lean();
    if (!doc) return null;
    const tracks = await Track.find({ playlistid: id }).lean();
    return { ...doc, tracks };
  },

  async getUserPlaylists(userid) {
    const docs = await Playlist.find({ userid }).lean();
    return docs;
  },

  async deletePlaylistById(id) {
    const result = await Playlist.deleteOne({ _id: id });
    return result.deletedCount > 0;
  },

  async deleteAllPlaylists() {
    await Playlist.deleteMany({});
  },
};
