/* =========================================
   1. GAME DATA (Fixed Syntax & Halved HP)
   ========================================= */
const pokemonData = [
    { name: "Charizard", types: ["Fire", "Flying"], hp: 390, tms: ["Flamethrower", "Air Slash", "Dragon Claw", "Solar Beam", "Earthquake", "Shadow Claw", "Focus Blast", "Heat Wave", "Dragon Pulse", "Fire Blast"] },
    { name: "Blastoise", types: ["Water"], hp: 395, tms: ["Surf", "Ice Beam", "Hydro Pump", "Earthquake", "Flash Cannon", "Focus Blast", "Dark Pulse", "Dragon Pulse", "Blizzard", "Scald"] },
    { name: "Venusaur", types: ["Grass", "Poison"], hp: 400, tms: ["Solar Beam", "Sludge Bomb", "Giga Drain", "Earthquake", "Energy Ball", "Toxic", "Earth Power", "Power Whip", "Leaf Storm", "Venoshock"] },
    { name: "Alakazam", types: ["Psychic"], hp: 275, tms: ["Psychic", "Shadow Ball", "Focus Blast", "Dazzling Gleam", "Energy Ball", "Thunderbolt", "Calm Mind", "Psyshock", "Trick Room", "Future Sight"] },
    { name: "Machamp", types: ["Fighting"], hp: 450, tms: ["Dynamic Punch", "Stone Edge", "Earthquake", "Thunderbolt", "Ice Punch", "Fire Punch", "Close Combat", "Bulk Up", "Rock Slide", "Poison Jab"] },
    { name: "Gengar", types: ["Ghost", "Poison"], hp: 300, tms: ["Shadow Ball", "Sludge Bomb", "Thunderbolt", "Focus Blast", "Energy Ball", "Dazzling Gleam", "Dark Pulse", "Hex", "Venoshock", "Psychic"] },
    { name: "Dragonite", types: ["Dragon", "Flying"], hp: 455, tms: ["Dragon Claw", "Hurricane", "Earthquake", "Fire Punch", "Thunder Punch", "Ice Beam", "Superpower", "Dragon Dance", "Outrage", "Thunder"] },
    { name: "Tyranitar", types: ["Rock", "Dark"], hp: 500, tms: ["Stone Edge", "Crunch", "Earthquake", "Fire Blast", "Ice Beam", "Thunderbolt", "Dragon Dance", "Dark Pulse", "Rock Slide", "Superpower"] },
    { name: "Gardevoir", types: ["Psychic", "Fairy"], hp: 340, tms: ["Psychic", "Moonblast", "Thunderbolt", "Focus Blast", "Shadow Ball", "Energy Ball", "Dazzling Gleam", "Calm Mind", "Hyper Voice", "Mystical Fire"] },
    { name: "Blaziken", types: ["Fire", "Fighting"], hp: 400, tms: ["Flare Blitz", "Close Combat", "Earthquake", "Stone Edge", "Thunder Punch", "Shadow Claw", "Brave Bird", "Bulk Up", "Fire Blast", "Focus Blast"] },
    { name: "Swampert", types: ["Water", "Ground"], hp: 500, tms: ["Surf", "Earthquake", "Ice Beam", "Stone Edge", "Avalanche", "Hammer Arm", "Waterfall", "Scald", "Superpower", "Rock Slide"] },
    { name: "Sceptile", types: ["Grass"], hp: 350, tms: ["Leaf Blade", "Dragon Pulse", "Energy Ball", "Earthquake", "Focus Blast", "X-Scissor", "Acrobatics", "Leaf Storm", "Giga Drain", "Thunder Punch"] },
    { name: "Aggron", types: ["Steel", "Rock"], hp: 350, tms: ["Iron Head", "Stone Edge", "Earthquake", "Heavy Slam", "Ice Punch", "Fire Punch", "Thunder Punch", "Dragon Claw", "Rock Slide", "Superpower"] },
    { name: "Metagross", types: ["Steel", "Psychic"], hp: 400, tms: ["Meteor Mash", "Zen Headbutt", "Earthquake", "Hammer Arm", "Ice Punch", "Thunder Punch", "Bullet Punch", "Explosion", "Rock Slide", "Psychic"] },
    { name: "Salamence", types: ["Dragon", "Flying"], hp: 475, tms: ["Dragon Claw", "Hurricane", "Earthquake", "Fire Blast", "Hydro Pump", "Stone Edge", "Dragon Dance", "Outrage", "Flamethrower", "Roost"] },
    { name: "Garchomp", types: ["Dragon", "Ground"], hp: 540, tms: ["Earthquake", "Dragon Claw", "Stone Edge", "Fire Blast", "Poison Jab", "Iron Head", "Outrage", "Swords Dance", "Crunch", "Rock Slide"] },
    { name: "Lucario", types: ["Fighting", "Steel"], hp: 350, tms: ["Close Combat", "Flash Cannon", "Earthquake", "Stone Edge", "Ice Punch", "Thunder Punch", "Shadow Ball", "Dragon Pulse", "Extreme Speed", "Aura Sphere"] },
    { name: "Abomasnow", types: ["Grass", "Ice"], hp: 450, tms: ["Blizzard", "Energy Ball", "Earthquake", "Ice Beam", "Focus Blast", "Shadow Ball", "Giga Drain", "Ice Shard", "Wood Hammer", "Avalanche"] },
    { name: "Weavile", types: ["Dark", "Ice"], hp: 350, tms: ["Ice Beam", "Night Slash", "Ice Shard", "X-Scissor", "Brick Break", "Poison Jab", "Avalanche", "Focus Blast", "Low Kick", "Swords Dance"] },
    { name: "Rhyperior", types: ["Ground", "Rock"], hp: 575, tms: ["Earthquake", "Stone Edge", "Megahorn", "Ice Punch", "Thunder Punch", "Fire Punch", "Hammer Arm", "Rock Wrecker", "Rock Blast", "Drill Run"] },
    { name: "Electivire", types: ["Electric"], hp: 375, tms: ["Thunderbolt", "Earthquake", "Ice Punch", "Fire Punch", "Thunder Punch", "Focus Blast", "Thunder", "Cross Chop", "Rock Slide", "Giga Impact"] },
    { name: "Magmortar", types: ["Fire"], hp: 375, tms: ["Flamethrower", "Fire Blast", "Thunderbolt", "Focus Blast", "Earthquake", "Solar Beam", "Psychic", "Scorching Sands", "Thunder Punch", "Overheat"] },
    { name: "Togekiss", types: ["Fairy", "Flying"], hp: 425, tms: ["Air Slash", "Dazzling Gleam", "Flamethrower", "Aura Sphere", "Shadow Ball", "Psychic", "Thunder Wave", "Roost", "Heat Wave", "Hyper Voice"] },
    { name: "Roserade", types: ["Grass", "Poison"], hp: 300, tms: ["Sludge Bomb", "Energy Ball", "Shadow Ball", "Dazzling Gleam", "Giga Drain", "Venoshock", "Toxic Spikes", "Leaf Storm", "Sleep Powder", "Spikes"] },
    { name: "Luxray", types: ["Electric"], hp: 400, tms: ["Thunderbolt", "Crunch", "Wild Charge", "Ice Fang", "Fire Fang", "Thunder Fang", "Volt Switch", "Superpower", "Thunder", "Play Rough"] },
    { name: "Staraptor", types: ["Normal", "Flying"], hp: 425, tms: ["Brave Bird", "Close Combat", "Quick Attack", "U-turn", "Steel Wing", "Heat Wave", "Aerial Ace", "Roost", "Facade", "Double-Edge"] },
    { name: "Floatzel", types: ["Water"], hp: 425, tms: ["Waterfall", "Ice Punch", "Aqua Jet", "Crunch", "Brick Break", "Ice Beam", "Surf", "Scald", "Focus Blast", "Hydro Pump"] },
    { name: "Gastrodon", types: ["Water", "Ground"], hp: 555, tms: ["Surf", "Earth Power", "Ice Beam", "Sludge Bomb", "Earthquake", "Scald", "Recover", "Toxic", "Stone Edge", "Body Slam"] },
    { name: "Drifblim", types: ["Ghost", "Flying"], hp: 750, tms: ["Shadow Ball", "Air Slash", "Thunderbolt", "Psychic", "Will-O-Wisp", "Acrobatics", "Hex", "Calm Mind", "Icy Wind", "Explosion"] },
    { name: "Lopunny", types: ["Normal"], hp: 325, tms: ["Return", "Ice Punch", "Thunder Punch", "Fire Punch", "Focus Blast", "Shadow Ball", "High Jump Kick", "Drain Punch", "U-turn", "Play Rough"] },
    { name: "Toxicroak", types: ["Poison", "Fighting"], hp: 415, tms: ["Drain Punch", "Poison Jab", "Earthquake", "Ice Punch", "Stone Edge", "X-Scissor", "Sludge Bomb", "Focus Blast", "Venoshock", "Sucker Punch"] },
    { name: "Lumineon", types: ["Water"], hp: 345, tms: ["Surf", "Ice Beam", "Dazzling Gleam", "U-turn", "Signal Beam", "Giga Drain", "Scald", "Aqua Tail", "Psybeam", "Defog"] },
    { name: "Serperior", types: ["Grass"], hp: 375, tms: ["Leaf Storm", "Giga Drain", "Dragon Pulse", "Energy Ball", "Leech Seed", "Reflect", "Light Screen", "Substitute", "Knock Off", "Synthesis"] },
    { name: "Emboar", types: ["Fire", "Fighting"], hp: 550, tms: ["Flare Blitz", "Superpower", "Earthquake", "Stone Edge", "Thunder Punch", "Fire Blast", "Scald", "Wild Charge", "Hammer Arm", "Head Smash"] },
    { name: "Samurott", types: ["Water"], hp: 475, tms: ["Surf", "Ice Beam", "Megahorn", "Aqua Tail", "X-Scissor", "Grass Knot", "Hydro Pump", "Scald", "Drill Run", "Smart Strike"] },
    { name: "Stoutland", types: ["Normal"], hp: 425, tms: ["Return", "Crunch", "Wild Charge", "Ice Fang", "Fire Fang", "Thunder Fang", "Play Rough", "Superpower", "Giga Impact", "Surf"] },
    { name: "Excadrill", types: ["Ground", "Steel"], hp: 550, tms: ["Earthquake", "Iron Head", "Rock Slide", "X-Scissor", "Drill Run", "Swords Dance", "Poison Jab", "Shadow Claw", "Smart Strike", "Horn Drill"] },
    { name: "Krookodile", types: ["Ground", "Dark"], hp: 475, tms: ["Earthquake", "Crunch", "Stone Edge", "Dragon Claw", "Fire Fang", "Thunder Fang", "Outrage", "Dark Pulse", "Foul Play", "Superpower"] },
    { name: "Zoroark", types: ["Dark"], hp: 300, tms: ["Dark Pulse", "Flamethrower", "Focus Blast", "Shadow Ball", "Grass Knot", "U-turn", "Extrasensory", "Sludge Bomb", "Night Daze", "Nasty Plot"] },
    { name: "Volcarona", types: ["Bug", "Fire"], hp: 425, tms: ["Bug Buzz", "Flamethrower", "Hurricane", "Psychic", "Giga Drain", "Solar Beam", "Quiver Dance", "Fire Blast", "Heat Wave", "Overheat"] }
];

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
    "Toxic": { type: "Poison", power: 0, pp: 10 }, 
    "Earth Power": { type: "Ground", power: 90, pp: 10 },
    "Power Whip": { type: "Grass", power: 120, pp: 10 },
    "Leaf Storm": { type: "Grass", power: 130, pp: 5 },
    "Venoshock": { type: "Poison", power: 65, pp: 10 },
    "Psychic": { type: "Psychic", power: 90, pp: 10 },
    "Shadow Ball": { type: "Ghost", power: 80, pp: 15 },
    "Dazzling Gleam": { type: "Fairy", power: 80, pp: 10 },
    "Thunderbolt": { type: "Electric", power: 90, pp: 15 },
    "Calm Mind": { type: "Psychic", power: 0, pp: 20 },
    "Psyshock": { type: "Psychic", power: 80, pp: 10 },
    "Trick Room": { type: "Psychic", power: 0, pp: 5 },
    "Future Sight": { type: "Psychic", power: 120, pp: 10 },
    "Dynamic Punch": { type: "Fighting", power: 100, pp: 5 },
    "Stone Edge": { type: "Rock", power: 100, pp: 5 },
    "Ice Punch": { type: "Ice", power: 75, pp: 15 },
    "Fire Punch": { type: "Fire", power: 75, pp: 15 },
    "Close Combat": { type: "Fighting", power: 120, pp: 5 },
    "Bulk Up": { type: "Fighting", power: 0, pp: 20 },
    "Rock Slide": { type: "Rock", power: 75, pp: 10 },
    "Poison Jab": { type: "Poison", power: 80, pp: 20 },
    "Hex": { type: "Ghost", power: 65, pp: 10 },
    "Hurricane": { type: "Flying", power: 110, pp: 10 },
    "Thunder Punch": { type: "Electric", power: 75, pp: 15 },
    "Superpower": { type: "Fighting", power: 120, pp: 5 },
    "Dragon Dance": { type: "Dragon", power: 0, pp: 20 },
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
    "Swords Dance": { type: "Normal", power: 0, pp: 20 },
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
    "Thunder Wave": { type: "Electric", power: 0, pp: 20 },
    "Roost": { type: "Flying", power: 0, pp: 10 },
    "Toxic Spikes": { type: "Poison", power: 0, pp: 20 },
    "Sleep Powder": { type: "Grass", power: 0, pp: 15 },
    "Spikes": { type: "Ground", power: 0, pp: 20 },
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
    "Recover": { type: "Normal", power: 0, pp: 10 },
    "Body Slam": { type: "Normal", power: 85, pp: 15 },
    "Will-O-Wisp": { type: "Fire", power: 0, pp: 15 },
    "Icy Wind": { type: "Ice", power: 55, pp: 15 },
    "Return": { type: "Normal", power: 102, pp: 20 },
    "High Jump Kick": { type: "Fighting", power: 130, pp: 10 },
    "Drain Punch": { type: "Fighting", power: 75, pp: 10 },
    "Signal Beam": { type: "Bug", power: 75, pp: 15 },
    "Aqua Tail": { type: "Water", power: 90, pp: 10 },
    "Psybeam": { type: "Psychic", power: 65, pp: 20 },
    "Defog": { type: "Flying", power: 0, pp: 15 },
    "Leech Seed": { type: "Grass", power: 0, pp: 10 },
    "Reflect": { type: "Psychic", power: 0, pp: 20 },
    "Light Screen": { type: "Psychic", power: 0, pp: 30 },
    "Substitute": { type: "Normal", power: 0, pp: 10 },
    "Knock Off": { type: "Dark", power: 65, pp: 20 },
    "Synthesis": { type: "Grass", power: 0, pp: 5 },
    "Head Smash": { type: "Rock", power: 150, pp: 5 },
    "Grass Knot": { type: "Grass", power: 80, pp: 20 },
    "Smart Strike": { type: "Steel", power: 70, pp: 10 },
    "Horn Drill": { type: "Normal", power: 999, pp: 5 },
    "Foul Play": { type: "Dark", power: 95, pp: 15 },
    "Extrasensory": { type: "Psychic", power: 80, pp: 20 },
    "Night Daze": { type: "Dark", power: 85, pp: 10 },
    "Nasty Plot": { type: "Dark", power: 0, pp: 20 },
    "Bug Buzz": { type: "Bug", power: 90, pp: 10 },
    "Quiver Dance": { type: "Bug", power: 0, pp: 20 },
    "Sucker Punch": { type: "Dark", power: 70, pp: 5 }
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

