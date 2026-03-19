// FieryFisherRod.js - Pokemon Search and Bait Combination Finder

// Pokemon data with their required bait combinations
const fieryFisherRodPokemon = [
    // Base Pokemon (No bait required)
    { name: "Charmander", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Cyndaquil", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Vulpix", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Slugma", baits: ["None (Base)"], types: ["Fire", "Rock"], location: "Lava zones" },
    { name: "Ponyta", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Houndour", baits: ["None (Base)"], types: ["Fire", "Dark"], location: "Lava zones" },
    { name: "Growlithe", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Torchic", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Numel", baits: ["None (Base)"], types: ["Fire", "Ground"], location: "Lava zones" },
    { name: "Chimchar", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Tepig", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Pansear", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Litwick", baits: ["None (Base)"], types: ["Fire", "Ghost"], location: "Lava zones" },
    { name: "Fennekin", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Litten", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    { name: "Salandit", baits: ["None (Base)"], types: ["Fire", "Poison"], location: "Lava zones" },
    { name: "Scorbunny", baits: ["None (Base)"], types: ["Fire"], location: "Lava zones" },
    
    // Shiny Pokemon (Magmar Bait)
    { name: "Shiny Ponyta", baits: ["Magmar Bait"], types: ["Fire"], location: "Lava zones (Shiny)" },
    { name: "Shiny Litwick", baits: ["Magmar Bait"], types: ["Fire", "Ghost"], location: "Lava zones (Shiny)" },
    { name: "Shiny Cyndaquil", baits: ["Magmar Bait"], types: ["Fire"], location: "Lava zones (Shiny)" },
    { name: "Shiny Fennekin", baits: ["Magmar Bait"], types: ["Fire"], location: "Lava zones (Shiny)" },
    { name: "Shiny Houndour", baits: ["Magmar Bait"], types: ["Fire", "Dark"], location: "Lava zones (Shiny)" },
    { name: "Shiny Litten", baits: ["Magmar Bait"], types: ["Fire"], location: "Lava zones (Shiny)" },
    
    // Strong/Evolved Pokemon (Houndoom Bait)
    { name: "Charizard", baits: ["Houndoom Bait"], types: ["Fire", "Flying"], location: "Lava zones (Strong)" },
    { name: "Magmortar", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Magmar", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Infernape", baits: ["Houndoom Bait"], types: ["Fire", "Fighting"], location: "Lava zones (Strong)" },
    { name: "Arcanine", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Heat Rotom", baits: ["Houndoom Bait"], types: ["Fire", "Electric"], location: "Lava zones (Strong)" },
    { name: "Typhlosion", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Darmanitan", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Darmanitan (Zen Mode)", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    { name: "Blaziken", baits: ["Houndoom Bait"], types: ["Fire", "Fighting"], location: "Lava zones (Strong)" },
    { name: "Emboar", baits: ["Houndoom Bait"], types: ["Fire", "Fighting"], location: "Lava zones (Strong)" },
    { name: "Pyroar", baits: ["Houndoom Bait"], types: ["Fire", "Normal"], location: "Lava zones (Strong)" },
    { name: "Chandelure", baits: ["Houndoom Bait"], types: ["Fire", "Ghost"], location: "Lava zones (Strong)" },
    { name: "Talonflame", baits: ["Houndoom Bait"], types: ["Fire", "Flying"], location: "Lava zones (Strong)" },
    { name: "Delphox", baits: ["Houndoom Bait"], types: ["Fire", "Psychic"], location: "Lava zones (Strong)" },
    { name: "Alolan Marowak", baits: ["Houndoom Bait"], types: ["Fire", "Ghost"], location: "Lava zones (Strong)" },
    { name: "Turtonator", baits: ["Houndoom Bait"], types: ["Fire", "Dragon"], location: "Lava zones (Strong)" },
    { name: "Oricorio (Baile)", baits: ["Houndoom Bait"], types: ["Fire", "Flying"], location: "Lava zones (Strong)" },
    { name: "Incineroar", baits: ["Houndoom Bait"], types: ["Fire", "Dark"], location: "Lava zones (Strong)" },
    { name: "Centiskorch", baits: ["Houndoom Bait"], types: ["Fire", "Bug"], location: "Lava zones (Strong)" },
    { name: "Cinderace", baits: ["Houndoom Bait"], types: ["Fire"], location: "Lava zones (Strong)" },
    
    // Shiny Strong Pokemon (Houndoom Bait + Magmar Bait)
    { name: "Shiny Typhlosion", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire"], location: "Lava zones (Shiny Strong)" },
    { name: "Shiny Talonflame", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire", "Flying"], location: "Lava zones (Shiny Strong)" },
    { name: "Shiny Chandelure", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire", "Ghost"], location: "Lava zones (Shiny Strong)" },
    { name: "Shiny Turtonator", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire", "Dragon"], location: "Lava zones (Shiny Strong)" },
    { name: "Shiny Delphox", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire", "Psychic"], location: "Lava zones (Shiny Strong)" },
    { name: "Shiny Incineroar", baits: ["Houndoom Bait", "Magmar Bait"], types: ["Fire", "Dark"], location: "Lava zones (Shiny Strong)" }
];

// Bait descriptions for reference
const baitDescriptions = {
    "Growlithe Bait": { effect: "Da una pequeña posibilidad de pescar hasta 2 Pokémon adicionales. Si se usa con Houndoom Bait, la probabilidad aumenta.", compatible: "Compatible con todos los cebos", image: "/FieryFisherRod/GrowlitheBait.png" },
    "Kiawe Bait": { effect: "Aumenta la probabilidad de pescar Pokémon en un 15%. Si se usa con Houndoom Bait, la probabilidad aumenta al 25%.", compatible: "Compatible con todos los cebos", image: "/FieryFisherRod/KiaweBait.png" },
    "Magmar Bait": { effect: "Da una pequeña posibilidad de pescar Pokémon Shiny.", compatible: "Compatible con todos los cebos", image: "/FieryFisherRod/MagmarBait.png" },
    "Houndoom Bait": { effect: "Mientras está equipado, solo permite pescar Pokémon fuertes/evolucionados. Tiene una duración de 120 horas.", compatible: "Compatible con Growlithe Bait, Kiawe Bait, Magmar Bait", image: "/FieryFisherRod/HoundoomBait.png" },
    "None (Base)": { effect: "Sin cebo específico - encuentra cualquier Pokémon de tipo fuego disponible en la zona.", compatible: "Compatible con cualquier cebo", image: "" }
};

// Initialize the search functionality
function initFieryFisherRodSearch() {
    const searchInput = document.getElementById('pokemonSearch');
    const suggestionsBox = document.getElementById('suggestions');
    const resultContainer = document.getElementById('resultContainer');
    
    if (!searchInput) return;
    
    // Sort pokemon alphabetically
    fieryFisherRodPokemon.sort((a, b) => a.name.localeCompare(b.name));
    
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
        const matches = fieryFisherRodPokemon.filter(p => 
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
        const pokemon = fieryFisherRodPokemon.find(p => p.name === pokemonName);
        if (!pokemon) return;
        
        // Update search input
        searchInput.value = pokemon.name;
        hideSuggestions();
        
        // Display result
        displayResult(pokemon);
    }
    
    function displayResult(pokemon) {
        if (!resultContainer) return;
        
        const baitsHtml = pokemon.baits.map(baitName => {
            const bait = baitDescriptions[baitName];
            if (!bait) return '';
            
            return `
                <div class="bait-result">
                    <div class="bait-header">
                        ${bait.image ? `<img src="${bait.image}" alt="${baitName}" class="bait-icon">` : ''}
                        <h3>${baitName}</h3>
                    </div>
                    <p class="bait-effect">${bait.effect}</p>
                    <p class="bait-compatible"><strong>Compatibilidad:</strong> ${bait.compatible}</p>
                </div>
            `;
        }).join('');
        
        const typesHtml = pokemon.types.join(', ');
        
        resultContainer.innerHTML = `
            <div class="pokemon-result">
                <h2>${pokemon.name}</h2>
                <p class="pokemon-types"><strong>Tipos:</strong> ${typesHtml}</p>
                <p class="pokemon-location"><strong>Ubicación:</strong> ${pokemon.location}</p>
                <div class="baits-required">
                    <h3>Cebos requeridos:</h3>
                    ${baitsHtml}
                </div>
            </div>
        `;
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initFieryFisherRodSearch);
