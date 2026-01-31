/**
 * Track Mongoose schema for MongoDB.
 */

import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    playlistid: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    duration: { type: Number, default: undefined },
  },
  { _id: false },
);

export const Track = mongoose.model('Track', trackSchema);
