// Proficiency.js - Proficiency System Browser

const CATEGORIES = {
    combat:     { label: 'Combate Ofensivo', css: 'cat-combat' },
    defense:    { label: 'Combate Defensivo', css: 'cat-defense' },
    movement:   { label: 'Movimiento', css: 'cat-movement' },
    profession: { label: 'Profesión', css: 'cat-profession' },
    charm:      { label: 'Charms', css: 'cat-charm' },
    ability:    { label: 'Habilidades', css: 'cat-ability' },
    status:     { label: 'Estados', css: 'cat-status' },
    move:       { label: 'Movimientos', css: 'cat-move' },
    type_boost: { label: 'Boost de Tipo', css: 'cat-type-boost' },
    mega:       { label: 'Mega Evolución', css: 'cat-mega' },
    utility:    { label: 'Utilidad', css: 'cat-utility' },
    pvp:        { label: 'PvP', css: 'cat-pvp' },
};

// [ id, description, category ]
const proficiencies = [
    [1,   'Increases the chance to mine Diancie by 3%.',                                                                                    'profession'],
    [2,   'Increases the chance to mine Diancie by 5%.',                                                                                    'profession'],
    [3,   'Increases the chance to mine Diancie by 10%.',                                                                                   'profession'],
    [4,   'Increases the chance to mine Carbink by 5%.',                                                                                    'profession'],
    [5,   'Harvest cooldown reduced by 15s.',                                                                                               'profession'],
    [6,   'Mining cooldown reduced by 15s.',                                                                                                'profession'],
    [7,   'Reduces damage received by 5%.',                                                                                                  'defense'],
    [8,   'Reduces damage received by 7%.',                                                                                                  'defense'],
    [9,   'Reduces damage received by 10%.',                                                                                                 'defense'],
    [10,  'Increases damage dealt to neutral elements by 5%.',                                                                              'combat'],
    [11,  'Increases damage dealt to neutral elements by 10%.',                                                                             'combat'],
    [12,  'Increases flying speed by 30%.',                                                                                                 'movement'],
    [13,  'Increases surfing speed by 30%.',                                                                                                'movement'],
    [14,  'Increases riding speed by 30%.',                                                                                                 'movement'],
    [15,  '10% chance to harvest an additional Berry or Apricorn.',                                                                         'profession'],
    [16,  '10% chance to mine an additional Powder.',                                                                                       'profession'],
    [17,  '3% chance to bypass Reflect.',                                                                                                   'combat'],
    [18,  '5% chance to bypass Reflect.',                                                                                                   'combat'],
    [19,  '3% chance to bypass protection moves.',                                                                                          'combat'],
    [20,  '5% chance to bypass protection moves.',                                                                                          'combat'],
    [21,  '5% chance to bypass type immunities.',                                                                                           'combat'],
    [22,  '15% boost to Hyper Potion effectiveness.',                                                                                       'utility'],
    [23,  '2% chance to heal the user for 10% of the damage dealt.',                                                                        'combat'],
    [24,  '3% chance to heal the user for 15% of the damage dealt.',                                                                        'combat'],
    [25,  'Boosts Wealth Charm by 20%.',                                                                                                    'charm'],
    [26,  'Boosts Lucky Charm by 10%.',                                                                                                     'charm'],
    [27,  'Boosts Dodge Charm by 10%.',                                                                                                     'charm'],
    [28,  'Boosts Stunning Charm by 20%.',                                                                                                  'charm'],
    [29,  'Boosts Vital Charm by 20%.',                                                                                                     'charm'],
    [30,  'Boosts Mimic Charm by 20%.',                                                                                                     'charm'],
    [31,  'Boosts Cure Charm by 20%.',                                                                                                      'charm'],
    [32,  'Boosts Experience Charm by 25%.',                                                                                                'charm'],
    [33,  'Boosts Power Charm by 5%.',                                                                                                      'charm'],
    [34,  'Boosts Defense Charm by 10%.',                                                                                                   'charm'],
    [35,  'Boosts Catch Charm by 10%.',                                                                                                     'charm'],
    [36,  'Boosts Fire Charm by 70%.',                                                                                                      'charm'],
    [37,  'Reduces cooldown of Dodge Charm by 50%.',                                                                                        'charm'],
    [38,  'Regenerate 1% of the user\'s maximum health every 2 seconds while not in battle.',                                               'defense'],
    [39,  'The enemy\'s Mold Breaker has no effect on the user.',                                                                           'defense'],
    [40,  'Boosts the Adaptability ability by 20%.',                                                                                        'ability'],
    [41,  'Boosts the Battery ability by 20%.',                                                                                             'ability'],
    [42,  'Boosts the Berserk ability by 20%.',                                                                                             'ability'],
    [43,  'Increases the chance to use the Disguise ability by 20%.',                                                                       'ability'],
    [44,  'Boosts the Filter ability by 10%.',                                                                                              'ability'],
    [45,  'Increases the effect of Friend Guard by 25% when received from an ally.',                                                        'ability'],
    [46,  'Boosts the Heatproof ability by 10%.',                                                                                           'ability'],
    [47,  'Boosts the Intimidate ability by 25%.',                                                                                          'ability'],
    [48,  'Boosts the Leaf Guard ability by 100%.',                                                                                         'ability'],
    [49,  '+10% Moxie ability damage cap.',                                                                                                 'ability'],
    [50,  '+10% Moody ability cap.',                                                                                                        'ability'],
    [51,  'Boosts the Regenerator ability by 30%.',                                                                                         'ability'],
    [52,  'Boosts the Rivalry ability by 100%.',                                                                                            'ability'],
    [53,  'Boosts the Schooling ability by 100%.',                                                                                          'ability'],
    [54,  'Boosts the Shed Skin ability by 50%.',                                                                                           'ability'],
    [55,  'Boosts the Solid Rock ability, increasing the multiplier to 1.5x instead of 1.7x.',                                             'ability'],
    [56,  'Boosts the Tangled Feet ability by 25%.',                                                                                        'ability'],
    [57,  'Reduces the cooldown of the Telepathy ability to 30 seconds.',                                                                   'ability'],
    [58,  'Boosts the Volt Absorb ability by 50%. Also reduces the cooldown to 1 minute.',                                                  'ability'],
    [59,  'Boosts the Water Absorb ability by 50%. Also reduces the cooldown to 1 minute.',                                                 'ability'],
    [60,  '15% chance to bypass through Levitate ability.',                                                                                 'ability'],
    [61,  'Reduces Mega Transformation cooldown to 4 hours 30 minutes.',                                                                    'mega'],
    [62,  'Allows Wobbuffet to learn up to 2 TMs.',                                                                                         'utility'],
    [63,  '3% chance to deal critical damage.',                                                                                             'combat'],
    [64,  '5% chance to deal critical damage.',                                                                                             'combat'],
    [65,  '10% chance to deal critical damage.',                                                                                            'combat'],
    [66,  '5% extra critical damage.',                                                                                                      'combat'],
    [67,  '10% extra critical damage.',                                                                                                     'combat'],
    [68,  '1% life leech.',                                                                                                                 'combat'],
    [69,  '1.5% life leech.',                                                                                                               'combat'],
    [70,  '2% life leech.',                                                                                                                 'combat'],
    [71,  'Boosts the Ingrain move by 10%.',                                                                                                'move'],
    [72,  'Boosts the Ingrain move by 15%.',                                                                                                'move'],
    [73,  'Boosts the Recovery Wish move by 10%.',                                                                                          'move'],
    [74,  'Boosts the Recovery Wish move by 15%.',                                                                                          'move'],
    [75,  'Increases the duration of Reflect by 2 seconds.',                                                                                'move'],
    [76,  'Increases the duration of Protection by 2 seconds.',                                                                             'move'],
    [77,  'Increases the duration of Detect by 2 seconds.',                                                                                 'move'],
    [78,  'Increases the duration of Confusion status condition caused by the user by 2 seconds.',                                          'status'],
    [79,  'Increases the duration of Sleep status condition caused by the user by 2 seconds.',                                              'status'],
    [80,  'Increases the duration of Frozen Solid status condition caused by the user by 2 seconds.',                                       'status'],
    [81,  '15% chance to avoid the Confusion status condition. (PvE only)',                                                                 'status'],
    [82,  '15% chance to avoid the Sleep status condition. (PvE only)',                                                                     'status'],
    [83,  '15% chance to avoid the Frozen Solid status condition. (PvE only)',                                                              'status'],
    [84,  '10% less damage received from Grass type.',                                                                                      'defense'],
    [85,  '10% less damage received from Water type.',                                                                                      'defense'],
    [86,  '10% less damage received from Fire type.',                                                                                       'defense'],
    [87,  '10% less damage received from Bug type.',                                                                                        'defense'],
    [88,  '10% less damage received from Dark type.',                                                                                       'defense'],
    [89,  '10% less damage received from Ghost type.',                                                                                      'defense'],
    [90,  '10% less damage received from Fighting type.',                                                                                   'defense'],
    [91,  '10% less damage received from Normal type.',                                                                                     'defense'],
    [92,  '10% less damage received from Ice type.',                                                                                        'defense'],
    [93,  '10% less damage received from Psychic type.',                                                                                    'defense'],
    [94,  '10% less damage received from Fairy type.',                                                                                      'defense'],
    [95,  '10% less damage received from Rock type.',                                                                                       'defense'],
    [96,  '10% less damage received from Ground type.',                                                                                     'defense'],
    [97,  '10% less damage received from Electric type.',                                                                                   'defense'],
    [98,  '10% less damage received from Flying type.',                                                                                     'defense'],
    [99,  '10% less damage received from Steel type.',                                                                                      'defense'],
    [100, '10% less damage received from Dragon type.',                                                                                     'defense'],
    [101, '10% less damage received from Poison type.',                                                                                     'defense'],
    [102, 'Boosts Normal type moves by 35%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [103, 'The user gains a temporary second ability upon each release.',                                                                    'ability'],
    [104, 'Deals 10% more damage to enemies resistant to the move\'s type. (no effect against bosses)',                                     'combat'],
    [105, '10% less damage received from Water type while fishing.',                                                                        'profession'],
    [106, 'Provokes nearby passive Pokemon within a 4x4 area.',                                                                             'utility'],
    [107, 'Blaze ability activates at 45% HP.',                                                                                             'ability'],
    [108, 'Overgrow ability activates at 45% HP.',                                                                                          'ability'],
    [109, 'Shell Armor ability activates at 45% HP.',                                                                                       'ability'],
    [110, 'Swarm ability activates at 45% HP.',                                                                                             'ability'],
    [111, 'Torrent ability activates at 45% HP.',                                                                                           'ability'],
    [112, 'Increases flying speed by 50%.',                                                                                                 'movement'],
    [113, 'Increases surfing speed by 50%.',                                                                                                'movement'],
    [114, 'Increases riding speed by 50%.',                                                                                                 'movement'],
    [115, 'Automatically casts Sunny Day. Cooldown: 10 seconds.',                                                                           'move'],
    [116, 'Increases the chance to trigger passive moves by 10%.',                                                                          'move'],
    [117, 'Increases the chance to trigger passive moves by 15%.',                                                                          'move'],
    [118, 'Boosts damage against bosses by 5%.',                                                                                            'combat'],
    [119, '5% chance to get extra loot.',                                                                                                   'utility'],
    [120, '3% chance for a Pokemon to count twice toward tasks.',                                                                           'utility'],
    [121, '5% chance to inflict a random damaging status condition when dealing damage.',                                                    'combat'],
    [122, '20% chance to skip the Teleport cooldown.',                                                                                      'utility'],
    [123, '2% chance to cast a random move from the user\'s TM learnset.',                                                                  'move'],
    [124, '2% chance to use Counter upon receiving damage.',                                                                                'move'],
    [125, '2% chance to reflect the damage received.',                                                                                      'defense'],
    [126, '5% chance to swap held items with the opponent. (PvP only)',                                                                     'pvp'],
    [127, '5% chance to swap abilities with the opponent for the duration of the battle. (PvP only)',                                       'pvp'],
    [128, '+15% HP when revived.',                                                                                                          'defense'],
    [129, 'Fish an additional Pokemon when fishing with Ultra Rod or Master Rod.',                                                           'profession'],
    [130, 'Encounter an additional Pokemon when using a Bug Net.',                                                                           'profession'],
    [131, 'Encounter an additional Pokemon when using a Ghost Detector.',                                                                    'profession'],
    [132, 'Encounter an additional Pokemon when using a Magnetic Detector.',                                                                 'profession'],
    [133, 'Encounter an additional Pokemon when using a Fiery Fishing Rod.',                                                                 'profession'],
    [134, 'Encounter an additional Pokemon when using an Ice Hammer.',                                                                       'profession'],
    [135, 'Encounter an additional Pokemon when using a Lead Pickaxe.',                                                                      'profession'],
    [136, 'Grants a 3% chance to encounter Dhelmise when fishing with an Ultra or Master Rod. This effect bypasses all bait restrictions.',  'profession'],
    [137, 'Increases duration of Mega transformation by 1 hour.',                                                                           'mega'],
    [138, 'Boosts Grass type moves by 10%. (PvE only, no effect against bosses)',                                                           'type_boost'],
    [139, 'Boosts Normal type moves by 40%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [140, 'Boosts Water type moves by 10%. (PvE only, no effect against bosses)',                                                           'type_boost'],
    [141, 'Boosts Fire type moves by 10%. (PvE only, no effect against bosses)',                                                            'type_boost'],
    [142, 'Boosts Bug type moves by 10%. (PvE only, no effect against bosses)',                                                             'type_boost'],
    [143, 'Boosts Rock type moves by 10%. (PvE only, no effect against bosses)',                                                            'type_boost'],
    [144, 'Boosts Ground type moves by 10%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [145, 'Boosts Dark type moves by 10%. (PvE only, no effect against bosses)',                                                            'type_boost'],
    [146, 'Boosts Ghost type moves by 10%. (PvE only, no effect against bosses)',                                                           'type_boost'],
    [147, 'Boosts Fairy type moves by 10%. (PvE only, no effect against bosses)',                                                           'type_boost'],
    [148, 'Boosts Fighting type moves by 10%. (PvE only, no effect against bosses)',                                                        'type_boost'],
    [149, 'Boosts Dragon type moves by 10%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [150, 'Boosts Ice type moves by 10%. (PvE only, no effect against bosses)',                                                             'type_boost'],
    [151, 'Boosts Psychic type moves by 10%. (PvE only, no effect against bosses)',                                                         'type_boost'],
    [152, 'Boosts Electric type moves by 10%. (PvE only, no effect against bosses)',                                                        'type_boost'],
    [153, 'Boosts Steel type moves by 10%. (PvE only, no effect against bosses)',                                                           'type_boost'],
    [154, 'Boosts Flying type moves by 10%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [155, 'Boosts Poison type moves by 10%. (PvE only, no effect against bosses)',                                                          'type_boost'],
    [156, 'Reduces cooldown of the Bug Net by 2 seconds.',                                                                                  'profession'],
    [157, 'Reduces cooldown of the Ghost Detector by 2 seconds.',                                                                           'profession'],
    [158, 'Reduces cooldown of the Magnetic Detector by 2 seconds.',                                                                        'profession'],
    [159, 'Reduces cooldown of the Lead Pickaxe by 2 seconds.',                                                                             'profession'],
    [160, 'Reduces cooldown of the Ice Hammer by 2 seconds.',                                                                               'profession'],
    [161, 'Reduces cooldown of the Fiery Fishing Rod by 2 seconds.',                                                                        'profession'],
    [162, 'Immunity to Paralysis status condition.',                                                                                        'status'],
    [163, '0.5% chance to revive instantly after fainting. (PvE only)',                                                                     'utility'],
    [164, '0.6% chance to reuse the same move at 100% of its original damage. (No cooldown in PvE; 30s cooldown in PvP)',                   'move'],
    [165, '10% chance to gain 30% Movement Speed for 10 seconds when attacking.',                                                           'movement'],
    [166, '5% chance to reflect the Paralysis status condition.',                                                                           'status'],
    [167, '3% chance to apply Paralysis for 2 seconds when attacking.',                                                                     'status'],
    [168, '5% chance to increase the duration of Paralysis applied by the Pokemon by 2 seconds.',                                           'status'],
    [169, '2% chance to use a random move from the enemy.',                                                                                 'move'],
    [170, '2% chance to pull up to 4 Pokemon within a 5x5 range toward the user.',                                                         'move'],
    [171, 'Automatically targets Pokemon around the user in a 4x4 area.',                                                                   'utility'],
    [172, 'Pokemon can use up to 4 Blinks within 10 seconds before the cooldown starts.',                                                   'move'],
    [173, 'Pokemon can use up to 4 Dark Portals within 10 seconds before the cooldown starts.',                                             'move'],
    [174, '10% chance to skip the Harvest cooldown after a successful harvest.',                                                            'profession'],
    [175, '10% chance to skip the Mining cooldown after a successful mine.',                                                                'profession'],
    [177, '2% chance to prevent enemy Reflect.',                                                                                            'move'],
    [178, '3% chance to prevent enemy Telekinesis.',                                                                                        'move'],
    [179, '3% chance to reflect the Stun status condition.',                                                                                'status'],
    [180, '3% chance to cast Telekinesis automatically when attacking.',                                                                    'move'],
    [181, '10% chance to skip the Self-Stun caused by Telekinesis.',                                                                       'status'],
    [182, 'Copy 2 random moves from the target\'s learnset. Triggers on hit; active until the Pokemon is returned to its Pokeball.',        'move'],
    [183, '2% chance to automatically cast Reflect when an enemy uses the move.',                                                           'move'],
    [184, '15% chance to skip the Self-Stun caused by Tearful Look.',                                                                      'status'],
    [185, '5% chance to bypass Reflect with 50% damage.',                                                                                   'combat'],
    [186, '5% chance to bypass Substitute with 50% damage.',                                                                                'combat'],
    [187, 'Reduces the cooldown of the Pokemon\'s 4th move. Applies only to the original moveset and ignores custom moves.',                'move'],
    [188, '1% chance to transform the user into its Mega Form for 5 minutes when attacking. (PvE only)',                                    'mega'],
    [189, '3% chance to transform the user into its Mega Form for 5 minutes when attacking. Additionally, the Pokemon gains 25% damage reduction (10% in PvP).', 'mega'],
];

// --- Render ---

function getCategoryBadge(catKey) {
    const cat = CATEGORIES[catKey];
    if (!cat) return '';
    return `<span class="cat-badge ${cat.css}">${cat.label}</span>`;
}

function renderTable(data) {
    const tbody = document.getElementById('profTableBody');
    const count = document.getElementById('profCount');
    if (!tbody) return;

    count.textContent = `Mostrando ${data.length} proficiencia(s)`;

    tbody.innerHTML = data.map(p => {
        const [id, desc, cat] = p;
        return `<tr>
            <td>${id}</td>
            <td>${desc}</td>
            <td>${getCategoryBadge(cat)}</td>
        </tr>`;
    }).join('');
}

function buildCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    // All button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Todas';
    allBtn.dataset.cat = 'all';
    container.appendChild(allBtn);

    Object.entries(CATEGORIES).forEach(([key, val]) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = val.label;
        btn.dataset.cat = key;
        container.appendChild(btn);
    });
}

function getFiltered(searchQuery, activeCat) {
    return proficiencies.filter(p => {
        const [id, desc, cat] = p;
        const matchesCat = activeCat === 'all' || cat === activeCat;
        const matchesSearch = !searchQuery ||
            desc.toLowerCase().includes(searchQuery) ||
            String(id).includes(searchQuery);
        return matchesCat && matchesSearch;
    });
}

function initProficiencyBrowser() {
    buildCategoryFilters();

    let activeCat = 'all';
    let searchQuery = '';

    const searchInput = document.getElementById('profSearch');
    const filterContainer = document.getElementById('categoryFilters');

    renderTable(getFiltered(searchQuery, activeCat));

    searchInput.addEventListener('input', function () {
        searchQuery = this.value.toLowerCase().trim();
        renderTable(getFiltered(searchQuery, activeCat));
    });

    filterContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        renderTable(getFiltered(searchQuery, activeCat));
    });
}

document.addEventListener('DOMContentLoaded', initProficiencyBrowser);
