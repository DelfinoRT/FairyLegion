/* =========================================
   POKEDUEL COMPLETE SCRIPT (FIXED DRAFT LOGIC)
   ========================================= */

/* --- 1. MAIN GAME DATA --- */
const pokemonData = [
    { name: "Charizard", types: ["Fire", "Flying"], hp: 390, tms: ["Flamethrower", "Air Slash", "Dragon Claw", "Solar Beam", "Earthquake", "Shadow Claw", "Focus Blast", "Heat Wave", "Dragon Pulse", "Fire Blast"] },
    { name: "Blastoise", types: ["Water"], hp: 395, tms: ["Surf", "Ice Beam", "Hydro Pump", "Earthquake", "Flash Cannon", "Focus Blast", "Dark Pulse", "Dragon Pulse", "Blizzard", "Scald"] },
    { name: "Venusaur", types: ["Grass", "Poison"], hp: 400, tms: ["Solar Beam", "Sludge Bomb", "Giga Drain", "Earthquake", "Energy Ball", "Poison Jab", "Earth Power", "Power Whip", "Leaf Storm", "Venoshock"] },
    { name: "Alakazam", types: ["Psychic"], hp: 275, tms: ["Psychic", "Shadow Ball", "Focus Blast", "Dazzling Gleam", "Energy Ball", "Thunderbolt", "Psybeam", "Psyshock", "Extrasensory", "Future Sight"] },
    { name: "Machamp", types: ["Fighting"], hp: 450, tms: ["Dynamic Punch", "Stone Edge", "Earthquake", "Thunderbolt", "Ice Punch", "Fire Punch", "Close Combat", "Brick Break", "Rock Slide", "Poison Jab"] },
    { name: "Gengar", types: ["Ghost", "Poison"], hp: 300, tms: ["Shadow Ball", "Sludge Bomb", "Thunderbolt", "Focus Blast", "Energy Ball", "Dazzling Gleam", "Dark Pulse", "Hex", "Venoshock", "Psychic"] },
    { name: "Dragonite", types: ["Dragon", "Flying"], hp: 455, tms: ["Dragon Claw", "Hurricane", "Earthquake", "Fire Punch", "Thunder Punch", "Ice Beam", "Superpower", "Dragon Breath", "Outrage", "Thunder"] },
    { name: "Tyranitar", types: ["Rock", "Dark"], hp: 500, tms: ["Stone Edge", "Crunch", "Earthquake", "Fire Blast", "Ice Beam", "Thunderbolt", "Rock Slide", "Dark Pulse", "Rock Blast", "Superpower"] },
    { name: "Gardevoir", types: ["Psychic", "Fairy"], hp: 340, tms: ["Psychic", "Moonblast", "Thunderbolt", "Focus Blast", "Shadow Ball", "Energy Ball", "Dazzling Gleam", "Psybeam", "Hyper Voice", "Mystical Fire"] },
    { name: "Blaziken", types: ["Fire", "Fighting"], hp: 400, tms: ["Flare Blitz", "Close Combat", "Earthquake", "Stone Edge", "Thunder Punch", "Shadow Claw", "Brave Bird", "Brick Break", "Fire Blast", "Focus Blast"] },
    { name: "Swampert", types: ["Water", "Ground"], hp: 500, tms: ["Surf", "Earthquake", "Ice Beam", "Stone Edge", "Avalanche", "Hammer Arm", "Waterfall", "Scald", "Superpower", "Rock Slide"] },
    { name: "Sceptile", types: ["Grass"], hp: 350, tms: ["Leaf Blade", "Dragon Pulse", "Energy Ball", "Earthquake", "Focus Blast", "X-Scissor", "Acrobatics", "Leaf Storm", "Giga Drain", "Thunder Punch"] },
    { name: "Aggron", types: ["Steel", "Rock"], hp: 350, tms: ["Iron Head", "Stone Edge", "Earthquake", "Heavy Slam", "Ice Punch", "Fire Punch", "Thunder Punch", "Dragon Claw", "Rock Slide", "Superpower"] },
    { name: "Metagross", types: ["Steel", "Psychic"], hp: 400, tms: ["Meteor Mash", "Zen Headbutt", "Earthquake", "Hammer Arm", "Ice Punch", "Thunder Punch", "Bullet Punch", "Explosion", "Rock Slide", "Psychic"] },
    { name: "Salamence", types: ["Dragon", "Flying"], hp: 475, tms: ["Dragon Claw", "Hurricane", "Earthquake", "Fire Blast", "Hydro Pump", "Stone Edge", "Dragon Breath", "Outrage", "Flamethrower", "Aerial Ace"] },
    { name: "Garchomp", types: ["Dragon", "Ground"], hp: 540, tms: ["Earthquake", "Dragon Claw", "Stone Edge", "Fire Blast", "Poison Jab", "Iron Head", "Outrage", "Slash", "Crunch", "Rock Slide"] },
    { name: "Lucario", types: ["Fighting", "Steel"], hp: 350, tms: ["Close Combat", "Flash Cannon", "Earthquake", "Stone Edge", "Ice Punch", "Thunder Punch", "Shadow Ball", "Dragon Pulse", "Extreme Speed", "Aura Sphere"] },
    { name: "Abomasnow", types: ["Grass", "Ice"], hp: 450, tms: ["Blizzard", "Energy Ball", "Earthquake", "Ice Beam", "Focus Blast", "Shadow Ball", "Giga Drain", "Ice Shard", "Wood Hammer", "Avalanche"] },
    { name: "Weavile", types: ["Dark", "Ice"], hp: 350, tms: ["Ice Beam", "Night Slash", "Ice Shard", "X-Scissor", "Brick Break", "Poison Jab", "Avalanche", "Focus Blast", "Low Kick", "Slash"] },
    { name: "Rhyperior", types: ["Ground", "Rock"], hp: 575, tms: ["Earthquake", "Stone Edge", "Megahorn", "Ice Punch", "Thunder Punch", "Fire Punch", "Hammer Arm", "Rock Wrecker", "Rock Blast", "Drill Run"] },
    { name: "Electivire", types: ["Electric"], hp: 375, tms: ["Thunderbolt", "Earthquake", "Ice Punch", "Fire Punch", "Thunder Punch", "Focus Blast", "Thunder", "Cross Chop", "Rock Slide", "Giga Impact"] },
    { name: "Magmortar", types: ["Fire"], hp: 375, tms: ["Flamethrower", "Fire Blast", "Thunderbolt", "Focus Blast", "Earthquake", "Solar Beam", "Psychic", "Scorching Sands", "Thunder Punch", "Overheat"] },
    { name: "Togekiss", types: ["Fairy", "Flying"], hp: 425, tms: ["Air Slash", "Dazzling Gleam", "Flamethrower", "Aura Sphere", "Shadow Ball", "Psychic", "Shock Wave", "Aerial Ace", "Heat Wave", "Hyper Voice"] },
    { name: "Roserade", types: ["Grass", "Poison"], hp: 300, tms: ["Sludge Bomb", "Energy Ball", "Shadow Ball", "Dazzling Gleam", "Giga Drain", "Venoshock", "Poison Jab", "Leaf Storm", "Solar Beam", "Mud Shot"] },
    { name: "Luxray", types: ["Electric"], hp: 400, tms: ["Thunderbolt", "Crunch", "Wild Charge", "Ice Fang", "Fire Fang", "Thunder Fang", "Volt Switch", "Superpower", "Thunder", "Play Rough"] },
    { name: "Staraptor", types: ["Normal", "Flying"], hp: 425, tms: ["Brave Bird", "Close Combat", "Quick Attack", "U-turn", "Steel Wing", "Heat Wave", "Aerial Ace", "Giga Impact", "Facade", "Double-Edge"] },
    { name: "Floatzel", types: ["Water"], hp: 425, tms: ["Waterfall", "Ice Punch", "Aqua Jet", "Crunch", "Brick Break", "Ice Beam", "Surf", "Scald", "Focus Blast", "Hydro Pump"] },
    { name: "Gastrodon", types: ["Water", "Ground"], hp: 555, tms: ["Surf", "Earth Power", "Ice Beam", "Sludge Bomb", "Earthquake", "Scald", "Body Slam", "Venoshock", "Stone Edge", "Ancient Power"] },
    { name: "Drifblim", types: ["Ghost", "Flying"], hp: 750, tms: ["Shadow Ball", "Air Slash", "Thunderbolt", "Psychic", "Giga Impact", "Acrobatics", "Hex", "Psybeam", "Icy Wind", "Explosion"] },
    { name: "Lopunny", types: ["Normal"], hp: 325, tms: ["Double-Edge", "Ice Punch", "Thunder Punch", "Fire Punch", "Focus Blast", "Shadow Ball", "High Jump Kick", "Drain Punch", "U-turn", "Play Rough"] },
    { name: "Toxicroak", types: ["Poison", "Fighting"], hp: 415, tms: ["Drain Punch", "Poison Jab", "Earthquake", "Ice Punch", "Stone Edge", "X-Scissor", "Sludge Bomb", "Focus Blast", "Venoshock", "Sucker Punch"] },
    { name: "Lumineon", types: ["Water"], hp: 345, tms: ["Surf", "Ice Beam", "Dazzling Gleam", "U-turn", "Signal Beam", "Giga Drain", "Scald", "Aqua Tail", "Psybeam", "Water Pulse"] },
    { name: "Serperior", types: ["Grass"], hp: 375, tms: ["Leaf Storm", "Giga Drain", "Dragon Pulse", "Energy Ball", "Mega Drain", "Leaf Blade", "Solar Beam", "Body Slam", "Knock Off", "Leaf Blade"] },
    { name: "Emboar", types: ["Fire", "Fighting"], hp: 550, tms: ["Flare Blitz", "Superpower", "Earthquake", "Stone Edge", "Thunder Punch", "Fire Blast", "Scald", "Wild Charge", "Hammer Arm", "Head Smash"] },
    { name: "Samurott", types: ["Water"], hp: 475, tms: ["Surf", "Ice Beam", "Megahorn", "Aqua Tail", "X-Scissor", "Grass Knot", "Hydro Pump", "Scald", "Drill Run", "Smart Strike"] },
    { name: "Stoutland", types: ["Normal"], hp: 425, tms: ["Return", "Crunch", "Wild Charge", "Ice Fang", "Fire Fang", "Thunder Fang", "Play Rough", "Superpower", "Giga Impact", "Surf"] },
    { name: "Excadrill", types: ["Ground", "Steel"], hp: 550, tms: ["Earthquake", "Iron Head", "Rock Slide", "X-Scissor", "Drill Run", "Slash", "Poison Jab", "Shadow Claw", "Smart Strike", "Skull Bash"] },
    { name: "Krookodile", types: ["Ground", "Dark"], hp: 475, tms: ["Earthquake", "Crunch", "Stone Edge", "Dragon Claw", "Fire Fang", "Thunder Fang", "Outrage", "Dark Pulse", "Foul Play", "Superpower"] },
    { name: "Zoroark", types: ["Dark"], hp: 300, tms: ["Dark Pulse", "Flamethrower", "Focus Blast", "Shadow Ball", "Grass Knot", "U-turn", "Extrasensory", "Sludge Bomb", "Night Daze", "Snarl"] },
    { name: "Volcarona", types: ["Bug", "Fire"], hp: 425, tms: ["Bug Buzz", "Flamethrower", "Hurricane", "Psychic", "Giga Drain", "Solar Beam", "Silver Wind", "Fire Blast", "Heat Wave", "Overheat"] }
];

