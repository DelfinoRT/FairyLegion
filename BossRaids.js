document.addEventListener('DOMContentLoaded', () => {

// --- Boss Data Structure (Corrected and Completed) ---
const bossRaidData = [
    // KANTO REGION BOSSES
    { name: "Galarian Zapdos", region: "Kanto", location: "Sur Fuchsia, Isla Eléctrica", imagePath: "BossRaids/galarian_zapdos.png", groupA: ["TM Electric Storm", "Zapdos Pen", "TM Discharge", "TM Hurricane"], groupB: ["TM Thunder", "TM Nuzzle", "TM Eagle Fury", "Zapdos Bush Kit"], groupC: ["Zapdos Doll", "Zapdos Toy", "Zapdos Bag", "Zapdos Carpet", "Electric items"] },
    { name: "Galarian Articuno", region: "Kanto", location: "Sur Fuchsia, Isla de Hielo", imagePath: "BossRaids/galarian_articuno.png", groupA: ["Articuno's Pen", "TM Blizzard", "TM Freeze Dry", "TM Mist"], groupB: ["TM Ice Beam", "TM Aurora Sphere"], groupC: ["Articuno Doll", "Articuno Toy", "Articuno Snow Globe", "Articuno Statue", "Articuno Bag", "Articuno Carpet"] },
    { name: "Galarian Moltres", region: "Kanto", location: "Sur Fuchsia, Isla de Fuego", imagePath: "BossRaids/galarian_moltres.png", groupA: ["TM Magma Storm", "Moltres Pen", "TM Blast Burner"], groupB: ["TM Lava Pulse", "TM Overheat", "Assault Vest"], groupC: ["Moltres Doll", "Moltres Toy", "Moltres Bag", "Moltres Carpet"] },
    { name: "Mewtwo", region: "Kanto", location: "Sur Fuchsia, Mansión Gengar", imagePath: "BossRaids/mewtwo.png", groupA: ["Ability Urge", "Amulet Coin", "TM Reflect", "Kanto Box 4", "Smart Candy"], groupB: ["Mewtwo Hood", "Cloned Ticket", "TM Natural Gift", "Ability Capsule", "Mewtwo Bush Kit"], groupC: ["Mewtwo Bag", "Mewtwo Carpet", "Mewtwo Figurine", "Mewtwo Toy", "Mewtwo Helmet"] },
    { name: "Mew", region: "Kanto", location: "Este Fuchsia, Isla del Desierto", imagePath: "BossRaids/mew.png", groupA: ["Smart Candy", "Card", "TM Reflect", "TM Imprison"], groupB: ["TM Psyblast", "TM Synchronoise", "Mew Amulet"], groupC: ["TM Psychic", "Trapped Love", "Mew Carpet", "Mew Figurine"] },
    { name: "Zygarde", region: "Kanto", location: "Noreste Lavender, Isla del Desierto", imagePath: "BossRaids/zygarde.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Regieleki", region: "Kanto", location: "Norte Lavender, Torre Eléctrica", imagePath: "BossRaids/regieleki.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Colossal Rhydon", region: "Kanto", location: "Norte Lavender, Túnel de Roca", imagePath: "BossRaids/colossal_hydon.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // Assuming this has no data, as Big Crystal Onix has data
    { name: "Enormous Pidgeot", region: "Kanto", location: "Norte Cerulean Última Isla", imagePath: "BossRaids/enormous_pidgeot.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Zarude", region: "Kanto", location: "Oeste Pewter, Isla de Hierba", imagePath: "BossRaids/zarude.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Xerneas", region: "Kanto", location: "Noroeste Celadon, Respaw de Hada", imagePath: "BossRaids/xerneas.png", groupA: ["TM Twinkle Star", "TM Fairy Wind", "TM Dazzling Gleam"], groupB: ["TM Geomancy", "TM Fairy Dreams"], groupC: ["TM Baby Doll Eyes", "TM Play Rough", "Xerneas Carpet"] }, // Corrected C group
    { name: "Arceus", region: "Kanto", location: "Noreste Lavender, Isla del Desierto", imagePath: "BossRaids/arceus.png", groupA: ["TM Feint", "TM Reflect", "Amulet Coin", "INQ Box"], groupB: ["Arceus Bush Kit", "TM Boomburst", "TM Last Resort"], groupC: ["TM Chip Away", "Arceus Carpet"] },
    { name: "Tornadus", region: "Kanto", location: "Norte Cerulean, Isla Izquierda", imagePath: "BossRaids/tornadus.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Celebi", region: "Kanto", location: "Oeste Pewter, Isla de Hierba", imagePath: "BossRaids/celebi.png", groupA: ["TM Petal Blizzard", "TM Psyblast", "Natural Box"], groupB: ["TM Leaf Storm", "TM Leaf Tornado", "TM Frenzy Plant", "TM Grass Knot"], groupC: ["Celebi Bag", "Celebi Carpet", "Celebi Toy"] },
    { name: "Shiny Celebi", region: "Kanto", location: "Oeste Pewter, Isla de Hierba", imagePath: "BossRaids/celebi.png", groupA: ["Random Elemental Box", "TM Reflect", "Ability Urge", "TM Imprison"], groupB: ["TM Synchronoise", "TM Selfheal", "TM Magical Leaf", "TM Grass Knot"], groupC: ["same as above"] },
    
    // JOHTO REGION BOSSES
    { name: "Moltres (Johto)", region: "Johto", location: "Noroeste Shamouti, Isla de Fuego (encuentra agujero, lado izquierdo, luego vuela)", imagePath: "BossRaids/moltres.png", groupA: ["TM Magma Storm", "Moltres Pen", "TM Blast Burner"], groupB: ["TM Lava Pulse", "TM Overheat", "Assault Vest"], groupC: ["Moltres Doll", "Moltres Toy", "Moltres Bag", "Moltres Carpet"] }, // Completed loot from Galarian Moltres, assuming the same
    { name: "Zapdos (Johto)", region: "Johto", location: "Noroeste Shamouti, Isla Eléctrica (a través de la torre eléctrica)", imagePath: "BossRaids/zapdos.png", groupA: ["TM Electric Storm", "Zapdos Pen", "TM Discharge", "TM Hurricane"], groupB: ["TM Thunder", "TM Nuzzle", "TM Eagle Fury", "Zapdos Bush Kit"], groupC: ["Zapdos Doll", "Zapdos Toy", "Zapdos Bag", "Zapdos Carpet", "Electric items"] }, // Completed loot from Galarian Zapdos, assuming the same
    { name: "Articuno (Johto)", region: "Johto", location: "Noreste Shamouti (a través de la torre de Hielo)", imagePath: "BossRaids/articuno.png", groupA: ["Articuno's Pen", "TM Blizzard", "TM Freeze Dry", "TM Mist"], groupB: ["TM Ice Beam", "TM Aurora Sphere"], groupC: ["Articuno Doll", "Articuno Toy", "Articuno Snow Globe", "Articuno Statue", "Articuno Bag", "Articuno Carpet"] }, // Completed loot from Galarian Articuno, assuming the same
    { name: "Entei", region: "Johto", location: "Norte Olivine y Oeste Cianwood (2 puntos)", imagePath: "BossRaids/entei.png", groupA: ["Card", "TM Blast Burner", "Entei Amulet", "TM Lava Plume"], groupB: ["TM Lava Pulse", "TM Eruption", "TM Fire Blast", "Entei Bush Kit"], groupC: ["Entei Bag", "Entei Carpet", "Entei Toy"] },
    { name: "Calyrex", region: "Johto", location: "Noroeste Olivine, Respaw de Hierba", imagePath: "BossRaids/calyrex.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Ho-Oh", region: "Johto", location: "Oeste Cianwood, -1 al Volcán", imagePath: "BossRaids/hooh.png", groupA: ["Rainbow Feather", "TM Fiery Tornado", "TM Blast Burner", "Card"], groupB: ["Ring Target", "TM Flame Blitz", "TM Hurricane", "TM Eagle Fury"], groupC: ["Ho-Oh Locker", "TM Fire Pledge", "TM Air Shot", "Ho-Oh Doll", "Ho-Oh Carpet", "Ho-Oh Backpack"] },
    { name: "Shiny Ho-Oh", region: "Johto", location: "Oeste Cianwood, -1 al Volcán", imagePath: "BossRaids/hooh.png", groupA: ["Shiny Charm", "Amulet Coin", "TM Magma Storm", "Hot Box", "Rainbow Feather"], groupB: ["TM Case 4", "TM Case 8", "Hurricane", "TM Lava Plume"], groupC: ["same as above"] },
    { name: "Regirock", region: "Johto", location: "Oeste Cianwood, Misión Meteor Mash", imagePath: "BossRaids/regirock.png", groupA: ["TM Falling Rocks", "TM Rock Storm"], groupB: ["TM Rock Polish", "TM Rock Blast"], groupC: ["TM Rock Slide", "Regirock Carpet", "Regirock Toy"] },
    { name: "Regice", region: "Johto", location: "Oeste Azalea, Isla de Hielo", imagePath: "BossRaids/regice.png", groupA: ["TM Ice Storm", "TM Triple Axel"], groupB: ["TM Ice Beam", "TM Aurora Sphere"], groupC: ["Regice Carpet", "Regice Toy"] },
    { name: "Registeel", region: "Johto", location: "Este Olivine, Montaña", imagePath: "BossRaids/registeel.png", groupA: ["TM Doom Desire", "TM Magnetic Shock"], groupB: ["Iron", "TM Metal Sound"], groupC: ["TM Flash Cannon", "Registeel Carpet", "Registeel Toy"] },
    { name: "Big Crystal Onix", region: "Johto", location: "Este Olivine, Montaña", imagePath: "BossRaids/crystal_onix.png", groupA: ["TM Triple Axel", "TM Rock Blast"], groupB: ["Icicle Spear", "Crystal Onix Tail"], groupC: ["ice/rock items"] }, // Data for "Crystal Onix" used
    { name: "Majin Buu", region: "Johto", location: "Oeste Olivine, izquierda a la isla de agua", imagePath: "BossRaids/majin_buu.png", groupA: ["TM Feint", "TM Case 13", "TM Selfheal", "TM Metronome"], groupB: ["TM Case 3", "One Star Dragon Ball", "TM Pound"], groupC: ["Majin Buu Bag"] },
    { name: "Cresselia", region: "Johto", location: "Norte Cianwood, Isla de la Felicidad", imagePath: "BossRaids/cresselia.png", groupA: ["TM Case 18", "TM Case 17", "TM Metronome"], groupB: ["Wise Glasses", "TM Psycho Cut"], groupC: ["Cresselia Carpet"] },
    { name: "Suicune", region: "Johto", location: "Oeste Olivine, Isla de Agua", imagePath: "BossRaids/suicune.png", groupA: ["Card", "TM Rain Dance", "Suicune Amulet", "TM Case 4"], groupB: ["TM Hydropump", "TM Liquidation", "Suicune Bush Kit"], groupC: ["TM Aqua Blast", "Suicune Carpet", "Suicune Toy"] },
    { name: "Landorus", region: "Johto", location: "Norte Goldenrod, Respaw de Tierra", imagePath: "BossRaids/landorus.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Volcanion", region: "Johto", location: "Norte Goldenrod, Respaw de Dragón (excava, surfea, bajo una cascada)", imagePath: "BossRaids/volcanion.png", groupA: ["TM Blast Burner", "TM Flame Blitz", "TM Case 11", "Roto Exp.Points"], groupB: ["Volcanion's Heart", "TM Water Pulse", "TM Whirlpool"], groupC: ["TM Fire Pledge"] },
    { name: "Great Sunflora", region: "Johto", location: "Noroeste, Respaw de Hierba", imagePath: "BossRaids/great_sunflora.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Experimental Porygon", region: "Johto", location: "Ciudad Goldenrod", imagePath: "BossRaids/experimental_porygon.png", groupA: ["TM Reflect", "TM Psyblast"], groupB: ["Light Clay", "TM Psychic"], groupC: ["Porygon Bag", "Porygon Toy", "Porygon Carpet"] },
    { name: "Raikou", region: "Johto", location: "Norte New Bark, Respaw Eléctrico", imagePath: "BossRaids/raikou.png", groupA: ["Card", "Card", "Raikou Amulet", "TM Case 8", "TM Discharge"], groupB: ["TM Electrify", "TM Eerie Impulse", "TM Thunder", "Raikou Bush Kit"], groupC: ["Thunder Stone", "Raikou Carpet", "Raikou Bag"] },
    { name: "Kyurem", region: "South Mandarin City", location: "Este Mahogany, Varios Kyurem aparecen en diferentes lugares", imagePath: "BossRaids/kyurem.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Palkia", region: "South Mandarin City", location: "Este Olivine, Isla Dragón", imagePath: "BossRaids/palkia_dialga.png", groupA: ["TM Dragon Storm", "TM Outrage"], groupB: ["TM Dragon Lullaby", "Surf"], groupC: ["TM Dragon Claw", "Palkia Toy", "Palkia Carpet"] },
    { name: "Dialga", region: "South Mandarin City", location: "Este Olivine, Isla Dragón", imagePath: "BossRaids/palkia_dialga.png", groupA: ["TM Case 14", "Dusty Box", "Blue Box"], groupB: ["TM Metal Burst", "TM Metallic Noise"], groupC: ["Dialga Carpet", "Dialga Toy"] },
    { name: "Wizard Espeon", region: "South Mandarin City", location: "Este Ciudad Shamouti", imagePath: "BossRaids/wizard_espeon.png", groupA: ["Mage's Hat", "TM Psychic Terrain", "Light Screen"], groupB: ["TM Psycho Cut", "TM Power Split"], groupC: ["Espeon Carpet", "Espeon Sleeping Plush", "Espeon Toy"] },
    { name: "Black Kyurem", region: "South Mandarin City", location: "Este Mahogany, Puntos de Kyurem", imagePath: "BossRaids/kyurem.png", groupA: ["TM Draco Meteor", "TM Twister"], groupB: ["TM Clanging Scales", "TM Dragon Rush"], groupC: ["Black Kyurem Carpet", "TM Icicle Spear"] },

    // HOENN REGION BOSSES
    { name: "Latias", region: "Hoenn", location: "Noreste de Lilycove City", imagePath: "BossRaids/latias.png", groupA: ["TM Case 16", "TM Dragon Cry", "TM Wonder Room"], groupB: ["TM Draco Pulse"], groupC: ["TM Dragon Pulse", "Latias Carpet", "Latias Toy"] },
    { name: "Latios", region: "Hoenn", location: "Noreste de Lilycove City", imagePath: "BossRaids/latios.png", groupA: ["TM Case 17", "TM Twister", "TM Psychic Terrain"], groupB: ["TM Clanging Scales"], groupC: ["TM Dragon Pulse", "Latios Carpet", "Latios Toy"] },
    { name: "Kyogre", region: "Hoenn", location: "Sootopolis City (Bucea al Sur del gimnasio)", imagePath: "BossRaids/kyogre_manaphy.png", groupA: ["TM Case 21", "TM Rain Dance", "TM Liquidation", "Big Shrimp Bait"], groupB: ["TM Water Pulse", "TM Surf"], groupC: ["Kyogre Carpet", "Kyogre Toy"] },
    { name: "Primal Kyogre", region: "Hoenn", location: "Sootopolis City (Bucea al Sur del gimnasio)", imagePath: "BossRaids/kyogre_manaphy.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] },
    { name: "Manaphy", region: "Hoenn", location: "Sootopolis City (Bucea al Sur del gimnasio)", imagePath: "BossRaids/kyogre_manaphy.png", groupA: ["Pokemon: Phione", "TM Case 20", "Cold Box"], groupB: ["TM Brine", "TM Liquidation"], groupC: ["TM Surf", "Manaphy Carpet", "Phione Carpet"] },
    { name: "Groudon", region: "Hoenn", location: "Noroeste de Lavaridge City (encuentra un agujero)", imagePath: "BossRaids/groudon.png", groupA: ["TM Scorching Sands", "TM Quicksand", "TM Epicenter"], groupB: ["TM Mud Bomb", "TM Mud Sport"], groupC: ["TM Mud", "Groudon Toy", "Groudon Carpet"] },
    { name: "Primal Groudon", region: "Hoenn", location: "Noroeste de Lavaridge City (encuentra un agujero)", imagePath: "BossRaids/groudon.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided for Primal Groudon
    { name: "Rayquaza", region: "Hoenn", location: "Suroeste de Sootopolis (torre triangular, piso superior vía vuelo)", imagePath: "BossRaids/rayquaza.png", groupA: ["TM Defog", "TM Outrage", "TM Draco Meteor"], groupB: ["TM Dragon Lullaby", "TM Dragon Wave", "TM Clanging Scales", "TM Dragon Rush"], groupC: ["TM Dragon Claw", "Rayquaza Toy", "Rayquaza Carpet", "Rayquaza Bag"] },
    { name: "Yveltal", region: "Hoenn", location: "Isla en forma de U (sur de Slateport o este de Dewford)", imagePath: "BossRaids/yveltal.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Darkrai", region: "Hoenn", location: "Suroeste de Petalburg (Isla Oscura)", imagePath: "BossRaids/darkrai.png", groupA: ["TM Snarl", "TM Embargo", "TM Case 13", "TM Night Daze"], groupB: ["TM Dark Pulse", "TM Beat Up", "TM Fake Tears"], groupC: ["Darkrai Carpet"] },
    { name: "Regigigas", region: "Hoenn", location: "Norte Rustboro", imagePath: "BossRaids/regigigas.png", groupA: ["TM Feint", "TM Sleep Talk", "TM Tri Attack"], groupB: ["TM Play Nice", "TM Last Resort"], groupC: ["Regigigas Carpet", "TM Hyper Beam"] },
    { name: "Jirachi", region: "Hoenn", location: "Norte de Mauville (Respawn de Riolu, cuevas de Metang/Metagross)", imagePath: "BossRaids/jirachi.png", groupA: ["Tough Candy", "Random Held Item Box", "TM Shift Gear", "TM Metal Sound"], groupB: ["TM Gear Grind", "TM Meteor Mash"], groupC: ["Jirachi Figurine", "Jirachi Carpet", "TM Flash Cannon"] },
    { name: "Meloetta Aria", region: "Hoenn", location: "Norte de Mauville City", imagePath: "BossRaids/meloetta.png", groupA: ["TM Natural Gift", "TM Boomburst", "TM Echoed Voice"], groupB: ["TM Play Nice"], groupC: ["Meloetta Carpet"] },
    { name: "Meloetta Pirouette", region: "Hoenn", location: "Norte de Mauville City", imagePath: "BossRaids/meloetta.png", groupA: ["TM Force Palm", "TM Final Gambit", "TM Chi Strike"], groupB: ["TM Submission", "TM Circular Explosion"], groupC: ["TM Sky Uppercut", "Meloetta Carpet"] },
    { name: "Regidrago", region: "Hoenn", location: "Noreste de Puerto Congelado (cerca de casas)", imagePath: "BossRaids/regidrago.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Hoopa Unbound", region: "Hoenn", location: "Noroeste de Fallarbor City (primera isla a la izquierda)", imagePath: "BossRaids/hoopa_unbound.png", groupA: ["TM Reflect", "TM Shadow Storm", "Life Orb"], groupB: ["TM Grudge", "TM Power Split", "Trapped Black Soul"], groupC: ["psy/ghost items"] },
    { name: "Thundurus", region: "Hoenn", location: "Noroeste de Petalburg City, Isla Eléctrica", imagePath: "BossRaids/thundurus.png", groupA: ["Thunder Cloud", "TM Case 15", "Electric Storm", "Tornado"], groupB: ["Thunder Cloud", "TM Discharge"], groupC: ["TM Fly Attack", "Thundurus Carpet"] },
    { name: "Poltergeist", region: "Hoenn", location: "Sur de Lilycove City (cementerio, +6)", imagePath: "BossRaids/poltergeist.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Jack Raichurrow", region: "Hoenn", location: "Petalburg City", imagePath: "BossRaids/jack_raichurrow.png", groupA: ["TM Electro Blast", "TM Electric Terrain"], groupB: ["TM Nuzzle", "Sparrow's set", "Raichu Bush Kit"], groupC: ["Thunder Bolt", "Raichu Carpet", "Raichu Bag"] },
    
    // ORANGE ISLANDS BOSSES
    { name: "Deoxys", region: "Orange", location: "Este Mandarin (isla Pokémon normal)", imagePath: "BossRaids/deoxys.png", groupA: ["TM Selfheal", "TM Metronome", "TM Synchronoise"], groupB: ["Trapped Love", "TM Psychic"], groupC: ["Deoxys Carpet", "Deoxys Toy"] },

    // ALOLA ISLAND BOSSES
    { name: "Lunala", region: "Alola", location: "Montaña Hau'oli, +2 (lado izquierdo pasado el respawn Volador)", imagePath: "BossRaids/lunala.png", groupA: ["TM Shadow Storm", "TM Curse Pledge", "TM Trick Room"], groupB: ["Trapped Moonlight", "TM Night Shade", "Lunala Locker Kit"], groupC: ["TM Shadow Ball"] },
    { name: "Donald Trump", region: "Alola", location: "Montaña Hau'oli (centro, cerca de Acero 175 o lado de Tapu Koko)", imagePath: "BossRaids/donald_trump.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Solgaleo", region: "Alola", location: "Rancho Paniola (izquierda del pueblo, corrales dentro o fuera)", imagePath: "BossRaids/solgaleo.png", groupA: ["Solgaleo's Mask", "TM Magnetic Shock", "TM Metallic Rush", "TM Psychic Terrain"], groupB: ["TM Metal Sound", "TM Meteor Mash"], groupC: ["TM Gear Grind", "TM Smart Strike"] },
    { name: "Grand Galvantula", region: "Alola", location: "Norte Rancho Paniola", imagePath: "BossRaids/grand_galvantula.png", groupA: ["(No hay datos para grupo A)"], groupB: ["(No hay datos para grupo B)"], groupC: ["(No hay datos para grupo C)"] }, // No data provided in tables
    { name: "Necrozma", region: "Alola", location: "Malie (camino al teleférico Lanakila)", imagePath: "BossRaids/necrozma.png", groupA: ["TM Psyblast", "TM Light Screen", "TM Case 11"], groupB: ["Trapped Soul", "TM Synchronoise"], groupC: ["TM Psychic"] }
];
    // --- End Boss Data Structure ---


    // --- DOM Elements ---
    const bossInput = document.getElementById('boss-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const dynamicDiv = document.getElementById('boss-dynamic-info');
    const clearButton = document.getElementById('clear-boss-btn'); // Reference to the new button
    
    // State variable to track if a boss is currently displayed/selected
    let currentBossSelected = false;


    /**
     * Updates the state of the clear button.
     */
    function updateClearButtonState(hasContent) {
        currentBossSelected = hasContent;
        clearButton.disabled = !hasContent;
    }


    /**
     * Clears the input, suggestions, and displayed boss info.
     */
    function clearBossInfo() {
        bossInput.value = '';
        suggestionsContainer.innerHTML = '';
        dynamicDiv.innerHTML = '';
        updateClearButtonState(false); // Disable the button
    }


    /**
     * Renders the details for the selected boss in the dynamic area.
     * @param {string} bossName - The name of the boss to display.
     */
    function displayBossDetails(bossName) {
        // Find boss, ignoring case and leading/trailing spaces for robustness
        const normalizedName = bossName.trim();
        const boss = bossRaidData.find(b => b.name.toLowerCase() === normalizedName.toLowerCase());

        dynamicDiv.innerHTML = ''; // Clear previous results

        if (!boss) {
            dynamicDiv.innerHTML = `<p style="color: red;">Jefe "**${normalizedName}**" no encontrado. Por favor, selecciona de las sugerencias.</p>`;
            updateClearButtonState(false);
            return;
        }

        // --- Conditional Image Tag ---
        const imageTag = boss.imagePath
            ? `<img src="${boss.imagePath}" alt="Ubicación de ${boss.name}" class="boss-location-image">`
            : '';

        const detailsHTML = `
            <div class="boss-details-container">
                <h3>Información de <b>${boss.name}</b></h3>
                <p><strong>Ubicación:</strong> ${boss.location || 'Ubicación no especificada en los datos de la lista.'}</p>
                
                <div class="boss-image-container">
                    ${imageTag}
                </div>

                <div class="boss-loot-groups" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; text-align: left;">
                    
                    <div class="loot-group group-a lightpurple" style="border: 2px solid #8e44ad; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>🏆 Grupo A</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupA.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="loot-group group-b lightpurple" style="border: 2px solid #a464b4; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>⭐ Grupo B</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupB.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="loot-group group-c lightpurple" style="border: 2px solid #ba6fd7; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>🔸 Grupo C</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupC.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        dynamicDiv.innerHTML = detailsHTML;
        updateClearButtonState(true); // Enable button as content is now displayed
    }

    /**
     * Filters boss names based on input and displays suggestions.
     */
    function handleSuggestions() {
        const input = bossInput.value.toLowerCase();
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions
        
        // If input is empty, ensure the clear button state is updated based on displayed content
        if (input.length === 0) {
             // If input is empty, check if we should disable the button (only if dynamicDiv is empty too)
             if(dynamicDiv.innerHTML === '') {
                 updateClearButtonState(false);
             }
             return;
        }

        // Always enable the clear button if the user is typing, in case they want to clear the input
        // updateClearButtonState(true); // Optional: Enable on typing, but we'll stick to enabling on *selection*
        
        const filteredBosses = bossRaidData
            .map(boss => boss.name)
            .filter(name => name.toLowerCase().includes(input))
            .slice(0, 5); // Limit to 5 suggestions

        filteredBosses.forEach(name => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = name;
            
            // Handle suggestion click
            item.addEventListener('click', () => {
                bossInput.value = name;
                suggestionsContainer.innerHTML = ''; // Clear suggestions
                displayBossDetails(name);
            });
            suggestionsContainer.appendChild(item);
        });
    }

    // --- Event Listeners ---

    // 1. Listen for key input to show suggestions
    bossInput.addEventListener('keyup', handleSuggestions);

    // 2. Hide suggestions when the input loses focus (with a slight delay)
    bossInput.addEventListener('blur', () => {
        setTimeout(() => {
            suggestionsContainer.innerHTML = '';
        }, 150);
    });
    
    // 3. Allow pressing Enter to search if the text matches a boss name
    bossInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            
            const inputName = bossInput.value.trim();
            const bossExists = bossRaidData.some(b => b.name.toLowerCase() === inputName.toLowerCase());

            if (bossExists) {
                suggestionsContainer.innerHTML = '';
                displayBossDetails(inputName);
            }
        }
    });

    // 4. Listen for the clear button click
    clearButton.addEventListener('click', clearBossInfo);


    // --- Utility Functions ---

    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', () => {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    });
});