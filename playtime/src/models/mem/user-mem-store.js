import { v4 as uuidv4 } from 'uuid';

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    const newUser = {
      _id: uuidv4(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    users.push(newUser);
    return newUser;
  },

  async getUserById(id) {
    const found = users.find((u) => u._id === id);
    return found ?? null;
  },

  async getUserByEmail(email) {
    const found = users.find((u) => u.email === email);
    return found ?? null;
  },

  async deleteUserById(id) {
    const index = users.findIndex((u) => u._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
