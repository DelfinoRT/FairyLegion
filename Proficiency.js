// Proficiency.js - Proficiency System Browser

const LANGUAGE_STORAGE_KEY = 'proficiency-language';
let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'es';

const CATEGORIES = {
    combat:     { label: { es: 'Combate Ofensivo', en: 'Offensive Combat' }, css: 'cat-combat' },
    defense:    { label: { es: 'Combate Defensivo', en: 'Defensive Combat' }, css: 'cat-defense' },
    movement:   { label: { es: 'Movimiento', en: 'Movement' }, css: 'cat-movement' },
    profession: { label: { es: 'Profesión', en: 'Profession' }, css: 'cat-profession' },
    charm:      { label: { es: 'Charms', en: 'Charms' }, css: 'cat-charm' },
    ability:    { label: { es: 'Habilidades', en: 'Abilities' }, css: 'cat-ability' },
    status:     { label: { es: 'Estados', en: 'Status' }, css: 'cat-status' },
    move:       { label: { es: 'Movimientos', en: 'Moves' }, css: 'cat-move' },
    type_boost: { label: { es: 'Boost de Tipo', en: 'Type Boost' }, css: 'cat-type-boost' },
    mega:       { label: { es: 'Mega Evolución', en: 'Mega Evolution' }, css: 'cat-mega' },
    utility:    { label: { es: 'Utilidad', en: 'Utility' }, css: 'cat-utility' },
    pvp:        { label: { es: 'PvP', en: 'PvP' }, css: 'cat-pvp' },
};

