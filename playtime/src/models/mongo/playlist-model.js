/**
 * Playlist Mongoose schema for MongoDB.
 */

import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userid: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false },
);

export const Playlist = mongoose.model('Playlist', playlistSchema);
