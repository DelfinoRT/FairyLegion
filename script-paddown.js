// --- Map themes and pools ---
const THEMES = [
  { name: "Volcán", class: "theme-volcano", pokemons: [
    { name: "charmander", points: 110 },
    { name: "vulpix", points: 90 },
    { name: "numel", points: 80 },
    { name: "tepig", points: 80 },
    { name: "chimchar", points: 90 },
    { name: "litten", points: 90 },
    { name: "pansear", points: 90 },
    { name: "darumaka", points: 95 },
    { name: "larvesta", points: 110 },
    { name: "fennekin", points: 90 },
    { name: "magmar", points: 140 },
    { name: "slugma", points: 85 }
  ] },
  { name: "Bosque", class: "theme-forest", pokemons: [
    { name: "bulbasaur", points: 100 },
    { name: "pikachu", points: 120 },
    { name: "caterpie", points: 40 },
    { name: "chikorita", points: 90 },
    { name: "treecko", points: 90 },
    { name: "snivy", points: 90 },
    { name: "tangela", points: 60 },
    { name: "shuckle", points: 60 },
    { name: "gloom", points: 95 },
    { name: "butterfree", points: 105 },
    { name: "pinsir", points: 100 },
    { name: "scyther", points: 105 }
  ] },
  { name: "Tundra", class: "theme-tundra", pokemons: [
    { name: "swinub", points: 100 },
    { name: "seel", points: 80 },
    { name: "vanillite", points: 90 },
    { name: "smoochum", points: 90 },
    { name: "eiscue", points: 90 },
    { name: "snover", points: 80 },
    { name: "snorunt", points: 95 },
    { name: "cubchoo", points: 95 },
    { name: "amaura", points: 100 },
    { name: "glalie", points: 135 },
    { name: "glastrier", points: 145 },
    { name: "snom", points: 50 }
  ] }
];

const ITEMS = [
  { name: "pokeball", type: "pokeball", points: 5, icon: "/PADDown/pokeball.png" },
  { name: "greatball", type: "pokeball", points: 10, icon: "/PADDown/greatball.png" },
  { name: "ultraball", type: "pokeball", points: 15, icon: "/PADDown/ultraball.png" },
  { name: "cherishball", type: "pokeball", points: 20, icon: "/PADDown/cherishball.png" },
  { name: "beastball", type: "pokeball", points: 20, icon: "/PADDown/beastball.png" },
  { name: "masterball", type: "pokeball", points: 100, icon: "/PADDown/masterball.png" },
  { name: "coin", type: "item", points: 12, icon: "/PADDown/coin.png" },
  { name: "diamond", type: "item", points: 50, icon: "/PADDown/diamond.png" },
  { name: "pearl", type: "item", points: 40, icon: "/PADDown/pearl.png" },
  { name: "gemstone", type: "gem", points: 34, icon: "/PADDown/gem.png" } // Gemstone item definition
];

// List of unique shiny pokémon
const SHINY_POOL = [
  { name: "shiny-eevee", display: "Shiny Eevee", points: 300, img: "/PADDown/shiny-eevee.png" },
  { name: "shiny-ponyta", display: "Shiny Ponyta", points: 310, img: "/PADDown/shiny-ponyta.png" },
  { name: "shiny-dratini", display: "Shiny Dratini", points: 320, img: "/PADDown/shiny-dratini.png" },
  { name: "shiny-alakazam", display: "Shiny Alakazam", points: 310, img: "/PADDown/shiny-alakazam.png" },
  { name: "shiny-gyarados", display: "Shiny Gyarados", points: 410, img: "/PADDown/shiny-gyarados.png" },
  { name: "shiny-lapras", display: "Shiny Lapras", points: 310, img: "/PADDown/shiny-lapras.png" },
  { name: "shiny-mewtwo", display: "Shiny Mewtwo", points: 610, img: "/PADDown/shiny-mewtwo.png" },
  { name: "shiny-mrmime", display: "Shiny MrMime", points: 320, img: "/PADDown/shiny-mrmime.png" },
  { name: "shiny-charmander", display: "Shiny Charmander", points: 330, img: "/PADDown/shiny-charmander.png" },
  { name: "shiny-onix", display: "Shiny Onix", points: 340, img: "/PADDown/shiny-onix.png" },
  { name: "shiny-nidoqueen", display: "Shiny Nidoqueen", points: 340, img: "/PADDown/shiny-nidoqueen.png" },
  { name: "shiny-magikarp", display: "Shiny Magikarp", points: 350, img: "/PADDown/shiny-magikarp.png" }
];

// Mythic Pokémon Pool
const MYTHIC_POOL = [
  { name: "mew", display: "Mew (Mítico)", points: 800, img: "/PADDown/mew.png" },
  { name: "celebi", display: "Celebi (Mítico)", points: 850, img: "/PADDown/celebi.png" },
  { name: "jirachi", display: "Jirachi (Mítico)", points: 900, img: "/PADDown/jirachi.png" }
];

const SHINY_CHANCE = 0.05;

