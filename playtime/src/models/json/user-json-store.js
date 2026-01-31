/**
 * User JSON store - persists users to db.json via LowDB.
 */

import { v4 as uuidv4 } from 'uuid';
import { getDb } from './store-utils.js';

function users() {
  return getDb().data.users;
}

export const userJsonStore = {
  async getAllUsers() {
    return users();
  },

  async addUser(user) {
    const newUser = {
      _id: uuidv4(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    await getDb().update((data) => data.users.push(newUser));
    return newUser;
  },

  async getUserById(id) {
    const u = users().find((x) => x._id === id);
    return u ?? null;
  },

  async getUserByEmail(email) {
    const u = users().find((x) => x.email === email);
    return u ?? null;
  },

  async deleteUserById(id) {
    const idx = users().findIndex((x) => x._id === id);
    if (idx !== -1) {
      await getDb().update((data) => data.users.splice(idx, 1));
    }
  },

  async deleteAll() {
    await getDb().update((data) => {
      /* eslint-disable-next-line no-param-reassign -- lowdb update() expects mutation */
      data.users = [];
    });
  },
};