/* =========================================
   2. GAME STATE
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
    machineSwapsLeft: 2
};

/* =========================================
   3. DOM ELEMENTS
   ========================================= */
const els = {
    startBtn: document.getElementById('startGameBtn'),
    resetBtn: document.getElementById('resetDataBtn'),
    rulesBtn: document.getElementById('rulesBtn'),
    rulesModal: document.getElementById('rulesModal'),
    closeRulesBtn: document.getElementById('closeRulesBtn'),
    closeModalSpan: document.querySelector('.close-modal'),

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
    controlLabel: document.getElementById('control-label'),
    winDisplay: document.getElementById('wins-display'),
    tokenDisplay: document.getElementById('token-display'),
    playerSwapsText: document.getElementById('player-swaps-left'),
    machineSwapsText: document.getElementById('machine-swaps-left'),
    
    // Sidebars
    playerPartyList: document.getElementById('player-party-list'),
    machinePartyList: document.getElementById('machine-party-list'),
    
    // Active Stats (Player)
    pSprite: document.getElementById('player-sprite'),
    pName: document.getElementById('player-name'),
    pHpBar: document.getElementById('player-hp-bar'),
    pHpText: document.getElementById('player-hp-text'),
    pTypes: document.getElementById('player-types'),
    
    // Active Stats (Machine)
    fSprite: document.getElementById('foe-sprite'),
    fName: document.getElementById('foe-name'),
    fHpBar: document.getElementById('foe-hp-bar'),
    fHpText: document.getElementById('foe-hp-text'),
    fTypes: document.getElementById('foe-types'),
    
    resultText: document.getElementById('duel-result-text'),
    statusSpan: document.getElementById('current-status')
};