// TM Database
const tmDatabase = {
    "Flamethrower": { type: "Fire", power: 90, pp: 15 },
    "Air Slash": { type: "Flying", power: 75, pp: 15 },
    "Dragon Claw": { type: "Dragon", power: 80, pp: 15 },
    "Solar Beam": { type: "Grass", power: 120, pp: 10 },
    "Earthquake": { type: "Ground", power: 100, pp: 10 },
    "Shadow Claw": { type: "Ghost", power: 70, pp: 15 },
    "Focus Blast": { type: "Fighting", power: 120, pp: 5 },
    "Heat Wave": { type: "Fire", power: 95, pp: 10 },
    "Dragon Pulse": { type: "Dragon", power: 85, pp: 10 },
    "Fire Blast": { type: "Fire", power: 110, pp: 5 },
    "Surf": { type: "Water", power: 90, pp: 15 },
    "Ice Beam": { type: "Ice", power: 90, pp: 10 },
    "Hydro Pump": { type: "Water", power: 110, pp: 5 },
    "Flash Cannon": { type: "Steel", power: 80, pp: 10 },
    "Dark Pulse": { type: "Dark", power: 80, pp: 15 },
    "Blizzard": { type: "Ice", power: 110, pp: 5 },
    "Scald": { type: "Water", power: 80, pp: 15 },
    "Sludge Bomb": { type: "Poison", power: 90, pp: 10 },
    "Giga Drain": { type: "Grass", power: 75, pp: 10 },
    "Energy Ball": { type: "Grass", power: 90, pp: 10 },
    "Earth Power": { type: "Ground", power: 90, pp: 10 },
    "Power Whip": { type: "Grass", power: 120, pp: 10 },
    "Leaf Storm": { type: "Grass", power: 130, pp: 5 },
    "Venoshock": { type: "Poison", power: 65, pp: 10 },
    "Psychic": { type: "Psychic", power: 90, pp: 10 },
    "Shadow Ball": { type: "Ghost", power: 80, pp: 15 },
    "Dazzling Gleam": { type: "Fairy", power: 80, pp: 10 },
    "Thunderbolt": { type: "Electric", power: 90, pp: 15 },
    "Psyshock": { type: "Psychic", power: 80, pp: 10 },
    "Future Sight": { type: "Psychic", power: 120, pp: 10 },
    "Dynamic Punch": { type: "Fighting", power: 100, pp: 5 },
    "Stone Edge": { type: "Rock", power: 100, pp: 5 },
    "Ice Punch": { type: "Ice", power: 75, pp: 15 },
    "Fire Punch": { type: "Fire", power: 75, pp: 15 },
    "Close Combat": { type: "Fighting", power: 120, pp: 5 },
    "Rock Slide": { type: "Rock", power: 75, pp: 10 },
    "Poison Jab": { type: "Poison", power: 80, pp: 20 },
    "Hex": { type: "Ghost", power: 65, pp: 10 },
    "Hurricane": { type: "Flying", power: 110, pp: 10 },
    "Thunder Punch": { type: "Electric", power: 75, pp: 15 },
    "Superpower": { type: "Fighting", power: 120, pp: 5 },
    "Dragon Breath": { type: "Dragon", power: 60, pp: 20 },
    "Outrage": { type: "Dragon", power: 120, pp: 10 },
    "Thunder": { type: "Electric", power: 110, pp: 10 },
    "Crunch": { type: "Dark", power: 80, pp: 15 },
    "Moonblast": { type: "Fairy", power: 95, pp: 15 },
    "Hyper Voice": { type: "Normal", power: 90, pp: 10 },
    "Mystical Fire": { type: "Fire", power: 75, pp: 10 },
    "Flare Blitz": { type: "Fire", power: 120, pp: 15 },
    "Brave Bird": { type: "Flying", power: 120, pp: 15 },
    "Avalanche": { type: "Ice", power: 60, pp: 10 },
    "Hammer Arm": { type: "Fighting", power: 100, pp: 10 },
    "Waterfall": { type: "Water", power: 80, pp: 15 },
    "Leaf Blade": { type: "Grass", power: 90, pp: 15 },
    "X-Scissor": { type: "Bug", power: 80, pp: 15 },
    "Acrobatics": { type: "Flying", power: 55, pp: 15 },
    "Iron Head": { type: "Steel", power: 80, pp: 15 },
    "Heavy Slam": { type: "Steel", power: 80, pp: 10 },
    "Meteor Mash": { type: "Steel", power: 90, pp: 10 },
    "Zen Headbutt": { type: "Psychic", power: 80, pp: 15 },
    "Bullet Punch": { type: "Steel", power: 40, pp: 30 },
    "Explosion": { type: "Normal", power: 250, pp: 5 },
    "Slash": { type: "Normal", power: 70, pp: 20 },
    "Extreme Speed": { type: "Normal", power: 80, pp: 5 },
    "Aura Sphere": { type: "Fighting", power: 80, pp: 20 },
    "Ice Shard": { type: "Ice", power: 40, pp: 30 },
    "Wood Hammer": { type: "Grass", power: 120, pp: 15 },
    "Night Slash": { type: "Dark", power: 70, pp: 15 },
    "Brick Break": { type: "Fighting", power: 75, pp: 15 },
    "Low Kick": { type: "Fighting", power: 60, pp: 20 },
    "Megahorn": { type: "Bug", power: 120, pp: 10 },
    "Rock Wrecker": { type: "Rock", power: 150, pp: 5 },
    "Rock Blast": { type: "Rock", power: 25, pp: 10 },
    "Drill Run": { type: "Ground", power: 80, pp: 10 },
    "Cross Chop": { type: "Fighting", power: 100, pp: 5 },
    "Giga Impact": { type: "Normal", power: 150, pp: 5 },
    "Scorching Sands": { type: "Ground", power: 70, pp: 10 },
    "Overheat": { type: "Fire", power: 130, pp: 5 },
    "Wild Charge": { type: "Electric", power: 90, pp: 15 },
    "Ice Fang": { type: "Ice", power: 65, pp: 15 },
    "Fire Fang": { type: "Fire", power: 65, pp: 15 },
    "Thunder Fang": { type: "Electric", power: 65, pp: 15 },
    "Volt Switch": { type: "Electric", power: 70, pp: 20 },
    "Play Rough": { type: "Fairy", power: 90, pp: 10 },
    "Quick Attack": { type: "Normal", power: 40, pp: 30 },
    "U-turn": { type: "Bug", power: 70, pp: 20 },
    "Steel Wing": { type: "Steel", power: 70, pp: 25 },
    "Aerial Ace": { type: "Flying", power: 60, pp: 20 },
    "Facade": { type: "Normal", power: 70, pp: 20 },
    "Double-Edge": { type: "Normal", power: 120, pp: 15 },
    "Aqua Jet": { type: "Water", power: 40, pp: 20 },
    "Body Slam": { type: "Normal", power: 85, pp: 15 },
    "Icy Wind": { type: "Ice", power: 55, pp: 15 },
    "Return": { type: "Normal", power: 102, pp: 20 },
    "High Jump Kick": { type: "Fighting", power: 130, pp: 10 },
    "Drain Punch": { type: "Fighting", power: 75, pp: 10 },
    "Signal Beam": { type: "Bug", power: 75, pp: 15 },
    "Aqua Tail": { type: "Water", power: 90, pp: 10 },
    "Psybeam": { type: "Psychic", power: 65, pp: 20 },
    "Mega Drain": { type: "Grass", power: 40, pp: 15 },
    "Knock Off": { type: "Dark", power: 65, pp: 20 },
    "Head Smash": { type: "Rock", power: 150, pp: 5 },
    "Grass Knot": { type: "Grass", power: 80, pp: 20 },
    "Smart Strike": { type: "Steel", power: 70, pp: 10 },
    "Skull Bash": { type: "Normal", power: 130, pp: 5 },
    "Foul Play": { type: "Dark", power: 95, pp: 15 },
    "Extrasensory": { type: "Psychic", power: 80, pp: 20 },
    "Night Daze": { type: "Dark", power: 85, pp: 10 },
    "Snarl": { type: "Dark", power: 55, pp: 15 },
    "Bug Buzz": { type: "Bug", power: 90, pp: 10 },
    "Silver Wind": { type: "Bug", power: 60, pp: 5 },
    "Sucker Punch": { type: "Dark", power: 70, pp: 5 },
    "Water Pulse": { type: "Water", power: 60, pp: 20 },
    "Mud Shot": { type: "Ground", power: 55, pp: 15 },
    "Acid Spray": { type: "Poison", power: 40, pp: 20 },
    "Ancient Power": { type: "Rock", power: 60, pp: 5 },
    "Shock Wave": { type: "Electric", power: 60, pp: 20 },
    "Incinerate": { type: "Fire", power: 60, pp: 15 },
    "Tackle": { type: "Normal", power: 50, pp: 35 }
};

