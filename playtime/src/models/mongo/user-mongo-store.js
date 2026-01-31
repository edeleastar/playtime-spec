/**
 * User Mongo store - persists users to MongoDB via Mongoose.
 */

import { v4 as uuidv4 } from 'uuid';
import { User } from './user-model.js';

export const userMongoStore = {
  async getAllUsers() {
    const docs = await User.find().lean();
    return docs;
  },

  async addUser(user) {
    const _id = uuidv4();
    const doc = new User({
      _id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    await doc.save();
    return doc.toObject ? doc.toObject() : { _id, ...user };
  },

  async getUserById(id) {
    const doc = await User.findById(id).lean();
    return doc ?? null;
  },

  async getUserByEmail(email) {
    const doc = await User.findOne({ email }).lean();
    return doc ?? null;
  },

  async deleteUserById(id) {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount > 0;
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
