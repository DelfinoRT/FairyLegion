// IceHammer.js - Pokemon Search and Item Combination Finder

// Pokemon data with their required item combinations
const iceHammerPokemon = [
    // Base Pokemon (No bait required)
    { name: "Snorunt", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Alolan Sandshrew", items: ["None (Base)"], types: ["Ice", "Steel"], location: "Ice Blocks" },
    { name: "Galarian Darumaka", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Cubchoo", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Vanillite", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Vanillish", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Bergmite", items: ["None (Base)"], types: ["Ice"], location: "Ice Blocks" },
    { name: "Galarian Mr Mime", items: ["None (Base)"], types: ["Ice", "Psychic"], location: "Ice Blocks" },
    { name: "Smoochum", items: ["None (Base)"], types: ["Ice", "Psychic"], location: "Ice Blocks" },
    { name: "Spheal", items: ["None (Base)"], types: ["Ice", "Water"], location: "Ice Blocks" },
    { name: "Sealeo", items: ["None (Base)"], types: ["Ice", "Water"], location: "Ice Blocks" },
    { name: "Swinub", items: ["None (Base)"], types: ["Ice", "Ground"], location: "Ice Blocks" },
    { name: "Piloswine", items: ["None (Base)"], types: ["Ice", "Ground"], location: "Ice Blocks" },
    { name: "Snom", items: ["None (Base)"], types: ["Ice", "Bug"], location: "Ice Blocks" },
    { name: "Snover", items: ["None (Base)"], types: ["Ice", "Grass"], location: "Ice Blocks" },
    { name: "Sneasel", items: ["None (Base)"], types: ["Ice", "Dark"], location: "Ice Blocks" },
    
    // Strong/Evolved Pokemon (Ice Crystal)
    { name: "Glalie", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Galarian Darmanitan", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Galarian Darmanitan-Zen Mode", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Vanilluxe", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Beartic", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Avalugg", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Eiscue", items: ["Ice Crystal"], types: ["Ice"], location: "Ice Blocks (Strong)" },
    { name: "Alolan Sandslash", items: ["Ice Crystal"], types: ["Ice", "Steel"], location: "Ice Blocks (Strong)" },
    { name: "Jynx", items: ["Ice Crystal"], types: ["Ice", "Psychic"], location: "Ice Blocks (Strong)" },
    { name: "Delibird", items: ["Ice Crystal"], types: ["Ice", "Flying"], location: "Ice Blocks (Strong)" },
    { name: "Mamoswine", items: ["Ice Crystal"], types: ["Ice", "Ground"], location: "Ice Blocks (Strong)" },
    { name: "Walrein", items: ["Ice Crystal"], types: ["Ice", "Water"], location: "Ice Blocks (Strong)" },
    { name: "Mr Rime", items: ["Ice Crystal"], types: ["Ice", "Psychic"], location: "Ice Blocks (Strong)" },
    { name: "Frosmoth", items: ["Ice Crystal"], types: ["Ice", "Bug"], location: "Ice Blocks (Strong)" },
    { name: "Froslass", items: ["Ice Crystal"], types: ["Ice", "Ghost"], location: "Ice Blocks (Strong)" },
    { name: "Lapras", items: ["Ice Crystal"], types: ["Ice", "Water"], location: "Ice Blocks (Strong)" },
    { name: "Weavile", items: ["Ice Crystal"], types: ["Ice", "Dark"], location: "Ice Blocks (Strong)" },
    { name: "Abomasnow", items: ["Ice Crystal"], types: ["Ice", "Grass"], location: "Ice Blocks (Strong)" },
    { name: "Crabominable", items: ["Ice Crystal"], types: ["Ice", "Fighting"], location: "Ice Blocks (Strong)" },
    
    // Shiny Pokemon (Icy Gem)
    { name: "Shiny Avalugg", items: ["Icy Gem"], types: ["Ice"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Eiscue", items: ["Icy Gem"], types: ["Ice"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Delibird", items: ["Icy Gem"], types: ["Ice", "Flying"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Frosmoth", items: ["Icy Gem"], types: ["Ice", "Bug"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Crabominable", items: ["Icy Gem"], types: ["Ice", "Fighting"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Weavile", items: ["Icy Gem"], types: ["Ice", "Dark"], location: "Ice Blocks (Shiny)" },
    { name: "Shiny Mamoswine", items: ["Icy Gem"], types: ["Ice", "Ground"], location: "Ice Blocks (Shiny)" },
    { name: "Glastrier", items: ["Icy Gem"], types: ["Ice"], location: "Ice Blocks (Shiny - Low Probability)" },
    { name: "Shiny Glastrier", items: ["Icy Gem"], types: ["Ice"], location: "Ice Blocks (Shiny - Low Probability)" },
    { name: "Crystal Onix", items: ["Icy Gem"], types: ["Ice", "Rock"], location: "Ice Blocks (Shiny - Very Low Probability)" },
    
    // Regional Pokemon (Medium Icy Gem - Kanto, Johto, Hoenn, Sinnoh)
    { name: "Snorunt (Kanto)", items: ["Medium Icy Gem"], types: ["Ice"], location: "Ice Blocks (Kanto Region)" },
    { name: "Vanillite (Kanto)", items: ["Medium Icy Gem"], types: ["Ice"], location: "Ice Blocks (Kanto Region)" },
    { name: "Swinub (Johto)", items: ["Medium Icy Gem"], types: ["Ice", "Ground"], location: "Ice Blocks (Johto Region)" },
    { name: "Smoochum (Johto)", items: ["Medium Icy Gem"], types: ["Ice", "Psychic"], location: "Ice Blocks (Johto Region)" },
    { name: "Spheal (Hoenn)", items: ["Medium Icy Gem"], types: ["Ice", "Water"], location: "Ice Blocks (Hoenn Region)" },
    { name: "Snom (Sinnoh)", items: ["Medium Icy Gem"], types: ["Ice", "Bug"], location: "Ice Blocks (Sinnoh Region)" },
    
    // Regional Pokemon (Small Icy Gem - Unova, Kalos, Alola, Galar)
    { name: "Cubchoo (Unova)", items: ["Small Icy Gem"], types: ["Ice"], location: "Ice Blocks (Unova Region)" },
    { name: "Vanillite (Kalos)", items: ["Small Icy Gem"], types: ["Ice"], location: "Ice Blocks (Kalos Region)" },
    { name: "Alolan Sandshrew (Alola)", items: ["Small Icy Gem"], types: ["Ice", "Steel"], location: "Ice Blocks (Alola Region)" },
    { name: "Galarian Darumaka (Galar)", items: ["Small Icy Gem"], types: ["Ice"], location: "Ice Blocks (Galar Region)" },
    { name: "Snom (Galar)", items: ["Small Icy Gem"], types: ["Ice", "Bug"], location: "Ice Blocks (Galar Region)" }
];

// Item/crystal descriptions for reference
const itemDescriptions = {
    "Ice Crystal": { effect: "Permite encontrar Pokémon más fuertes en lugar de sus pre-evoluciones", compatible: "Compatible con Snowy Crystal, Delibird's Feather e Icy Gem", image: "/IceHammer/IceCrystal.png" },
    "Snowy Crystal": { effect: "Aumenta la posibilidad de encontrar Pokémon en un 30%", compatible: "Compatible con Ice Crystal, Delibird's Feather e Icy Gem", image: "/IceHammer/SnowyCrystal.png" },
    "Delibird's Feather": { effect: "Da una pequeña posibilidad de encontrar 1 Pokémon adicional y una muy pequeña posibilidad de encontrar 2 adicionales", compatible: "Compatible con Ice Crystal, Snowy Crystal e Icy Gem", image: "/IceHammer/DelibirdsFeather.png" },
    "Icy Gem": { effect: "Permite encontrar Pokémon shiny", compatible: "Compatible con Ice Crystal, Snowy Crystal y Delibird's Feather", image: "/IceHammer/IcyGem.png" },
    "Medium Icy Gem": { effect: "El usuario puede invocar solo Pokémon de Kanto, Johto, Hoenn, Sinnoh. No se puede combinar con Small Icy Gem.", compatible: "No compatible con Small Icy Gem", image: "/IceHammer/MediumIcyGem.png" },
    "Small Icy Gem": { effect: "El usuario puede invocar solo Pokémon de Unova, Kalos, Alola, Galar. No se puede combinar con Medium Icy Gem.", compatible: "No compatible con Medium Icy Gem", image: "/IceHammer/SmallIcyGem.png" },
    "None (Base)": { effect: "Sin items específicos - encuentra cualquier Pokémon de tipo Hielo disponible en los bloques de hielo.", compatible: "Compatible con cualquier item", image: "" }
};

// Initialize the search functionality
function initIceHammerSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    iceHammerPokemon.sort((a, b) => a.name.localeCompare(b.name));
    
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
        const matches = iceHammerPokemon.filter(p => 
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
        const pokemon = iceHammerPokemon.find(p => p.name === pokemonName);
        if (!pokemon) return;
        
        // Update search input
        searchInput.value = pokemon.name;
        hideSuggestions();
        
        // Display result
        displayResult(pokemon);
    }
    
    function displayResult(pokemon) {
        if (!resultContainer) return;
        
        const itemsHtml = pokemon.items.map(itemName => {
            const item = itemDescriptions[itemName];
            if (!item) return '';
            
            return `
                <div class="item-result">
                    <div class="item-header">
                        ${item.image ? `<img src="${item.image}" alt="${itemName}" class="item-icon">` : ''}
                        <h3>${itemName}</h3>
                    </div>
                    <p class="item-effect">${item.effect}</p>
                    <p class="item-compatible"><strong>Compatibilidad:</strong> ${item.compatible}</p>
                </div>
            `;
        }).join('');
        
        const typesHtml = pokemon.types.join(', ');
        
        resultContainer.innerHTML = `
            <div class="pokemon-result">
                <h2>${pokemon.name}</h2>
                <p class="pokemon-types"><strong>Tipos:</strong> ${typesHtml}</p>
                <p class="pokemon-location"><strong>Ubicación:</strong> ${pokemon.location}</p>
                <div class="items-required">
                    <h3>Items requeridos:</h3>
                    ${itemsHtml}
                </div>
            </div>
        `;
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initIceHammerSearch);