const typeMatchups = {
    'Fire': { 'Grass': 2, 'Ice': 2, 'Bug': 2, 'Steel': 2, 'Water': 0.5, 'Rock': 0.5, 'Fire': 0.5, 'Dragon': 0.5 },
    'Water': { 'Fire': 2, 'Ground': 2, 'Rock': 2, 'Water': 0.5, 'Grass': 0.5, 'Dragon': 0.5 },
    'Grass': { 'Water': 2, 'Ground': 2, 'Rock': 2, 'Fire': 0.5, 'Grass': 0.5, 'Poison': 0.5, 'Flying': 0.5, 'Bug': 0.5, 'Dragon': 0.5, 'Steel': 0.5 },
    'Electric': { 'Water': 2, 'Flying': 2, 'Ground': 0, 'Electric': 0.5, 'Grass': 0.5, 'Dragon': 0.5 },
    'Ice': { 'Grass': 2, 'Ground': 2, 'Flying': 2, 'Dragon': 2, 'Fire': 0.5, 'Water': 0.5, 'Ice': 0.5, 'Steel': 0.5 },
    'Fighting': { 'Normal': 2, 'Ice': 2, 'Rock': 2, 'Dark': 2, 'Steel': 2, 'Poison': 0.5, 'Flying': 0.5, 'Psychic': 0.5, 'Bug': 0.5, 'Ghost': 0 },
    'Poison': { 'Grass': 2, 'Fairy': 2, 'Poison': 0.5, 'Ground': 0.5, 'Rock': 0.5, 'Ghost': 0.5, 'Steel': 0 },
    'Ground': { 'Fire': 2, 'Electric': 2, 'Poison': 2, 'Rock': 2, 'Steel': 2, 'Grass': 0.5, 'Bug': 0.5, 'Flying': 0 },
    'Flying': { 'Grass': 2, 'Fighting': 2, 'Bug': 2, 'Electric': 0.5, 'Rock': 0.5, 'Steel': 0.5 },
    'Psychic': { 'Fighting': 2, 'Poison': 2, 'Psychic': 0.5, 'Steel': 0.5, 'Dark': 0 },
    'Bug': { 'Grass': 2, 'Psychic': 2, 'Dark': 2, 'Fire': 0.5, 'Fighting': 0.5, 'Poison': 0.5, 'Flying': 0.5, 'Ghost': 0.5, 'Steel': 0.5, 'Fairy': 0.5 },
    'Rock': { 'Fire': 2, 'Ice': 2, 'Flying': 2, 'Bug': 2, 'Fighting': 0.5, 'Ground': 0.5, 'Steel': 0.5 },
    'Ghost': { 'Psychic': 2, 'Ghost': 2, 'Dark': 0.5, 'Normal': 0 },
    'Dragon': { 'Dragon': 2, 'Steel': 0.5, 'Fairy': 0 },
    'Steel': { 'Ice': 2, 'Rock': 2, 'Fairy': 2, 'Fire': 0.5, 'Water': 0.5, 'Electric': 0.5, 'Steel': 0.5 },
    'Dark': { 'Psychic': 2, 'Ghost': 2, 'Fighting': 0.5, 'Dark': 0.5, 'Fairy': 0.5 },
    'Fairy': { 'Fighting': 2, 'Dragon': 2, 'Dark': 2, 'Fire': 0.5, 'Poison': 0.5, 'Steel': 0.5 },
    'Normal': { 'Rock': 0.5, 'Steel': 0.5, 'Ghost': 0 }
};

/* --- 2. GYM DATA & EXTRA POKEMON --- */
const gymData = {
    "Kanto": [
        { leader: "Brock", badge: "Boulder", team: ["Onix", "Golem", "Lycanroc"] },
        { leader: "Misty", badge: "Cascade", team: ["Starmie", "Golduck", "Milotic"] },
        { leader: "Lt. Surge", badge: "Thunder", team: ["Raichu", "Electabuzz", "Jolteon"] },
        { leader: "Erika", badge: "Rainbow", team: ["Vileplume", "Tangrowth", "Leafeon"] },
        { leader: "Koga", badge: "Soul", team: ["Crobat", "Muk", "Toxicroak"] },
        { leader: "Sabrina", badge: "Marsh", team: ["Alakazam", "Espeon", "Reuniclus"] },
        { leader: "Blaine", badge: "Volcano", team: ["Rapidash", "Magmar", "Arcanine"] },
        { leader: "Giovanni", badge: "Earth", team: ["Nidoking", "Rhyperior", "Dugtrio"] }
    ],
    "Johto": [
        { leader: "Falkner", badge: "Zephyr", team: ["Pidgeot", "Noctowl", "Skarmory"] },
        { leader: "Bugsy", badge: "Hive", team: ["Scizor", "Heracross", "Ariados"] },
        { leader: "Whitney", badge: "Plain", team: ["Miltank", "Wigglytuff", "Blissey"] },
        { leader: "Morty", badge: "Fog", team: ["Gengar", "Mismagius", "Drifblim"] },
        { leader: "Chuck", badge: "Storm", team: ["Poliwrath", "Machamp", "Lucario"] },
        { leader: "Jasmine", badge: "Mineral", team: ["Steelix", "Magnezone", "Empoleon"] },
        { leader: "Pryce", badge: "Glacier", team: ["Mamoswine", "Cloyster", "Froslass"] },
        { leader: "Clair", badge: "Rising", team: ["Kingdra", "Dragonite", "Druddigon"] }
    ],
    "Hoenn": [
        { leader: "Roxanne", badge: "Stone", team: ["Nosepass", "Armaldo", "Rampardos"] },
        { leader: "Brawly", badge: "Knuckle", team: ["Hariyama", "Medicham", "Breloom"] },
        { leader: "Wattson", badge: "Dynamo", team: ["Manectric", "Magneton", "Electrode"] },
        { leader: "Flannery", badge: "Heat", team: ["Torkoal", "Camerupt", "Houndoom"] },
        { leader: "Norman", badge: "Balance", team: ["Slaking", "Zangoose", "Ursaring"] },
        { leader: "Winona", badge: "Feather", team: ["Altaria", "Pelipper", "Tropius"] },
        { leader: "Tate & Liza", badge: "Mind", team: ["Lunatone", "Solrock", "Metagross"] },
        { leader: "Wallace", badge: "Rain", team: ["Milotic", "Ludicolo", "Kingdra"] }
    ],
    "Sinnoh": [
        { leader: "Roark", badge: "Coal", team: ["Rampardos", "Golem", "Bastiodon"] },
        { leader: "Gardenia", badge: "Forest", team: ["Roserade", "Torterra", "Leafeon"] },
        { leader: "Maylene", badge: "Cobble", team: ["Lucario", "Gallade", "Medicham"] },
        { leader: "Crasher Wake", badge: "Fen", team: ["Floatzel", "Gyarados", "Quagsire"] },
        { leader: "Fantina", badge: "Relic", team: ["Mismagius", "Gengar", "Chandelure"] },
        { leader: "Byron", badge: "Mine", team: ["Bastiodon", "Steelix", "Aggron"] },
        { leader: "Candice", badge: "Icicle", team: ["Froslass", "Weavile", "Abomasnow"] },
        { leader: "Volkner", badge: "Beacon", team: ["Luxray", "Raichu", "Electivire"] }
    ],
    "Unova": [
        { leader: "Cilan/Chili/Cress", badge: "Trio", team: ["Simisage", "Simisear", "Simipour"] },
        { leader: "Lenora", badge: "Basic", team: ["Watchog", "Stoutland", "Bouffalant"] },
        { leader: "Burgh", badge: "Insect", team: ["Leavanny", "Volcarona", "Heracross"] },
        { leader: "Elesa", badge: "Bolt", team: ["Zebstrika", "Ampharos", "Emolga"] },
        { leader: "Clay", badge: "Quake", team: ["Excadrill", "Krookodile", "Golurk"] },
        { leader: "Skyla", badge: "Jet", team: ["Swanna", "Skarmory", "Braviary"] },
        { leader: "Brycen", badge: "Freeze", team: ["Beartic", "Cryogonal", "Walrein"] },
        { leader: "Drayden", badge: "Legend", team: ["Haxorus", "Druddigon", "Flygon"] }
    ],
    "Kalos": [
        { leader: "Viola", badge: "Bug", team: ["Vivillon", "Masquerain", "Scizor"] },
        { leader: "Grant", badge: "Cliff", team: ["Tyrantrum", "Aurorus", "Lycanroc"] },
        { leader: "Korrina", badge: "Rumble", team: ["Lucario", "Hawlucha", "Mienshao"] },
        { leader: "Ramos", badge: "Plant", team: ["Gogoat", "Jumpluff", "Trevenant"] },
        { leader: "Clemont", badge: "Voltage", team: ["Heliolisk", "Magneton", "Luxray"] },
        { leader: "Valerie", badge: "Fairy", team: ["Sylveon", "Mawile", "Gardevoir"] },
        { leader: "Olympia", badge: "Psychic", team: ["Meowstic", "Slowbro", "Delphox"] },
        { leader: "Wulfric", badge: "Iceberg", team: ["Avalugg", "Abomasnow", "Mamoswine"] }
    ],
    "Alola": [
        { leader: "Ilima", badge: "Normal Trial", team: ["Gumshoos", "Komala", "Lopunny"] },
        { leader: "Lana", badge: "Water Trial", team: ["Araquanid", "Wishiwashi", "Pelipper"] },
        { leader: "Kiawe", badge: "Fire Trial", team: ["Marowak", "Turtonator", "Salazzle"] },
        { leader: "Mallow", badge: "Grass Trial", team: ["Tsareena", "Lurantis", "Tangrowth"] },
        { leader: "Sophocles", badge: "Electric Trial", team: ["Togedemaru", "Vikavolt", "Magnezone"] },
        { leader: "Acerola", badge: "Ghost Trial", team: ["Mimikyu", "Banette", "Palossand"] },
        { leader: "Mina", badge: "Fairy Trial", team: ["Ribombee", "Granbull", "Alcremie"] },
        { leader: "Hapu", badge: "Ground Trial", team: ["Mudsdale", "Gastrodon", "Flygon"] }
    ],
    "Galar": [
        { leader: "Milo", badge: "Grass", team: ["Eldegoss", "Appletun", "Leafeon"] },
        { leader: "Nessa", badge: "Water", team: ["Drednaw", "Goldeen", "Pelipper"] },
        { leader: "Kabu", badge: "Fire", team: ["Centiskorch", "Arcanine", "Coalossal"] },
        { leader: "Bea", badge: "Fighting", team: ["Machamp", "Grapploct", "Pangoro"] },
        { leader: "Allister", badge: "Ghost", team: ["Gengar", "Cursola", "Dusknoir"] },
        { leader: "Opal", badge: "Fairy", team: ["Alcremie", "Grimmsnarl", "Wigglytuff"] },
        { leader: "Gordie", badge: "Rock", team: ["Coalossal", "Tyranitar", "Shuckle"] },
        { leader: "Melony", badge: "Ice", team: ["Frosmoth", "Lapras", "Glaceon"] }
    ],
    "Paldea": [
        { leader: "Katy", badge: "Bug", team: ["Lokix", "Heracross", "Vespiquen"] },
        { leader: "Brassius", badge: "Grass", team: ["Arboliva", "Breloom", "Tsareena"] },
        { leader: "Iono", badge: "Electric", team: ["Bellibolt", "Luxray", "Magnezone"] },
        { leader: "Kofu", badge: "Water", team: ["Crabominable", "Quagsire", "Pelipper"] },
        { leader: "Larry", badge: "Normal", team: ["Staraptor", "Dudunsparce", "Maushold"] },
        { leader: "Ryme", badge: "Ghost", team: ["Houndstone", "Toxtricity", "Mismagius"] },
        { leader: "Tulip", badge: "Psychic", team: ["Espathra", "Gardevoir", "Farigiraf"] },
        { leader: "Grusha", badge: "Ice", team: ["Cetitan", "Froslass", "Weavile"] }
    ]
};