// --- Game state ---
let currentThemeIndex = 1; 
let score = 0;
let pokemonsCaught = 0;
let pokeballs = 3; 
let masterballs = 0; 
let catchStreak = 0;
let shiniesCaughtCount = 0; 
let regularCaughtCount = 0; 
let maxCatchStreak = 0; // track maximum streak during the round
let roundTimeLeft = 0; 
let totalExtraTimeAdded = 0; // tracks extra seconds added during the round (e.g., mythic bonuses)
let highScore = 0; 
let activeSpawns = [];
let pokemonsCapturedLog = {}; 
let itemsCollectedLog = {}; 
let roundActive = false;
let roundTimer = null;
let autoSpawnInterval = null;
const ROUND_DURATION = 60; 
const AUTO_SPAWN_INTERVAL = 2500; 
const TIME_BONUS_MYTHIC = 15; 
const SHINY_REQUIREMENT = 3;
const REGULAR_REQUIREMENT = 6;
const SHINY_STREAK_REQUIREMENT = 8;
const STREAK_BONUS_THRESHOLD = 5;

// --- Exchange Constants ---
const GEMSTONE_NAME = 'gemstone';
const GEMSTONE_POINTS = ITEMS.find(item => item.name === GEMSTONE_NAME).points; 
const POKEBALLS_GAINED = 2;

// --- Pokédex Tracking State (NEW) ---
// Key: theme name (Volcán, Bosque, Tundra), Value: Set of caught Pokémon names
let mapPokedexCaught = {
    "Volcán": new Set(),
    "Bosque": new Set(),
    "Tundra": new Set()
};

// --- Sound Initialization ---
const shinySound = new Audio('ShinySound.mp3');
shinySound.volume = 0.5;

function playShinySound() {
    shinySound.pause();
    shinySound.currentTime = 0;
    shinySound.play().catch(e => {
        console.log("Audio playback blocked:", e);
    });
}

// --- DOM Elements ---
const gameMap = document.getElementById("game-map");
const changeThemeBtn = document.getElementById("changeThemeBtn");
const currentThemeDisplay = document.getElementById("current-theme");
const pointsDisplay = document.getElementById("points");
const pokemonsCaughtDisplay = document.getElementById("pokemons-caught"); 
const pokeballsDisplay = document.getElementById("pokeballs-count");
const masterballsDisplay = document.getElementById("masterballs-count"); 
const streakDisplay = document.getElementById("catch-streak");
const gameMessagePanel = document.getElementById("game-message-panel"); 
const gameMessageText = document.getElementById("game-message-text"); 
const highScoreDisplay = document.getElementById("high-score-display");
const gemstoneExchangePanel = document.getElementById("gemstone-exchange-panel");
const gemstoneCountDisplay = document.getElementById("gemstone-count");
const exchangeButton = document.getElementById("exchange-btn");
const pokedexTracker = document.getElementById("map-pokedex-tracker"); // NEW
const pokedexProgress = document.getElementById("pokedex-progress"); // NEW

// --- Helper: Random integer ---
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Helper: spawn position inside the visible game map ---
function getSpawnPosition(entityWidth = 40, entityHeight = 40) {
  const mapRect = gameMap.getBoundingClientRect();
  // Use clientWidth/clientHeight to avoid page scroll offsets when placing elements absolutely inside the map
  const mapWidth = gameMap.clientWidth;
  const mapHeight = gameMap.clientHeight;

  // Keep a small padding so elements don't stick to the edge
  const padding = 6;

  const maxX = Math.max(padding, Math.floor(mapWidth - entityWidth - padding));
  const maxY = Math.max(padding, Math.floor(mapHeight - entityHeight - padding));

  const x = randInt(padding, maxX);
  const y = randInt(padding, maxY);
  return { x, y };
}

// --- High Score Persistence ---
function loadHighScore() {
    const storedScore = localStorage.getItem('pokeCatchHighScore');
    if (storedScore) {
        highScore = parseInt(storedScore, 10);
        highScoreDisplay.querySelector('strong').textContent = highScore;
    }
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('pokeCatchHighScore', highScore);
        highScoreDisplay.querySelector('strong').textContent = highScore;
        return true;
    }
    return false;
}

// --- Map Pokédex Rendering (NEW) ---
function renderMapPokedex() {
    const themeData = THEMES[currentThemeIndex];
    const caughtSet = mapPokedexCaught[themeData.name];
    
    pokedexTracker.innerHTML = '';
    let caughtCount = 0;

    themeData.pokemons.forEach(poke => {
        const isCaught = caughtSet.has(poke.name);
        if (isCaught) caughtCount++;

        const entry = document.createElement('div');
        entry.className = `pokedex-entry ${isCaught ? 'caught' : ''}`;
        entry.title = `${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}: ${poke.points} pts`;
        entry.innerHTML = `
            <img src="/PADDown/${poke.name}.png">
            <span class="poke-name">${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</span>
            <span class="poke-points">${poke.points} pts</span>
        `;
        pokedexTracker.appendChild(entry);
    });

    pokedexProgress.textContent = `${caughtCount}/${themeData.pokemons.length}`;
}


