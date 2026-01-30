import { userMemStore } from './mem/user-mem-store.js';

/* eslint-disable import/no-mutable-exports -- init() reassigns for store swap */
export let userStore = userMemStore;

export const init = () => {
  userStore = userMemStore;
};
