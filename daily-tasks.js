document.addEventListener("DOMContentLoaded", function () {
  const pokemonTasks = [
    { name: "Alomomola", task: "Task recomendada mediante la pesca" },
    { name: "Araquanid", task: "Task recomendada mediante la pesca" },
    { name: "Ampharos", task: "Task en Malie" },
    { name: "Arcanine", task: "Task cianwood a la izquierda" },
    { name: "Blastoise", task: "Task en la zona Water de Elemental" },
    { name: "Empoleon", task: "Task recomendada mediante la pesca" },
    { name: "Gastrodon", task: "Task recomendada mediante la pesca" },
    { name: "Gigalith", task: "Task en Hau'Oli, la zona Rock 170" },
    { name: "Golem", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en la zona de inquisition quest" },
    { name: "Golisopod", task: "Task recomendada mediante la pesca" },
    { name: "Greninja", task: "Task recomendada mediante la pesca" },
    { name: "Gyarados", task: "Task recomendada mediante la pesca" },
    { name: "Jellicent", task: "Task recomendada mediante la pesca" },
    { name: "Magmar", task: "Task en Golden Rod" },
    { name: "Meganium", task: "Task en Shamouti (Isla al oeste / parte nor-oeste de esa isla)" },
    { name: "Nidoking", task: "Task en Mandarin, primer isla al nor-este" },
    { name: "Nidoqueen", task: "Task en Mandarin, primer isla al nor-este" },
    { name: "Onix", task: "Task en Pewter cave tercer piso (saliendo de la ciudad por la izquierda y luego al sur) o en trovitopolis" },
    { name: "Primape", task: "Task mandarin o suroeste de goldenrod o en pelea de dewford o ascorbia sur" },
    { name: "Primarina", task: "Task recomendada mediante la pesca" },
    { name: "Rhydon", task: "Task en Pewter cave (saliendo de la ciudad por la izquierda y luego al sur) o en Lavender arriba del Centro Pokémon" },
    { name: "Spiritomb", task: "Task en Hau'Oli, la zona Dark 150 del Cementerio" },
    { name: "Toxapex", task: "Task recomendada mediante la pesca" },
    { name: "Venusaur", task: "Task en elemental grass" },
  ];
 
  const taskListContainer = document.getElementById("pokemon-task-list");

  pokemonTasks.forEach((pokemon) => {
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

        // Set the name color to blue if the task recommends fishing
        if (pokemon.task.includes("pesca")) {
          name.style.color = "blue";
        }
        name.textContent = pokemon.name;

        const task = document.createElement("p");
        task.textContent = pokemon.task;

        pokemonDiv.appendChild(img);
        pokemonDiv.appendChild(name);
        pokemonDiv.appendChild(task);
        taskListContainer.appendChild(pokemonDiv);
      })
      .catch((error) => console.error("Error fetching data from PokeAPI:", error));
  });
});
