// Datos de ejemplo para la tabla de Pokémon
const pokemons = [
    {
        nombre: "Mime Jr",
        nivel: 9,
        habilidad: "Soundproof",
        pokeball: "Prism Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Hisuian Zorua",
        nivel: 17,
        habilidad: "Scrappy",
        pokeball: "Prism Ball",
        sexo: "F",
        donador: "Mickell"
    },
    {
        nombre: "Pawniard",
        nivel: 14,
        habilidad: "Inner Focus",
        pokeball: "Moon Ball",
        sexo: "F",
        donador: "Mickell"
    },
    {
        nombre: "Vanilluxe",
        nivel: 82,
        habilidad: "Weak Armor",
        pokeball: "Crystal Ball",
        sexo: "F",
        donador: "Mickell"
    },
    {
        nombre: "Quaxwell",
        nivel: 51,
        habilidad: "Moxie",
        pokeball: "Dive Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Mime Jr",
        nivel: 8,
        habilidad: "Filter",
        pokeball: "Dream Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Lopunny",
        nivel: 88,
        habilidad: "Scrappy",
        pokeball: "Safari Ball",
        sexo: "F",
        donador: "Mickell"
    },
    {
        nombre: "Greninja",
        nivel: 86,
        habilidad: "Torrent",
        pokeball: "Dive Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Gengar",
        nivel: 70,
        habilidad: "Levitate",
        pokeball: "Moon Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Froslass",
        nivel: 50,
        habilidad: "Snow Cloak",
        pokeball: "Rocket Ball",
        sexo: "F",
        donador: "Mickell"
    },
    {
        nombre: "Tentacruel",
        nivel: 40,
        habilidad: "Rain Dish",
        pokeball: "Dive Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Gyarados",
        nivel: 64,
        habilidad: "Moxie",
        pokeball: "Dive Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Blastoise",
        nivel: 81,
        habilidad: "Rain Dish",
        pokeball: "Dive Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Finizen",
        nivel: 10,
        habilidad: "Reckless",
        pokeball: "Sunrise Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Kingler",
        nivel: 110,
        habilidad: "Shell Armor",
        pokeball: "Crystal Ball",
        sexo: "M",
        donador: "Mickell"
    },
    {
        nombre: "Cubchoo",
        nivel: 13,
        habilidad: "Rattled",
        pokeball: "Sunrise Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Mime Jr",
        nivel: 40,
        habilidad: "Soundproof",
        pokeball: "Dream Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Cubchoo",
        nivel: 12,
        habilidad: "Snow Cloak",
        pokeball: "Sunrise Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Cubchoo",
        nivel: 18,
        habilidad: "Rattled",
        pokeball: "Sunrise Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Ralts",
        nivel: 20,
        habilidad: "Trace",
        pokeball: "Sunrise Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Geodude",
        nivel: 11,
        habilidad: "?",
        pokeball: "Crystal Ball",
        sexo: "?",
        donador: "Silvarion"
    },
    {
        nombre: "Tinkatink",
        nivel: 15,
        habilidad: "Mold Breaker",
        pokeball: "Dream Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Swirlix",
        nivel: 15,
        habilidad: "?",
        pokeball: "Dream Ball",
        sexo: "?",
        donador: "Silvarion"
    },
    {
        nombre: "Drizzile",
        nivel: 40,
        habilidad: "Torrent",
        pokeball: "Dive Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Grapploct",
        nivel: 60,
        habilidad: "Technician",
        pokeball: "Cherish Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Krokorok",
        nivel: 51,
        habilidad: "Moxie",
        pokeball: "Phantom Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Bastiodon",
        nivel: 84,
        habilidad: "Soundproof",
        pokeball: "Ancient Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Machop",
        nivel: 10,
        habilidad: "No Guard",
        pokeball: "Prism Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Machop",
        nivel: 15,
        habilidad: "No Guard",
        pokeball: "Sunrise Ball",
        sexo: "M",
        donador: "Silvarion"
    },
    {
        nombre: "Mr Mime",
        nivel: 60,
        habilidad: "Technician",
        pokeball: "Dream Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Aromatisse",
        nivel: 71,
        habilidad: "Aroma Veil",
        pokeball: "Dream Ball",
        sexo: "F",
        donador: "Silvarion"
    },
    {
        nombre: "Magikarp",
        nivel: 104,
        habilidad: "Rattled",
        pokeball: "Ancient Ball",
        sexo: "F",
        donador: "Killerintek"
    },
    {
        nombre: "Magikarp",
        nivel: 100,
        habilidad: "Swift Swim",
        pokeball: "Crystal Ball",
        sexo: "F",
        donador: "Killerintek"
    },
    {
        nombre: "Salandit",
        nivel: 100,
        habilidad: "Oblivious",
        pokeball: "Prism Ball",
        sexo: "F",
        donador: "Killerintek"
    },
    {
        nombre: "Brionne",
        nivel: 92,
        habilidad: "Torrent",
        pokeball: "Sunrise Ball",
        sexo: "M",
        donador: "Killerintek"
    },
    {
        nombre: "Monferno",
        nivel: 97,
        habilidad: "Blaze",
        pokeball: "Heavy Ball",
        sexo: "M",
        donador: "Killerintek"
    },
    {
        nombre: "Prinplup",
        nivel: 88,
        habilidad: "Torrent",
        pokeball: "Moss Ball",
        sexo: "M",
        donador: "Killerintek"
    }
/*
moss ball.
Prinplup [88][M]
Ability: Torrent
*/
]
const ranking = [
    { puesto: 1, jugador: "Mickell", puntos: 15 },
    { puesto: 2, jugador: "Misty", puntos: 110 },
    { puesto: 3, jugador: "Brock", puntos: 90 }
    // ...más datos
];