/* =========================================
   4. HELPER FUNCTIONS
   ========================================= */
function getImagePath(pokemonName, isShiny = false) {
    if(!pokemonName) return '';
    const cleanName = pokemonName.toLowerCase();
    if (isShiny) {
        return `./PokeDuel/shiny-${cleanName}.png`;
    }
    return `./PokeDuel/${cleanName}.png`;
}

function getTypeColor(type) {
    const map = { 
        Fire:'#F08030', Water:'#6890F0', Grass:'#78C850', Electric:'#F8D030', 
        Ice:'#98D8D8', Fighting:'#C03028', Poison:'#A040A0', Ground:'#E0C068', 
        Flying:'#A890F0', Psychic:'#F85888', Bug:'#A8B820', Rock:'#B8A038', 
        Ghost:'#705898', Dragon:'#7038F8', Steel:'#B8B8D0', Dark:'#705848', 
        Fairy:'#EE99AC', Normal:'#A8A878' 
    };
    return map[type] || '#ccc';
}

function renderTypeBadges(types) {
    if(!types) return '';
    return types.map(t => `<span class="type-badge" style="background-color:${getTypeColor(t)}">${t}</span>`).join('');
}

function saveStorage() {
    localStorage.setItem('pokeDuelWins', gameState.wins);
    localStorage.setItem('pokeDuelTokens', gameState.tokens);
}