// Contains Stats/Moves for Pokemon NOT in the main 40 list.
const extraPokemonDB = {
    // KANTO
    "Onix": { types: ["Rock", "Ground"], hp: 500, moves: ["Stone Edge", "Earthquake", "Iron Head", "Rock Slide"] },
    "Golem": { types: ["Rock", "Ground"], hp: 480, moves: ["Stone Edge", "Earthquake", "Explosion", "Heavy Slam"] },
    "Lycanroc": { types: ["Rock"], hp: 400, moves: ["Stone Edge", "Crunch", "Brick Break", "Rock Slide"] },
    "Starmie": { types: ["Water", "Psychic"], hp: 380, moves: ["Surf", "Psychic", "Ice Beam", "Thunderbolt"] },
    "Golduck": { types: ["Water"], hp: 400, moves: ["Surf", "Psychic", "Ice Beam", "Hydro Pump"] },
    "Milotic": { types: ["Water"], hp: 500, moves: ["Surf", "Ice Beam", "Hydro Pump", "Dragon Pulse"] },
    "Raichu": { types: ["Electric"], hp: 350, tms: ["Thunderbolt", "Volt Switch", "Brick Break", "Thunder"] },
    "Electabuzz": { types: ["Electric"], hp: 380, moves: ["Thunderbolt", "Ice Punch", "Fire Punch", "Cross Chop"] },
    "Jolteon": { types: ["Electric"], hp: 350, moves: ["Thunderbolt", "Shadow Ball", "Volt Switch", "Signal Beam"] },
    "Vileplume": { types: ["Grass", "Poison"], hp: 420, moves: ["Sludge Bomb", "Giga Drain", "Moonblast", "Energy Ball"] },
    "Tangrowth": { types: ["Grass"], hp: 550, moves: ["Power Whip", "Earthquake", "Knock Off", "Rock Slide"] },
    "Leafeon": { types: ["Grass"], hp: 400, moves: ["Leaf Blade", "X-Scissor", "Aerial Ace", "Knock Off"] },
    "Crobat": { types: ["Poison", "Flying"], hp: 450, moves: ["Brave Bird", "Cross Poison", "X-Scissor", "U-turn"] },
    "Muk": { types: ["Poison"], hp: 520, moves: ["Gunk Shot", "Ice Punch", "Fire Punch", "Shadow Sneak"] }, 
    "Espeon": { types: ["Psychic"], hp: 350, moves: ["Psychic", "Shadow Ball", "Dazzling Gleam", "Psyshock"] },
    "Reuniclus": { types: ["Psychic"], hp: 500, moves: ["Psychic", "Focus Blast", "Shadow Ball", "Energy Ball"] },
    "Rapidash": { types: ["Fire"], hp: 380, moves: ["Flare Blitz", "Wild Charge", "Drill Run", "Megahorn"] },
    "Magmar": { types: ["Fire"], hp: 380, moves: ["Flamethrower", "Psychic", "Thunder Punch", "Focus Blast"] },
    "Arcanine": { types: ["Fire"], hp: 480, moves: ["Flare Blitz", "Wild Charge", "Close Combat", "Extreme Speed"] },
    "Nidoking": { types: ["Poison", "Ground"], hp: 450, moves: ["Earth Power", "Sludge Bomb", "Ice Beam", "Thunderbolt"] },
    "Dugtrio": { types: ["Ground"], hp: 280, moves: ["Earthquake", "Stone Edge", "Sucker Punch", "Aerial Ace"] },

    // OTHER REGIONS
    "Pidgeot": { types: ["Normal", "Flying"], hp: 400, moves: ["Hurricane", "Heat Wave", "U-turn", "Hyper Voice"] },
    "Noctowl": { types: ["Normal", "Flying"], hp: 450, moves: ["Air Slash", "Psychic", "Shadow Ball", "Moonblast"] },
    "Skarmory": { types: ["Steel", "Flying"], hp: 400, moves: ["Brave Bird", "Iron Head", "Body Slam", "Night Slash"] },
    "Scizor": { types: ["Bug", "Steel"], hp: 400, moves: ["Bullet Punch", "X-Scissor", "Superpower", "Aerial Ace"] }, 
    "Heracross": { types: ["Bug", "Fighting"], hp: 420, moves: ["Megahorn", "Close Combat", "Stone Edge", "Brick Break"] },
    "Ariados": { types: ["Bug", "Poison"], hp: 350, moves: ["Poison Jab", "Megahorn", "Sucker Punch", "Psychic"] },
    "Miltank": { types: ["Normal"], hp: 480, moves: ["Body Slam", "Hammer Arm", "Zen Headbutt", "Ice Punch"] },
    "Wigglytuff": { types: ["Normal", "Fairy"], hp: 600, moves: ["Hyper Voice", "Dazzling Gleam", "Flamethrower", "Thunderbolt"] },
    "Blissey": { types: ["Normal"], hp: 900, moves: ["Hyper Voice", "Flamethrower", "Ice Beam", "Thunderbolt"] },
    "Mismagius": { types: ["Ghost"], hp: 350, moves: ["Shadow Ball", "Mystical Fire", "Psychic", "Energy Ball"] },
    "Poliwrath": { types: ["Water", "Fighting"], hp: 450, moves: ["Waterfall", "Close Combat", "Ice Punch", "Earthquake"] },
    "Steelix": { types: ["Steel", "Ground"], hp: 500, moves: ["Heavy Slam", "Earthquake", "Stone Edge", "Crunch"] },
    "Magnezone": { types: ["Electric", "Steel"], hp: 400, moves: ["Thunderbolt", "Flash Cannon", "Body Slam", "Tri Attack"] },
    "Empoleon": { types: ["Water", "Steel"], hp: 450, moves: ["Hydro Pump", "Flash Cannon", "Ice Beam", "Drill Peck"] },
    "Mamoswine": { types: ["Ice", "Ground"], hp: 500, moves: ["Earthquake", "Icicle Crash", "Superpower", "Ice Shard"] },
    "Cloyster": { types: ["Water", "Ice"], hp: 350, moves: ["Icicle Spear", "Rock Blast", "Hydro Pump", "Ice Shard"] },
    "Froslass": { types: ["Ice", "Ghost"], hp: 350, moves: ["Ice Beam", "Shadow Ball", "Thunderbolt", "Psychic"] },
    "Kingdra": { types: ["Water", "Dragon"], hp: 400, moves: ["Hydro Pump", "Dragon Pulse", "Ice Beam", "Flash Cannon"] },
    "Druddigon": { types: ["Dragon"], hp: 450, moves: ["Dragon Claw", "Superpower", "Gunk Shot", "Sucker Punch"] },
    "Manectric": { types: ["Electric"], hp: 380, moves: ["Thunderbolt", "Flamethrower", "Volt Switch", "Snarl"] },
    "Magneton": { types: ["Electric", "Steel"], hp: 350, moves: ["Thunderbolt", "Flash Cannon", "Tri Attack", "Volt Switch"] },
    "Electrode": { types: ["Electric"], hp: 350, moves: ["Thunderbolt", "Volt Switch", "Foul Play", "Signal Beam"] },
    "Torkoal": { types: ["Fire"], hp: 450, moves: ["Heat Wave", "Earth Power", "Body Slam", "Solar Beam"] },
    "Camerupt": { types: ["Fire", "Ground"], hp: 450, moves: ["Earth Power", "Fire Blast", "Rock Slide", "Flash Cannon"] },
    "Houndoom": { types: ["Dark", "Fire"], hp: 380, moves: ["Dark Pulse", "Flamethrower", "Sludge Bomb", "Solar Beam"] },
    "Slaking": { types: ["Normal"], hp: 650, moves: ["Giga Impact", "Earthquake", "Play Rough", "Hammer Arm"] },
    "Zangoose": { types: ["Normal"], hp: 380, moves: ["Close Combat", "Return", "Night Slash", "X-Scissor"] },
    "Ursaring": { types: ["Normal"], hp: 500, moves: ["Return", "Close Combat", "Crunch", "Earthquake"] },
    "Altaria": { types: ["Dragon", "Flying"], hp: 400, moves: ["Dragon Pulse", "Moonblast", "Flamethrower", "Hurricane"] },
    "Pelipper": { types: ["Water", "Flying"], hp: 400, moves: ["Hurricane", "Surf", "Ice Beam", "Shock Wave"] },
    "Tropius": { types: ["Grass", "Flying"], hp: 480, moves: ["Energy Ball", "Air Slash", "Earthquake", "Body Slam"] },
    "Lunatone": { types: ["Rock", "Psychic"], hp: 400, moves: ["Psychic", "Power Gem", "Earth Power", "Moonblast"] },
    "Solrock": { types: ["Rock", "Psychic"], hp: 400, moves: ["Zen Headbutt", "Rock Slide", "Flare Blitz", "Earthquake"] },
    "Ludicolo": { types: ["Water", "Grass"], hp: 420, moves: ["Surf", "Giga Drain", "Ice Beam", "Focus Blast"] },
    "Bastiodon": { types: ["Rock", "Steel"], hp: 500, moves: ["Iron Head", "Stone Edge", "Earthquake", "Heavy Slam"] },
    "Torterra": { types: ["Grass", "Ground"], hp: 500, moves: ["Wood Hammer", "Earthquake", "Stone Edge", "Crunch"] },
    "Gallade": { types: ["Psychic", "Fighting"], hp: 400, moves: ["Close Combat", "Psycho Cut", "Leaf Blade", "Night Slash"] },
    "Gyarados": { types: ["Water", "Flying"], hp: 500, moves: ["Waterfall", "Earthquake", "Crunch", "Ice Fang"] },
    "Quagsire": { types: ["Water", "Ground"], hp: 450, moves: ["Earthquake", "Waterfall", "Stone Edge", "Ice Punch"] },
    "Chandelure": { types: ["Ghost", "Fire"], hp: 380, moves: ["Shadow Ball", "Fire Blast", "Energy Ball", "Psychic"] },
    "Haxorus": { types: ["Dragon"], hp: 400, moves: ["Outrage", "Earthquake", "Poison Jab", "Close Combat"] },
    "Flygon": { types: ["Ground", "Dragon"], hp: 420, moves: ["Earthquake", "Dragon Claw", "Fire Punch", "U-turn"] }
};

