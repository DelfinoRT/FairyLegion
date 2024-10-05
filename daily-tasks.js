document.addEventListener("DOMContentLoaded", function () {
  const pokemonTasks = [
    { name: "Alakazam", task: "Task en Elemental o en las pirámides subterráneas del Este > de Fuchsia", map: "respawn-alakazam.png"},
    { name: "Alomomola", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Araquanid", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Ampharos", task: "Task en Malie", map: "xxx.png" },
    { name: "Arcanine", task: "Task cianwood a la izquierda", map: "xxx.png" },
    { name: "Blastoise", task: "Task en la zona Water de Elemental", map: "respawn-elemental-water.png" },
    { name: "Conkeldurr", task: "Task en Malie, en el respawn de Pokemon tipo lucha de la montaña ubicada al Oeste < ", map: "xxx.png" },
    { name: "Drifblim", task: "Task en Malie, en la torre Fantasma ubicada al sur-oeste", map: "xxx.png" },
    { name: "Empoleon", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Gardevoir", task: "Task en Azalea, en la pirámide de la isla ubicada al sur-este", map: "respawn-piramides-azalea.png" },
    { name: "Gengar", task: "Task en Gengar Mansion ubicada al Sur-Este de Fuchsia o en torre fantasma de Malie", map: "respawn-gengar-mansion.png" },
    { name: "Gastrodon", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Gigalith", task: "Task en Hau'Oli, la zona Rock 170", map: "xxx.png" },
    { name: "Gloom", task: "Task al Este > de Violet", map: "xxx.png" },
    { name: "Golem", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en la zona de inquisition quest", map: "respawn-pewter-cave.png" },
    { name: "Golisopod", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Greninja", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Gyarados", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Hypno", task: "Task en Elemental", map: "respawn-elemental-psy.png" },
    { name: "Jellicent", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Ludicolo", task: "Esta task se puede usando Master Rod/Ultra Rod con Hoen Bait o en respawns de Malie o Lilycove", map: "respawn-ludicolo-01.png" },
    { name: "Magmar", task: "Task en Golden Rod", map: "xxx.png" },
    { name: "Marowak", task: "Task en Elemental ground (Ver el mapa de Elemental en la siguiente sección)", map: "" },
    { name: "Meganium", task: "Task en Shamouti (Isla al oeste / parte nor-oeste de esa isla) o en Mandarin", map: "xxx.png" },
    { name: "Nidoking", task: "Task en Mandarin, primer isla al nor-este. Se llega usando Fly.", map: "respawn-nidokingnidoqueen.jpg" },
    { name: "Nidoqueen", task: "Task en Mandarin, primer isla al nor-este. Se llega usando Fly", map: "respawn-nidokingnidoqueen.jpg" },
    { name: "Onix", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en Trovitopolis o en Pacifidlog", map: "respawn-onix-01.png" },
    { name: "Primeape", task: "Task mandarin o suroeste de goldenrod o en pelea de dewford o ascorbia sur", map: "spawn-primeape.png" },
    { name: "Primarina", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Rhydon", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en Lavender arriba del Centro Pokémon", map: "xxx.png" },
    { name: "Skarmory", task: "Task en Violet, al sur de la montaña.", map: "xxx.png" },
    { name: "Seviper", task: "Task en Petalburg", map: "xxx.png" },
    { name: "Spiritomb", task: "Task en Hau'Oli, la zona Dark 150 del Cementerio", map: "xxx.png" },
    { name: "Toxapex", task: "Task recomendada mediante la pesca", map: "xxx.png" },
    { name: "Venusaur", task: "Task en elemental grass", map: "xx.png" },
    { name: "Vileplume", task: "Task en elemental grass o en Palace", map: "xx.png" }
  ];

    const taskListContainer = document.getElementById("pokemon-task-list");
    const pokemonSearchInput = document.getElementById("pokemon-search");
    const clearSearchBtn = document.getElementById("clear-search-btn");

    // Function to render filtered results based on search input
    function renderFilteredResults(query) {
      // Clear previous results
      taskListContainer.innerHTML = '';

      const filteredPokemon = pokemonTasks.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));

      if (filteredPokemon.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");

        // Create a span element to wrap the query term with bold styling
        const boldQuery = document.createElement("strong");
        boldQuery.textContent = query;

        // Set the error message with the bolded query term
        errorDiv.innerHTML = `No se encontró ningún Pokémon cuyo nombre incluya `;
        errorDiv.appendChild(boldQuery);
        errorDiv.innerHTML += `. Intenta con otro nombre.`;

        taskListContainer.appendChild(errorDiv);
      } else {
        filteredPokemon.forEach((pokemon, index) => {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`)
            .then((response) => response.json())
            .then((data) => {
              const pokemonDiv = document.createElement("div");
              pokemonDiv.classList.add("pokemon-task");

              const img = document.createElement("img");
              img.src = data.sprites.front_default;
              img.alt = pokemon.name;
              img.classList.add("pokemon-img");

              const name = document.createElement("h3");
              if (pokemon.task.includes("pesca")) {
                name.style.color = "cornflowerblue";
              }
              name.textContent = pokemon.name;

              const task = document.createElement("p");
              task.textContent = pokemon.task;

              pokemonDiv.appendChild(img);
              pokemonDiv.appendChild(name);
              pokemonDiv.appendChild(task);

              // Only add the map container if the task does not involve fishing
              if (!pokemon.task.includes("pesca")) {
                const mapContainer = document.createElement("div");
                mapContainer.classList.add("map-container");

                const mapButton = document.createElement("button");
                mapButton.textContent = "Mostrar Mapa";
                mapButton.classList.add("show-map-btn");
                mapButton.dataset.index = index;

                const mapImage = document.createElement("img");
                mapImage.src = `/spawn-maps/${pokemon.map}`;
                mapImage.classList.add("map-image");
                mapImage.id = `map-${index}`;
                mapImage.style.display = "none"; // Ensure the image is hidden initially

                mapButton.addEventListener("click", function () {
                  const mapImg = document.getElementById(`map-${this.dataset.index}`);
                  const pokemonLine = this.closest('.pokemon-task');
                  if (mapImg.style.display === "none" || !mapImg.style.display) {
                    mapImg.style.display = "block";
                    this.textContent = "Ocultar Mapa";
                    pokemonLine.classList.add("lightpurple");
                  } else {
                    mapImg.style.display = "none";
                    this.textContent = "Mostrar Mapa";
                    pokemonLine.classList.remove("lightpurple");
                  }
                });

                mapContainer.appendChild(mapButton);
                mapContainer.appendChild(mapImage);

                pokemonDiv.appendChild(mapContainer);
              }

              taskListContainer.appendChild(pokemonDiv);
            })
            .catch((error) => console.error("Error fetching data from PokeAPI:", error));
        });
      }
    }

    // Event listener for input changes in the search box
    pokemonSearchInput.addEventListener("input", function () {
      const query = this.value.trim(); // Trimmed value of the input
      if (query.length > 0) {
        renderFilteredResults(query);
        clearSearchBtn.style.display = "inline-block"; // Show clear button
      } else {
        taskListContainer.innerHTML = ''; // Clear previous results
        pokemonTasks.forEach((pokemon, index) => renderPokemonTask(pokemon, index)); // Render all Pokémon tasks again
        clearSearchBtn.style.display = "none"; // Hide clear button
      }
    });

    // Event listener for the clear search button
    clearSearchBtn.addEventListener("click", function () {
      pokemonSearchInput.value = ''; // Clear the search input field
      taskListContainer.innerHTML = ''; // Clear previous results
      pokemonTasks.forEach((pokemon, index) => renderPokemonTask(pokemon, index)); // Render all Pokémon tasks again
      clearSearchBtn.style.display = "none"; // Hide clear button again
    });

    // Initial rendering of all Pokémon tasks
    pokemonTasks.forEach((pokemon, index) => renderPokemonTask(pokemon, index));

    // Function to render each Pokemon task
    function renderPokemonTask(pokemon, index) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          const pokemonDiv = document.createElement("div");
          pokemonDiv.classList.add("pokemon-task");

          const img = document.createElement("img");
          img.src = data.sprites.front_default;
          img.alt = pokemon.name;
          img.classList.add("pokemon-img");

          const name = document.createElement("h3");
          if (pokemon.task.includes("pesca")) {
            name.style.color = "cornflowerblue";
          }
          name.textContent = pokemon.name;

          const task = document.createElement("p");
          task.textContent = pokemon.task;

          pokemonDiv.appendChild(img);
          pokemonDiv.appendChild(name);
          pokemonDiv.appendChild(task);

          // Only add the map container if the task does not involve fishing
          if (!pokemon.task.includes("pesca")) {
            const mapContainer = document.createElement("div");
            mapContainer.classList.add("map-container");

            const mapButton = document.createElement("button");
            mapButton.textContent = "Mostrar Mapa";
            mapButton.classList.add("show-map-btn");
            mapButton.dataset.index = index;

            const mapImage = document.createElement("img");
            mapImage.src = `/spawn-maps/${pokemon.map}`;
            mapImage.classList.add("map-image");
            mapImage.id = `map-${index}`;
            mapImage.style.display = "none"; // Ensure the image is hidden initially

            mapButton.addEventListener("click", function () {
              const mapImg = document.getElementById(`map-${this.dataset.index}`);
              const pokemonLine = this.closest('.pokemon-task');
              if (mapImg.style.display === "none" || !mapImg.style.display) {
                mapImg.style.display = "block";
                this.textContent = "Ocultar Mapa";
                pokemonLine.classList.add("lightpurple");
              } else {
                mapImg.style.display = "none";
                this.textContent = "Mostrar Mapa";
                pokemonLine.classList.remove("lightpurple");
              }
            });

            mapContainer.appendChild(mapButton);
            mapContainer.appendChild(mapImage);

            pokemonDiv.appendChild(mapContainer);
          }

          taskListContainer.appendChild(pokemonDiv);
        })
        .catch((error) => console.error("Error fetching data from PokeAPI:", error));
    }
  });