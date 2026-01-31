import { userMemStore } from './mem/user-mem-store.js';
import { playlistMemStore } from './mem/playlist-mem-store.js';
import { trackMemStore } from './mem/track-mem-store.js';

/* eslint-disable import/no-mutable-exports -- init() reassigns for store swap */
export let userStore = userMemStore;
export let playlistStore = playlistMemStore;
export let trackStore = trackMemStore;

export const init = () => {
  userStore = userMemStore;
  playlistStore = playlistMemStore;
  trackStore = trackMemStore;
};