// --- Message/Error Panel Function ---
function displayGameMessage(message, type = 'info') {
    gameMessageText.innerHTML = message;
    gameMessagePanel.className = `game-message-panel message-${type}`;
    
    clearTimeout(gameMessagePanel.timer);

    if (type !== 'summary') {
        gameMessagePanel.timer = setTimeout(() => {
            gameMessageText.innerHTML = '¡Encuentra y captura rápidamente!';
            gameMessagePanel.className = 'game-message-panel message-info';
        }, 5000);
    }
}

// --- Gemstone Exchange Logic ---

function updateExchangeDisplay() {
    const gemCount = itemsCollectedLog[GEMSTONE_NAME] ? itemsCollectedLog[GEMSTONE_NAME].count : 0;

    // 1. Update text count
    gemstoneCountDisplay.textContent = gemCount;

    // 2. Update exchange points display
    gemstoneExchangePanel.querySelector('.point-loss-value').textContent = GEMSTONE_POINTS + ' pts';

    // 3. Toggle visibility and button state
    if (gemCount > 0 && roundActive) {
        gemstoneExchangePanel.classList.remove('hidden');
        exchangeButton.disabled = false;
    } else {
        // Only hide if the round is active OR if the count is zero (always hidden post-game/pre-game if empty)
        gemstoneExchangePanel.classList.add('hidden');
        exchangeButton.disabled = true;
    }
}

function exchangeGemstone() {
    if (!roundActive) return;

    const gemLog = itemsCollectedLog[GEMSTONE_NAME];
    if (gemLog && gemLog.count > 0) {
        
        // 1. Deduct Gemstone
        gemLog.count -= 1;
        
        // 2. Deduct points related to the gemstone
        gemLog.totalPoints -= GEMSTONE_POINTS;
        score -= GEMSTONE_POINTS;

        // 3. Grant Pokéballs
        pokeballs += POKEBALLS_GAINED;

        // 4. Update UI
        updateScore();
        updateItemsLogDisplay();
        updateExchangeDisplay();

        displayGameMessage(`¡Intercambio exitoso! Perdiste ${GEMSTONE_POINTS} pts, ganaste ${POKEBALLS_GAINED} Pokéballs.`, 'success');

    } else {
        displayGameMessage("Error: No tienes gemas para intercambiar.", 'error');
    }
}

// Attach event listener for the exchange button
exchangeButton.addEventListener('click', exchangeGemstone);

// --- Score Popup functionality ---
function showScorePopup(points, x, y, isShiny = false, isMythic = false) {
  const popup = document.createElement("div");
  
  if (isMythic) {
      popup.className = 'score-popup mythic-popup';
      popup.textContent = `¡MÍTICO! +${points}`;
  } else {
      popup.className = `score-popup ${isShiny ? 'shiny-popup' : ''}`;
      popup.textContent = `+${points}`;
  }
  
  popup.style.left = `${x}px`;
  popup.style.top = `${y - 25}px`;
  
  gameMap.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 900);
}