const historial = [
    { mes: "Noviembre 2025", pokemons: 12, reclamados: 10 },
    { mes: "Octubre 2025", pokemons: 9, reclamados: 8 }
    // ...más datos
];


function renderTablaPokemons() {
    const tbody = document.querySelector('#tabla-pokemon tbody');
    tbody.innerHTML = '';
    pokemons.forEach(p => {
        const tr = document.createElement('tr');
        // Normalize pokeball name to match file naming
        let ballFile = p.pokeball.replace(/ /g, '').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ñ', 'n');
        // Try .gif first, then .png fallback
        let imgPathGif = `ColeccionSilvarion/${ballFile.charAt(0).toLowerCase() + ballFile.slice(1)}.gif`;
        let imgPathPng = `ColeccionSilvarion/${ballFile.charAt(0).toLowerCase() + ballFile.slice(1)}.png`;
        let imgTag = `<img src="${imgPathGif}" alt="${p.pokeball}" style="height:28px;vertical-align:middle;" onerror=\"this.onerror=null;this.src='${imgPathPng}'\">`;
        tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.nivel}</td>
            <td>${p.habilidad}</td>
            <td>${imgTag}</td>
            <td>${p.sexo || '-'}</td>
            <td>${p.donador || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}


// Puedes cambiar estas variables para mostrar la próxima fecha y hora del bazar
const proximaFechaBazarDia = "25 de enero de 2026";
const proximaFechaBazarHora = "18:00 hrs";

document.addEventListener('DOMContentLoaded', () => {
    renderTablaPokemons();
    renderRanking();
    renderHistorial();
    // Siguiente Bazar section
    const diaSpan = document.getElementById('bazar-dia');
    const horaSpan = document.getElementById('bazar-hora');
    if (diaSpan) diaSpan.textContent = proximaFechaBazarDia;
    if (horaSpan) horaSpan.textContent = proximaFechaBazarHora;
});

function renderRanking() {
    const div = document.getElementById('tabla-ranking');
    div.innerHTML = '<table><thead><tr><th>Puesto</th><th>Jugador</th><th>Puntos</th></tr></thead><tbody>' +
        ranking.map(r => `<tr><td>${r.puesto}</td><td>${r.jugador}</td><td>${r.puntos}</td></tr>`).join('') +
        '</tbody></table>';
}

function renderHistorial() {
    const div = document.getElementById('historial-bazares');
    div.innerHTML = '<ul>' +
        historial.map(h => `<li>${h.mes}: ${h.pokemons} Pokémon, ${h.reclamados} reclamados</li>`).join('') +
        '</ul>';
}