/* =========================================
   3. GAME STATE & VARIABLES
   ========================================= */
let gameState = {
    playerTeam: [],
    machineTeam: [],
    availablePokemon: [],
    turn: 'player_select', 
    wins: 0,
    tokens: 0,
    activePlayerMon: null,
    activeMachineMon: null,
    isSwitching: false, 
    logs: [],
    playerSwapsLeft: 2,
    machineSwapsLeft: 2,
    isGymBattle: false
};

let playerStats = {
    gamesPlayed: 0,
    pokemonUsage: {}, // { "Charizard": 5, "Blastoise": 2 }
    moveUsage: {},    // { "Flamethrower": 10, ... }
    typeUsage: {}     // { "Fire": 8, ... }
};

let myBadges = [];
let pendingGymBadge = null;

/* =========================================
   4. DOM ELEMENTS
   ========================================= */
const els = {
    startBtn: document.getElementById('startGameBtn'),
    resetBtn: document.getElementById('resetDataBtn'),
    
    // Modals
    rulesBtn: document.getElementById('rulesBtn'),
    rulesModal: document.getElementById('rulesModal'),
    closeRulesBtn: document.getElementById('closeRulesBtn'),
    closeModalSpan: document.querySelector('.close-modal'),
    
    profileBtn: document.getElementById('profileBtn'),
    profileModal: document.getElementById('profileModal'),
    closeProfileBtn: document.getElementById('closeProfileBtn'),
    badgeContainer: document.getElementById('badge-collection-container'),
    
    // Stats Elements
    pWins: document.getElementById('profile-wins'),
    pWinrate: document.getElementById('profile-winrate'), // NEW
    pTokens: document.getElementById('profile-tokens'),
    pBadgesCount: document.getElementById('profile-badges-count'),
    topPokemonList: document.getElementById('top-pokemon-list'), // NEW
    topMovesList: document.getElementById('top-moves-list'),     // NEW
    topTypesList: document.getElementById('top-types-list'),     // NEW

    gymModal: document.getElementById('gymModal'),
    regionSelector: document.getElementById('region-selector'),
    leaderSelector: document.getElementById('leader-selector'),
    leaderGrid: document.getElementById('leader-grid'),
    backToRegions: document.getElementById('backToRegions'),
    gymChallengeBtn: document.getElementById('gymChallengeBtn'),

    // Shiny Controls
    shinyArea: document.getElementById('shiny-selector-area'),
    tokensAvailable: document.getElementById('shiny-tokens-available'),

    // Stages
    selectionStage: document.getElementById('selection-stage'),
    tmStage: document.getElementById('tm-stage'),
    starterStage: document.getElementById('starter-stage'),
    duelStage: document.getElementById('duel-stage'),
    resultsStage: document.getElementById('results-stage'),
    mainMsg: document.getElementById('main-message-panel'),

    // Containers
    selectionGrid: document.getElementById('selection-grid'),
    starterGrid: document.getElementById('starter-selection-grid'),
    tmContainer: document.getElementById('tm-selection-container'),
    
    // Previews
    playerPreview: document.getElementById('player-team-preview'),
    machinePreview: document.getElementById('machine-team-preview'),
    
    // Buttons
    confirmTeamBtn: document.getElementById('confirmTeamBtn'),
    goToStarterBtn: document.getElementById('goToStarterBtn'),
    restartBtn: document.getElementById('restartBtn'),
    
    // Duel Elements
    battleLog: document.getElementById('battle-log'),
    battleControls: document.getElementById('battle-controls'),
    battleControlsWrapper: document.getElementById('battle-controls-wrapper'),
    controlLabel: document.getElementById('control-label'),
    winDisplay: document.getElementById('wins-display'),
    tokenDisplay: document.getElementById('token-display'),
    playerSwapsText: document.getElementById('player-swaps-left'),
    machineSwapsText: document.getElementById('machine-swaps-left'),
    
    // Sidebars
    playerPartyList: document.getElementById('player-party-list'),
    machinePartyList: document.getElementById('machine-party-list'),
    
    // Active Stats
    pSprite: document.getElementById('player-sprite'),
    pName: document.getElementById('player-name'),
    pHpBar: document.getElementById('player-hp-bar'),
    pHpText: document.getElementById('player-hp-text'),
    pTypes: document.getElementById('player-types'),
    
    fSprite: document.getElementById('foe-sprite'),
    fName: document.getElementById('foe-name'),
    fHpBar: document.getElementById('foe-hp-bar'),
    fHpText: document.getElementById('foe-hp-text'),
    fTypes: document.getElementById('foe-types'),
    
    resultText: document.getElementById('duel-result-text'),
    statusSpan: document.getElementById('current-status')
};

/* =========================================
   5. INITIALIZATION & RESET
   ========================================= */
loadStorage();
checkGymEligibility();

// Main Game Events
if(els.startBtn) els.startBtn.addEventListener('click', () => initGame(false));
if(els.resetBtn) els.resetBtn.addEventListener('click', resetData);
if(els.confirmTeamBtn) els.confirmTeamBtn.addEventListener('click', confirmTeam);
if(els.goToStarterBtn) els.goToStarterBtn.addEventListener('click', startStarterSelection);
if(els.restartBtn) els.restartBtn.addEventListener('click', resetUI);

// Modals
if(els.rulesBtn) els.rulesBtn.addEventListener('click', () => els.rulesModal.classList.remove('hidden'));
if(els.closeRulesBtn) els.closeRulesBtn.addEventListener('click', () => els.rulesModal.classList.add('hidden'));
if(els.closeModalSpan) els.closeModalSpan.addEventListener('click', () => els.rulesModal.classList.add('hidden'));

if(els.profileBtn) els.profileBtn.addEventListener('click', openProfile);
if(els.closeProfileBtn) els.closeProfileBtn.addEventListener('click', () => els.profileModal.classList.add('hidden'));

