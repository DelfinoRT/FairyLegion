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

test('existing collection databases gain a default sort order without losing data', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fairy-migration-'));
  const file = path.join(dir, 'collections.sqlite');
  t.after(() => {
    for (const suffix of ['', '-wal', '-shm']) fs.rmSync(file + suffix, { force: true });
    fs.rmdirSync(dir);
  });
  const old = new DatabaseSync(file);
  old.exec(`CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password TEXT NOT NULL, admin INTEGER NOT NULL DEFAULT 0, active INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE collections (user_id INTEGER PRIMARY KEY REFERENCES users(id), slug TEXT NOT NULL UNIQUE COLLATE NOCASE,
    name TEXT NOT NULL, background TEXT NOT NULL DEFAULT '#21132e', accent TEXT NOT NULL DEFAULT '#c58bf0',
    entries TEXT NOT NULL DEFAULT '[]', version INTEGER NOT NULL DEFAULT 1);
    INSERT INTO users (id, username, password) VALUES (1, 'alice', 'hash');
    INSERT INTO collections (user_id, slug, name, entries, version) VALUES (1, 'alice', 'Alice', '[{"name":"Pikachu"}]', 7);`);
  old.close();
  const check = "const { db } = require(process.argv[1]); console.log(JSON.stringify(db.prepare('SELECT * FROM collections').get())); db.close();";
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = spawnSync(process.execPath, ['-e', check, path.join(__dirname, 'server.cjs')], { env: { ...process.env, COLLECTION_DB: file }, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const row = JSON.parse(result.stdout);
    assert.equal(row.sort_order, 'name');
    assert.equal(row.name, 'Alice');
    assert.equal(row.version, 7);
    assert.deepEqual(JSON.parse(row.entries), [{ name: 'Pikachu' }]);
  }
});
