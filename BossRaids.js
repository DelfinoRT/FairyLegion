document.addEventListener('DOMContentLoaded', () => {

    // --- Boss Data Structure (Same as before) ---
    // (The extensive bossRaidData array goes here, unchanged for this fix)
    const bossRaidData = [
        // KANTO REGION BOSSES
        { name: "Galarian Zapdos", region: "Kanto", location: "Sur Fuchsia, Electric Island", groupA: ["TM Electric Storm", "Zapdos Pen", "TM Discharge", "TM Hurricane"], groupB: ["TM Thunder", "TM Nuzzle", "TM Eagle Fury", "Zapdos Bush Kit"], groupC: ["Zapdos Doll", "Zapdos Toy", "Zapdos Bag", "Zapdos Carpet", "Electric items"] },
        { name: "Galarian Articuno", region: "Kanto", location: "Sur Fuchsia, Ice Island", groupA: ["Articuno's Pen", "TM Blizzard", "TM Freeze Dry", "TM Mist"], groupB: ["TM Ice Beam", "TM Aurora Sphere"], groupC: ["Articuno Doll", "Articuno Toy", "Articuno Snow Globe", "Articuno Statue", "Articuno Bag", "Articuno Carpet"] },
        { name: "Galarian Moltres", region: "Kanto", location: "Sur Fuchsia, Fire Island", groupA: ["TM Magma Storm", "Moltres Pen", "TM Blast Burner"], groupB: ["TM Lava Pulse", "TM Overheat", "Assault Vest"], groupC: ["Moltres Doll", "Moltres Toy", "Moltres Bag", "Moltres Carpet"] },
        { name: "Mewtwo", region: "Kanto", location: "Sur Fuchsia, Mansion Gengar", groupA: ["Ability Urge", "Amulet Coin", "TM Reflect", "Kanto Box 4", "Smart Candy"], groupB: ["Mewtwo Hood", "Cloned Ticket", "TM Natural Gift", "Ability Capsule", "Mewtwo Bush Kit"], groupC: ["Mewtwo Bag", "Mewtwo Carpet", "Mewtwo Figurine", "Mewtwo Toy", "Mewtwo Helmet"] },
        { name: "Mew", region: "Kanto", location: "East Fuchsia, Desert Island", groupA: ["Smart Candy", "Card", "TM Reflect", "TM Imprison"], groupB: ["TM Psyblast", "TM Synchronoise", "Mew Amulet"], groupC: ["TM Psychic", "Trapped Love", "Mew Carpet", "Mew Figurine"] },
        { name: "Zygarde", region: "Kanto", location: "North-East Lavender, Desert Island", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Regieleki", region: "Kanto", location: "North Lavender, Tower Electric", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Colossal Rhydon", region: "Kanto", location: "North Lavender, Rock Tunel", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Enormous Pidgeot", region: "Kanto", location: "North Cerulean Last Island", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Zarude", region: "Kanto", location: "West Pewter, Grass Island", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Xerneas", region: "Kanto", location: "North-West Celadon, Fairy Respaw", groupA: ["TM Twinkle Star", "TM Fairy Wind", "TM Dazzling Gleam"], groupB: ["TM Geomancy", "TM Fairy Dreams"], groupC: ["TM Baby Doll Eyes", "TM Play Rough", "Xerneas Carpet"] },
        { name: "Arceus", region: "Kanto", location: "North-East Lavender, Desert Island", groupA: ["TM Feint", "TM Reflect", "Amulet Coin", "INQ Box"], groupB: ["Arceus Bush Kit", "TM Boomburst", "TM Last Resort"], groupC: ["TM Chip Away", "Arceus Carpet"] },
        { name: "Tornadus", region: "Kanto", location: "North Cerulean, Left Island", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Celebi", region: "Kanto", location: "West Pewter, Grass Island", groupA: ["TM Petal Blizzard", "TM Psyblast", "Natural Box"], groupB: ["TM Leaf Storm", "TM Leaf Tornado", "TM Frenzy Plant", "TM Grass Knot"], groupC: ["Celebi Bag", "Celebi Carpet", "Celebi Toy"] },
        { name: "Shiny Celebi", region: "Kanto", location: "West Pewter, Grass Island", groupA: ["Random Elemental Box", "TM Reflect", "Ability Urge", "TM Imprison"], groupB: ["TM Synchronoise", "TM Selfheal", "TM Magical Leaf", "TM Grass Knot"], groupC: ["same as above"] },
        
        // JOHTO REGION BOSSES
        { name: "Moltres (Johto)", region: "Johto", location: "North-West Shamouti, Fire Island (find hole, left side, then fly)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Zapdos (Johto)", region: "Johto", location: "North – West Shamouti, Electric Island (through electrical tower)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Articuno (Johto)", region: "Johto", location: "North East Shamouti (through the Ice tower)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Entei", region: "Johto", location: "North Olivine and West Cianwood (2 spots)", groupA: ["Card", "TM Blast Burner", "Entei Amulet", "TM Lava Plume"], groupB: ["TM Lava Pulse", "TM Eruption", "TM Fire Blast", "Entei Bush Kit"], groupC: ["Entei Bag", "Entei Carpet", "Entei Toy"] },
        { name: "Calyrex", region: "Johto", location: "North West Olivine, Grass Respaw", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Ho-Oh", region: "Johto", location: "West Cianwood, -1 to Volcano", groupA: ["Rainbow Feather", "TM Fiery Tornado", "TM Blast Burner", "Card"], groupB: ["Ring Target", "TM Flame Blitz", "TM Hurricane", "TM Eagle Fury"], groupC: ["Ho-Oh Locker", "TM Fire Pledge", "TM Air Shot", "Ho-Oh Doll", "Ho-Oh Carpet", "Ho-Oh Backpack"] },
        { name: "Shiny Ho-Oh", region: "Johto", location: "West Cianwood, -1 to Volcano", groupA: ["Shiny Charm", "Amulet Coin", "TM Magma Storm", "Hot Box", "Rainbow Feather"], groupB: ["TM Case 4", "TM Case 8", "Hurricane", "TM Lava Plume"], groupC: ["same as above"] },
        { name: "Regirock", region: "Johto", location: "West Cianwood, Quest Meteor Mash", groupA: ["TM Falling Rocks", "TM Rock Storm"], groupB: ["TM Rock Polish", "TM Rock Blast"], groupC: ["TM Rock Slide", "Regirock Carpet", "Regirock Toy"] },
        { name: "Regice", region: "Johto", location: "West Azalea, Ice Island", groupA: ["TM Ice Storm", "TM Triple Axel"], groupB: ["TM Ice Beam", "TM Aurora Sphere"], groupC: ["Regice Carpet", "Regice Toy"] },
        { name: "Registeel", region: "Johto", location: "East Olivine, Mountain", groupA: ["TM Doom Desire", "TM Magnetic Shock"], groupB: ["Iron", "TM Metal Sound"], groupC: ["TM Flash Cannon", "Registeel Carpet", "Registeel Toy"] },
        { name: "Big Crystal Onix", region: "Johto", location: "East Olivine, Mountain", groupA: ["TM Triple Axel", "TM Rock Blast"], groupB: ["Icicle Spear", "Crystal Onix Tail"], groupC: ["ice/rock items"] },
        { name: "Majin Buu", region: "Johto", location: "West Olivine, left to water island", groupA: ["TM Feint", "TM Case 13", "TM Selfheal", "TM Metronome"], groupB: ["TM Case 3", "One Star Dragon Ball", "TM Pound"], groupC: ["Majin Buu Bag"] },
        { name: "Cresselia", region: "Johto", location: "North Cianwood, Happiness Island", groupA: ["TM Case 18", "TM Case 17", "TM Metronome"], groupB: ["Wise Glasses", "TM Psycho Cut"], groupC: ["Cresselia Carpet"] },
        { name: "Suicune", region: "Johto", location: "West Olivine, Water Island", groupA: ["Card", "TM Rain Dance", "Suicune Amulet", "TM Case 4"], groupB: ["TM Hydropump", "TM Liquidation", "Suicune Bush Kit"], groupC: ["TM Aqua Blast", "Suicune Carpet", "Suicune Toy"] },
        { name: "Landorus", region: "Johto", location: "North Goldenrod, Ground Respaw", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Volcanion", region: "Johto", location: "North Goldenrod, Dragon Respaw (dig, surf, under a waterfall)", groupA: ["TM Blast Burner", "TM Flame Blitz", "TM Case 11", "Roto Exp.Points"], groupB: ["Volcanion's Heart", "TM Water Pulse", "TM Whirlpool"], groupC: ["TM Fire Pledge"] },
        { name: "Great Sunflora", region: "Johto", location: "North West, Grass Respaw", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Experimental Porygon", region: "Johto", location: "City Goldenrod", groupA: ["TM Reflect", "TM Psyblast"], groupB: ["Light Clay", "TM Psychic"], groupC: ["Porygon Bag", "Porygon Toy", "Porygon Carpet"] },
        { name: "Raikou", region: "Johto", location: "North New Bark, Electric Respaw", groupA: ["Card", "Card", "Raikou Amulet", "TM Case 8", "TM Discharge"], groupB: ["TM Electrify", "TM Eerie Impulse", "TM Thunder", "Raikou Bush Kit"], groupC: ["Thunder Stone", "Raikou Carpet", "Raikou Bag"] },
        { name: "Kyurem's", region: "South Mandarin City", location: "East Mahogany, Several Kyurems appear in different spots", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Palkia", region: "South Mandarin City", location: "East Olivine, Dragon island", groupA: ["TM Dragon Storm", "TM Outrage"], groupB: ["TM Dragon Lullaby", "Surf"], groupC: ["TM Dragon Claw", "Palkia Toy", "Palkia Carpet"] },
        { name: "Dialga", region: "South Mandarin City", location: "East Olivine, Dragon island", groupA: ["TM Case 14", "Dusty Box", "Blue Box"], groupB: ["TM Metal Burst", "TM Metallic Noise"], groupC: ["Dialga Carpet", "Dialga Toy"] },
        { name: "Wizard Espeon", region: "South Mandarin City", location: "East City Shamouti", groupA: ["Mage's Hat", "TM Psychic Terrain", "Light Screen"], groupB: ["TM Psycho Cut", "TM Power Split"], groupC: ["Espeon Carpet", "Espeon Sleeping Plush", "Espeon Toy"] },
        { name: "Black Kyurem", region: "South Mandarin City", location: "East Mahogany, Kyurem's spots", groupA: ["TM Draco Meteor", "TM Twister"], groupB: ["TM Clanging Scales", "TM Dragon Rush"], groupC: ["Black Kyurem Carpet", "TM Icicle Spear"] },

        // HOENN REGION BOSSES
        { name: "Latias", region: "Hoenn", location: "Northeast of Lilycove City", groupA: ["TM Case 16", "TM Dragon Cry", "TM Wonder Room"], groupB: ["TM Draco Pulse"], groupC: ["TM Dragon Pulse", "Latias Carpet", "Latias Toy"] },
        { name: "Latios", region: "Hoenn", location: "Northeast of Lilycove City", groupA: ["TM Case 17", "TM Twister", "TM Psychic Terrain"], groupB: ["TM Clanging Scales"], groupC: ["TM Dragon Pulse", "Latios Carpet", "Latios Toy"] },
        { name: "Kyogre", region: "Hoenn", location: "Sootopolis City (Dive South of gym)", groupA: ["TM Case 21", "TM Rain Dance", "TM Liquidation", "Big Shrimp Bait"], groupB: ["TM Water Pulse", "TM Surf"], groupC: ["Kyogre Carpet", "Kyogre Toy"] },
        { name: "Manaphy", region: "Hoenn", location: "Sootopolis City (Dive South of gym)", groupA: ["Pokemon: Phione", "TM Case 20", "Cold Box"], groupB: ["TM Brine", "TM Liquidation"], groupC: ["TM Surf", "Manaphy Carpet", "Phione Carpet"] },
        { name: "Groudon", region: "Hoenn", location: "Northwest of Lavaridge City (find a hole)", groupA: ["TM Scorching Sands", "TM Quicksand", "TM Epicenter"], groupB: ["TM Mud Bomb", "TM Mud Sport"], groupC: ["TM Mud", "Groudon Toy", "Groudon Carpet"] },
        { name: "Primal Groudon", region: "Hoenn", location: "Northwest of Lavaridge City (find a hole)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Rayquaza", region: "Hoenn", location: "Southwest of Sootopolis (triangular tower, top floor via fly)", groupA: ["TM Defog", "TM Outrage", "TM Draco Meteor"], groupB: ["TM Dragon Lullaby", "TM Dragon Wave", "TM Clanging Scales", "TM Dragon Rush"], groupC: ["TM Dragon Claw", "Rayquaza Toy", "Rayquaza Carpet", "Rayquaza Bag"] },
        { name: "Yveltal", region: "Hoenn", location: "U-shaped island (south of Slateport or east of Dewford)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Darkrai", region: "Hoenn", location: "Southwest of Petalburg (Dark Island)", groupA: ["TM Snarl", "TM Embargo", "TM Case 13", "TM Night Daze"], groupB: ["TM Dark Pulse", "TM Beat Up", "TM Fake Tears"], groupC: ["Darkrai Carpet"] },
        { name: "Regigigas", region: "Hoenn", location: "North Rustboro", groupA: ["TM Feint", "TM Sleep Talk", "TM Tri Attack"], groupB: ["TM Play Nice", "TM Last Resort"], groupC: ["Regigigas Carpet", "TM Hyper Beam"] },
        { name: "Jirachi", region: "Hoenn", location: "North of Mauville (Riolu's spawn, Metang/Metagross caves)", groupA: ["Tough Candy", "Random Held Item Box", "TM Shift Gear", "TM Metal Sound"], groupB: ["TM Gear Grind", "TM Meteor Mash"], groupC: ["Jirachi Figurine", "Jirachi Carpet", "TM Flash Cannon"] },
        { name: "Meloetta Aria", region: "Hoenn", location: "North of Mauville City", groupA: ["TM Natural Gift", "TM Boomburst", "TM Echoed Voice"], groupB: ["TM Play Nice"], groupC: ["Meloetta Carpet"] },
        { name: "Meloetta Pirouette", region: "Hoenn", location: "North of Mauville City", groupA: ["TM Force Palm", "TM Final Gambit", "TM Chi Strike"], groupB: ["TM Submission", "TM Circular Explosion"], groupC: ["TM Sky Uppercut", "Meloetta Carpet"] },
        { name: "Regidrago", region: "Hoenn", location: "Northeast of Frozen Harbor (near houses)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Hoopa Unbound", region: "Hoenn", location: "Northwest of Fallarbor City (first island on left)", groupA: ["TM Reflect", "TM Shadow Storm", "Life Orb"], groupB: ["TM Grudge", "TM Power Split", "Trapped Black Soul"], groupC: ["psy/ghost items"] },
        { name: "Thundurus", region: "Hoenn", location: "Northwest of Petalburg City, Electric Island", groupA: ["Thunder Cloud", "TM Case 15", "Electric Storm", "Tornado"], groupB: ["Thunder Cloud", "TM Discharge"], groupC: ["TM Fly Attack", "Thundurus Carpet"] },
        { name: "Poltergeist", region: "Hoenn", location: "South of Lilycove City (cemetery, +6)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Jack Raichurrow", region: "Hoenn", location: "Petalburg City", groupA: ["TM Electro Blast", "TM Electric Terrain"], groupB: ["TM Nuzzle", "Sparrow's set", "Raichu Bush Kit"], groupC: ["Thunder Bolt", "Raichu Carpet", "Raichu Bag"] },
        
        // ORANGE ISLANDS BOSSES
        { name: "Deoxys", region: "Orange", location: "East Mandarin (normal Pokémon island)", groupA: ["TM Selfheal", "TM Metronome", "TM Synchronoise"], groupB: ["Trapped Love", "TM Psychic"], groupC: ["Deoxys Carpet", "Deoxys Toy"] },

        // ALOLA ISLAND BOSSES
        { name: "Lunala", region: "Alola", location: "Hau'oli Mountain, +2 (left side past Flying respawn)", groupA: ["TM Shadow Storm", "TM Curse Pledge", "TM Trick Room"], groupB: ["Trapped Moonlight", "TM Night Shade", "Lunala Locker Kit"], groupC: ["TM Shadow Ball"] },
        { name: "Donald Trump", region: "Alola", location: "Hau'oli Mountain (center, near Steel 175 or Tapu Koko side)", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Solgaleo", region: "Alola", location: "Paniola Ranch (left of town, corrals inside or outside)", groupA: ["Solgaleo's Mask", "TM Magnetic Shock", "TM Metallic Rush", "TM Psychic Terrain"], groupB: ["TM Metal Sound", "TM Meteor Mash"], groupC: ["TM Gear Grind", "TM Smart Strike"] },
        { name: "Grand Galvantula", region: "Alola", location: "North Paniola Ranch", groupA: ["(No data provided for A)"], groupB: ["(No data provided for B)"], groupC: ["(No data provided for C)"] },
        { name: "Necrozma", region: "Alola", location: "Malie (way to the Lanakila cable car)", groupA: ["TM Psyblast", "TM Light Screen", "TM Case 11"], groupB: ["Trapped Soul", "TM Synchronoise"], groupC: ["TM Psychic"] }
    ];
    // --- End Boss Data Structure ---


    // --- Helper Functions ---

    function populateBossDropdown() {
        // ... (function implementation is fine and unchanged)
        const select = document.getElementById('boss-select');
        const sortedBosses = [...bossRaidData].sort((a, b) => a.name.localeCompare(b.name));

        sortedBosses.forEach(boss => {
            const option = document.createElement('option');
            option.value = boss.name;
            option.textContent = boss.name;
            select.appendChild(option);
        });
    }

    /**
     * Renders the details for the selected boss.
     * @param {string} bossName - The name of the boss to display.
     */
    function displayBossDetails(bossName) {
        const resultsDiv = document.getElementById('raid-results');
        const boss = bossRaidData.find(b => b.name === bossName);

        // 1. Ensure the general rules are hidden (this targets the rules element)
        const rulesDiv = document.getElementById('raid-system-details');
        if (rulesDiv) {
            rulesDiv.style.display = 'none';
        }

        if (!boss) {
            resultsDiv.innerHTML = '<p>Jefe no encontrado. Por favor, selecciona uno de la lista.</p>';
            return;
        }

        // 2. Generate and replace the ENTIRE content of the raid-results div with the new boss data.
        // This ensures any previous boss information is fully overwritten.
        const detailsHTML = `
            <div class="boss-details-container">
                <h3>Información de **${boss.name}**</h3>
                <p><strong>Ubicación:</strong> ${boss.location || 'Ubicación no especificada en los datos de la lista.'}</p>
                
                <div class="boss-loot-groups" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; text-align: left;">
                    
                    <div class="loot-group group-a lightpurple" style="border: 2px solid #8e44ad; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>🏆 Grupo A (Máximo Valor)</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupA.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="loot-group group-b lightpurple" style="border: 2px solid #a464b4; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>⭐ Grupo B (Buen Valor)</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupB.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="loot-group group-c lightpurple" style="border: 2px solid #ba6fd7; padding: 15px; border-radius: 8px; width: 300px;">
                        <h5>🔸 Grupo C (Valor Variable)</h5>
                        <ul style="list-style-type: none; padding-left: 10px;">
                            ${boss.groupC.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <p class="warning-text" style="color: #6a3595; margin-top: 15px;">Recuerda: El loot se basa en el daño infligido. **Grupo A** son para los jugadores con mayor daño.</p>
            </div>
        `;

        resultsDiv.innerHTML = detailsHTML;
    }

    function displayBossLocations() {
        // ... (function implementation is fine and unchanged)
        const locationDiv = document.getElementById('boss-location-list');
        const regionalData = bossRaidData.reduce((acc, boss) => {
            if (!acc[boss.region]) {
                acc[boss.region] = [];
            }
            if (boss.location) {
                 acc[boss.region].push(`**${boss.name}**: ${boss.location}`);
            }
            return acc;
        }, {});

        let html = '';
        for (const region in regionalData) {
            html += `
                <h4 style="color: #532d64; margin-top: 20px;">Región de ${region}</h4>
                <ul style="list-style-type: disc; margin-left: 20px;">
                    ${regionalData[region].map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
        locationDiv.innerHTML = html;
    }

    // --- Event Listeners ---

    const bossSelect = document.getElementById('boss-select');
    
    // **KEY FIX**: Ensure the event listener correctly calls the display function 
    // when the value of the dropdown changes.
    bossSelect.addEventListener('change', (event) => {
        const selectedBossName = event.target.value;
        if (selectedBossName) {
            displayBossDetails(selectedBossName);
        }
    });

    // Function to scroll to the top of the page (exposed globally)
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Show/hide 'back-to-top' button
    window.addEventListener('scroll', () => {
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) { // Added a check just in case
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    });


    // --- Initial Setup ---
    populateBossDropdown();
    displayBossLocations();
});