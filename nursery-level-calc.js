// nursery-level-calc.js
// JS for Level-to-Date calculator in tipstricks.html

// Path to CSV file (relative to HTML)
const CSV_PATH = 'Nursery_ExpGain - Sheet1.csv';

let expTable = [];

// Parse CSV data into expTable
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const header = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        expTable.push({
            from: parseInt(row[0]),
            to: parseInt(row[1]),
            exp: parseInt(row[2]),
            days: parseInt(row[3]),
            hours: parseInt(row[4]),
            minutes: parseInt(row[5]),
            seconds: parseInt(row[6])
        });
    }
}

// Fetch CSV file and parse
function loadCSV(callback) {
    fetch(CSV_PATH)
        .then(res => res.text())
        .then(text => {
            parseCSV(text);
            if (callback) callback();
        });
}

// Calculate total time from selected level to 100
function getTimeTo100(fromLevel) {
    let total = {days:0, hours:0, minutes:0, seconds:0};
    for (let i = fromLevel; i < 100; i++) {
        const row = expTable.find(r => r.from === i);
        if (row) {
            total.days += row.days;
            total.hours += row.hours;
            total.minutes += row.minutes;
            total.seconds += row.seconds;
        }
    }
    // Normalize
    total.minutes += Math.floor(total.seconds / 60);
    total.seconds = total.seconds % 60;
    total.hours += Math.floor(total.minutes / 60);
    total.minutes = total.minutes % 60;
    total.days += Math.floor(total.hours / 24);
    total.hours = total.hours % 24;
    return total;
}

// Format time object
function formatTime(t) {
    let parts = [];
    if (t.days > 0) parts.push(`${t.days} día${t.days === 1 ? '' : 's'}`);
    if (t.hours > 0) parts.push(`${t.hours} hora${t.hours === 1 ? '' : 's'}`);
    if (t.minutes > 0) parts.push(`${t.minutes} minuto${t.minutes === 1 ? '' : 's'}`);
    if (t.seconds > 0) parts.push(`${t.seconds} segundo${t.seconds === 1 ? '' : 's'}`);
    return parts.join(', ');
}

// Calculate date when level 100 is reached
function getDateAfter(timeObj) {
    const now = new Date();
    let target = new Date(now.getTime());
    target.setSeconds(target.getSeconds() + timeObj.seconds);
    target.setMinutes(target.getMinutes() + timeObj.minutes);
    target.setHours(target.getHours() + timeObj.hours);
    target.setDate(target.getDate() + timeObj.days);
    // Spanish months
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const dia = target.getDate();
    const mes = meses[target.getMonth()];
    const anio = target.getFullYear();
    return `${dia} de ${mes}, ${anio}`;
}

// Populate dropdown
function populateDropdown() {
    const sel = document.getElementById('level-select');
    for (let i = 1; i <= 99; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.text = `Nivel ${i}`;
        sel.appendChild(opt);
    }
}

// Handle selection
function onLevelSelect() {
    const sel = document.getElementById('level-select');
    const res = document.getElementById('level-result');
    const lvl = parseInt(sel.value);
    if (isNaN(lvl) || lvl < 1 || lvl >= 100) {
        res.textContent = '';
        return;
    }
    const t = getTimeTo100(lvl);
    const date = getDateAfter(t);
    res.innerHTML = `El Pokémon necesita ${formatTime(t)} para llegar a nivel 100.<br>Si permanece en la guardería, alcanzará el nivel 100 el <b style="color:#a259e6;">${date}</b>.`;
}

// Init
window.addEventListener('DOMContentLoaded', function() {
    loadCSV(() => {
        populateDropdown();
        document.getElementById('level-select').addEventListener('change', onLevelSelect);
    });
});