function loadStorage() {
    const w = localStorage.getItem('pokeDuelWins');
    const t = localStorage.getItem('pokeDuelTokens');
    if (w) gameState.wins = parseInt(w);
    if (t) gameState.tokens = parseInt(t);
    if(els.winDisplay) els.winDisplay.innerText = gameState.wins;
    if(els.tokenDisplay) els.tokenDisplay.innerText = gameState.tokens;
    if(els.tokensAvailable) els.tokensAvailable.innerText = gameState.tokens;
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
        if (currentTypeEff > maxEffectiveness) {
            maxEffectiveness = currentTypeEff;
        }
    });
    return maxEffectiveness;
}

/* =========================================
   5. INITIALIZATION & RESET
   ========================================= */
loadStorage();

if(els.startBtn) els.startBtn.addEventListener('click', initGame);
if(els.resetBtn) els.resetBtn.addEventListener('click', resetData);
if(els.confirmTeamBtn) els.confirmTeamBtn.addEventListener('click', confirmTeamAndSpendTokens);
if(els.goToStarterBtn) els.goToStarterBtn.addEventListener('click', startStarterSelection);
if(els.restartBtn) els.restartBtn.addEventListener('click', resetUI);

// Rules Modal
if(els.rulesBtn) {
    els.rulesBtn.addEventListener('click', () => { els.rulesModal.classList.remove('hidden'); });
}
if(els.closeRulesBtn) {
    els.closeRulesBtn.addEventListener('click', () => { els.rulesModal.classList.add('hidden'); });
}
if(els.closeModalSpan) {
    els.closeModalSpan.addEventListener('click', () => { els.rulesModal.classList.add('hidden'); });
}
window.addEventListener('click', (event) => {
    if (event.target == els.rulesModal) { els.rulesModal.classList.add('hidden'); }
});