if(els.gymChallengeBtn) els.gymChallengeBtn.addEventListener('click', openGymSelector);
if(els.backToRegions) els.backToRegions.addEventListener('click', () => {
    els.leaderSelector.classList.add('hidden');
    els.regionSelector.classList.remove('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target == els.rulesModal) els.rulesModal.classList.add('hidden');
    if (event.target == els.profileModal) els.profileModal.classList.add('hidden');
    if (event.target == els.gymModal) els.gymModal.classList.add('hidden');
});

/* =========================================
   6. STORAGE & HELPERS
   ========================================= */
function saveStorage() {
    localStorage.setItem('pokeDuelWins', gameState.wins);
    localStorage.setItem('pokeDuelTokens', gameState.tokens);
    localStorage.setItem('pokeDuelBadges', JSON.stringify(myBadges));
    localStorage.setItem('pokeDuelStats', JSON.stringify(playerStats));
}

function loadStorage() {
    const w = localStorage.getItem('pokeDuelWins');
    const t = localStorage.getItem('pokeDuelTokens');
    const b = localStorage.getItem('pokeDuelBadges');
    const s = localStorage.getItem('pokeDuelStats');

    if (w) gameState.wins = parseInt(w);
    if (t) gameState.tokens = parseInt(t);
    if (b) myBadges = JSON.parse(b);
    if (s) playerStats = JSON.parse(s);

    if(els.winDisplay) els.winDisplay.innerText = gameState.wins;
    if(els.tokenDisplay) els.tokenDisplay.innerText = gameState.tokens;
    if(els.tokensAvailable) els.tokensAvailable.innerText = gameState.tokens;
}

function resetData() {
    if(confirm("¿Borrar Victorias, Tokens, Medallas y Estadísticas?")) {
        localStorage.clear();
        location.reload();
    }
}

function resetUI() {
    els.resultsStage.classList.add('hidden');
    els.duelStage.classList.add('hidden');
    els.mainMsg.classList.remove('hidden');
    els.startBtn.style.display = 'inline-block';
    if(els.statusSpan) els.statusSpan.innerText = "ESPERANDO";
    gameState.playerTeam = [];
    gameState.machineTeam = [];
    checkGymEligibility();
}

function getImagePath(pokemonName, isShiny = false) {
    if(!pokemonName) return '';
    const cleanName = pokemonName.toLowerCase().replace(/ /g, '').replace(/-/g, '').replace(/\./g,'').replace(/'/g,'');
    if (isShiny) return `./PokeDuel/shiny-${cleanName}.png`;
    return `./PokeDuel/${cleanName}.png`;
}

function getTypeColor(type) {
    const map = { Fire:'#F08030', Water:'#6890F0', Grass:'#78C850', Electric:'#F8D030', Ice:'#98D8D8', Fighting:'#C03028', Poison:'#A040A0', Ground:'#E0C068', Flying:'#A890F0', Psychic:'#F85888', Bug:'#A8B820', Rock:'#B8A038', Ghost:'#705898', Dragon:'#7038F8', Steel:'#B8B8D0', Dark:'#705848', Fairy:'#EE99AC', Normal:'#A8A878' };
    return map[type] || '#ccc';
}

function renderTypeBadges(types) {
    if(!types) return '';
    return types.map(t => `<span class="type-badge" style="background-color:${getTypeColor(t)}">${t}</span>`).join('');
}

/* =========================================
   7. GAME LOGIC (SELECTION & SETUP)
   ========================================= */
function initGame(isGym = false) {
    gameState.playerTeam = [];
    
    if (!isGym) {
        gameState.machineTeam = [];
        gameState.isGymBattle = false;
    } else {
        gameState.isGymBattle = true;
    }
    
    gameState.availablePokemon = JSON.parse(JSON.stringify(pokemonData));
    gameState.turn = 'player_select';
    gameState.isSwitching = false;
    gameState.logs = [];
    gameState.playerSwapsLeft = 2;
    gameState.machineSwapsLeft = 2;
    if(els.battleLog) els.battleLog.innerHTML = '';
    
    els.mainMsg.classList.add('hidden');
    els.startBtn.style.display = 'none';
    els.selectionStage.classList.remove('hidden');
    els.playerPreview.innerHTML = '';
    els.machinePreview.innerHTML = '';
    els.confirmTeamBtn.disabled = true;
    if(els.statusSpan) els.statusSpan.innerText = "FASE DE SELECCIÓN";
    
    if (gameState.tokens > 0 && els.shinyArea) {
        els.shinyArea.classList.remove('hidden');
        els.tokensAvailable.innerText = gameState.tokens;
    } else if(els.shinyArea) {
        els.shinyArea.classList.add('hidden');
    }

    renderSelectionGrid();
    updatePreviews(); 
}

function renderSelectionGrid() {
    els.selectionGrid.innerHTML = '';
    gameState.availablePokemon.forEach((poke, index) => {
        const card = document.createElement('div');
        card.className = 'poke-card';
        card.innerHTML = `
            <img src="${getImagePath(poke.name)}" class="selection-sprite" alt="${poke.name}">
            <strong>${poke.name}</strong>
            <div class="type-badges-container">${renderTypeBadges(poke.types)}</div>
            <span style="color:#4caf50; font-size:0.9em;">HP: ${poke.hp}</span>
        `;
        card.addEventListener('click', () => playerPick(index, card));
        els.selectionGrid.appendChild(card);
    });
}

function playerPick(index, cardElement) {
    if (gameState.turn !== 'player_select' || gameState.playerTeam.length >= 3 || cardElement.classList.contains('unavailable')) return;

    const picked = gameState.availablePokemon[index];
    picked.isShiny = false; 
    
    gameState.playerTeam.push(picked);
    cardElement.classList.add('selected-player', 'unavailable');
    updatePreviews();

    // IF PLAYER HAS 3
    if (gameState.playerTeam.length === 3) {
        // IF GYM BATTLE: Machine already full, enable confirm immediately
        if (gameState.isGymBattle && gameState.machineTeam.length === 3) {
             els.confirmTeamBtn.disabled = false;
             document.getElementById('turn-indicator').innerText = "Equipos Listos";
             return;
        }
        
        // IF NORMAL BATTLE: Check if Machine is also full
        if (gameState.machineTeam.length === 3) {
             els.confirmTeamBtn.disabled = false;
             document.getElementById('turn-indicator').innerText = "Equipos Listos";
             return;
        }
    }

    // IF MACHINE NEEDS TO PICK
    if (!gameState.isGymBattle && gameState.machineTeam.length < 3) {
        gameState.turn = 'machine_select';
        document.getElementById('turn-indicator').innerText = "Máquina (Pensando...)";
        setTimeout(machinePick, 300);
    }
}

function machinePick() {
    const availableIndices = gameState.availablePokemon
        .map((p, i) => ({ p, i }))
        .filter(item => !els.selectionGrid.children[item.i].classList.contains('unavailable'));

    if (availableIndices.length > 0) {
        const randomChoice = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        randomChoice.p.isShiny = false; 
        gameState.machineTeam.push(randomChoice.p);
        const card = els.selectionGrid.children[randomChoice.i];
        card.classList.add('selected-machine', 'unavailable');
        updatePreviews();
    }

    // After Machine Picks: Check State
    if (gameState.playerTeam.length === 3 && gameState.machineTeam.length === 3) {
        els.confirmTeamBtn.disabled = false;
        document.getElementById('turn-indicator').innerText = "Equipos Listos";
    } else {
        gameState.turn = 'player_select';
        document.getElementById('turn-indicator').innerText = "Jugador";
    }
}

function updatePreviews() {
    els.playerPreview.innerHTML = '';
    gameState.playerTeam.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'preview-item';
        if(p.isShiny) item.classList.add('shiny-active');
        const img = document.createElement('img');
        img.src = getImagePath(p.name, p.isShiny);
        item.appendChild(img);
        if(p.isShiny) {
            const star = document.createElement('div');
            star.className = 'shiny-icon';
            star.innerHTML = '✨';
            item.appendChild(star);
        }
        item.addEventListener('click', () => toggleShinyStatus(index));
        els.playerPreview.appendChild(item);
    });

    els.machinePreview.innerHTML = gameState.machineTeam.map(p => `<div class="preview-item"><img src="${getImagePath(p.name)}" title="${p.name}" onerror="this.style.display='none'"></div>`).join('');
}

function toggleShinyStatus(teamIndex) {
    const pokemon = gameState.playerTeam[teamIndex];
    if (pokemon.isShiny) {
        pokemon.isShiny = false;
    } else {
        const currentShinies = gameState.playerTeam.filter(p => p.isShiny).length;
        if (currentShinies < gameState.tokens) {
            pokemon.isShiny = true;
        } else {
            alert("No tienes suficientes Tokens.");
        }
    }
    updatePreviews();
}

function confirmTeam() {
    // Record stats for selected team
    gameState.playerTeam.forEach(p => {
        playerStats.pokemonUsage[p.name] = (playerStats.pokemonUsage[p.name] || 0) + 1;
        p.types.forEach(t => {
            playerStats.typeUsage[t] = (playerStats.typeUsage[t] || 0) + 1;
        });
    });
    saveStorage(); // Save stats immediately
    startTmSelection();
}

function startTmSelection() {
    els.selectionStage.classList.add('hidden');
    els.tmStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "SELECCIÓN DE TMs";
    renderTmColumns();
    
    gameState.machineTeam.forEach(poke => {
        if (!poke.moves || poke.moves.length === 0) {
            const pool = poke.tms || ["Tackle"];
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            poke.moves = shuffled.slice(0, 4).map(tmName => {
                const dbInfo = tmDatabase[tmName];
                if (!dbInfo) return { name: tmName, type: "Normal", power: 50, currentPP: 10 };
                return { name: tmName, ...dbInfo, currentPP: dbInfo.pp || 10 };
            });
        }
        poke.currentHp = poke.hp;
    });
}

function renderTmColumns() {
    els.tmContainer.innerHTML = '';
    els.goToStarterBtn.disabled = true;

    gameState.playerTeam.forEach((poke, pIndex) => {
        poke.moves = []; 
        poke.currentHp = poke.hp; 
        const col = document.createElement('div');
        col.className = 'tm-column';
        col.innerHTML = `<h3><img src="${getImagePath(poke.name, poke.isShiny)}" style="width:30px; vertical-align:middle;"> ${poke.name}</h3><div class="tm-grid" id="tm-grid-${pIndex}"></div>`;
        const grid = col.querySelector('.tm-grid');
        const pool = poke.tms || ["Tackle"];
        pool.forEach(tmName => {
            const tmInfo = tmDatabase[tmName] || { type: 'Normal', power: 50, pp: 10 };
            const item = document.createElement('div');
            item.className = 'tm-item';
            item.innerHTML = `<strong>${tmName}</strong><br><span class="tm-type-indicator" style="color: ${getTypeColor(tmInfo.type)}">${tmInfo.type}</span> - Pwr:${tmInfo.power}`;
            item.addEventListener('click', () => {
                if (item.classList.contains('picked')) {
                    item.classList.remove('picked');
                    poke.moves = poke.moves.filter(m => m.name !== tmName);
                } else {
                    if (poke.moves.length < 4) {
                        item.classList.add('picked');
                        poke.moves.push({ name: tmName, ...tmInfo, currentPP: tmInfo.pp || 10 });
                    }
                }
                checkAllTmsSelected();
            });
            grid.appendChild(item);
        });
        els.tmContainer.appendChild(col);
    });
}

function checkAllTmsSelected() {
    const allReady = gameState.playerTeam.every(p => p.moves && p.moves.length === 4);
    els.goToStarterBtn.disabled = !allReady;
}

function startStarterSelection() {
    els.tmStage.classList.add('hidden');
    els.starterStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "ELIGE TU LÍDER";
    els.starterGrid.innerHTML = '';
    gameState.playerTeam.forEach(poke => {
        const card = document.createElement('div');
        card.className = 'poke-card';
        if(poke.isShiny) { card.classList.add('is-shiny-card'); } 
        card.innerHTML = `<img src="${getImagePath(poke.name, poke.isShiny)}" class="selection-sprite"><strong>${poke.name}</strong>`;
        card.addEventListener('click', () => { startDuel(poke); });
        els.starterGrid.appendChild(card);
    });
}

