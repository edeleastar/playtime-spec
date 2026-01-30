import { userMemStore } from './mem/user-mem-store.js';
import { playlistMemStore } from './mem/playlist-mem-store.js';

/* eslint-disable import/no-mutable-exports -- init() reassigns for store swap */
export let userStore = userMemStore;
export let playlistStore = playlistMemStore;

export const init = () => {
  userStore = userMemStore;
  playlistStore = playlistMemStore;
};
