'use strict';

const http = require('node:http');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = process.env.COLLECTION_DB || path.join(__dirname, 'collections.sqlite');
const origin = process.env.COLLECTION_ORIGIN || 'https://www.fairylegion.com';
const secure = process.env.COLLECTION_INSECURE_LOCAL !== '1';
const db = new DatabaseSync(dbPath);
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password TEXT NOT NULL, admin INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS collections (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE COLLATE NOCASE, name TEXT NOT NULL,
  background TEXT NOT NULL DEFAULT '#21132e', accent TEXT NOT NULL DEFAULT '#c58bf0',
  entries TEXT NOT NULL DEFAULT '[]', version INTEGER NOT NULL DEFAULT 1
);`);

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
}
function checkPassword(password, hash) {
  const [salt, encoded] = hash.split(':');
  const expected = Buffer.from(encoded, 'hex');
  return expected.length === 64 && crypto.timingSafeEqual(expected, crypto.scryptSync(password, salt, 64));
}
function validPassword(value) {
  return typeof value === 'string' && value.length >= 12 && Buffer.byteLength(value) <= 256;
}
function validUsername(value) {
  return typeof value === 'string' && /^[a-z0-9][a-z0-9_-]{2,31}$/.test(value);
}
function userById(id) {
  return db.prepare('SELECT id, username, admin, active FROM users WHERE id = ?').get(id);
}
function initializeAdmin(username, password) {
  if (!validUsername(username) || !validPassword(password)) throw new Error('Invalid username or password (minimum 12 characters).');
  if (db.prepare('SELECT id FROM users WHERE admin = 1').get()) throw new Error('An administrator already exists.');
  db.prepare('INSERT INTO users (username, password, admin) VALUES (?, ?, 1)').run(username, hashPassword(password));
}
function send(res, status, data, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
  res.end(JSON.stringify(data));
}
function fail(status, message) {
  return Object.assign(new Error(message), { status });
}
async function body(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (Buffer.byteLength(text) > 1024 * 1024) throw fail(413, 'La solicitud es demasiado grande.');
  }
  try {
    const result = JSON.parse(text);
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error('Invalid object');
    return result;
  } catch {
    throw fail(400, 'Datos inválidos.');
  }
}
function session(req) {
  const match = /(?:^|;\s*)fairy_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '');
  if (!match) return null;
  const digest = crypto.createHash('sha256').update(match[1]).digest('hex');
  return db.prepare(`SELECT u.id, u.username, u.admin, u.active FROM sessions s
    JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.active=1`).get(digest, Date.now());
}
function requireUser(req, admin = false) {
  const user = session(req);
  if (!user) throw fail(401, 'Inicia sesión.');
  if (admin && !user.admin) throw fail(403, 'Acceso de administrador requerido.');
  return user;
}
function cookie(value, maxAge) {
  return `fairy_session=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}
