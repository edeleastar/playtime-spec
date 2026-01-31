import { userMemStore } from './mem/user-mem-store.js';
import { playlistMemStore } from './mem/playlist-mem-store.js';
import { trackMemStore } from './mem/track-mem-store.js';
import { init as initJsonStore } from './json/store-utils.js';
import { userJsonStore } from './json/user-json-store.js';
import { playlistJsonStore } from './json/playlist-json-store.js';
import { trackJsonStore } from './json/track-json-store.js';

/* eslint-disable import/no-mutable-exports -- init() reassigns for store swap */
export let userStore = userMemStore;
export let playlistStore = playlistMemStore;
export let trackStore = trackMemStore;

export async function init() {
  await initJsonStore();
  userStore = userJsonStore;
  playlistStore = playlistJsonStore;
  trackStore = trackJsonStore;
}
