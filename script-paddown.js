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
  { name: "gemstone", type: "gem", points: 34, icon: "/PADDown/gem.png" }
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

// NEW: Mythic Pokémon Pool
const MYTHIC_POOL = [
  { name: "mew", display: "Mew (Mítico)", points: 800, img: "/PADDown/mew.png" },
  { name: "celebi", display: "Celebi (Mítico)", points: 850, img: "/PADDown/celebi.png" },
  { name: "jirachi", display: "Jirachi (Mítico)", points: 900, img: "/PADDown/jirachi.png" }
];

const SHINY_CHANCE = 0.05; // 5% chance a spawn is shiny (from pool)

// --- Game state ---
let currentThemeIndex = 1; 
let score = 0;
let pokemonsCaught = 0;
let pokeballs = 3; 
let masterballs = 0; 
let catchStreak = 0;
let shiniesCaughtCount = 0; 
let regularCaughtCount = 0; 
let roundTimeLeft = 0; 
let activeSpawns = [];
let pokemonsCapturedLog = {}; 
let itemsCollectedLog = {}; 
let roundActive = false;
let roundTimer = null;
let autoSpawnInterval = null;
const ROUND_DURATION = 45; 
const AUTO_SPAWN_INTERVAL = 2500; 
const TIME_BONUS_MYTHIC = 15; 
const SHINY_REQUIREMENT = 3;
const REGULAR_REQUIREMENT = 6;

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

// --- Helper: Random integer ---
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Message/Error Panel Function (FIXED) ---
function displayGameMessage(message, type = 'info') {
    gameMessageText.innerHTML = message;
    gameMessagePanel.className = `game-message-panel message-${type}`;
    
    // Clear any existing timeout before setting a new one
    clearTimeout(gameMessagePanel.timer);

    // FIX: Only set the timeout to clear the message if it's NOT the summary
    if (type !== 'summary') {
        gameMessagePanel.timer = setTimeout(() => {
            gameMessageText.innerHTML = '¡Encuentra y captura rápidamente!';
            gameMessagePanel.className = 'game-message-panel message-info';
        }, 5000);
    }
}

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
}

// --- Game Logic Functions ---

function changeTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  const themeData = THEMES[currentThemeIndex];
  gameMap.className = themeData.class;
  currentThemeDisplay.textContent = themeData.name;
  clearEntities();
}
changeThemeBtn.addEventListener("click", changeTheme);

function updateScore() {
  pointsDisplay.textContent = score;
  pokeballsDisplay.textContent = pokeballs;
  masterballsDisplay.textContent = masterballs; 
  streakDisplay.textContent = catchStreak;
}

function clearEntities() {
  activeSpawns.forEach(e => {
    if (e.timer) clearInterval(e.timer);
    e.el.remove();
  });
  activeSpawns = [];
}

/** * Spawns a Mythic Pokémon if conditions are met.
 * Only called internally by checkAndSpawnMythic().
 */
function spawnOneMythic(poke) {
    const el = document.createElement("div");
    el.className = "spawn-entity pokemon mythic"; // Added mythic class

    const countdownTime = 5; 
    let timeLeft = countdownTime;

    const xPos = randInt(25, 490);
    const yPos = randInt(10, 220);

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
      const themePokemons = THEMES[currentThemeIndex].pokemons;
      // Decide if this spawn is a shiny (from pool) or a regular theme poke
      if (Math.random() < SHINY_CHANCE) {
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
    }

    catchStreak += 1; 

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

  const xPos = randInt(25, 490); 
  const yPos = randInt(10, 220); 
  
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

  const xPos = randInt(25, 490); 
  const yPos = randInt(10, 220); 
  
  el.innerHTML = `
    <img src="${shiny.img}" width="38" height="38">
    <span class="shiny-star">★</span>
    <span class="countdown-timer">${timeLeft}</span>
  `;
  el.title = shiny.display + " (Shiny! Puntos altos)";
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

  const xPos = randInt(35, 520); 
  const yPos = randInt(20, 250); 
  
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
      itemsCollectedLog[itemKey] = { count: 0, totalPoints: 0, icon: item.icon };
    }
    itemsCollectedLog[itemKey].count += 1;
    itemsCollectedLog[itemKey].totalPoints += pointsGained;
    updateItemsLogDisplay();
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
  shiniesCaughtCount = 0; 
  regularCaughtCount = 0; 
  // RESET LOGS AND DISPLAYS ONLY AT START
  pokemonsCapturedLog = {}; 
  itemsCollectedLog = {}; 
  updateCapturedLogDisplay(); 
  updateItemsLogDisplay(); 
  
  updateScore();
  displayGameMessage("¡Ronda iniciada! ¡A capturar Pokémon!", 'start'); 
  roundTimeLeft = ROUND_DURATION; 
  spawnBtn.disabled = true;
  spawnBtn.textContent = `¡Ronda activa! (${roundTimeLeft}s)`;

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
  spawnBtn.textContent = "¡Spawnea Pokémons e ítems!";
  clearEntities();
  
  // Summary Message Logic (Logs remain visible)
  const summaryMessage = `
    <h4 style="color: #ffda79;">¡Ronda finalizada!</h4>
    <p>Puntaje total: <strong>${score}</strong></p>
    <p>Pokémon atrapados: <strong>${pokemonsCaught}</strong></p>
    <p>Racha final/máxima: <strong>${catchStreak}</strong></p>
    <p>¡Vuelve a jugar para superar tu puntaje!</p>
  `;
  displayGameMessage(summaryMessage, 'summary'); 
  
  // Logs maintain their final state until startRound() is called again.
}

spawnBtn.addEventListener("click", function() {
  if (!roundActive) {
    clearEntities();
    startRound();
  }
});

window.onload = function() {
  gameMap.className = THEMES[currentThemeIndex].class;
  currentThemeDisplay.textContent = THEMES[currentThemeIndex].name;
  updateScore();
  updateCapturedLogDisplay(); 
  updateItemsLogDisplay(); 
};