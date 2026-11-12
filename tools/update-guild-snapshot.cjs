const fs = require('node:fs/promises');
const path = require('node:path');

const origin = 'https://www.padventures.org';
const guildId = 'a3cc8b7b0c895b3dbe60f588a5e0cfd8';
const profileUrl = `${origin}/index.php/guildsystem/index/0/${guildId}`;
const apiUrl = `${origin}/index.php/guildsystem/api`;
const outputPath = path.join(__dirname, '..', 'data', 'guild.json');
const userAgent = 'FairyLegionGuildSnapshot/1.0 (+https://www.fairylegion.com/)';

function extractToken(html) {
    const bootstrap = html.match(/data-bootstrap="([^"]+)"/);
    const token = bootstrap && bootstrap[1].match(/&quot;csrfToken&quot;:&quot;([a-f0-9]+)&quot;/i);
    if (!token) throw new Error('No se encontró el token de sesión en la página oficial.');
    return token[1];
}

function snapshotFromProfile(profile, updatedAt) {
    if (!profile || profile.id !== guildId || profile.worldId !== 0 ||
        typeof profile.name !== 'string' || !profile.name.trim() ||
        typeof profile.worldName !== 'string' || !profile.worldName.trim() ||
        typeof profile.leaderName !== 'string' || !profile.leaderName.trim() ||
        typeof profile.description !== 'string' ||
        typeof profile.gexp !== 'string' || !/^\d+$/.test(profile.gexp) ||
        !['level', 'members', 'online', 'createdAt'].every(key =>
            Number.isSafeInteger(profile[key]) && profile[key] >= 0
        ) ||
        !Number.isSafeInteger(profile.points) || profile.points < 0 ||
        !profile.terms || typeof profile.terms.rankName !== 'string' ||
        typeof profile.terms.requirements !== 'string' ||
        !['tax', 'effectiveTax', 'minimumLevel'].every(key =>
            Number.isSafeInteger(profile.terms[key]) && profile.terms[key] >= 0
        ) ||
        typeof profile.open !== 'boolean' || !Array.isArray(profile.languages) ||
        !profile.languages.every(value => typeof value === 'string') ||
        !Array.isArray(profile.tags) || !profile.tags.every(value => typeof value === 'string') ||
        Number.isNaN(Date.parse(updatedAt))) {
        throw new Error('La respuesta oficial no contiene un perfil válido del gremio.');
    }

    return {
        updatedAt,
        name: profile.name,
        world: profile.worldName,
        leader: profile.leaderName,
        level: profile.level,
        experience: profile.gexp,
        points: profile.points,
        members: profile.members,
        online: profile.online,
        createdAt: profile.createdAt,
        recruiting: profile.open,
        recruitment: {
            rank: profile.terms.rankName,
            tax: profile.terms.tax,
            effectiveTax: profile.terms.effectiveTax,
            minimumLevel: profile.terms.minimumLevel,
            requirements: profile.terms.requirements
        },
        description: profile.description,
        languages: profile.languages,
        tags: profile.tags
    };
}

function validateSkill(skill) {
    if (!skill || typeof skill.id !== 'string' || !skill.id ||
        typeof skill.name !== 'string' || !skill.name ||
        !['tier', 'maximum', 'cost', 'requiredLevel'].every(key =>
            Number.isSafeInteger(skill[key]) && skill[key] >= 0
        ) || skill.maximum === 0 || skill.tier > skill.maximum ||
        !Number.isFinite(skill.bonus) || skill.bonus < 0 ||
        (skill.nextBonus !== undefined && (!Number.isFinite(skill.nextBonus) || skill.nextBonus < 0))) {
        throw new Error('La respuesta oficial contiene una habilidad inválida.');
    }
    return {
        id: skill.id,
        name: skill.name,
        tier: skill.tier,
        maximum: skill.maximum,
        bonus: skill.bonus,
        nextBonus: skill.nextBonus === undefined ? null : skill.nextBonus,
        cost: skill.cost,
        requiredLevel: skill.requiredLevel
    };
}