// --- Log Display functionality ---
function updateCapturedLogDisplay() {
  const logList = document.getElementById("captured-log-list");
  logList.innerHTML = '';
  let hasCatches = false;
  let totalPokemonsCaught = 0;

  const sortedPokemons = Object.entries(pokemonsCapturedLog).sort(([, a], [, b]) => b.totalPoints - a.totalPoints);

  for (const [name, log] of sortedPokemons) {
    hasCatches = true;
    totalPokemonsCaught += log.count;
    
    let imgSource, formattedName;
    const isShiny = name.startsWith('shiny-');
    const isMythic = MYTHIC_POOL.some(m => m.name === name);

    if (isMythic) {
        const mythicData = MYTHIC_POOL.find(m => m.name === name);
        imgSource = mythicData ? mythicData.img : '';
        formattedName = mythicData ? mythicData.display : name;
    } else if (isShiny) {
        const shinyData = SHINY_POOL.find(s => s.name === name);
        imgSource = shinyData ? shinyData.img : '';
        formattedName = shinyData ? shinyData.display : name;
    } else {
        imgSource = `/PADDown/${name}.png`;
        formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    const listItem = document.createElement("div");
    listItem.className = "log-item pokemon-log";
    listItem.innerHTML = `
      <span class="log-left">
        <img src="${imgSource}" width="24" height="24" class="log-sprite ${isShiny ? 'shiny-sprite' : (isMythic ? 'mythic-sprite' : '')}">
        ${formattedName} x${log.count}
      </span>
      <span class="log-points">${log.totalPoints} puntos</span>
    `;
    logList.appendChild(listItem);
  }

  pokemonsCaughtDisplay.textContent = totalPokemonsCaught;

  if (!hasCatches) {
    logList.innerHTML = '<p class="no-catches">¡Aún no has capturado ningún Pokémon en esta ronda!</p>';
  }
}

// --- Item Log Display functionality ---
function updateItemsLogDisplay() {
  const logList = document.getElementById("item-log-list");
  logList.innerHTML = '';
  let hasCatches = false;

  const sortedItems = Object.entries(itemsCollectedLog).sort(([nameA], [nameB]) => {
      const itemA = ITEMS.find(i => i.name === nameA);
      const itemB = ITEMS.find(i => i.name === nameB);
      return (itemB ? itemB.points : 0) - (itemA ? itemA.points : 0);
  });
  
  for (const [name, log] of sortedItems) {
    // Only display if count > 0
    if (log.count <= 0) continue; 
    
    hasCatches = true;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const listItem = document.createElement("div");
    listItem.className = "log-item item-log";
    listItem.innerHTML = `
      <span class="log-left">
        <img src="${log.icon}" width="20" height="20" class="log-sprite">
        ${formattedName} x${log.count}
      </span>
      <span class="log-points item-points">${log.totalPoints} pts</span>
    `;
    logList.appendChild(listItem);
  }

  if (!hasCatches) {
    logList.innerHTML = '<p class="no-catches">Recolecta ítems para verlos aquí.</p>';
  }
  
  updateExchangeDisplay(); // Refresh exchange panel visibility/count
}

// --- Game Logic Functions ---

function changeTheme() {
  // Prevent changing the map while a round is active
  if (roundActive) {
    displayGameMessage("No puedes cambiar el mapa durante una ronda activa.", 'alert');
    return;
  }

  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  const themeData = THEMES[currentThemeIndex];
  gameMap.className = themeData.class;
  currentThemeDisplay.textContent = themeData.name;
  clearEntities();

  renderMapPokedex(); // NEW: Update Pokedex when theme changes
}
changeThemeBtn.addEventListener("click", changeTheme);

function updateScore() {
  pointsDisplay.textContent = score;
  pokeballsDisplay.textContent = pokeballs;
  masterballsDisplay.textContent = masterballs; 
  streakDisplay.textContent = catchStreak;
  
  // Visual emphasis for high streak
  if (catchStreak >= STREAK_BONUS_THRESHOLD) {
      streakDisplay.parentElement.classList.add('active');
  } else {
      streakDisplay.parentElement.classList.remove('active');
  }
}

// --- Helper: center the game map in the viewport ---
function centerMapInView(smooth = true) {
  if (!gameMap) return;
  // Prefer modern scrollIntoView with options; fallback to simple scroll if unavailable
  try {
    gameMap.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center', inline: 'nearest' });
  } catch (e) {
    // Older browsers fallback: compute a scroll position that centers the map vertically
    const rect = gameMap.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    const scrollToY = Math.max(0, absoluteTop - (window.innerHeight / 2) + (rect.height / 2));
    window.scrollTo({ top: scrollToY, behavior: smooth ? 'smooth' : 'auto' });
  }
}

// --- History UI functions ---
function formatTimestamp(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) { return iso; }
}

function renderHistory() {
  const container = document.getElementById('history-list');
  if (!container) return;
  const key = 'pokeCatchHistory';
  let history = [];
  try { history = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { history = []; }

  container.innerHTML = '';
  if (!history || history.length === 0) {
    container.innerHTML = '<p class="no-catches">No hay historial de partidas aún.</p>';
    return;
  }

  history.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'history-card';

    const title = document.createElement('h4');
    title.textContent = `${entry.theme} — ${formatTimestamp(entry.timestamp)}`;
    card.appendChild(title);

    const row1 = document.createElement('div'); row1.className='history-row';
    row1.innerHTML = `<span class="history-label">Pokémon (normales):</span><span>${entry.regularCount}</span>`;
    card.appendChild(row1);

    const row2 = document.createElement('div'); row2.className='history-row';
    const mythicCount = (entry.mythics || []).reduce((s,i)=>s+i.count,0);
    row2.innerHTML = `<span class="history-label">Míticos:</span><span>${mythicCount}</span>`;
    card.appendChild(row2);

    if (entry.mythics && entry.mythics.length) {
      const srow = document.createElement('div'); srow.className='history-row';
      const label = document.createElement('span'); label.className='history-label'; label.textContent='Míticos (sprites):';
      const box = document.createElement('span'); box.className='history-sprites';
      entry.mythics.forEach(m => {
        const img = document.createElement('img'); img.src = m.img || ('PADDown/'+m.name+'.png'); img.title = `${m.name} x${m.count}`;
        box.appendChild(img);
      });
      srow.appendChild(label); srow.appendChild(box);
      card.appendChild(srow);
    }

    const row3 = document.createElement('div'); row3.className='history-row';
    const shinyCount = (entry.shinies || []).reduce((s,i)=>s+i.count,0);
    row3.innerHTML = `<span class="history-label">Shinies:</span><span>${shinyCount}</span>`;
    card.appendChild(row3);

    if (entry.shinies && entry.shinies.length) {
      const srow = document.createElement('div'); srow.className='history-row';
      const label = document.createElement('span'); label.className='history-label'; label.textContent='Shinies (sprites):';
      const box = document.createElement('span'); box.className='history-sprites';
      entry.shinies.forEach(m => {
        const img = document.createElement('img'); img.src = m.img || ('PADDown/'+m.name+'.png'); img.title = `${m.name} x${m.count}`;
        box.appendChild(img);
      });
      srow.appendChild(label); srow.appendChild(box);
      card.appendChild(srow);
    }

    const rowItems = document.createElement('div'); rowItems.className='history-row';
    const itemsCount = Object.values(entry.items || {}).reduce((s,i)=>s + (i.count||0), 0);
    rowItems.innerHTML = `<span class="history-label">Ítems recolectados:</span><span>${itemsCount}</span>`;
    card.appendChild(rowItems);

    const rowPoints = document.createElement('div'); rowPoints.className='history-row';
    rowPoints.innerHTML = `<span class="history-label">Puntos totales:</span><span><strong>${entry.totalPoints}</strong></span>`;
    card.appendChild(rowPoints);

    const rowTime = document.createElement('div'); rowTime.className='history-row';
    rowTime.innerHTML = `<span class="history-label">Tiempo (s):</span><span>${entry.totalTimeSeconds}</span>`;
    card.appendChild(rowTime);

    const rowPoke = document.createElement('div'); rowPoke.className='history-row';
    rowPoke.innerHTML = `<span class="history-label">Pokédex map:</span><span>${entry.pokedexProgress}</span>`;
    card.appendChild(rowPoke);

    const rowMore = document.createElement('div'); rowMore.className='history-row';
    rowMore.innerHTML = `<span class="history-label">Racha final:</span><span>${entry.finalStreak}</span>`;
    card.appendChild(rowMore);

    // Max streak
    const rowMax = document.createElement('div'); rowMax.className='history-row';
    rowMax.innerHTML = `<span class="history-label">Máx. racha:</span><span>${entry.maxStreak || 0}</span>`;
    card.appendChild(rowMax);

    container.appendChild(card);
  });
}

