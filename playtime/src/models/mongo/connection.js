/**
 * MongoDB connection via Mongoose. Connect when MONGO_URI is set.
 */

import mongoose from 'mongoose';

export async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) return false;
  await mongoose.connect(uri);
  return true;
}

export function isConnected() {
  return mongoose.connection?.readyState === 1;
}
