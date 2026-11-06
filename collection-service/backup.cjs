'use strict';
const fs = require('node:fs');
const { DatabaseSync, backup } = require('node:sqlite');

async function main() {
  const destination = process.argv[2];
  if (!destination || fs.existsSync(destination)) throw new Error('Provide a destination that does not already exist.');
  const db = new DatabaseSync(process.env.COLLECTION_DB || '/data/collections.sqlite', { readOnly: true });
  try {
    await backup(db, destination);
    console.log(`Backup created: ${destination}`);
  } finally { db.close(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