function clearHistory() {
  localStorage.removeItem('pokeCatchHistory');
  renderHistory();
}

function clearEntities() {
  activeSpawns.forEach(e => {
    if (e.timer) clearInterval(e.timer);
    e.el.remove();
  });
  activeSpawns = [];
}

/** * Spawns a Mythic Pokémon if conditions are met. */
function spawnOneMythic(poke) {
    const el = document.createElement("div");
    el.className = "spawn-entity pokemon mythic"; 

    const countdownTime = 5; 
    let timeLeft = countdownTime;

    // compute position so the mythic stays inside the map
    const pos = getSpawnPosition(38, 38);
    const xPos = pos.x;
    const yPos = pos.y;

    el.innerHTML = `
      <img src="${poke.img}" width="38" height="38">
      <span class="mythic-aura">✨</span>
      <span class="countdown-timer">${timeLeft}</span>
    `;
    el.title = poke.display + " (¡Masterball requerida!)";
    el.style.top = yPos + "px";
    el.style.left = xPos + "px";
    gameMap.appendChild(el);

    const timerSpan = el.querySelector('.countdown-timer');

    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            removeEntity(entityData);
            catchStreak = 0; 
            updateScore();
            displayGameMessage(`¡El ${poke.display} escapó!`, 'error'); 
        }
    }, 1000);

    el.addEventListener("click", function() {
        if (masterballs <= 0) {
            displayGameMessage("¡Necesitas una Masterball para capturar a un Pokémon Mítico!", 'error'); 
            return;
        }

        // Catch successful!
        masterballs -= 1;
        score += poke.points;
        pokemonsCaught += 1;
        
        // Extend game time
           roundTimeLeft += TIME_BONUS_MYTHIC;
           totalExtraTimeAdded += TIME_BONUS_MYTHIC;
        if (roundActive && roundTimer) {
             spawnBtn.textContent = `¡Ronda activa! (${roundTimeLeft}s)`;
        }

        // Update Log
        const pokeKey = poke.name;
        if (!pokemonsCapturedLog[pokeKey]) {
          pokemonsCapturedLog[pokeKey] = { count: 0, totalPoints: 0 };
        }
        pokemonsCapturedLog[pokeKey].count += 1;
        pokemonsCapturedLog[pokeKey].totalPoints += poke.points;

        // Reset Mythic conditions
        shiniesCaughtCount = 0;
        regularCaughtCount = 0;
        catchStreak += 1;

        showScorePopup(poke.points, xPos, yPos, false, true); 
        displayGameMessage(`¡Mítico capturado! ${poke.display} fue añadido al registro. (+${TIME_BONUS_MYTHIC}s)`, 'success'); 
        updateCapturedLogDisplay();
        updateScore();
        removeEntity(entityData);
    });

    const entityData = { el, type: "mythic", timer: countdownInterval };
    activeSpawns.push(entityData);
}

/**
 * Checks if Mythic spawn conditions are met and spawns one if so.
 */
