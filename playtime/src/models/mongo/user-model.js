/**
 * User Mongoose schema for MongoDB.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { _id: false },
);

export const User = mongoose.model('User', userSchema);
