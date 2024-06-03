const achievements = [
  "<b>Achievement #30</b>: Pescar 1000 pokemon",
  "<b>Achievement #105</b>: Capturar 500 Magikarp",
  "<b>Achievement #134</b>: Pescar 300 Goldeen",
  "<b>Achievement #135</b>: Pescar 1 Shellder mientras se tiene a Slowpoke activo",
  "<b>Achievement #211</b>: Pescar 1500 pokemon",
  "<b>Achievement #256</b>: Atrapar 35 pokemon tipo agua diferentes (Pescando se hace facil)",
  "<b>Achievement #267</b>: Atrapar a Shiny Corsola teniendo a Toxapex activo",
  "<b>Achievement #389</b>: Conseguir Great Rod",
  "<b>Achievement #390</b>: Conseguir Great Rod",
  "<b>Achievement #391</b>: Conseguir Super Rod",
  "<b>Achievement #392</b>: Conseguir Ultra Rod",
  "<b>Achievement #393</b>: Usar la Super Rod 150 veces",
  "<b>Achievement #394</b>: Pescar 50 Eelektrik",
  "<b>Achievement #395</b>: Pescar 50 Eelektros",
  "<b>Achievement #396</b>: Pescar 300 Wishiwashi",
  "<b>Achievement #397</b>: Pescar 100 Lotad",
  "<b>Achievement #398</b>: Pescar 100 Tynamo",
  "<b>Achievement #436</b>: Completar TM task TM018 Rain Dance (Se puede hacer más rápido pescando Ludicolo)",
  "<b>Achievement #443</b>: Pescar durante 240 horas",
  "<b>Achievement #446</b>: Capturar 5 Wimpod",
  "<b>Achievement #448</b>: Derrotar 500 Crawdaunt",
  "<b>Achievement #449</b>: Derrotar 500 Wailord",
  "<b>Achievement #450</b>: Derrotar 750 Corsola usando a Toxapex",
  "<b>Achievement #451</b>: Derrotar a Dewpider usando a Surskit",
  "<b>Achievement #464</b>: Derrotar 20 Shiny Sharpedo",
  "<b>Achievement #468</b>: Derrotar 250 Shiny Greninja",
  "<b>Achievement #470</b>: Derrotar 100 Shiny Primarina",
  "<b>Achievement #579</b>: Derrotar 500 Froakie",
  "<b>Achievement #580</b>: Derrotar 1200 Frogadier",
  "<b>Achievement #581</b>: Derrotar 2000 Greninja",
  "<b>Achievement #601</b>: Derrotar 1000 Bruxish",
  "<b>Achievement #604</b>: Derrotar 750 Bruxish",
  "<b>Achievement #xxxxx</b>: Requisitos..."
];

const itemsPerPage = 20;
let currentPage = 1;
let filteredAchievements = [...achievements];

function displayAchievements() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAchievements = filteredAchievements.slice(startIndex, endIndex);

    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '<ul>' + paginatedAchievements.map(achievement => `<li>${achievement}</li>`).join('') + '</ul>';

    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = currentPage === Math.ceil(filteredAchievements.length / itemsPerPage);
}

function nextPage() {
    if (currentPage < Math.ceil(filteredAchievements.length / itemsPerPage)) {
        currentPage++;
        displayAchievements();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayAchievements();
    }
}

function searchAchievements() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredAchievements = achievements.filter(achievement => achievement.toLowerCase().includes(searchTerm));
    currentPage = 1;
    displayAchievements();
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    filteredAchievements = [...achievements];
    currentPage = 1;
    displayAchievements();
}

document.getElementById('search-input').addEventListener('input', searchAchievements);

document.addEventListener('DOMContentLoaded', displayAchievements);