function checkAndSpawnMythic() {
    if (masterballs > 0 && 
        shiniesCaughtCount >= SHINY_REQUIREMENT && 
        regularCaughtCount >= REGULAR_REQUIREMENT) {
            
        // Reset counters immediately to prevent double spawn
        shiniesCaughtCount = 0;
        regularCaughtCount = 0;
        
        const mythic = MYTHIC_POOL[randInt(0, MYTHIC_POOL.length - 1)];
        spawnOneMythic(mythic);
        displayGameMessage(`¡Un Pokémon Mítico ha aparecido! ¡Usa tu Masterball!`, 'alert'); 
        return true;
    }
    return false;
}

function spawnEntities() {
  // Spawn 1-2 entities each time
  const count = randInt(1, 2);
  
  for (let i = 0; i < count; i++) {
    // 40% chance for pokémon, 60% for items
    if (Math.random() < 0.4) {
      // Check if shiny streak is met
      const forceShiny = catchStreak >= SHINY_STREAK_REQUIREMENT;

      const themePokemons = THEMES[currentThemeIndex].pokemons;
      
      // Spawn logic: force shiny if condition met, otherwise check random chance
      if (forceShiny || Math.random() < SHINY_CHANCE) {
        if (forceShiny) {
            displayGameMessage(`¡Racha de 8! ¡Apareció un Shiny garantizado!`, 'alert');
        }
        spawnOneShiny();
      } else {
        spawnOnePokemon(themePokemons[randInt(0, themePokemons.length-1)]);
      }
    } else {
      spawnOneItem(ITEMS[randInt(0, ITEMS.length-1)]);
    }
  }
}

function handleCatch(entity, poke, xPos, yPos, isShiny = false) {
    if (entity.type === "mythic") {
        return; 
    }
    
    // Check if the player is trying to use a Masterball on a regular/shiny Pokémon (now always regular Pokeballs)
    if (pokeballs <= 0) {
      displayGameMessage("¡No tienes Pokéballs! Recoge más para atrapar Pokémon.", 'error'); 
      return;
    }

    let pointsGained = poke.points;
    
    // Streak Bonus
    if (catchStreak > 0) {
        const streakBonus = Math.floor(catchStreak / 5) * 5; 
        pointsGained += streakBonus;
        if (streakBonus > 0) {
             displayGameMessage(`¡Racha de ${catchStreak}! +${streakBonus} pts de bonus.`, 'bonus');
        }
    }

    // Update Game State
    pokeballs -= 1;
    score += pointsGained;
    pokemonsCaught += 1;

    // Update Mythic trackers
    if (isShiny) {
        shiniesCaughtCount += 1;
    } else {
        regularCaughtCount += 1;
        // NEW: Update Map Pokedex (only for regular Pokemon, shinies are global bonus)
        mapPokedexCaught[THEMES[currentThemeIndex].name].add(poke.name);
        renderMapPokedex();
    }

    // Update streak: Reset streak if shiny was caught after guarantee. Otherwise, increment.
    if (isShiny && catchStreak >= SHINY_STREAK_REQUIREMENT) {
        catchStreak = 0;
    } else {
      catchStreak += 1; 
    }

    // Update maximum streak seen during this round
    if (catchStreak > maxCatchStreak) {
      maxCatchStreak = catchStreak;
    }
    
    // Update Log
    const pokeKey = poke.name;
    if (!pokemonsCapturedLog[pokeKey]) {
      pokemonsCapturedLog[pokeKey] = { count: 0, totalPoints: 0 };
    }
    pokemonsCapturedLog[pokeKey].count += 1;
    pokemonsCapturedLog[pokeKey].totalPoints += pointsGained;

    // Check for Mythic spawn
    checkAndSpawnMythic(); 

    // Update UI
    showScorePopup(pointsGained, xPos, yPos, isShiny, false);
    updateCapturedLogDisplay();
    updateScore();
    removeEntity(entity);
}

function spawnOnePokemon(poke) {
  const el = document.createElement("div");
  el.className = "spawn-entity pokemon";
  
  const countdownTime = randInt(3, 7);
  let timeLeft = countdownTime;

  const pos = getSpawnPosition(38, 38);
  const xPos = pos.x;
  const yPos = pos.y;
  
  el.innerHTML = `
    <img src="/PADDown/${poke.name}.png" width="38" height="38">
    <span class="countdown-timer">${timeLeft}</span>
  `;
  el.title = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
  el.style.top = yPos + "px";
  el.style.left = xPos + "px";
  gameMap.appendChild(el);

  const timerSpan = el.querySelector('.countdown-timer');
  
  const countdownInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      removeEntity(entityData);
      catchStreak = 0;
      updateScore();
      displayGameMessage(`¡${poke.name.toUpperCase()} se fue! Racha perdida.`, 'error');
    }
  }, 1000);

  el.addEventListener("click", function() {
    handleCatch(entityData, poke, xPos, yPos, false);
  });

  const entityData = { el, type: "pokemon", timer: countdownInterval };
  activeSpawns.push(entityData);
}