function resetData() {
    if(confirm("¿Borrar Victorias y Tokens?")) {
        localStorage.removeItem('pokeDuelWins');
        localStorage.removeItem('pokeDuelTokens');
        gameState.wins = 0;
        gameState.tokens = 0;
        if(els.winDisplay) els.winDisplay.innerText = 0;
        if(els.tokenDisplay) els.tokenDisplay.innerText = 0;
        alert("Datos borrados.");
    }
}

function resetUI() {
    els.resultsStage.classList.add('hidden');
    els.mainMsg.classList.remove('hidden');
    els.startBtn.style.display = 'inline-block';
    if(els.statusSpan) els.statusSpan.innerText = "ESPERANDO";
}

function initGame() {
    gameState.playerTeam = [];
    gameState.machineTeam = [];
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
    
    // Show shiny controls if player has tokens
    if (gameState.tokens > 0 && els.shinyArea) {
        els.shinyArea.classList.remove('hidden');
        els.tokensAvailable.innerText = gameState.tokens;
    } else if(els.shinyArea) {
        els.shinyArea.classList.add('hidden');
    }

    renderSelectionGrid();
}

/* =========================================
   6. PHASE 1: SELECTION (WITH SHINY TOGGLE)
   ========================================= */
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
    // Default properties for shiny
    picked.isShiny = false; 
    
    gameState.playerTeam.push(picked);
    cardElement.classList.add('selected-player', 'unavailable');
    updatePreviews();

    if (gameState.playerTeam.length === 3 && gameState.machineTeam.length === 3) {
        els.confirmTeamBtn.disabled = false;
        document.getElementById('turn-indicator').innerText = "Equipos Listos";
        return;
    }

    gameState.turn = 'machine_select';
    document.getElementById('turn-indicator').innerText = "Máquina (Pensando...)";
    setTimeout(machinePick, 300);
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

    if (gameState.playerTeam.length < 3) {
        gameState.turn = 'player_select';
        document.getElementById('turn-indicator').innerText = "Jugador";
    } else {
        els.confirmTeamBtn.disabled = false;
        document.getElementById('turn-indicator').innerText = "Equipos Listos";
    }
}

