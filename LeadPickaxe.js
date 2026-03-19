// LeadPickaxe.js - Pokemon Search and Item Combination Finder

// Pokemon data with their required item combinations
const leadPickaxePokemon = [
    // Base Pokemon (No bait required)
    { name: "Bonsly", items: ["None (Base)"], types: ["Rock"], location: "Rocks" },
    { name: "Numel", items: ["None (Base)"], types: ["Fire", "Ground"], location: "Rocks" },
    { name: "Nosepass", items: ["None (Base)"], types: ["Rock"], location: "Rocks" },
    { name: "Gabite", items: ["None (Base)"], types: ["Dragon", "Ground"], location: "Rocks (Low Probability)" },
    { name: "Roggenrola", items: ["None (Base)"], types: ["Rock"], location: "Rocks" },
    { name: "Gible", items: ["None (Base)"], types: ["Dragon", "Ground"], location: "Rocks (Low Probability)" },
    { name: "Boldore", items: ["None (Base)"], types: ["Rock"], location: "Rocks" },
    { name: "Krokorok", items: ["None (Base)"], types: ["Ground", "Dark"], location: "Rocks" },
    { name: "Rolycoly", items: ["None (Base)"], types: ["Rock"], location: "Rocks" },
    { name: "Sandile", items: ["None (Base)"], types: ["Ground", "Dark"], location: "Rocks" },
    { name: "Carkol", items: ["None (Base)"], types: ["Rock", "Fire"], location: "Rocks" },
    { name: "Vibrava", items: ["None (Base)"], types: ["Dragon", "Ground"], location: "Rocks (Low Probability)" },
    { name: "Geodude", items: ["None (Base)"], types: ["Rock", "Ground"], location: "Rocks" },
    { name: "Gligar", items: ["None (Base)"], types: ["Ground", "Flying"], location: "Rocks" },
    { name: "Graveler", items: ["None (Base)"], types: ["Rock", "Ground"], location: "Rocks" },
    { name: "Drilbur", items: ["None (Base)"], types: ["Ground"], location: "Rocks" },
    { name: "Larvitar", items: ["None (Base)"], types: ["Rock", "Ground"], location: "Rocks (Low Probability)" },
    { name: "Phanpy", items: ["None (Base)"], types: ["Ground"], location: "Rocks" },
    { name: "Pupitar", items: ["None (Base)"], types: ["Rock", "Ground"], location: "Rocks (Low Probability)" },
    { name: "Cubone", items: ["None (Base)"], types: ["Ground"], location: "Rocks" },
    { name: "Shieldon", items: ["None (Base)"], types: ["Rock", "Steel"], location: "Rocks" },
    { name: "Hippopotas", items: ["None (Base)"], types: ["Ground"], location: "Rocks" },
    { name: "Hisuian Growlithe", items: ["None (Base)"], types: ["Fire", "Rock"], location: "Rocks" },
    { name: "Trapinch", items: ["None (Base)"], types: ["Ground"], location: "Rocks (Low Probability)" },
    { name: "Rhyhorn", items: ["None (Base)"], types: ["Rock", "Ground"], location: "Rocks" },
    { name: "Diglett", items: ["None (Base)"], types: ["Ground"], location: "Rocks" },
    { name: "Aron", items: ["None (Base)"], types: ["Rock", "Steel"], location: "Rocks" },
    { name: "Sandshrew", items: ["None (Base)"], types: ["Ground", "Steel"], location: "Rocks" },
    { name: "Lairon", items: ["None (Base)"], types: ["Rock", "Steel"], location: "Rocks" },
    { name: "Dwebble", items: ["None (Base)"], types: ["Bug", "Rock"], location: "Rocks" },
    
    // Strong/Evolved Pokemon (Gold Crystal)
    { name: "Sudowoodo", items: ["Gold Crystal"], types: ["Rock"], location: "Rocks (Strong)" },
    { name: "Camerupt", items: ["Gold Crystal"], types: ["Fire", "Ground"], location: "Rocks (Strong)" },
    { name: "Gigalith", items: ["Gold Crystal"], types: ["Rock"], location: "Rocks (Strong)" },
    { name: "Garchomp", items: ["Gold Crystal"], types: ["Dragon", "Ground"], location: "Rocks (Strong)" },
    { name: "Coalossal", items: ["Gold Crystal"], types: ["Rock", "Fire"], location: "Rocks (Strong)" },
    { name: "Nidoking", items: ["Gold Crystal"], types: ["Poison", "Ground"], location: "Rocks (Strong)" },
    { name: "Golem", items: ["Gold Crystal"], types: ["Rock", "Ground"], location: "Rocks (Strong)" },
    { name: "Nidoqueen", items: ["Gold Crystal"], types: ["Poison", "Ground"], location: "Rocks (Strong)" },
    { name: "Onix", items: ["Gold Crystal"], types: ["Rock", "Ground"], location: "Rocks (Strong)" },
    { name: "Steelix", items: ["Gold Crystal"], types: ["Steel", "Ground"], location: "Rocks (Strong)" },
    { name: "Tyranitar", items: ["Gold Crystal"], types: ["Rock", "Dark"], location: "Rocks (Strong)" },
    { name: "Krookodile", items: ["Gold Crystal"], types: ["Ground", "Dark"], location: "Rocks (Strong)" },
    { name: "Lunatone", items: ["Gold Crystal"], types: ["Rock", "Psychic"], location: "Rocks (Strong)" },
    { name: "Flygon", items: ["Gold Crystal"], types: ["Dragon", "Ground"], location: "Rocks (Strong)" },
    { name: "Solrock", items: ["Gold Crystal"], types: ["Rock", "Psychic"], location: "Rocks (Strong)" },
    { name: "Gliscor", items: ["Gold Crystal"], types: ["Ground", "Flying"], location: "Rocks (Strong)" },
    { name: "Bastiodon", items: ["Gold Crystal"], types: ["Rock", "Steel"], location: "Rocks (Strong)" },
    { name: "Excadrill", items: ["Gold Crystal"], types: ["Ground", "Steel"], location: "Rocks (Strong)" },
    { name: "Probopass", items: ["Gold Crystal"], types: ["Rock", "Steel"], location: "Rocks (Strong)" },
    { name: "Hippowdon", items: ["Gold Crystal"], types: ["Ground"], location: "Rocks (Strong)" },
    { name: "Minior", items: ["Gold Crystal"], types: ["Rock", "Flying"], location: "Rocks (Strong)" },
    { name: "Donphan", items: ["Gold Crystal"], types: ["Ground"], location: "Rocks (Strong)" },
    { name: "Hisuian Arcanine", items: ["Gold Crystal"], types: ["Fire", "Rock"], location: "Rocks (Strong)" },
    { name: "Marowak", items: ["Gold Crystal"], types: ["Ground"], location: "Rocks (Strong)" },
    { name: "Rhydon", items: ["Gold Crystal"], types: ["Rock", "Ground"], location: "Rocks (Strong)" },
    { name: "Dugtrio", items: ["Gold Crystal"], types: ["Ground"], location: "Rocks (Strong)" },
    { name: "Magcargo", items: ["Gold Crystal"], types: ["Fire", "Rock"], location: "Rocks (Strong)" },
    { name: "Sandslash", items: ["Gold Crystal"], types: ["Ground", "Steel"], location: "Rocks (Strong)" },
    { name: "Aggron", items: ["Gold Crystal"], types: ["Steel", "Rock"], location: "Rocks (Strong)" },
    { name: "Crustle", items: ["Gold Crystal"], types: ["Bug", "Rock"], location: "Rocks (Strong)" },
    { name: "Rhyperior", items: ["Gold Crystal"], types: ["Rock", "Ground"], location: "Rocks (Strong)" },
    
    // Shiny Pokemon (Stone Gem)
    { name: "Golden Sudowoodo", items: ["Stone Gem"], types: ["Rock"], location: "Rocks (Shiny)" },
    { name: "Mega Tyranitar", items: ["Stone Gem"], types: ["Rock", "Dark"], location: "Rocks (Not Shiny)" },
    { name: "Shiny Gigalith", items: ["Stone Gem"], types: ["Rock"], location: "Rocks (Shiny)" },
    { name: "Shiny Nidoking", items: ["Stone Gem"], types: ["Poison", "Ground"], location: "Rocks (Shiny)" },
    { name: "Shiny Coalossal", items: ["Stone Gem"], types: ["Rock", "Fire"], location: "Rocks (Shiny)" },
    { name: "Shiny Nidoqueen", items: ["Stone Gem"], types: ["Poison", "Ground"], location: "Rocks (Shiny)" },
    { name: "Shiny Hisuian Arcanine", items: ["Stone Gem"], types: ["Fire", "Rock"], location: "Rocks (Shiny)" },
    { name: "Shiny Krookodile", items: ["Stone Gem"], types: ["Ground", "Dark"], location: "Rocks (Shiny)" },
    { name: "Shiny Crustle", items: ["Stone Gem"], types: ["Bug", "Rock"], location: "Rocks (Shiny)" },
    { name: "Shiny Flygon", items: ["Stone Gem"], types: ["Dragon", "Ground"], location: "Rocks (Shiny)" },
    { name: "Shiny Excadrill", items: ["Stone Gem"], types: ["Ground", "Steel"], location: "Rocks (Shiny)" },
    { name: "Shiny Gliscor", items: ["Stone Gem"], types: ["Ground", "Flying"], location: "Rocks (Shiny)" },
    
    // Rock Type Pokemon (Medium Stone Gem)
    { name: "Geodude (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Rock Type Only)" },
    { name: "Graveler (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Rock Type Only)" },
    { name: "Golem (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Rock Type Only)" },
    { name: "Onix (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Rock Type Only)" },
    { name: "Sudowoodo (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock"], location: "Rocks (Rock Type Only)" },
    { name: "Rhyperior (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Rock Type Only)" },
    { name: "Tyranitar (Rock Type)", items: ["Medium Stone Gem"], types: ["Rock", "Dark"], location: "Rocks (Rock Type Only)" },
    
    // Ground Type Pokemon (Small Stone Gem)
    { name: "Cubone (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Diglett (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Dugtrio (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Marowak (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Rhyhorn (Ground Type)", items: ["Small Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Rhydon (Ground Type)", items: ["Small Stone Gem"], types: ["Rock", "Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Phanpy (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Donphan (Ground Type)", items: ["Small Stone Gem"], types: ["Ground"], location: "Rocks (Ground Type Only)" },
    { name: "Gligar (Ground Type)", items: ["Small Stone Gem"], types: ["Ground", "Flying"], location: "Rocks (Ground Type Only)" },
    { name: "Gliscor (Ground Type)", items: ["Small Stone Gem"], types: ["Ground", "Flying"], location: "Rocks (Ground Type Only)" }
];

// Item/crystal descriptions for reference
const itemDescriptions = {
    "Gold Crystal": { effect: "Permite encontrar Pokémon más fuertes en lugar de sus pre-evoluciones", compatible: "Compatible con Copper Crystal, Steel Tail y Stone Gem", image: "/Pickaxe/GoldCrystal.png" },
    "Copper Crystal": { effect: "Aumenta la posibilidad de encontrar Pokémon en un 30%", compatible: "Compatible con Gold Crystal, Steel Tail y Stone Gem", image: "/Pickaxe/CopperCrystal.png" },
    "Steel Tail": { effect: "Da una pequeña posibilidad de encontrar 1 Pokémon adicional y una muy pequeña posibilidad de encontrar 2 adicionales", compatible: "Compatible con Gold Crystal, Copper Crystal y Stone Gem", image: "/Pickaxe/SteelTail.png" },
    "Stone Gem": { effect: "Permite encontrar Pokémon shiny", compatible: "Compatible con Gold Crystal, Copper Crystal y Steel Tail", image: "/Pickaxe/StoneGem.png" },
    "Medium Stone Gem": { effect: "El usuario puede invocar solo Pokémon de tipo roca. No se puede combinar con Small Stone Gem.", compatible: "No compatible con Small Stone Gem", image: "/Pickaxe/MediumStoneGem.png" },
    "Small Stone Gem": { effect: "El usuario puede invocar solo Pokémon de tipo tierra. No se puede combinar con Medium Stone Gem.", compatible: "No compatible con Medium Stone Gem", image: "/Pickaxe/SmallStoneGem.png" },
    "None (Base)": { effect: "Sin items específicos - encuentra cualquier Pokémon de tipo Roca/Tierra disponible en las rocas.", compatible: "Compatible con cualquier item", image: "" }
};

// Initialize the search functionality
function initLeadPickaxeSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    leadPickaxePokemon.sort((a, b) => a.name.localeCompare(b.name));
    
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
        const matches = leadPickaxePokemon.filter(p => 
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
        const pokemon = leadPickaxePokemon.find(p => p.name === pokemonName);
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
document.addEventListener('DOMContentLoaded', initLeadPickaxeSearch);
