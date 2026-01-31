/**
 * LowDB store utilities - configures JSON file persistence.
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSONFilePreset } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'db.json');

const defaultData = {
  users: [],
  playlists: [],
  tracks: [],
};

let db = null;

/**
 * Initialize the JSON database. Must be called before getDb().
 * @returns {Promise<object>} LowDB instance
 */
export async function init() {
  if (db) return db;
  db = await JSONFilePreset(dbPath, defaultData);
  return db;
}

/**
 * Get the database instance. init() must have been called first.
 * @returns {object} LowDB instance with .data and .update()
 */
export function getDb() {
  return db;
}
