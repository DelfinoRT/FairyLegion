'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

test('catalog includes existing cards and discovers new named sprites', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fairy-catalog-'));
  const dirs = ['ColeccionSilvarion', 'collection-sprites', 'data'];
  dirs.forEach(dir => fs.mkdirSync(path.join(root, dir)));
  const files = {
    'pokemon-types.json': '{"pikachu":["Electric"]}',
    'coleccion-silvarion.html': '<div class="pokemon-card"><img class="pokemon-img" src="ColeccionSilvarion/pikachu.gif"><div class="pokemon-name">Pikachu</div>',
    'coleccion-nemesis.html': '<div class="pokemon-card" data-name="Pikachu"><img class="pokemon-img" src="ColeccionSilvarion/pikachu.gif"><div class="pokemon-name">Pikachu</div>',
    'ColeccionSilvarion/pikachu.gif': '',
    'collection-sprites/shinyCharizard.gif': ''
  };
  for (const [file, contents] of Object.entries(files)) fs.writeFileSync(path.join(root, file), contents);
  t.after(() => {
    for (const file of [...Object.keys(files), 'data/collection-catalog.json']) fs.rmSync(path.join(root, file), { force: true });
    dirs.forEach(dir => fs.rmdirSync(path.join(root, dir)));
    fs.rmdirSync(root);
  });
  execFileSync(process.execPath, [path.join(__dirname, 'generate-collection-catalog.cjs')], { env: { ...process.env, COLLECTION_CATALOG_ROOT: root } });
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'collection-catalog.json')));
  assert.deepEqual(catalog.find(item => item.name === 'Pikachu').types, ['Electric']);
  assert.equal(catalog.find(item => item.name === 'Shiny Charizard').sprite, 'collection-sprites/shinyCharizard.gif');
  assert.equal(catalog.length, 2);
});
