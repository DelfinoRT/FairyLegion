'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { DatabaseSync } = require('node:sqlite');

test('administrator data persists and online backup can be restored', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fairy-backup-'));
  const source = path.join(dir, 'source.sqlite');
  const copy = path.join(dir, 'backup.sqlite');
  t.after(() => {
    for (const name of ['source.sqlite', 'source.sqlite-wal', 'source.sqlite-shm', 'backup.sqlite', 'backup.sqlite-wal', 'backup.sqlite-shm']) {
      fs.rmSync(path.join(dir, name), { force: true });
    }
    fs.rmdirSync(dir);
  });
  const env = { ...process.env, COLLECTION_DB: source };
  const init = spawnSync(process.execPath, [path.join(__dirname, 'server.cjs'), 'init-admin', 'admin'], { env, input: 'long secure password', encoding: 'utf8' });
  assert.equal(init.status, 0, init.stderr);
  const create = spawnSync(process.execPath, [path.join(__dirname, 'backup.cjs'), copy], { env, encoding: 'utf8' });
  assert.equal(create.status, 0, create.stderr);
  const restored = new DatabaseSync(copy, { readOnly: true });
  assert.equal(restored.prepare('SELECT username FROM users WHERE admin=1').get().username, 'admin');
  restored.close();
  const overwrite = spawnSync(process.execPath, [path.join(__dirname, 'backup.cjs'), copy], { env, encoding: 'utf8' });
  assert.notEqual(overwrite.status, 0);
});
