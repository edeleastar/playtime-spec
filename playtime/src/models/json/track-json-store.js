/**
 * Track JSON store - persists tracks to db.json via LowDB.
 */

import { v4 as uuidv4 } from 'uuid';
import { getDb } from './store-utils.js';

function tracks() {
  return getDb().data.tracks;
}

export const trackJsonStore = {
  async getAllTracks() {
    return tracks();
  },

  async addTrack(playlistId, track) {
    const newTrack = {
      _id: uuidv4(),
      playlistid: playlistId,
      title: track.title,
      artist: track.artist,
      duration:
        track.duration !== undefined && track.duration !== ''
          ? Number(track.duration)
          : undefined,
    };
    await getDb().update((data) => data.tracks.push(newTrack));
    return newTrack;
  },

  async getTrackById(id) {
    const t = tracks().find((x) => x._id === id);
    return t ?? null;
  },

  async getTracksByPlaylistId(playlistId) {
    return tracks().filter((t) => t.playlistid === playlistId);
  },

  async deleteTrack(id) {
    const idx = tracks().findIndex((t) => t._id === id);
    if (idx !== -1) {
      await getDb().update((data) => data.tracks.splice(idx, 1));
    }
  },

  async deleteAllTracks() {
    await getDb().update((data) => {
      data.tracks = [];
    });
  },
};
