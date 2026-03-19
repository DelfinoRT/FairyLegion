// BugNet.js - Pokemon Search and Jar Combination Finder

// Pokemon data with their required jar combinations
const bugNetPokemon = [
    // Bug Type Pokemon (Weedle Jar)
    { name: "Caterpie", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes/Trees" },
    { name: "Metapod", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Kakuna", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Weedle", jars: ["Weedle Jar"], types: ["Bug", "Poison"], location: "Bushes/Trees" },
    { name: "Pineco", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Wurmple", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Silcoon", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Cascoon", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Burmyp", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Burmyt", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Burmys", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Karrablast", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Grubbin", jars: ["Weedle Jar"], types: ["Bug"], location: "Bushes" },
    { name: "Nincada", jars: ["Weedle Jar"], types: ["Bug", "Ground"], location: "Bushes" },
    { name: "Joltik", jars: ["Weedle Jar"], types: ["Bug", "Electric"], location: "Bushes" },
    { name: "Anorith", jars: ["Weedle Jar"], types: ["Bug", "Rock"], location: "Bushes" },
    { name: "Surskit", jars: ["Weedle Jar"], types: ["Bug", "Water"], location: "Bushes" },
    { name: "Sewaddle", jars: ["Weedle Jar"], types: ["Bug", "Grass"], location: "Bushes" },
    { name: "Scrafty", jars: ["Weedle Jar"], types: ["Dark", "Fighting"], location: "Trees" },
    { name: "Shuckle", jars: ["Weedle Jar"], types: ["Bug", "Rock"], location: "Trees" },
    { name: "Heracross", jars: ["Weedle Jar"], types: ["Bug", "Fighting"], location: "Trees" },
    { name: "Pinsir", jars: ["Weedle Jar"], types: ["Bug"], location: "Trees" },
    { name: "Forretress", jars: ["Weedle Jar"], types: ["Bug", "Steel"], location: "Trees" },
    { name: "Parasect", jars: ["Weedle Jar"], types: ["Bug", "Grass"], location: "Trees" },
    { name: "Wormadam", jars: ["Weedle Jar"], types: ["Bug", "Grass"], location: "Trees" },
    { name: "Wormadam (Trash)", jars: ["Weedle Jar"], types: ["Bug", "Steel"], location: "Trees" },
    { name: "Wormadam (Sand)", jars: ["Weedle Jar"], types: ["Bug", "Ground"], location: "Trees" },
    { name: "Volbeat", jars: ["Weedle Jar"], types: ["Bug"], location: "Trees" },
    { name: "Illumise", jars: ["Weedle Jar"], types: ["Bug"], location: "Trees" },
    { name: "Swadloon", jars: ["Weedle Jar"], types: ["Bug", "Grass"], location: "Trees" },
    { name: "Leavanny", jars: ["Weedle Jar"], types: ["Bug", "Grass"], location: "Trees" },
    { name: "Escavalier", jars: ["Weedle Jar"], types: ["Bug", "Steel"], location: "Trees" },
    { name: "Galvantula", jars: ["Weedle Jar"], types: ["Bug", "Electric"], location: "Trees" },
    { name: "Charjabug", jars: ["Weedle Jar"], types: ["Bug", "Electric"], location: "Trees" },
    { name: "Vikavolt", jars: ["Weedle Jar"], types: ["Bug", "Electric"], location: "Trees" },
    { name: "Ribombee", jars: ["Weedle Jar"], types: ["Bug", "Fairy"], location: "Trees" },
    { name: "Big Galvantula", jars: ["Weedle Jar"], types: ["Bug", "Electric"], location: "Trees (Special)" },
    { name: "Dustox", jars: ["Weedle Jar"], types: ["Bug", "Poison"], location: "Trees" },
    { name: "Beautifly", jars: ["Weedle Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Masquerain", jars: ["Weedle Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Ninjask", jars: ["Weedle Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Mothim", jars: ["Weedle Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Vespiquen", jars: ["Weedle Jar"], types: ["Bug", "Flying"], location: "Trees" },
    
    // Flying Type Pokemon (Caterpie Jar)
    { name: "Spearow", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Hoothoot", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Ledyba", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Bushes" },
    { name: "Natu", jars: ["Caterpie Jar"], types: ["Psychic", "Flying"], location: "Bushes" },
    { name: "Yanma", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Bushes" },
    { name: "Murkrow", jars: ["Caterpie Jar"], types: ["Dark", "Flying"], location: "Bushes" },
    { name: "Taillow", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Swablu", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Starly", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Combee", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Bushes" },
    { name: "Vullaby", jars: ["Caterpie Jar"], types: ["Dark", "Flying"], location: "Bushes" },
    { name: "Rowlet", jars: ["Caterpie Jar"], types: ["Grass", "Flying"], location: "Bushes" },
    { name: "Pikipek", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Bushes" },
    { name: "Noibat", jars: ["Caterpie Jar"], types: ["Dragon", "Flying"], location: "Bushes" },
    { name: "Pidgeotto", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Golbat", jars: ["Caterpie Jar"], types: ["Poison", "Flying"], location: "Trees" },
    { name: "Skiploom", jars: ["Caterpie Jar"], types: ["Grass", "Flying"], location: "Trees" },
    { name: "Fearow", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Farfetch'd", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Pidgeot", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Butterfree", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Beedrill", jars: ["Caterpie Jar"], types: ["Bug", "Poison"], location: "Trees" },
    { name: "Scyther", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Noctowl", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Ledian", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Crobat", jars: ["Caterpie Jar"], types: ["Poison", "Flying"], location: "Trees" },
    { name: "Xatu", jars: ["Caterpie Jar"], types: ["Psychic", "Flying"], location: "Trees" },
    { name: "Jumpluff", jars: ["Caterpie Jar"], types: ["Grass", "Flying"], location: "Trees" },
    { name: "Skarmory", jars: ["Caterpie Jar"], types: ["Steel", "Flying"], location: "Trees" },
    { name: "Swellow", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Altaria", jars: ["Caterpie Jar"], types: ["Dragon", "Flying"], location: "Trees" },
    { name: "Staravia", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Staraptor", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Honchkrow", jars: ["Caterpie Jar"], types: ["Dark", "Flying"], location: "Trees" },
    { name: "Yanmega", jars: ["Caterpie Jar"], types: ["Bug", "Flying"], location: "Trees" },
    { name: "Mandibuzz", jars: ["Caterpie Jar"], types: ["Dark", "Flying"], location: "Trees" },
    { name: "Trumbeak", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Toucannon", jars: ["Caterpie Jar"], types: ["Normal", "Flying"], location: "Trees" },
    { name: "Noivern", jars: ["Caterpie Jar"], types: ["Dragon", "Flying"], location: "Trees" },
    
    // Poison Type Pokemon (Grimer Jar)
    { name: "Ekans", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Grimer", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Gulpin", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Stunky", jars: ["Grimer Jar"], types: ["Poison", "Dark"], location: "Bushes" },
    { name: "Skorupi", jars: ["Grimer Jar"], types: ["Poison", "Bug"], location: "Bushes" },
    { name: "Venonat", jars: ["Grimer Jar"], types: ["Bug", "Poison"], location: "Bushes" },
    { name: "Spinarak", jars: ["Grimer Jar"], types: ["Bug", "Poison"], location: "Bushes" },
    { name: "Budew", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Bushes" },
    { name: "Weepinbell", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Bushes" },
    { name: "Gloom", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Bushes" },
    { name: "Nidorina", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Nidorino", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Alolan Grimer", jars: ["Grimer Jar"], types: ["Poison"], location: "Bushes" },
    { name: "Zubat", jars: ["Grimer Jar"], types: ["Poison", "Flying"], location: "Trees" },
    { name: "Arbok", jars: ["Grimer Jar"], types: ["Poison"], location: "Trees" },
    { name: "Weezing", jars: ["Grimer Jar"], types: ["Poison"], location: "Trees" },
    { name: "Seviper", jars: ["Grimer Jar"], types: ["Poison"], location: "Trees" },
    { name: "Skuntank", jars: ["Grimer Jar"], types: ["Poison", "Dark"], location: "Trees" },
    { name: "Venomoth", jars: ["Grimer Jar"], types: ["Bug", "Poison"], location: "Trees" },
    { name: "Victreebel", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Trees" },
    { name: "Vileplume", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Trees" },
    { name: "Ariados", jars: ["Grimer Jar"], types: ["Bug", "Poison"], location: "Trees" },
    { name: "Roselia", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Trees" },
    { name: "Roserade", jars: ["Grimer Jar"], types: ["Grass", "Poison"], location: "Trees" },
    { name: "Swalot", jars: ["Grimer Jar"], types: ["Poison"], location: "Trees" },
    { name: "Drapion", jars: ["Grimer Jar"], types: ["Poison", "Dark"], location: "Trees" },
    { name: "Toxapex", jars: ["Grimer Jar"], types: ["Poison", "Water"], location: "Trees" },
    { name: "Mareanie", jars: ["Grimer Jar"], types: ["Poison", "Water"], location: "Trees" },
    
    // Additional Pokemon (No specific jar required - found in bushes/trees)
    { name: "Spinarak", jars: ["None (Base)"], types: ["Bug", "Poison"], location: "Bushes" },
    
    // Shiny Pokemon (Shiny Venonat Jar)
    { name: "Shiny Noibat", jars: ["Shiny Venonat Jar"], types: ["Dragon", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Noivern", jars: ["Shiny Venonat Jar"], types: ["Dragon", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Noctowl", jars: ["Shiny Venonat Jar"], types: ["Normal", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Staraptor", jars: ["Shiny Venonat Jar"], types: ["Normal", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Mandibuzz", jars: ["Shiny Venonat Jar"], types: ["Dark", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Toucannon", jars: ["Shiny Venonat Jar"], types: ["Normal", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Ariados", jars: ["Shiny Venonat Jar"], types: ["Bug", "Poison"], location: "Shiny Venonat Jar" },
    { name: "Shiny Drapion", jars: ["Shiny Venonat Jar"], types: ["Poison", "Dark"], location: "Shiny Venonat Jar" },
    { name: "Shiny Escavalier", jars: ["Shiny Venonat Jar"], types: ["Bug", "Steel"], location: "Shiny Venonat Jar" },
    { name: "Shiny Galvantula", jars: ["Shiny Venonat Jar"], types: ["Bug", "Electric"], location: "Shiny Venonat Jar" },
    { name: "Shiny Seviper", jars: ["Shiny Venonat Jar"], types: ["Poison"], location: "Shiny Venonat Jar" },
    { name: "Shiny Ribombee", jars: ["Shiny Venonat Jar"], types: ["Bug", "Fairy"], location: "Shiny Venonat Jar" },
    { name: "Shiny Caterpie", jars: ["Shiny Venonat Jar"], types: ["Bug"], location: "Shiny Venonat Jar" },
    { name: "Shiny Metapod", jars: ["Shiny Venonat Jar"], types: ["Bug"], location: "Shiny Venonat Jar" },
    { name: "Shiny Butterfree", jars: ["Shiny Venonat Jar"], types: ["Bug", "Flying"], location: "Shiny Venonat Jar" },
    { name: "Shiny Weedle", jars: ["Shiny Venonat Jar"], types: ["Bug", "Poison"], location: "Shiny Venonat Jar" },
    { name: "Shiny Kakuna", jars: ["Shiny Venonat Jar"], types: ["Bug", "Poison"], location: "Shiny Venonat Jar" },
    { name: "Shiny Beedrill", jars: ["Shiny Venonat Jar"], types: ["Bug", "Poison"], location: "Shiny Venonat Jar" },
    
    // Cloned Pokemon (Shiny Weedle Jar - Cloned Island)
    { name: "Cloned Golbat", jars: ["Shiny Weedle Jar"], types: ["Poison", "Flying"], location: "Cloned Island" },
    { name: "Cloned Arbok", jars: ["Shiny Weedle Jar"], types: ["Poison"], location: "Cloned Island" },
    { name: "Cloned Weezing", jars: ["Shiny Weedle Jar"], types: ["Poison"], location: "Cloned Island" },
    { name: "Cloned Pinsir", jars: ["Shiny Weedle Jar"], types: ["Bug"], location: "Cloned Island" },
    { name: "Cloned Butterfree", jars: ["Shiny Weedle Jar"], types: ["Bug", "Flying"], location: "Cloned Island" },
    { name: "Cloned Beedrill", jars: ["Shiny Weedle Jar"], types: ["Bug", "Poison"], location: "Cloned Island" },
    { name: "Cloned Parasect", jars: ["Shiny Weedle Jar"], types: ["Bug", "Grass"], location: "Cloned Island" },
    { name: "Cloned Venomoth", jars: ["Shiny Weedle Jar"], types: ["Bug", "Poison"], location: "Cloned Island" },
    { name: "Cloned Farfetch'd", jars: ["Shiny Weedle Jar"], types: ["Normal", "Flying"], location: "Cloned Island" },
    { name: "Cloned Pidgeot", jars: ["Shiny Weedle Jar"], types: ["Normal", "Flying"], location: "Cloned Island" },
    { name: "Cloned Venusaur", jars: ["Shiny Weedle Jar"], types: ["Grass", "Poison"], location: "Cloned Island" },
    { name: "Cloned Scyther", jars: ["Shiny Weedle Jar"], types: ["Bug", "Flying"], location: "Cloned Island" },
    { name: "Cloned Victreebel", jars: ["Shiny Weedle Jar"], types: ["Grass", "Poison"], location: "Cloned Island" },
    { name: "Cloned Vileplume", jars: ["Shiny Weedle Jar"], types: ["Grass", "Poison"], location: "Cloned Island" },
    { name: "Cloned Dodrio", jars: ["Shiny Weedle Jar"], types: ["Normal", "Flying"], location: "Cloned Island" },
    { name: "Cloned Fearow", jars: ["Shiny Weedle Jar"], types: ["Normal", "Flying"], location: "Cloned Island" }
];

// Jar descriptions for reference
const jarDescriptions = {
    "Weedle Jar": { effect: "Permite encontrar solo Pokémon de tipo Bicho. Adicionalmente, permite encontrar a Big Galvantula.", compatible: "No compatible con Caterpie Jar o Grimer Jar", image: "/BugNet/WeedleJar.png" },
    "Shiny Weedle Jar": { effect: "Da una pequeña posibilidad de encontrar Pokémon Clonados. Solo es compatible con Shiny Caterpie Jar, Venonat Jar y Cutiefly Jar. Solo funciona en Cloned Island.", compatible: "Compatible con Shiny Caterpie Jar, Venonat Jar, Cutiefly Jar", image: "/BugNet/ShinyWeedleJar.png" },
    "Caterpie Jar": { effect: "Permite encontrar solo Pokémon de tipo Volador.", compatible: "No compatible con Weedle Jar o Grimer Jar", image: "/BugNet/CaterpieJar.png" },
    "Shiny Caterpie Jar": { effect: "Da una pequeña posibilidad de encontrar 2 Pokémon adicionales y una muy pequeña posibilidad de encontrar 3 adicionales.", compatible: "No compatible con Venonat Jar", image: "/BugNet/ShinyCaterpieJar.png" },
    "Grimer Jar": { effect: "Permite encontrar solo Pokémon de tipo Veneno.", compatible: "No compatible con Weedle Jar o Caterpie Jar", image: "/BugNet/GrimerJar.png" },
    "Shiny Grimer Jar": { effect: "Permite encontrar solo Pokémon fuertes.", compatible: "Compatible con cualquier Jar", image: "/BugNet/ShinyGrimerJar.png" },
    "Venonat Jar": { effect: "Da una pequeña posibilidad de encontrar 1 Pokémon adicional y una muy pequeña posibilidad de encontrar 2 adicionales.", compatible: "No compatible con Shiny Caterpie Jar", image: "/BugNet/VenonatJar.png" },
    "Shiny Venonat Jar": { effect: "Da una pequeña posibilidad de encontrar Pokémon Shiny.", compatible: "Compatible con cualquier Jar", image: "/BugNet/ShinyVenonatJar.png" },
    "Cutiefly Jar": { effect: "Aumenta la probabilidad de encontrar Pokémon en un 20%.", compatible: "Compatible con cualquier Jar", image: "/BugNet/CutieflyJar.png" },
    "None (Base)": { effect: "Sin jarra específica - encuentra cualquier Pokémon disponible en la zona.", compatible: "Compatible con cualquier Jar", image: "" }
};

// Initialize the search functionality
function initBugNetSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    bugNetPokemon.sort((a, b) => a.name.localeCompare(b.name));
    
    // Add input event listener for search
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        showSuggestions(query);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
    
    function showSuggestions(query) {
        if (!suggestionsBox) return;
        
        if (query.length < 1) {
            hideSuggestions();
            return;
        }
        
        // Filter pokemon based on query
        const matches = bugNetPokemon.filter(p => 
            p.name.toLowerCase().includes(query)
        ).slice(0, 10); // Limit to 10 suggestions
        
        if (matches.length === 0) {
            suggestionsBox.innerHTML = '<div class="suggestion-item no-results">No se encontraron Pokémon</div>';
            suggestionsBox.style.display = 'block';
            return;
        }
        
        suggestionsBox.innerHTML = matches.map(p => `
            <div class="suggestion-item" data-pokemon="${p.name}">
                <span class="pokemon-name">${p.name}</span>
                <span class="pokemon-types">${p.types.join(', ')}</span>
            </div>
        `).join('');
        
        suggestionsBox.style.display = 'block';
        
        // Add click handlers to suggestions
        suggestionsBox.querySelectorAll('.suggestion-item:not(.no-results)').forEach(item => {
            item.addEventListener('click', function() {
                const pokemonName = this.getAttribute('data-pokemon');
                selectPokemon(pokemonName);
            });
        });
    }
    
    function hideSuggestions() {
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    }
    
    function selectPokemon(pokemonName) {
        const pokemon = bugNetPokemon.find(p => p.name === pokemonName);
        if (!pokemon) return;
        
        // Update search input
        searchInput.value = pokemon.name;
        hideSuggestions();
        
        // Display result
        displayResult(pokemon);
    }
    
    function displayResult(pokemon) {
        if (!resultContainer) return;
        
        const jarsHtml = pokemon.jars.map(jarName => {
            const jar = jarDescriptions[jarName];
            if (!jar) return '';
            
            return `
                <div class="jar-result">
                    <div class="jar-header">
                        ${jar.image ? `<img src="${jar.image}" alt="${jarName}" class="jar-icon">` : ''}
                        <h3>${jarName}</h3>
                    </div>
                    <p class="jar-effect">${jar.effect}</p>
                    <p class="jar-compatible"><strong>Compatibilidad:</strong> ${jar.compatible}</p>
                </div>
            `;
        }).join('');
        
        const typesHtml = pokemon.types.join(', ');
        
        resultContainer.innerHTML = `
            <div class="pokemon-result">
                <h2>${pokemon.name}</h2>
                <p class="pokemon-types"><strong>Tipos:</strong> ${typesHtml}</p>
                <p class="pokemon-location"><strong>Ubicación:</strong> ${pokemon.location}</p>
                <div class="jars-required">
                    <h3>Jaras/Jars requeridos:</h3>
                    ${jarsHtml}
                </div>
            </div>
        `;
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initBugNetSearch);
