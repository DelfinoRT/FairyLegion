// GhostDetector.js - Pokemon Search and Item Combination Finder

// Pokemon data with their required item combinations
const ghostDetectorPokemon = [
    // Base Pokemon (No gems/boosters required)
    { name: "Misdreavus", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Shuppet", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Duskull", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Dusclops", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Yamask", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Sinistea", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Greavard", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Gimmighoul", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Gastly", items: ["None (Base)"], types: ["Ghost", "Poison"], location: "Ghost Detector locations" },
    { name: "Haunter", items: ["None (Base)"], types: ["Ghost", "Poison"], location: "Ghost Detector locations" },
    { name: "Drifloon", items: ["None (Base)"], types: ["Ghost", "Flying"], location: "Ghost Detector locations" },
    { name: "Litwick", items: ["None (Base)"], types: ["Ghost", "Fire"], location: "Ghost Detector locations" },
    { name: "Lampent", items: ["None (Base)"], types: ["Ghost", "Fire"], location: "Ghost Detector locations" },
    { name: "Phantump", items: ["None (Base)"], types: ["Ghost", "Grass"], location: "Ghost Detector locations" },
    { name: "Pumpkaboo", items: ["None (Base)"], types: ["Ghost", "Grass"], location: "Ghost Detector locations" },
    { name: "Hisuian Zorua", items: ["None (Base)"], types: ["Normal", "Ghost"], location: "Ghost Detector locations" },
    { name: "Frillish", items: ["None (Base)"], types: ["Ghost", "Water"], location: "Ghost Detector locations" },
    { name: "Honedge", items: ["None (Base)"], types: ["Ghost", "Steel"], location: "Ghost Detector locations" },
    { name: "Doublade", items: ["None (Base)"], types: ["Ghost", "Steel"], location: "Ghost Detector locations" },
    { name: "Dreepy", items: ["None (Base)"], types: ["Ghost", "Dragon"], location: "Ghost Detector locations" },
    { name: "Drakloak", items: ["None (Base)"], types: ["Ghost", "Dragon"], location: "Ghost Detector locations" },
    { name: "Galarian Corsola", items: ["None (Base)"], types: ["Ghost"], location: "Ghost Detector locations" },
    { name: "Galarian Yamask", items: ["None (Base)"], types: ["Ghost", "Steel"], location: "Ghost Detector locations" },
    
    // Strong/Evolved Pokemon (Ghost Pearl Bait)
    { name: "Mismagius", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Banette", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Dusknoir", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Cofagrigus", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Polteageist", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Cursola", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Houndstone", items: ["Ghost Pearl Bait"], types: ["Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Gholdengo", items: ["Ghost Pearl Bait"], types: ["Ghost", "Steel"], location: "Ghost Detector locations (Strong)" },
    { name: "Gengar", items: ["Ghost Pearl Bait"], types: ["Ghost", "Poison"], location: "Ghost Detector locations (Strong)" },
    { name: "Drifblim", items: ["Ghost Pearl Bait"], types: ["Ghost", "Flying"], location: "Ghost Detector locations (Strong)" },
    { name: "Spiritomb", items: ["Ghost Pearl Bait"], types: ["Ghost", "Ground"], location: "Ghost Detector locations (Strong)" },
    { name: "Chandelure", items: ["Ghost Pearl Bait"], types: ["Ghost", "Fire"], location: "Ghost Detector locations (Strong)" },
    { name: "Trevenant", items: ["Ghost Pearl Bait"], types: ["Ghost", "Grass"], location: "Ghost Detector locations (Strong)" },
    { name: "Gourgeist", items: ["Ghost Pearl Bait"], types: ["Ghost", "Grass"], location: "Ghost Detector locations (Strong)" },
    { name: "Mimikyu", items: ["Ghost Pearl Bait"], types: ["Ghost", "Fairy"], location: "Ghost Detector locations (Strong)" },
    { name: "Dhelmise", items: ["Ghost Pearl Bait"], types: ["Ghost", "Steel"], location: "Ghost Detector locations (Strong)" },
    { name: "Sableye", items: ["Ghost Pearl Bait"], types: ["Dark", "Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Hisuian Zoroark", items: ["Ghost Pearl Bait"], types: ["Normal", "Ghost"], location: "Ghost Detector locations (Strong)" },
    { name: "Jellicent", items: ["Ghost Pearl Bait"], types: ["Ghost", "Water"], location: "Ghost Detector locations (Strong)" },
    { name: "Aegislash", items: ["Ghost Pearl Bait"], types: ["Ghost", "Steel"], location: "Ghost Detector locations (Strong)" },
    { name: "Dragapult", items: ["Ghost Pearl Bait"], types: ["Ghost", "Dragon"], location: "Ghost Detector locations (Strong)" },
    { name: "Runerigus", items: ["Ghost Pearl Bait"], types: ["Ghost", "Ground"], location: "Ghost Detector locations (Strong)" },
    
    // Shiny Pokemon (Greater Spiritualist Gem)
    { name: "Shiny Mismagius", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Dusknoir", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Spectrier", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Spectrier", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Greavard", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Houndstone", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Gimmighoul", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Gholdengo", items: ["Greater Spiritualist Gem"], types: ["Ghost", "Steel"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Spiritomb", items: ["Greater Spiritualist Gem"], types: ["Ghost", "Ground"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Sableye", items: ["Greater Spiritualist Gem"], types: ["Dark", "Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Hisuian Zoroark", items: ["Greater Spiritualist Gem"], types: ["Normal", "Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Aegislash", items: ["Greater Spiritualist Gem"], types: ["Ghost", "Steel"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Mimikyu", items: ["Greater Spiritualist Gem"], types: ["Ghost", "Fairy"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Cofagrigus", items: ["Greater Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Shiny)" },
    { name: "Shiny Dragapult", items: ["Greater Spiritualist Gem"], types: ["Ghost", "Dragon"], location: "Ghost Detector locations (Shiny)" },
    
    // Regional Pokemon (Medium Spiritualist Gem - Kanto, Johto, Hoenn, Sinnoh)
    { name: "Gastly (Kanto)", items: ["Medium Spiritualist Gem"], types: ["Ghost", "Poison"], location: "Ghost Detector locations (Kanto Region)" },
    { name: "Haunter (Kanto)", items: ["Medium Spiritualist Gem"], types: ["Ghost", "Poison"], location: "Ghost Detector locations (Kanto Region)" },
    { name: "Misdreavus (Johto)", items: ["Medium Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Johto Region)" },
    { name: "Shuppet (Hoenn)", items: ["Medium Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Hoenn Region)" },
    { name: "Duskull (Sinnoh)", items: ["Medium Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Sinnoh Region)" },
    { name: "Drifloon (Sinnoh)", items: ["Medium Spiritualist Gem"], types: ["Ghost", "Flying"], location: "Ghost Detector locations (Sinnoh Region)" },
    
    // Regional Pokemon (Small Spiritualist Gem - Unova, Kalos, Alola, Galar)
    { name: "Yamask (Unova)", items: ["Small Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Unova Region)" },
    { name: "Litwick (Kalos)", items: ["Small Spiritualist Gem"], types: ["Ghost", "Fire"], location: "Ghost Detector locations (Kalos Region)" },
    { name: "Paldean Wooper (Alola)", items: ["Small Spiritualist Gem"], types: ["Poison", "Ground"], location: "Ghost Detector locations (Alola Region)" },
    { name: "Greavard (Galar)", items: ["Small Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Galar Region)" },
    { name: "Gimmighoul (Galar)", items: ["Small Spiritualist Gem"], types: ["Ghost"], location: "Ghost Detector locations (Galar Region)" }
];

// Item/bait descriptions for reference
const itemDescriptions = {
    "Ghost Pearl Bait": { effect: "Permite encontrar Pokémon más fuertes (evoluciones)", compatible: "Compatible con Cursed Horseshoe Bait e Hydreigon's Incense", image: "/GhostDetector/GhostPearlBait.png" },
    "Cursed Horseshoe Bait": { effect: "Aumenta la posibilidad de encontrar Pokémon de tipo Fantasma en un 30%", compatible: "Compatible con Ghost Pearl Bait e Hydreigon's Incense", image: "/GhostDetector/CursedHorseshoeBait.png" },
    "Hydreigon's Incense": { effect: "Da posibilidad de encontrar 1 o 2 Pokémon adicionales", compatible: "Compatible con Ghost Pearl Bait y Cursed Horseshoe Bait", image: "/GhostDetector/HydreigonIncense.png" },
    "Greater Spiritualist Gem": { effect: "Da posibilidad de encontrar Pokémon shiny", compatible: "No compatible con Medium ni Small Spiritualist Gem", image: "/GhostDetector/GreaterSpiritualistGem.png" },
    "Medium Spiritualist Gem": { effect: "Invoca solo Pokémon Fantasma de Kanto, Johto, Hoenn, Sinnoh. No se puede combinar con la Greater Spiritualist Gem.", compatible: "No compatible con Greater ni Small Spiritualist Gem", image: "/GhostDetector/MediumSpiritualistGem.png" },
    "Small Spiritualist Gem": { effect: "Invoca solo Pokémon Fantasma de Unova, Kalos, Alola, Galar. No se puede combinar con la Greater Spiritualist Gem.", compatible: "No compatible con Greater ni Medium Spiritualist Gem", image: "/GhostDetector/SmallSpiritualistGem.png" },
    "None (Base)": { effect: "Sin items específicos - encuentra cualquier Pokémon Fantasma disponible en la zona.", compatible: "Compatible con cualquier item", image: "" }
};

// Initialize the search functionality
function initGhostDetectorSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    ghostDetectorPokemon.sort((a, b) => a.name.localeCompare(b.name));
    
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
        const matches = ghostDetectorPokemon.filter(p => 
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
        const pokemon = ghostDetectorPokemon.find(p => p.name === pokemonName);
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
document.addEventListener('DOMContentLoaded', initGhostDetectorSearch);
