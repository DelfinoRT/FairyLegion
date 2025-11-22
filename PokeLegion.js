// Simple PokeLegion game logic: profile creation, layout updates and arrow-key movement
(function(){
	const STORAGE_KEY = 'pokel_legion_player_v1';

	let player = null;

	// DOM
	const profileModal = document.getElementById('profileModal');
	const createBtn = document.getElementById('createBtn');
	const avatarChoices = document.getElementById('avatarChoices');
	const starterChoices = document.getElementById('starterChoices');
	const playerNameInput = document.getElementById('playerName');
	const avatarPreview = document.getElementById('avatarPreview');
	const editProfileBtn = document.getElementById('editProfile');
	const cancelBtn = document.getElementById('cancelBtn');
	const modalClose = document.getElementById('modalClose');
 	const gameRoot = document.getElementById('gameRoot');
 	const mapOverlay = document.getElementById('mapOverlay');
 	const mapGridEl = document.getElementById('mapGrid');
 	const playerEl = document.getElementById('player');
	const leftPanel = document.getElementById('leftPanel');
	const profileSummary = document.getElementById('profileSummary');
	const inventorySummary = document.getElementById('inventorySummary');
	const inventoryGridEl = document.getElementById('inventoryGrid');
	const moneyPouchEl = document.getElementById('moneyPouch');
	const moneyAmountEl = document.getElementById('moneyAmount');
	const gemsAmountEl = document.getElementById('gemsAmount');
	const heldItemsEl = document.getElementById('heldItems');
	const openBackpackBtn = document.getElementById('openBackpack');
	const tasksListEl = document.getElementById('tasksList');
	const partyList = document.getElementById('partyList');
	const encounterLog = document.getElementById('encounterLog');

	// ensure a Clear Log control exists and wire it up
	(function ensureClearLogButton(){
		try{
			if(!encounterLog) return;
			// search for an existing clear control near the log
			let clearBtn = document.getElementById('clearLogBtn');
			if(!clearBtn){
				// create a small button and place it before the log container
				clearBtn = document.createElement('button');
				clearBtn.id = 'clearLogBtn';
				clearBtn.className = 'btn secondary clear-log-btn';
				clearBtn.textContent = 'Clear Log';
				clearBtn.style.marginBottom = '8px';
				encounterLog.parentNode && encounterLog.parentNode.insertBefore(clearBtn, encounterLog);
			}
			clearBtn.addEventListener('click', ()=>{
				showConfirm('Clear the encounter log? This action cannot be undone.', ()=>{
					if(!player) player = {};
					player.log = [];
					renderLog();
					savePlayer();
					showMessage('Log cleared.', 'info', 2000);
				}, ()=>{});
			});
		}catch(e){ console.warn('ensureClearLogButton failed', e); }
	})();
	// Add a Nurse Joey button to heal the party over time (bottom of left panel)
	(function ensureNurseJoeyButton(){
		try{
			if(!leftPanel) return;
			if(document.getElementById('nurseJoeyBtn')) return;
			const wrap = document.createElement('div'); wrap.style.marginTop = '12px'; wrap.style.display = 'flex'; wrap.style.justifyContent = 'center';
			const btn = document.createElement('button'); btn.id = 'nurseJoeyBtn'; btn.className = 'btn'; btn.textContent = 'Nurse Joey'; btn.style.marginBottom = '8px';
			btn.title = 'Heal party over time (10 levels/sec)';
			btn.addEventListener('click', ()=>{
				const party = Array.isArray(player && player.party) ? player.party : [];
				if(!party || party.length === 0){ showMessage('No Pokémon in party to heal.', 'warn'); return; }
				const totalLevels = party.reduce((s,p)=> s + (Number(p && p.level) || 1), 0);
				const seconds = Math.ceil(Math.max(0, totalLevels) / 10) || 1; // base rate: 10 levels/sec
				// Custom confirm overlay using 'Cancel' and 'Proceed' labels
				try{
					const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.zIndex=11000; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center';
					const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='14px'; box.style.borderRadius='10px'; box.style.minWidth='340px'; box.style.boxShadow='0 8px 20px rgba(0,0,0,0.25)';
					const msg = document.createElement('div'); msg.style.marginBottom='12px'; msg.textContent = `Nurse Joey will heal your party to full HP over ${seconds} seconds (total levels: ${totalLevels}).`;
					const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='flex-end'; row.style.gap='8px';
					const cancelBtn = document.createElement('button'); cancelBtn.className = 'btn secondary'; cancelBtn.textContent = 'Cancel'; cancelBtn.style.padding='6px 10px';
					const proceedBtn = document.createElement('button'); proceedBtn.className = 'btn'; proceedBtn.textContent = 'Proceed'; proceedBtn.style.padding='6px 10px';
					row.appendChild(cancelBtn); row.appendChild(proceedBtn);
					box.appendChild(msg); box.appendChild(row); overlay.appendChild(box); document.body.appendChild(overlay);
					cancelBtn.addEventListener('click', ()=>{ try{ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }catch(e){} });
					proceedBtn.addEventListener('click', ()=>{ try{ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }catch(e){} startNurseHealing(seconds * 1000); });
				}catch(e){ console.warn('Nurse confirm overlay failed', e); startNurseHealing(seconds * 1000); }
			});
				wrap.appendChild(btn);
				// Try to insert the Nurse button directly after the Profile card
				try{
					const profAvatar = document.getElementById('profileAvatar');
					const profileCard = (profAvatar && profAvatar.closest) ? profAvatar.closest('.card') : null;
					if(profileCard && profileCard.parentNode){
						profileCard.parentNode.insertBefore(wrap, profileCard.nextSibling);
					} else {
						// fallback: append to leftPanel
						leftPanel.appendChild(wrap);
					}
				}catch(e){
					leftPanel.appendChild(wrap);
				}
		}catch(e){ console.warn('ensureNurseJoeyButton failed', e); }
	})();
	const ballGrid = document.getElementById('ballGrid');

	// lightweight UI message/confirm helpers (non-blocking, auto-dismiss)
	function ensureUiMessageContainer(){
		let c = document.getElementById('uiMessageContainer');
		if(!c){ c = document.createElement('div'); c.id = 'uiMessageContainer'; c.style.position='fixed'; c.style.right='16px'; c.style.top='16px'; c.style.zIndex = 9999; c.style.display='flex'; c.style.flexDirection='column'; c.style.gap='8px'; document.body.appendChild(c); }
		return c;
	}
	function showMessage(text, type='info', timeout=3000){
		try{
			const c = ensureUiMessageContainer();
			const el = document.createElement('div');
			el.className = 'ui-msg ui-msg-'+type;
			el.textContent = text;
			el.style.padding = '8px 12px';
			el.style.borderRadius = '8px';
			el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
			el.style.background = (type==='error') ? '#f8d7da' : (type==='warn' ? '#fff3cd' : '#d1e7dd');
			el.style.color = '#111';
			el.style.fontFamily = 'sans-serif';
			el.style.fontSize = '13px';
			c.appendChild(el);
			if(timeout > 0){ setTimeout(()=>{ try{ if(el.parentNode) el.parentNode.removeChild(el); }catch(e){} }, timeout); }
			return el;
		}catch(e){ console.warn('showMessage failed', e); }
	}
	function showConfirm(message, onYes, onNo){
		// create a centered modal-like confirm box
		try{
			const overlay = document.createElement('div');
			overlay.style.position = 'fixed'; overlay.style.left = 0; overlay.style.top = 0; overlay.style.right = 0; overlay.style.bottom = 0;
			overlay.style.background = 'rgba(0,0,0,0.4)'; overlay.style.zIndex = 10000; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center';
			const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='16px'; box.style.borderRadius='10px'; box.style.minWidth='260px'; box.style.boxShadow='0 6px 18px rgba(0,0,0,0.3)';
			const msg = document.createElement('div'); msg.textContent = message; msg.style.marginBottom = '12px'; box.appendChild(msg);
			const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='flex-end'; row.style.gap='8px';
			const noBtn = document.createElement('button'); noBtn.textContent='Cancel'; noBtn.style.padding='6px 10px';
			const yesBtn = document.createElement('button'); yesBtn.textContent='Delete'; yesBtn.style.padding='6px 10px'; yesBtn.style.background='#d9534f'; yesBtn.style.color='#fff'; yesBtn.style.border='none'; yesBtn.style.borderRadius='4px';
			row.appendChild(noBtn); row.appendChild(yesBtn); box.appendChild(row); overlay.appendChild(box); document.body.appendChild(overlay);
			function cleanup(){ try{ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }catch(e){} }
			noBtn.addEventListener('click', ()=>{ cleanup(); if(typeof onNo==='function') onNo(); });
			yesBtn.addEventListener('click', ()=>{ cleanup(); if(typeof onYes==='function') onYes(); });
		}catch(e){ console.warn('showConfirm failed', e); if(typeof onNo==='function') onNo(); }
	}

	// Default starter profile
	// starting inventory includes some potions and an amulet coin to carry
	const DEFAULT_INV = {
		pokeball:10, greatball:3, ultraball:1,
		potion:5, 'super-potion':2, 'hyper-potion':1,
		'amulet-coin':1
	};
	const DEFAULT_MONEY = 100;
	// Achievements: reaching certain levels grants rewards
	const ACHIEVEMENTS = [
		{ level: 5,  rewards: { pokeball: 20 },  desc: '20x Pokéballs' },
		{ level: 10, rewards: { greatball: 5 },  desc: '5x Great Balls' },
		{ level: 30, rewards: { ultraball: 50 }, desc: '50x Ultra Balls' }
	];
	const ASSETS_MANIFEST = 'PokeLegion/assets.json';
	let assets = {avatars:[], pokemon:[]};
	// registry of canonical avatar URLs we've already added (prevents duplicates)
	const seenAvatarSrcs = new Set();

		// Tile configuration
		const TILE_SIZE = 48; // pixels
		const MOVE_MS = 260; // movement animation duration (ms)
		document.documentElement.style.setProperty('--tile-size', TILE_SIZE + 'px');

		// Define maps (small examples). Each map is an object with name, cols, rows, tiles (flat or 2D)
		const MAPS = [
			{
				name: 'Starting Meadow', cols: 15, rows: 11,
				tiles: [] // will be filled below
			},
			{
				name: 'Coastal Road', cols: 18, rows: 12,
				tiles: []
			}
		];

		// helper to fill map 2D arrays with default tiles
		function makeEmptyMap(map, fill='grass'){
			map.tiles = Array.from({length: map.rows}, ()=> Array.from({length: map.cols}, ()=> fill));
		}

		// build a simple starting meadow with border mountains and a road and a pond
		makeEmptyMap(MAPS[0], 'grass');
		for(let r=0;r<MAPS[0].rows;r++){
			for(let c=0;c<MAPS[0].cols;c++){
				if(r===0||c===0||r===MAPS[0].rows-1||c===MAPS[0].cols-1) MAPS[0].tiles[r][c] = 'mountain-border';
			}
		}
		// road
		for(let c=2;c<MAPS[0].cols-2;c++) MAPS[0].tiles[5][c] = 'road';
		// pond
		for(let r=2;r<=3;r++) for(let c=2;c<=4;c++) MAPS[0].tiles[r][c] = (r===2&&c===4)?'shallow':'water';

		// coastal road map with shallow shore
		makeEmptyMap(MAPS[1], 'grass');
		for(let r=0;r<MAPS[1].rows;r++){
			MAPS[1].tiles[r][0] = 'mountain-border';
			MAPS[1].tiles[r][MAPS[1].cols-1] = 'mountain-border';
		}
		for(let c=0;c<MAPS[1].cols;c++){
			MAPS[1].tiles[2][c] = 'road';
			if(c>8 && c<13) MAPS[1].tiles[6][c] = 'water';
		}

		let currentMapIndex = 0;
		let unlockedMaps = [0];

	// Wild encounter state
	let battleActive = false; // when true, player cannot move

	// Global UI overlay to fully block interactions while in battle
	function createBattleOverlay(){
		if(document.getElementById('battleOverlay')) return;
		const ov = document.createElement('div');
		ov.id = 'battleOverlay';
		ov.style.position = 'fixed';
		ov.style.left = '0'; ov.style.top = '0'; ov.style.right = '0'; ov.style.bottom = '0';
		ov.style.zIndex = 15000;
		// transparent but active for pointer events to block underlying UI
		ov.style.background = 'rgba(0,0,0,0)';
		ov.style.pointerEvents = 'auto';
		// prevent accidental focus/scroll
		ov.addEventListener('mousedown', e=>{ e.stopPropagation(); e.preventDefault(); });
		ov.addEventListener('click', e=>{ e.stopPropagation(); e.preventDefault(); });
		document.body.appendChild(ov);
	}

	function removeBattleOverlay(){
		const ov = document.getElementById('battleOverlay'); if(ov && ov.parentNode) ov.parentNode.removeChild(ov);
	}

	function setBattleActive(val){
		battleActive = !!val;
		if(battleActive){
			createBattleOverlay();
		} else {
			removeBattleOverlay();
		}
	}
	let currentWildSpawns = []; // array of spawned wild pokemon objects
	let activeWildTarget = null; // the wild pokemon the player chose to engage
	// track ball usage counts per wild encounter id
	let catchUsage = {};

	// Spawn tables per map (simple examples). Each entry: { name, rarity: 'common'|'uncommon'|'rare', types:[], baseLevel }
	const WILD_SPAWNS = {
		'Starting Meadow': [
			{name: 'Caterpie', rarity: 'common', types: ['bug'], baseLevel: 1},
			{name: 'Weedle', rarity: 'common', types: ['bug','poison'], baseLevel: 1},
			{name: 'Pidgey', rarity: 'uncommon', types: ['flying'], baseLevel: 2},
			{name: 'Diglett', rarity: 'uncommon', types: ['ground'], baseLevel: 2},
			{name: 'Dratini', rarity: 'rare', types: ['dragon'], baseLevel: 5}
		],
		'Coastal Road': [
			{name: 'Poliwag', rarity: 'common', types: ['water'], baseLevel:1},
			{name: 'Magikarp', rarity: 'common', types: ['water'], baseLevel:1},
			{name: 'Psyduck', rarity: 'uncommon', types: ['water'], baseLevel:3},
			{name: 'Lapras', rarity: 'rare', types: ['water','ice'], baseLevel:6}
		]
	};

	function rarityWeight(r){ if(r==='common') return 70; if(r==='uncommon') return 25; return 5 }

	function pickRandomFromWeighted(list){
		const total = list.reduce((s,i)=>s + rarityWeight(i.rarity), 0);
		let pick = Math.floor(Math.random() * total);
		for(const it of list){ pick -= rarityWeight(it.rarity); if(pick < 0) return it; }
		return list[0];
	}

		function normalizeName(s){ return (s||'').toString().toLowerCase().replace(/[^a-z0-9]/g,''); }

		function setCurrentMap(index){
			currentMapIndex = Math.max(0, Math.min(index, MAPS.length-1));
			renderMap();
		}

		function unlockNextMap(){
			if(unlockedMaps.includes(currentMapIndex+1) || currentMapIndex+1 >= MAPS.length) return false;
			unlockedMaps.push(currentMapIndex+1);
			return true;
		}


	// Try to load assets manifest to enable image avatars and pokemon sprites
	function loadAssetsManifest(){
		fetch(ASSETS_MANIFEST).then(r=>{
			if(!r.ok) throw new Error('no manifest');
			return r.json();
		}).then(m=>{
			assets = m || assets;
			populateAvatarsFromAssets();
			// if manifest contains CSV maps, load them
			if(assets.maps && Array.isArray(assets.maps) && assets.maps.length>0){
				loadMapsFromManifest(assets.maps);
			}
		}).catch(()=>{
			// no manifest — attempt to populate avatars by scanning the Avatars folder
			try{ populateAvatarsFromFolder(); }catch(e){ /* ignore */ }
		});
	}

// Embedded CSV map contents (so maps load when opening the HTML via file://)
const EMBEDDED_MAP_CSVS = {
	'starting_meadow.csv':
`MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB
MB,MB,MB,MB,MF,MF,G,G,G,G,G,G,G,G,G
MB,MB,MB,MF,MF,G,R,R,R,R,R,R,R,R,R
MB,MF,G,G,G,R,R,G,G,G,G,G,R,G,MB
MB,G,S,G,G,G,G,G,G,G,R,R,R,MF,MB
MB,G,S,S,S,G,G,S,S,R,R,MF,MF,MB,MB
MB,G,S,W,S,S,S,S,S,R,G,MF,MB,MB,MB
MB,S,S,W,W,S,W,W,S,G,G,MF,MB,MB,MB
MB,S,S,S,W,W,W,W,S,S,G,MF,MF,MF,MB
MB,MB,MB,MB,W,W,MB,MB,MB,MB,MB,MB,MB,MB,MB`,

	'coastal_road.csv':
`S,S,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB,MB
S,S,S,MB,MF,MF,G,G,G,G,G,G,G,G,G
S,S,S,MF,MF,G,R,R,R,R,R,R,W,W,W
MB,MF,G,G,G,R,R,G,G,G,G,G,R,G,MB
MB,G,S,G,G,G,G,G,G,G,R,R,R,MF,MB
MB,G,S,S,S,G,G,S,S,R,R,MF,MF,MB,MB
MB,G,S,W,W,W,W,S,S,R,G,MF,MB,MB,MB
MB,S,S,W,W,W,W,W,S,G,G,MF,MB,MB,MB
MB,S,S,S,W,W,W,W,S,S,G,MF,MF,MF,MB
MB,MB,MB,MB,W,W,W,W,MB,MB,MB,MB,MB,MB,MB`
};

// Map CSV parsing and loading
function parseCSVToMap(csvText, friendlyName){
	const lines = csvText.split(/\r?\n/).map(l=>l.trim()).filter(l=>l.length>0);
	if(lines.length===0) return null;
	const rows = lines.length;
	const cols = Math.max(...lines.map(l=>l.split(',').length));
	const tiles = Array.from({length: rows}, ()=> Array.from({length: cols}, ()=> 'grass'));

	// code -> tile type mapping
	const codeMap = {
		'G': 'grass', 'GRASS': 'grass',
		'R': 'road', 'ROAD': 'road',
		'MB': 'mountain-border', 'MF': 'mountain-floor',
		'S': 'shallow', 'W': 'water',
		'C': 'cave', 'D': 'darkred'
	};

	for(let r=0;r<rows;r++){
		const parts = lines[r].split(',').map(p=>p.trim()).filter((_,i)=>i<cols);
		for(let c=0;c<parts.length;c++){
			const code = (parts[c] || '').toUpperCase();
			if(code === '') { tiles[r][c] = 'grass'; continue; }
			tiles[r][c] = codeMap[code] || 'grass';
		}
	}

	const name = friendlyName || ('Map ' + (MAPS.length+1));
	return { name, cols, rows, tiles };
}

// ensure player's inventory has default keys without overwriting existing counts
function ensureInventoryDefaults(){
	if(!player) return;
	player.inventory = player.inventory || {};
	Object.keys(DEFAULT_INV).forEach(k=>{
		if(!(k in player.inventory)) player.inventory[k] = DEFAULT_INV[k];
	});
}

async function loadMapsFromManifest(mapPaths){
	// helper to normalize names for matching (remove non-alphanum and lowercase)
	function normalize(s){ return (s||'').toString().toLowerCase().replace(/[^a-z0-9]/g,''); }

	for(const p of mapPaths){
		try{
			const filename = p.split('/').slice(-1)[0].toLowerCase();
			let text = null;
			let friendly = filename.replace(/\.csv$/i,'').replace(/[_-]/g,' ').trim();
			// prefer embedded CSV if available
			if(EMBEDDED_MAP_CSVS && EMBEDDED_MAP_CSVS[filename]){
				text = EMBEDDED_MAP_CSVS[filename];
				console.log('Using embedded CSV for', filename);
			} else {
				const resp = await fetch(p);
				if(!resp.ok) { console.warn('Failed to fetch map',p); continue; }
				text = await resp.text();
			}
			const parsed = parseCSVToMap(text, friendly);
			if(parsed) {
				// updating existing profile: do not overwrite starter unless none exists
				const targetName = normalize(parsed.name);
				let replaced = false;
				for(let i=0;i<MAPS.length;i++){
					if(normalize(MAPS[i].name) === targetName){
						MAPS[i] = parsed;
						console.log('Replaced existing map', MAPS[i].name, 'with', p);
				if(!player.party || player.party.length===0) player.party = [{name: player.starter, level:1, exp:0}];
						break;
					}
				}
				if(!replaced){
				player = {name,avatar,starter,inventory:DEFAULT_INV,money:DEFAULT_MONEY,gems:0,party:[{name:starter, level:1, exp:0}],log:[],tasks:[],level:1,exp:0,achievementsClaimed:[],held:[],mapIndex: currentMapIndex, unlockedMaps: unlockedMaps};
					console.log('Appended map from manifest:', p);
				}
			}
			// ensure per-pokemon progression and ball assignment persist/load
			try{
				loadPokeProgress();
				player.party = player.party || [];
				player.party = player.party.map(m => {
					if(typeof m === 'string') m = { name: m, level:1, exp:0 };
					if(typeof m !== 'object' || m === null) m = { name: String(m||''), level:1, exp:0 };
					if(typeof m.level !== 'number') m.level = 1;
					if(typeof m.exp !== 'number') m.exp = 0;
					ensurePokemonHasTypes(m);
					try{ assignBallToPokemon(m); }catch(e){}
					try{ applyStoredProgressToPokemon(m); }catch(e){}
					return m;
				});
				// also normalize depot entries if present
				if(Array.isArray(player.depot)){
					player.depot = player.depot.map(p => { try{ if(!p || typeof p !== 'object') p = { name: String(p||''), level:1, exp:0 }; ensurePokemonHasTypes(p); try{ assignBallToPokemon(p); }catch(e){} return p; }catch(e){ return p; } });
				}
			}catch(e){}
		}catch(err){ console.warn('Error loading map',p,err); }
	}
	// re-render map UI to include loaded/updated maps
	renderMap();
}

// Load any embedded CSVs into MAPS (replace placeholders by name)
function loadEmbeddedMaps(){
	if(!EMBEDDED_MAP_CSVS) return;
	Object.keys(EMBEDDED_MAP_CSVS).forEach(filename=>{
		try{
			const text = EMBEDDED_MAP_CSVS[filename];
			const friendly = filename.replace(/\.csv$/i,'').replace(/[_-]/g,' ').trim();
			const parsed = parseCSVToMap(text, friendly);
			if(!parsed) return;
			const target = normalizeName(parsed.name);
			let replaced = false;
			for(let i=0;i<MAPS.length;i++){
				if(normalizeName(MAPS[i].name) === target){
					MAPS[i] = parsed; replaced = true; break;
				}
			}
			if(!replaced) MAPS.push(parsed);
			console.log('Loaded embedded map', filename);
		}catch(err){ console.warn('Failed to load embedded map', filename, err); }
	});
	// rerender and reposition player if needed
	try{ renderMap(); if(player) renderPlayer(); }catch(e){}
}
// (Removed local CSV import UI — maps are now loaded from embedded CSVs or via fetch when available)

// choose a deterministic variant (1..3) per tile so re-renders look stable
function pickTileSprite(prefix, r, c){
	const tilesPath = (assets && assets.tilesPath) ? assets.tilesPath : 'PokeLegion/tiles/';
	// simple deterministic hash
	let s = prefix + '|' + r + '|' + c;
	let h = 0; for(let i=0;i<s.length;i++) h = ((h<<5)-h) + s.charCodeAt(i);
	const variant = (Math.abs(h) % 3) + 1; // assume 3 variants
	return tilesPath + prefix + variant + '.png';
}

	function populateAvatarsFromAssets(){
		// If an assets manifest lists avatars, use that. Otherwise fall back
		// to scanning the `PokeLegion/Avatars/` folder for numbered sheets.
		if(!assets || !assets.avatars || assets.avatars.length===0){
			populateAvatarsFromFolder();
			return;
		}
		avatarChoices.innerHTML = '';
		let anyLoaded = false;
		assets.avatars.forEach(fn=>{
			const btn = document.createElement('button');
			btn.className = 'avatar-choice';
			const img = document.createElement('img');
			// Candidate sources to try (manifest path, prefixed folder, with/without .png)
			const cand = [];
			if(typeof fn === 'string'){
				if(fn.indexOf('/') !== -1) cand.push(fn);
				const base = fn.replace(/^.*[\\/]/,'');
				cand.push(`PokeLegion/Avatars/${base}`);
				if(!/\.[a-z0-9]+$/i.test(base)) cand.push(`PokeLegion/Avatars/${base}.png`);
			}
			let ci = 0;
			function tryNext(){
				if(ci >= cand.length){
					// none worked — remove image and leave a placeholder
					img.remove();
					btn.textContent = (fn||'?');
					avatarChoices.appendChild(btn);
					return;
				}
				const s = cand[ci++];
				img.src = s;
				img.alt = fn;
			};
			img.onload = ()=>{
				anyLoaded = true;
				// create a cropped front-facing thumbnail from the loaded sheet
				// use the loaded image's resolved src as the canonical key
				const canonical = (function(s){ try{ return (new URL(s, location.href)).href; }catch(e){ return s; } })(img.src);
				if(seenAvatarSrcs.has(canonical)) return; // already added
				seenAvatarSrcs.add(canonical);
				const thumbCanvas = createAvatarThumbnail(img, 48);
				let thumbElem = null;
				if(thumbCanvas){
					thumbElem = document.createElement('img');
					thumbElem.src = thumbCanvas.toDataURL();
					thumbElem.alt = fn;
					thumbElem.style.width = '40px'; thumbElem.style.height = '40px'; thumbElem.style.objectFit='contain';
					btn.appendChild(thumbElem);
				} else {
					thumbElem = img;
					thumbElem.style.width = '40px'; thumbElem.style.height = '40px'; thumbElem.style.objectFit='contain';
					btn.appendChild(thumbElem);
				}
				btn.setAttribute('data-avatar', canonical);
				avatarChoices.appendChild(btn);
				btn.addEventListener('click', ()=>updateAvatarPreview());
				// attach hover autoplay for this thumbnail (use canonical src)
				attachThumbnailHover(btn, canonical);
			};
			img.onerror = ()=>{ tryNext(); };
			// start trying candidates
			tryNext();
		});
		// if nothing loads from the manifest after a short delay, fall back to folder probe
		setTimeout(()=>{ if(!avatarChoices.querySelector('.avatar-choice img')) populateAvatarsFromFolder(); }, 400);
		// (single top-level click handler `selectAvatar` manages selection and preview)

		// also re-run prefill selection if a player exists
		if(player){
			setTimeout(()=>{
				const all = avatarChoices.querySelectorAll('.avatar-choice');
				all.forEach(b=>b.classList.remove('selected'));
				let matched = null;
				all.forEach(b=>{ if(b.getAttribute('data-avatar') === player.avatar) matched = b });
				if(matched) matched.classList.add('selected');
				updateAvatarPreview();
			},50);
		}
	}

	// Attempt to populate avatar choices by probing numbered files in the Avatars folder.
	function populateAvatarsFromFolder(){
		if(!avatarChoices) return;
		avatarChoices.innerHTML = '';
		// Try filenames 001..020 — adjust range if you have more/less
		const max = 20;
		let added = 0;
		for(let i=1;i<=max;i++){
			const idx = String(i).padStart(3,'0');
			const path = `PokeLegion/Avatars/${idx}.png`;
			// create image and probe load
			(function(p){
				const img = new Image();
				img.onload = ()=>{
					const btn = document.createElement('button'); btn.className='avatar-choice';
					// canonicalize loaded image src (img.src will be resolved)
					const canonical = (function(s){ try{ return (new URL(s, location.href)).href; }catch(e){ return s; } })(img.src);
					if(seenAvatarSrcs.has(canonical)) return;
					seenAvatarSrcs.add(canonical);
					const thumbCanvas = createAvatarThumbnail(img, 48);
					if(thumbCanvas){
						const thumb = document.createElement('img'); thumb.src = thumbCanvas.toDataURL(); thumb.alt = idx; thumb.style.width='40px'; thumb.style.height='40px'; thumb.style.objectFit='contain';
						btn.appendChild(thumb); attachThumbnailHover(btn, canonical);
					} else {
						const thumb = document.createElement('img'); thumb.src = canonical; thumb.alt = idx; thumb.style.width='40px'; thumb.style.height='40px'; thumb.style.objectFit='contain';
						btn.appendChild(thumb); attachThumbnailHover(btn, canonical);
					}
					btn.setAttribute('data-avatar', canonical);
					avatarChoices.appendChild(btn);
					btn.addEventListener('click', ()=>updateAvatarPreview());
					added++;
				};
				img.onerror = ()=>{
					// ignore missing files silently
				};
				img.src = p;
			})(path);
		}
		// If no avatars found after a short delay, keep a default emoji choice
		setTimeout(()=>{
			if(avatarChoices.children.length === 0){
				const btn = document.createElement('button'); btn.className='avatar-choice'; btn.textContent='🙂'; btn.setAttribute('data-avatar','🙂'); avatarChoices.appendChild(btn);
				btn.addEventListener('click', ()=>updateAvatarPreview());
			}
			// Prefill selection if a player exists
			if(player){
				setTimeout(()=>{ const all = avatarChoices.querySelectorAll('.avatar-choice'); all.forEach(b=>b.classList.remove('selected')); let matched=null; all.forEach(b=>{ if(b.getAttribute('data-avatar') === player.avatar) matched=b }); if(matched) matched.classList.add('selected'); updateAvatarPreview(); },50);
			}
		}, 350);
	}

	function loadPlayer(){
		try{
			const raw = localStorage.getItem(STORAGE_KEY);
			if(raw) return JSON.parse(raw);
		}catch(e){console.warn(e)}
		return null;
	}

	function savePlayer(){
		try{
			// persist some runtime map state into player for restoring
			if(player){ player.mapIndex = currentMapIndex; player.unlockedMaps = unlockedMaps; }
			localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
		}catch(e){console.warn(e)}
	}

	function xpForNextLevel(level){
		// XP table driven progression (levels 1..100). This function
		// returns the XP required to go from `level` -> `level+1`.
		const MAX_LEVEL = 100;
		// cumulative XP required to *reach* each level
		const XP_TABLE = [
			0, // placeholder for index 0 (unused)
			0,100,200,400,800,1500,2600,4200,6400,9300,13000,17600,23200,29900,37800,47000,57600,69700,83400,98800,
			116000,135100,156200,179400,204800,232500,262600,295200,330400,368300,409000,452600,499200,548900,601800,658000,717600,780700,847400,917800,
			992000,1070100,1152200,1238400,1328800,1423500,1522600,1626200,1734400,1847300,1965000,2087600,2215200,2347900,2485800,2629000,2777600,2931700,3091400,3256800,
			3428000,3605100,3788200,3977400,4172800,4374500,4582600,4797200,5018400,5246300,5481000,5722600,5971200,6226900,6489800,6760000,7037600,7322700,7615400,7915800,
			8224000,8540100,8864200,9196400,9536800,9885500,10242600,10608200,10982400,11365300,11757000,12157600,12567200,12985900,13413800,13851000,14297600,14753700,15219400,15694800
		];
		if(!level) level = 1;
		level = Number(level) || 1;
		if(level >= MAX_LEVEL) return Infinity;
		// per-level requirement is the difference between cumulative thresholds
		const req = (XP_TABLE[level+1] || 0) - (XP_TABLE[level] || 0);
		return Math.max(0, req);
	}

// Global type colors used across Depot and Party cards
const TYPE_COLORS_GLOBAL = {
	'normal':'#A8A77A','fire':'#EE8130','fighting':'#C22E28','water':'#6390F0','flying':'#A98FF3','grass':'#7AC74C','poison':'#A33EA1','electric':'#F7D02C','ground':'#E2BF65','psychic':'#F95587','rock':'#B6A136','ice':'#96D9D6','bug':'#A6B91A','dragon':'#6F35FC','ghost':'#735797','dark':'#705746','steel':'#B7B7CE','fairy':'#D685AD'
};
function getTypeColor(t){ return TYPE_COLORS_GLOBAL[String(t||'').toLowerCase()] || '#666'; }

	function grantRewards(rewards){
		if(!rewards) return;
		player.inventory = player.inventory || {};
		Object.keys(rewards).forEach(k=>{
			const n = Number(rewards[k]) || 0;
			if(k === 'money'){
				player.money = (Number(player.money) || 0) + n;
			} else if(k === 'gems'){
				player.gems = (Number(player.gems) || 0) + n;
			} else {
				player.inventory[k] = (Number(player.inventory[k]) || 0) + n;
			}
		});
		addLog(`Rewards granted: ${JSON.stringify(rewards)}`);
		savePlayer();
		// Immediate inventory UI refresh for visibility after loot
		try{ renderInventoryGrid(); updatePanels(); }catch(e){}
	}

	function onLevelUp(oldLevel, newLevel){
		addLog(`Leveled up: ${oldLevel} → ${newLevel}`);
		// check achievements that match the new level or earlier levels not yet claimed
		player.achievementsClaimed = player.achievementsClaimed || [];
		ACHIEVEMENTS.forEach(a=>{
			if(newLevel >= a.level && !player.achievementsClaimed.includes(a.level)){
				// grant reward
				grantRewards(a.rewards);
				player.achievementsClaimed.push(a.level);
				addLog(`Achievement reached: Level ${a.level} — ${a.desc}`);
			}
		});
		savePlayer();
	}

	function addExp(amount){
		amount = Number(amount) || 0;
		if(amount <= 0) return;
		player.exp = Number(player.exp) || 0;
		player.level = Math.max(1, Number(player.level) || 1);
		player.exp += amount;
		// level up while we have enough XP (but don't exceed max level)
		let leveled = false;
		const MAX_LEVEL = 100;
		while(player.level < MAX_LEVEL){
			const need = xpForNextLevel(player.level);
			if(!isFinite(need) || player.exp < need) break;
			player.exp -= need;
			const old = player.level;
			player.level = player.level + 1;
			leveled = true;
			onLevelUp(old, player.level);
		}
		// If we've reached max level, clamp exp to 0 (no further progression)
		if(player.level >= MAX_LEVEL){ player.level = MAX_LEVEL; player.exp = 0; }
		savePlayer();
		if(leveled) updatePanels(); else renderTasks();
	}

	let modalMode = 'create'; // 'create' or 'edit'
	function showProfileModal(mode = 'create', hideGame = true){
		modalMode = mode === 'edit' ? 'edit' : 'create';
		// If in create mode and a player already exists, prevent opening a create modal
		if(modalMode === 'create' && player){
			// prefer edit instead
			showMessage('A profile already exists. Use Edit Profile to change it.', 'warn', 3500);
			return;
		}
		profileModal.classList.remove('hidden');
		if(hideGame) gameRoot.classList.add('hidden');
		// update create/save label
		createBtn.textContent = modalMode === 'edit' ? 'Save' : 'Create Trainer';
		// focus name input for faster creation
		setTimeout(()=>{ if(playerNameInput) playerNameInput.focus(); },50);
	}

	function hideProfileModal(){
		profileModal.classList.add('hidden');
		// When the modal closes, stop and remove any thumbnail animators and
		// restore the static thumbnail images so the modal doesn't hold canvases.
		try{
			if(avatarChoices){
				const all = avatarChoices.querySelectorAll('.avatar-choice');
				all.forEach(b=>{
					if(b._anim){
						try{ b._anim.stop(); if(b._anim.canvas && b._anim.canvas.parentNode) b._anim.canvas.parentNode.removeChild(b._anim.canvas); }catch(e){}
						b._anim = null;
					}
					const thumb = b.querySelector('img'); if(thumb) thumb.style.display = '';
				});
			}
		}catch(e){}
	}

	function startGame(){
		document.getElementById('gameRoot').classList.remove('hidden');
		mapOverlay.classList.add('hidden');
		// position player in center tile if no tile position saved
		if(!player.tilePos) player.tilePos = {r: Math.floor(MAPS[currentMapIndex].rows/2), c: Math.floor(MAPS[currentMapIndex].cols/2)};
		renderMap();
		renderPlayer();
		updatePanels();
		savePlayer();
	}

	function centerPlayer(){
		const map = document.getElementById('mapArea');
		const rect = map.getBoundingClientRect();
		player.pos = {x: Math.round(rect.width/2), y: Math.round(rect.height/2)};
	}

	// Helper: load an image and return a Promise<HTMLImageElement>
	function loadImage(url){
		return new Promise((resolve,reject)=>{
			const i = new Image();
			i.crossOrigin = 'anonymous';
			i.onload = ()=> resolve(i);
			i.onerror = e=> reject(e);
			i.src = url;
		});
	}

	// Given an avatar value (may be a path, filename, or logical name) return candidate URLs
	function avatarCandidates(val){
		if(!val) return [];
		const v = String(val).trim();
		const out = [];
		// If it already looks like a full path, try it first
		if(v.includes('/') || /\.(png|jpg|jpeg|gif)$/i.test(v)) out.push(v);
		// Common folders used in this project
		const base = 'PokeLegion/Avatars/';
		const alt1 = 'PokeLegion/avatars/';
		const plain = v.replace(/^\/+|\s+$/g,'');
		const fileKey = plain.toLowerCase().replace(/[^a-z0-9]+/g,'_');
		// Try with common suffixes
		out.push(base + plain);
		out.push(base + plain + '.png');
		out.push(base + fileKey + '.png');
		out.push(alt1 + fileKey + '.png');
		out.push('PokeLegion/' + plain);
		out.push('PokeLegion/' + plain + '.png');
		out.push('PokeLegion/Items/' + fileKey + '.png');
		// fallback to raw filename variants
		out.push(plain + '.png');
		out.push(plain + '.jpg');
		out.push(plain + '.gif');
		// Deduplicate while preserving order
		const seen = new Set();
		return out.filter(u=>{ if(!u) return false; const k=u; if(seen.has(k)) return false; seen.add(k); return true; });
	}

	// Try loading an image from multiple candidate URLs, resolving the first that succeeds
	function loadImageAny(val){
			return new Promise((resolve,reject)=>{
				const cands = avatarCandidates(val);
				if(!cands || cands.length===0) return reject(new Error('no candidates'));
				let i = 0;
				// diagnostic: list candidates
				try{ console.debug('loadImageAny: candidates for', val, cands); }catch(e){}
				function tryNext(){
					if(i >= cands.length) {
						const err = new Error('failed to load any avatar image');
						try{ err.candidates = cands; console.warn('loadImageAny: all candidates failed for', val, cands); }catch(e){}
						return reject(err);
					}
					const url = cands[i];
					loadImage(url).then(img=>resolve(img)).catch((e)=>{
						try{ console.warn('loadImageAny: candidate failed', url, e && e.message ? e.message : e); }catch(ex){}
						i++; tryNext();
					});
				}
				tryNext();
			});
	}

	// Helper: create an animator from a loaded sprite-sheet image
	function createPlayerAnimatorFromImage(sheetImg, opts={}){
		const cols = opts.cols || 3;
		const rows = opts.rows || 4;
		const fps = opts.fps || 8;
		const frameW = Math.floor(sheetImg.width / cols);
		const frameH = Math.floor(sheetImg.height / rows);
		const canvas = document.createElement('canvas');
		canvas.width = frameW; canvas.height = frameH;
		canvas.className = 'player-sprite';
		canvas.style.width = frameW + 'px';
		canvas.style.height = frameH + 'px';
		canvas.style.imageRendering = 'pixelated';
		const ctx = canvas.getContext('2d');
		let playing = false;
		let frame = Math.floor(cols/2);
		let dirIdx = 1; // default to south
		let last = 0;
		function drawFrame(){
			const sx = frame * frameW;
			const sy = dirIdx * frameH;
			ctx.clearRect(0,0,frameW,frameH);
			ctx.drawImage(sheetImg, sx, sy, frameW, frameH, 0, 0, frameW, frameH);
		}
		function loop(now){
			if(!playing) return;
			const msPer = 1000 / fps;
			if(now - last >= msPer){ frame = (frame + 1) % cols; last = now; }
			drawFrame();
			requestAnimationFrame(loop);
		}
		function setDirection(dir){
			const map = { north:0, south:1, left:2, right:3 };
			dirIdx = (map[dir] != null) ? map[dir] : 1;
		}
		return {
			canvas,
			play(dir){ setDirection(dir); if(!playing){ playing = true; frame = 0; last = performance.now(); requestAnimationFrame(loop); } },
			idle(dir){ setDirection(dir); playing = false; frame = Math.floor(cols/2); drawFrame(); },
			stop(){ playing = false; }
		};
	}

	function renderPlayer(){
		// Render avatar: if it's an image (sprite sheet) use the shared animator helpers,
		// otherwise show emoji/text.
		const av = player.avatar || '🙂';
		playerEl.innerHTML = '';
		if(typeof av === 'string' && av !== '🙂'){
			// try multiple candidate paths for avatars (names, filenames, or paths)
			loadImageAny(av).then(img=>{
				if(player._sprite && player._sprite.stop) try{ player._sprite.stop(); }catch(e){}
				const animator = createPlayerAnimatorFromImage(img, { cols: 3, rows: 4, fps: 8 });
				player._sprite = animator;
				// ensure canvas displays at tile size for in-map rendering
				animator.canvas.style.width = TILE_SIZE + 'px';
				animator.canvas.style.height = TILE_SIZE + 'px';
				playerEl.appendChild(animator.canvas);
				// enable smooth CSS transitions for player movement
				try{ playerEl.style.transition = `left ${MOVE_MS}ms linear, top ${MOVE_MS}ms linear`; }catch(e){}
				animator.idle(player.facing || 'south');
			}).catch(err=>{
				// fallback: insert an <img> so the browser shows a broken-image icon instead of printing the path text
				const imgEl = document.createElement('img');
				imgEl.src = String(av);
				imgEl.alt = player.name || 'player';
				imgEl.style.width = TILE_SIZE + 'px'; imgEl.style.height = TILE_SIZE + 'px'; imgEl.style.objectFit = 'contain';
				imgEl.title = String(av);
				imgEl.className = 'player-avatar-img';
				imgEl.onerror = ()=>{ try{ imgEl.classList.add('broken-avatar'); imgEl.alt = 'missing avatar'; imgEl.title = String(av); }catch(e){} };
				playerEl.appendChild(imgEl);
				try{ playerEl.style.transition = `left ${MOVE_MS}ms linear, top ${MOVE_MS}ms linear`; }catch(e){}
			});
		} else {
			playerEl.textContent = av;
		}
		// Position player using tile coords
		if(player.tilePos){
			setPlayerPositionTile(player.tilePos.r, player.tilePos.c);
		} else if(player.pos){
			setPlayerPosition(player.pos.x, player.pos.y);
		}
	}

	function setPlayerPositionTile(r,c){
		const map = MAPS[currentMapIndex];
		try{
			// Prefer computing the position relative to the rendered tiles container
			const mapArea = document.getElementById('mapArea');
			const gridWrapper = document.querySelector('.map-grid');
			const tiles = gridWrapper ? gridWrapper.querySelector('.tiles') : null;
			if(mapArea && tiles){
				const mapRect = mapArea.getBoundingClientRect();
				const tilesRect = tiles.getBoundingClientRect();
				const offsetX = tilesRect.left - mapRect.left; // tiles container left inside mapArea
				const offsetY = tilesRect.top - mapRect.top;  // tiles container top inside mapArea
				const left = offsetX + (c * TILE_SIZE) + (TILE_SIZE / 2);
				const top = offsetY + (r * TILE_SIZE) + (TILE_SIZE / 2);
				playerEl.style.left = left + 'px';
				playerEl.style.top = top + 'px';
			} else {
				// Fallback to older calculation (keeps earlier offset behavior)
				const left = c * TILE_SIZE + TILE_SIZE/2 + 12;
				const top = r * TILE_SIZE + TILE_SIZE/2 + 12;
				playerEl.style.left = left + 'px';
				playerEl.style.top = top + 'px';
			}
		}catch(e){
			// if anything goes wrong, fallback gracefully
			const left = c * TILE_SIZE + TILE_SIZE/2 + 12;
			const top = r * TILE_SIZE + TILE_SIZE/2 + 12;
			playerEl.style.left = left + 'px';
			playerEl.style.top = top + 'px';
		}
		// detect whether this is a real tile change (step) or just a re-render/positioning
		const prev = player.tilePos ? {r: player.tilePos.r, c: player.tilePos.c} : null;
		player.tilePos = {r,c};
		savePlayer();
		// trigger potential wild spawn only if tile actually changed
		try{
			if(!battleActive && (!prev || prev.r !== r || prev.c !== c)) attemptWildSpawnOnStep(r,c);
		}catch(e){ console.warn('spawn error', e); }
	}

	function setPlayerPosition(x,y){
		const map = document.getElementById('mapArea');
		const rect = map.getBoundingClientRect();
		// clamp
		const px = Math.max(16, Math.min(rect.width-16, x));
		const py = Math.max(16, Math.min(rect.height-16, y));
		player.pos = {x:px,y:py};
		playerEl.style.left = px + 'px';
		playerEl.style.top = py + 'px';
		savePlayer();
	}

	function renderMap(){
		if(!mapGridEl) return;
		const map = MAPS[currentMapIndex];
		mapGridEl.innerHTML = '';
		const tilesContainer = document.createElement('div');
		tilesContainer.className = 'tiles';
 		tilesContainer.style.display = 'grid';
 		tilesContainer.style.gridTemplateColumns = `repeat(${map.cols}, ${TILE_SIZE}px)`;
 		tilesContainer.style.gridAutoRows = TILE_SIZE + 'px';
		// fill tiles
		for(let r=0;r<map.rows;r++){
			for(let c=0;c<map.cols;c++){
				const t = map.tiles[r][c] || 'grass';
				const d = document.createElement('div');
				d.className = 'tile tile-' + t.replace(/\s+/g,'-');
				d.dataset.r = r; d.dataset.c = c;
				// pick sprite prefix from tile type
				const spriteMap = {
					'grass':'G','road':'R','mountain-border':'MB','mountain-floor':'MF',
					'shallow':'S','water':'W','cave':'C','darkred':'D'
				};
				const prefix = spriteMap[t] || 'G';
				const imgUrl = pickTileSprite(prefix, r, c);
				// set background image for tile
				d.style.backgroundImage = `url(${imgUrl})`;
				d.style.backgroundSize = 'cover';
				tilesContainer.appendChild(d);
			}
		}
		mapGridEl.appendChild(tilesContainer);
		// update map selector UI
		const sel = document.getElementById('mapSelector');
		if(sel){
			sel.innerHTML = '';
			MAPS.forEach((m,i)=>{
				const opt = document.createElement('option'); opt.value = i; opt.textContent = m.name; opt.disabled = !unlockedMaps.includes(i);
				if(i===currentMapIndex) opt.selected = true;
				sel.appendChild(opt);
			});
		}
	}

	function updatePanels(){
		// Build profile summary with level and exp
		const level = Number(player.level) || 1;
		const exp = Number(player.exp) || 0;
		const nextXp = xpForNextLevel(level);
		const pct = Math.max(0, Math.min(100, Math.round((exp / Math.max(1,nextXp)) * 100)));
		const nextAch = (function(){
			const claimed = player.achievementsClaimed || [];
			for(const a of ACHIEVEMENTS){ if(a.level > level && !claimed.includes(a.level)) return a; }
			return null;
		})();

		let profHtml = `<div class="profile-name"><strong>${escapeHtml(player.name)}</strong></div>`;
		profHtml += `<div class="profile-starter">Starter: ${escapeHtml(player.starter || '(none)')}</div>`;
		profHtml += `<div class="profile-level">Level: <strong>${level}</strong></div>`;
		profHtml += `<div class="exp-wrap" aria-hidden="false"><div class="exp-bar"><div class="exp-inner" style="width:${pct}%"></div></div><div class="exp-label">${exp}/${nextXp}</div></div>`;
		if(nextAch){ profHtml += `<div class="next-ach">Next reward at level ${nextAch.level}: ${escapeHtml(nextAch.desc)}</div>`; }
		profileSummary.innerHTML = profHtml;
		// update left panel avatar display if present (show animated front-cycle)
		const profAv = document.getElementById('profileAvatar');
		if(profAv){
			const av = player.avatar || '🙂';
			profAv.innerHTML = '';
			try{
				if(profAv._anim){ if(typeof profAv._anim.stop === 'function') profAv._anim.stop(); if(profAv._anim.canvas && profAv._anim.canvas.parentNode) profAv._anim.canvas.parentNode.removeChild(profAv._anim.canvas); profAv._anim = null; }
			}catch(e){}
			if(typeof av === 'string'){
				loadImageAny(av).then(img=>{
					const anim = createPlayerAnimatorFromImage(img, { cols:3, rows:4, fps:8 });
					profAv._anim = anim;
					// show smaller than map tile (compact profile view)
					anim.canvas.style.width = Math.max(32, Math.floor(TILE_SIZE * 0.75)) + 'px';
					anim.canvas.style.height = Math.max(32, Math.floor(TILE_SIZE * 0.75)) + 'px';
					anim.play('south');
					profAv.appendChild(anim.canvas);
				}).catch(()=>{ profAv.textContent = av; });
			} else {
				profAv.textContent = av;
			}
		}
		// money + gems
		if(moneyAmountEl){ moneyAmountEl.textContent = '$' + (typeof player.money === 'number' ? player.money : 0); }
		if(gemsAmountEl){ gemsAmountEl.textContent = (typeof player.gems === 'number' ? player.gems : 0); }
		// held items
		renderHeldItems();

		// inventory collapsed/expanded state
		const collapsed = !!player.inventoryCollapsed;
		if(inventoryGridEl) inventoryGridEl.classList.toggle('hidden', collapsed);
		if(inventorySummary) inventorySummary.classList.toggle('hidden', collapsed);
		if(openBackpackBtn){ openBackpackBtn.textContent = collapsed ? 'Expand' : 'Collapse'; }
		// apply collapsed state to inventory (use direct style toggles for reliability)
		if(inventoryGridEl) inventoryGridEl.style.display = collapsed ? 'none' : '';
		if(inventorySummary) inventorySummary.style.display = collapsed ? 'none' : '';
		if(openBackpackBtn) openBackpackBtn.textContent = collapsed ? 'Expand' : 'Collapse';
		renderInventoryGrid();
		renderTasks();
		// render party as 2x3 icon grid
		renderPartyGrid();
		renderBallGrid();
		renderLog();
	}

	function renderInventoryGrid(){
		if(!inventoryGridEl) return;
		inventoryGridEl.innerHTML = '';
		// prepare entries from inventory
		const inv = player.inventory || {};
		// deterministic ordering: common ball types first, then remaining keys
		const preferred = ['pokeball','greatball','ultraball'];
		const keys = [];
		// add preferred if present and count > 0
		preferred.forEach(k=>{ if(k in inv && Number(inv[k]||0) > 0) keys.push(k); });
		// then add other inventory keys in stable order
		Object.keys(inv).sort().forEach(k=>{ if(!keys.includes(k) && Number(inv[k]||0) > 0) keys.push(k); });
		// fill up to 50 slots (5x10)
		for(let i=0;i<50;i++){
			const slot = document.createElement('div'); slot.className = 'inv-slot';
			const key = keys[i];
			if(key){
				const count = Number(inv[key]) || 0;
				// create icon with fallback attempts
				const img = document.createElement('img');
				img.alt = key;
				// candidate filenames to try (common permutations)
				const candidates = [
					`PokeLegion/Items/${key}.png`,
					`PokeLegion/Items/${key.replace(/\s+/g,'_')}.png`,
					`PokeLegion/Items/${key.replace(/\s+/g,'-')}.png`,
					`PokeLegion/Items/${key.replace(/\s+/g,'')}.png`,
					`PokeLegion/Items/${key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase()}.png`,
					`PokeLegion/Items/${key.replace(/pokeball/i,'poke ball')}.png`,
					`PokeLegion/Items/${key.replace(/greatball/i,'great ball')}.png`,
					`PokeLegion/Items/${key.replace(/ultraball/i,'ultra ball')}.png`
				];
				let ci = 0;
				img.onerror = function(){
					ci++;
					if(ci < candidates.length) img.src = candidates[ci]; else {
						// fallback: small transparent placeholder
						img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"></svg>';
					}
				};
				img.src = candidates[0];
				slot.appendChild(img);
				// make inventory draggable when present (used by market)
				slot.setAttribute('draggable','true');
				slot.dataset.key = key;
				slot.addEventListener('dragstart', function(e){
					if(battleActive){ e.preventDefault(); showMessage('Cannot move items during a battle.', 'warn'); return; }
					e.dataTransfer.setData('text/plain', key);
					e.dataTransfer.effectAllowed = 'copy';
				});
				// count badge
				const cnt = document.createElement('div'); cnt.className = 'count'; cnt.textContent = String(count);
				slot.appendChild(cnt);
				// tooltip/title showing a friendly item name
				slot.title = niceItemName(key);
			} else {
				slot.classList.add('empty');
				slot.innerHTML = `<div></div>`;
			}
			inventoryGridEl.appendChild(slot);
		}
	}

	function renderHeldItems(){
		if(!heldItemsEl) return;
		// render up to 3 held items (player.held)
		heldItemsEl.innerHTML = '';
		const held = Array.isArray(player.held) ? player.held.slice(0,3) : [];
		for(let i=0;i<3;i++){
			const slot = document.createElement('div'); slot.className = 'held-slot';
			const key = held[i];
			if(key){
				const img = document.createElement('img'); img.alt = key;
				// try basic path (Items folder)
				img.src = `PokeLegion/Items/${key}.png`;
				slot.appendChild(img);
				slot.title = niceItemName(key);
			} else {
				slot.classList.add('empty');
			}
			heldItemsEl.appendChild(slot);
		}
	}

	function renderTasks(){
		if(!tasksListEl) return;
		// keep the initial note if present
		const note = tasksListEl.querySelector('.tasks-note') ? tasksListEl.querySelector('.tasks-note').outerHTML : '<div class="tasks-note">You can have up to <strong>2</strong> active tasks.</div>';
		tasksListEl.innerHTML = note;
		const tasks = (player.tasks && Array.isArray(player.tasks)) ? player.tasks.slice(0,2) : [];
		// ensure daily tasks regenerate if 24h passed
		try{ ensureDailyTasks(); }catch(e){}
		if(tasks.length===0){
			const p = document.createElement('div'); p.className = 'task-item'; p.textContent = '(no active tasks)'; tasksListEl.appendChild(p);
		}
		tasks.forEach(t=>{
			const item = document.createElement('div'); item.className = 'task-item';
			const title = document.createElement('div'); title.className = 'task-title'; title.textContent = t.pokemon || t.name || 'Unnamed';
			const progressWrap = document.createElement('div'); progressWrap.className = 'task-progress';
			const bar = document.createElement('div'); bar.className = 'bar';
			const inner = document.createElement('div'); inner.className = 'bar-inner';
			const goal = (typeof t.goal === 'number') ? t.goal : (t.target || 100);
			const prog = (typeof t.progress === 'number') ? t.progress : (t.value || 0);
			const pct = Math.max(0, Math.min(100, Math.round((prog / Math.max(1,goal)) * 100)));
			inner.style.width = pct + '%';
			bar.appendChild(inner);
			const lbl = document.createElement('div'); lbl.className = 'label'; lbl.textContent = `${prog}/${goal}`;
			progressWrap.appendChild(bar); progressWrap.appendChild(lbl);
			item.appendChild(title); item.appendChild(progressWrap);
			if(prog >= goal && !t.claimed){
				const claim = document.createElement('button'); claim.className='btn small'; claim.textContent='REPORT';
				claim.addEventListener('click', ()=>{ claimTaskReward(t.id); });
				item.appendChild(claim);
			}
			tasksListEl.appendChild(item);
		});
		// management button
		const manageBtn = document.createElement('button'); manageBtn.className='btn small secondary'; manageBtn.style.marginTop='6px'; manageBtn.textContent='Manage Tasks'; manageBtn.addEventListener('click', ()=>{ showTasksModal(); }); tasksListEl.appendChild(manageBtn);
	}

// ---- Daily Tasks System ----
function ensureDailyTasks(){
	if(!player) return;
	const now = Date.now();
	const DAY_MS = 86400000;
	player.dailyTasksGeneratedAt = player.dailyTasksGeneratedAt || 0;
	// regenerate candidate task list every 24h
	if(!player.availableTasks || !Array.isArray(player.availableTasks) || player.availableTasks.length===0 || (now - player.dailyTasksGeneratedAt) > DAY_MS){
		generateDailyTasks();
	}
	player.tasks = Array.isArray(player.tasks) ? player.tasks : [];
	// Remove individually expired tasks (24h after their own acceptance time)
	let changed = false;
	player.tasks = player.tasks.filter(t=>{
		if(!t.acceptedAt) return true; // legacy tasks without timestamp kept
		if(now - t.acceptedAt > DAY_MS){
			if(!t.claimed && t.progress < t.goal){ try{ addLog(`Task expired: ${t.pokemon}`,'warn'); }catch(e){} }
			changed = true; return false; // drop expired
		}
		return true;
	});
	if(changed) savePlayer();
	// Initialize or reset selection window counters
	if(typeof player.tasksChosenCount !== 'number') player.tasksChosenCount = player.tasks.length; // legacy init
	// If selection window has elapsed (24h since first selection), and either no tasks remain OR window elapsed, unlock new selections
	if(player.tasksCycleStartedAt && (now - player.tasksCycleStartedAt) > DAY_MS){
		// Reset window only if player is allowed to pick again (rules: window lasts 24h regardless of task completion)
		if(player.tasks.length === 0){
			player.tasksCycleStartedAt = 0; player.tasksChosenCount = 0; savePlayer();
		} else {
			// Keep tasks active aligned to their own counters; window still considered expired so allow new picks once space (<2) is available
			player.tasksCycleStartedAt = 0; player.tasksChosenCount = player.tasks.length; savePlayer();
		}
	}
}

function getUnlockedSpawnPokemon(){
	const names = new Set();
	try{
		(player.unlockedMaps||[]).forEach(idx=>{
			const m = MAPS[idx]; if(!m) return; const spawns = WILD_SPAWNS[m.name] || []; spawns.forEach(s=>{ if(s && s.name) names.add(s.name); });
		});
	}catch(e){}
	return Array.from(names);
}

function generateDailyTasks(){
	if(!player) return;
	const pool = getUnlockedSpawnPokemon();
	if(pool.length===0) return;
	const candidates = [];
	const TARGETS = [50,60,70];
	const used = new Set();
	for(let i=0;i<pool.length && candidates.length<5;i++){
		const pick = pool[Math.floor(Math.random()*pool.length)];
		if(used.has(pick)) continue; used.add(pick);
		const goal = TARGETS[Math.floor(Math.random()*TARGETS.length)];
		// capture baseLevel reference (approximate) for reward calculation later
		const entry = findSpawnEntry(pick);
		const baseLevel = entry && typeof entry.baseLevel === 'number' ? entry.baseLevel : 1;
		candidates.push({ id: 'task_'+Date.now()+'_'+i, pokemon: pick, goal, progress:0, claimed:false, baseLevel });
	}
	player.availableTasks = candidates;
	player.dailyTasksGeneratedAt = Date.now();
	savePlayer();
}

// helper: find first spawn table entry by pokemon name across unlocked maps
function findSpawnEntry(name){
	if(!name) return null;
	try{
		for(const mapName in WILD_SPAWNS){
			const arr = WILD_SPAWNS[mapName] || [];
			for(const e of arr){ if(e && e.name && e.name.toLowerCase() === name.toLowerCase()) return e; }
		}
	}catch(e){ return null; }
	return null;
}

function showTasksModal(){
	ensureDailyTasks();
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=21000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='16px'; box.style.borderRadius='10px'; box.style.minWidth='380px'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	box.innerHTML = '<h3 style="margin:0 0 8px 0">Daily Tasks</h3><div style="font-size:12px;color:var(--muted);margin-bottom:4px">Select up to 2 tasks every 24h. Defeat the listed Pokémon.</div>';
	// Rules summary (concise)
	const rules = document.createElement('div'); rules.style.fontSize='11px'; rules.style.lineHeight='1.4'; rules.style.background='linear-gradient(180deg,#f8fff8,#eef9ee)'; rules.style.border='1px solid rgba(0,0,0,0.07)'; rules.style.borderRadius='6px'; rules.style.padding='8px'; rules.style.marginBottom='8px';
	rules.innerHTML = '<strong>Rules:</strong><br>1) Max 2 active tasks.<br>2) You can only SELECT 2 tasks in any 24h window.<br>3) Completing early does NOT let you pick more until window ends.<br>4) Task list refreshes every 24h.<br>5) Active tasks persist across refresh & expire 24h after acceptance.';
	box.appendChild(rules);
	// countdown container
	const timerEl = document.createElement('div'); timerEl.style.fontSize='12px'; timerEl.style.fontWeight='600'; timerEl.style.marginBottom='8px'; timerEl.style.color='#2a572a'; box.appendChild(timerEl);
	function formatDur(ms){
		ms = Math.max(0, ms);
		const sec = Math.floor(ms/1000);
		const h = Math.floor(sec/3600);
		const m = Math.floor((sec%3600)/60);
		const s = sec%60;
		return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
	}
	const DAY_MS = 86400000;
	const cycleStart = player.tasksCycleStartedAt || player.dailyTasksGeneratedAt || Date.now();
	function updateTimer(){
		let remaining = (cycleStart + DAY_MS) - Date.now();
		if(remaining <= 0){ timerEl.textContent = 'Cycle expired — new tasks will generate soon.'; return; }
		timerEl.textContent = 'Time left: ' + formatDur(remaining);
	}
	updateTimer();
	// task list container (declare before timer functions to avoid reference errors)
	const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='6px';
	function updatePerTaskTimers(){
		const DAY_MS_LOCAL = 86400000;
		if(!list) return; // safety guard
		(player.tasks||[]).forEach(t=>{
			if(!t.acceptedAt){
				const fallback = player.tasksCycleStartedAt || player.dailyTasksGeneratedAt || cycleStart || Date.now();
				try{ t.acceptedAt = fallback; savePlayer(); }catch(e){}
			}
			const taskRow = list.querySelector(`[data-task-id="${t.id}"]`);
			if(!taskRow) return;
			const el = taskRow.querySelector('.task-timer');
			if(!el) return;
			let remaining = (t.acceptedAt + DAY_MS_LOCAL) - Date.now();
			if(remaining <= 0){ el.textContent = 'Expired'; el.style.color = '#a33'; return; }
			const sec = Math.floor(remaining/1000);
			const h = Math.floor(sec/3600);
			const m = Math.floor((sec%3600)/60);
			const s = sec%60;
			el.textContent = `Time left: ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
			if(remaining < 1800000){
				el.style.color = '#a33';
			}else if(remaining < 7200000){
				el.style.color = '#b55';
			}else{
				el.style.color = '#2a572a';
			}
		});
	}
	let timerInt = null;
	// start interval only after list is populated
	const activeTasks = Array.isArray(player.tasks) ? player.tasks : [];
	const maxSelected = activeTasks.length >= 2;
	// If selection window locked, show remaining time until unlock
	(function showSelectionLock(){
		if(player.tasksCycleStartedAt && typeof player.tasksChosenCount === 'number' && player.tasksChosenCount >= 2){
			const now = Date.now(); const DAY_MS = 86400000; const elapsed = now - player.tasksCycleStartedAt;
			if(elapsed < DAY_MS){
				const remain = DAY_MS - elapsed; const sec = Math.floor(remain/1000); const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); const s = sec%60;
				const lockNotice = document.createElement('div'); lockNotice.style.fontSize='11px'; lockNotice.style.fontWeight='600'; lockNotice.style.color='#a33'; lockNotice.style.margin='4px 0 8px 0'; lockNotice.textContent = `Selection locked: ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')} until new picks`; box.appendChild(lockNotice);
				// update every second
				setInterval(()=>{ const now2 = Date.now(); const el2 = lockNotice; if(!el2) return; const elapsed2 = now2 - player.tasksCycleStartedAt; if(elapsed2 >= DAY_MS){ el2.textContent = 'Selection window ended.'; el2.style.color = '#2a572a'; return; } const remain2 = DAY_MS - elapsed2; const sec2 = Math.floor(remain2/1000); const h2 = Math.floor(sec2/3600); const m2 = Math.floor((sec2%3600)/60); const s2 = sec2%60; el2.textContent = `Selection locked: ${h2.toString().padStart(2,'0')}:${m2.toString().padStart(2,'0')}:${s2.toString().padStart(2,'0')} until new picks`; }, 1000);
			}
		}
	})();
	(player.availableTasks||[]).forEach(t=>{
		const row = document.createElement('div'); row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.padding='6px 8px'; row.style.background='linear-gradient(180deg,#f9fff9,#f2fff2)'; row.style.borderRadius='6px';
		const statusWrap = document.createElement('div'); statusWrap.style.display='flex'; statusWrap.style.flexDirection='column';
		const name = document.createElement('div'); name.textContent = `${t.pokemon} • ${t.goal}`; name.style.fontWeight='600'; name.style.fontSize='13px'; statusWrap.appendChild(name);
		// If already selected, show progress below
		const active = activeTasks.find(x=>x.id===t.id);
		if(active){
			const progLine = document.createElement('div'); progLine.style.fontSize='11px'; progLine.style.color='var(--muted)'; progLine.textContent = `Progress: ${active.progress}/${active.goal}`;
			statusWrap.appendChild(progLine);
			// per-task timer line (individual expiry 24h after acceptance)
			const timerLine = document.createElement('div'); timerLine.style.fontSize='11px'; timerLine.style.color='#2a572a'; timerLine.className='task-timer'; statusWrap.appendChild(timerLine);
			row.dataset.taskId = active.id;
		}
		row.appendChild(statusWrap);
		const btn = document.createElement('button'); btn.className='btn small';
		if(active){
			btn.textContent = 'Selected'; btn.disabled = true; btn.classList.add('secondary');
		} else if(maxSelected){
			btn.textContent = 'Max Reached'; btn.disabled = true; btn.classList.add('secondary');
		} else {
			btn.textContent = 'Choose';
			btn.addEventListener('click', ()=>{ chooseTask(t.id); btn.textContent='Selected'; btn.disabled = true; btn.classList.add('secondary'); const progLine = document.createElement('div'); progLine.style.fontSize='11px'; progLine.style.color='var(--muted)'; progLine.textContent = `Progress: 0/${t.goal}`; statusWrap.appendChild(progLine); const timerLine = document.createElement('div'); timerLine.style.fontSize='11px'; timerLine.style.color='#2a572a'; timerLine.className='task-timer'; statusWrap.appendChild(timerLine); row.dataset.taskId = t.id; if(typeof updatePerTaskTimers==='function') updatePerTaskTimers(); });
		}
		row.appendChild(btn);
		list.appendChild(row);
	});
	box.appendChild(list);
	// Kick off timers now that list (and potential rows) exist
	updatePerTaskTimers();
	timerInt = setInterval(()=>{ updateTimer(); updatePerTaskTimers(); }, 1000);
	// clear timer on close
	box.addEventListener('remove', ()=>{ try{ clearInterval(timerInt); }catch(e){} });
	const close = document.createElement('button'); close.className='btn secondary'; close.textContent='Close'; close.style.marginTop='12px'; close.addEventListener('click', ()=>{ overlay.remove(); renderTasks(); }); box.appendChild(close);
	// ensure interval cleared when overlay removed
	overlay.addEventListener('remove', ()=>{ try{ clearInterval(timerInt); }catch(e){} });
	overlay.appendChild(box); document.body.appendChild(overlay);
}

function chooseTask(id){
	if(!player) return;
	player.tasks = Array.isArray(player.tasks) ? player.tasks : [];
	const now = Date.now();
	const DAY_MS = 86400000;
	if(typeof player.tasksChosenCount !== 'number') player.tasksChosenCount = player.tasks.length;
	// If within active selection window and already picked 2 tasks, block
	if(player.tasksCycleStartedAt && (now - player.tasksCycleStartedAt) < DAY_MS && player.tasksChosenCount >= 2){
		showMessage('You already selected 2 tasks in this 24h window.', 'warn');
		return;
	}
	// Enforce max 2 active tasks overall
	if(player.tasks.length >= 2){ showMessage('Maximum 2 active tasks active.', 'warn'); return; }
	const found = (player.availableTasks||[]).find(t=>t.id===id); if(!found) return;
	if(!found.acceptedAt) found.acceptedAt = now;
	player.tasks.push(found);
	// Start or update selection window
	if(!player.tasksCycleStartedAt || (now - player.tasksCycleStartedAt) >= DAY_MS){
		player.tasksCycleStartedAt = now; player.tasksChosenCount = 1;
	} else {
		player.tasksChosenCount = (player.tasksChosenCount||0) + 1;
	}
	savePlayer();
	addLog(`Task accepted: Defeat ${found.goal} ${found.pokemon}`,'info');
	renderTasks();
}

function updateTaskProgress(pokemonName){
	if(!player || !pokemonName) return;
	const tasks = player.tasks || [];
	let changed = false;
	tasks.forEach(t=>{
		if(!t.claimed && (t.pokemon||'').toLowerCase() === (pokemonName||'').toLowerCase()){
			if(t.progress < t.goal){ t.progress++; changed = true; if(t.progress >= t.goal){ addLog(`Task completed: ${t.pokemon}`,'success'); } }
		}
	});
	if(changed){ savePlayer(); renderTasks(); }
}

function claimTaskReward(id){
	if(!player) return;
	const tasks = player.tasks || [];
	const t = tasks.find(x=>x.id===id); if(!t || t.claimed || t.progress < t.goal){ return; }
	// reward logic: exp equal to total player experience gained from defeating all task Pokémon
	// Approximate each encounter wild level as player.level + baseLevel - 1 (average of random offset)
	const baseLevel = typeof t.baseLevel === 'number' ? t.baseLevel : (findSpawnEntry(t.pokemon)?.baseLevel || 1);
	const expectedWildLevel = Math.max(1, (player.level || 1) + baseLevel - 1);
	// Per-win player XP: addExp called with Math.max(5, floor((10 + wildLevel*6)/3))
	const perWinPlayerXp = Math.max(5, Math.floor((10 + expectedWildLevel * 6) / 3));
	const expReward = perWinPlayerXp * t.goal;
	// money scaling: keep prior formula but proportional to goal and wild level
	const moneyReward = Math.round(t.goal * (2 + expectedWildLevel * 0.5));
	const ballsTotal = Math.max(3, Math.min(10, Math.floor(Math.random()*8)+3));
	const ballTypes = ['pokeball','greatball','ultraball'];
	const ballDist = {};
	for(let i=0;i<ballsTotal;i++){ const bt = ballTypes[Math.floor(Math.random()*ballTypes.length)]; ballDist[bt] = (ballDist[bt]||0)+1; }
	// apply rewards
	try{ addExp(expReward); }catch(e){ player.exp = (player.exp||0) + expReward; }
	player.money = (Number(player.money)||0) + moneyReward;
	player.inventory = player.inventory || {};
	Object.keys(ballDist).forEach(k=>{ player.inventory[k] = (Number(player.inventory[k])||0) + ballDist[k]; });
	t.claimed = true;
	savePlayer();
	addLog(`Task reward claimed: +${expReward} XP, +$${moneyReward}, Balls: ${Object.entries(ballDist).map(([k,v])=> v+'x '+niceItemName(k)).join(', ')}`,'success');
	renderInventoryGrid(); updatePanels(); renderTasks();
}

	function renderBallGrid(){
		if(!ballGrid) return;
		ballGrid.innerHTML = '';
		const inv = player.inventory || {};
		const types = [{k:'pokeball',label:'Pokéball'},{k:'greatball',label:'Great Ball'},{k:'ultraball',label:'Ultra Ball'}];
		types.forEach(t=>{
			const count = inv[t.k]||0;
			const cell = document.createElement('div'); cell.className='ball-cell';
			cell.innerHTML = `<span>${t.label}</span><strong>${count}</strong>`;
			ballGrid.appendChild(cell);
		});
	}

	// Right panel buttons: Depot and Market (placeholders)
	const depotBtn = document.getElementById('depotBtn');
	const marketBtn = document.getElementById('marketBtn');
	if(depotBtn) depotBtn.addEventListener('click', ()=>{ if(battleActive){ return showMessage('Cannot open Depot during a battle.', 'warn'); } showDepot(); });
	if(marketBtn) marketBtn.addEventListener('click', ()=>{ if(battleActive){ return showMessage('Cannot open Market during a battle.', 'warn'); } showMarket(); });

	// ------------ Market UI ------------
	let marketOpen = false;
	function showMarket(){
		if(marketOpen) return;
		marketOpen = true;
		// cancel any active wild encounter(s) when entering the market view
		try{ clearWildSpawns(); }catch(e){}
		try{ catchUsage = {}; }catch(e){}
		// no log: opening Market should not add an entry to the encounter log
		// hide existing map area
		const mapAreaEl = document.getElementById('mapArea');
		if(mapAreaEl) mapAreaEl.style.display = 'none';
		const center = document.getElementById('centerArea');
		// ensure center area aligns content to top so market columns line up with side panels
		if(center && !center.classList.contains('market-open')) center.classList.add('market-open');
		if(!center) return;

		// create market container with topbar (Back to Map) and a 3-column layout
		const mr = document.createElement('div'); mr.id = 'marketRoot';

		mr.innerHTML = `
			<div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
				<div style="display:flex;flex-direction:column"><h1 style="margin:0">Market</h1><div style="font-size:13px;color:var(--muted)">Buy and sell items</div></div>
				<div><button id="marketBackTop" class="btn secondary">Back to Map</button></div>
			</div>
			<div class="market-root">
				<div class="market-sell card">
					<h4 style="margin-top:6px">Sell Basket</h4>
					<div id="marketSellBasket" class="market-sell-basket" style="min-height:96px;padding:8px;border-radius:6px;background:linear-gradient(180deg,#fff,#f7fff7);margin-bottom:8px"></div>
					<div style="display:flex;gap:8px;align-items:center"><button id="sellBtn" class="btn">Confirm Sell</button><div id="sellTotal" style="font-weight:700;margin-left:8px">$0</div></div>
				</div>
				<div class="market-buy card">
					<h1 style="margin:0 0 6px 0">Buy Items</h1>
						<div style="margin:4px 0 10px 0;display:flex;gap:8px;align-items:center">
							<input id="marketSearch" type="search" placeholder="Search items..." style="flex:1;padding:8px 10px;border-radius:8px;border:1px solid rgba(15,23,42,0.08);font-size:13px" />
							<button id="marketSearchClear" class="btn secondary" style="white-space:nowrap">Clear</button>
						</div>
					<div class="top-controls" style="margin-top:8px;display:flex;align-items:center;gap:8px">
						<div>Your current balance: <span id="marketBalance">$0</span></div>
						<button id="buyBtn" class="btn">BUY</button>
						<button id="resetBuy" class="btn secondary">RESET SELECTION</button>
						<div style="margin-left:auto">Estimated Total: <strong id="marketEstimate">$0</strong></div>
					</div>
					<div id="marketItems" style="margin-top:10px"></div>
				</div>
			</div>
		`;
		center.appendChild(mr);

		// Build market catalog from available Items sprites (fall back to a small default list)
		const availableItemFiles = [
			'amulet-coin.png','ancient ball.png','beast ball.png','cherish ball.png','coin.png','crystal ball.png','dive ball.png','dream ball.png','dusk ball.png','fast ball.png','friend ball.png','gem.png','great ball.png','heal ball.png','heavy ball.png','hyper-potion.png','love ball.png','master ball.png','max-potion.png','max-revive.png','moon ball.png','net ball.png','nugget.png','poke ball.png','potion.png','premier ball.png','quick ball.png','revive.png','safari ball.png','stardust.png','super-potion.png','ultra ball.png'
		];

		// helper to derive key/label from filename
		function fileToKey(fn){ return fn.replace(/\.png$/i,''); }
		function fileToLabel(fn){ return niceItemName(fileToKey(fn)); }

		// sensible base prices for a few known items; fallback to 10
		const BASE_PRICES = {
			'potion': 10, 'super-potion': 50, 'hyper-potion': 120, 'max-potion': 500,
			'revive': 120, 'max-revive': 400, 'pokéball': 15, 'poke ball': 15, 'great ball': 60, 'ultra ball': 150, 'master ball': 9999,
			'premier ball': 18, 'net ball': 40, 'dive ball': 40, 'friend ball': 35, 'quick ball': 45, 'heavy ball': 30, 'cherish ball': 80,
			'amulet-coin': 200, 'nugget': 250, 'stardust': 80, 'gem': 120, 'coin': 1
		};

		const catalog = availableItemFiles.map(fn=>{
			const key = fileToKey(fn);
			// choose price by normalized key lookup (lowercase)
			const norm = key.toLowerCase();
			const price = (function(){
				if(BASE_PRICES[norm] != null) return BASE_PRICES[norm];
				// try replacing spaces/dashes with common variants
				const alt = norm.replace(/\s+/g,'-');
				if(BASE_PRICES[alt] != null) return BASE_PRICES[alt];
				const alt2 = norm.replace(/\s+/g,''); if(BASE_PRICES[alt2] != null) return BASE_PRICES[alt2];
				return 10;
			})();
			return { key: key, file: fn, label: fileToLabel(fn), price };
		});

		const marketBalanceEl = mr.querySelector('#marketBalance');
		const marketItemsEl = mr.querySelector('#marketItems');
		const marketEstimateEl = mr.querySelector('#marketEstimate');
		const marketSellList = mr.querySelector('#marketSellList');
		const sellTotalEl = mr.querySelector('#sellTotal');

		function refreshBalance(){ if(marketBalanceEl) marketBalanceEl.textContent = '$' + (Number(player.money)||0); }
		refreshBalance();

		// buy selection state
		const buyState = {};
		catalog.forEach(it=> buyState[it.key] = 0);

		let marketSearchQuery = '';
		const searchInput = mr.querySelector('#marketSearch');
		const searchClearBtn = mr.querySelector('#marketSearchClear');
		if(searchInput){
			searchInput.addEventListener('input', ()=>{ marketSearchQuery = (searchInput.value||'').toLowerCase().trim(); renderCatalog(); });
		}
		if(searchClearBtn){
			searchClearBtn.addEventListener('click', ()=>{ marketSearchQuery=''; if(searchInput) searchInput.value=''; renderCatalog(); });
		}
		function renderCatalog(){
			// preserve scroll position so users don't lose their place when quantities update
			const prevScroll = marketItemsEl ? marketItemsEl.scrollTop : 0;
			marketItemsEl.innerHTML = '';
			const grid = document.createElement('div'); grid.className = 'catalog-grid';
			catalog.forEach(it=>{
				if(marketSearchQuery){
					const hay = (it.label||'') + ' ' + (it.key||'') + ' ' + (it.desc||'');
					if(hay.toLowerCase().indexOf(marketSearchQuery) === -1) return;
				}
				const card = document.createElement('div'); card.className = 'market-item';
				const thumb = document.createElement('div'); thumb.className = 'thumb';
				const img = document.createElement('img'); img.alt = it.key;
				// prefer the exact file name when available (supports spaces like 'poke ball.png')
				img.src = `PokeLegion/Items/${it.file}`;
				img.onerror = function(){ this.style.opacity = '0.0'; };
				thumb.appendChild(img);

				const meta = document.createElement('div'); meta.className = 'meta';
				const title = document.createElement('div'); title.className = 'market-item-name'; title.textContent = it.label || niceItemName(it.key);
				const desc = document.createElement('div'); desc.className = 'market-item-desc'; desc.textContent = it.desc || (it.help || '');
				meta.appendChild(title); if(desc.textContent) meta.appendChild(desc);

				const actions = document.createElement('div'); actions.className = 'actions';
				const price = document.createElement('div'); price.className = 'market-item-price'; price.textContent = '$' + it.price;
				const qty = document.createElement('div'); qty.className = 'market-item-qty';
				const dec = document.createElement('button'); dec.textContent = '-'; dec.setAttribute('data-op','dec'); dec.setAttribute('data-key', it.key);
				const span = document.createElement('span'); span.className = 'qty'; span.setAttribute('data-key', it.key); span.textContent = buyState[it.key] || 0;
				const inc = document.createElement('button'); inc.textContent = '+'; inc.setAttribute('data-op','inc'); inc.setAttribute('data-key', it.key);
				qty.appendChild(dec); qty.appendChild(span); qty.appendChild(inc);
				const cost = document.createElement('div'); cost.className = 'market-item-cost'; cost.setAttribute('data-key','cost-' + it.key); cost.textContent = '$0';
				actions.appendChild(price); actions.appendChild(qty); actions.appendChild(cost);

				// attach per-item handlers that update only the qty and cost nodes
				dec.addEventListener('click', ()=>{
					buyState[it.key] = Math.max(0, (buyState[it.key]||0) - 1);
					span.textContent = buyState[it.key] || 0;
					const costVal = Number(it.price || 0) * Number(buyState[it.key] || 0);
					cost.textContent = '$' + costVal;
					updateEstimate();
				});
				inc.addEventListener('click', ()=>{
					buyState[it.key] = Math.min(999, (buyState[it.key]||0) + 1);
					span.textContent = buyState[it.key] || 0;
					const costVal = Number(it.price || 0) * Number(buyState[it.key] || 0);
					cost.textContent = '$' + costVal;
					updateEstimate();
				});

				card.appendChild(thumb); card.appendChild(meta); card.appendChild(actions);
				grid.appendChild(card);
			});
			marketItemsEl.appendChild(grid);
			// restore prior scroll position (clamped)
			try{ marketItemsEl.scrollTop = Math.min(prevScroll || 0, marketItemsEl.scrollHeight); }catch(e){}

			// per-item handlers are attached during card creation to avoid re-rendering the whole grid
		}

		function updateEstimate(){
			let total = 0;
			catalog.forEach(it=>{
				const qty = Number(buyState[it.key]||0);
				const cost = Number(it.price || 0) * qty;
				total += cost;
				// update per-item cost in the card if present
				const costEl = marketItemsEl.querySelector('[data-key="cost-' + it.key + '"]');
				if(costEl) costEl.textContent = '$' + cost;
			});
			marketEstimateEl.textContent = '$' + total;
			return total;
		}
		renderCatalog(); updateEstimate();

		// sell list state: map key->count
		const sellState = {};
		// Render sell inventory as a drop-target list; use catalog as price reference
		// sell-basket workflow: inventory can be dropped into the basket, basket accumulates counts
		function renderSellInventory(){
			// No inventory list here — selling works exclusively by dragging inventory items into the basket.
			const basketArea = document.getElementById('marketSellBasket');
			if(!basketArea) return;
			basketArea.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:6px">Drop items here from your inventory to add them to the sell basket.</div>';
			basketArea.addEventListener('dragenter', function(e){ e.preventDefault(); basketArea.classList.add('basket-highlight'); });
			basketArea.addEventListener('dragover', function(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
			basketArea.addEventListener('dragleave', function(e){ try{ basketArea.classList.remove('basket-highlight'); }catch(err){} });
			basketArea.addEventListener('drop', function(e){ e.preventDefault(); try{ basketArea.classList.remove('basket-highlight'); }catch(err){} const key = e.dataTransfer.getData('text/plain'); if(key){ addToSellBasket(key,1); try{ animateAddToBasket(key, e.clientX, e.clientY); }catch(err){} } });
		}

		// animate a small clone image flying into the sell basket for better feedback
		function animateAddToBasket(key, startX, startY){
			try{
				const clone = document.createElement('img'); clone.className = 'fly-clone';
				clone.src = `PokeLegion/Items/${key}.png`;
				clone.alt = key;
				clone.style.left = (startX - 24) + 'px'; clone.style.top = (startY - 24) + 'px'; clone.style.opacity = '1'; clone.style.width = '48px'; clone.style.height = '48px';
				document.body.appendChild(clone);
				const target = document.getElementById('marketSellBasket');
				if(!target){ setTimeout(()=>{ try{ clone.remove(); }catch(e){} }, 600); return; }
				const tr = target.getBoundingClientRect();
				const tx = tr.left + tr.width/2 - 24; const ty = tr.top + tr.height/2 - 24;
				// force layout then animate
				requestAnimationFrame(()=>{
					clone.style.transform = `translate(${tx - (startX - 24)}px, ${ty - (startY - 24)}px) scale(.6)`;
					clone.style.opacity = '0.9';
				});
				setTimeout(()=>{ try{ clone.style.opacity = '0'; setTimeout(()=>{ try{ clone.remove(); }catch(e){} }, 300); }catch(e){} }, 580);
			}catch(e){ console.warn('animateAddToBasket failed', e); }
		}

		function normalizeKey(s){ return (s||'').toString().toLowerCase().replace(/[^a-z0-9]/g,''); }
		function priceForKey(key){
			if(!key) return 1;
			// Try direct match first
			let found = catalog.find(i=>i.key === key);
			if(!found){
				const nk = normalizeKey(key);
				found = catalog.find(i=> normalizeKey(i.key) === nk );
			}
			return found ? Math.max(1, Math.floor(found.price * 0.5)) : 1;
		}

		function addToSellBasket(key, amount){
			const available = Number(player.inventory[key]||0);
			if(available <= 0) { showMessage('No items available to add.', 'warn'); return; }
			sellState[key] = Math.max(0, (sellState[key]||0) + Number(amount));
			if(sellState[key] > available) sellState[key] = available;
			renderSellBasket();
		}

		function renderSellBasket(){
			const basket = document.getElementById('marketSellBasket'); if(!basket) return;
			// preserve instruction if present at top
			const instr = basket.querySelector('div') ? basket.querySelector('div').outerHTML : '<div style="font-size:13px;color:var(--muted);padding:6px">Drop items here from your inventory to add them to the sell basket.</div>';
			basket.innerHTML = instr;
			let total = 0;
			const list = document.createElement('div'); list.style.display = 'flex'; list.style.flexDirection = 'column'; list.style.gap = '8px'; list.style.marginTop = '8px';
			Object.keys(sellState).forEach(k=>{
				const cnt = sellState[k] || 0; if(cnt<=0) return;
				const price = priceForKey(k);
				const row = document.createElement('div'); row.className = 'sell-basket-row';
				row.innerHTML = `<div style="display:flex;flex-direction:column"><div style="font-weight:700">${escapeHtml(niceItemName(k))}</div><div style="font-size:12px;color:var(--muted)">Unit: $${price} &middot; Qty: <span class=\"qty\">${cnt}</span></div></div><div style=\"display:flex;align-items:center;gap:8px\"><div style=\"font-weight:800\">$${price*cnt}</div><div class=\"sell-qty-controls\" style=\"display:flex;align-items:center;gap:6px;margin-left:6px\"><button data-op=\"dec\" data-key=\"${k}\">-</button><button data-op=\"inc\" data-key=\"${k}\">+</button></div><button class=\"sell-remove\" data-key=\"${k}\">x</button></div>`;
				list.appendChild(row);
				total += price * cnt;
			});
			basket.appendChild(list);
			const sellTotalEl2 = document.getElementById('sellTotal'); if(sellTotalEl2) sellTotalEl2.textContent = '$' + total;
			// wire qty buttons and remove inside the generated list
			list.querySelectorAll('button').forEach(btn=>{
				const op = btn.getAttribute('data-op'); const key = btn.getAttribute('data-key');
				if(op){ btn.addEventListener('click', ()=>{ if(op==='inc'){ addToSellBasket(key,1); } else { sellState[key] = Math.max(0, (sellState[key]||0)-1); if(sellState[key]===0) delete sellState[key]; renderSellBasket(); } }); }
				if(btn.classList.contains('sell-remove')){ btn.addEventListener('click', ()=>{ delete sellState[key]; renderSellBasket(); }); }
			});
		}

		// buy action
		mr.querySelector('#buyBtn').addEventListener('click', ()=>{
			const total = updateEstimate();
			if(total <= 0){ showMessage('No items selected.', 'warn'); return; }
			if((player.money||0) < total){ showMessage('Not enough money.', 'error'); return; }
			// deduct and add to inventory
			player.money = (Number(player.money)||0) - total;
			catalog.forEach(it=>{
				const n = buyState[it.key]||0; if(n>0){ player.inventory[it.key] = (Number(player.inventory[it.key])||0) + n; }
			});
			showMessage('Purchase complete.', 'info');
			try{
				// Only log items that were actually purchased (qty > 0)
				const purchased = {};
				Object.keys(buyState || {}).forEach(k=>{ const v = Number(buyState[k]||0); if(v>0) purchased[k] = v; });
				if(Object.keys(purchased).length > 0) addLog('Bought items: ' + JSON.stringify(purchased));
				else addLog('Purchase completed (no items bought).');
			}catch(e){ addLog('Purchase completed.'); }
			// reset buy state
			catalog.forEach(it=> buyState[it.key] = 0);
			renderCatalog(); updatePanels(); refreshBalance();
		});

		mr.querySelector('#resetBuy').addEventListener('click', ()=>{ catalog.forEach(it=> buyState[it.key]=0); renderCatalog(); updateEstimate(); });

		// sell action: confirm basket once
		mr.querySelector('#sellBtn').addEventListener('click', ()=>{
			// compute sell totals from basket
			let total = 0; const lines = [];
			Object.keys(sellState).forEach(k=>{ const c = sellState[k]||0; if(c>0){ const price = priceForKey(k); total += price * c; lines.push({key:k,count:c,price}); } });
			if(total <= 0){ showMessage('Sell basket is empty. Drag items into it to sell.','warn'); return; }
			// show confirm overlay summarizing basket
			const overlay = document.createElement('div'); overlay.className = 'sell-confirm-overlay';
			let html = `<div class="sell-confirm"><h3>Confirm Sell</h3><div style="max-height:260px;overflow:auto;margin-top:8px">`;
			lines.forEach(l=>{ html += `<div style="display:flex;justify-content:space-between;padding:6px 0"><div>${escapeHtml(niceItemName(l.key))} x${l.count}</div><div>$${l.price*l.count}</div></div>`; });
			html += `</div><div style="margin-top:12px;font-weight:700">Total: $${total}</div><div style="margin-top:12px;display:flex;gap:8px"><button id="confirmSell" class="btn">Confirm</button><button id="cancelSell" class="btn secondary">Cancel</button></div></div>`;
			overlay.innerHTML = html; document.body.appendChild(overlay);
			overlay.querySelector('#cancelSell').addEventListener('click', ()=>{ overlay.remove(); });
				overlay.querySelector('#confirmSell').addEventListener('click', ()=>{
					// apply sale
					Object.keys(sellState).forEach(k=>{ const c = sellState[k]||0; if(c>0){ player.inventory[k] = Math.max(0, (player.inventory[k]||0) - c); } });
					player.money = (Number(player.money)||0) + total;
					// build itemized sold summary for the log
					try{
						const parts = lines.map(l => `${niceItemName(l.key)} x${l.count} ($${l.price * l.count})`);
						const summary = parts.length > 0 ? `Sold ${parts.join(', ')} • Total: $${total}` : `Sold items for $${total}`;
						showMessage(summary,'info');
						addLog(summary, 'info');
					}catch(e){
						showMessage(`Sold items for $${total}`,'info');
						addLog(`Sold items for $${total}`);
					}
					// clear basket
					for(const k in sellState) delete sellState[k];
					overlay.remove(); renderSellInventory(); renderSellBasket(); renderInventoryGrid(); updatePanels();
				});
		});

		// back to map (top button)
		const backBtn = mr.querySelector('#marketBackTop');
		if(backBtn) backBtn.addEventListener('click', ()=>{ hideMarket(); });

		// initial render of sell inventory
		renderSellInventory();
	}

	function hideMarket(){
		if(!marketOpen) return;
		marketOpen = false;
		const mr = document.getElementById('marketRoot'); if(mr && mr.parentNode) mr.parentNode.removeChild(mr);
		const mapAreaEl = document.getElementById('mapArea'); if(mapAreaEl) mapAreaEl.style.display = '';
		// restore center alignment
		const center = document.getElementById('centerArea'); if(center && center.classList.contains('market-open')) center.classList.remove('market-open');
		// re-render map and panels
		renderMap(); renderPlayer(); updatePanels();
	}

	function renderPartyGrid(){
		if(!partyList) return;
		partyList.innerHTML='';
		const list=document.createElement('div'); list.className='party-list';
		const party = Array.isArray(player.party)?player.party:[];
		for(let i=0;i<6;i++){
			const slot=document.createElement('div'); slot.className='party-slot'; slot.dataset.index=String(i);
			const member=party[i];
			if(member){
				try{ ensurePokemonHasTypes(member);}catch(e){}
				const name=String(member.name||member);
				const lvl=Number(member.level)||1; const exp=Number(member.exp)||0;
				assignBallToPokemon(member);
				if(typeof member.hp!=='number') member.hp=30+lvl*5;
				if(typeof member.currentHp!=='number') member.currentHp=member.hp;

				// Left column
				const left=document.createElement('div'); left.className='left-col';
				const ball=document.createElement('img'); ball.className='ball-img'; ball.alt=member.ball||'ball'; try{ setImageSrcWithFallback(ball,getBallImageCandidates(member.ball||'Poke Ball')); }catch(e){}
				left.appendChild(ball);
				const sprite=document.createElement('img'); sprite.className='sprite-img'; sprite.alt=name; sprite.dataset.index=String(i);
				const fileKey=name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
				const candidates=[`PokeLegion/pokemon/${fileKey}.png`,`PokeLegion/Avatars/${fileKey}.png`,`PokeLegion/Items/${fileKey}.png`];
				let ci=0; sprite.onerror=function(){ci++; if(ci<candidates.length) sprite.src=candidates[ci]; else { sprite.remove(); const fallback=document.createElement('div'); fallback.textContent=name.charAt(0).toUpperCase(); fallback.style.fontSize='28px'; left.appendChild(fallback);} };
				sprite.src=candidates[0]; left.appendChild(sprite); slot.appendChild(left);

				// Middle column
				const mid=document.createElement('div'); mid.className='mid-col';
				const header=document.createElement('div'); header.className='header-row';
				const nameBanner=document.createElement('div'); nameBanner.className='name-banner'; nameBanner.textContent=name; header.appendChild(nameBanner);
				const typesRow=document.createElement('div'); typesRow.className='types-row';
				const types=Array.isArray(member.types)?member.types:['normal'];
				types.forEach(tp=>{ const tb=document.createElement('span'); tb.className='type-badge'; tb.textContent=String(tp).charAt(0).toUpperCase()+String(tp).slice(1); tb.style.background=getTypeColor(tp); tb.style.color='#fff'; tb.style.border='1px solid rgba(0,0,0,0.15)'; typesRow.appendChild(tb); });
				header.appendChild(typesRow);
				const lvlBadge=document.createElement('div'); lvlBadge.className='level-badge'; lvlBadge.textContent='Lv '+lvl; header.appendChild(lvlBadge);
				mid.appendChild(header);

				const bars=document.createElement('div'); bars.className='bars';
				const barsRow=document.createElement('div'); barsRow.className='bars-row';
				// HP bar group
				const hpRow=document.createElement('div'); hpRow.className='bar-row hp-row';
				const hpLabel=document.createElement('div'); hpLabel.className='label'; hpLabel.textContent='HP'; hpRow.appendChild(hpLabel);
				const hpBar=document.createElement('div'); hpBar.className='bar hp'; hpBar.dataset.kind='hp';
				const hpFill=document.createElement('div'); hpFill.className='fill'; hpFill.style.width=Math.max(0,Math.min(100,Math.round(member.currentHp/member.hp*100)))+'%';
				const hpVal=document.createElement('div'); hpVal.className='value'; hpVal.textContent=`${member.currentHp}/${member.hp}`;
				hpBar.appendChild(hpFill); hpBar.appendChild(hpVal); hpRow.appendChild(hpBar);
				barsRow.appendChild(hpRow);
				// EXP bar group
				const expNeed=xpForNextLevel(lvl); const expPct=Math.max(0,Math.min(100,Math.round(exp/Math.max(1,expNeed)*100)));
				const expRow=document.createElement('div'); expRow.className='bar-row exp-row';
				const expLabel=document.createElement('div'); expLabel.className='label'; expLabel.textContent='EXP'; expRow.appendChild(expLabel);
				const expBar=document.createElement('div'); expBar.className='bar exp'; expBar.dataset.kind='exp';
				const expFill=document.createElement('div'); expFill.className='fill'; expFill.style.width=expPct+'%';
				const expVal=document.createElement('div'); expVal.className='value'; expVal.textContent=`${exp}/${expNeed}`;
				expBar.appendChild(expFill); expBar.appendChild(expVal); expRow.appendChild(expBar);
				barsRow.appendChild(expRow);
				bars.appendChild(barsRow); mid.appendChild(bars); slot.appendChild(mid);

				// Right column
				const right=document.createElement('div'); right.className='right-col';
				const healBtn=document.createElement('button'); healBtn.type='button'; healBtn.className='heal-btn'; healBtn.textContent='HEAL'; healBtn.addEventListener('click',()=>{ showHealModal(i); }); right.appendChild(healBtn); slot.appendChild(right);

				slot.addEventListener('mouseenter',(e)=>{ const need2=xpForNextLevel(lvl); showExpTooltip(slot,`${exp}/${need2} EXP`,e); });
				slot.addEventListener('mousemove',moveExpTooltip); slot.addEventListener('mouseleave',hideExpTooltip);
			} else { slot.classList.add('empty'); slot.innerHTML='<div style="font-weight:600;font-size:14px;opacity:.5">(empty)</div>'; }
			list.appendChild(slot);
		}
		partyList.appendChild(list);
	}

// Update a single party slot DOM to reflect current data for that index.
function updatePartySlot(idx){
	try{
		if(!partyList) { updatePanels(); return; }
		const slot = partyList.querySelector('.party-list .party-slot[data-index="' + String(idx) + '"]');
		const member = (Array.isArray(player.party) ? player.party[idx] : null);
		if(!slot){ renderPartyGrid(); return; }
		if(!member){ slot.classList.add('empty'); slot.innerHTML = '<div style="font-weight:700;font-size:18px;opacity:.4">(empty)</div>'; return; }
		try{ ensurePokemonHasTypes(member); }catch(e){}
		if(typeof member.hp !== 'number') member.hp = 30 + (member.level||1) * 5;
		if(typeof member.currentHp !== 'number') member.currentHp = member.hp;
		const lvl = Number(member.level)||1; const exp = Number(member.exp)||0; const need = xpForNextLevel(lvl);
		// level badge
		// level badge
		const lvlBadge = slot.querySelector('.level-badge'); if(lvlBadge) lvlBadge.textContent = 'Lv ' + lvl;
		// ball image
		const ballImg = slot.querySelector('.ball-img'); if(ballImg) try{ setImageSrcWithFallback(ballImg, getBallImageCandidates(member.ball || 'Poke Ball')); }catch(e){}
		// hp
		const hpBar = slot.querySelector('.bar.hp'); if(hpBar){
			const fill = hpBar.querySelector('.fill'); const val = hpBar.querySelector('.value');
			const hpPct = Math.max(0,Math.min(100,Math.round((member.currentHp/member.hp)*100)));
			if(fill) fill.style.width = hpPct + '%'; if(val) val.textContent = `${member.currentHp}/${member.hp}`;
		}
		// exp
		const expBar = slot.querySelector('.bar.exp'); if(expBar){
			const fill = expBar.querySelector('.fill'); const val = expBar.querySelector('.value');
			const expPct = Math.max(0,Math.min(100,Math.round((exp/Math.max(1,need))*100)));
			if(fill) fill.style.width = expPct + '%'; if(val) val.textContent = `${exp}/${need}`;
		}
		// sprite
		const spriteImg = slot.querySelector('.sprite-img'); if(spriteImg){
			const fileKey = String(member.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'_');
			const src = `PokeLegion/pokemon/${fileKey}.png`;
			if(!spriteImg.src.includes(src)) spriteImg.src = src;
		}
		// types
		const typesRow = slot.querySelector('.types-row'); if(typesRow){
			typesRow.innerHTML=''; const types = Array.isArray(member.types)?member.types:['normal'];
			types.forEach(tp=>{ const tb=document.createElement('span'); tb.className='type-badge'; tb.textContent = String(tp).charAt(0).toUpperCase()+String(tp).slice(1); tb.style.background=getTypeColor(tp); tb.style.color='#fff'; tb.style.border='1px solid rgba(0,0,0,0.15)'; typesRow.appendChild(tb); });
		}
	}catch(e){ console.warn('updatePartySlot failed', e); try{ renderPartyGrid(); }catch(err){} }
}

	// Start a timed healing session run by Nurse Joey. durationMs is the total time to heal based
	// on party total levels (base rate: 10 levels/sec). Shows a progress UI and heals all party
	// members to full HP at completion. Disables the Nurse button while active.
	function startNurseHealing(durationMs){
		try{
			if(window._nurseHealingActive) return showMessage('Nurse Joey is already healing your party.', 'warn');
			if(battleActive) return showMessage('Cannot start healing during a battle.', 'warn');
			const btn = document.getElementById('nurseJoeyBtn'); if(btn) btn.disabled = true;
			window._nurseHealingActive = true;
			// Lock movement/battles while healing is in progress
			try{ setBattleActive(true); }catch(e){ console.warn('Failed to activate battle lock', e); }
			durationMs = Number(durationMs) || 1000; if(durationMs < 500) durationMs = 500;

			const overlay = document.createElement('div'); overlay.id = 'nurseHealingOverlay';
			overlay.style.position = 'fixed'; overlay.style.left = 0; overlay.style.top = 0; overlay.style.right = 0; overlay.style.bottom = 0;
			overlay.style.background = 'rgba(0,0,0,0.45)'; overlay.style.display = 'flex'; overlay.style.alignItems = 'center'; overlay.style.justifyContent = 'center'; overlay.style.zIndex = 30000;

			const box = document.createElement('div'); box.style.background = '#fff'; box.style.padding = '16px'; box.style.borderRadius = '10px'; box.style.minWidth = '320px'; box.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
			box.innerHTML = `<div style="font-weight:700;margin-bottom:8px">Nurse Joey</div><div style="margin-bottom:12px;color:var(--muted)">Healing your party. Please wait...</div>`;

			const progWrap = document.createElement('div'); progWrap.style.width = '360px'; progWrap.style.maxWidth = '80vw'; progWrap.style.background = '#eee'; progWrap.style.borderRadius = '8px'; progWrap.style.padding = '6px';
			const prog = document.createElement('div'); prog.style.height = '14px'; prog.style.width = '0%'; prog.style.background = '#6fcf97'; prog.style.borderRadius = '6px'; prog.style.transition = 'width .2s linear';
			progWrap.appendChild(prog);
			const lbl = document.createElement('div'); lbl.style.marginTop = '8px'; lbl.style.fontSize = '13px'; lbl.style.textAlign = 'center'; lbl.textContent = '0%';
			box.appendChild(progWrap); box.appendChild(lbl);

			overlay.appendChild(box); document.body.appendChild(overlay);
			// Trigger initial grid column adjustment now that modal is in the DOM
			try{ if(depotCol && depotCol._adjustDepotGridColumns) depotCol._adjustDepotGridColumns(); }catch(e){}

			const start = Date.now(); const end = start + durationMs;
			const tick = 150; // ms
			const timer = setInterval(()=>{
				try{
					const now = Date.now(); const pct = Math.min(100, Math.round(((now - start) / Math.max(1, durationMs)) * 100));
					prog.style.width = pct + '%'; lbl.textContent = pct + '%';
					if(now >= end){ clearInterval(timer);
						// heal all party members to full
						const party = Array.isArray(player.party) ? player.party : [];
						let healed = 0;
						party.forEach((p, idx)=>{
							if(!p) return;
							if(typeof p.hp !== 'number') p.hp = 30 + (p.level||1) * 5;
							if(typeof p.currentHp !== 'number') p.currentHp = p.hp;
							if((Number(p.currentHp) || 0) < (Number(p.hp) || 0)) healed++;
							p.currentHp = p.hp;
							try{ updatePartySlot(idx); }catch(e){}
						});
						savePlayer();
						// cleanup UI
						try{ if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); }catch(e){}
						window._nurseHealingActive = false; if(btn) btn.disabled = false;
						// unlock movement/battles now that healing is done
						try{ setBattleActive(false); }catch(e){ console.warn('Failed to deactivate battle lock', e); }
						updatePanels();
						const secs = Math.round(durationMs/1000);
						addLog(`Nurse Joey healed party to full HP in ${secs}s (${healed} Pokémon healed).`, 'info');
						showMessage(`Nurse Joey finished healing your party (${healed} healed).`, 'info', 4000);
					}
				}catch(e){ clearInterval(timer); window._nurseHealingActive = false; if(btn) btn.disabled = false; if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); console.warn('Nurse healing failed', e); }
			}, tick);
		}catch(e){ console.warn('startNurseHealing failed', e); window._nurseHealingActive = false; const btn = document.getElementById('nurseJoeyBtn'); if(btn) btn.disabled = false; }
	}

	function niceItemName(key){
		if(!key) return '';
		// common mappings
		const map = {
			'pokeball':'Pokéball', 'greatball':'Great Ball', 'ultraball':'Ultra Ball',
			'pokeballs':'Pokéball', 'poke ball':'Pokéball', 'poke_ball':'Pokéball'
		};
		if(map[key.toLowerCase()]) return map[key.toLowerCase()];
		// otherwise prettify: replace underscores/dashes with spaces and capitalize words
		const parts = key.replace(/[_-]+/g,' ').split(' ').filter(Boolean);
		return parts.map(p=>p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
	}

// -------------------- Per-Pokémon progression & ball helpers --------------------
// Persisted mapping key for PokeLegion progression
const POKE_PROGRESS_KEY = 'pokeLegionPokeProgress';
let pokeProgress = {};
function loadPokeProgress(){
	try{ const raw = localStorage.getItem(POKE_PROGRESS_KEY); pokeProgress = raw ? JSON.parse(raw) : {}; }catch(e){ pokeProgress = {}; }
}
function savePokeProgress(){ try{ localStorage.setItem(POKE_PROGRESS_KEY, JSON.stringify(pokeProgress || {})); }catch(e){} }

function ensurePokemonProgression(poke){
	if(!poke) return;
	if(typeof poke.level !== 'number') poke.level = 1;
	if(typeof poke.exp !== 'number') poke.exp = 0;
	if(typeof poke.currentHp !== 'number') poke.currentHp = poke.hp || 1;
	// ensure a small 'power' stat exists so leveled pokemon become stronger in duels
	if(typeof poke.power !== 'number') poke.power = Math.max(0, Math.floor((poke.level || 1) / 2));
}

function applyStoredProgressToPokemon(p){
	if(!p || !p.name) return;
	const key = p.name;
	const stored = pokeProgress[key];
	if(!stored) return;
	try{
		const lvl = Number(stored.level) || 1;
		const exp = Number(stored.exp) || 0;
		p.level = lvl;
		p.exp = exp;
		// If hp was persisted use it; otherwise fall back to base species hp without extra scaling
		if(typeof stored.hp === 'number'){
			p.hp = Math.max(1, Number(stored.hp));
		}else{
			// keep existing p.hp (species base) if present
			p.hp = Math.max(1, Number(p.hp) || 30 + (lvl||1)*5);
		}
		// Ensure currentHp does not exceed hp
		p.currentHp = Math.min(Number(p.currentHp) || p.hp, p.hp);
		// Restore power if stored, else derive minimally from level
		if(typeof stored.power === 'number'){
			p.power = Number(stored.power);
		}else if(typeof p.power !== 'number'){
			p.power = Math.max(0, Math.floor(p.level / 2));
		}
	}catch(e){}
}

// Ensure a pokemon object has a `types` array. Attempts to infer types from
// spawn tables (`WILD_SPAWNS`) by name, falls back to `p.type` if present,
// otherwise assigns ['normal'] as a safe default.
function findTypesForName(name){
	try{
		if(!name) return null;
		const target = normalizeName(String(name));
		for(const k in WILD_SPAWNS){
			const pool = WILD_SPAWNS[k] || [];
			for(const entry of pool){
				if(entry && entry.name && normalizeName(entry.name) === target){
					return Array.isArray(entry.types) ? entry.types.slice() : null;
				}
			}
		}
	}catch(e){}
	return null;
}

function ensurePokemonHasTypes(p){
	if(!p) return;
	// Normalize existing array; if it's only 'normal' we will attempt enrichment
	if(Array.isArray(p.types)){
		p.types = p.types.map(t=> String(t||'').toLowerCase());
		const nonNormal = p.types.filter(t=> t && t.toLowerCase() !== 'normal');
		if(nonNormal.length > 0) return; // already has at least one real type
		// else continue to attempt improved inference
	}
	// Starter canonical types (base forms only)
	const STARTER_TYPE_MAP = {
		bulbasaur:['grass','poison'],
		charmander:['fire'], squirtle:['water'],
		chikorita:['grass'], cyndaquil:['fire'], totodile:['water'],
		treecko:['grass'], torchic:['fire'], mudkip:['water']
	};
	const nameKey = String(p.name||p.species||p.id||'').toLowerCase();
	if(STARTER_TYPE_MAP[nameKey]){ p.types = STARTER_TYPE_MAP[nameKey].slice(); return; }
	// if old single-key `type` exists, convert to array
	if(p.type && !Array.isArray(p.types)){
		try{ p.types = [String(p.type).toLowerCase()]; return; }catch(e){}
	}
	// try to find via spawn tables
	const found = findTypesForName(p.name || p.species || p.id || '');
	if(found && found.length) { p.types = found.slice().map(x=>String(x).toLowerCase()); return; }
	// last-resort default
	p.types = ['normal'];
}

function addPokemonExpTo(poke, amount){
	if(!poke || !amount || amount <= 0) return;
	ensurePokemonProgression(poke);
	poke.exp = (Number(poke.exp) || 0) + Number(amount);
	let leveled = false;
	while(true){
		const need = xpForNextLevel(Number(poke.level) || 1);
		if(!isFinite(need) || poke.exp < need) break;
		poke.exp -= need;
		const old = poke.level;
		poke.level = Math.min(100, old + 1);
		leveled = true;
		// give a slightly larger HP gain per level so increases are noticeable
		const baseForGain = Number(poke.hp) || Number(p.hp) || 40;
		const hpGain = Math.max(1, Math.floor(baseForGain * 0.05));
		poke.hp = (Number(poke.hp) || 0) + hpGain;
		// heal the pokemon by the HP gained (but not beyond new max)
		poke.currentHp = Math.min((poke.currentHp || 0) + hpGain, poke.hp);
		// also add a small 'power' boost on level up so duels favor higher-level mons
		if(typeof poke.power !== 'number') poke.power = 0;
		poke.power = Number(poke.power) + 1;
		addLog(`${poke.name} subió de nivel: ${old} → ${poke.level}`);
	}
	try{
		if(poke && poke.name){
			pokeProgress = pokeProgress || {};
			pokeProgress[poke.name] = { level: poke.level, exp: poke.exp, hp: poke.hp, power: poke.power };
			savePokeProgress();
		}
	}catch(e){}
}

function assignBallToPokemon(p){
	if(!p) return;
	// If a ball is already set, canonicalize its display name and return.
	if(p.ball){
		try{ p.ball = niceItemName(p.ball); }catch(e){}
		return;
	}
	try{
		const starterMap = {
			'bulbasaur': 'Friend Ball', 'charmander': 'Cherish Ball', 'squirtle': 'Dive Ball',
			'chikorita': 'Friend Ball', 'cyndaquil': 'Cherish Ball', 'totodile': 'Dive Ball',
			'treecko': 'Friend Ball', 'torchic': 'Cherish Ball', 'mudkip': 'Dive Ball'
		};
		const lowerName = String(p.name || '').toLowerCase();
		if(starterMap[lowerName]) { p.ball = starterMap[lowerName]; return; }
		const types = Array.isArray(p.types) ? p.types.map(t=>String(t).toLowerCase()) : [];
		if(p.isShiny){ p.ball = 'Master Ball'; return; }
		if(types.includes('psychic')){ p.ball = 'Heal Ball'; return; }
		if(types.includes('grass')){ p.ball = 'Friend Ball'; return; }
		if(types.includes('fire') || types.includes('fighting')){ p.ball = 'Cherish Ball'; return; }
		if(types.includes('electric')){ p.ball = 'Quick Ball'; return; }
		if(types.includes('bug')){ p.ball = 'Net Ball'; return; }
		if(types.includes('water')){ p.ball = 'Dive Ball'; return; }
		if(types.includes('ghost')){ p.ball = 'Dusk Ball'; return; }
		if(types.includes('fairy')){ p.ball = 'Dream Ball'; return; }
		if(types.includes('dark')){ p.ball = 'Moon Ball'; return; }
		if(types.includes('ice')){ p.ball = 'Crystal Ball'; return; }
		if(types.includes('rock') || types.includes('ground')){ p.ball = 'Ancient Ball'; return; }
		if(types.includes('steel')){ p.ball = 'Heavy Ball'; return; }
		p.ball = 'Poke Ball';
		// normalize final assigned value to the pretty form
		try{ p.ball = niceItemName(p.ball); }catch(e){}
	}catch(e){ p.ball = p.ball || 'Poke Ball'; }
}

function getBallImagePath(ballName){
	if(!ballName) return '';
	try{
		let fname = String(ballName).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
		fname = fname.toLowerCase().trim().replace(/\s+/g,' ').replace(/[^a-z0-9 \-\.]/g,'');
		return `PokeLegion/Items/${fname}.png`;
	}catch(e){
		const fname = String(ballName).toLowerCase().trim().replace(/\s+/g,' ').replace(/[^a-z0-9 \-\.]/g,'');
		return `PokeLegion/Items/${fname}.png`;
	}
}

// Return an ordered list of candidate image paths for a given ball name.
function getBallImageCandidates(ballName){
	try{
		if(!ballName) return [];
		let base = String(ballName).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
		base = base.toLowerCase().trim();
		// keep only letters/numbers and spaces for candidate generation
		const cleaned = base.replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
		const parts = cleaned.split(' ').filter(Boolean);
		const joined = parts.join('');
		const underscored = parts.join('_');
		const dashed = parts.join('-');
		const spaced = parts.join(' ');
		const candidates = [];
		if(joined) candidates.push(`PokeLegion/Items/${joined}.png`);
		if(underscored && underscored !== joined) candidates.push(`PokeLegion/Items/${underscored}.png`);
		if(dashed && dashed !== joined && dashed !== underscored) candidates.push(`PokeLegion/Items/${dashed}.png`);
		if(spaced && spaced !== joined && spaced !== underscored && spaced !== dashed) candidates.push(`PokeLegion/Items/${spaced}.png`);
		// Common explicit synonyms that differ in repository naming
		const SYNONYMS = {
			'poke ball':['pokeball','poke ball'],
			'pokeball':['pokeball','poke ball'],
			'great ball':['greatball','great ball'],
			'ultra ball':['ultraball','ultra ball'],
			'master ball':['masterball','master ball'],
			'friend ball':['friendball','friend ball'],
			'heal ball':['healball','heal ball'],
			'dive ball':['diveball','dive ball'],
			'quick ball':['quickball','quick ball'],
			'net ball':['netball','net ball'],
			'love ball':['loveball','love ball'],
			'moon ball':['moonball','moon ball'],
			'safari ball':['safariball','safari ball'],
			'dusk ball':['duskball','dusk ball'],
			'premier ball':['premierball','premier ball'],
			'ancient ball':['ancientball','ancient ball'],
			'crystal ball':['crystalball','crystal ball'],
			'heavy ball':['heavyball','heavy ball'],
			'beast ball':['beastball','beast ball'],
			'fast ball':['fastball','fast ball'],
			'dream ball':['dreamball','dream ball']
		};
		if(SYNONYMS[cleaned]){
			SYNONYMS[cleaned].forEach(syn=>{ const synClean = syn.toLowerCase(); if(synClean && candidates.indexOf(`PokeLegion/Items/${synClean}.png`) < 0) candidates.push(`PokeLegion/Items/${synClean}.png`); });
		}
		// also try the pretty name produced by niceItemName
		try{
			const pretty = (niceItemName(ballName) || '').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
			const pjoined = pretty.replace(/\s+/g,'');
			if(pjoined && candidates.indexOf(`PokeLegion/Items/${pjoined}.png`) < 0) candidates.push(`PokeLegion/Items/${pjoined}.png`);
		}catch(e){}
		// final fallback: original normalized string
		candidates.push(getBallImagePath(ballName));
		return candidates.filter(Boolean);
	}catch(e){ return [getBallImagePath(ballName)]; }
}

// Set an <img> element's `src` with fallback candidates. Hides the image if all fail.
function setImageSrcWithFallback(imgEl, candidates){
	if(!imgEl) return;
	if(!candidates || !candidates.length){ imgEl.style.display = 'none'; return; }
	let idx = 0;
	// attach candidate list for debugging/inspection
	try{ imgEl._pl_candidates = Array.isArray(candidates) ? candidates.slice() : []; }catch(e){}
	imgEl.onload = function(){ try{ this.style.display = ''; }catch(e){} };
	imgEl.onerror = function(){
		// log failing candidate and remaining options to console for debugging in-browser
		try{
			const failed = imgEl._pl_candidates && imgEl._pl_candidates[idx] ? imgEl._pl_candidates[idx] : candidates[idx];
			const remaining = (imgEl._pl_candidates || candidates).slice(idx+1);
			console.debug('Image load failed for', failed, ' — trying next candidates:', remaining);
		}catch(e){}
		idx++;
		if(idx < candidates.length) imgEl.src = candidates[idx]; else imgEl.style.display = 'none';
	};
	// start with the first candidate
	imgEl.src = candidates[0];
}

// Simple EXP tooltip helpers
function ensureExpTooltip(){ if(document.getElementById('pl-exp-tooltip')) return document.getElementById('pl-exp-tooltip'); const t = document.createElement('div'); t.id = 'pl-exp-tooltip'; t.style.position='fixed'; t.style.pointerEvents='none'; t.style.background='rgba(12,12,12,0.95)'; t.style.color='#fff'; t.style.padding='6px 8px'; t.style.borderRadius='6px'; t.style.fontSize='12px'; t.style.zIndex=99999; t.style.opacity='0'; t.style.transition='opacity .12s'; t.innerHTML = '<span class="tip-text"></span>'; document.body.appendChild(t); return t; }
function showExpTooltip(target, text, event){ const tip = ensureExpTooltip(); tip.querySelector('.tip-text').innerText = text; tip.style.opacity='1'; positionExpTooltip(tip, target, event); }
function positionExpTooltip(tip, target, event){ if(!tip) return; const pad=8; let x=0,y=0; if(event && event.clientX!=null){ x = event.clientX + 12; y = event.clientY - 10; } else { const r = target.getBoundingClientRect(); x = r.right + pad; y = r.top + (r.height/2) - 10; } const vw = Math.max(document.documentElement.clientWidth||0, window.innerWidth||0); const vh = Math.max(document.documentElement.clientHeight||0, window.innerHeight||0); const rect = tip.getBoundingClientRect(); if(x + rect.width + 12 > vw) x = Math.max(6, vw - rect.width - 12); if(y + rect.height + 12 > vh) y = Math.max(6, vh - rect.height - 12); tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
function moveExpTooltip(e){ const tip = document.getElementById('pl-exp-tooltip'); if(!tip || tip.style.opacity==='0') return; positionExpTooltip(tip, e.target, e); }
function hideExpTooltip(){ const tip = document.getElementById('pl-exp-tooltip'); if(!tip) return; tip.style.opacity='0'; }


	function renderLog(){
		if(!encounterLog) return;
		encounterLog.innerHTML = '';
		const list = (player.log || []).slice().reverse();
		list.forEach(entry=>{
			let text = '';
			let type = 'info';
			let ts = null;
			if(typeof entry === 'string') { text = entry; }
			else if(entry && typeof entry === 'object'){ text = entry.text || ''; type = entry.type || 'info'; ts = entry.timestamp || entry.ts || null; }
			const div = document.createElement('div');
			div.className = 'matrix-line log-' + (type || 'info');
			// format timestamp (short) if present
			let tsHtml = '';
			try{
				if(ts){ const d = new Date(ts); if(isFinite(d.getTime())) tsHtml = `<span class="log-ts">[${escapeHtml(d.toLocaleString())}]</span> `; }
			}catch(e){ tsHtml = ''; }
			// use innerHTML so we can include timestamp span; escape the main text
			div.innerHTML = tsHtml + escapeHtml(text || '');
			encounterLog.appendChild(div);
		});
	}

	function addLog(text, type){
		player.log = player.log || [];
		const nowIso = (new Date()).toISOString();
		if(typeof text === 'object' && text !== null){
			// preserve provided fields but ensure timestamp exists
			const entry = Object.assign({}, text);
			if(!entry.timestamp && !entry.ts) entry.timestamp = nowIso;
			player.log.push(entry);
		} else {
			const entry = { text: String(text) };
			if(type) entry.type = type; else entry.type = 'info';
			entry.timestamp = nowIso;
			player.log.push(entry);
		}
		// keep only the most recent 50 entries
		while(player.log.length > 50) player.log.shift();
		renderLog();
		savePlayer();
	}

	function escapeHtml(s){return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c])}

	// Movement (tile-based)
	const STEP = 1; // step in tiles
	function handleKey(e){
		if(!player) return;
		// block movement during battles
		if(battleActive){ showMessage('Cannot move during a battle.', 'warn'); return; }
		// ignore auto-repeat so holding a key moves only once per press
		if(e.repeat) return;
		const key = e.key;
		let dr = 0, dc = 0;
		if(key==='ArrowUp'){ dr = -STEP; }
		else if(key==='ArrowDown'){ dr = STEP; }
		else if(key==='ArrowLeft'){ dc = -STEP; }
		else if(key==='ArrowRight'){ dc = STEP; }
		else return;
		e.preventDefault();
		if(!player.tilePos) player.tilePos = {r: Math.floor(MAPS[currentMapIndex].rows/2), c: Math.floor(MAPS[currentMapIndex].cols/2)};
		const nr = player.tilePos.r + dr;
		const nc = player.tilePos.c + dc;
		const map = MAPS[currentMapIndex];
		if(nr<0 || nc<0 || nr>=map.rows || nc>=map.cols) return;
		const target = map.tiles[nr][nc];
		if(!isWalkable(target)) return;
		// move
		// Do not set player.tilePos here — let setPlayerPositionTile handle updating and spawning logic
		// set facing direction for animation/persistence
		const dir = (dr<0) ? 'north' : (dr>0) ? 'south' : (dc<0) ? 'left' : (dc>0) ? 'right' : (player.facing || 'south');
		player.facing = dir;
		setPlayerPositionTile(nr,nc);
		// trigger walk animation if animator exists, then return to idle
		if(player._sprite && typeof player._sprite.play === 'function'){
			try{
				player._sprite.play(dir);
				setTimeout(()=>{ try{ if(player._sprite && typeof player._sprite.idle === 'function') player._sprite.idle(dir); }catch(e){} }, 300);
			}catch(e){}
		}
	}

	function isWalkable(tileType){
		// tiles considered non-walkable: deep water, mountain-border
		if(!tileType) return true;
		if(tileType === 'water') return false;
		if(tileType === 'mountain-border') return false;
		// others are walkable (grass, road, shallow, mountain-floor, cave)
		return true;
	}

// Attempt to spawn wild pokemon when stepping on a tile
function attemptWildSpawnOnStep(r,c){
	try{
		const map = MAPS[currentMapIndex];
		// map.name may differ in casing/format (e.g. "starting meadow" vs "Starting Meadow").
		// Try to find a matching spawn table by normalizing keys.
		const friendly = map.name || 'Map';
		// direct lookup first
		let pool = WILD_SPAWNS[friendly] || WILD_SPAWNS[map.name] || [];
		if(!pool || pool.length === 0){
			// attempt normalized key match
			const target = normalizeName(map.name || '');
			for(const k in WILD_SPAWNS){
				if(normalizeName(k) === target){ pool = WILD_SPAWNS[k]; break; }
			}
		}
		if(!pool || pool.length===0) return;
		// spawn chance (20% per step to find something)
		const roll = Math.random();
		if(roll > 0.2) return; // nothing this step
		// choose up to 2 spawns (no duplicates)
		const count = Math.random() < 0.3 ? 2 : 1;
		const chosen = [];
		for(let i=0;i<count;i++){
			const pick = pickRandomFromWeighted(pool);
			// create a runtime wild object with level and id
			const level = Math.max(1, (player.level || 1) + Math.floor((Math.random()*2) - 1) + (pick.baseLevel || 1));
			const wild = { id: 'w_' + Date.now() + '_' + i, name: pick.name, types: pick.types || [], rarity: pick.rarity, level, power: Math.max(0, Math.floor(level/2)) };
			// avoid duplicates by name
			if(!chosen.find(x=>x.name === wild.name)) chosen.push(wild);
		}
		if(chosen.length>0){ currentWildSpawns = chosen; renderWildSpawns(); }
	}catch(e){ console.warn('attemptWildSpawnOnStep failed', e); }
}

function clearWildSpawns(){ currentWildSpawns = []; activeWildTarget = null; const el = document.getElementById('wildSpawns'); if(el && el.parentNode) el.parentNode.removeChild(el); }

function renderWildSpawns(){
	// remove existing
	const existing = document.getElementById('wildSpawns'); if(existing && existing.parentNode) existing.parentNode.removeChild(existing);
	const center = document.getElementById('centerArea'); if(!center) return;
	const box = document.createElement('div'); box.id = 'wildSpawns';
	box.style.position = 'absolute'; box.style.left = '50%'; box.style.transform = 'translateX(-50%)'; box.style.bottom = '40px'; box.style.minWidth = '480px'; box.style.background = 'linear-gradient(180deg,#fff,#fbfffb)'; box.style.border = '1px solid rgba(0,0,0,0.06)'; box.style.padding = '14px'; box.style.borderRadius = '8px'; box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; box.style.zIndex = 1200; box.style.textAlign = 'left';
	const title = document.createElement('div'); title.style.fontSize='20px'; title.style.fontWeight='700'; title.style.marginBottom='8px'; title.textContent = 'Wild Pokemon Found!'; box.appendChild(title);
	const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='8px';
	currentWildSpawns.forEach(w=>{
		const row = document.createElement('div'); row.style.display='flex'; row.style.alignItems='center'; row.style.justifyContent='space-between'; row.style.padding='8px'; row.style.borderRadius='6px'; row.style.background='linear-gradient(180deg,#f7fff7,#f1fff1)';
		const left = document.createElement('div'); left.style.display='flex'; left.style.alignItems='center'; left.style.gap='10px';
		const img = document.createElement('img'); img.src = `PokeLegion/Pokemon/${w.name.toLowerCase()}.png`; img.alt = w.name; img.style.width='40px'; img.style.height='40px'; img.style.objectFit='contain'; img.onerror = ()=>{ img.style.display='none'; };
		const meta = document.createElement('div'); meta.innerHTML = `<div style="font-weight:700">${escapeHtml(w.name)}</div><div style="font-size:12px;color:var(--muted)">Lv.${w.level} • ${w.rarity}</div>`;
		left.appendChild(img); left.appendChild(meta);
		const right = document.createElement('div'); right.style.display='flex'; right.style.alignItems='center'; right.style.gap='8px';
		const fight = document.createElement('button'); fight.className='btn small'; fight.textContent='Fight'; fight.addEventListener('click', ()=>{ selectWildToFight(w); });
		const ignore = document.createElement('button'); ignore.className='btn secondary small'; ignore.textContent='Ignore'; ignore.addEventListener('click', ()=>{ /* remove this spawn */ currentWildSpawns = currentWildSpawns.filter(x=>x.id !== w.id); try{ if(catchUsage && catchUsage[w.id]) delete catchUsage[w.id]; }catch(e){} if(currentWildSpawns.length===0) clearWildSpawns(); else renderWildSpawns(); });
		right.appendChild(fight); right.appendChild(ignore);
		row.appendChild(left); row.appendChild(right);
		list.appendChild(row);
	});
	box.appendChild(list);
	// attach below the map area: use mapArea's parent (centerArea)
	const centerEl = document.getElementById('centerArea'); if(centerEl) centerEl.appendChild(box);
}

function selectWildToFight(wild){
	if(battleActive) return showMessage('You are already in a battle.', 'warn');
	activeWildTarget = wild; // lock target
	// show party selection modal so player picks one pokemon to fight
	showPartySelectForDuel(wild);
}

function showPartySelectForDuel(wild){
	// modal similar to other confirm modals
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=20000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='16px'; box.style.borderRadius='10px'; box.style.minWidth='360px'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	box.innerHTML = `<h3 style="margin:0 0 10px 0">Select your pokemon to fight ${escapeHtml(wild.name)}</h3>`;
	const list = document.createElement('div'); list.style.display='flex'; list.style.gap='8px'; list.style.flexWrap='wrap';
	const party = Array.isArray(player.party) ? player.party : [];
	party.forEach((p, idx)=>{
		const isFainted = (Number(p.currentHp) || 0) <= 0;
		const btn = document.createElement('button'); btn.className='btn'; btn.style.display='flex'; btn.style.flexDirection='column'; btn.style.alignItems='center'; btn.style.gap='6px'; btn.style.minWidth='80px';
		if(isFainted){ btn.disabled = true; btn.style.opacity = '0.5'; btn.title = 'This Pokémon has fainted and cannot fight. Heal it first.'; }
		const img = document.createElement('img'); img.src = `PokeLegion/Pokemon/${(p.name||'').toLowerCase()}.png`; img.style.width='48px'; img.style.height='48px'; img.onerror = ()=>{ img.remove(); };
		const nm = document.createElement('div'); nm.style.fontSize='12px'; nm.textContent = p.name || '(unknown)';
		const lv = document.createElement('div'); lv.style.fontSize='11px'; lv.style.color='#fff'; lv.textContent = 'Lv ' + (p.level||1);
		btn.appendChild(img); btn.appendChild(nm); btn.appendChild(lv);
		// If fainted, clicking should inform player to heal instead of starting duel
		btn.addEventListener('click', ()=>{
			if(isFainted){ showMessage('This Pokémon has fainted. Heal it before using in a battle.', 'warn'); return; }
			overlay.remove(); startDuelWithSelected(idx, wild);
		});
		list.appendChild(btn);
	});
	box.appendChild(list);
	const cancel = document.createElement('div'); cancel.style.marginTop='12px'; const cbtn = document.createElement('button'); cbtn.className='btn secondary'; cbtn.textContent='Cancel'; cbtn.addEventListener('click', ()=>{ overlay.remove(); activeWildTarget = null; }); cancel.appendChild(cbtn); box.appendChild(cancel);
	overlay.appendChild(box); document.body.appendChild(overlay);
}

function startDuelWithSelected(partyIdx, wild){
	const pkm = (player.party && player.party[partyIdx]);
	if(!pkm){ showMessage('Invalid selection.', 'error'); return; }
	if((Number(pkm.currentHp) || 0) <= 0){ showMessage('That Pokémon has fainted. Heal it before sending it to battle.', 'warn'); return; }
	// lock movement
	setBattleActive(true);
	// prevent player movement
	showMessage('Battle started!', 'info', 2000);
	// run duel calculation asynchronously and show result modal
	setTimeout(()=>{ runDuel(partyIdx, wild); }, 250);
}

// Small drop table for wild encounters. Each rarity maps to candidate items and a base chance
const WILD_DROP_TABLE = {
	common: { chance: 0.15, items: ['pokeball','potion'] },
	uncommon: { chance: 0.35, items: ['greatball','super-potion'] },
	rare: { chance: 0.6, items: ['ultraball','hyper-potion','amulet-coin'] }
};

// Roll occasional item drops for a wild pokemon after a win. Returns array of {key, qty}
function rollWildItemDrops(wild){
	try{
		if(!wild || !wild.rarity) return [];
		const entry = WILD_DROP_TABLE[wild.rarity] || WILD_DROP_TABLE.common;
		const out = [];
		if(Math.random() > (entry.chance || 0)) return out;
		// choose 1..2 items (sometimes multiple)
		const count = Math.random() < 0.12 ? 2 : 1;
		for(let i=0;i<count;i++){
			const choices = entry.items || [];
			if(choices.length === 0) continue;
			const key = choices[Math.floor(Math.random() * choices.length)];
			const qty = (key && (key.indexOf('ball') >= 0)) ? 1 : (Math.random() < 0.25 ? 2 : 1);
			out.push({ key: key, qty: qty });
		}
		return out;
	}catch(e){ return []; }
}

function runDuel(partyIdx, wild){
	try{
		const attacker = player.party[partyIdx]; if(!attacker){ showMessage('Invalid Pokemon selected.', 'error'); setBattleActive(false); return; }
		// simple duel calculation: compare (level + rand) values
		const playerPower = (attacker.level || 1) + (attacker.power || 0) + Math.random() * 2;
		const wildPower = (wild.level || 1) + (wild.power || Math.floor((wild.level||1)/2)) + Math.random() * 2;
		const playerWins = playerPower >= wildPower;
		// compute damage to player's pokemon when winning/losing
		const damage = Math.max(1, Math.floor((wild.level || 1) * (Math.random()*2)));
		attacker.currentHp = Math.max(0, (attacker.currentHp || attacker.hp || 10) - damage);
		// persist and refresh only the affected party slot so UI updates immediately
		savePlayer();
		try{ updatePartySlot(partyIdx); }catch(e){ try{ updatePanels(); }catch(e){} }
		// award exp to pokemon and player if win
		if(playerWins){
			const expGain = 10 + (wild.level || 1) * 6;
			try{ addPokemonExpTo(attacker, expGain); }catch(e){}
			// ensure EXP/level changes are saved and only the affected slot is updated
			savePlayer();
			try{ updatePartySlot(partyIdx); }catch(e){ try{ updatePanels(); }catch(er){} }
			try{ addExp(Math.max(5, Math.floor(expGain/3))); }catch(e){}
			// award some coins (auto-sold loot)
			const coins = Math.floor(5 + Math.random()*20);
			player.money = (Number(player.money) || 0) + coins;
			// roll occasional item drops and grant them
			const drops = rollWildItemDrops(wild) || [];
			if(drops.length){
				player.inventory = player.inventory || {};
				drops.forEach(d => { try{ player.inventory[d.key] = (Number(player.inventory[d.key])||0) + (Number(d.qty)||0); }catch(e){} });
			}
			savePlayer();
			// Immediate inventory + panels refresh (coins & drops) before showing modal
			try{ renderInventoryGrid(); updatePanels(); }catch(e){}
			// Update task progress if applicable
			try{ updateTaskProgress(wild.name); }catch(e){}
			// show win modal with options to catch or run (include drops + exp gain for display)
			showDuelResultModal(true, wild, partyIdx, damage, coins, drops, expGain);
		} else {
			// loss: minor penalty and no loot
			const coins = 0;
			savePlayer();
			showDuelResultModal(false, wild, partyIdx, damage, coins, [], 0);
		}
	}catch(e){ console.warn('runDuel failed', e); setBattleActive(false); }
}

function showDuelResultModal(playerWon, wild, partyIdx, damage, coins, drops, expGain){
	drops = Array.isArray(drops) ? drops : [];
	expGain = Number(expGain) || 0;
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=20000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='18px'; box.style.borderRadius='10px'; box.style.minWidth='420px'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	if(playerWon){
		// build a clearer summary of the outcome
		const name = escapeHtml(player.party && player.party[partyIdx] ? player.party[partyIdx].name : '(your Pokémon)');
		// Enhanced header includes defeated wild name + level
		let html = `<h3>You WON! ${escapeHtml(wild && wild.name ? wild.name : 'Wild Pokémon')} Lvl.${wild && wild.level ? wild.level : '?'} was defeated!</h3>`;
		html += `<div style="margin-top:6px">Result summary:</div>`;
		html += `<ul style="margin:8px 0 0 18px;padding:0;color:var(--muted)">`;
		html += `<li>Auto-sold loot: <strong>$${coins}</strong></li>`;
		if(expGain > 0) html += `<li>${name} +<strong>${expGain}</strong> ExpPoints</li>`;
		html += `<li>${name} took <strong>${damage}</strong> damage</li>`;
		html += `</ul>`;
		box.innerHTML = html;
		// If there are drops, show them with icons
		if(drops.length){
			const dropRow = document.createElement('div');
			dropRow.style.display = 'flex';
			dropRow.style.gap = '16px';
			dropRow.style.margin = '12px 0 0 0';
			dropRow.style.alignItems = 'center';
			drops.forEach(d => {
				const itemBox = document.createElement('div');
				itemBox.style.display = 'flex';
				itemBox.style.flexDirection = 'column';
				itemBox.style.alignItems = 'center';
				itemBox.style.minWidth = '56px';
				// Create icon with fallback attempts (reuse inventory logic)
				const img = document.createElement('img');
				img.alt = d.key;
				img.style.width = '36px';
				img.style.height = '36px';
				img.style.marginBottom = '2px';
				// Use same candidate logic as inventory
				const candidates = [
					`PokeLegion/Items/${d.key}.png`,
					`PokeLegion/Items/${d.key.replace(/\s+/g,'_')}.png`,
					`PokeLegion/Items/${d.key.replace(/\s+/g,'-')}.png`,
					`PokeLegion/Items/${d.key.replace(/\s+/g,'')}.png`,
					`PokeLegion/Items/${d.key.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase()}.png`,
					`PokeLegion/Items/${d.key.replace(/pokeball/i,'poke ball')}.png`,
					`PokeLegion/Items/${d.key.replace(/greatball/i,'great ball')}.png`,
					`PokeLegion/Items/${d.key.replace(/ultraball/i,'ultra ball')}.png`
				];
				let ci = 0;
				img.onerror = function(){
					ci++;
					if(ci < candidates.length) img.src = candidates[ci]; else {
						img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"></svg>';
					}
				};
				img.src = candidates[0];
				itemBox.appendChild(img);
				// Label and quantity
				const label = document.createElement('div');
				label.style.fontSize = '13px';
				label.style.textAlign = 'center';
				label.style.marginTop = '2px';
				label.textContent = `${d.qty}x ${niceItemName(d.key) || d.key}`;
				itemBox.appendChild(label);
				dropRow.appendChild(itemBox);
			});
			// Add a heading for items found
			const foundTitle = document.createElement('div');
			foundTitle.textContent = 'Items found:';
			foundTitle.style.margin = '10px 0 2px 0';
			foundTitle.style.fontWeight = 'bold';
			foundTitle.style.color = 'var(--muted)';
			box.appendChild(foundTitle);
			box.appendChild(dropRow);
		}
		const controls = document.createElement('div'); controls.style.marginTop='12px'; controls.style.display='flex'; controls.style.gap='8px';
		const catchBtn = document.createElement('button'); catchBtn.className='btn'; catchBtn.textContent='CATCH'; catchBtn.addEventListener('click', ()=>{ overlay.remove(); showCatchModal(wild); });
		const runBtn = document.createElement('button'); runBtn.className='btn secondary'; runBtn.textContent='RUN'; runBtn.addEventListener('click', ()=>{ overlay.remove(); setBattleActive(false); clearWildSpawns(); });
		controls.appendChild(catchBtn); controls.appendChild(runBtn); box.appendChild(controls);
		// log a concise, human-friendly line to the encounter log
		try{
			const parts = [];
			parts.push(`Won duel! Defeated ${wild && wild.name ? wild.name : 'wild Pokémon'} Lvl.${wild && wild.level ? wild.level : '?'}`);
			parts.push(`+$${coins}`);
			if(expGain > 0) parts.push(`${name} +${expGain} ExpPoints`);
			parts.push(`${name} -${damage} HP`);
			if(drops.length){ parts.push(`Found: ${drops.map(d=> `${d.qty}x ${niceItemName(d.key)}`).join(', ')}`); }
			addLog(parts.join(' • '), 'success');
		}catch(e){}
	} else {
		const name = escapeHtml(player.party && player.party[partyIdx] ? player.party[partyIdx].name : '(your Pokémon)');
		box.innerHTML = `<h3>You lost the duel</h3><div style="margin-top:6px">${name} took <strong>${damage}</strong> damage. Try again later.</div>`;
		const ok = document.createElement('button'); ok.className='btn'; ok.style.marginTop='12px'; ok.textContent='OK'; ok.addEventListener('click', ()=>{ overlay.remove(); setBattleActive(false); clearWildSpawns(); }); box.appendChild(ok);
		try{ addLog(`Lost duel vs ${wild && wild.name ? wild.name : 'wild Pokémon'} • ${name} -${damage} HP`, 'warn'); }catch(e){}
	}
	overlay.appendChild(box); document.body.appendChild(overlay);
}

function showCatchModal(wild){
	// present choice of balls from inventory keys (pokeball, greatball, ultraball)
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=20000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='16px'; box.style.borderRadius='10px'; box.style.minWidth='360px'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	box.innerHTML = `<h3>Choose a ball to try catching ${escapeHtml(wild.name)}</h3>`;
	const row = document.createElement('div'); row.style.display='flex'; row.style.gap='8px';
	// gather all ball-type items from player's inventory (any item name containing 'ball')
	const inv = player.inventory || {};
	const allBallKeys = Object.keys(inv || {}).filter(k => {
		try{
			const cnt = Number(inv[k] || 0);
			if(cnt <= 0) return false;
			// treat item as a ball if its key or pretty name contains the word 'ball'
			if(/\bball\b/i.test(k)) return true;
			const pretty = niceItemName(k) || '';
			if(/\bball\b/i.test(pretty)) return true;
			return false;
		}catch(e){ return false; }
	});
	// If we found none using the inventory scan (edge cases), fall back to a small known list
	const fallback = ['pokeball','greatball','ultraball','master ball'];
	const finalCandidates = allBallKeys.length > 0 ? allBallKeys : fallback.filter(x => Number(player.inventory[x] || 0) > 0);
	finalCandidates.forEach(key=>{
		const cnt = Number(player.inventory[key] || 0);
		if(cnt<=0) return; // only show available balls
		const b = document.createElement('button'); b.className='btn'; b.textContent = `${niceItemName(key)} (${cnt})`;
		b.addEventListener('click', ()=>{ overlay.remove(); attemptCatchWithBall(wild, key); }); row.appendChild(b);
	});
	// if no balls, show message
	if(row.children.length === 0){ const p = document.createElement('div'); p.style.marginTop='8px'; p.textContent='No balls in inventory.'; box.appendChild(p); const ok = document.createElement('button'); ok.className='btn'; ok.style.marginTop='12px'; ok.textContent='OK'; ok.addEventListener('click', ()=>{ overlay.remove(); setBattleActive(false); clearWildSpawns(); }); box.appendChild(ok); overlay.appendChild(box); document.body.appendChild(overlay); return; }
	box.appendChild(row);
	const cancel = document.createElement('div'); cancel.style.marginTop='12px'; const cbtn = document.createElement('button'); cbtn.className='btn secondary'; cbtn.textContent='Cancel'; cbtn.addEventListener('click', ()=>{ overlay.remove(); setBattleActive(false); clearWildSpawns(); }); cancel.appendChild(cbtn); box.appendChild(cancel);
	overlay.appendChild(box); document.body.appendChild(overlay);
}

function attemptCatchWithBall(wild, ballKey){
	// always deduct one ball
	player.inventory[ballKey] = Math.max(0, (player.inventory[ballKey]||0) - 1);
	savePlayer(); renderInventoryGrid();
	const ballName = niceItemName(ballKey);
	// record usage for this encounter (counts are independent per wild Pokemon id)
	try{
		// canonical encounter id (prefer wild.id if present)
		const rawId = wild && (wild.id || (wild.name + '_' + wild.level));
		const id = rawId ? normalizeName(String(rawId)) : null;
		// normalize ball key so different spellings/casing map together
		const normalizedBallKey = String(ballKey || '').toLowerCase().trim();
		if(id){
			catchUsage[id] = catchUsage[id] || {};
			catchUsage[id][normalizedBallKey] = (catchUsage[id][normalizedBallKey] || 0) + 1;
			// also track cumulative usage per species across encounters
			try{
				if(!player) player = player || {};
				player.ballUsage = player.ballUsage || {};
				const speciesKey = normalizeName(String(wild && wild.name ? wild.name : rawId || 'unknown'));
				player.ballUsage[speciesKey] = player.ballUsage[speciesKey] || {};
				player.ballUsage[speciesKey][normalizedBallKey] = (player.ballUsage[speciesKey][normalizedBallKey] || 0) + 1;
				try{ savePlayer(); }catch(e){}
			}catch(e){}
			// per-throw info is intentionally not logged to avoid duplicates; final summary will be added on outcome
			// (no per-attempt summary here — final summary produced on catch/flee)
		}
	}catch(e){/* ignore tracking errors */}
	// compute chance: base 0.5, modify by ball: pokeball=1, greatball=1.7, ultraball=2.4, master ball=1e6
	const base = 0.5;
	const modifiers = {'pokeball':1.0,'greatball':1.7,'ultraball':2.4,'master ball':999};
	const mod = modifiers[ballKey] || 1.0;
	// level penalty
	const lvlFactor = Math.max(0.25, 1 - ((wild.level || 1) - (player.level || 1)) * 0.05);
	const chance = Math.min(0.99, base * mod * lvlFactor);
	const roll = Math.random();
	const caught = roll < chance;
	if(caught){
		// add pokemon to party if space (<6) else depot
		const pkm = { name: wild.name, level: wild.level, exp:0, hp: 30 + wild.level*5, currentHp: 30 + wild.level*5, power: Math.max(0, Math.floor((wild.level||1)/2)) };
		// ensure types and ball assignment so UI and filters work correctly
		try{ pkm.types = Array.isArray(wild.types) ? wild.types.slice() : (findTypesForName(wild.name) || ['normal']); }catch(e){ pkm.types = ['normal']; }
		try{ ensurePokemonHasTypes(pkm); }catch(e){}
		try{ assignBallToPokemon(pkm); }catch(e){}
		// record which ball was used so UI (party/depot) shows the correct ball icon
		try{ pkm.ball = niceItemName(ballKey); }catch(e){}
		// record capture timestamp so depot always has a date to show
		try{ pkm.capturedAt = (new Date()).toISOString(); }catch(e){}
		if(!Array.isArray(player.party)) player.party = [];
			if(player.party.length < 6){
				player.party.push(pkm);
				showMessage(`${wild.name} was caught and added to party!`, 'info', 4000);
			} else {
				player.depot = player.depot || [];
				player.depot.push(pkm);
				showMessage(`${wild.name} was caught and sent to Depot.`, 'info', 4000);
			}
		// log final usage summary for this encounter (before clearing)
		try{
			const rawId = wild && (wild.id || (wild.name + '_' + wild.level));
			const id = rawId ? normalizeName(String(rawId)) : null;
			let usedSummary = '';

			// helper: choose 'a' or 'an' based on leading vowel
			const chooseArticle = (word)=>{ try{ if(!word || typeof word !== 'string') return 'a'; const ch = word.trim().charAt(0).toLowerCase(); return ['a','e','i','o','u'].indexOf(ch) >= 0 ? 'an' : 'a'; }catch(e){ return 'a'; } };

			if(id && catchUsage[id]){
				const parts = Object.keys(catchUsage[id]).map(k=> {
					const cnt = catchUsage[id][k] || 0;
					const pretty = String(niceItemName(k) || k).toLowerCase();
					return cnt === 1 ? `${cnt} ${pretty}` : `${cnt} ${pretty}s`;
				}).filter(Boolean);
				if(parts.length>0) usedSummary = `Used ${parts.join(', ')} on ${wild.name}`;
			}

			// pretty ball name in lower-case for natural phrasing
			const usedBallPrettyLower = String(niceItemName(ballKey) || 'ball').toLowerCase();

			// cumulative totals message (same pluralization rules)
			let cumMsg = '';
			try{
				const speciesKey = normalizeName(String(wild && wild.name ? wild.name : (wild && wild.id) || 'unknown'));
				if(player && player.ballUsage && player.ballUsage[speciesKey]){
					const cumParts = Object.keys(player.ballUsage[speciesKey]).map(k=> {
						const cnt = player.ballUsage[speciesKey][k] || 0;
						const pretty = String(niceItemName(k) || k).toLowerCase();
						return cnt === 1 ? `${cnt} ${pretty}` : `${cnt} ${pretty}s`;
					}).filter(Boolean);
					if(cumParts.length>0) cumMsg = `Total used on ${wild.name}: ${cumParts.join(', ')}`;
				}
			}catch(e){}

			// outcome message
			let outcome = '';
			if(usedSummary){
				try{
					if(caught){
						// determine whether added to party or depot
						if(player.party && player.party.length <= 6 && player.party.indexOf(pkm) >= 0){
							const art = chooseArticle(usedBallPrettyLower);
							outcome = `${wild.name} was caught in ${art} ${usedBallPrettyLower} and added to your party!`;
						} else if(player.depot && player.depot.indexOf(pkm) >= 0){
							const art = chooseArticle(usedBallPrettyLower);
							outcome = `${wild.name} was caught in ${art} ${usedBallPrettyLower} and sent to your depot!`;
						} else {
							const art = chooseArticle(usedBallPrettyLower);
							outcome = `${wild.name} was caught in ${art} ${usedBallPrettyLower}!`;
						}
						const finalMsg = `${usedSummary} - ${outcome}` + (cumMsg ? ` • ${cumMsg}` : '');
						addLog(finalMsg, 'success');
						// After a successful catch, reset the per-species ball counter so counting restarts
						try{
							const speciesKeyClear = normalizeName(String(wild && wild.name ? wild.name : (wild && wild.id) || 'unknown'));
							if(player && player.ballUsage && player.ballUsage[speciesKeyClear]){
								delete player.ballUsage[speciesKeyClear];
								savePlayer();
							}
						}catch(e){}
					} else {
						// failed catch (this path is possible if this try encompasses the non-caught branch too)
						outcome = `Your ${usedBallPrettyLower} was broken - ${wild.name} fled!`;
						const finalMsg = `${usedSummary} - ${outcome}` + (cumMsg ? ` • ${cumMsg}` : '');
						addLog(finalMsg, 'warn');
					}
				}catch(e){}
			}
		}catch(e){}
		savePlayer(); updatePanels(); clearWildSpawns(); setBattleActive(false);
		// clear per-encounter usage counts
		try{ const rawId = wild && (wild.id || (wild.name + '_' + wild.level)); const id = rawId ? normalizeName(String(rawId)) : null; if(id && catchUsage[id]) delete catchUsage[id]; }catch(e){}
	} else {
		showMessage('The Pokemon broke free!', 'warn', 3000);
		// remain in battle but allow player to run or try again if balls remain
		// Consolidated final summary for failed catch: include per-encounter usage and cumulative totals
		try{
			const rawId = wild && (wild.id || (wild.name + '_' + wild.level));
			const id = rawId ? normalizeName(String(rawId)) : null;
			let usedSummary = '';
			if(id && catchUsage[id]){
				const parts = Object.keys(catchUsage[id]).map(k=> {
					const cnt = catchUsage[id][k] || 0; const pretty = String(niceItemName(k) || k).toLowerCase();
					return cnt === 1 ? `${cnt} ${pretty}` : `${cnt} ${pretty}s`;
				}).filter(Boolean);
				if(parts.length>0) usedSummary = `Used ${parts.join(', ')} on ${wild.name}`;
			}

			// cumulative totals message
			let cumMsg = '';
			try{
				const speciesKey = normalizeName(String(wild && wild.name ? wild.name : (wild && wild.id) || 'unknown'));
				if(player && player.ballUsage && player.ballUsage[speciesKey]){
					const cumParts = Object.keys(player.ballUsage[speciesKey]).map(k=> {
						const cnt = player.ballUsage[speciesKey][k] || 0; const pretty = String(niceItemName(k) || k).toLowerCase();
						return cnt === 1 ? `${cnt} ${pretty}` : `${cnt} ${pretty}s`;
					}).filter(Boolean);
					if(cumParts.length>0) cumMsg = `Total used on ${wild.name}: ${cumParts.join(', ')}`;
				}
			}catch(e){}

			// final outcome phrasing
			let finalMsg = '';
			if(usedSummary){ finalMsg = `${usedSummary} - Pokemon (${wild.name}) Fled!`; }
			else { finalMsg = `Pokemon (${wild.name}) Fled!`; }
			if(cumMsg) finalMsg += ` • ${cumMsg}`;
			addLog(finalMsg, 'warn');
		}catch(e){ try{ addLog(`Pokemon (${wild && wild.name ? wild.name : 'Unknown'}) Fled!`, 'warn'); }catch(err){} }
		// clear per-encounter usage counts
		try{ const rawId = wild && (wild.id || (wild.name + '_' + wild.level)); const id = rawId ? normalizeName(String(rawId)) : null; if(id && catchUsage[id]) delete catchUsage[id]; }catch(e){}
		setTimeout(()=>{ setBattleActive(false); clearWildSpawns(); }, 800);
	}
}

// Heal / potion helpers
function showHealModal(partyIdx){
	const poke = (Array.isArray(player.party) && player.party[partyIdx]) ? player.party[partyIdx] : null;
	if(!poke) return showMessage('No Pokémon selected.', 'error');
	// Present available potions
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=20000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='16px'; box.style.borderRadius='10px'; box.style.minWidth='320px'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	box.innerHTML = `<h3>Use a potion on ${escapeHtml(poke.name)}</h3><div style="margin-top:8px;font-size:13px;color:var(--muted)">Choose a potion to heal HP</div>`;
	const list = document.createElement('div'); list.style.display='flex'; list.style.gap='8px'; list.style.marginTop='12px';
	const POTIONS = [{k:'potion',label:'Potion'},{k:'super-potion',label:'Super Potion'},{k:'hyper-potion',label:'Hyper Potion'},{k:'max-potion',label:'Max Potion'}];
	let any = false;
	POTIONS.forEach(it=>{
		const cnt = Number(player.inventory[it.k] || 0);
		if(cnt <= 0) return;
		any = true;
		const b = document.createElement('button'); b.className='btn'; b.textContent = `${it.label} (${cnt})`;
		b.addEventListener('click', ()=>{ overlay.remove(); applyPotionToPokemon(partyIdx, it.k); });
		list.appendChild(b);
	});
	box.appendChild(list);
	if(!any){ const p = document.createElement('div'); p.style.marginTop='12px'; p.textContent = 'No potions available.'; box.appendChild(p); const ok = document.createElement('button'); ok.className='btn'; ok.style.marginTop='12px'; ok.textContent='OK'; ok.addEventListener('click', ()=>{ overlay.remove(); }); box.appendChild(ok); }
	const cancel = document.createElement('div'); cancel.style.marginTop='12px'; const cbtn = document.createElement('button'); cbtn.className='btn secondary'; cbtn.textContent='Cancel'; cbtn.addEventListener('click', ()=>{ overlay.remove(); }); cancel.appendChild(cbtn); box.appendChild(cancel);
	overlay.appendChild(box); document.body.appendChild(overlay);
}

function applyPotionToPokemon(partyIdx, potionKey){
	const poke = (Array.isArray(player.party) && player.party[partyIdx]) ? player.party[partyIdx] : null;
	if(!poke) return showMessage('No Pokémon selected.', 'error');
	const healMap = { 'potion': 20, 'super-potion': 50, 'hyper-potion': 120, 'max-potion': Infinity };
	const available = Number(player.inventory[potionKey] || 0);
	if(available <= 0) return showMessage('No potions of that type available.', 'warn');
	// consume
	player.inventory[potionKey] = Math.max(0, available - 1);
	// ensure hp fields
	if(typeof poke.hp !== 'number') poke.hp = 30 + (poke.level||1)*5;
	if(typeof poke.currentHp !== 'number') poke.currentHp = poke.hp;
	const heal = healMap[potionKey];
	if(!isFinite(heal)){
		poke.currentHp = poke.hp;
	} else {
		poke.currentHp = Math.min(poke.hp, (Number(poke.currentHp) || 0) + Math.max(0, Math.floor(heal)));
	}
	savePlayer();
	// update only the healed party slot to avoid full re-renders
	try{ updatePartySlot(partyIdx); }catch(e){ try{ updatePanels(); }catch(err){} }
	renderInventoryGrid();
	showMessage(`${poke.name} healed (${potionKey.replace(/-/g,' ')})`, 'info');
}

// Simple Depot modal used to view stored Pokemon and move them to party if space
function showDepot(){
	const overlay = document.createElement('div'); overlay.style.position='fixed'; overlay.style.left=0; overlay.style.top=0; overlay.style.right=0; overlay.style.bottom=0; overlay.style.background='rgba(0,0,0,0.4)'; overlay.style.display='flex'; overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=20000;
	const box = document.createElement('div'); box.style.background='#fff'; box.style.padding='20px'; box.style.borderRadius='10px'; box.style.minWidth='1100px'; box.style.maxWidth='98%'; box.style.boxShadow='0 10px 30px rgba(0,0,0,0.25)';
	box.innerHTML = '<h3>Pokemon Depot</h3>';

	// three-column layout: Party | Controls (search/filter) | Depot
	const cols = document.createElement('div'); cols.style.display = 'flex'; cols.style.gap = '18px'; cols.style.marginTop = '8px';
	const partyCol = document.createElement('div'); partyCol.style.flex = '0 0 220px'; partyCol.style.minWidth = '160px'; partyCol.style.maxHeight = '520px'; partyCol.style.overflow = 'auto';
	const controlsCol = document.createElement('div'); controlsCol.style.flex = '0 0 180px'; controlsCol.style.minWidth = '140px'; controlsCol.style.maxHeight = '520px'; controlsCol.style.overflow = 'auto';
	const depotCol = document.createElement('div'); depotCol.style.flex = '1'; depotCol.style.minWidth = '560px'; depotCol.style.maxHeight = '520px'; depotCol.style.overflow = 'hidden'; depotCol.style.display = 'flex'; depotCol.style.flexDirection = 'column';

	player.depot = player.depot || [];
	player.party = player.party || [];

	// state for search and type filters
	let searchQuery = '';
	const TYPES = ['Normal','Fire','Fighting','Water','Flying','Grass','Poison','Electric','Ground','Psychic','Rock','Ice','Bug','Dragon','Ghost','Dark','Steel','Fairy'];
	const TYPE_COLORS = {
		'Normal':'#A8A77A','Fire':'#EE8130','Fighting':'#C22E28','Water':'#6390F0','Flying':'#A98FF3','Grass':'#7AC74C','Poison':'#A33EA1','Electric':'#F7D02C','Ground':'#E2BF65','Psychic':'#F95587','Rock':'#B6A136','Ice':'#96D9D6','Bug':'#A6B91A','Dragon':'#6F35FC','Ghost':'#735797','Dark':'#705746','Steel':'#B7B7CE','Fairy':'#D685AD'
	};
	let activeTypes = [];

	function matchesFilters(poke){
		// search by name
		if(searchQuery){ const q = String(searchQuery).toLowerCase(); if(!(String(poke.name||'').toLowerCase().includes(q))) return false; }
		// types filter: if none active, pass
		if(activeTypes.length === 0) return true;
		const ptypes = (Array.isArray(poke.types) ? poke.types.map(t=>String(t).toLowerCase()) : []);
		// must include all active types
		for(const t of activeTypes){ if(!ptypes.includes(String(t).toLowerCase())) return false; }
		return true;
	}

	function renderPartyList(){
		partyCol.innerHTML = '';
		const h = document.createElement('div'); h.style.fontWeight = '700'; h.style.marginBottom = '8px'; h.textContent = 'Current Party'; partyCol.appendChild(h);
		if(player.party.length === 0){ const em = document.createElement('div'); em.style.color = 'var(--muted)'; em.textContent = '(empty)'; partyCol.appendChild(em); return; }
		const list = document.createElement('div'); list.style.display = 'flex'; list.style.flexWrap = 'wrap'; list.style.gap = '8px';
		player.party.forEach((p, idx)=>{
			const card = document.createElement('div'); card.style.border='1px solid #d2e6c9'; card.style.background='#f6fff3'; card.style.padding='8px'; card.style.borderRadius='8px'; card.style.minWidth='130px'; card.style.display='flex'; card.style.flexDirection='column'; card.style.alignItems='stretch';
			// ensure ball assigned
			try{ assignBallToPokemon(p); }catch(e){}
			const topRow = document.createElement('div'); topRow.style.display='flex'; topRow.style.justifyContent='space-between'; topRow.style.alignItems='center';
			const nameEl = document.createElement('div'); nameEl.style.fontWeight='700'; nameEl.textContent = p.name || '';
			const lvlEl = document.createElement('div'); lvlEl.style.fontSize='12px'; lvlEl.style.color = 'var(--muted)'; lvlEl.textContent = 'Lv ' + (p.level||1);
			topRow.appendChild(nameEl); topRow.appendChild(lvlEl);

			const iconsRow = document.createElement('div'); iconsRow.style.display='flex'; iconsRow.style.justifyContent='space-between'; iconsRow.style.alignItems='center'; iconsRow.style.marginTop = '6px';
			const leftIcons = document.createElement('div'); leftIcons.style.display='flex'; leftIcons.style.alignItems='center'; leftIcons.style.gap='8px';
			const ballImgWrap = document.createElement('div'); ballImgWrap.className = 'ball-icon';
			const ballImg = document.createElement('img'); ballImg.alt = p.ball || 'ball'; ballImg.style.width = '20px'; ballImg.style.height = '20px';
			try{ setImageSrcWithFallback(ballImg, getBallImageCandidates(p.ball || 'Poke Ball')); }catch(e){ ballImg.src = ''; }
			ballImgWrap.appendChild(ballImg);
			leftIcons.appendChild(ballImgWrap);

			// sprite
			const sprite = document.createElement('img'); sprite.alt = p.name || ''; sprite.style.width = '40px'; sprite.style.height = '40px'; sprite.style.objectFit = 'contain';
			try{
				const fileKey = String(p.name || '').toLowerCase().replace(/[^a-z0-9]+/g,'_');
				const candidates = [`PokeLegion/pokemon/${fileKey}.png`,`PokeLegion/Pokemon/${fileKey}.png`,`PokeLegion/Pokemon/${p.name}.png`];
				let ci = 0; sprite.onerror = function(){ ci++; if(ci < candidates.length) sprite.src = candidates[ci]; else sprite.style.display='none'; };
				sprite.src = candidates[0];
			}catch(e){ sprite.style.display='none'; }
			leftIcons.appendChild(sprite);

			// action button
			const btn = document.createElement('button'); btn.className='btn small'; btn.textContent='To Depot'; btn.style.marginTop='8px'; btn.addEventListener('click', ()=>{
				const moved = player.party.splice(idx,1)[0]; player.depot.push(moved); savePlayer(); updatePanels(); renderPartyList(); renderDepotList(); showMessage('Moved to depot.', 'info');
			});

			iconsRow.appendChild(leftIcons); iconsRow.appendChild(btn);

			card.appendChild(topRow); card.appendChild(iconsRow);
			list.appendChild(card);
		});
		partyCol.appendChild(list);
	}

	function renderControls(){
		controlsCol.innerHTML = '';
		const h = document.createElement('div'); h.style.fontWeight='700'; h.style.marginBottom='8px'; h.textContent = 'Quick Search'; controlsCol.appendChild(h);
		const input = document.createElement('input'); input.type='search'; input.placeholder='Type to search...'; input.style.width='100%'; input.style.padding='8px'; input.style.borderRadius='6px'; input.value = searchQuery || '';
		input.addEventListener('input', ()=>{ searchQuery = input.value || ''; renderDepotList(); });
		controlsCol.appendChild(input);
		const clearBtn = document.createElement('button'); clearBtn.className='btn'; clearBtn.textContent='Clear'; clearBtn.style.marginTop='8px'; clearBtn.addEventListener('click', ()=>{ searchQuery = ''; activeTypes = []; input.value=''; renderTypeButtons(); renderDepotList(); }); controlsCol.appendChild(clearBtn);

		const fh = document.createElement('div'); fh.style.fontWeight='700'; fh.style.margin = '14px 0 8px 0'; fh.textContent = 'Filter'; controlsCol.appendChild(fh);
		const filterWrap = document.createElement('div'); filterWrap.style.display='flex'; filterWrap.style.flexDirection='column'; filterWrap.style.gap='6px';
		// produce type buttons in two columns layout
		const typesGrid = document.createElement('div'); typesGrid.style.display='grid'; typesGrid.style.gridTemplateColumns='1fr 1fr'; typesGrid.style.gap='6px';
		TYPES.forEach(t=>{
			const b = document.createElement('button'); b.className='btn small'; b.textContent = t; b.setAttribute('data-type', t);
			b.style.textAlign='left'; b.style.padding='6px 8px'; b.style.borderRadius='18px'; b.style.border='none'; b.style.cursor='pointer';
			// inactive default style (dark pill)
			b.style.background = (activeTypes.indexOf(t) >= 0) ? TYPE_COLORS[t] : '#4a4a4a';
			b.style.color = '#fff';
			b.addEventListener('click', ()=>{
				const ty = b.getAttribute('data-type');
				const idx = activeTypes.indexOf(ty);
				if(idx >= 0){ activeTypes.splice(idx,1); b.style.background = '#4a4a4a'; }
				else {
					if(activeTypes.length >= 2){ showMessage('You can select up to 2 types only.', 'warn'); return; }
					activeTypes.push(ty); b.style.background = TYPE_COLORS[ty] || '#4a4a4a';
				}
				renderDepotList();
			});
			typesGrid.appendChild(b);
		});
		filterWrap.appendChild(typesGrid);
		controlsCol.appendChild(filterWrap);

		function renderTypeButtons(){
			const btns = typesGrid.querySelectorAll('button'); btns.forEach(bb=>{ const ty = bb.getAttribute('data-type'); if(activeTypes.indexOf(ty)>=0){ bb.style.background = TYPE_COLORS[ty] || '#4a4a4a'; bb.style.color = '#fff'; } else { bb.style.background = '#4a4a4a'; bb.style.color = '#fff'; } });
		}
		renderTypeButtons();
	}

	// single confirm modal helper: ensures only one modal exists and it's on top
	function createConfirmModal(message, onConfirm){
		try{ const existing = document.querySelector('.pl-confirm-overlay'); if(existing && existing.parentNode) existing.parentNode.removeChild(existing); }catch(e){}
		const overlay = document.createElement('div'); overlay.className = 'pl-confirm-overlay'; overlay.style.position = 'fixed'; overlay.style.left = 0; overlay.style.top = 0; overlay.style.right = 0; overlay.style.bottom = 0; overlay.style.background = 'rgba(0,0,0,0.45)'; overlay.style.display = 'flex'; overlay.style.alignItems = 'center'; overlay.style.justifyContent = 'center'; overlay.style.zIndex = 30050;
		const box = document.createElement('div'); box.style.background = '#fff'; box.style.padding = '14px'; box.style.borderRadius = '8px'; box.style.minWidth = '320px'; box.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
		box.innerHTML = `<div style="font-weight:700;margin-bottom:8px">Confirm</div><div style=\"margin-bottom:12px\">${escapeHtml(message)}</div>`;
		const controls = document.createElement('div'); controls.style.display='flex'; controls.style.gap='8px'; controls.style.justifyContent='flex-end';
		const ok = document.createElement('button'); ok.className='btn'; ok.textContent='Confirm'; ok.addEventListener('click', ()=>{ try{ if(typeof onConfirm === 'function') onConfirm(); }catch(e){} overlay.remove(); });
		const cancel = document.createElement('button'); cancel.className='btn secondary'; cancel.textContent='Cancel'; cancel.addEventListener('click', ()=>{ overlay.remove(); });
		controls.appendChild(ok); controls.appendChild(cancel); box.appendChild(controls); overlay.appendChild(box); document.body.appendChild(overlay);
	}

	function renderDepotList(){
		depotCol.innerHTML = '';
		const h = document.createElement('div'); h.style.fontWeight = '700'; h.style.marginBottom = '8px'; h.textContent = 'Pokemon Depot'; depotCol.appendChild(h);
		// gridWrap will hold the scrollable list so the header remains fixed
		const gridWrap = document.createElement('div');
		gridWrap.className = 'pl-depot-grid-wrap';
		gridWrap.style.overflow = 'auto';
		gridWrap.style.flex = '1';
		gridWrap.style.paddingRight = '4px';
		// build grid of depot pokemon filtered by search/type
		// Use a responsive grid with a slightly larger minimum card width so
		// items wrap nicely and remain readable. Cards use flex column layout
		// with a consistent min-height so many cards render in a tidy grid
		// and the depot column scrolls independently.
		const grid = document.createElement('div');
		grid.className = 'pl-depot-grid';
		grid.style.display = 'grid';
		// make the grid responsive with smaller minimums so multiple columns form
		grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
		// allow rows to size to content so cards wrap more naturally
		grid.style.gridAutoRows = 'auto';
		grid.style.gap = '12px';
		grid.style.alignItems = 'start';
		grid.style.justifyItems = 'stretch';
		grid.style.width = '100%';
		let any = false;
		player.depot.forEach((p, idx)=>{
			if(!matchesFilters(p)) return;
			any = true;
			const card = document.createElement('div');
			card.style.border = '1px solid #d2e6c9';
			card.style.background = '#f6fff3';
			card.style.padding = '10px';
			card.style.borderRadius = '8px';
			// Make card a vertical flex container so middle content can expand
			// and action buttons remain anchored to the bottom.
			card.style.display = 'flex';
			card.style.flexDirection = 'column';
			card.style.boxSizing = 'border-box';
			card.style.minHeight = '120px';
			card.style.justifyContent = 'space-between';
			card.style.minWidth = '0';
			card.style.overflow = 'visible';
			// header row (name + level + ball)
			const header = document.createElement('div'); header.style.display='flex'; header.style.justifyContent='space-between'; header.style.alignItems='center';
			const nameWrap = document.createElement('div'); nameWrap.style.display='flex'; nameWrap.style.flexDirection='column';
			const nameEl = document.createElement('div'); nameEl.style.fontWeight='700'; nameEl.textContent = p.name || '';
			const lvlEl = document.createElement('div'); lvlEl.style.fontSize='12px'; lvlEl.style.color = 'var(--muted)'; lvlEl.textContent = 'Lv ' + (p.level||1);
			nameWrap.appendChild(nameEl); nameWrap.appendChild(lvlEl);
			// type badges
			try{
				const types = Array.isArray(p.types) ? p.types : (p.type ? [p.type] : []);
				if(types && types.length){
					const badges = document.createElement('div'); badges.style.display='flex'; badges.style.gap='6px'; badges.style.marginTop='6px';
					types.forEach(tt=>{
						const tname = String(tt||'').charAt(0).toUpperCase() + String(tt||'').slice(1);
						const b = document.createElement('span'); b.textContent = tname; b.style.fontSize='11px'; b.style.padding='4px 8px'; b.style.borderRadius='12px'; b.style.color='#fff';
						const col = TYPE_COLORS[tname] || '#666'; b.style.background = col; badges.appendChild(b);
					});
					nameWrap.appendChild(badges);
				}
			}catch(e){}
			const ballWrap = document.createElement('div'); ballWrap.style.display='flex'; ballWrap.style.alignItems='center';
			try{ assignBallToPokemon(p); }catch(e){}
			const ballImg = document.createElement('img'); ballImg.alt = p.ball || 'ball'; ballImg.style.width='24px'; ballImg.style.height='24px'; ballImg.style.objectFit='contain';
			try{ setImageSrcWithFallback(ballImg, getBallImageCandidates(p.ball || 'Poke Ball')); }catch(e){ ballImg.src=''; }
			ballWrap.appendChild(ballImg);
			header.appendChild(nameWrap); header.appendChild(ballWrap);
			card.appendChild(header);

			// middle row: sprite + basic bars
			const mid = document.createElement('div'); mid.style.display='flex'; mid.style.gap='10px'; mid.style.alignItems='center'; mid.style.marginTop='8px';
			// allow middle section to grow so cards have consistent height
			mid.style.flex = '1 1 auto';
			const sprite = document.createElement('img'); sprite.alt = p.name || ''; sprite.style.width = '40px'; sprite.style.height = '40px'; sprite.style.objectFit = 'contain'; sprite.style.flex = '0 0 auto';
			sprite.style.maxWidth = '100%';
			sprite.style.height = 'auto';
			try{
				const fileKey = String(p.name || '').toLowerCase().replace(/[^a-z0-9]+/g,'_');
				const candidates = [`PokeLegion/pokemon/${fileKey}.png`,`PokeLegion/Pokemon/${fileKey}.png`,`PokeLegion/Pokemon/${p.name}.png`];
				let ci = 0; sprite.onerror = function(){ ci++; if(ci < candidates.length) sprite.src = candidates[ci]; else sprite.style.display='none'; };
				sprite.src = candidates[0];
			}catch(e){ sprite.style.display='none'; }
			const stats = document.createElement('div'); stats.style.flex='1'; stats.innerHTML = `<div style=\"font-size:12px;color:var(--muted)\">EXP</div><div style=\"height:6px;background:#fff;border-radius:4px;margin:6px 0\"><div style=\"width:40%;height:6px;background:#7fd175;border-radius:4px\"></div></div><div style=\"font-size:12px;color:var(--muted)\">HP: ${p.currentHp||0}/${p.hp||0}</div>`;
			mid.appendChild(sprite); mid.appendChild(stats);
			card.appendChild(mid);
			// action buttons: To Party, Sell, Release
			const actions = document.createElement('div'); actions.style.display='flex'; actions.style.justifyContent='flex-end'; actions.style.gap='6px'; actions.style.marginTop='8px';
			actions.style.flex = '0 0 auto';
			actions.style.flexWrap = 'wrap';
			actions.style.alignItems = 'center';
			const toParty = document.createElement('button'); toParty.className='btn small'; toParty.textContent='To Party'; toParty.style.marginTop = '6px'; toParty.addEventListener('click', ()=>{
				if(player.party.length < 6){ const moved = player.depot.splice(idx,1)[0]; player.party.push(moved); savePlayer(); updatePanels(); renderPartyList(); renderDepotList(); showMessage('Moved to party.', 'info'); }
				else showMessage('Party full. Free a slot first.', 'warn');
			});
			const sellBtn = document.createElement('button'); sellBtn.className='btn secondary small'; sellBtn.textContent='SELL - $'; sellBtn.style.marginTop = '6px'; sellBtn.addEventListener('click', ()=>{
				const price = Math.max(1, Math.floor((p.level||1) * 8));
				// ensure only one sell modal exists and it's on top
				createConfirmModal(`Sell ${p.name} for $${price}?`, ()=>{
					player.money = (Number(player.money)||0) + price; player.depot.splice(idx,1); savePlayer(); updatePanels(); renderDepotList(); renderPartyList(); addLog(`Sold ${p.name} for $${price}`); showMessage(`Sold ${p.name} for $${price}`,'info');
				});
			});
			const releaseBtn = document.createElement('button'); releaseBtn.className='btn secondary small'; releaseBtn.textContent='RELEASE'; releaseBtn.style.marginTop = '6px'; releaseBtn.addEventListener('click', ()=>{
				createConfirmModal(`Release ${p.name}? This cannot be undone.`, ()=>{ player.depot.splice(idx,1); savePlayer(); updatePanels(); renderDepotList(); renderPartyList(); addLog(`Released ${p.name}`); showMessage(`${p.name} released.`, 'info'); });
			});
			actions.appendChild(toParty); actions.appendChild(sellBtn); actions.appendChild(releaseBtn);
			card.appendChild(actions);

			// capture info/footer
			const capInfo = document.createElement('div'); capInfo.style.marginTop='8px'; capInfo.style.fontSize='12px'; capInfo.style.color='var(--muted)';
			const capturedRaw = p.capturedAt || p.capturedOn || p.capturedDate || p.caughtAt || p.caughtOn || p.caughtDate || p.captured || null;
			if(capturedRaw){
				try{
					const d = new Date(capturedRaw);
					if(isFinite(d.getTime())) capInfo.textContent = `Captured on ${d.toLocaleDateString()} at Lv.${p.level||1}`;
					else capInfo.textContent = `Captured at Lv.${p.level||1}`;
				}catch(e){ capInfo.textContent = `Captured at Lv.${p.level||1}`; }
			} else if(p.capturedBy){
				capInfo.textContent = `Captured at Lv.${p.level||1}`;
			} else {
				capInfo.textContent = `Captured at Lv.${p.level||1}`;
			}
			card.appendChild(capInfo);
			grid.appendChild(card);
		});
		if(!any){ const em = document.createElement('div'); em.style.color='var(--muted)'; em.style.padding = '8px'; em.textContent='No Pokémon match your search/filters.'; gridWrap.appendChild(em); } else gridWrap.appendChild(grid);
		depotCol.appendChild(gridWrap);
		// expose a hook to recalc columns once the modal is in the DOM
		try{
			// small helper: compute number of columns based on available width and min column size
			const adjustDepotGridColumns = function(){
				try{
					const wrap = depotCol.querySelector('.pl-depot-grid-wrap');
					const g = depotCol.querySelector('.pl-depot-grid');
					if(!wrap || !g) return;
					const w = wrap.clientWidth || wrap.getBoundingClientRect().width || 0;
					// choose a sensible minimum column width (matches grid minmax min)
					const minCol = 140;
					const cols = Math.max(1, Math.floor(Math.max(1, w) / minCol));
					g.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
				}catch(e){}
			};
			// call once after render; a resize listener will keep it responsive
			window.addEventListener('resize', adjustDepotGridColumns);
			// store on depotCol so we can clean up when closing the modal
			depotCol._adjustDepotGridColumns = adjustDepotGridColumns;
		}catch(e){}
	}

	cols.appendChild(partyCol);
	cols.appendChild(controlsCol);
	cols.appendChild(depotCol);
	box.appendChild(cols);

	renderPartyList(); renderControls(); renderDepotList();

	const close = document.createElement('div'); close.style.marginTop='12px'; const cbtn = document.createElement('button'); cbtn.className='btn secondary'; cbtn.textContent='Close'; cbtn.addEventListener('click', ()=>{ try{ if(depotCol && depotCol._adjustDepotGridColumns) window.removeEventListener('resize', depotCol._adjustDepotGridColumns); }catch(e){} overlay.remove(); }); close.appendChild(cbtn); box.appendChild(close);
	overlay.appendChild(box); document.body.appendChild(overlay);
}

	// tracks whether the global keydown handler is currently attached
	let movementEnabled = false;
	let keydownAttached = false;

	// UI interactions
	// Select an avatar button: ensure only this one is marked selected and animated
	function selectAvatar(btn){
		if(!avatarChoices || !btn) return;
		const all = [...avatarChoices.querySelectorAll('.avatar-choice')];
		all.forEach(b=>{
			if(b === btn){
				b.classList.add('selected');
				// start or create animator for selected
				const src = b.getAttribute('data-avatar');
				if(src && (src.endsWith('.png') || src.includes('/'))){
					if(b._anim && typeof b._anim.play === 'function'){
						try{ b._anim.play('south'); }catch(e){}
					}else{
						// lazy create animator and replace thumbnail
						loadImageAny(src).then(img=>{
							try{
								const anim = createPlayerAnimatorFromImage(img, {cols:3, rows:4, fps:10});
								// size canvas to thumbnail
								anim.canvas.style.width = '40px'; anim.canvas.style.height = '40px';
								// hide existing thumb img
								const thumb = b.querySelector('img'); if(thumb) thumb.style.display = 'none';
								b.insertBefore(anim.canvas, b.firstChild);
								b._anim = anim;
								anim.play('south');
							}catch(e){ console.warn('selectAvatar anim error', e); }
						}).catch(()=>{});
					}
				}
			} else {
				b.classList.remove('selected');
				// stop/remove animator for non-selected
				if(b._anim){ try{ b._anim.stop(); if(b._anim.canvas && b._anim.canvas.parentNode) b._anim.canvas.parentNode.removeChild(b._anim.canvas); }catch(e){} b._anim = null; }
				// show thumbnail image if present
				const thumb = b.querySelector('img'); if(thumb) thumb.style.display = '';
			}
		});
		// update modal preview for the selected avatar
		updateAvatarPreview();
	}

	avatarChoices.addEventListener('click', e=>{
		const btn = e.target.closest('.avatar-choice');
		if(!btn) return;
		selectAvatar(btn);
	});

	// starter selection
	if(starterChoices){
		starterChoices.addEventListener('click', e=>{
			const btn = e.target.closest('.starter-choice');
			if(!btn) return;
			[...starterChoices.querySelectorAll('.starter-choice')].forEach(b=>b.classList.remove('selected'));
			btn.classList.add('selected');
		});
	}

// Inventory collapse/expand behavior
function setInventoryCollapsed(collapsed){
	// Always update the UI immediately
	if(inventoryGridEl) inventoryGridEl.style.display = collapsed ? 'none' : '';
	if(inventorySummary) inventorySummary.style.display = collapsed ? 'none' : '';
	if(openBackpackBtn) openBackpackBtn.textContent = collapsed ? 'Expand' : 'Collapse';
	// Persist state if a player is available
	if(player){
		player.inventoryCollapsed = !!collapsed;
		savePlayer();
	}
}

// Create a small thumbnail canvas showing the front-facing (south) middle frame
function createAvatarThumbnail(sheetImg, size=48){
	try{
		const cols = 3, rows = 4;
		const frameW = Math.floor(sheetImg.width / cols);
		const frameH = Math.floor(sheetImg.height / rows);
		// middle column (1), south row (1)
		const sx = frameW * 1;
		const sy = frameH * 1;
		const canvas = document.createElement('canvas');
		canvas.width = size; canvas.height = size;
		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.clearRect(0,0,size,size);
		ctx.drawImage(sheetImg, sx, sy, frameW, frameH, 0, 0, size, size);
		return canvas;
	}catch(e){
		return null;
	}
}

// Attach hover autoplay: on first hover create an animator canvas and play walking animation;
// on leave, idle to middle frame. Keeps the thumbnail visible when animator not created.
function attachThumbnailHover(btn, sheetSrc){
	if(!btn) return;
	let thumb = btn.querySelector('img');
	btn.addEventListener('mouseenter', function onEnter(){
		// lazy-create animator
		if(btn._anim){ try{ btn._anim.play('south'); }catch(e){}; return; }
		loadImageAny(sheetSrc).then(img=>{
			try{
				const anim = createPlayerAnimatorFromImage(img, {cols:3, rows:4, fps:10});
				// size the canvas to thumbnail area
				anim.canvas.style.width = (thumb ? thumb.style.width || '40px' : '40px');
				anim.canvas.style.height = (thumb ? thumb.style.height || '40px' : '40px');
				// insert animator and hide thumb
				if(thumb) thumb.style.display = 'none';
				btn.insertBefore(anim.canvas, btn.firstChild);
				btn._anim = anim;
				anim.play('south');
			}catch(e){ console.warn('anim create failed', e); }
		}).catch(()=>{
			// nothing
		});
	});
	btn.addEventListener('mouseleave', function onLeave(){
		if(btn._anim){ try{ btn._anim.idle('south'); }catch(e){} }
	});
}

// Enhance starter choice buttons by adding a small pokemon image next to the label
function enhanceStarterChoices(){
	if(!starterChoices) return;
	const buttons = starterChoices.querySelectorAll('.starter-choice');
	buttons.forEach(btn=>{
		const existing = btn.querySelector('img');
		if(existing) return; // already enhanced
		const data = btn.getAttribute('data-starter') || btn.textContent || btn.innerText;
		if(!data) return;
		const name = data.toString().trim();
		const fileKey = name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
		const candidates = [
			`PokeLegion/Pokemon/${fileKey}.png`,
			`PokeLegion/pokemon/${fileKey}.png`,
			`PokeLegion/Pokemon/${fileKey}.jpg`,
			`PokeLegion/pokemon/${fileKey}.jpg`,
			`PokeLegion/Pokemon/${fileKey}.gif`,
			`PokeLegion/pokemon/${fileKey}.gif`,
			// try using the literal name as a fallback (some files may use original casing)
			`PokeLegion/Pokemon/${name}.png`,
			`PokeLegion/pokemon/${name}.png`
		];
		let ci = 0;
		const img = document.createElement('img');
		img.style.width = '36px'; img.style.height = '36px'; img.style.objectFit = 'contain'; img.style.marginRight = '8px';
		img.alt = name;
		img.onerror = function(){ ci++; if(ci < candidates.length) img.src = candidates[ci]; else img.remove(); };
		img.onload = function(){ /* loaded successfully */ };
		img.src = candidates[ci];
		// insert image before text content
		try{ btn.insertBefore(img, btn.firstChild); }catch(e){ /* ignore */ }
	});
}

if(openBackpackBtn){
	openBackpackBtn.addEventListener('click', ()=>{
		if(battleActive){ return showMessage('Cannot open inventory during a battle.', 'warn'); }
		// toggle
		const collapsed = !!(player && player.inventoryCollapsed);
		setInventoryCollapsed(!collapsed);
	});
}

	// map selector and unlock
	const mapSelector = document.getElementById('mapSelector');
	const unlockMapBtn = document.getElementById('unlockMap');
	if(mapSelector){
		mapSelector.addEventListener('change', e=>{
			if(battleActive){ showMessage('Cannot change map during a battle.', 'warn'); e.target.value = currentMapIndex; return; }
			const idx = parseInt(e.target.value,10);
			if(unlockedMaps.includes(idx)) setCurrentMap(idx);
		});
	}
	if(unlockMapBtn){
		unlockMapBtn.addEventListener('click', ()=>{
			if(battleActive){ return showMessage('Cannot unlock maps during a battle.', 'warn'); }
			const next = Math.min(MAPS.length-1, currentMapIndex+1);
			if(unlockedMaps.includes(next)){
				addLog('No more maps to unlock or already unlocked.');
				return;
			}
			unlockedMaps.push(next);
			renderMap();
			addLog('Unlocked map: ' + MAPS[next].name);
		});
	}

	createBtn.addEventListener('click', ()=>{
		const name = playerNameInput.value.trim() || '';
		// selected avatar may be null; require when creating a new profile
		const sel = avatarChoices ? avatarChoices.querySelector('.avatar-choice.selected') : null;
		let avatar = sel ? sel.getAttribute('data-avatar') : null;
		const selStarter = starterChoices ? starterChoices.querySelector('.starter-choice.selected') : null;
		let starter = selStarter ? selStarter.getAttribute('data-starter') : null;
		// Validate name: 1..18 characters, letters and spaces only (no numbers/symbols)
		if(!name){ showMessage('Please enter a trainer name.','error',3000); playerNameInput.focus(); return; }
		if(!/^[\p{L} ]{1,18}$/u.test(name)){
			showMessage('Name must be 1–18 letters and spaces only (no numbers or special symbols).','error',4000);
			playerNameInput.focus();
			return;
		}
		// If creating a new profile, avatar and starter are required. In edit mode, fall back to existing values.
		if(modalMode === 'create'){
			if(!avatar){ showMessage('Please choose an avatar.','error',3000); return; }
			if(!starter){ showMessage('Please choose a starter Pokémon.','error',3000); return; }
		} else {
			if(!avatar && player) avatar = player.avatar || null;
			if(!starter && player) starter = player.starter || null;
		}

			// if editing existing player, update; otherwise create new
			if(player){
				// updating existing profile: do not overwrite starter unless none exists
				player.name = name; player.avatar = avatar;
				player.inventory = player.inventory || DEFAULT_INV;
				player.money = (typeof player.money === 'number') ? player.money : DEFAULT_MONEY;
				player.gems = (typeof player.gems === 'number') ? player.gems : 0;
				player.tasks = player.tasks || [];
				if(!player.starter) player.starter = starter;
				if(!player.party || player.party.length===0) player.party = [{ name: player.starter, level: 5, exp: 0, hp: 30 + 5*5, currentHp: 30 + 5*5, power: Math.max(0, Math.floor(5/2)) }];
				// ensure types and ball assignment for any newly created starter entry
				try{ player.party.forEach(m=>{ ensurePokemonHasTypes(m); try{ assignBallToPokemon(m); }catch(e){} }); }catch(e){}
				// ensure inventory contains defaults and held exists
				ensureInventoryDefaults();
				if(!Array.isArray(player.held)) player.held = [];
			} else {
				player = {name,avatar,starter,inventory:DEFAULT_INV,money:DEFAULT_MONEY,gems:0,party:[{ name: starter, level: 5, exp: 0, hp: 30 + 5*5, currentHp: 30 + 5*5, power: Math.max(0, Math.floor(5/2)) }],log:[],tasks:[],level:1,exp:0,achievementsClaimed:[],held:[],mapIndex: currentMapIndex, unlockedMaps: unlockedMaps};
				try{ player.party.forEach(m=>{ ensurePokemonHasTypes(m); try{ assignBallToPokemon(m); }catch(e){} }); }catch(e){}
				// give the new player an amulet-coin in held if present in defaults
				if(player.inventory && player.inventory['amulet-coin']) player.held.push('amulet-coin');
			}

		// ensure player has a centered starting position
		centerPlayer();
		renderPlayer();
		updatePanels();
		savePlayer();

		// hide modal and show main game area
		hideProfileModal();
		// force-hide the modal in case CSS class didn't take effect in some browsers
		try{ profileModal.style.display = 'none'; }catch(e){}
		gameRoot.classList.remove('hidden');
		mapOverlay.classList.add('hidden');
		// set modal mode to edit to prevent re-opening a create dialog
		modalMode = 'edit';
		addLog('Adventure started. Good luck!');

		// add keyboard movement listener once (track attachment so we can remove during battles)
		if(!movementEnabled){ window.addEventListener('keydown', handleKey); movementEnabled = true; keydownAttached = true; }
		// focus for accessibility
		playerEl.focus();
	});

	cancelBtn.addEventListener('click', ()=>{
		// close modal without saving
		hideProfileModal();
		// if editing, keep game visible; if creating and no player yet, ensure game remains hidden
		if(modalMode === 'edit'){
			gameRoot.classList.remove('hidden');
		} else {
			// remain hidden until a profile exists
			if(!player) gameRoot.classList.add('hidden');
		}
	});

	modalClose.addEventListener('click', ()=>{
		hideProfileModal();
		if(modalMode === 'edit') gameRoot.classList.remove('hidden');
		else if(!player) gameRoot.classList.add('hidden');
	});

	// Delete profile button
	const deleteProfileBtn = document.getElementById('deleteProfile');
	if(deleteProfileBtn){
		deleteProfileBtn.addEventListener('click', ()=>{
			if(!player){ showMessage('No profile to delete.', 'error', 3000); return; }
			showConfirm('Delete your profile and all saved data?', ()=>{
				try{ localStorage.removeItem(STORAGE_KEY); }catch(e){console.warn(e)}
				player = null;
				// clear UI
				profileSummary.innerHTML = '';
				inventorySummary.innerHTML = '';
				if(inventoryGridEl) inventoryGridEl.innerHTML = '';
				if(moneyAmountEl) moneyAmountEl.textContent = '$0';
				if(gemsAmountEl) gemsAmountEl.textContent = '0';
				if(heldItemsEl) heldItemsEl.innerHTML = '';
				if(tasksListEl) tasksListEl.innerHTML = '<div class="tasks-note">You can have up to <strong>2</strong> active tasks.</div>';
				// reset level/exp
				// these will be set when creating a new profile
				partyList.innerHTML = '(empty)';
				encounterLog.innerHTML = '';
				if(ballGrid) ballGrid.innerHTML = '';
				// ensure modal is shown to create new profile
				gameRoot.classList.add('hidden');
				showProfileModal('create', true);
			}, ()=>{ /* cancelled */ });
        
		});
	}

	// Edit profile button (removed from UI) — only attach handler if button exists
	if(editProfileBtn){
		editProfileBtn.addEventListener('click', ()=>{
			if(!player) return;
			showProfileModal('edit', false);
			playerNameInput.value = player.name || '';
			setTimeout(()=>{
				const allS = starterChoices ? starterChoices.querySelectorAll('.starter-choice') : [];
				allS.forEach(b=>b.classList.remove('selected'));
				let smatch = null;
				allS.forEach(b=>{ if(b.getAttribute('data-starter') === player.starter) smatch = b });
				if(smatch) smatch.classList.add('selected');
			}, 50);
			const all = avatarChoices.querySelectorAll('.avatar-choice');
			all.forEach(b=>b.classList.remove('selected'));
			let matched = null;
			all.forEach(b=>{ if(b.getAttribute('data-avatar') === player.avatar) matched = b });
			if(matched) matched.classList.add('selected');
			updateAvatarPreview();
		});
	}

	function updateAvatarPreview(){
		const sel = avatarChoices.querySelector('.avatar-choice.selected');
		if(!avatarPreview) return;
		if(!sel){ avatarPreview.textContent = '🙂'; avatarPreview.innerHTML = '🙂'; return; }
		const val = sel.getAttribute('data-avatar');
		if(typeof val === 'string'){
			// animated preview using same animator helpers
			avatarPreview.innerHTML = '';
			loadImageAny(val).then(img=>{
				// stop and remove any prior preview animator canvas
				try{
					if(avatarPreview._anim){
						if(typeof avatarPreview._anim.stop === 'function') avatarPreview._anim.stop();
						if(avatarPreview._anim.canvas && avatarPreview._anim.canvas.parentNode) avatarPreview._anim.canvas.parentNode.removeChild(avatarPreview._anim.canvas);
					}
				}catch(e){}
				const anim = createPlayerAnimatorFromImage(img, { cols:3, rows:4, fps:8 });
				avatarPreview._anim = anim;
				anim.idle('south');
				// scale canvas to fit preview box (approx 64px)
				anim.canvas.style.width = '64px'; anim.canvas.style.height = '64px';
				avatarPreview.appendChild(anim.canvas);
			}).catch(()=>{
					// remove prior animator if present
					try{ if(avatarPreview._anim){ if(typeof avatarPreview._anim.stop === 'function') avatarPreview._anim.stop(); if(avatarPreview._anim.canvas && avatarPreview._anim.canvas.parentNode) avatarPreview._anim.canvas.parentNode.removeChild(avatarPreview._anim.canvas); avatarPreview._anim = null; } }catch(e){}
					avatarPreview.innerHTML = '';
					// fallback: try to show a simple <img> if the value looks like an image path, otherwise show emoji/text
					if(val && (val.includes('/') || /\.(png|jpg|jpeg|gif)$/i.test(val))){
						const img = document.createElement('img'); img.src = val; img.alt = 'avatar'; img.style.width = '64px'; img.style.height = '64px'; img.style.objectFit = 'contain'; img.onerror = ()=>{ avatarPreview.textContent = '🙂'; };
						avatarPreview.appendChild(img);
					} else {
						avatarPreview.textContent = val || '🙂';
					}
			});
		} else {
			// remove prior animator if present
			try{ if(avatarPreview._anim){ if(typeof avatarPreview._anim.stop === 'function') avatarPreview._anim.stop(); if(avatarPreview._anim.canvas && avatarPreview._anim.canvas.parentNode) avatarPreview._anim.canvas.parentNode.removeChild(avatarPreview._anim.canvas); avatarPreview._anim = null; } }catch(e){}
			avatarPreview.innerHTML = '';
			// if the value looks like an image path, render an <img>, otherwise show the provided text/emoji
			if(val && (val.includes('/') || /\.(png|jpg|jpeg|gif)$/i.test(val))){
				const img = document.createElement('img'); img.src = val; img.alt = 'avatar'; img.style.width = '64px'; img.style.height = '64px'; img.style.objectFit = 'contain'; img.onerror = ()=>{ avatarPreview.textContent = '🙂'; };
				avatarPreview.appendChild(img);
			} else {
				avatarPreview.textContent = val || '🙂';
			}
		}

        
	}

	function isValidPlayer(p){
		return p && typeof p.name === 'string' && p.name.trim().length>0 && !!p.avatar && !!p.starter;
	}

	// If a saved player exists and is valid, use it. Otherwise show modal first.
	window.addEventListener('load', ()=>{
		const loaded = loadPlayer();
		if(loaded && isValidPlayer(loaded)){
			player = loaded;
			// load stored per-pokemon progression and apply to party members
			try{
				loadPokeProgress();
				player.party = player.party || [];
				player.party = player.party.map(m => {
					if(typeof m === 'string') m = { name: m, level:1, exp:0 };
					if(typeof m !== 'object' || m === null) m = { name: String(m||''), level:1, exp:0 };
					if(typeof m.level !== 'number') m.level = 1;
					if(typeof m.exp !== 'number') m.exp = 0;
					ensurePokemonHasTypes(m);
					try{ assignBallToPokemon(m); }catch(e){}
					try{ applyStoredProgressToPokemon(m); }catch(e){}
					return m;
				});
				if(!Array.isArray(player.depot)) player.depot = player.depot || [];
				// normalize depot entries as well
				if(Array.isArray(player.depot)){
					player.depot = player.depot.map(p => { try{ if(!p || typeof p !== 'object') p = { name: String(p||''), level:1, exp:0 }; ensurePokemonHasTypes(p); try{ assignBallToPokemon(p); }catch(e){} return p; }catch(e){ return p; } });
				}
			}catch(e){}
			// ensure new inventory keys exist for older saves
			ensureInventoryDefaults();
			// ensure gems exists
			if(typeof player.gems !== 'number') player.gems = 0;
			// initialize held items if missing: prefer to hold an amulet coin if available
			if(!Array.isArray(player.held)){
				player.held = [];
				if((player.inventory && player.inventory['amulet-coin']) && player.held.length===0) player.held.push('amulet-coin');
			}
			// ensure money and tasks exist for older saves
			if(typeof player.money !== 'number') player.money = DEFAULT_MONEY;
			if(!Array.isArray(player.tasks)) player.tasks = [];
			if(typeof player.level !== 'number') player.level = 1;
			if(typeof player.exp !== 'number') player.exp = 0;
			if(!Array.isArray(player.achievementsClaimed)) player.achievementsClaimed = [];
			if(typeof player.gems !== 'number') player.gems = 0;
			// Ensure modal is fully hidden and cannot steal focus
			try{ profileModal.classList.add('hidden'); profileModal.style.display = 'none'; profileModal.setAttribute('aria-hidden','true'); }catch(e){}
			gameRoot.classList.remove('hidden');
			// pick map index from saved data if available
			if(loaded.mapIndex!=null) currentMapIndex = loaded.mapIndex;
			// unlock maps if saved
			if(Array.isArray(loaded.unlockedMaps)) unlockedMaps = loaded.unlockedMaps;
			renderMap();
			renderPlayer();
			updatePanels();
			window.addEventListener('keydown', handleKey);
			keydownAttached = true;
		} else {
			// ensure game area stays hidden until user creates a valid profile
			gameRoot.classList.add('hidden');
			// if there is partial data, prefill the modal fields
			if(loaded){
				playerNameInput.value = loaded.name || '';
				// prefill starter if present
				setTimeout(()=>{
					const allS = starterChoices ? starterChoices.querySelectorAll('.starter-choice') : [];
					allS.forEach(b=>b.classList.remove('selected'));
					let smatch = null;
					allS.forEach(b=>{ if(b.getAttribute('data-starter') === loaded.starter) smatch = b });
					if(smatch) smatch.classList.add('selected');
				}, 200);
				// try to select matching avatar after assets load
				setTimeout(()=>{
					const all = avatarChoices.querySelectorAll('.avatar-choice');
					all.forEach(b=>b.classList.remove('selected'));
					let matched = null;
					all.forEach(b=>{ if(b.getAttribute('data-avatar') === loaded.avatar) matched = b });
					if(matched) matched.classList.add('selected');
					updateAvatarPreview();
				}, 200);
			}
			showProfileModal('create', true);
		}
		// load assets manifest (non-blocking)
		loadAssetsManifest();
		// Also load any embedded CSV maps so they replace placeholders immediately
		loadEmbeddedMaps();
		// enhance starter buttons to show images
		enhanceStarterChoices();
	});

	// clicking the map overlay should start the game if a profile exists (fast start)
	document.getElementById('mapArea').addEventListener('click', ()=>{
		if(!player) return;
		mapOverlay.classList.add('hidden');
		startGame();
	});

	// Keep player centered on resize
	window.addEventListener('resize', ()=>{ if(player && player.pos) setPlayerPosition(player.pos.x, player.pos.y); });

// Expose a small debug API so developer can call helpers from the console
// e.g. `PokeLegion.addExp(100)` or `PokeLegion.player()`
try{
	window.PokeLegion = window.PokeLegion || {};
	Object.assign(window.PokeLegion, {
		addExp: function(n){ try{ return addExp(n); }catch(e){ console.error('addExp failed:', e); } },
		xpForNextLevel: function(l){ try{ return xpForNextLevel(l); }catch(e){ console.error(e); } },
		player: function(){ return player; },
		savePlayer: function(){ try{ return savePlayer(); }catch(e){ console.error(e); } },
		loadPlayer: function(){ try{ return loadPlayer(); }catch(e){ console.error(e); } },
		setInventoryCollapsed: function(b){ try{ return setInventoryCollapsed(!!b); }catch(e){ console.error(e); } }
	});
	// convenience global alias used in quick console tests
	try{ window.addExp = window.PokeLegion.addExp; }catch(e){}
}catch(e){ console.warn('Could not expose debug API', e); }

})();