// UPDATE PREVIEWS WITH CLICKABLE SHINY TOGGLE
function updatePreviews() {
    els.playerPreview.innerHTML = '';
    
    gameState.playerTeam.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'preview-item';
        if(p.isShiny) item.classList.add('shiny-active');

        // Image
        const img = document.createElement('img');
        img.src = getImagePath(p.name, p.isShiny);
        item.appendChild(img);

        // Shiny Icon if active
        if(p.isShiny) {
            const star = document.createElement('div');
            star.className = 'shiny-icon';
            star.innerHTML = '✨';
            item.appendChild(star);
        }

        // Click event to toggle shiny
        item.addEventListener('click', () => toggleShinyStatus(index));

        els.playerPreview.appendChild(item);
    });

    els.machinePreview.innerHTML = gameState.machineTeam.map(p => `<div class="preview-item"><img src="${getImagePath(p.name)}"></div>`).join('');
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

function confirmTeamAndSpendTokens() {
    const shiniesUsed = gameState.playerTeam.filter(p => p.isShiny).length;
    if (shiniesUsed > 0) {
        gameState.tokens -= shiniesUsed;
        saveStorage();
        loadStorage(); 
    }
    startTmSelection();
}

/* =========================================
   7. PHASE 2: TM SELECTION
   ========================================= */
function startTmSelection() {
    els.selectionStage.classList.add('hidden');
    els.tmStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "SELECCIÓN DE TMs";
    renderTmColumns();
    
    gameState.machineTeam.forEach(poke => {
        poke.moves = [];
        const pool = poke.tms || [];
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        poke.moves = shuffled.slice(0, 4).map(tmName => {
            const dbInfo = tmDatabase[tmName];
            if (!dbInfo) return { name: tmName, type: "Normal", power: 50, currentPP: 10 };
            return { name: tmName, ...dbInfo, currentPP: dbInfo.pp || 10 };
        });
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
        col.innerHTML = `
            <h3><img src="${getImagePath(poke.name, poke.isShiny)}" style="width:30px; vertical-align:middle;"> ${poke.name} ${poke.isShiny ? '✨' : ''}</h3>
            <div class="tm-grid" id="tm-grid-${pIndex}"></div>
        `;
        const grid = col.querySelector('.tm-grid');
        (poke.tms || []).forEach(tmName => {
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

/* =========================================
   8. PHASE 3: STARTER SELECTION
   ========================================= */
function startStarterSelection() {
    els.tmStage.classList.add('hidden');
    els.starterStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "ELIGE TU LÍDER";
    els.starterGrid.innerHTML = '';
    gameState.playerTeam.forEach(poke => {
        const card = document.createElement('div');
        card.className = 'poke-card';
        if(poke.isShiny) { card.classList.add('is-shiny-card'); } 
        
        card.innerHTML = `
            <img src="${getImagePath(poke.name, poke.isShiny)}" class="selection-sprite">
            <strong>${poke.name}</strong><br>
            <span style="color:#4caf50">HP: ${poke.hp}</span>
        `;
        card.addEventListener('click', () => { startDuel(poke); });
        els.starterGrid.appendChild(card);
    });
}

/* =========================================
   9. PHASE 4: DUEL
   ========================================= */
function startDuel(starterPokemon) {
    els.starterStage.classList.add('hidden');
    els.duelStage.classList.remove('hidden');
    if(els.statusSpan) els.statusSpan.innerText = "EN COMBATE";
    
    gameState.activePlayerMon = starterPokemon;
    if (gameState.machineTeam.length > 0) {
        gameState.activeMachineMon = gameState.machineTeam[Math.floor(Math.random() * gameState.machineTeam.length)];
    } else {
        console.error("Machine team is empty!");
        return;
    }
    
    updateBattleUI();
    logBattle(`¡Comienza el duelo!`);
    logBattle(`Enviaste a ${gameState.activePlayerMon.name}.`);
    logBattle(`Rival envía a ${gameState.activeMachineMon.name}.`);
    renderMoveButtons();
}

function updatePartyViews() {
    // SAFE UPDATES
    if(els.playerSwapsText) els.playerSwapsText.innerText = gameState.playerSwapsLeft;
    if(els.machineSwapsText) els.machineSwapsText.innerText = gameState.machineSwapsLeft;

    // Player List
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
            card.innerHTML = `
                <img src="${getImagePath(poke.name, poke.isShiny)}" class="party-thumb">
                <strong>${poke.name}</strong>
                <div class="small-hp-bar"><div class="small-hp-fill" style="width:${hpPct}%"></div></div>
                <small>${Math.ceil(poke.currentHp)}/${poke.hp}</small>
            `;
            if (canTacticalSwap) {
                card.addEventListener('click', () => performTacticalSwap(poke));
            } else if (isForcedSwap) {
                card.addEventListener('click', () => performForcedSwap(poke));
            }
            els.playerPartyList.appendChild(card);
        });
    }

    // Machine List
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
            card.innerHTML = `
                <img src="${getImagePath(poke.name)}" class="party-thumb">
                <strong>${poke.name}</strong>
                <div class="small-hp-bar"><div class="small-hp-fill" style="width:${hpPct}%"></div></div>
            `;
            els.machinePartyList.appendChild(card);
        });
    }
}