const attempts = new Map();
function limitLogin(username) {
  const now = Date.now();
  for (const [key, timestamps] of attempts) {
    const live = timestamps.filter(time => now - time < 15 * 60 * 1000);
    if (live.length) attempts.set(key, live); else attempts.delete(key);
  }
  // A global budget also limits attempts across arbitrary usernames.
  for (const key of ['*', `user:${username.toLowerCase()}`]) {
    const timestamps = attempts.get(key) || [];
    if (timestamps.length >= (key === '*' ? 100 : 10)) throw fail(429, 'Demasiados intentos; inténtalo más tarde.');
  }
  for (const key of ['*', `user:${username.toLowerCase()}`]) {
    attempts.set(key, [...(attempts.get(key) || []), now]);
  }
}
function collectionFor(userId) {
  const row = db.prepare('SELECT slug, name, background, accent, entries, version FROM collections WHERE user_id=?').get(userId);
  return row ? { ...row, entries: JSON.parse(row.entries) } : null;
}
function saveCollection(userId, input) {
  const { name, background, accent, entries, version } = input;
  if (typeof name !== 'string' || !name.trim() || name.length > 80 ||
      !/^#[a-f\d]{6}$/i.test(background || '') || !/^#[a-f\d]{6}$/i.test(accent || '') ||
      !Number.isInteger(version) || !Array.isArray(entries) || entries.length > 2000) throw fail(400, 'Datos de colección inválidos.');
  const clean = entries.map(entry => {
    if (!entry || typeof entry !== 'object' ||
        typeof entry.name !== 'string' || !entry.name.trim() || entry.name.length > 100 ||
        typeof entry.sprite !== 'string' || !/^(?:ColeccionSilvarion|collection-sprites)\/[a-zA-Z0-9 _().'-]+\.(?:gif|png|webp)$/i.test(entry.sprite) ||
        typeof entry.ball !== 'string' || entry.ball.length > 60 ||
        typeof entry.ability !== 'string' || entry.ability.length > 80 ||
        !['', 'Male', 'Female', 'Genderless'].includes(entry.sex) ||
        !Array.isArray(entry.types) || entry.types.length > 2 ||
        entry.types.some(type => !/^(Normal|Fire|Water|Electric|Grass|Ice|Fighting|Poison|Ground|Flying|Psychic|Bug|Rock|Ghost|Dragon|Dark|Steel|Fairy)$/.test(type))) {
      throw fail(400, 'Datos de Pokémon inválidos.');
    }
    return { name: entry.name.trim(), sprite: entry.sprite, ball: entry.ball.trim(), ability: entry.ability.trim(), sex: entry.sex, types: entry.types };
  });
  const result = db.prepare('UPDATE collections SET name=?, background=?, accent=?, entries=?, version=version+1 WHERE user_id=? AND version=?')
    .run(name.trim(), background, accent, JSON.stringify(clean), userId, version);
  if (!result.changes) throw fail(409, 'La colección cambió en otra sesión; recarga antes de guardar.');
  return collectionFor(userId);
}
async function handle(req, res) {
  const requestOrigin = req.headers.origin;
  if (requestOrigin === origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    if (requestOrigin !== origin) return send(res, 403, { error: 'Origen no permitido.' });
    res.writeHead(204, { 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600' });
    return res.end();
  }
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method !== 'GET' && requestOrigin !== origin) throw fail(403, 'Origen no permitido.');
    if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true });
    if (req.method === 'POST' && url.pathname === '/login') {
      const input = await body(req);
      if (!validUsername(input.username) || typeof input.password !== 'string' || Buffer.byteLength(input.password) > 256) throw fail(400, 'Credenciales inválidas.');
      limitLogin(input.username);
      const user = db.prepare('SELECT * FROM users WHERE username=?').get(input.username);
      if (!user || !user.active || !checkPassword(input.password, user.password)) throw fail(401, 'Usuario o contraseña incorrectos.');
      db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());
      const token = crypto.randomBytes(32).toString('hex');
      db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(crypto.createHash('sha256').update(token).digest('hex'), user.id, Date.now() + 86400000 * 7);
      return send(res, 200, { user: userById(user.id) }, { 'Set-Cookie': cookie(token, 604800) });
    }
    if (req.method === 'POST' && url.pathname === '/logout') {
      const match = /(?:^|;\s*)fairy_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '');
      if (match) db.prepare('DELETE FROM sessions WHERE token=?').run(crypto.createHash('sha256').update(match[1]).digest('hex'));
      return send(res, 200, { ok: true }, { 'Set-Cookie': cookie('', 0) });
    }
    if (req.method === 'GET' && url.pathname === '/session') return send(res, 200, { user: session(req) });
    if (req.method === 'PUT' && url.pathname === '/password') {
      const user = requireUser(req);
      const input = await body(req);
      const record = db.prepare('SELECT password FROM users WHERE id=?').get(user.id);
      if (typeof input.currentPassword !== 'string' || Buffer.byteLength(input.currentPassword) > 256 ||
          !checkPassword(input.currentPassword, record.password)) throw fail(403, 'Contraseña actual incorrecta.');
      if (!validPassword(input.password)) throw fail(400, 'La contraseña debe tener al menos 12 caracteres.');
      db.prepare('UPDATE users SET password=? WHERE id=?').run(hashPassword(input.password), user.id);
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);
      return send(res, 200, { ok: true }, { 'Set-Cookie': cookie('', 0) });
    }
    if (req.method === 'GET' && url.pathname === '/collections') {
      const rows = db.prepare('SELECT c.slug,c.name FROM collections c JOIN users u ON u.id=c.user_id WHERE u.active=1 ORDER BY c.name COLLATE NOCASE').all();
      return send(res, 200, rows);
    }
    const publicMatch = /^\/collections\/([a-z0-9_-]+)$/.exec(url.pathname);
    if (req.method === 'GET' && publicMatch) {
      const row = db.prepare('SELECT c.user_id FROM collections c JOIN users u ON u.id=c.user_id WHERE c.slug=? AND u.active=1').get(publicMatch[1]);
      if (!row) throw fail(404, 'Colección no encontrada.');
      return send(res, 200, collectionFor(row.user_id));
    }
    if (req.method === 'GET' && url.pathname === '/admin/users') {
      requireUser(req, true);
      return send(res, 200, db.prepare('SELECT u.id,u.username,u.active,c.slug,c.name FROM users u LEFT JOIN collections c ON c.user_id=u.id WHERE u.admin=0 ORDER BY u.username').all());
    }
    if (req.method === 'POST' && url.pathname === '/admin/users') {
      requireUser(req, true);
      const input = await body(req);
      if (!validUsername(input.username) || !validPassword(input.password)) throw fail(400, 'Usa un usuario de 3 a 32 caracteres y una contraseña de al menos 12 caracteres.');
      if (db.prepare('SELECT id FROM users WHERE username=?').get(input.username)) throw fail(409, 'El usuario ya existe.');
      const hash = hashPassword(input.password);
      db.exec('BEGIN IMMEDIATE');
      try {
        const result = db.prepare('INSERT INTO users (username,password) VALUES (?,?)').run(input.username, hash);
        db.prepare('INSERT INTO collections (user_id,slug,name) VALUES (?,?,?)').run(result.lastInsertRowid, input.username, `Colección ${input.username}`);
        db.exec('COMMIT');
      } catch (error) { db.exec('ROLLBACK'); throw error; }
      return send(res, 201, { ok: true });
    }
    const adminMatch = /^\/admin\/users\/(\d+)\/(password|active)$/.exec(url.pathname);
    if (req.method === 'PUT' && adminMatch) {
      requireUser(req, true);
      const id = Number(adminMatch[1]);
      const target = userById(id);
      if (!target || target.admin) throw fail(404, 'Usuario no encontrado.');
      const input = await body(req);
      if (adminMatch[2] === 'password') {
        if (!validPassword(input.password)) throw fail(400, 'La contraseña debe tener al menos 12 caracteres.');
        db.prepare('UPDATE users SET password=? WHERE id=?').run(hashPassword(input.password), id);
      } else {
        if (typeof input.active !== 'boolean') throw fail(400, 'Estado inválido.');
        db.prepare('UPDATE users SET active=? WHERE id=?').run(input.active ? 1 : 0, id);
      }
      db.prepare('DELETE FROM sessions WHERE user_id=?').run(id);
      return send(res, 200, { ok: true });
    }
    const editMatch = /^\/editor\/(\d+)$/.exec(url.pathname);
    if (editMatch && (req.method === 'GET' || req.method === 'PUT')) {
      const user = requireUser(req);
      const id = Number(editMatch[1]);
      if (!user.admin && user.id !== id) throw fail(403, 'No puedes editar esta colección.');
      const target = userById(id);
      if (!target || target.admin) throw fail(404, 'Colección no encontrada.');
      if (req.method === 'GET') return send(res, 200, collectionFor(id));
      return send(res, 200, saveCollection(id, await body(req)));
    }
    throw fail(404, 'Ruta no encontrada.');
  } catch (error) {
    if (!error.status) console.error(error);
    return send(res, error.status || 500, { error: error.status ? error.message : 'Error interno del servicio.' });
  }
}
if (require.main === module) {
  if (process.argv[2] === 'init-admin') {
    try {
      const password = fs.readFileSync(0, 'utf8').replace(/\r?\n$/, '');
      initializeAdmin(process.argv[3], password);
      console.log('Administrator created.');
    } catch (error) { console.error(error.message); process.exitCode = 1; }
    db.close();
  } else {
    const server = http.createServer(handle);
    server.listen(Number(process.env.PORT || 8080), '0.0.0.0', () => console.log('Collection service listening'));
  }
}
module.exports = { handle, db, initializeAdmin };
