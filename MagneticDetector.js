// MagneticDetector.js - Pokemon Search and Item Combination Finder

// Pokemon data with their required item combinations
const magneticDetectorPokemon = [
    // Base Pokemon (No bait required)
    { name: "Pichu", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Pikachu", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Voltorb", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Electrode", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Mareep", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Flaaffy", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Elekid", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects (Low Probability)" },
    { name: "Electrike", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Manectric", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Plusle", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Minun", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Blitzle", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Yamper", items: ["None (Base)"], types: ["Electric"], location: "Magnetic Objects" },
    { name: "Magnemite", items: ["None (Base)"], types: ["Electric", "Steel"], location: "Magnetic Objects" },
    { name: "Magneton", items: ["None (Base)"], types: ["Electric", "Steel"], location: "Magnetic Objects" },
    { name: "Helioptile", items: ["None (Base)"], types: ["Electric", "Normal"], location: "Magnetic Objects (Very Low Probability)" },
    { name: "Cufant", items: ["None (Base)"], types: ["Steel"], location: "Magnetic Objects" },
    { name: "Beldum", items: ["None (Base)"], types: ["Steel", "Psychic"], location: "Magnetic Objects" },
    { name: "Metang", items: ["None (Base)"], types: ["Steel", "Psychic"], location: "Magnetic Objects" },
    { name: "Honedge", items: ["None (Base)"], types: ["Ghost", "Steel"], location: "Magnetic Objects" },
    { name: "Doublade", items: ["None (Base)"], types: ["Ghost", "Steel"], location: "Magnetic Objects" },
    { name: "Ferroseed", items: ["None (Base)"], types: ["Grass", "Steel"], location: "Magnetic Objects" },
    { name: "Pawniard", items: ["None (Base)"], types: ["Dark", "Steel"], location: "Magnetic Objects" },
    { name: "Tinkatink", items: ["None (Base)"], types: ["Fairy", "Steel"], location: "Magnetic Objects" },
    { name: "Tinkatuff", items: ["None (Base)"], types: ["Fairy", "Steel"], location: "Magnetic Objects" },
    
    // Strong/Evolved Pokemon (Steelix Amulet)
    { name: "Raichu", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Electabuzz", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Ampharos", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Pachirisu", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Zebstrika", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Electivire", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong - Low Probability)" },
    { name: "Boltund", items: ["Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Strong)" },
    { name: "Alolan Raichu", items: ["Steelix Amulet"], types: ["Electric", "Psychic"], location: "Magnetic Objects (Strong)" },
    { name: "Magnezone", items: ["Steelix Amulet"], types: ["Electric", "Steel"], location: "Magnetic Objects (Strong - Low Probability)" },
    { name: "Emolga", items: ["Steelix Amulet"], types: ["Electric", "Flying"], location: "Magnetic Objects (Strong)" },
    { name: "Dedenne", items: ["Steelix Amulet"], types: ["Electric", "Fairy"], location: "Magnetic Objects (Strong)" },
    { name: "Togedemaru", items: ["Steelix Amulet"], types: ["Electric", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Heliolisk", items: ["Steelix Amulet"], types: ["Electric", "Normal"], location: "Magnetic Objects (Strong - Low Probability)" },
    { name: "Copperajah", items: ["Steelix Amulet"], types: ["Steel"], location: "Magnetic Objects (Strong - Low Probability)" },
    { name: "Skarmory", items: ["Steelix Amulet"], types: ["Steel", "Flying"], location: "Magnetic Objects (Strong - Very Low Probability)" },
    { name: "Mawile", items: ["Steelix Amulet"], types: ["Steel", "Fairy"], location: "Magnetic Objects (Strong)" },
    { name: "Metagross", items: ["Steelix Amulet"], types: ["Steel", "Psychic"], location: "Magnetic Objects (Strong)" },
    { name: "Aegislash", items: ["Steelix Amulet"], types: ["Ghost", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Hisuian Sliggoo", items: ["Steelix Amulet"], types: ["Dragon", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Hisuian Goodra", items: ["Steelix Amulet"], types: ["Dragon", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Lucario", items: ["Steelix Amulet"], types: ["Fighting", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Ferrothorn", items: ["Steelix Amulet"], types: ["Grass", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Bisharp", items: ["Steelix Amulet"], types: ["Dark", "Steel"], location: "Magnetic Objects (Strong)" },
    { name: "Tinkaton", items: ["Steelix Amulet"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Strong)" },
    
    // Shiny Pokemon (Mega Steelix Amulet)
    { name: "Shiny Pachirisu", items: ["Mega Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Ampharos", items: ["Mega Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Yamper", items: ["Mega Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Shiny - Lower Probability)" },
    { name: "Shiny Boltund", items: ["Mega Steelix Amulet"], types: ["Electric"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Dedenne", items: ["Mega Steelix Amulet"], types: ["Electric", "Fairy"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Helioptile", items: ["Mega Steelix Amulet"], types: ["Electric", "Normal"], location: "Magnetic Objects (Shiny - Lower Probability)" },
    { name: "Shiny Heliolisk", items: ["Mega Steelix Amulet"], types: ["Electric", "Normal"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Cufant", items: ["Mega Steelix Amulet"], types: ["Steel"], location: "Magnetic Objects (Shiny - Lower Probability)" },
    { name: "Shiny Copperajah", items: ["Mega Steelix Amulet"], types: ["Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Mawile", items: ["Mega Steelix Amulet"], types: ["Steel", "Fairy"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Metagross", items: ["Mega Steelix Amulet"], types: ["Steel", "Psychic"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Aegislash", items: ["Mega Steelix Amulet"], types: ["Ghost", "Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Hisuian Sliggoo", items: ["Mega Steelix Amulet"], types: ["Dragon", "Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Hisuian Goodra", items: ["Mega Steelix Amulet"], types: ["Dragon", "Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Lucario", items: ["Mega Steelix Amulet"], types: ["Fighting", "Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Bisharp", items: ["Mega Steelix Amulet"], types: ["Dark", "Steel"], location: "Magnetic Objects (Shiny)" },
    { name: "Shiny Tinkatink", items: ["Mega Steelix Amulet"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Shiny - Lower Probability)" },
    { name: "Shiny Tinkatuff", items: ["Mega Steelix Amulet"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Shiny - Lower Probability)" },
    { name: "Shiny Tinkaton", items: ["Mega Steelix Amulet"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Shiny)" },
    
    // Steel Type Pokemon (Medium Electrified Gem)
    { name: "Magnemite (Steel Type)", items: ["Medium Electrified Gem"], types: ["Electric", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Magneton (Steel Type)", items: ["Medium Electrified Gem"], types: ["Electric", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Beldum (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel", "Psychic"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Metang (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel", "Psychic"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Metagross (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel", "Psychic"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Honedge (Steel Type)", items: ["Medium Electrified Gem"], types: ["Ghost", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Doublade (Steel Type)", items: ["Medium Electrified Gem"], types: ["Ghost", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Aegislash (Steel Type)", items: ["Medium Electrified Gem"], types: ["Ghost", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Ferroseed (Steel Type)", items: ["Medium Electrified Gem"], types: ["Grass", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Ferrothorn (Steel Type)", items: ["Medium Electrified Gem"], types: ["Grass", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Pawniard (Steel Type)", items: ["Medium Electrified Gem"], types: ["Dark", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Bisharp (Steel Type)", items: ["Medium Electrified Gem"], types: ["Dark", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Cufant (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Copperajah (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Mawile (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel", "Fairy"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Skarmory (Steel Type)", items: ["Medium Electrified Gem"], types: ["Steel", "Flying"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Tinkatink (Steel Type)", items: ["Medium Electrified Gem"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Tinkatuff (Steel Type)", items: ["Medium Electrified Gem"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    { name: "Tinkaton (Steel Type)", items: ["Medium Electrified Gem"], types: ["Fairy", "Steel"], location: "Magnetic Objects (Steel Type Only)" },
    
    // Electric Type Pokemon (Small Electrified Gem)
    { name: "Pichu (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Pikachu (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Raichu (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Voltorb (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Electrode (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Mareep (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Flaaffy (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Ampharos (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Elekid (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Electabuzz (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Electrike (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Manectric (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Plusle (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Minun (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Blitzle (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Zebstrika (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Emolga (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric", "Flying"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Joltik (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric", "Bug"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Galvantula (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric", "Bug"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Yamper (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Boltund (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Togedemaru (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric", "Steel"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Dedenne (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric", "Fairy"], location: "Magnetic Objects (Electric Type Only)" },
    { name: "Pincurchin (Electric Type)", items: ["Small Electrified Gem"], types: ["Electric"], location: "Magnetic Objects (Electric Type Only)" }
];

// Item/amulet descriptions for reference
const itemDescriptions = {
    "Steelix Amulet": { effect: "Permite encontrar Pokémon más fuertes en lugar de sus pre-evoluciones", compatible: "Compatible con Powerful Magnet, Big Electrified Gem y Mega Steelix Amulet", image: "/MagneticDetector/SteelixAmulet.png" },
    "Powerful Magnet": { effect: "Aumenta la posibilidad de encontrar Pokémon en un 30%", compatible: "Compatible con Steelix Amulet, Big Electrified Gem y Mega Steelix Amulet", image: "/MagneticDetector/PowerfulMagnet.png" },
    "Big Electrified Gem": { effect: "Da una posibilidad de encontrar 1 Pokémon adicional y una muy baja posibilidad de encontrar 2 adicionales", compatible: "Compatible con Steelix Amulet, Powerful Magnet y Mega Steelix Amulet", image: "/MagneticDetector/BigElectrifiedGem.png" },
    "Medium Electrified Gem": { effect: "El usuario puede invocar solo Pokémon de tipo Acero. No se puede combinar con Small Electrified Gem.", compatible: "No compatible con Small Electrified Gem", image: "/MagneticDetector/MediumElectrifiedGem.png" },
    "Small Electrified Gem": { effect: "El usuario puede invocar solo Pokémon de tipo Eléctrico. No se puede combinar con Medium Electrified Gem.", compatible: "No compatible con Medium Electrified Gem", image: "/MagneticDetector/SmallElectrifiedGem.png" },
    "Mega Steelix Amulet": { effect: "El usuario tiene la posibilidad de encontrar Pokémon shiny", compatible: "Compatible con Steelix Amulet, Powerful Magnet y Big Electrified Gem", image: "/MagneticDetector/MegaSteelixAmulet.png" },
    "None (Base)": { effect: "Sin items específicos - encuentra cualquier Pokémon de tipo Eléctrico/Acero disponible.", compatible: "Compatible con cualquier item", image: "" }
};

// Initialize the search functionality
function initMagneticDetectorSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    magneticDetectorPokemon.sort((a, b) => a.name.localeCompare(b.name));
    
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
        const matches = magneticDetectorPokemon.filter(p => 
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
        const pokemon = magneticDetectorPokemon.find(p => p.name === pokemonName);
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
document.addEventListener('DOMContentLoaded', initMagneticDetectorSearch);
