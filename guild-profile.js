(() => {
    const status = document.getElementById('guild-status');
    const dataContainer = document.getElementById('guild-data');
    const skillsStatus = document.getElementById('guild-skills-status');
    const skillsContainer = document.getElementById('guild-skills-data');
    const text = (id, value) => { document.getElementById(id).textContent = value; };

    function renderSkills(id, skills) {
        const container = document.getElementById(id);
        if (!skills.length) {
            const empty = document.createElement('p');
            empty.textContent = 'No hay habilidades disponibles en esta categoría.';
            container.appendChild(empty);
            return;
        }
        for (const skill of skills) {
            const card = document.createElement('article');
            card.className = 'guild-skill';
            const title = document.createElement('h4');
            title.textContent = skill.name;
            const bonus = document.createElement('p');
            bonus.className = 'guild-skill__bonus';
            bonus.textContent = `+${skill.bonus}%`;
            const level = document.createElement('p');
            level.textContent = `Rango ${skill.tier} / ${skill.maximum}`;
            const progress = document.createElement('progress');
            progress.max = skill.maximum;
            progress.value = skill.tier;
            progress.setAttribute('aria-label', `Rango de ${skill.name}`);
            const next = document.createElement('p');
            next.className = 'guild-skill__next';
            next.textContent = skill.nextBonus === null ? 'Rango máximo' :
                `Siguiente: +${skill.nextBonus}% · Coste: ${skill.cost} · Nivel requerido: ${skill.requiredLevel}`;
            card.append(title, bonus, level, progress, next);
            container.appendChild(card);
        }
    }

    async function loadGuildProfile() {
        const response = await fetch('/data/guild.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const profile = await response.json();
        const updated = new Date(profile.updatedAt);
        if (typeof profile.name !== 'string' || typeof profile.description !== 'string' ||
            typeof profile.world !== 'string' || typeof profile.leader !== 'string' ||
            typeof profile.experience !== 'string' || !/^\d+$/.test(profile.experience) ||
            !['level', 'members', 'online', 'points', 'createdAt'].every(key => Number.isSafeInteger(profile[key]) && profile[key] >= 0) ||
            !profile.recruitment || typeof profile.recruitment.rank !== 'string' ||
            typeof profile.recruitment.requirements !== 'string' ||
            !['tax', 'effectiveTax', 'minimumLevel'].every(key => Number.isSafeInteger(profile.recruitment[key]) && profile.recruitment[key] >= 0) ||
            typeof profile.recruiting !== 'boolean' || !Array.isArray(profile.languages) ||
            !profile.languages.every(value => typeof value === 'string') ||
            !Array.isArray(profile.tags) || !profile.tags.every(value => typeof value === 'string') ||
            Number.isNaN(updated.getTime())) {
            throw new Error('La copia del perfil no es válida.');
        }

        text('guild-name', profile.name);
        text('guild-description', profile.description);
        text('guild-world', profile.world);
        text('guild-leader', profile.leader);
        text('guild-level', profile.level);
        text('guild-experience', BigInt(profile.experience).toLocaleString('es'));
        text('guild-points', profile.points);
        text('guild-founded', new Intl.DateTimeFormat('es', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(profile.createdAt * 1000)));
        text('guild-members', profile.members.toLocaleString('es'));
        text('guild-online', profile.online.toLocaleString('es'));
        text('guild-recruiting', profile.recruiting ? 'Abierto' : 'Cerrado');
        text('guild-languages', profile.languages.join(', ') || 'No especificados');
        text('guild-tags', profile.tags.join(', ') || 'No especificados');
        text('guild-recruitment-terms', `Rango de ingreso: ${profile.recruitment.rank} · Nivel mínimo: ${profile.recruitment.minimumLevel} · Impuesto configurado: ${profile.recruitment.tax}% · Impuesto efectivo: ${profile.recruitment.effectiveTax}%`);
        text('guild-requirements', profile.recruitment.requirements || 'Sin requisitos escritos.');
        text('guild-updated', `Copia del perfil oficial actualizada el ${new Intl.DateTimeFormat('es', {
            dateStyle: 'long', timeStyle: 'short'
        }).format(updated)}. Los datos no son en tiempo real.`);
        dataContainer.hidden = false;
        status.hidden = true;
        const validSkill = skill => skill && typeof skill.name === 'string' && skill.name &&
            ['tier', 'maximum', 'cost', 'requiredLevel'].every(key => Number.isSafeInteger(skill[key]) && skill[key] >= 0) &&
            skill.maximum > 0 && skill.tier <= skill.maximum && Number.isFinite(skill.bonus) && skill.bonus >= 0 &&
            (skill.nextBonus === null || (Number.isFinite(skill.nextBonus) && skill.nextBonus >= 0));
        if (!profile.skills || !Array.isArray(profile.skills.general) ||
            !profile.skills.general.every(validSkill)) {
            throw new Error('La copia de habilidades no es válida o aún no está disponible.');
        }
        renderSkills('guild-skills-general', profile.skills.general);
        skillsContainer.hidden = false;
        skillsStatus.hidden = true;
    }

    loadGuildProfile().catch(error => {
        console.error('No se pudo cargar el perfil del gremio:', error);
        if (!dataContainer.hidden) {
            skillsStatus.textContent = 'No se pudieron cargar las habilidades. Consulta el registro oficial.';
        } else {
            status.textContent = 'No se pudo cargar la copia del gremio. Consulta el registro oficial.';
            skillsStatus.textContent = 'No se pudieron cargar las habilidades. Consulta el registro oficial.';
        }
    });
})();