/* =========================================
   8. DUEL LOGIC
   ========================================= */
function startDuel(starterPokemon) {
    els.starterStage.classList.add('hidden');
    els.duelStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "EN COMBATE";
    
    // Update stats
    playerStats.gamesPlayed++;
    saveStorage();

    if(els.battleControlsWrapper) {
        els.battleControlsWrapper.innerHTML = `<h4 id="control-label">Elige tu ataque:</h4><div id="battle-controls" class="move-grid"></div>`;
        els.controlLabel = document.getElementById('control-label');
        els.battleControls = document.getElementById('battle-controls');
    }

    const shiniesUsed = gameState.playerTeam.filter(p => p.isShiny).length;
    if (shiniesUsed > 0) {
        gameState.tokens = Math.max(0, gameState.tokens - shiniesUsed);
        if(els.tokenDisplay) els.tokenDisplay.innerText = gameState.tokens;
        if(els.tokensAvailable) els.tokensAvailable.innerText = gameState.tokens;
        saveStorage();
    }

    gameState.activePlayerMon = starterPokemon;
    if (gameState.machineTeam.length > 0) {
        gameState.activeMachineMon = gameState.isGymBattle ? gameState.machineTeam[0] : gameState.machineTeam[Math.floor(Math.random() * gameState.machineTeam.length)];
    }
    
    updateBattleUI();
    logBattle(`¡Comienza el duelo!`);
    logBattle(`Enviaste a ${gameState.activePlayerMon.name}.`);
    logBattle(`Rival envía a ${gameState.activeMachineMon.name}.`);
    renderMoveButtons();
}

function updatePartyViews() {
    if(els.playerSwapsText) els.playerSwapsText.innerText = gameState.playerSwapsLeft;
    if(els.machineSwapsText) els.machineSwapsText.innerText = gameState.machineSwapsLeft;

    if(els.playerPartyList) {
        els.playerPartyList.innerHTML = '';
        gameState.playerTeam.forEach(poke => {
            const isActive = poke === gameState.activePlayerMon;
            const isFainted = poke.currentHp <= 0;
            const canTacticalSwap = !gameState.isSwitching && !isActive && !isFainted && gameState.playerSwapsLeft > 0;
            const isForcedSwap = gameState.isSwitching && !isFainted;
            let classes = 'party-card';
            if (isActive) classes += ' active-mon';
            if (isFainted) classes += ' fainted';
            if (canTacticalSwap) classes += ' tactical-swap';
            if (isForcedSwap) classes += ' forced-swap';
            if (poke.isShiny) classes += ' is-shiny-card';
            const hpPct = (poke.currentHp / poke.hp) * 100;
            const card = document.createElement('div');
            card.className = classes;
            card.innerHTML = `<img src="${getImagePath(poke.name, poke.isShiny)}" class="party-thumb"><div class="small-hp-bar"><div class="small-hp-fill" style="width:${hpPct}%"></div></div>`;
            if (canTacticalSwap) card.addEventListener('click', () => performTacticalSwap(poke));
            else if (isForcedSwap) card.addEventListener('click', () => performForcedSwap(poke));
            els.playerPartyList.appendChild(card);
        });
    }
    if(els.machinePartyList) {
        els.machinePartyList.innerHTML = '';
        gameState.machineTeam.forEach(poke => {
            const isActive = poke === gameState.activeMachineMon;
            const isFainted = poke.currentHp <= 0;
            let classes = 'party-card';
            if (isActive) classes += ' active-mon';
            if (isFainted) classes += ' fainted';
            const hpPct = (poke.currentHp / poke.hp) * 100;
            const card = document.createElement('div');
            card.className = classes;
            card.innerHTML = `<img src="${getImagePath(poke.name)}" class="party-thumb" onerror="this.style.display='none'"><div class="small-hp-bar"><div class="small-hp-fill" style="width:${hpPct}%"></div></div>`;
            els.machinePartyList.appendChild(card);
        });
    }
}

function updateBattleUI() {
    const pMon = gameState.activePlayerMon;
    const fMon = gameState.activeMachineMon;
    if(!pMon || !fMon) return;

    if(els.pName) els.pName.innerText = pMon.name + (pMon.isShiny ? ' ✨' : '');
    if(els.pSprite) els.pSprite.src = getImagePath(pMon.name, pMon.isShiny);
    if(els.pHpBar) {
        const pPct = Math.max(0, (pMon.currentHp / pMon.hp) * 100);
        els.pHpBar.style.width = `${pPct}%`;
        if(els.pHpText) els.pHpText.innerText = `${Math.ceil(pMon.currentHp)}/${pMon.hp}`;
    }
    if(els.pTypes) els.pTypes.innerHTML = renderTypeBadges(pMon.types);

    if(els.fName) els.fName.innerText = fMon.name;
    if(els.fSprite) {
        els.fSprite.src = getImagePath(fMon.name);
        els.fSprite.onerror = function() { this.style.display = 'none'; };
        els.fSprite.onload = function() { this.style.display = 'block'; };
    }
    if(els.fHpBar) {
        const fPct = Math.max(0, (fMon.currentHp / fMon.hp) * 100);
        els.fHpBar.style.width = `${fPct}%`;
        if(els.fHpText) els.fHpText.innerText = `${Math.ceil(fMon.currentHp)}/${fMon.hp}`;
    }
    if(els.fTypes) els.fTypes.innerHTML = renderTypeBadges(fMon.types);
    updatePartyViews();
}

function renderMoveButtons() {
    if(!els.battleControls) return;
    els.battleControls.innerHTML = '';
    if (gameState.isSwitching) {
        if(els.controlLabel) els.controlLabel.innerText = "¡Tu Pokémon se debilitó! Elige otro.";
        return;
    }
    if(els.controlLabel) els.controlLabel.innerText = "Elige tu ataque:";
    gameState.activePlayerMon.moves.forEach(move => {
        const btn = document.createElement('button');
        btn.className = 'move-btn';
        const typeColor = getTypeColor(move.type || 'Normal');
        btn.innerHTML = `<strong>${move.name}</strong><div class="move-meta"><span class="move-type-text" style="color:${typeColor}">${move.type}</span><span>PP: ${move.currentPP}</span></div>`;
        btn.disabled = move.currentPP <= 0;
        btn.addEventListener('click', () => executeTurn(move));
        els.battleControls.appendChild(btn);
    });
}

function logBattle(msg) {
    const p = document.createElement('p');
    p.innerText = "> " + msg;
    if(els.battleLog) els.battleLog.prepend(p);
}

function executeTurn(playerMove) {
    // Stats: Track Move Usage
    playerStats.moveUsage[playerMove.name] = (playerStats.moveUsage[playerMove.name] || 0) + 1;
    
    performAttack(gameState.activePlayerMon, gameState.activeMachineMon, playerMove);
    playerMove.currentPP--;
    updateBattleUI();
    if (gameState.activeMachineMon.currentHp <= 0) {
        handleFaint('machine');
    } else {
        disableControls(true);
        setTimeout(() => machineTurnLogic(), 1500);
    }
}

function calculateTypeAdvantage(attacker, defender) {
    if(!attacker || !defender) return 1;
    let maxEffectiveness = 0;
    attacker.types.forEach(atkType => {
        let currentTypeEff = 1;
        defender.types.forEach(defType => {
            if (typeMatchups[atkType] && typeMatchups[atkType][defType] !== undefined) {
                currentTypeEff *= typeMatchups[atkType][defType];
            }
        });
        if (currentTypeEff > maxEffectiveness) maxEffectiveness = currentTypeEff;
    });
    return maxEffectiveness;
}

function findBestCounter(currentEnemy) {
    let bestCandidate = null;
    let bestScore = -999;
    gameState.machineTeam.forEach(p => {
        if (p === gameState.activeMachineMon || p.currentHp <= 0) return;
        const defensiveMult = calculateTypeAdvantage(currentEnemy, p);
        const offensiveMult = calculateTypeAdvantage(p, currentEnemy);
        let score = (offensiveMult * 10) - (defensiveMult * 10);
        if (p.currentHp > (p.hp * 0.7)) score += 5;
        if (score > bestScore) { bestScore = score; bestCandidate = p; }
    });
    return bestCandidate;
}

function machineTurnLogic() {
    if(gameState.activeMachineMon.currentHp <= 0) return;
    const canSwap = gameState.machineSwapsLeft > 0;
    const incoming = calculateTypeAdvantage(gameState.activePlayerMon, gameState.activeMachineMon);
    const outgoing = calculateTypeAdvantage(gameState.activeMachineMon, gameState.activePlayerMon);
    
    if (canSwap && (incoming >= 2.0 || outgoing <= 0.5) && Math.random() > 0.25) {
        const best = findBestCounter(gameState.activePlayerMon);
        if (best) { performMachineTacticalSwap(best); return; }
    }
    performMachineAttack();
}

function performMachineAttack() {
    const foeMoves = gameState.activeMachineMon.moves.filter(m => m.currentPP > 0);
    let foeMove = foeMoves.length > 0 ? foeMoves[Math.floor(Math.random() * foeMoves.length)] : { name: "Struggle", type: "Normal", power: 50, currentPP: 1 };
    if(foeMove.name !== "Struggle") foeMove.currentPP--;
    performAttack(gameState.activeMachineMon, gameState.activePlayerMon, foeMove);
    updateBattleUI();
    if (gameState.activePlayerMon.currentHp <= 0) handleFaint('player');
    else { disableControls(false); renderMoveButtons(); }
}

function performMachineTacticalSwap(newPokemon) {
    gameState.machineSwapsLeft = Math.max(0, gameState.machineSwapsLeft - 1);
    logBattle(`¡Rival retiró a ${gameState.activeMachineMon.name}!`);
    gameState.activeMachineMon = newPokemon;
    logBattle(`¡Rival envió a ${newPokemon.name}!`);
    updateBattleUI();
    disableControls(false);
    renderMoveButtons();
}

