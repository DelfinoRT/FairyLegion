const achievements = [
  "<b>Achievement #30</b>: Pescar 1000 pokemon",
  "<b>Achievement #105</b>: Capturar 500 Magikarp",
  "<b>Achievement #134</b>: Pescar 300 Goldeen",
  "<b>Achievement #135</b>: Pescar 1 Shellder mientras se tiene a Slowpoke activo",
  "<b>Achievement #211</b>: Pescar 1500 pokemon",
  "<b>Achievement #256</b>: Atrapar 35 pokemon tipo agua diferentes (Pescando se hace facil)",
  "<b>Achievement #267</b>: Atrapar a Shiny Corsola mientras se tiene a Toxapex activo",
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
  "<b>Achievement #19</b>: Requisitos...",
  "<b>Achievement #20</b>: Requisitos...",
  "<b>Achievement #21</b>: Requisitos...",
  "<b>Achievement #22</b>: Requisitos...",
  "<b>Achievement #23</b>: Requisitos...",
  "<b>Achievement #24</b>: Requisitos...",
  "<b>Achievement #25</b>: Requisitos...",
  "<b>Achievement #26</b>: Requisitos...",
  "<b>Achievement #27</b>: Requisitos..."
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