const STATIC_COPY = {
    es: {
        title: 'Fairy Legion - Sistema de Proficiencia',
        heroTitle: '⭐ Sistema de Proficiencia',
        heroSubtitle: 'Ruta de maestría personalizada para tus Pokémon — vinculada a tu personaje, no al Pokémon.',
        navExplorer: 'Ir al Explorador de Proficiencias',
        navPokemon: 'Ir al Buscador por Pokémon',
        languageToggle: 'English',
        mechanicsTitle: 'Mecánicas Fundamentales',
        mechanicsCards: [
            {
                title: 'Progreso por Cuenta',
                html: 'La proficiencia está ligada a <strong>tu personaje</strong>. Si alcanzas Nivel 9 con un Charizard, todos tus Charizard tendrán ese nivel. Si vendes uno, el comprador empieza de cero, pero tú mantendrás tu progreso.'
            },
            {
                title: 'Subida Simultánea',
                html: 'Al ganar EXP, esta se distribuye en <strong>todas las barras de nivel a la vez</strong>. Los primeros niveles se completarán mucho antes que los últimos.'
            },
            {
                title: 'Flexibilidad (Builds)',
                html: 'En cada nivel puedes elegir un bono entre 3–4 opciones. Puedes <strong>cambiar tu elección en cualquier momento</strong> dentro de zonas de protección (clic derecho para deseleccionar).'
            },
            {
                title: 'Elegibilidad',
                html: 'Por ahora, el sistema aplica a Pokémon de Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar y Paldea, además de formas regionales, Pokémon especiales y Pokémon clonados. Aplica para <strong>evoluciones finales</strong>; el nivel 9 está disponible para especies que puedan <strong>Mega Evolucionar o Gigantamax</strong>.'
            }
        ],
        referenceNote: 'Esta página es una referencia general. Las proficiencias se actualizan y reequilibran activamente, por lo que algunos datos pueden cambiar en futuras revisiones.',
        expTitle: 'Cómo Ganar EXP',
        defeatingTitle: 'Derrotando Pokémon',
        expCategory: 'Categoría de Pokémon',
        expValue: 'EXP Otorgada',
        expRows: [
            ['Easy', '50'],
            ['Normal', '75'],
            ['Medium', '90'],
            ['Rare', '110'],
            ['Very Rare / Cloned', '140'],
            ['Shiny', '220'],
            ['BOSS POKÉMON', '15,000']
        ],
        catalystsTitle: 'Catalizadores de Proficiencia (Ítems)',
        catalystsNote: 'Para usarlos: Ten activo el Pokémon al que quieres darle la experiencia, luego da clic en el ítem y confirma. También existe el Proficiency Experience Ticket, que activa un boost de ganancia de proficiencia (+100%) durante 3 horas y se puede comprar en la Premium Shop.',
        catalystsItem: 'Ítem',
        catalystsExp: 'EXP Otorgada',
        catalystRows: [
            ['Proficiency Catalyst', '30,000 EXP'],
            ['Greater Proficiency Catalyst', '120,000 EXP'],
            ['Supreme Proficiency Catalyst', '600,000 EXP']
        ],
        warningTitle: '⚠️ IMPORTANTE:',
        warningText: 'La EXP de los catalizadores <strong>NO se desborda (no hay overflow)</strong>. Si tu límite de nivel actual es menor a la EXP del ítem, el exceso se <strong>perderá</strong>. Desbloquea los niveles con dinero o diamantes <em>antes</em> de usar los catalizadores.',
        unlockTitle: 'Desbloqueo de Niveles y Costos',
        unlockNote: 'Aunque acumules EXP, debes desbloquear el acceso a los niveles superiores para activar sus bonos.',
        unlockLevel: 'Niveles',
        unlockExp: 'Requisito de EXP',
        unlockCost: 'Costo de Desbloqueo',
        unlockRows: [
            ['Lvl 1', '1,500', 'Gratis'],
            ['Lvl 2', '4,500', 'Gratis'],
            ['Lvl 3', '15,000', 'Gratis'],
            ['Lvl 4', '110,000', '5,000 Oro'],
            ['Lvl 5', '410,000', '5,000 Oro'],
            ['Lvl 6', '1,410,000', '1 Diamante'],
            ['Lvl 7', '4,410,000', '1 Diamante'],
            ['Lvl 8', '9,910,000', '1 Diamante'],
            ['Lvl 9 (Mega/G-Max Slot)', '10,910,000', 'Gratis']
        ],
        unlockWarningTitle: 'Nota: Proficiencia Nivel 9 - Mega & G-Max Slot:',
        unlockWarningItems: [
            '<strong>Disponibilidad:</strong> solo para Pokémon que puedan Mega Evolucionar o Gigantamax',
            '<strong>Requisito:</strong> requiere <strong>1,000,000 EXP</strong> para activarse y su desbloqueo es <strong>gratis</strong>',
            '<strong>Beneficio:</strong> desbloquea un <strong>tercer slot de held item</strong>',
            '<strong>Restricción:</strong> ese slot solo acepta <strong>Mega Stones</strong> o <strong>ítems G-Max</strong>'
        ],
        setupTitle: 'Cómo Configurar tus Bonos',
        setupSteps: [
            '<strong>Abrir Menú:</strong> Usa <kbd>Ctrl + Clic Izquierdo</kbd> sobre la Pokéball equipada, o la opción <em>"Set Proficiency"</em> en el menú contextual del Pokémon.',
            '<strong>Elegir Bono:</strong> Haz clic en el icono del bono que desees activar. Los niveles bloqueados aparecerán con el texto <em>"LOCKED"</em>.',
            '<strong>Ver Detalles:</strong> Pasa el ratón sobre el icono para ver qué hace cada bono.',
            '<strong>Cambiar Bono:</strong> En cualquier zona de protección puedes hacer <strong>clic derecho</strong> para deseleccionar y elegir otra opción.'
        ],
        tipsTitle: 'Consejos estratégicos',
        tips: [
            {
                title: 'Prioriza los Bosses',
                html: 'Matar un solo Boss otorga <strong>15,000 EXP</strong>, más que cientos de Pokémon comunes. Es la forma más eficiente de subir niveles altos.'
            },
            {
                title: 'No malgastes catalizadores',
                html: 'Revisa tu barra de EXP antes de usar un catalizador. Si estás cerca del límite de un nivel bloqueado, <strong>págalo primero</strong>, la EXP sobrante se pierde.'
            },
            {
                title: 'Adaptabilidad',
                html: 'Cambia tus bonos según la actividad. Si vas a pescar, activa bonos de pesca; en torneo, prioriza daño y resistencias.'
            },
            {
                title: 'Shinies y clones',
                html: 'El sistema incluye proficiency para Shinies y Clones. Derrotar Pokémon Shiny da <strong>220 EXP</strong>, más del doble que un Pokémon normal.'
            }
        ],
        explorerTitle: 'Explorador de Proficiencias',
        explorerNote: 'Busca por ID, descripción o Pokémon, filtra por categoría y ordena resultados.',
        profSearchPlaceholder: 'Buscar por proficiencia o nombre de Pokémon...',
        profSortAsc: 'Orden: ID (menor a mayor)',
        profSortDesc: 'Orden: ID (mayor a menor)',
        profSortPokemon: 'Orden: más Pokémon primero',
        clear: 'Limpiar',
        allCategories: 'Todas',
        profCount: (count) => `Mostrando ${count} proficiencia(s)`,
        profHeaderId: '#',
        profHeaderDescription: 'Descripción',
        profHeaderCategory: 'Categoría',
        profHeaderPokemon: 'Pokémon',
        pokemonExplorerTitle: 'Buscador por Pokémon',
        pokemonExplorerNote: 'Encuentra un Pokémon y revisa todas sus proficiencias disponibles en una sola vista.',
        pokemonSearchPlaceholder: 'Buscar Pokémon (ej. Charizard, Gengar, Salamence)...',
        pokemonSortAsc: 'Orden: Nombre (A-Z)',
        pokemonSortDesc: 'Orden: Nombre (Z-A)',
        pokemonSortCount: 'Orden: más proficiencias',
        pokemonHeaderName: 'Pokémon',
        pokemonHeaderTotal: 'Total',
        pokemonHeaderLevels: 'Proficiencias por nivel (L1-L9)',
        pokemonCount: (count) => `Mostrando ${count} Pokémon`,
        pokemonNoResults: 'No se encontraron Pokémon con ese criterio.',
        pokemonShowDetails: 'Ver niveles',
        pokemonHideDetails: 'Ocultar niveles',
        pokemonCompactLevels: 'Niveles',
        noOptions: 'Sin opciones',
        hide: 'Ocultar'
    },
    en: {
        title: 'Fairy Legion - Proficiency System',
        heroTitle: '⭐ Proficiency System',
        heroSubtitle: 'A custom mastery path for your Pokémon — tied to your character, not the Pokémon itself.',
        navExplorer: 'Go to Proficiency Explorer',
        navPokemon: 'Go to Pokémon Browser',
        languageToggle: 'Español',
        mechanicsTitle: 'Core Mechanics',
        mechanicsCards: [
            {
                title: 'Account-Based Progress',
                html: 'Proficiency is tied to <strong>your character</strong>. If you reach Level 9 with a Charizard, all your Charizard will have that level. If you sell one, the buyer starts from zero, but you keep your progress.'
            },
            {
                title: 'Simultaneous Progress',
                html: 'When you earn EXP, it is distributed across <strong>all level bars at once</strong>. The early levels will complete much sooner than the later ones.'
            },
            {
                title: 'Flexibility (Builds)',
                html: 'At each level you can choose one bonus from 3–4 options. You can <strong>change your choice at any time</strong> inside protection zones (right-click to deselect).'
            },
            {
                title: 'Eligibility',
                html: 'For now, the system applies to Pokémon from Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea, as well as regional forms, special Pokémon, and cloned Pokémon. It applies to <strong>final evolutions</strong>; Level 9 is available to species that can <strong>Mega Evolve or Gigantamax</strong>.'
            }
        ],
        referenceNote: 'This page is a general reference. Proficiencies are actively updated and reworked, so some data may change in future revisions.',
        expTitle: 'How to Gain EXP',
        defeatingTitle: 'Defeating Pokémon',
        expCategory: 'Pokémon Category',
        expValue: 'EXP Awarded',
        expRows: [
            ['Easy', '50'],
            ['Normal', '75'],
            ['Medium', '90'],
            ['Rare', '110'],
            ['Very Rare / Cloned', '140'],
            ['Shiny', '220'],
            ['BOSS POKÉMON', '15,000']
        ],
        catalystsTitle: 'Proficiency Catalysts (Items)',
        catalystsNote: 'To use them: Keep the Pokémon you want to level active, then click the item and confirm. There is also the Proficiency Experience Ticket, which activates a proficiency gain boost (+100%) for 3 hours and can be purchased from the Premium Shop.',
        catalystsItem: 'Item',
        catalystsExp: 'EXP Awarded',
        catalystRows: [
            ['Proficiency Catalyst', '30,000 EXP'],
            ['Greater Proficiency Catalyst', '120,000 EXP'],
            ['Supreme Proficiency Catalyst', '600,000 EXP']
        ],
        warningTitle: '⚠️ IMPORTANT:',
        warningText: 'Catalyst EXP <strong>does not overflow</strong>. If your current level cap is lower than the item EXP, the excess will be <strong>lost</strong>. Unlock the levels with money or diamonds <em>before</em> using catalysts.',
        unlockTitle: 'Level Unlocks and Costs',
        unlockNote: 'Even if you accumulate EXP, you must unlock higher levels to activate their bonuses.',
        unlockLevel: 'Levels',
        unlockExp: 'EXP Requirement',
        unlockCost: 'Unlock Cost',
        unlockRows: [
            ['Lvl 1', '1,500', 'Free'],
            ['Lvl 2', '4,500', 'Free'],
            ['Lvl 3', '15,000', 'Free'],
            ['Lvl 4', '110,000', '5,000 Gold'],
            ['Lvl 5', '410,000', '5,000 Gold'],
            ['Lvl 6', '1,410,000', '1 Diamond'],
            ['Lvl 7', '4,410,000', '1 Diamond'],
            ['Lvl 8', '9,910,000', '1 Diamond'],
            ['Lvl 9 (Mega/G-Max Slot)', '10,910,000', 'Free']
        ],
        unlockWarningTitle: 'Note: Level 9 Proficiency - Mega & G-Max Slot:',
        unlockWarningItems: [
            '<strong>Availability:</strong> only for Pokémon that can Mega Evolve or Gigantamax',
            '<strong>Requirement:</strong> needs <strong>1,000,000 EXP</strong> to activate and the unlock is <strong>free</strong>',
            '<strong>Benefit:</strong> unlocks a <strong>third held item slot</strong>',
            '<strong>Restriction:</strong> that slot only accepts <strong>Mega Stones</strong> or <strong>G-Max items</strong>'
        ],
        setupTitle: 'How to Configure Your Bonuses',
        setupSteps: [
            '<strong>Open Menu:</strong> Use <kbd>Ctrl + Left Click</kbd> on the equipped Poké Ball, or the <em>"Set Proficiency"</em> option in the Pokémon context menu.',
            '<strong>Choose Bonus:</strong> Click the bonus icon you want to activate. Locked levels will display the text <em>"LOCKED"</em>.',
            '<strong>View Details:</strong> Hover over an icon to see what each bonus does.',
            '<strong>Change Bonus:</strong> In any protection zone you can <strong>right-click</strong> to deselect and choose another option.'
        ],
        tipsTitle: 'Strategic Tips',
        tips: [
            {
                title: 'Prioritize Bosses',
                html: 'Defeating a single Boss grants <strong>15,000 EXP</strong>, more than hundreds of common Pokémon. It is the most efficient way to level up.'
            },
            {
                title: 'Don’t waste catalysts',
                html: 'Check your EXP bar before using a catalyst. If you are close to a locked level cap, <strong>unlock it first</strong>; leftover EXP is lost.'
            },
            {
                title: 'Adaptability',
                html: 'Swap your bonuses depending on the activity. If you are fishing, equip fishing bonuses; in tournaments, prioritize damage and resistances.'
            },
            {
                title: 'Shinies and clones',
                html: 'The system includes proficiency for Shinies and Clones. Defeating a Shiny Pokémon grants <strong>220 EXP</strong>, more than double a normal Pokémon.'
            }
        ],
        explorerTitle: 'Proficiency Explorer',
        explorerNote: 'Search by ID, description, or Pokémon, filter by category, and sort the results.',
        profSearchPlaceholder: 'Search by proficiency or Pokémon name...',
        profSortAsc: 'Sort: ID (low to high)',
        profSortDesc: 'Sort: ID (high to low)',
        profSortPokemon: 'Sort: most Pokémon first',
        clear: 'Clear',
        allCategories: 'All',
        profCount: (count) => `Showing ${count} proficiency(s)`,
        profHeaderId: '#',
        profHeaderDescription: 'Description',
        profHeaderCategory: 'Category',
        profHeaderPokemon: 'Pokémon',
        pokemonExplorerTitle: 'Pokémon Browser',
        pokemonExplorerNote: 'Find a Pokémon and review all of its available proficiencies in one view.',
        pokemonSearchPlaceholder: 'Search Pokémon (e.g. Charizard, Gengar, Salamence)...',
        pokemonSortAsc: 'Sort: Name (A-Z)',
        pokemonSortDesc: 'Sort: Name (Z-A)',
        pokemonSortCount: 'Sort: most proficiencies',
        pokemonHeaderName: 'Pokémon',
        pokemonHeaderTotal: 'Total',
        pokemonHeaderLevels: 'Proficiencies by level (L1-L9)',
        pokemonCount: (count) => `Showing ${count} Pokémon`,
        pokemonNoResults: 'No Pokémon matched that criteria.',
        pokemonShowDetails: 'View levels',
        pokemonHideDetails: 'Hide levels',
        pokemonCompactLevels: 'Levels',
        noOptions: 'No options',
        hide: 'Hide'
    }
};

const browserState = {
    proficiency: {
        searchQuery: '',
        sortMode: 'id-asc',
        activeCat: 'all'
    },
    pokemon: {
        searchQuery: '',
        sortMode: 'name-asc',
        expandedNames: new Set()
    }
};

function copyText(key) {
    return STATIC_COPY[currentLanguage][key];
}

function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function setHTML(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = value;
    }
}

function getCategoryLabel(catKey) {
    const category = CATEGORIES[catKey];
    if (!category) return catKey;
    return category.label[currentLanguage] || category.label.es || category.label.en || catKey;
}