function updateBattleUI() {
    const pMon = gameState.activePlayerMon;
    const fMon = gameState.activeMachineMon;

    if(!pMon || !fMon) return;

    if(els.pName) els.pName.innerText = pMon.name + (pMon.isShiny ? ' ✨' : '');
    if(els.pSprite) {
        els.pSprite.src = getImagePath(pMon.name, pMon.isShiny);
    }
    if(els.pHpBar && els.pHpText) {
        const pPct = Math.max(0, (pMon.currentHp / pMon.hp) * 100);
        els.pHpBar.style.width = `${pPct}%`;
        els.pHpText.innerText = `${Math.ceil(pMon.currentHp)}/${pMon.hp}`;
    }
    if(els.pTypes) els.pTypes.innerHTML = renderTypeBadges(pMon.types);

    if(els.fName) els.fName.innerText = fMon.name;
    if(els.fSprite) els.fSprite.src = getImagePath(fMon.name);
    if(els.fHpBar && els.fHpText) {
        const fPct = Math.max(0, (fMon.currentHp / fMon.hp) * 100);
        els.fHpBar.style.width = `${fPct}%`;
        els.fHpText.innerText = `${Math.ceil(fMon.currentHp)}/${fMon.hp}`;
    }
    if(els.fTypes) els.fTypes.innerHTML = renderTypeBadges(fMon.types);
    
    updatePartyViews();
}

function renderMoveButtons() {
    if(els.battleControls) els.battleControls.innerHTML = '';
    
    if (gameState.isSwitching) {
        if(els.controlLabel) els.controlLabel.innerText = "¡Tu Pokémon se debilitó! Elige otro en la izquierda.";
        return;
    }

    if(els.controlLabel) els.controlLabel.innerText = "Elige tu ataque:";

    if (!gameState.activePlayerMon || !gameState.activePlayerMon.moves || gameState.activePlayerMon.moves.length === 0) {
        if(els.battleControls) els.battleControls.innerHTML = "<p>Error: No moves loaded.</p>";
        return;
    }

    gameState.activePlayerMon.moves.forEach(move => {
        const btn = document.createElement('button');
        btn.className = 'move-btn';
        const typeColor = getTypeColor(move.type || 'Normal');
        btn.innerHTML = `
            <strong>${move.name}</strong>
            <div class="move-meta">
                <span class="move-type-text" style="color:${typeColor}">${move.type}</span>
                <span>PP: ${move.currentPP}</span>
            </div>
        `;
        btn.disabled = move.currentPP <= 0;
        btn.addEventListener('click', () => executeTurn(move));
        if(els.battleControls) els.battleControls.appendChild(btn);
    });
}

function logBattle(msg) {
    const p = document.createElement('p');
    p.innerText = "> " + msg;
    if(els.battleLog) {
        els.battleLog.prepend(p);
        if (els.battleLog.children.length > 6) {
            els.battleLog.removeChild(els.battleLog.lastChild);
        }
    }
}

/* =========================================
   10. BATTLE LOGIC (DAMAGE MULTIPLIER)
   ========================================= */
function executeTurn(playerMove) {
    performAttack(gameState.activePlayerMon, gameState.activeMachineMon, playerMove);
    playerMove.currentPP--;
    updateBattleUI();

    if (gameState.activeMachineMon.currentHp <= 0) {
        handleFaint('machine');
    } else {
        disableControls(true);
        setTimeout(() => {
            machineTurnLogic();
        }, 1500);
    }
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
        if (score > bestScore) {
            bestScore = score;
            bestCandidate = p;
        }
    });
    return bestCandidate;
}