// Spawn a shiny from the pool
function spawnOneShiny() {
  const shiny = SHINY_POOL[randInt(0, SHINY_POOL.length-1)];
  const el = document.createElement("div");
  el.className = "spawn-entity pokemon shiny";
  
  const countdownTime = randInt(3, 7);
  let timeLeft = countdownTime;

  const pos = getSpawnPosition(38, 38);
  const xPos = pos.x;
  const yPos = pos.y;
  
  el.innerHTML = `
    <img src="${shiny.img}" width="38" height="38">
    <span class="shiny-star">★</span>
    <span class="countdown-timer">${timeLeft}</span>
  `;
  el.title = shiny.display + " (Shiny! Puntos altos)";
  el.style.top = yPos + "px";
  el.style.left = xPos + "px";
  gameMap.appendChild(el);

  // Play the shiny sound effect
  playShinySound();

  const timerSpan = el.querySelector('.countdown-timer');
  
  const countdownInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      removeEntity(entityData);
      catchStreak = 0;
      updateScore();
      displayGameMessage(`¡${shiny.display.toUpperCase()} se fue! Racha perdida.`, 'error');
    }
  }, 1000);

  el.addEventListener("click", function() {
    handleCatch(entityData, shiny, xPos, yPos, true);
  });

  const entityData = { el, type: "shiny", timer: countdownInterval };
  activeSpawns.push(entityData);
}

function spawnOneItem(item) {
  const el = document.createElement("div");
  el.className = "spawn-entity " + (item.type);
  
  const countdownTime = randInt(3, 7);
  let timeLeft = countdownTime;

  // items are slightly smaller
  const pos = getSpawnPosition(30, 30);
  const xPos = pos.x;
  const yPos = pos.y;
  
  el.innerHTML = `
    <img src="${item.icon}" width="27" height="27">
    <span class="countdown-timer">${timeLeft}</span>
  `;
  el.title = item.name.charAt(0).toUpperCase()+item.name.slice(1);
  el.style.top = yPos + "px";
  el.style.left = xPos + "px";
  gameMap.appendChild(el);

  const timerSpan = el.querySelector('.countdown-timer');
  
  const countdownInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      removeEntity(entityData);
      catchStreak = 0;
      updateScore();
      displayGameMessage(`¡${item.name.toUpperCase()} desapareció! Racha perdida.`, 'error');
    }
  }, 1000);

  el.addEventListener("click", function() {
    let pointsGained = item.points;

    // Apply Streak Bonus to item points
    if (catchStreak > 0) {
        const streakBonus = Math.floor(catchStreak / 5) * 5; 
        pointsGained += streakBonus;
        if (streakBonus > 0) {
             displayGameMessage(`¡Racha de ${catchStreak}! +${streakBonus} pts de bonus.`, 'bonus');
        }
    }
    
    // If it's a pokéball item, add to inventory. Masterballs are separate.
    if (item.name === "masterball") {
        masterballs += 1;
    } else if (item.type === "pokeball") {
      pokeballs += 1;
    }
    
    score += pointsGained;
    catchStreak += 1;
    
    // LOGIC: Update item log
    const itemKey = item.name; 
    if (!itemsCollectedLog[itemKey]) {
      // Use existing item definition points for initial total points calculation
      const itemDefinition = ITEMS.find(i => i.name === itemKey);
      itemsCollectedLog[itemKey] = { count: 0, totalPoints: 0, icon: item.icon, basePoints: itemDefinition.points };
    }
    itemsCollectedLog[itemKey].count += 1;
    itemsCollectedLog[itemKey].totalPoints += pointsGained;
    updateItemsLogDisplay(); // Calls updateExchangeDisplay internally
    // END LOGIC
    
    showScorePopup(pointsGained, xPos, yPos);
    updateScore();
    removeEntity(entityData);
  });

  const entityData = { el, type: item.type, timer: countdownInterval };
  activeSpawns.push(entityData);
}

function removeEntity(entityData) {
  if (entityData.timer) clearInterval(entityData.timer);
  entityData.el.remove();
  activeSpawns = activeSpawns.filter(e => e !== entityData);
}

function startRound() {
  roundActive = true;
  score = 0;
  pokemonsCaught = 0;
  pokeballs = 3; 
  masterballs = 0; 
  catchStreak = 0;
  maxCatchStreak = 0;
  totalExtraTimeAdded = 0;
  shiniesCaughtCount = 0; 
  regularCaughtCount = 0; 
  // RESET LOGS AND DISPLAYS ONLY AT START
  pokemonsCapturedLog = {}; 
  itemsCollectedLog = {}; 
  // Reset Pokedex for the current map
  mapPokedexCaught[THEMES[currentThemeIndex].name].clear();
  
  updateCapturedLogDisplay(); 
  updateItemsLogDisplay(); 
  renderMapPokedex(); // NEW: Initial render of Pokedex
  
  updateScore();
  displayGameMessage("¡Ronda iniciada! ¡A capturar Pokémon!", 'start'); 
  roundTimeLeft = ROUND_DURATION; 
  spawnBtn.disabled = true;
  spawnBtn.textContent = `¡Ronda activa! (${roundTimeLeft}s)`;
  // Disable map/theme changes while the round is active
  if (changeThemeBtn) {
    changeThemeBtn.disabled = true;
  }
  // Center the map in the user's viewport so they see it fully when the round begins
  centerMapInView(true);

  // Auto-spawn entities continuously
  autoSpawnInterval = setInterval(() => {
    spawnEntities();
  }, AUTO_SPAWN_INTERVAL);

  // Initial spawn
  spawnEntities();

  roundTimer = setInterval(() => {
    roundTimeLeft--;
    spawnBtn.textContent = `¡Ronda activa! (${roundTimeLeft}s)`;
    if (roundTimeLeft <= 0) endRound();
  }, 1000);
}

