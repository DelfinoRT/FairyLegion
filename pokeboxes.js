document.addEventListener("DOMContentLoaded", function () {
    // Collapsible functionality
    const coll = document.getElementsByClassName("collapsiblegi");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    }

    const boxesData = [
        { name: "Aero Box", image: "BoxesImages/aerobox.png", pokemon: ["Altaria", "Dragonite", "Fearow", "Flygon", "Gliscor", "Noctowl", "Pidgeot", "Salamence", "Swellow", "Togekiss", "Yanmega"] },
        { name: "Audino Box", image: "BoxesImages/audinobox.png", pokemon: ["Audino"] },
        { name: "Dusty Box", image: "BoxesImages/dustybox.png", pokemon: ["Aggron", "Armaldo", "Cradily", "Golem", "Kabutops", "Omastar", "Rhydon", "Steelix"] },
        { name: "Halloween 2020 Box", image: "BoxesImages/Halloween2020Box.png", pokemon: ["Dreepy", "Galarian Yamask", "Sinistea"] },
        { name: "Hoenn Box 1", image: "BoxesImages/HoennBox1.png", pokemon: ["Duskull", "Mudkip", "Poochyena", "Ralts", "Torchic", "Treecko"] },
        { name: "Hoenn Box 2", image: "BoxesImages/HoennBox2.png", pokemon: ["Anorith", "Aron", "Bagon", "Baltoy", "Barboach", "Beldum", "Carvanha", "Cascoon", "Clamperl", "Corphish", "Duskull", "Electrike", "Gulpin", "Lileep", "Lotad", "Meditite", "Mudkip", "Nincada", "Numel", "Poochyena", "Ralts", "Seedot", "Shroomish", "Shuppet", "Silcoon", "Skitty", "Slakoth", "Snorunt", "Spheal", "Spoink", "Swablu", "Taillow", "Torchic", "Trapinch", "Treecko", "Whismur", "Wingull"] },
        { name: "Hoenn Box 3", image: "BoxesImages/HoennBox3.png", pokemon: ["Beautifly", "Breloom", "Cacnea", "Camerupt", "Chimecho", "Combusken", "Delcatty", "Dusclops", "Dustox", "Gorebyss", "Grovyle", "Grumpig", "Huntail", "Illumise", "Kirlia", "Lairon", "Linoone", "Lombre", "Loudred", "Luvdisc", "Makuhita", "Manectric", "Marshtomp", "Masquerain", "Medicham", "Metang", "Mightyena", "Minun", "Ninjask", "Nosepass", "Nuzleaf", "Pelipper", "Plusle", "Roselia", "Sealeo", "Sharpedo", "Shelgon", "Spinda", "Swalot", "Swellow", "Torkoal", "Vibrava", "Vigoroth", "Volbeat", "Whiscash", "Wynaut"] },
        { name: "Hoenn Box 4", image: "BoxesImages/HoennBox4.png", pokemon: ["Absol", "Aggron", "Altaria", "Armaldo", "Banette", "Blaziken", "Cacturne", "Claydol", "Cradily", "Crawdaunt", "Exploud", "Flygon", "Gardevoir", "Glalie", "Hariyama", "Ludicolo", "Lunatone", "Mawile", "Metagross", "Milotic", "Relicanth", "Sableye", "Salamence", "Sceptile", "Seviper", "Shiftry", "Slaking", "Solrock", "Swampert", "Tropius", "Walrein", "Zangoose"] },
        { name: "Hot Box", image: "BoxesImages/HotBox.png", pokemon: ["Arcanine", "Blaziken", "Camerupt", "Charizard", "Flareon", "Houndoom", "Infernape", "Magcargo", "Magmar", "Ninetales", "Typhlosion"] },
        { name: "INQ Box", image: "BoxesImages/INQBox.png", pokemon: ["Ambipom", "Bronzong", "Electivire", "Froslass", "Gliscor", "Honchkrow", "Lickilicky", "Luxray", "Magmortar", "Magnezone", "Mamoswine", "Mismagius", "Rhyperior", "Tangrowth", "Togekiss", "Toxicroak", "Weavile", "Yanmega"] },
        { name: "Johto Box 2", image: "BoxesImages/JohtoBox2.png", pokemon: ["Aipom", "Ariados", "Chikorita", "Corsola", "Cyndaquil", "Furret", "Houndour", "Ledian", "Mareep", "Marill", "Murkrow", "Natu", "Phanpy", "Quagsire", "Remoraid", "Shuckle", "Skiploom", "Slugma", "Snubbull", "Sunflora", "Swinub", "Teddiursa", "Totodile", "Yanma"] },
        { name: "Johto Box 3", image: "BoxesImages/JohtoBox3.png", pokemon: ["Azumarill", "Bayleef", "Bellossom", "Croconaw", "Delibird", "Donphan", "Dunsparce", "Elekid", "Espeon", "Flaaffy", "Forretress", "Girafarig", "Gligar", "Granbull", "Jumpluff", "Lanturn", "Larvitar", "Magby", "Magcargo", "Mantine", "Miltank", "Noctowl", "Quilava", "Smoochum", "Sneasel", "Stantler", "Sudowoodo", "Togepi", "Tyrogue", "Umbreon", "Wobbuffet", "Xatu"] },
        { name: "Johto Box 4", image: "BoxesImages/JohtoBox4.png", pokemon: ["Ampharos", "Blissey", "Crobat", "Feraligatr", "Heracross", "Hitmontop", "Houndoom", "Kingdra", "Meganium", "Misdreavus", "Octillery", "Piloswine", "Politoed", "Porygon2", "Pupitar", "Scizor", "Skarmory", "Slowking", "Steelix", "Togetic", "Typhlosion", "Tyranitar", "Ursaring"] },
        { name: "Clone Box", image: "BoxesImages/clonebox.png", pokemon: ["Cloned Alakazam", "Cloned Arbok", "Cloned Blastoise", "Cloned Charizard", "Cloned Dragonite", "Cloned Electabuzz", "Cloned Gengar", "Cloned Lapras", "Cloned Pidgeot", "Cloned Scizor", "Cloned Venusaur", "Cloned Zoroark"] },
        { name: "Cold Box", image: "BoxesImages/coldbox.png", pokemon: ["Blastoise", "Crawdaunt", "Empoleon", "Feraligatr", "Glaceon", "Gyarados", "Kingdra", "Lapras", "Politoed", "Poliwrath", "Swampert", "Vaporeon"] },
        { name: "Kalos Box 2", image: "BoxesImages/KalosBox2.png", pokemon: ["Bergmite", "Bunnelby", "Chespin", "Fennekin", "Flabebe", "Fletchling", "Froakie", "Goomy", "Honedge", "Litleo", "Pancham", "Phantump", "Pumpkaboo", "Skrelp", "Spritzee", "Swirlix"] },
        { name: "Kalos Box 3", image: "BoxesImages/KalosBox3.png", pokemon: ["Aromatisse", "Avalugg", "Braixen", "Dedenne", "Diggersby", "Doublade", "Fletchinder", "Floette", "Frogadier", "Furfrou", "Gourgeist", "Hawlucha", "Helioptile", "Noibat", "Pangoro", "Pyroar", "Quilladin", "Sliggoo", "Slurpuff", "Sylveon", "Trevenant"] },
        { name: "Kalos Box 4", image: "BoxesImages/KalosBox4.png", pokemon: ["Aegislash", "Amaura", "Aurorus", "Carbink", "Chesnaught", "Delphox", "Dragalge", "Espurr", "Florges", "Gogoat", "Goodra", "Greninja", "Heliolisk", "Inkay", "Klefki", "Malamar", "Meowsticf", "Meowsticm", "Noivern", "Skiddo", "Talonflame", "Tyrantrum", "Tyrunt"] },
        { name: "Kanto Box 2", image: "BoxesImages/KantoBox2.png", pokemon: ["Abra", "Arbok", "Beedrill", "Bulbasaur", "Butterfree", "Charmander", "Clefairy", "Cubone", "Doduo", "Dratini", "Drowzee", "Eevee", "Ekans", "Gastly", "Geodude", "Gloom", "Golbat", "Grimer", "Growlithe", "Jigglypuff", "Kabuto", "Koffing", "Machop", "Mankey", "Meowth", "Muk", "Nidoranf", "Nidoranm", "Nidorina", "Nidorino", "Omanyte", "Persian", "Pidgeotto", "Pikachu", "Poliwhirl", "Ponyta", "Psyduck", "Rhyhorn", "Sandshrew", "Seaking", "Seel", "Slowpoke", "Squirtle", "Staryu", "Tentacool", "Venonat", "Voltorb", "Vulpix", "Weepinbell", "Weezing"] },
        { name: "Kanto Box 3", image: "BoxesImages/KantoBox3.png", pokemon: ["Chansey", "Charmeleon", "Clefable", "Cloyster", "Dodrio", "Dugtrio", "Electrode", "Exeggutor", "Farfetch'd", "Fearow", "Flareon", "Golduck", "Graveler", "Haunter", "Hitmonchan", "Hitmonlee", "Hypno", "Ivysaur", "Jolteon", "Kadabra", "Kangaskhan", "Kingler", "Lickitung", "Machoke", "Magneton", "Marowak", "Mr Mime", "Onix", "Parasect", "Pinsir", "Porygon", "Primeape", "Raichu", "Rapidash", "Sandslash", "Seadra", "Slowbro", "Starmie", "Tangela", "Tauros", "Vaporeon", "Venomoth", "Victreebel", "Vileplume", "Wartortle", "Wigglytuff"] },
        { name: "Kanto Box 4", image: "BoxesImages/KantoBox4.png", pokemon: ["Venusaur", "Snorlax", "Rhydon", "Scyther", "Poliwrath", "Pidgeot", "Omastar", "Ninetales", "Nidoqueen", "Nidoking", "Magmar", "Machamp", "Lapras", "Kabutops", "Jynx", "Gyarados", "Golem", "Gengar", "Electabuzz", "Dragonite", "Dragonair", "Charizard", "Blastoise", "Arcanine", "Alakazam", "Aerodactyl"] },
        { name: "Natural Box", image: "BoxesImages/NaturalBox.png", pokemon: ["Exeggutor", "Leafeon", "Ludicolo", "Meganium", "Sceptile", "Shiftry", "Torterra", "Tropius", "Venusaur", "Victreebel", "Vileplume"] },
        { name: "Scary Box", image: "BoxesImages/ScaryBox.png", pokemon: ["Banette", "Dusknoir", "Gengar", "Honchkrow", "Mismagius", "Sableye", "Tyranitar", "Umbreon", "Weavile"] },
        { name: "Season Box", image: "BoxesImages/SeasonBox.png", pokemon: ["Deino", "Emolga", "Glaceon", "Leafeon", "Litwick", "Pachirisu", "Pumpkaboo", "Skorupi", "Snover", "Sylveon", "Vanillite"] },
        { name: "Season Box Version 2", image: "BoxesImages/SeasonBoxV2.png", pokemon: ["Blitzle", "Cubchoo", "Drilbur", "Ferroseed", "Joltik", "Pawniard"] },
        { name: "Season Box Version 3", image: "BoxesImages/SeasonBoxV3.png", pokemon: ["Galarian Corsola", "Galarian Slowpoke", "Galarian Zigzagoon"] },
        { name: "Shiny Box", image: "BoxesImages/ShinyBox.png", pokemon: [
            "Shiny Absol", "Shiny Accelgor", "Shiny Aegislash", "Shiny Alcremie", "Shiny Ampharos", "Shiny Annihilape", "Shiny Araquanid", "Shiny Arctibax", "Shiny Ariados", "Shiny Armarouge", "Shiny Aromatisse", "Shiny Audino", "Shiny Avalugg", "Shiny Azumarill", "Shiny Baxcalibur", "Shiny Beedrill", "Shiny Bellibolt", "Shiny Bellossom", "Shiny Bewear", "Shiny Big Magikarp", "Shiny Bisharp", "Shiny Blaziken", "Shiny Boldore", "Shiny Boltund", "Shiny Bouffalant", "Shiny Braixen", "Shiny Braviary", "Shiny Bruxish", "Shiny Buneary", "Shiny Bunnelby", "Shiny Butterfree", "Shiny Carkol", "Shiny Carnivine", "Shiny Centiskorch", "Shiny Ceruledge", "Shiny Cetitan", "Shiny Cetoddle", "Shiny Chandelure", "Shiny Charcadet", "Shiny Cherrim", "Shiny Chien-pao", "Shiny Chimecho", "Shiny Cinderace", "Shiny Clefable", "Shiny Clobbopus", "Shiny Coalossal", "Shiny Combusken", "Shiny Copperajah", "Shiny Corsola", "Shiny Corviknight", "Shiny Corvisquire", "Shiny Crabominable", "Shiny Cradily", "Shiny Crocalor", "Shiny Crustle", "Shiny Cryogonal", "Shiny Cufant", "Shiny Cyndaquil", "Shiny Dachsbun", "Shiny Decidueye", "Shiny Dedenne", "Shiny Delibird", "Shiny Delphox", "Shiny Diggersby", "Shiny Dragalge", "Shiny Drampa", "Shiny Drapion", "Shiny Drizzile", "Shiny Dubwool", "Shiny Durant", "Shiny Dusknoir", "Shiny Dwebble", "Shiny Eelektross", "Shiny Eevee", "Shiny Eiscue", "Shiny Eldegoss", "Shiny Empoleon", "Shiny Escavalier", "Shiny Espeon", "Shiny Espurr", "Shiny Excadrill", "Shiny Exeggutor", "Shiny Fennekin", "Shiny Feraligatr", "Shiny Fidough", "Shiny Finizen", "Shiny Flabebe", "Shiny Fletchinder", "Shiny Fletchling", "Shiny Floette", "Shiny Floragato", "Shiny Florges", "Shiny Flygon", "Shiny Frigibax", "Shiny Froslass", "Shiny Frosmoth", "Shiny Fuecoco", "Shiny Furfrou", "Shiny Gallade", "Shiny Galvantula", "Shiny Garbodor", "Shiny Gardevoir", "Shiny Gholdengo", "Shiny Gigalith", "Shiny Gimmighoul", "Shiny Glaceon", "Shiny Gliscor", "Shiny Gogoat", "Shiny Golduck", "Shiny Golem", "Shiny Golisopod", "Shiny Golurk", "Shiny Gossifleur", "Shiny Grafaiai", "Shiny Grapploct", "Shiny Greavard", "Shiny Greedent", "Shiny Greninja", "Shiny Grookey", "Shiny Hawlucha", "Shiny Heliolisk", "Shiny Helioptile", "Shiny Hisuian Arcanine", "Shiny Hisuian Avalugg", "Shiny Hisuian Goodra", "Shiny Hisuian Growlithe", "Shiny Hisuian Lilligant", "Shiny Hisuian Qwilfish", "Shiny Hisuian Sliggoo", "Shiny Hisuian Zoroark", "Shiny Hisuian Zorua"] },
          { name: "Sinnoh Box", image: "BoxesImages/SinnohBox.png", pokemon: ["Chimchar", "Piplup", "Riolu", "Turtwig"] },
          { name: "Sinnoh Box 2", image: "BoxesImages/SinnohBox2.png", pokemon: ["Bidoof", "Bonsly", "Budew", "Buneary", "Burmy", "Cherubi", "Chimchar", "Chingling", "Combee", "Drifloon", "Finneon", "Gible", "Glameow", "Happiny", "Hippopotas", "Kricketot", "Mantyke", "Mime Jr", "Piplup", "Shellos", "Shieldon", "Skorupi", "Snover", "Starly", "Stunky", "Turtwig"] },
        {
        name: "Sinnoh Box 3",
        image: "BoxesImages/SinnohBox3.png",
        pokemon: [
            "Bastiodon", "Bibarel", "Buizel", "Cherrim", "Drapion", "Drifblim", "Froslass", "Gabite", 
            "Gastrodon", "Glaceon", "Grotle", "Hippowdon", "Kricketune", "Leafeon", "Lopunny", 
            "Lumineon", "Monferno", "Mothim", "Munchlax", "Pachirisu", "Prinplup", "Purugly", 
            "Riolu", "Skuntank", "Spiritomb", "Staravia", "Vespiquen", "Wormadam", "Wormadams", 
            "Wormadamt"
          ]
        },
        {
          name: "Sinnoh Box 4",
          image: "BoxesImages/SinnohBox4.png",
          pokemon: [
            "Abomasnow", "Ambipom", "Bronzor", "Carnivine", "Chatot", "Cranidos", "Croagunk", "Dusknoir", 
            "Electivire", "Empoleon", "Fan Rotom", "Floatzel", "Frost Rotom", "Gallade", "Garchomp", 
            "Gliscor", "Heat Rotom", "Honchkrow", "Infernape", "Lickilicky", "Lucario", "Luxio", "Magmortar", 
            "Magnezone", "Mamoswine", "Mismagius", "Mow Rotom", "Porygon-z", "Probopass", "Rampardos", 
            "Rhyperior", "Roserade", "Rotom", "Shinx", "Staraptor", "Tangrowth", "Togekiss", "Torterra", 
            "Wash Rotom", "Weavile", "Yanmega"
          ]
        },
        {
          name: "PAPOI Box",
          image: "BoxesImages/PAPOIBox.png",
          pokemon: [
            "Aerodactyl", "Alakazam", "Ampharos", "Arcanine", "Blastoise", "Blaziken", "Blissey", "Charizard", 
            "Crobat", "Dewgong", "Dragonair", "Dragonite", "Dusknoir", "Electabuzz", "Feraligatr", 
            "Gallade", "Gardevoir", "Gengar", "Gyarados", "Heracross", "Hitmontop", "Houndoom", "Jynx", 
            "Kabutops", "Kingdra", "Lapras", "Machamp", "Magmar", "Mantine", "Meganium", 
            "Mightyena", "Misdreavus", "Nidoking", "Nidoqueen", "Ninetales", "Octillery", "Omastar", "Pidgeot", 
            "Piloswine", "Politoed", "Poliwrath", "Porygon2", "Pupitar", "Rhydon", "Sceptile", "Scizor", "Scyther", 
            "Skarmory", "Slowking", "Sneasel", "Snorlax", "Steelix", "Swampert", "Tentacruel", "Togetic", 
            "Typhlosion", "Tyranitar", "Tyrogue", "Ursaring", "Venusaur"
          ]
        },
        { name: "Cute Box", image: "BoxesImages/cutebox.png", pokemon: ["Alakazam", "Blissey", "Clefable", "Espeon", "Gallade", "Gardevoir", "Lickilicky", "Mr Mime", "Porygon2", "Slowking", "Sylveon", "Wigglytuff", "Wobbuffet"] }
    ];

 // Search functionality
    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", async function () { // Make the function async
        const searchTerm = searchBox.value.toLowerCase();
        const boxesContainer = document.getElementById("boxesContainer");

        boxesContainer.innerHTML = ""; // Clear previous results

        if (searchTerm) { // Only search if there's a search term
            const foundPokemon = [];

            boxesData.forEach(box => {
                box.pokemon.forEach(pokemon => {
                    if (pokemon.toLowerCase() === searchTerm) {
                        foundPokemon.push({ pokemon: pokemon, box: box.name });
                    }
                });
            });

            if (foundPokemon.length > 0) {
                const results = {};

                foundPokemon.forEach(item => {
                    if (!results[item.pokemon]) {
                        results[item.pokemon] = [];
                    }
                    results[item.pokemon].push(item.box);
                });

                for (const pokemon in results) {
                    const boxNames = results[pokemon];
                    const message = `<strong>${pokemon}</strong> puede obtenerse de ${boxNames.length > 1 ? 'las siguientes cajas' : 'la siguiente caja'}: `;
                    const resultParagraph = document.createElement("p");
                    resultParagraph.innerHTML = message;

                    boxNames.forEach((boxName, index) => {
                        const boldBoxName = document.createElement("strong");
                        boldBoxName.textContent = boxName;
                        boldBoxName.style.color = getRandomColor();

                        resultParagraph.appendChild(boldBoxName);
                        if (index < boxNames.length - 1) {
                            resultParagraph.appendChild(document.createTextNode(", "));
                        }
                    });

                    // Fetch and display the Pokémon image
                    try {
                        const imageUrl = await getPokemonImageUrl(pokemon);
                        const imageElement = document.createElement("img");
                        imageElement.src = imageUrl;
                        imageElement.alt = pokemon;
                        imageElement.style.width = '100px'; // Adjust size as needed
                        resultParagraph.appendChild(imageElement);
                    } catch (error) {
                        console.error("Error fetching Pokémon image:", error);
                    }

                    boxesContainer.appendChild(resultParagraph);
                }
            } else {
                const noResultsParagraph = document.createElement("p");
                noResultsParagraph.textContent = "No se encontró el Pokémon.";
                boxesContainer.appendChild(noResultsParagraph);
            }
        }
    });

    async function getPokemonImageUrl(pokemonName) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.sprites.front_default;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});