function machineTurnLogic() {
    if(gameState.activeMachineMon.currentHp <= 0) return;
    const canSwap = gameState.machineSwapsLeft > 0;
    const playerToMachineEff = calculateTypeAdvantage(gameState.activePlayerMon, gameState.activeMachineMon); 
    const machineToPlayerEff = calculateTypeAdvantage(gameState.activeMachineMon, gameState.activePlayerMon); 
    const hpRatio = gameState.activeMachineMon.currentHp / gameState.activeMachineMon.hp;

    let shouldSwap = false;
    if (playerToMachineEff >= 2.0 && canSwap && Math.random() > 0.2) shouldSwap = true;
    if (machineToPlayerEff <= 0.5 && canSwap && Math.random() > 0.3) shouldSwap = true;
    if (hpRatio < 0.25 && canSwap && Math.random() > 0.4) shouldSwap = true;
    if (canSwap && !shouldSwap && Math.random() > 0.9) shouldSwap = true;

    if (shouldSwap) {
        const bestBackup = findBestCounter(gameState.activePlayerMon);
        if (bestBackup) {
            performMachineTacticalSwap(bestBackup);
        } else {
            performMachineAttack();
        }
    } else {
        performMachineAttack();
    }
}

function performMachineAttack() {
    const foeMoves = gameState.activeMachineMon.moves.filter(m => m.currentPP > 0);
    let foeMove = foeMoves.length > 0 
        ? foeMoves[Math.floor(Math.random() * foeMoves.length)] 
        : { name: "Struggle", type: "Normal", power: 50, currentPP: 1 }; 
    if(foeMove.name !== "Struggle") foeMove.currentPP--;
    performAttack(gameState.activeMachineMon, gameState.activePlayerMon, foeMove);
    updateBattleUI();
    if (gameState.activePlayerMon.currentHp <= 0) {
        handleFaint('player');
    } else {
        disableControls(false);
        renderMoveButtons();
    }
}

function performMachineTacticalSwap(newPokemon) {
    gameState.machineSwapsLeft--;
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
        if (typeMatchups[moveType] && typeMatchups[moveType][defType] !== undefined) {
            multiplier *= typeMatchups[moveType][defType];
        }
    });

    // DAMAGE FORMULA
    let baseDmg = (move.power / 2) + (Math.random() * 15);
    
    // SHINY BONUS: +20% Damage
    if (attacker.isShiny) {
        baseDmg *= 1.2;
    }

    const totalDmg = Math.floor(baseDmg * multiplier);
    defender.currentHp -= totalDmg;
    if(defender.currentHp < 0) defender.currentHp = 0;

    let effText = "";
    if (multiplier > 1) effText = "¡Super efectivo!";
    else if (multiplier < 1 && multiplier > 0) effText = "No muy efectivo...";
    else if (multiplier === 0) effText = "¡No afecta!";
    
    // Log with Shiny mention
    let shinyText = attacker.isShiny ? " (Shiny Bonus!)" : "";
    logBattle(`${attacker.name} usó ${move.name}.${shinyText} Daño: ${totalDmg}. ${effText}`);
}

/* --- SWAPPING LOGIC --- */
function performTacticalSwap(newPokemon) {
    if (gameState.playerSwapsLeft <= 0) return;
    gameState.playerSwapsLeft--;
    logBattle(`¡Retiraste a ${gameState.activePlayerMon.name}!`);
    gameState.activePlayerMon = newPokemon;
    logBattle(`¡Adelante ${newPokemon.name}!`);
    updateBattleUI();
    renderMoveButtons();
    disableControls(true);
    setTimeout(() => {
        machineTurnLogic();
    }, 1500);
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
    els.duelStage.classList.add('hidden');
    els.resultsStage.classList.remove('hidden');
    if (playerWon) {
        gameState.wins++;
        if(els.winDisplay) els.winDisplay.innerText = gameState.wins;
        if(els.resultText) {
            els.resultText.innerText = "¡VICTORIA! Has derrotado al equipo rival.";
            els.resultText.style.color = "#4caf50";
        }
        if (gameState.wins % 5 === 0) {
            gameState.tokens++;
            if(els.tokenDisplay) els.tokenDisplay.innerText = gameState.tokens;
            alert("¡Ganaste 1 Shiny Token!");
        }
    } else {
        if(els.resultText) {
            els.resultText.innerText = "DERROTA. Te has quedado sin Pokémon.";
            els.resultText.style.color = "#f44336";
        }
    }
    saveStorage();
}