// Regenerate after changing Pokémon type records: node tools/generate-pokemon-types.cjs
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sources = ['PokeDuel-Script.js','BugNet.js','FieryFisherRod.js','GhostDetector.js','IceHammer.js','LeadPickaxe.js','MagneticDetector.js'];
const fallbackTypeEntries = {
    'shiny marshadow': ['Fighting', 'Ghost'],
    'cloned alomomola': ['Water'],
    'shiny feraligatr': ['Water'],
    'walking wake': ['Water', 'Dragon'],
    'ashs greninja': ['Water', 'Dark'],
    'cloned vaporeon': ['Water'],
    'cloned kingler': ['Water'],
    'shiny corsola': ['Water', 'Rock'],
    'champion poliwrath': ['Water', 'Fighting'],
    'shiny finizen': ['Water'],
    'shiny palafin': ['Water'],
    'shiny politoed': ['Water'],
    'shiny big magikarp': ['Water'],
    'shiny araquanid': ['Water', 'Bug'],
    'shiny ceruledge': ['Fire', 'Ghost'],
    'cloned ninetales': ['Fire'],
    'iron hands': ['Fighting', 'Electric'],
    'elder charizard': ['Fire', 'Flying'],
    'gouging fire': ['Fire', 'Dragon'],
    'cloned hitmonchan': ['Fighting'],
    'cloned hitmonlee': ['Fighting'],
    'cloned hitmontop': ['Fighting'],
    'cloned primeape': ['Fighting'],
    'cloned flareon': ['Fire'],
    'shiny grapploct': ['Fighting'],
    'shiny mr mime': ['Psychic', 'Fairy'],
    'shiny exeggutor': ['Grass', 'Psychic'],
    'shiny klefki': ['Steel', 'Fairy'],
    'shiny chimeco': ['Psychic'],
    'diancie': ['Rock', 'Fairy'],
    'shiny enamorus': ['Fairy', 'Flying'],
    'scream tail': ['Fairy', 'Psychic'],
    'cloned claydol': ['Ground', 'Psychic'],
    'shiny slurpuff': ['Fairy'],
    'carbink': ['Rock', 'Fairy'],
    'shiny clefable': ['Fairy'],
    'cloned chansey': ['Normal'],
    'shiny cetitan': ['Ice'],
    'shiny chien-pao': ['Dark', 'Ice'],
    'cloned dewong': ['Water', 'Ice'],
    'cloned hypno': ['Psychic'],
    'melmetal': ['Steel'],
    'shiny umbreon': ['Dark'],
    'roaring moon': ['Dragon', 'Dark'],
    'shiny mightyena': ['Dark'],
    'zarude': ['Dark', 'Grass'],
    'shiny shedinja': ['Bug', 'Ghost'],
    'shiny sunflora': ['Grass'],
    'shiny corviknight': ['Flying', 'Steel'],
    'shiny zeraora': ['Electric'],
    'zeraora': ['Electric'],
    'cloned togepi': ['Fairy'],
    'hisuian decidueye': ['Grass', 'Fighting'],
  };
const normalizeName = value => value.toLowerCase().replace(/\./g, '').replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
const entries = new Map();
for (const file of sources) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const local = new Map();
  for (const match of source.matchAll(/\{\s*name:\s*"([^"]+)"[\s\S]{0,320}?types:\s*\[([^\]]+)\]/g)) {
    const types = Array.from(match[2].matchAll(/"([^"]+)"/g), entry => entry[1].trim());
    if (types.length) local.set(normalizeName(match[1]), types);
  }
  for (const [name, types] of local) if (!entries.has(name)) entries.set(name, types);
}
for (const [name, types] of Object.entries(fallbackTypeEntries)) if (!entries.has(name)) entries.set(name, types);
fs.writeFileSync(path.join(root, 'pokemon-types.json'), JSON.stringify(Object.fromEntries(entries)) + '\n');
console.log(`Generated ${entries.size} Pokémon type entries`);