function endRound() {
  roundActive = false;
  clearInterval(roundTimer);
  clearInterval(autoSpawnInterval);
  spawnBtn.disabled = false;
  spawnBtn.textContent = "Iniciar Ronda";
  clearEntities();
  
  // Save High Score
  const newHighScore = saveHighScore();
  
  // Summary Message Logic (Logs remain visible)
  let summaryMessage = `
    <h4 style="color: #ffda79;">¡Ronda finalizada!</h4>
    <p>Puntaje total: <strong>${score}</strong></p>
    <p>Pokémon atrapados: <strong>${pokemonsCaught}</strong></p>
    <p>Racha final/máxima: <strong>${catchStreak}</strong></p>
  `;
  if (newHighScore) {
    summaryMessage += `<p style="color: gold; font-weight: bold;">¡NUEVO PUNTAJE MÁXIMO!</p>`;
  } else {
     summaryMessage += `<p>Máximo Puntaje: <strong>${highScore}</strong></p>`;
  }
  summaryMessage += `<p>¡Vuelve a jugar para superar tu puntaje!</p>`;
  
  displayGameMessage(summaryMessage, 'summary'); 
  
  // Logs maintain their final state until startRound() is called again.
  updateExchangeDisplay(); // Hide exchange button if round ends
  // Re-enable map/theme changes when the round ends
  if (changeThemeBtn) {
    changeThemeBtn.disabled = false;
  }

  // --- Record this round into history (localStorage) ---
  try {
    const themeName = THEMES[currentThemeIndex].name;
    const timestamp = new Date().toISOString();

    // compute counts: regular, mythic, shiny
    let regularCount = 0;
    const mythicMap = {};
    const shinyMap = {};

    for (const [key, log] of Object.entries(pokemonsCapturedLog)) {
      const count = log.count || 0;
      const isShiny = key.startsWith('shiny-');
      const isMythic = MYTHIC_POOL.some(m => m.name === key);
      if (isShiny) {
        shinyMap[key] = { name: key, count: count, img: (SHINY_POOL.find(s => s.name === key) || {}).img };
      } else if (isMythic) {
        mythicMap[key] = { name: key, count: count, img: (MYTHIC_POOL.find(m => m.name === key) || {}).img };
      } else {
        regularCount += count;
      }
    }

    // items collected summary
    const itemsSummary = {};
    for (const [iname, ilog] of Object.entries(itemsCollectedLog)) {
      itemsSummary[iname] = { count: ilog.count || 0, totalPoints: ilog.totalPoints || 0 };
    }

    const pokedexProg = (mapPokedexCaught[themeName] ? mapPokedexCaught[themeName].size : 0) + '/' + THEMES[currentThemeIndex].pokemons.length;

    // total time = initial round duration + any added time bonuses - time left
    const totalTime = (ROUND_DURATION + (totalExtraTimeAdded || 0)) - roundTimeLeft; // seconds elapsed

    const historyEntry = {
      theme: themeName,
      timestamp,
      regularCount,
      mythics: Object.values(mythicMap),
      shinies: Object.values(shinyMap),
      items: itemsSummary,
      totalPoints: score,
      totalTimeSeconds: totalTime,
      pokedexProgress: pokedexProg,
      maxStreak: maxCatchStreak,
      finalStreak: catchStreak,
      remainingPokeballs: pokeballs
    };

    // Save to localStorage (keep last 6)
    const key = 'pokeCatchHistory';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift(historyEntry);
    const sliced = existing.slice(0, 6);
    localStorage.setItem(key, JSON.stringify(sliced));
    // Update UI history
    renderHistory();
  } catch (e) {
    console.error('Error saving round history', e);
  }
}

spawnBtn.addEventListener("click", function() {
  if (!roundActive) {
    clearEntities();
    startRound();
  }
});

window.onload = function() {
  // Load high score on page load
  loadHighScore();
  
  gameMap.className = THEMES[currentThemeIndex].class;
  currentThemeDisplay.textContent = THEMES[currentThemeIndex].name;
  
  // Initialize mapPokedexCaught from scratch with all themes set to empty Set
  THEMES.forEach(theme => {
      mapPokedexCaught[theme.name] = new Set();
  });
  
  updateScore();
  updateCapturedLogDisplay(); 
  updateItemsLogDisplay(); 
  renderMapPokedex(); // NEW: Initial render
  // Render history and wire clear button
  renderHistory();
  const clearBtn = document.getElementById('clear-history-btn');
  if (clearBtn) clearBtn.addEventListener('click', function() { if (confirm('Borrar historial de partidas?')) clearHistory(); });
};