function performAttack(attacker, defender, move) {
    let multiplier = 1;
    const moveType = move.type || 'Normal';
    defender.types.forEach(defType => {
        if (typeMatchups[moveType] && typeMatchups[moveType][defType] !== undefined) multiplier *= typeMatchups[moveType][defType];
    });
    let baseDmg = (move.power / 2) + (Math.random() * 15);
    if (attacker.isShiny) baseDmg *= 1.2;
    const totalDmg = Math.floor(baseDmg * multiplier);
    defender.currentHp -= totalDmg;
    if(defender.currentHp < 0) defender.currentHp = 0;
    let effText = "";
    if (multiplier > 1) effText = "¡Super efectivo!";
    else if (multiplier < 1 && multiplier > 0) effText = "No muy efectivo...";
    else if (multiplier === 0) effText = "¡No afecta!";
    let shinyText = attacker.isShiny ? " (Shiny!)" : "";
    logBattle(`${attacker.name} usó ${move.name}.${shinyText} Daño: ${totalDmg}. ${effText}`);
}

function performTacticalSwap(newPokemon) {
    if (gameState.playerSwapsLeft <= 0) return;
    gameState.playerSwapsLeft--;
    logBattle(`¡Retiraste a ${gameState.activePlayerMon.name}!`);
    gameState.activePlayerMon = newPokemon;
    logBattle(`¡Adelante ${newPokemon.name}!`);
    updateBattleUI();
    renderMoveButtons();
    disableControls(true);
    setTimeout(() => machineTurnLogic(), 1500);
}

function performForcedSwap(newPokemon) {
    gameState.activePlayerMon = newPokemon;
    gameState.isSwitching = false;
    logBattle(`¡Adelante ${newPokemon.name}!`);
    updateBattleUI();
    renderMoveButtons();
    disableControls(false);
}

function handleFaint(side) {
    if (side === 'machine') {
        logBattle(`${gameState.activeMachineMon.name} se debilitó.`);
        const next = gameState.machineTeam.find(p => p.currentHp > 0);
        if (next) {
            disableControls(true);
            setTimeout(() => {
                gameState.activeMachineMon = next;
                logBattle(`Rival envía a ${next.name}.`);
                updateBattleUI();
                disableControls(false);
                renderMoveButtons();
            }, 1500);
        } else {
            endDuel(true);
        }
    } else {
        logBattle(`${gameState.activePlayerMon.name} se debilitó.`);
        const hasAlive = gameState.playerTeam.some(p => p.currentHp > 0);
        if (hasAlive) {
            gameState.isSwitching = true;
            updatePartyViews(); 
            renderMoveButtons(); 
        } else {
            endDuel(false);
        }
    }
}

function disableControls(disabled) {
    if(!els.battleControls) return;
    const btns = els.battleControls.querySelectorAll('button');
    btns.forEach(b => b.disabled = disabled);
}

function endDuel(playerWon) {
    if (playerWon) {
        gameState.wins++;
        if (gameState.wins % 5 === 0) {
            gameState.tokens++;
            alert("¡Ganaste 1 Shiny Token!");
        }
    }
    saveStorage();
    
    // GYM LOGIC
    if (pendingGymBadge) {
        if (playerWon) {
            if (!myBadges.includes(pendingGymBadge)) {
                myBadges.push(pendingGymBadge);
                localStorage.setItem('pokeDuelBadges', JSON.stringify(myBadges));
                alert(`¡HAS GANADO LA MEDALLA! (${pendingGymBadge})`);
            }
        } else {
            alert("Has perdido el desafío de gimnasio...");
        }
        pendingGymBadge = null;
        checkGymEligibility();
    }

    const message = playerWon ? "<span style='color:#4caf50'>¡VICTORIA!</span>" : "<span style='color:#f44336'>DERROTA</span>";
    if(els.battleControlsWrapper) {
        els.battleControlsWrapper.innerHTML = `<div class="end-game-panel"><h2>${message}</h2><button id="finishDuelBtn">Continuar</button></div>`;
        document.getElementById('finishDuelBtn').onclick = () => {
            els.duelStage.classList.add('hidden');
            els.resultsStage.classList.remove('hidden');
            if(els.winDisplay) els.winDisplay.innerText = gameState.wins;
            if(els.tokenDisplay) els.tokenDisplay.innerText = gameState.tokens;
            if(els.resultText) els.resultText.innerHTML = playerWon ? "¡Has derrotado al equipo rival!" : "Te has quedado sin Pokémon.";
            checkGymEligibility();
        };
    }
}

/* =========================================
   9. EXTENSIONS (PROFILE & GYMS)
   ========================================= */
function openProfile() {
    if(els.pWins) els.pWins.innerText = gameState.wins;
    if(els.pTokens) els.pTokens.innerText = gameState.tokens;
    if(els.pBadgesCount) els.pBadgesCount.innerText = myBadges.length;
    
    // Winrate Calculation
    const winrate = playerStats.gamesPlayed > 0 
        ? ((gameState.wins / playerStats.gamesPlayed) * 100).toFixed(1) 
        : 0;
    if(els.pWinrate) els.pWinrate.innerText = `${winrate}%`;

    // Top Lists
    renderTopList(playerStats.pokemonUsage, els.topPokemonList);
    renderTopList(playerStats.moveUsage, els.topMovesList);
    renderTopList(playerStats.typeUsage, els.topTypesList);

    // Badges
    els.badgeContainer.innerHTML = '';
    for (const [region, leaders] of Object.entries(gymData)) {
        const regionDiv = document.createElement('div');
        regionDiv.className = 'region-badge-row';
        regionDiv.innerHTML = `<h4 class="region-title">${region}</h4>`;
        const list = document.createElement('div');
        list.className = 'badges-list';
        leaders.forEach(l => {
            const badge = document.createElement('div');
            badge.className = 'badge-item';
            const badgeId = `${region}-${l.badge}`;
            if (myBadges.includes(badgeId)) {
                badge.classList.add('unlocked');
                badge.title = `${l.badge} Badge (Defeated ${l.leader})`;
                badge.innerHTML = '🏅'; 
            } else {
                badge.title = `Locked: ${l.badge} Badge`;
                badge.innerHTML = '🔒';
            }
            list.appendChild(badge);
        });
        regionDiv.appendChild(list);
        els.badgeContainer.appendChild(regionDiv);
    }
    els.profileModal.classList.remove('hidden');
}

function renderTopList(dataObj, listElement) {
    if(!listElement) return;
    listElement.innerHTML = '';
    
    // Convert object to sorted array
    const sorted = Object.entries(dataObj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Top 5

    if(sorted.length === 0) {
        listElement.innerHTML = '<li><small>Sin datos</small></li>';
        return;
    }

    sorted.forEach(([name, count]) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span> <span class="stat-val">${count}</span>`;
        listElement.appendChild(li);
    });
}

function checkGymEligibility() {
    if (!els.gymChallengeBtn) return;
    const availableSlots = Math.floor(gameState.wins / 10);
    const badgesOwned = myBadges.length;
    if (availableSlots > badgesOwned) {
        els.gymChallengeBtn.classList.remove('hidden');
        els.gymChallengeBtn.innerText = `🏆 DESAFÍO DISPONIBLE (${availableSlots - badgesOwned}) 🏆`;
    } else {
        els.gymChallengeBtn.classList.add('hidden');
    }
}

function openGymSelector() {
    els.gymModal.classList.remove('hidden');
    els.regionSelector.classList.remove('hidden');
    els.leaderSelector.classList.add('hidden');
    els.regionSelector.innerHTML = '';
    for (const region of Object.keys(gymData)) {
        const btn = document.createElement('div');
        btn.className = 'region-btn';
        btn.innerText = region;
        btn.onclick = () => showLeaders(region);
        els.regionSelector.appendChild(btn);
    }
}

function showLeaders(region) {
    els.regionSelector.classList.add('hidden');
    els.leaderSelector.classList.remove('hidden');
    els.leaderGrid.innerHTML = '';
    const leaders = gymData[region];
    leaders.forEach(l => {
        const card = document.createElement('div');
        card.className = 'leader-card';
        const badgeId = `${region}-${l.badge}`;
        let statusText = "";
        if (myBadges.includes(badgeId)) {
            card.classList.add('defeated');
            statusText = "<br><small style='color:#4caf50'>(Derrotado)</small>";
        }
        card.innerHTML = `<strong>${l.leader}</strong><br>${l.badge} Badge${statusText}`;
        if (!myBadges.includes(badgeId)) {
            card.onclick = () => startGymBattle(l, region);
        }
        els.leaderGrid.appendChild(card);
    });
}

function startGymBattle(leaderData, region) {
    els.gymModal.classList.add('hidden');
    pendingGymBadge = `${region}-${leaderData.badge}`;
    initGame(true); // Pass true to indicate Gym Mode (don't clear machine team)
    gameState.machineTeam = leaderData.team.map(pName => generateMachinePokemon(pName));
    window.updatePreviews(); 
    if(els.statusSpan) els.statusSpan.innerText = `VS LÍDER ${leaderData.leader.toUpperCase()}`;
}

function generateMachinePokemon(name) {
    const existing = pokemonData.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        const p = JSON.parse(JSON.stringify(existing));
        p.moves = getRandomMoves(p.tms);
        p.currentHp = p.hp;
        return p;
    } 
    const extra = extraPokemonDB[name];
    if (extra) {
        return {
            name: name,
            types: extra.types,
            hp: extra.hp,
            currentHp: extra.hp,
            tms: extra.moves,
            moves: mapMoves(extra.moves),
            isShiny: false
        };
    }
    // Fallback
    return {
        name: name,
        types: ["Normal"], 
        hp: 450,
        currentHp: 450,
        tms: ["Body Slam", "Hyper Voice", "Return", "Giga Impact"],
        moves: mapMoves(["Body Slam", "Hyper Voice", "Return", "Giga Impact"]),
        isShiny: false
    };
}

function mapMoves(moveNames) {
    return moveNames.map(tmName => {
        const dbInfo = tmDatabase[tmName];
        if (!dbInfo) return { name: tmName, type: "Normal", power: 50, currentPP: 10 };
        return { name: tmName, ...dbInfo, currentPP: dbInfo.pp || 10 };
    });
}

function getRandomMoves(tmsList) {
    const pool = tmsList || ["Tackle"];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return mapMoves(shuffled.slice(0, 4));
}