async function updateSnapshot({ request = fetch, destination = outputPath } = {}) {
    const page = await request(profileUrl, {
        headers: { 'User-Agent': userAgent },
        redirect: 'error',
        signal: AbortSignal.timeout(20000)
    });
    if (!page.ok) throw new Error(`Página oficial: HTTP ${page.status}`);
    const token = extractToken(await page.text());
    const cookies = page.headers.getSetCookie().map(cookie => cookie.split(';', 1)[0]).join('; ');
    if (!cookies) throw new Error('La página oficial no proporcionó una sesión.');

    let sequence = 0;
    async function query(hook, payload) {
        const response = await request(apiUrl, {
            method: 'POST',
            headers: {
                'User-Agent': userAgent,
                'Content-Type': 'application/json',
                'Origin': origin,
                'Referer': profileUrl,
                'Cookie': cookies,
                'X-Guild-CSRF': token
            },
            body: JSON.stringify({
                action: 'query', worldId: '0', characterId: '0', accountScope: '',
                sessionEpoch: '', requestId: `web:1:${++sequence}`, hook,
                payload: { filters: {}, cursor: 1, limit: 20, guildId, visibilityContext: 'public', ...payload }
            }),
            redirect: 'error',
            signal: AbortSignal.timeout(20000)
        });
        if (!response.ok) throw new Error(`API oficial (${hook}): HTTP ${response.status}`);
        const wrapper = await response.json();
        if (wrapper.ok !== true || wrapper.result?.ok !== true) {
            throw new Error(`La API oficial rechazó ${hook}: ${wrapper.error?.message || 'respuesta inválida'}`);
        }
        return wrapper.result.data;
    }
    const snapshot = snapshotFromProfile(await query('profile.get', {}), new Date().toISOString());
    const family = 'General';
    const items = [];
    const seen = new Set();
    let cursor = 1;
    let total;
    do {
        const data = await query('skills.get', { family, cursor });
        const page = data?.pageInfo;
        if (data?.available !== true || !Array.isArray(data.items) ||
            !page || page.cursor !== cursor || !Number.isSafeInteger(page.total) || page.total < 0 ||
            (total !== undefined && total !== page.total) ||
            !(page.next === null || (Number.isSafeInteger(page.next) && page.next > cursor)) ||
            data.items.length > 20 || (page.next !== null && data.items.length === 0)) {
            throw new Error(`La lista de habilidades ${family} está incompleta o es inválida.`);
        }
        total = page.total;
        for (const raw of data.items) {
            const skill = validateSkill(raw);
            if (seen.has(skill.id)) throw new Error(`Habilidad duplicada: ${skill.id}`);
            seen.add(skill.id);
            items.push(skill);
        }
        if (items.length > total) throw new Error(`La lista de habilidades ${family} excede el total.`);
        cursor = page.next;
    } while (cursor !== null);
    if (items.length !== total) throw new Error(`La lista de habilidades ${family} está incompleta.`);
    snapshot.skills = { general: items };
    snapshot.updatedAt = new Date().toISOString();
    await fs.mkdir(path.dirname(destination), { recursive: true });
    const temporaryPath = `${destination}.${process.pid}.tmp`;
    try {
        await fs.writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
        await fs.rename(temporaryPath, destination);
    } finally {
        await fs.rm(temporaryPath, { force: true });
    }
    console.log(`Perfil actualizado: ${snapshot.name} (${snapshot.updatedAt}).`);
}

if (require.main === module) {
    updateSnapshot().catch(error => {
        const cause = error.cause && (error.cause.code || error.cause.message);
        console.error('No se actualizó la copia del gremio:', error.message + (cause ? ` (${cause})` : ''));
        process.exitCode = 1;
    });
}

module.exports = { extractToken, snapshotFromProfile, updateSnapshot };
