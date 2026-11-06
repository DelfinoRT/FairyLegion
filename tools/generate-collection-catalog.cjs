'use strict';

const fs = require('node:fs');
const path = require('node:path');
const root = process.env.COLLECTION_CATALOG_ROOT || path.resolve(__dirname, '..');
const types = JSON.parse(fs.readFileSync(path.join(root, 'pokemon-types.json'), 'utf8'));
const catalog = new Map();
const add = (name, sprite, explicitTypes = []) => {
  const key = name.toLowerCase();
  const resolvedTypes = explicitTypes.length ? explicitTypes : (types[key] || []);
  if (!catalog.has(key)) catalog.set(key, { name, sprite, types: resolvedTypes });
  else if (!catalog.get(key).types.length && resolvedTypes.length) catalog.get(key).types = resolvedTypes;
};
for (const page of ['coleccion-silvarion.html', 'coleccion-nemesis.html']) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const matches = [...html.matchAll(/<div class="pokemon-card"[^>]*>[\s\S]*?<img[^>]*class="pokemon-img"[^>]*>[\s\S]*?<div class="pokemon-name">([^<]+)<\/div>/g)];
  const count = [...html.matchAll(/<div class="pokemon-card"/g)].length;
  if (matches.length !== count) throw new Error(`Could not read all Pokémon cards in ${page}: ${matches.length}/${count}`);
  for (const match of matches) {
    const sprite = /class="pokemon-img"[^>]*src="([^"]+)"/.exec(match[0]);
    const nextCard = html.indexOf('<div class="pokemon-card"', match.index + 1);
    const details = html.slice(match.index, nextCard < 0 ? match.index + 3000 : nextCard);
    const explicit = /data-types="([^"]+)"/.exec(match[0]);
    const typeRow = /<div class="pokemon-types">([\s\S]*?)<\/div>/.exec(details);
    const iconTypes = typeRow ? [...typeRow[1].matchAll(/alt="([^"]+)"/g)].map(icon => icon[1]) : [];
    if (!sprite || !/^ColeccionSilvarion\/[a-zA-Z0-9 _().'-]+\.(gif|png|webp)$/i.test(sprite[1])) throw new Error(`Unsupported Pokémon sprite in ${page}: ${match[1]}`);
    if (!fs.existsSync(path.join(root, sprite[1]))) throw new Error(`Sprite missing: ${sprite[1]}`);
    add(match[1].trim(), sprite[1], explicit ? explicit[1].split(',').map(type => type.trim()) : iconTypes);
  }
}
const folder = path.join(root, 'collection-sprites');
for (const filename of fs.readdirSync(folder).sort()) {
  if (!/\.(gif|png|webp)$/i.test(filename)) continue;
  if (!/^[a-zA-Z][a-zA-Z0-9 _().'-]*\.(gif|png|webp)$/i.test(filename)) throw new Error(`Unsupported sprite filename: ${filename}`);
  const name = path.parse(filename).name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim();
  add(name.replace(/\b\w/g, char => char.toUpperCase()), `collection-sprites/${filename}`);
}
const result = [...catalog.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
if (!result.length) throw new Error('No Pokémon found in collection pages.');
fs.writeFileSync(path.join(root, 'data', 'collection-catalog.json'), JSON.stringify(result, null, 2) + '\n');
console.log(`Generated ${result.length} catalog entries.`);
