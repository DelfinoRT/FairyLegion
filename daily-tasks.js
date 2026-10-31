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

  const list = document.getElementById('pokemon-task-list');
  const search = document.getElementById('pokemon-search');
  const clear = document.getElementById('clear-search-btn');
  if (!list || !search || !clear) return;

  const cards = pokemonTasks.map((pokemon, index) => {
    const card = document.createElement('div');
    card.className = 'pokemon-task';
    const img = document.createElement('img');
    img.src = `daily-task-sprites/${pokemon.name.toLowerCase()}.png`;
    img.alt = pokemon.name;
    img.className = 'pokemon-img';
    img.width = img.height = 96;
    img.loading = 'lazy';
    img.decoding = 'async';
    const name = document.createElement('h3');
    name.textContent = pokemon.name;
    if (pokemon.task.includes('pesca')) name.style.color = 'cornflowerblue';
    const task = document.createElement('p');
    task.textContent = pokemon.task;
    card.append(img, name, task);

    if (pokemon.map && !/^x+\.png$/.test(pokemon.map) && !pokemon.task.includes('pesca')) {
      const container = document.createElement('div');
      container.className = 'map-container';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'show-map-btn';
      button.textContent = 'Mostrar Mapa';
      button.setAttribute('aria-expanded', 'false');
      const map = document.createElement('img');
      map.className = 'map-image';
      map.id = `map-${index}`;
      map.alt = `Mapa de ${pokemon.name}`;
      map.style.display = 'none';
      map.decoding = 'async';
      button.setAttribute('aria-controls', map.id);
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        if (open && !map.getAttribute('src')) map.src = `/spawn-maps/${pokemon.map}`;
        map.style.display = open ? 'block' : 'none';
        button.textContent = open ? 'Ocultar Mapa' : 'Mostrar Mapa';
        button.setAttribute('aria-expanded', String(open));
        card.classList.toggle('lightpurple', open);
      });
      container.append(button, map);
      card.appendChild(container);
    }
    list.appendChild(card);
    return { card, name: pokemon.name.toLowerCase() };
  });
  const empty = document.createElement('div');
  empty.className = 'error-message';
  empty.hidden = true;
  empty.setAttribute('role', 'status');
  list.appendChild(empty);
  function filter() {
    const query = search.value.trim().toLowerCase();
    let matches = 0;
    cards.forEach(({ card, name }) => {
      const visible = name.includes(query);
      card.hidden = !visible;
      // Existing card CSS sets display:flex; explicitly hide filtered cards.
      card.style.display = visible ? '' : 'none';
      if (visible) matches++;
    });
    empty.hidden = matches > 0;
    empty.textContent = matches ? '' : `No se encontró ningún Pokémon cuyo nombre incluya ${search.value.trim()}. Intenta con otro nombre.`;
    clear.style.display = query ? 'inline-block' : 'none';
  }
  search.addEventListener('input', filter);
  clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  filter();
});