function updateLanguageToggleButton() {
    const button = document.getElementById('languageToggle');
    if (!button) return;
    button.textContent = copyText('languageToggle');
    button.setAttribute('aria-label', copyText('languageToggle'));
}

function ensureLanguageToggleButton() {
    const quickNav = document.querySelector('.quick-nav');
    if (!quickNav || document.getElementById('languageToggle')) return;

    const button = document.createElement('button');
    button.id = 'languageToggle';
    button.type = 'button';
    button.className = 'quick-nav-btn';
    button.addEventListener('click', toggleLanguage);
    quickNav.appendChild(button);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    applyStaticTranslations();
    refreshBrowserViews();
}

function applyStaticTranslations() {
    const copy = STATIC_COPY[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.title = copy.title;

    const heroTitle = document.querySelector('.proficiency-hero h1');
    const heroSubtitle = document.querySelector('.proficiency-hero p');
    const quickNavButtons = document.querySelectorAll('.quick-nav-btn');

    if (heroTitle) heroTitle.textContent = copy.heroTitle;
    if (heroSubtitle) heroSubtitle.innerHTML = copy.heroSubtitle;
    if (quickNavButtons[0]) quickNavButtons[0].textContent = copy.navExplorer;
    if (quickNavButtons[1]) quickNavButtons[1].textContent = copy.navPokemon;

    updateLanguageToggleButton();

    const sectionTitles = document.querySelectorAll('main .section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = copy.mechanicsTitle;
    if (sectionTitles[1]) sectionTitles[1].textContent = copy.expTitle;
    if (sectionTitles[2]) sectionTitles[2].textContent = copy.unlockTitle;
    if (sectionTitles[3]) sectionTitles[3].textContent = copy.setupTitle;
    if (sectionTitles[4]) sectionTitles[4].textContent = copy.tipsTitle;

    const mechanicsCards = document.querySelectorAll('main > section .info-grid .info-card');
    copy.mechanicsCards.forEach((item, index) => {
        const card = mechanicsCards[index];
        if (!card) return;
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector('p');
        if (heading) heading.textContent = item.title;
        if (paragraph) paragraph.innerHTML = item.html;
    });

    const mechanicsSection = document.querySelector('main > section');
    if (mechanicsSection) {
        let referenceNote = mechanicsSection.querySelector('.proficiency-reference-note');
        if (!referenceNote) {
            referenceNote = document.createElement('div');
            referenceNote.className = 'warning-box proficiency-reference-note';
            mechanicsSection.appendChild(referenceNote);
        }
        referenceNote.innerHTML = `<strong>${currentLanguage === 'es' ? 'Nota de referencia:' : 'Reference note:'}</strong> ${copy.referenceNote}`;
    }

    const expSection = document.querySelector('#proficiency-explorer')?.previousElementSibling?.previousElementSibling;
    const expSections = document.querySelectorAll('main > section');
    const expSourceSection = expSections[1];
    if (expSourceSection) {
        const sectionHeading = expSourceSection.querySelector('h2');
        const subHeadings = expSourceSection.querySelectorAll('h3');
        const expTable = expSourceSection.querySelectorAll('.prof-table');
        const warningBox = expSourceSection.querySelector('.warning-box');
        const note = expSourceSection.querySelector('p');

        if (sectionHeading) sectionHeading.textContent = copy.expTitle;
        if (subHeadings[0]) subHeadings[0].textContent = copy.defeatingTitle;
        if (subHeadings[1]) subHeadings[1].textContent = copy.catalystsTitle;
        if (note) note.textContent = copy.catalystsNote;

        if (expTable[0]) {
            const headers = expTable[0].querySelectorAll('thead th');
            if (headers[0]) headers[0].textContent = copy.expCategory;
            if (headers[1]) headers[1].textContent = copy.expValue;
            expTable[0].querySelectorAll('tbody tr').forEach((row, index) => {
                const cells = row.querySelectorAll('td');
                const data = copy.expRows[index];
                if (!data) return;
                if (cells[0]) cells[0].textContent = data[0];
                if (cells[1]) cells[1].textContent = data[1];
                const isBoss = index === copy.expRows.length - 1;
                cells.forEach(cell => cell.className = isBoss ? 'highlight' : '');
            });
        }

        if (expTable[1]) {
            const headers = expTable[1].querySelectorAll('thead th');
            if (headers[0]) headers[0].textContent = copy.catalystsItem;
            if (headers[1]) headers[1].textContent = copy.catalystsExp;
            const body = expTable[1].querySelector('tbody');
            if (body) {
                body.innerHTML = copy.catalystRows.map(([item, reward]) => `<tr><td>${item}</td><td>${reward}</td></tr>`).join('');
            }
        }

        if (warningBox) {
            warningBox.innerHTML = `<strong>${copy.warningTitle}</strong> ${copy.warningText}`;
        }
    }

    const unlockSection = expSections[2];
    if (unlockSection) {
        const sectionHeading = unlockSection.querySelector('h2');
        const note = unlockSection.querySelector('p');
        const table = unlockSection.querySelector('.prof-table');
        const warningBox = unlockSection.querySelector('.warning-box');
        if (sectionHeading) sectionHeading.textContent = copy.unlockTitle;
        if (note) note.textContent = copy.unlockNote;
        if (table) {
            const headers = table.querySelectorAll('thead th');
            if (headers[0]) headers[0].textContent = copy.unlockLevel;
            if (headers[1]) headers[1].textContent = copy.unlockExp;
            if (headers[2]) headers[2].textContent = copy.unlockCost;
            table.querySelectorAll('tbody tr').forEach((row, index) => {
                const cells = row.querySelectorAll('td');
                const data = copy.unlockRows[index];
                if (!data) return;
                if (cells[0]) cells[0].textContent = data[0];
                if (cells[1]) cells[1].textContent = data[1];
                if (cells[2]) {
                    cells[2].textContent = data[2];
                    cells[2].className = index < 3 ? 'cost-free' : index < 5 ? 'cost-gold' : index < 8 ? 'cost-diamond' : 'cost-free';
                }
            });
        }
        if (warningBox) {
            warningBox.innerHTML = `<strong>${copy.unlockWarningTitle}</strong><ul style="margin:8px 0 0 18px; padding:0;">${copy.unlockWarningItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
    }

    const setupSection = expSections[3];
    if (setupSection) {
        const sectionHeading = setupSection.querySelector('h2');
        if (sectionHeading) sectionHeading.textContent = copy.setupTitle;
        setupSection.querySelectorAll('.steps-list li').forEach((item, index) => {
            if (copy.setupSteps[index]) item.innerHTML = copy.setupSteps[index];
        });
    }

    const tipsSection = expSections[4];
    if (tipsSection) {
        const sectionHeading = tipsSection.querySelector('h2');
        if (sectionHeading) sectionHeading.textContent = copy.tipsTitle;
        tipsSection.querySelectorAll('.tip-card').forEach((card, index) => {
            const data = copy.tips[index];
            if (!data) return;
            const heading = card.querySelector('h4');
            const paragraph = card.querySelector('p');
            if (heading) heading.textContent = data.title;
            if (paragraph) paragraph.innerHTML = data.html;
        });
    }

    const profExplorer = document.getElementById('proficiency-explorer');
    if (profExplorer) {
        const heading = profExplorer.querySelector('h2');
        const note = profExplorer.querySelector('.muted-note');
        const search = document.getElementById('profSearch');
        const sort = document.getElementById('profSort');
        const clear = document.getElementById('profClear');
        const headers = document.querySelectorAll('#profTable thead th');
        if (heading) heading.textContent = copy.explorerTitle;
        if (note) note.textContent = copy.explorerNote;
        if (search) search.placeholder = copy.profSearchPlaceholder;
        if (sort) {
            const options = sort.querySelectorAll('option');
            if (options[0]) options[0].textContent = copy.profSortAsc;
            if (options[1]) options[1].textContent = copy.profSortDesc;
            if (options[2]) options[2].textContent = copy.profSortPokemon;
        }
        if (clear) clear.textContent = copy.clear;
        if (headers[0]) headers[0].textContent = copy.profHeaderId;
        if (headers[1]) headers[1].textContent = copy.profHeaderDescription;
        if (headers[2]) headers[2].textContent = copy.profHeaderCategory;
        if (headers[3]) headers[3].textContent = copy.profHeaderPokemon;
    }

    const pokemonBrowser = document.getElementById('pokemon-search');
    if (pokemonBrowser) {
        const heading = pokemonBrowser.querySelector('h2');
        const note = pokemonBrowser.querySelector('.muted-note');
        const search = document.getElementById('pokemonSearch');
        const sort = document.getElementById('pokemonSort');
        const clear = document.getElementById('pokemonClear');
        const headers = document.querySelectorAll('#pokemonTable thead th');
        if (heading) heading.textContent = copy.pokemonExplorerTitle;
        if (note) note.textContent = copy.pokemonExplorerNote;
        if (search) search.placeholder = copy.pokemonSearchPlaceholder;
        if (sort) {
            const options = sort.querySelectorAll('option');
            if (options[0]) options[0].textContent = copy.pokemonSortAsc;
            if (options[1]) options[1].textContent = copy.pokemonSortDesc;
            if (options[2]) options[2].textContent = copy.pokemonSortCount;
        }
        if (clear) clear.textContent = copy.clear;
        if (headers[0]) headers[0].textContent = copy.pokemonHeaderName;
        if (headers[1]) headers[1].textContent = copy.pokemonHeaderTotal;
        if (headers[2]) headers[2].textContent = copy.pokemonHeaderLevels;
    }
}

function refreshBrowserViews() {
    buildCategoryFilters();
    const profFiltered = getFilteredProficiencies(browserState.proficiency.searchQuery, browserState.proficiency.activeCat);
    renderProficiencyTable(sortProficiencies(profFiltered, browserState.proficiency.sortMode), browserState.proficiency.searchQuery);
    const pokemonFiltered = getFilteredPokemonRows(browserState.pokemon.searchQuery);
    renderPokemonTable(sortPokemonRows(pokemonFiltered, browserState.pokemon.sortMode), browserState.pokemon.searchQuery);
}

// [ id, description, category ]
const proficiencies = [
    [1,   'Increases the chance to mine Diancie by 3%. // Aumenta la probabilidad de minar a Diancie un 3%.',                                                                                                                             'profession'],
    [2,   'Increases the chance to mine Diancie by 5%. // Aumenta la probabilidad de minar a Diancie un 5%.',                                                                                                                             'profession'],
    [3,   'Increases the chance to mine Diancie by 10%. // Aumenta la probabilidad de minar a Diancie un 10%.',                                                                                                                           'profession'],
    [4,   'Increases the chance to mine Carbink by 5%. // Aumenta la probabilidad de minar a Carbink un 5%.',                                                                                                                             'profession'],
    [5,   'Harvest cooldown reduced by 15s. // El cooldown de cosecha se reduce 15 segundos.',                                                                                                                                            'profession'],
    [6,   'Mining cooldown reduced by 15s. // El cooldown de minería se reduce 15 segundos.',                                                                                                                                             'profession'],
    [7,   'Reduces damage received by 5%. // Reduce el daño recibido un 5%.',                                                                                                                                                             'defense'],
    [8,   'Reduces damage received by 7%. // Reduce el daño recibido un 7%.',                                                                                                                                                             'defense'],
    [9,   'Reduces damage received by 10%. // Reduce el daño recibido un 10%.',                                                                                                                                                           'defense'],
    [10,  'Increases damage dealt to neutral elements by 5%. // Aumenta el daño infligido a elementos neutrales un 5%.',                                                                                                                  'combat'],
    [11,  'Increases damage dealt to neutral elements by 10%. // Aumenta el daño infligido a elementos neutrales un 10%.',                                                                                                                'combat'],
    [12,  'Increases flying speed by 30%. // Aumenta la velocidad de vuelo un 30%.',                                                                                                                                                      'movement'],
    [13,  'Increases surfing speed by 30%. // Aumenta la velocidad de surf un 30%.',                                                                                                                                                      'movement'],
    [14,  'Increases riding speed by 30%. // Aumenta la velocidad de montura un 30%.',                                                                                                                                                    'movement'],
    [15,  '10% chance to harvest an additional Berry or Apricorn. // 10% de probabilidad de cosechar una Berry o Apricorn adicional.',                                                                                                    'profession'],
    [16,  '10% chance to mine an additional Powder. // 10% de probabilidad de minar un Powder adicional.',                                                                                                                                'profession'],
    [17,  '3% chance to bypass Reflect. // 3% de probabilidad de ignorar Reflect.',                                                                                                                                                       'combat'],
    [18,  '5% chance to bypass Reflect. // 5% de probabilidad de ignorar Reflect.',                                                                                                                                                       'combat'],
    [19,  '3% chance to bypass protection moves. // 3% de probabilidad de ignorar movimientos de protección.',                                                                                                                            'combat'],
    [20,  '5% chance to bypass protection moves. // 5% de probabilidad de ignorar movimientos de protección.',                                                                                                                            'combat'],
    [21,  '5% chance to bypass type immunities. // 5% de probabilidad de ignorar las inmunidades de tipo.',                                                                                                                               'combat'],
    [22,  '15% boost to Hyper Potion effectiveness. // Aumenta la efectividad de la Hyper Potion un 15%.',                                                                                                                               'utility'],
    [23,  '2% chance to heal the user for 10% of the damage dealt. // 2% de probabilidad de curar al usuario el 10% del daño infligido.',                                                                                                'combat'],
    [24,  '3% chance to heal the user for 15% of the damage dealt. // 3% de probabilidad de curar al usuario el 15% del daño infligido.',                                                                                                'combat'],
    [25,  'Boosts Wealth Charm by 20%. // Potencia el Wealth Charm un 20%.',                                                                                                                                                              'charm'],
    [26,  'Boosts Lucky Charm by 10%. // Potencia el Lucky Charm un 10%.',                                                                                                                                                                'charm'],
    [27,  'Boosts Dodge Charm by 10%. // Potencia el Dodge Charm un 10%.',                                                                                                                                                                'charm'],
    [28,  'Boosts Stunning Charm by 20%. // Potencia el Stunning Charm un 20%.',                                                                                                                                                          'charm'],
    [29,  'Boosts Vital Charm by 20%. // Potencia el Vital Charm un 20%.',                                                                                                                                                                'charm'],
    [30,  'Boosts Mimic Charm by 20%. // Potencia el Mimic Charm un 20%.',                                                                                                                                                                'charm'],
    [31,  'Boosts Cure Charm by 20%. // Potencia el Cure Charm un 20%.',                                                                                                                                                                  'charm'],
    [32,  'Boosts Experience Charm by 25%. // Potencia el Experience Charm un 25%.',                                                                                                                                                      'charm'],
    [33,  'Boosts Power Charm by 5%. // Potencia el Power Charm un 5%.',                                                                                                                                                                  'charm'],
    [34,  'Boosts Defense Charm by 10%. // Potencia el Defense Charm un 10%.',                                                                                                                                                            'charm'],
    [35,  'Boosts Catch Charm by 10%. // Potencia el Catch Charm un 10%.',                                                                                                                                                                'charm'],
    [36,  'Boosts Fire Charm by 70%. // Potencia el Fire Charm un 70%.',                                                                                                                                                                  'charm'],
    [37,  'Reduces cooldown of Dodge Charm by 50%. // Reduce el cooldown del Dodge Charm un 50%.',                                                                                                                                        'charm'],
    [38,  'Regenerate 1% of the user\'s maximum health every 2 seconds while not in battle. // Regenera el 1% de la vida máxima del usuario cada 2 segundos mientras no está en combate.',                                               'defense'],
    [39,  'The enemy\'s Mold Breaker has no effect on the user. // El Mold Breaker del enemigo no tiene efecto sobre el usuario.',                                                                                                        'defense'],
    [40,  'Boosts the Adaptability ability by 20%. // Potencia la habilidad Adaptability un 20%.',                                                                                                                                        'ability'],
    [41,  'Boosts the Battery ability by 20%. // Potencia la habilidad Battery un 20%.',                                                                                                                                                  'ability'],
    [42,  'Boosts the Berserk ability by 20%. // Potencia la habilidad Berserk un 20%.',                                                                                                                                                  'ability'],
    [43,  'Increases the chance to use the Disguise ability by 20%. // Aumenta la probabilidad de activar la habilidad Disguise un 20%.',                                                                                                 'ability'],
    [44,  'Boosts the Filter ability by 10%. // Potencia la habilidad Filter un 10%.',                                                                                                                                                    'ability'],
    [45,  'Increases the effect of Friend Guard by 25% when received from an ally. // Aumenta el efecto de Friend Guard un 25% cuando es recibido de un aliado.',                                                                         'ability'],
    [46,  'Boosts the Heatproof ability by 10%. // Potencia la habilidad Heatproof un 10%.',                                                                                                                                              'ability'],
    [47,  'Boosts the Intimidate ability by 25%. // Potencia la habilidad Intimidate un 25%.',                                                                                                                                            'ability'],
    [48,  'Boosts the Leaf Guard ability by 100%. // Potencia la habilidad Leaf Guard un 100%.',                                                                                                                                          'ability'],
    [49,  '+10% Moxie ability damage cap. // +10% al límite de daño de la habilidad Moxie.',                                                                                                                                              'ability'],
    [50,  '+10% Moody ability cap. // +10% al límite de la habilidad Moody.',                                                                                                                                                             'ability'],
    [51,  'Boosts the Regenerator ability by 30%. // Potencia la habilidad Regenerator un 30%.',                                                                                                                                          'ability'],
    [52,  'Boosts the Rivalry ability by 100%. // Potencia la habilidad Rivalry un 100%.',                                                                                                                                                'ability'],
    [53,  'Boosts the Schooling ability by 100%. // Potencia la habilidad Schooling un 100%.',                                                                                                                                            'ability'],
    [54,  'Boosts the Shed Skin ability by 50%. // Potencia la habilidad Shed Skin un 50%.',                                                                                                                                              'ability'],
    [55,  'Boosts the Solid Rock ability, increasing the multiplier to 1.5x instead of 1.7x. // Potencia la habilidad Solid Rock, aumentando el multiplicador a 1.5x en lugar de 1.7x.',                                                 'ability'],
    [56,  'Boosts the Tangled Feet ability by 25%. // Potencia la habilidad Tangled Feet un 25%.',                                                                                                                                        'ability'],
    [57,  'Reduces the cooldown of the Telepathy ability to 30 seconds. // Reduce el cooldown de la habilidad Telepathy a 30 segundos.',                                                                                                  'ability'],
    [58,  'Boosts the Volt Absorb ability by 50%. Also reduces the cooldown to 1 minute. // Potencia la habilidad Volt Absorb un 50%. También reduce el cooldown a 1 minuto.',                                                            'ability'],
    [59,  'Boosts the Water Absorb ability by 50%. Also reduces the cooldown to 1 minute. // Potencia la habilidad Water Absorb un 50%. También reduce el cooldown a 1 minuto.',                                                          'ability'],
    [60,  '15% chance to bypass through Levitate ability. // 15% de probabilidad de ignorar la habilidad Levitate.',                                                                                                                      'ability'],
    [61,  'Reduces Mega Transformation cooldown to 4 hours 30 minutes. // Reduce el cooldown de la Mega Transformación a 4 horas y 30 minutos.',                                                                                         'mega'],
    [62,  'Allows Wobbuffet to learn up to 2 TMs. // Permite a Wobbuffet aprender hasta 2 TMs.',                                                                                                                                          'utility'],
    [63,  '3% chance to deal critical damage. // 3% de probabilidad de infligir daño crítico.',                                                                                                                                           'combat'],
    [64,  '5% chance to deal critical damage. // 5% de probabilidad de infligir daño crítico.',                                                                                                                                           'combat'],
    [65,  '10% chance to deal critical damage. // 10% de probabilidad de infligir daño crítico.',                                                                                                                                         'combat'],
    [66,  '5% extra critical damage. // 5% de daño crítico extra.',                                                                                                                                                                       'combat'],
    [67,  '10% extra critical damage. // 10% de daño crítico extra.',                                                                                                                                                                     'combat'],
    [68,  '1% life leech. // 1% de robo de vida.',                                                                                                                                                                                        'combat'],
    [69,  '1.5% life leech. // 1.5% de robo de vida.',                                                                                                                                                                                   'combat'],
    [70,  '2% life leech. // 2% de robo de vida.',                                                                                                                                                                                        'combat'],
    [71,  'Boosts the Ingrain move by 10%. // Potencia el movimiento Ingrain un 10%.',                                                                                                                                                    'move'],
    [72,  'Boosts the Ingrain move by 15%. // Potencia el movimiento Ingrain un 15%.',                                                                                                                                                    'move'],
    [73,  'Boosts the Recovery Wish move by 10%. // Potencia el movimiento Recovery Wish un 10%.',                                                                                                                                        'move'],
    [74,  'Boosts the Recovery Wish move by 15%. // Potencia el movimiento Recovery Wish un 15%.',                                                                                                                                        'move'],
    [75,  'Increases the duration of Reflect by 2 seconds. // Aumenta la duración de Reflect 2 segundos.',                                                                                                                               'move'],
    [76,  'Increases the duration of Protection by 2 seconds. // Aumenta la duración de Protection 2 segundos.',                                                                                                                         'move'],
    [77,  'Increases the duration of Detect by 2 seconds. // Aumenta la duración de Detect 2 segundos.',                                                                                                                                 'move'],
    [78,  'Increases the duration of Confusion status condition caused by the user by 2 seconds. // Aumenta la duración del estado Confusion causado por el usuario 2 segundos.',                                                         'status'],
    [79,  'Increases the duration of Sleep status condition caused by the user by 2 seconds. // Aumenta la duración del estado Sleep causado por el usuario 2 segundos.',                                                                 'status'],
    [80,  'Increases the duration of Frozen Solid status condition caused by the user by 2 seconds. // Aumenta la duración del estado Frozen Solid causado por el usuario 2 segundos.',                                                   'status'],
    [81,  '15% chance to avoid the Confusion status condition. (PvE only) // 15% de probabilidad de evitar el estado Confusion. (Solo PvE)',                                                                                              'status'],
    [82,  '15% chance to avoid the Sleep status condition. (PvE only) // 15% de probabilidad de evitar el estado Sleep. (Solo PvE)',                                                                                                      'status'],
    [83,  '15% chance to avoid the Frozen Solid status condition. (PvE only) // 15% de probabilidad de evitar el estado Frozen Solid. (Solo PvE)',                                                                                        'status'],
    [84,  '10% less damage received from Grass type. // 10% menos de daño recibido de tipo Grass.',                                                                                                                                       'defense'],
    [85,  '10% less damage received from Water type. // 10% menos de daño recibido de tipo Water.',                                                                                                                                       'defense'],
    [86,  '10% less damage received from Fire type. // 10% menos de daño recibido de tipo Fire.',                                                                                                                                         'defense'],
    [87,  '10% less damage received from Bug type. // 10% menos de daño recibido de tipo Bug.',                                                                                                                                           'defense'],
    [88,  '10% less damage received from Dark type. // 10% menos de daño recibido de tipo Dark.',                                                                                                                                         'defense'],
    [89,  '10% less damage received from Ghost type. // 10% menos de daño recibido de tipo Ghost.',                                                                                                                                       'defense'],
    [90,  '10% less damage received from Fighting type. // 10% menos de daño recibido de tipo Fighting.',                                                                                                                                 'defense'],
    [91,  '10% less damage received from Normal type. // 10% menos de daño recibido de tipo Normal.',                                                                                                                                     'defense'],
    [92,  '10% less damage received from Ice type. // 10% menos de daño recibido de tipo Ice.',                                                                                                                                           'defense'],
    [93,  '10% less damage received from Psychic type. // 10% menos de daño recibido de tipo Psychic.',                                                                                                                                   'defense'],
    [94,  '10% less damage received from Fairy type. // 10% menos de daño recibido de tipo Fairy.',                                                                                                                                       'defense'],
    [95,  '10% less damage received from Rock type. // 10% menos de daño recibido de tipo Rock.',                                                                                                                                         'defense'],
    [96,  '10% less damage received from Ground type. // 10% menos de daño recibido de tipo Ground.',                                                                                                                                     'defense'],
    [97,  '10% less damage received from Electric type. // 10% menos de daño recibido de tipo Electric.',                                                                                                                                 'defense'],
    [98,  '10% less damage received from Flying type. // 10% menos de daño recibido de tipo Flying.',                                                                                                                                     'defense'],
    [99,  '10% less damage received from Steel type. // 10% menos de daño recibido de tipo Steel.',                                                                                                                                       'defense'],
    [100, '10% less damage received from Dragon type. // 10% menos de daño recibido de tipo Dragon.',                                                                                                                                     'defense'],
    [101, '10% less damage received from Poison type. // 10% menos de daño recibido de tipo Poison.',                                                                                                                                     'defense'],
    [102, 'Boosts Normal type moves by 35%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Normal un 35%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [103, 'The user gains a temporary second ability upon each release. // El usuario obtiene una segunda habilidad temporal cada vez que es enviado al campo.',                                                                           'ability'],
    [104, 'Deals 10% more damage to enemies resistant to the move\'s type. (no effect against bosses) // Inflige un 10% más de daño a enemigos resistentes al tipo del movimiento. (Sin efecto contra jefes)',                            'combat'],
    [105, '10% less damage received from Water type while fishing. // 10% menos de daño recibido de tipo Water mientras se pesca.',                                                                                                       'profession'],
    [106, 'Provokes nearby passive Pokemon within a 4x4 area. // Provoca a los Pokémon pasivos cercanos en un área de 4x4.',                                                                                                              'utility'],
    [107, 'Blaze ability activates at 45% HP. // La habilidad Blaze se activa al 45% de HP.',                                                                                                                                             'ability'],
    [108, 'Overgrow ability activates at 45% HP. // La habilidad Overgrow se activa al 45% de HP.',                                                                                                                                       'ability'],
    [109, 'Shell Armor ability activates at 45% HP. // La habilidad Shell Armor se activa al 45% de HP.',                                                                                                                                 'ability'],
    [110, 'Swarm ability activates at 45% HP. // La habilidad Swarm se activa al 45% de HP.',                                                                                                                                             'ability'],
    [111, 'Torrent ability activates at 45% HP. // La habilidad Torrent se activa al 45% de HP.',                                                                                                                                         'ability'],
    [112, 'Increases flying speed by 50%. // Aumenta la velocidad de vuelo un 50%.',                                                                                                                                                      'movement'],
    [113, 'Increases surfing speed by 50%. // Aumenta la velocidad de surf un 50%.',                                                                                                                                                      'movement'],
    [114, 'Increases riding speed by 50%. // Aumenta la velocidad de montura un 50%.',                                                                                                                                                    'movement'],
    [115, 'Automatically casts Sunny Day. Cooldown: 10 seconds. // Lanza Sunny Day automáticamente. Cooldown: 10 segundos.',                                                                                                              'move'],
    [116, 'Increases the chance to trigger passive moves by 10%. // Aumenta la probabilidad de activar movimientos pasivos un 10%.',                                                                                                      'move'],
    [117, 'Increases the chance to trigger passive moves by 15%. // Aumenta la probabilidad de activar movimientos pasivos un 15%.',                                                                                                      'move'],
    [118, 'Boosts damage against bosses by 5%. // Aumenta el daño contra jefes un 5%.',                                                                                                                                                   'combat'],
    [119, '5% chance to get extra loot. // 5% de probabilidad de obtener botín extra.',                                                                                                                                                   'utility'],
    [120, '3% chance for a Pokemon to count twice toward tasks. // 3% de probabilidad de que un Pokémon cuente el doble en las tareas.',                                                                                                  'utility'],
    [121, '5% chance to inflict a random damaging status condition when dealing damage. // 5% de probabilidad de infligir un estado de daño aleatorio al atacar.',                                                                         'combat'],
    [122, '20% chance to skip the Teleport cooldown. // 20% de probabilidad de omitir el cooldown de Teleport.',                                                                                                                          'utility'],
    [123, '2% chance to cast a random move from the user\'s TM learnset. // 2% de probabilidad de lanzar un movimiento aleatorio del learnset de TMs del usuario.',                                                                       'move'],
    [124, '2% chance to use Counter upon receiving damage. // 2% de probabilidad de usar Counter al recibir daño.',                                                                                                                       'move'],
    [125, '2% chance to reflect the damage received. // 2% de probabilidad de reflejar el daño recibido.',                                                                                                                                'defense'],
    [126, '5% chance to swap held items with the opponent. (PvP only) // 5% de probabilidad de intercambiar objetos equipados con el oponente. (Solo PvP)',                                                                               'pvp'],
    [127, '5% chance to swap abilities with the opponent for the duration of the battle. (PvP only) // 5% de probabilidad de intercambiar habilidades con el oponente durante el combate. (Solo PvP)',                                    'pvp'],
    [128, '+15% HP when revived. // +15% de HP al ser revivido.',                                                                                                                                                                         'defense'],
    [129, 'Fish an additional Pokemon when fishing with Ultra Rod or Master Rod. // Pesca un Pokémon adicional al usar Ultra Rod o Master Rod.',                                                                                           'profession'],
    [130, 'Encounter an additional Pokemon when using a Bug Net. // Encuentra un Pokémon adicional al usar Bug Net.',                                                                                                                      'profession'],
    [131, 'Encounter an additional Pokemon when using a Ghost Detector. // Encuentra un Pokémon adicional al usar Ghost Detector.',                                                                                                        'profession'],
    [132, 'Encounter an additional Pokemon when using a Magnetic Detector. // Encuentra un Pokémon adicional al usar Magnetic Detector.',                                                                                                  'profession'],
    [133, 'Encounter an additional Pokemon when using a Fiery Fishing Rod. // Encuentra un Pokémon adicional al usar Fiery Fishing Rod.',                                                                                                  'profession'],
    [134, 'Encounter an additional Pokemon when using an Ice Hammer. // Encuentra un Pokémon adicional al usar Ice Hammer.',                                                                                                               'profession'],
    [135, 'Encounter an additional Pokemon when using a Lead Pickaxe. // Encuentra un Pokémon adicional al usar Lead Pickaxe.',                                                                                                            'profession'],
    [136, 'Grants a 3% chance to encounter Dhelmise when fishing with an Ultra or Master Rod. This effect bypasses all bait restrictions. // Otorga un 3% de probabilidad de encontrar a Dhelmise al pescar con Ultra Rod o Master Rod. Este efecto ignora todas las restricciones de cebo.', 'profession'],
    [137, 'Increases duration of Mega transformation by 1 hour. // Aumenta la duración de la Mega Transformación 1 hora.',                                                                                                                'mega'],
    [138, 'Boosts Grass type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Grass un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [139, 'Boosts Normal type moves by 40%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Normal un 40%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [140, 'Boosts Water type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Water un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [141, 'Boosts Fire type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fire un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [142, 'Boosts Bug type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Bug un 10%. (Solo PvE, sin efecto contra jefes)',                                                                       'type_boost'],
    [143, 'Boosts Rock type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Rock un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [144, 'Boosts Ground type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ground un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [145, 'Boosts Dark type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Dark un 10%. (Solo PvE, sin efecto contra jefes)',                                                                     'type_boost'],
    [146, 'Boosts Ghost type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ghost un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [147, 'Boosts Fairy type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fairy un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [148, 'Boosts Fighting type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Fighting un 10%. (Solo PvE, sin efecto contra jefes)',                                                             'type_boost'],
    [149, 'Boosts Dragon type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Dragon un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [150, 'Boosts Ice type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Ice un 10%. (Solo PvE, sin efecto contra jefes)',                                                                       'type_boost'],
    [151, 'Boosts Psychic type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Psychic un 10%. (Solo PvE, sin efecto contra jefes)',                                                               'type_boost'],
    [152, 'Boosts Electric type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Electric un 10%. (Solo PvE, sin efecto contra jefes)',                                                             'type_boost'],
    [153, 'Boosts Steel type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Steel un 10%. (Solo PvE, sin efecto contra jefes)',                                                                   'type_boost'],
    [154, 'Boosts Flying type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Flying un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [155, 'Boosts Poison type moves by 10%. (PvE only, no effect against bosses) // Potencia los movimientos de tipo Poison un 10%. (Solo PvE, sin efecto contra jefes)',                                                                 'type_boost'],
    [156, 'Reduces cooldown of the Bug Net by 2 seconds. // Reduce el cooldown de la Bug Net 2 segundos.',                                                                                                                                'profession'],
    [157, 'Reduces cooldown of the Ghost Detector by 2 seconds. // Reduce el cooldown del Ghost Detector 2 segundos.',                                                                                                                    'profession'],
    [158, 'Reduces cooldown of the Magnetic Detector by 2 seconds. // Reduce el cooldown del Magnetic Detector 2 segundos.',                                                                                                              'profession'],
    [159, 'Reduces cooldown of the Lead Pickaxe by 2 seconds. // Reduce el cooldown del Lead Pickaxe 2 segundos.',                                                                                                                        'profession'],
    [160, 'Reduces cooldown of the Ice Hammer by 2 seconds. // Reduce el cooldown del Ice Hammer 2 segundos.',                                                                                                                            'profession'],
    [161, 'Reduces cooldown of the Fiery Fishing Rod by 2 seconds. // Reduce el cooldown de la Fiery Fishing Rod 2 segundos.',                                                                                                            'profession'],
    [162, 'Immunity to Paralysis status condition. // Inmunidad al estado Paralysis.',                                                                                                                                                     'status'],
    [163, '0.5% chance to revive instantly after fainting. (PvE only) // 0.5% de probabilidad de revivir instantáneamente al desmayarse. (Solo PvE)',                                                                                    'utility'],
    [164, '0.6% chance to reuse the same move at 100% of its original damage. (No cooldown in PvE; 30s cooldown in PvP) // 0.6% de probabilidad de reutilizar el mismo movimiento con el 100% de su daño original. (Sin cooldown en PvE; 30s en PvP)', 'move'],
    [165, '10% chance to gain 30% Movement Speed for 10 seconds when attacking. // 10% de probabilidad de ganar un 30% de velocidad de movimiento durante 10 segundos al atacar.',                                                        'movement'],
    [166, '5% chance to reflect the Paralysis status condition. // 5% de probabilidad de reflejar el estado Paralysis.',                                                                                                                  'status'],
    [167, '3% chance to apply Paralysis for 2 seconds when attacking. // 3% de probabilidad de aplicar Paralysis durante 2 segundos al atacar.',                                                                                          'status'],
    [168, '5% chance to increase the duration of Paralysis applied by the Pokemon by 2 seconds. // 5% de probabilidad de aumentar la duración del Paralysis aplicado por el Pokémon en 2 segundos.',                                      'status'],
    [169, '2% chance to use a random move from the enemy. // 2% de probabilidad de usar un movimiento aleatorio del enemigo.',                                                                                                            'move'],
    [170, '2% chance to pull up to 4 Pokemon within a 5x5 range toward the user. // 2% de probabilidad de atraer hasta 4 Pokémon en un rango de 5x5 hacia el usuario.',                                                                  'move'],
    [171, 'Automatically targets Pokemon around the user in a 4x4 area. // Ataca automáticamente a los Pokémon alrededor del usuario en un área de 4x4.',                                                                                 'utility'],
    [172, 'Pokemon can use up to 4 Blinks within 10 seconds before the cooldown starts. // El Pokémon puede usar hasta 4 Blinks en 10 segundos antes de que empiece el cooldown.',                                                        'move'],
    [173, 'Pokemon can use up to 4 Dark Portals within 10 seconds before the cooldown starts. // El Pokémon puede usar hasta 4 Dark Portals en 10 segundos antes de que empiece el cooldown.',                                            'move'],
    [174, '10% chance to skip the Harvest cooldown after a successful harvest. // 10% de probabilidad de omitir el cooldown de cosecha tras una cosecha exitosa.',                                                                         'profession'],
    [175, '10% chance to skip the Mining cooldown after a successful mine. // 10% de probabilidad de omitir el cooldown de minería tras una mina exitosa.',                                                                                'profession'],
    [177, '2% chance to prevent enemy Reflect. // 2% de probabilidad de prevenir el Reflect del enemigo.',                                                                                                                                'move'],
    [178, '3% chance to prevent enemy Telekinesis. // 3% de probabilidad de prevenir el Telekinesis del enemigo.',                                                                                                                        'move'],
    [179, '3% chance to reflect the Stun status condition. // 3% de probabilidad de reflejar el estado Stun.',                                                                                                                            'status'],
    [180, '3% chance to cast Telekinesis automatically when attacking. // 3% de probabilidad de lanzar Telekinesis automáticamente al atacar.',                                                                                           'move'],
    [181, '10% chance to skip the Self-Stun caused by Telekinesis. // 10% de probabilidad de omitir el auto-aturdimiento causado por Telekinesis.',                                                                                       'status'],
    [182, 'Copy 2 random moves from the target\'s learnset. Triggers on hit; active until the Pokemon is returned to its Pokeball. // Copia 2 movimientos aleatorios del learnset del objetivo. Se activa al golpear; permanece activo hasta que el Pokémon sea devuelto a su Pokeball.', 'move'],
    [183, '2% chance to automatically cast Reflect when an enemy uses the move. // 2% de probabilidad de lanzar Reflect automáticamente cuando un enemigo usa ese movimiento.',                                                           'move'],
    [184, '15% chance to skip the Self-Stun caused by Tearful Look. // 15% de probabilidad de omitir el auto-aturdimiento causado por Tearful Look.',                                                                                     'status'],
    [185, '5% chance to bypass Reflect with 50% damage. // 5% de probabilidad de ignorar Reflect con el 50% del daño.',                                                                                                                   'combat'],
    [186, '5% chance to bypass Substitute with 50% damage. // 5% de probabilidad de ignorar Substitute con el 50% del daño.',                                                                                                             'combat'],
    [187, 'Reduces the cooldown of the Pokemon\'s 4th move. Applies only to the original moveset and ignores custom moves. // Reduce el cooldown del 4.º movimiento del Pokémon. Solo aplica al moveset original e ignora los movimientos personalizados.', 'move'],
    [188, '1% chance to transform the user into its Mega Form for 5 minutes when attacking. (PvE only) // 1% de probabilidad de transformar al usuario en su Mega Forma durante 5 minutos al atacar. (Solo PvE)',                          'mega'],
    [189, '3% chance to transform the user into its Mega Form for 5 minutes when attacking. Additionally, the Pokemon gains 25% damage reduction (10% in PvP). // 3% de probabilidad de transformar al usuario en su Mega Forma durante 5 minutos al atacar. Además, el Pokémon gana un 25% de reducción de daño (10% en PvP).', 'mega'],
    [190, 'Unlocks third held item slot (Mega Stone slot). // Desbloquea el tercer slot de held item (slot de Mega Stone).',                                                                                                               'mega'],
];

// --- Render ---
const proficiencyById = new Map(proficiencies.map(([id, desc, cat]) => [id, { desc, cat }]));
const levelMapByLowerName = (typeof pokemonProficiencyLevelMap !== 'undefined')
    ? new Map(Object.keys(pokemonProficiencyLevelMap).map(name => [name.toLowerCase(), pokemonProficiencyLevelMap[name]]))
    : new Map();
const pokemonSearchIndex = new Map();
buildPokemonSearchIndex();

function isMegaPokemonName(name) {
    return /^Mega\s+/i.test(name);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function getPokemonRowKey(name) {
    return encodeURIComponent(name.toLowerCase());
}

function getPokemonRowSummary(name, profIds) {
    const fromMap = levelMapByLowerName.get(name.toLowerCase());
    const counts = [];

    for (let level = 1; level <= 9; level++) {
        const levelIds = Array.isArray(fromMap?.[`L${level}`]) ? fromMap[`L${level}`] : [];
        if (levelIds.length) {
            counts.push(`L${level} ${levelIds.length}`);
        }
    }

    const summaryLabel = copyText('pokemonCompactLevels');
    if (!counts.length && profIds.length) {
        return `<span class="pokemon-summary-label">${summaryLabel}:</span> <span class="pokemon-summary-count">${profIds.length}</span>`;
    }

    if (!counts.length) {
        return `<span class="pokemon-summary-label">${summaryLabel}:</span> <span class="pokemon-summary-empty">${copyText('noOptions')}</span>`;
    }

    return `<span class="pokemon-summary-label">${summaryLabel}:</span> <span class="pokemon-summary-counts">${counts.map(item => `<span class="pokemon-level-mini">${item}</span>`).join('')}</span>`;
}

function isPokemonRowExpanded(name) {
    return browserState.pokemon.expandedNames.has(name.toLowerCase());
}

function togglePokemonRow(name) {
    const normalized = name.toLowerCase();
    if (browserState.pokemon.expandedNames.has(normalized)) {
        browserState.pokemon.expandedNames.delete(normalized);
    } else {
        browserState.pokemon.expandedNames.add(normalized);
    }
    refreshPokemonTable();
}

function buildPokemonSearchIndex() {
    pokemonSearchIndex.clear();
    if (typeof pokemonProficiencyMap === 'undefined') return;

    Object.keys(pokemonProficiencyMap).forEach(name => {
        if (isMegaPokemonName(name)) return;

        const profIds = pokemonProficiencyMap[name] || [];
        const parts = [name.toLowerCase(), String(profIds.length)];

        profIds.forEach(id => {
            parts.push(String(id));
            const prof = proficiencyById.get(id);
            if (!prof) return;
            const split = splitDescription(prof.desc);
            parts.push(split.en.toLowerCase(), split.es.toLowerCase());
        });

        pokemonSearchIndex.set(name.toLowerCase(), parts.join(' '));
    });
}

function splitDescription(desc) {
    const parts = desc.split(' // ');
    if (parts.length < 2) {
        return { en: desc, es: desc };
    }
    return { en: parts[0].trim(), es: parts[1].trim() };
}

function getCategoryBadge(catKey) {
    const cat = CATEGORIES[catKey];
    if (!cat) return '';
    return `<span class="cat-badge ${cat.css}">${getCategoryLabel(catKey)}</span>`;
}

function buildPokemonCell(pokemons, profId, searchQuery) {
    if (!pokemons.length) return '<span class="pokemon-none">—</span>';

    const visibleCount = 5;
    const tags = pokemons.map(name => {
        const isMatch = searchQuery && name.toLowerCase().includes(searchQuery);
        return `<span class="pokemon-tag${isMatch ? ' highlight' : ''}">${name}</span>`;
    }).join('');

    if (pokemons.length <= visibleCount) {
        return `<div class="pokemon-tags">${tags}</div>`;
    }

    return `<div class="pokemon-tags collapsed" id="ptags-${profId}">${tags}</div>` +
           `<span class="pokemon-toggle" onclick="togglePokemonTags(${profId})">${pokemons.length} Pokémon ▾</span>`;
}

function togglePokemonTags(profId) {
    const el = document.getElementById('ptags-' + profId);
    if (!el) return;
    const toggle = el.nextElementSibling;
    const isCollapsed = el.classList.contains('collapsed');
    el.classList.toggle('collapsed');
    const count = el.children.length;
    toggle.textContent = isCollapsed ? `${copyText('hide')} ▴` : `${count} Pokémon ▾`;
}

function buildCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `filter-btn${browserState.proficiency.activeCat === 'all' ? ' active' : ''}`;
    allBtn.textContent = copyText('allCategories');
    allBtn.dataset.cat = 'all';
    container.appendChild(allBtn);

    Object.entries(CATEGORIES).forEach(([key, val]) => {
        const btn = document.createElement('button');
        btn.className = `filter-btn${browserState.proficiency.activeCat === key ? ' active' : ''}`;
        btn.textContent = getCategoryLabel(key);
        btn.dataset.cat = key;
        container.appendChild(btn);
    });
}

function getFilteredProficiencies(searchQuery, activeCat) {
    return proficiencies.filter(([id, desc, cat]) => {
        const matchesCat = activeCat === 'all' || cat === activeCat;
        if (!matchesCat) return false;

        if (!searchQuery) return true;

        const { en, es } = splitDescription(desc);
        const matchesDesc =
            en.toLowerCase().includes(searchQuery) ||
            es.toLowerCase().includes(searchQuery) ||
            String(id).includes(searchQuery);
        if (matchesDesc) return true;

        const pokemons = (typeof proficiencyPokemonMap !== 'undefined' && proficiencyPokemonMap[id]) || [];
        return pokemons.some(name => name.toLowerCase().includes(searchQuery));
    });
}

function sortProficiencies(data, sortMode) {
    const copy = [...data];
    if (sortMode === 'id-desc') {
        return copy.sort((a, b) => b[0] - a[0]);
    }
    if (sortMode === 'pokemon-desc') {
        return copy.sort((a, b) => {
            const aCount = ((typeof proficiencyPokemonMap !== 'undefined' && proficiencyPokemonMap[a[0]]) || []).length;
            const bCount = ((typeof proficiencyPokemonMap !== 'undefined' && proficiencyPokemonMap[b[0]]) || []).length;
            if (bCount !== aCount) return bCount - aCount;
            return a[0] - b[0];
        });
    }
    return copy.sort((a, b) => a[0] - b[0]);
}

function renderProficiencyTable(data, searchQuery) {
    const tbody = document.getElementById('profTableBody');
    const count = document.getElementById('profCount');
    if (!tbody || !count) return;

    count.textContent = copyText('profCount')(data.length);

    tbody.innerHTML = data.map(([id, desc, cat]) => {
        const pokemons = (typeof proficiencyPokemonMap !== 'undefined' && proficiencyPokemonMap[id]) || [];
        const pokemonHtml = buildPokemonCell(pokemons, id, searchQuery);
        const { en, es } = splitDescription(desc);
        const description = currentLanguage === 'en' ? en : es;

        return `<tr>
            <td>${id}</td>
            <td>${description}</td>
            <td>${getCategoryBadge(cat)}</td>
            <td class="pokemon-cell">${pokemonHtml}</td>
        </tr>`;
    }).join('');
}

function buildPokemonProficiencyCell(pokemonName, profIds, searchQuery) {
    const fromMap = levelMapByLowerName.get(pokemonName.toLowerCase());
    const levels = {};
    for (let i = 1; i <= 9; i++) {
        const key = `L${i}`;
        levels[key] = Array.isArray(fromMap?.[key]) ? fromMap[key] : [];
    }

    // Fallback if no level mapping is available for this name.
    if (!fromMap && profIds.length) {
        levels.L1 = profIds;
    }

    const levelCards = Array.from({ length: 9 }, (_, idx) => {
        const levelNum = idx + 1;
        const levelKey = `L${levelNum}`;
        const ids = levels[levelKey].filter(id => Number.isInteger(id));

        const chips = ids.map(id => {
            const prof = proficiencyById.get(id);
            const split = prof ? splitDescription(prof.desc) : { en: '', es: '' };
            const description = prof ? (currentLanguage === 'en' ? split.en : split.es) : (currentLanguage === 'en' ? 'Description not found' : 'Descripción no encontrada');
            const isMatch = searchQuery && (
                pokemonName.toLowerCase().includes(searchQuery) ||
                String(id).includes(searchQuery) ||
                description.toLowerCase().includes(searchQuery)
            );
            return `<span class="prof-chip${isMatch ? ' match' : ''}" title="ID ${id}">${description}</span>`;
        }).join('');

        return `<div class="level-card">
            <div class="level-head">
                <span class="level-badge">L${levelNum}</span>
                <span class="level-count">${ids.length}</span>
            </div>
            ${ids.length ? `<div class="prof-chip-wrap">${chips}</div>` : `<div class="level-empty">${copyText('noOptions')}</div>`}
        </div>`;
    }).join('');

    return `<div class="level-groups">${levelCards}</div>`;
}

function getFilteredPokemonRows(searchQuery) {
    if (typeof pokemonProficiencyMap === 'undefined') return [];

    const names = Object.keys(pokemonProficiencyMap).filter(name => !isMegaPokemonName(name));
    return names.filter(name => {
        const profIds = pokemonProficiencyMap[name] || [];
        if (!searchQuery) return profIds.length > 0;

        const cached = pokemonSearchIndex.get(name.toLowerCase()) || name.toLowerCase();
        return cached.includes(searchQuery);
    }).map(name => {
        const profIds = [...(pokemonProficiencyMap[name] || [])].sort((a, b) => a - b);
        return { name, profIds, count: profIds.length };
    });
}

function sortPokemonRows(rows, sortMode) {
    const copy = [...rows];
    if (sortMode === 'name-desc') {
        return copy.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortMode === 'count-desc') {
        return copy.sort((a, b) => {
            if (b.count !== a.count) return b.count - a.count;
            return a.name.localeCompare(b.name);
        });
    }
    return copy.sort((a, b) => a.name.localeCompare(b.name));
}

function renderPokemonTable(rows, searchQuery) {
    const tbody = document.getElementById('pokemonTableBody');
    const count = document.getElementById('pokemonCount');
    if (!tbody || !count) return;

    count.textContent = copyText('pokemonCount')(rows.length);

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="3">${copyText('pokemonNoResults')}</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(row => {
        const expanded = isPokemonRowExpanded(row.name);
        const rowKey = getPokemonRowKey(row.name);
        const summaryHtml = getPokemonRowSummary(row.name, row.profIds);
        const buttonLabel = expanded ? copyText('pokemonHideDetails') : copyText('pokemonShowDetails');
        const detailRow = expanded
            ? `<tr class="pokemon-detail-row" data-detail-for="${rowKey}"><td colspan="3">${buildPokemonProficiencyCell(row.name, row.profIds, searchQuery)}</td></tr>`
            : '';

        return `<tr class="pokemon-result-row${expanded ? ' expanded' : ''}" data-pokemon-name="${escapeHtml(row.name)}" data-pokemon-key="${rowKey}">
            <td class="pokemon-name">${escapeHtml(row.name)}</td>
            <td>${row.count}</td>
            <td>
                <div class="pokemon-summary-row">
                    <div class="pokemon-summary-meta">${summaryHtml}</div>
                    <button class="pokemon-toggle-row" type="button" data-pokemon-toggle="${rowKey}">${buttonLabel}</button>
                </div>
            </td>
        </tr>${detailRow}`;
    }).join('');
}

function initProficiencyBrowser() {
    buildCategoryFilters();

    const searchInput = document.getElementById('profSearch');
    const sortInput = document.getElementById('profSort');
    const clearBtn = document.getElementById('profClear');
    const filterContainer = document.getElementById('categoryFilters');

    function updateProficiencyUI() {
        const filtered = getFilteredProficiencies(browserState.proficiency.searchQuery, browserState.proficiency.activeCat);
        renderProficiencyTable(sortProficiencies(filtered, browserState.proficiency.sortMode), browserState.proficiency.searchQuery);
    }

    updateProficiencyUI();

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            browserState.proficiency.searchQuery = this.value.toLowerCase().trim();
            updateProficiencyUI();
        });
    }

    if (sortInput) {
        sortInput.addEventListener('change', function () {
            browserState.proficiency.sortMode = this.value;
            updateProficiencyUI();
        });
    }

    if (clearBtn && searchInput && sortInput) {
        clearBtn.addEventListener('click', function () {
            browserState.proficiency.searchQuery = '';
            browserState.proficiency.sortMode = 'id-asc';
            browserState.proficiency.activeCat = 'all';
            searchInput.value = '';
            sortInput.value = 'id-asc';
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.cat === 'all');
            });
            updateProficiencyUI();
        });
    }

    if (filterContainer) {
        filterContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            browserState.proficiency.activeCat = btn.dataset.cat;
            updateProficiencyUI();
        });
    }
}

function initPokemonBrowser() {
    const searchInput = document.getElementById('pokemonSearch');
    const sortInput = document.getElementById('pokemonSort');
    const clearBtn = document.getElementById('pokemonClear');
    const tbody = document.getElementById('pokemonTableBody');
    let searchTimer = null;

    function updatePokemonUI() {
        const filtered = getFilteredPokemonRows(browserState.pokemon.searchQuery);
        renderPokemonTable(sortPokemonRows(filtered, browserState.pokemon.sortMode), browserState.pokemon.searchQuery);
    }

    function schedulePokemonUpdate() {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(updatePokemonUI, 150);
    }

    updatePokemonUI();

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            browserState.pokemon.searchQuery = this.value.toLowerCase().trim();
            schedulePokemonUpdate();
        });
    }

    if (sortInput) {
        sortInput.addEventListener('change', function () {
            browserState.pokemon.sortMode = this.value;
            updatePokemonUI();
        });
    }

    if (clearBtn && searchInput && sortInput) {
        clearBtn.addEventListener('click', function () {
            browserState.pokemon.searchQuery = '';
            browserState.pokemon.sortMode = 'name-asc';
            searchInput.value = '';
            sortInput.value = 'name-asc';
            updatePokemonUI();
        });
    }

    if (tbody) {
        tbody.addEventListener('click', function (event) {
            const toggleButton = event.target.closest('[data-pokemon-toggle]');
            if (toggleButton) {
                const name = decodeURIComponent(toggleButton.dataset.pokemonToggle);
                togglePokemonRow(name);
                return;
            }

            const row = event.target.closest('tr[data-pokemon-name]');
            if (!row) return;
            if (event.target.closest('button, a, input, select, textarea')) return;
            togglePokemonRow(row.dataset.pokemonName);
        });
    }
}

function refreshPokemonTable() {
    const filtered = getFilteredPokemonRows(browserState.pokemon.searchQuery);
    renderPokemonTable(sortPokemonRows(filtered, browserState.pokemon.sortMode), browserState.pokemon.searchQuery);
}

document.addEventListener('DOMContentLoaded', function () {
    ensureLanguageToggleButton();
    applyStaticTranslations();
    initProficiencyBrowser();
    initPokemonBrowser();
});
