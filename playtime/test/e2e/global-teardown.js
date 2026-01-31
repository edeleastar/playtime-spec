import { unlinkSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', '..', 'src', 'models', 'json', 'db.json');

export default async function globalTeardown() {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath);
  }
}
