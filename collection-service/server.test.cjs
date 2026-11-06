'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
process.env.COLLECTION_DB = ':memory:';
process.env.COLLECTION_ORIGIN = 'http://localhost:3000';
process.env.COLLECTION_INSECURE_LOCAL = '1';
const { handle, db, initializeAdmin } = require('./server.cjs');

test('accounts, authorization, conflicts and reversible offboarding', async t => {
  initializeAdmin('admin', 'correct horse battery');
  const server = http.createServer(handle);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(() => { db.close(); resolve(); })));
  const base = `http://127.0.0.1:${server.address().port}`;
  async function request(route, { method = 'GET', data, cookie, origin = process.env.COLLECTION_ORIGIN } = {}) {
    const response = await fetch(base + route, {
      method, headers: { Origin: origin, ...(data ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) },
      ...(data ? { body: JSON.stringify(data) } : {})
    });
    return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
  }
  const admin = await request('/login', { method: 'POST', data: { username: 'admin', password: 'correct horse battery' } });
  assert.equal(admin.status, 200);
  assert.equal((await request('/admin/users', { method: 'POST', cookie: admin.cookie, origin: 'https://evil.example', data: {} })).status, 403);
  for (const username of ['alice', 'bob']) {
    assert.equal((await request('/admin/users', { method: 'POST', cookie: admin.cookie, data: { username, password: 'long enough password' } })).status, 201);
  }
  const users = (await request('/admin/users', { cookie: admin.cookie })).data;
  const alice = users.find(user => user.username === 'alice');
  const bob = users.find(user => user.username === 'bob');
  const login = await request('/login', { method: 'POST', data: { username: 'alice', password: 'long enough password' } });
  assert.equal((await request(`/editor/${bob.id}`, { cookie: login.cookie })).status, 403);
  assert.equal((await request('/admin/users', { cookie: login.cookie })).status, 403);
  const original = (await request(`/editor/${alice.id}`, { cookie: login.cookie })).data;
  assert.equal(original.sortOrder, 'name');
  const changed = { ...original, sortOrder: 'type', name: 'Alice favorites', entries: [{ name: 'Pikachu', sprite: 'collection-sprites/Pikachu.gif', ball: 'Dream Ball', ability: 'Static', sex: 'Female', types: ['Electric'] }] };
  assert.equal((await request(`/editor/${alice.id}`, { method: 'PUT', cookie: login.cookie, data: changed })).status, 200);
  assert.equal((await request(`/editor/${alice.id}`, { method: 'PUT', cookie: admin.cookie, data: changed })).status, 409);
  const publicCollection = (await request('/collections/alice')).data;
  assert.equal(publicCollection.entries[0].name, 'Pikachu');
  assert.equal(publicCollection.sortOrder, 'type');
  assert.equal((await request(`/editor/${alice.id}`, { method: 'PUT', cookie: login.cookie, data: { ...publicCollection, sortOrder: 'invalid' } })).status, 400);
  const { sortOrder, ...legacyPayload } = publicCollection;
  const legacySave = await request(`/editor/${alice.id}`, { method: 'PUT', cookie: login.cookie, data: legacyPayload });
  assert.equal(legacySave.status, 200);
  assert.equal(legacySave.data.sortOrder, 'type');
  assert.equal((await request(`/admin/users/${alice.id}/active`, { method: 'PUT', cookie: admin.cookie, data: { active: false } })).status, 200);
  assert.equal((await request('/collections/alice')).status, 404);
  assert.equal((await request(`/editor/${alice.id}`, { cookie: login.cookie })).status, 401);
  assert.equal((await request(`/admin/users/${alice.id}/active`, { method: 'PUT', cookie: admin.cookie, data: { active: true } })).status, 200);
  assert.equal((await request('/collections/alice')).data.entries[0].name, 'Pikachu');
  assert.equal((await request(`/admin/users/${alice.id}/password`, { method: 'PUT', cookie: admin.cookie, data: { password: 'new secure password' } })).status, 200);
  assert.equal((await request('/login', { method: 'POST', data: { username: 'alice', password: 'long enough password' } })).status, 401);
  assert.equal((await request('/login', { method: 'POST', data: { username: 'alice', password: 'new secure password' } })).status, 200);
  assert.notEqual(db.prepare('SELECT password FROM users WHERE id=?').get(alice.id).password, 'new secure password');
});
