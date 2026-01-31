import { v4 as uuidv4 } from 'uuid';

let tracks = [];

export const trackMemStore = {
  async getAllTracks() {
    return tracks;
  },

  async addTrack(playlistId, track) {
    const duration =
      track.duration !== undefined && track.duration !== ''
        ? Number(track.duration)
        : undefined;
    const newTrack = {
      _id: uuidv4(),
      playlistid: playlistId,
      title: track.title,
      artist: track.artist,
      duration,
    };
    tracks.push(newTrack);
    return newTrack;
  },

  async getTrackById(id) {
    const found = tracks.find((t) => t._id === id);
    return found ?? null;
  },

  async getTracksByPlaylistId(playlistId) {
    return tracks.filter((t) => t.playlistid === playlistId);
  },

  async deleteTrack(id) {
    const index = tracks.findIndex((t) => t._id === id);
    if (index !== -1) tracks.splice(index, 1);
  },

  async deleteAllTracks() {
    tracks = [];
  },
};
