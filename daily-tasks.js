document.addEventListener("DOMContentLoaded", function () {
  const pokemonTasks = [
    { name: "Alomomola", task: "Task recomendada mediante la pesca", map: "map001.png" },
    { name: "Araquanid", task: "Task recomendada mediante la pesca", map: "asd2d.png" },
    { name: "Ampharos", task: "Task en Malie", map: "pokemaons.png" },
    { name: "Arcanine", task: "Task cianwood a la izquierda", map: "locatmagi.png" },
    { name: "Blastoise", task: "Task en la zona Water de Elemental", map: "map001.png" },
    { name: "Empoleon", task: "Task recomendada mediante la pesca", map: "asd2d.png" },
    { name: "Gastrodon", task: "Task recomendada mediante la pesca", map: "pokemaons.png" },
    { name: "Gigalith", task: "Task en Hau'Oli, la zona Rock 170", map: "locatmagi.png" },
    { name: "Golem", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en la zona de inquisition quest", map: "map001.png" },
    { name: "Golisopod", task: "Task recomendada mediante la pesca", map: "asd2d.png" },
    { name: "Greninja", task: "Task recomendada mediante la pesca", map: "pokemaons.png" },
    { name: "Gyarados", task: "Task recomendada mediante la pesca", map: "locatmagi.png" },
    { name: "Jellicent", task: "Task recomendada mediante la pesca", map: "map001.png" },
    { name: "Magmar", task: "Task en Golden Rod", map: "asd2d.png" },
    { name: "Meganium", task: "Task en Shamouti (Isla al oeste / parte nor-oeste de esa isla)", map: "pokemaons.png" },
    { name: "Nidoking", task: "Task en Mandarin, primer isla al nor-este", map: "locatmagi.png" },
    { name: "Nidoqueen", task: "Task en Mandarin, primer isla al nor-este", map: "map001.png" },
    { name: "Onix", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en Trovitopolis", map: "asd2d.png" },
    { name: "Primape", task: "Task mandarin o suroeste de goldenrod o en pelea de dewford o ascorbia sur", map: "pokemaons.png" },
    { name: "Primarina", task: "Task recomendada mediante la pesca", map: "locatmagi.png" },
    { name: "Rhydon", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en Lavender arriba del Centro Pokémon", map: "map001.png" },
    { name: "Spiritomb", task: "Task en Hau'Oli, la zona Dark 150 del Cementerio", map: "asd2d.png" },
    { name: "Toxapex", task: "Task recomendada mediante la pesca", map: "pokemaons.png" },
    { name: "Venusaur", task: "Task en elemental grass", map: "locatmagi.png" },
  ];

     const taskListContainer = document.getElementById("pokemon-task-list");

      pokemonTasks.forEach((pokemon, index) => {
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
    });