/**
 * Track Mongo store - persists tracks to MongoDB via Mongoose.
 */

import { v4 as uuidv4 } from 'uuid';
import { Track } from './track-model.js';

export const trackMongoStore = {
  async getAllTracks() {
    const docs = await Track.find().lean();
    return docs;
  },

  async addTrack(playlistId, track) {
    const duration =
      track.duration !== undefined && track.duration !== ''
        ? Number(track.duration)
        : undefined;
    const _id = uuidv4();
    const doc = new Track({
      _id,
      playlistid: playlistId,
      title: track.title,
      artist: track.artist,
      duration,
    });
    await doc.save();
    return doc.toObject ? doc.toObject() : { _id, playlistid: playlistId, title: track.title, artist: track.artist, duration };
  },

  async getTrackById(id) {
    const doc = await Track.findById(id).lean();
    return doc ?? null;
  },

  async getTracksByPlaylistId(playlistId) {
    const docs = await Track.find({ playlistid: playlistId }).lean();
    return docs;
  },

  async deleteTrack(id) {
    const result = await Track.deleteOne({ _id: id });
    return result.deletedCount > 0;
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },
};
