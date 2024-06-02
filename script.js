document.querySelector('.menu-btn').addEventListener('click', function() {
    const nav = document.querySelector('.nav ul');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
});

window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav ul');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});

window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 100) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function createStar() {
    const star = document.createElement('div');
    star.textContent = '✦';
    star.classList.add('star');
    document.body.appendChild(star);

    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function sprinkleFairyDust() {
    const numberOfStars = 3;
    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
}

setInterval(sprinkleFairyDust, 500);

function createStary() {
    const star = document.createElement('div');
    star.textContent = '✦';
    star.classList.add('stary');
    document.body.appendChild(star);

    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function sprinkleFairyDusty() {
    const numberOfStars = 2;
    for (let i = 0; i < numberOfStars; i++) {
        createStary();
    }
}

setInterval(sprinkleFairyDusty, 500);

// Data for fishing information
const fishingData = {
    "Old Rod": {
        "Misty Bait": ["Shellder", "Poliwag", "Goldeen", "Krabby", "Magikarp", "Horsea"],
        "Johto Bait": ["Remoraid", "Wooper", "Chinchou"],
        "Hoen Bait": ["Spheal", "Clamperl", "Barboach", "Surskit"],
        "Kannovalola Bait": ["Mareanie", "Finneon", "Mantyke"]
    },
    "Great Rod": {
        "Misty Bait": ["Tentacool", "Staryu", "Seel", "Squirtle", "Poliwhirl", "Psyduck", "Slowpoke"],
        "Johto Bait": ["Corsola", "Marill", "Qwilfish", "Totodile"],
        "Hoen Bait": ["Wailmer", "Corphish", "Mudkip", "Carvanha", "Lotad"],
        "Kannovalola Bait": ["Popplio", "Dewpider", "Piplup", "Froakie"]
    },
    "Super Rod": {
        "Misty Bait": ["Seaking", "Starmie", "Seadra", "Kingler", "Wartortle", "Slowbro"],
        "Johto Bait": ["Croconaw", "Quagsire", "Azumarill", "Lanturn", "Octillery"],
        "Hoen Bait": ["Lombre", "Marshtomp", "Whiscash", "Sealeo", "Sharpedo", "Luvdisc"],
        "Kannovalola Bait": ["Brionne", "Prinplup", "Wimpod", "Wishiwashi", "Lumineon", "Bruxish", "Frogadier", "Pyukumuku", "Tynamo"]
    },
    "Ultra Rod": {
        "Misty Bait": ["Tentacruel", "Poliwrath", "Gyarados", "Golduck", "Cloyster", "Dewgong", "Big Magikarp"],
        "Johto Bait": ["Feraligatr", "Politoed", "Slowking", "Mantine", "Kingdra"],
        "Hoen Bait": ["Ludicolo", "Walrein", "Gorebyss", "Huntail", "Relicanth", "Crawdaunt"],
        "Kannovalola Bait": ["Primarina", "Toxapex", "Araquanid", "Empoleon", "Greninja", "Gastrodon", "Alomomola", "Jellicent", "Eelektrik", "Galarian Slowpoke"]
    },
    "Master Rod": {
        "Misty Bait": ["Poliwrath", "Tantacruel", "Gyarados", "Vaporeon", "Cloyster", "Dewgong", "Golduck", "Big Magikarp", "Big Tentacruel"],
        "Johto Bait": ["Feraligatr", "Politoed", "Slowking", "Mantine", "Kingdra"],
        "Hoen Bait": ["Ludicolo", "Walrein", "Gorebyss", "Huntail", "Relicanth", "Crawdaunt"],
        "Kannovalola Bait": ["Primarina", "Toxapex", "Araquanid", "Empoleon", "Greninja", "Gastrodon", "Alomomola", "Jellicent", "Eelektrik", "Galarian Slowpoke"],
        "Big Shrimp Bait": ["Shiny Araquanid", "Shiny Politoed", "Shiny Big Magikarp"],
        "Misty Bait and Meowth Bait": ["Mega Slowbro", "Mega Gyarados", "Blastoise", "Lapras", "Red Gyarados"],
        "Johto Bait and Meowth Bait": ["Shiny Corsola", "Shiny Kingdra", "Shiny Quagsire", "Shiny Qwilfish"],
        "Hoen Bait and Meowth Bait": ["Mega Swampert", "Shiny Sharpedo", "Shiny Ludicolo", "Wailord", "Swampert", "Feebas", "Milotic"],
        "Kannovalola Bait and Meowth Bait": ["Shiny Primarina", "Shiny Eelektros", "Shiny Bruxish", "Wash Rotom", "Buizel", "Floatzel", "Eelektros"],
        "Big Shrimp Bait and Meowth Bait": ["Shiny Primarina", "Shiny Eelektros", "Shiny Bruxish", "Wash Rotom", "Buizel", "Floatzel", "Eelektros"]
    }
};

const pokemonImages = {
    "-": "",
    "Alomomola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/594.png",
    "Araquanid": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/752.png",
    "Azumarill": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/184.png",
    "Barboach": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/339.png",
    "Big Magikarp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png", 
    "Blastoise": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    "Brionne": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/729.png",
    "Bruxish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/779.png",
    "Buizel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png",
    "Carvanha": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/318.png",
    "Chinchou": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/170.png",
    "Clamperl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/366.png",
    "Cloyster": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png",
    "Corsola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/222.png",
    "Corphish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/341.png",
    "Crawdaunt": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/342.png",
    "Croconaw": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png",
    "Dewgong": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
    "Dewpider": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/751.png",
    "Eelektrik": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/603.png",
    "Eelektros": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/604.png",
    "Empoleon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/395.png",
    "Feebas": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/349.png",
    "Feraligatr": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png",
    "Finneon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/456.png",
    "Floatzel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/419.png",
    "Frogadier": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/657.png",
    "Froakie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/656.png",
    "Galarian Slowpoke": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79-galar.png",
    "Gastrodon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/423.png",
    "Goldeen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png",
    "Golduck": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",
    "Gorebyss": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/368.png",
    "Greninja": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png",
    "Gyarados": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    "Horsea": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png",
    "Huntail": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/367.png",
    "Jellicent": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/593.png",
    "Kingdra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png",
    "Kingler": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png",
    "Krabby": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",
    "Lapras": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
    "Lanturn": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/171.png",
    "Lombre": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/271.png",
    "Lotad": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/270.png",
    "Ludicolo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/272.png",
    "Lumineon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/457.png",
    "Luvdisc": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png",
    "Magikarp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png",
    "Mantine": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/226.png",
    "Mantyke": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/458.png",
    "Marill": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/183.png",
    "Marshtomp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/259.png",
    "Mega Gyarados": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130-mega.png",
    "Mega Slowbro": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80-mega.png",
    "Mega Swampert": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260-mega.png",
    "Milotic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png",
    "Mudkip": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png",
    "Octillery": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/224.png",
    "Piplup": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png",
    "Politoed": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/186.png",
    "Poliwag": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
    "Poliwhirl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
    "Poliwrath": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png",
    "Popplio": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/728.png",
    "Primarina": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/730.png",
    "Prinplup": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png",
    "Psyduck": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
    "Pyukumuku": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/771.png",
    "Quagsire": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/195.png",
    "Qwilfish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/211.png",
    "Red Gyarados": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    "Relicanth": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/369.png",
    "Remoraid": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/223.png",
    "Seadra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png",
    "Seaking": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png",
    "Sealeo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/364.png",
    "Seel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png",
    "Sharpedo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/319.png",
    "Shellder": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png",
    "Shiny Araquanid": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/752.png",
    "Shiny Big Magikarp": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/129.png",
    "Shiny Bruxish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/779.png",
    "Shiny Corsola": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/222.png",
    "Shiny Eelektros": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/604.png",
    "Shiny Kingdra": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/230.png",
    "Shiny Ludicolo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/272.png",
    "Shiny Politoed": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/186.png",
    "Shiny Primarina": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/730.png",
    "Shiny Quagsire": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/195.png",
    "Shiny Qwilfish": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/211.png",
    "Shiny Sharpedo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/319.png",
    "Slowbro": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png",
    "Slowking": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/199.png",
    "Slowpoke": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",
    "Spheal": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/363.png",
    "Squirtle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "Starmie": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png",
    "Staryu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png",
    "Surskit": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/283.png",
    "Swampert": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png",
    "Tentacool": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png",
    "Tentacruel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",
    "Totodile": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",
    "Toxapex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/748.png",
    "Tynamo": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/602.png",
    "Wailmer": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/320.png",
    "Wailord": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png",
    "Walrein": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/365.png",
    "Wartortle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    "Wash Rotom": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/479-wash.png",
    "Whiscash": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png",
    "Wimpod": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/767.png",
    "Wishiwashi": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/746.png",
    "Wooper": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/194.png"
};


// Populate the dropdown with Pokemon options
const pokemonSelect = document.getElementById('pokemon-select');
Object.keys(pokemonImages).forEach(pokemon => {
    const option = document.createElement('option');
    option.value = pokemon;
    option.innerText = pokemon;
    pokemonSelect.appendChild(option);
});

// Event listener for the dropdown
pokemonSelect.addEventListener('change', function () {
    const selectedPokemon = this.value;
    const pokemonInfo = document.getElementById('pokemon-info');

    let rodInfo = '';
    for (let rod in fishingData) {
        for (let bait in fishingData[rod]) {
            if (fishingData[rod][bait].includes(selectedPokemon)) {
                rodInfo += `<p>${rod} ${bait !== 'noBait' ? 'con ' + bait : 'without bait'}</p>`;
            }
        }
    }

    pokemonInfo.innerHTML = `<img src="${pokemonImages[selectedPokemon]}" alt="${selectedPokemon}"><p>${rodInfo}</p>`;
});
