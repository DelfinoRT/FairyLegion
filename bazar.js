// Datos de ejemplo para la tabla de Pokémon
const pokemons = [
    {
        nombre: "Bulbasaur",
        nivel: 15,
        habilidad: "Clorofila",
        pokeball: "Pokéball",
        donador: "Ash",
        fecha: "2025-12-10"
    },
    {
        nombre: "Charmander",
        nivel: 20,
        habilidad: "Mar Llamas",
        pokeball: "Superball",
        donador: "Misty",
        fecha: "2025-12-12"
    },
    {
        nombre: "Squirtle",
        nivel: 18,
        habilidad: "Torrente",
        pokeball: "Ultraball",
        donador: "Brock",
        fecha: "2025-12-15"
    }
    // ...más datos reales desde backend o Google Sheets
];

const ranking = [
    { puesto: 1, jugador: "Ash", puntos: 120 },
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
        tr.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.nivel}</td>
            <td>${p.habilidad}</td>
            <td>${p.pokeball}</td>
            <td>${p.donador || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Puedes cambiar esta variable para mostrar la próxima fecha del bazar
const proximaFechaBazar = "25 de enero de 2026, 18:00 hrs";

document.addEventListener('DOMContentLoaded', () => {
    renderTablaPokemons();
    renderRanking();
    renderHistorial();
    const fechaSpan = document.getElementById('fecha-bazar');
    if (fechaSpan) fechaSpan.textContent = proximaFechaBazar;
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
