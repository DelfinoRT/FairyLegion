const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { extractToken, snapshotFromProfile, updateSnapshot } = require('./update-guild-snapshot.cjs');

const profile = {
    id: 'a3cc8b7b0c895b3dbe60f588a5e0cfd8',
    worldId: 0,
    worldName: 'Diamond',
    name: 'FAIRY LEGION',
    leaderName: 'Nemesis',
    level: 5,
    gexp: '22496414',
    points: 0,
    members: 1300,
    online: 11,
    createdAt: 1609622962,
    open: true,
    terms: { rankName: 'Member', tax: 20, effectiveTax: 20, minimumLevel: 1, requirements: '' },
    description: 'Un gremio',
    languages: ['Español'],
    tags: ['Social'],
    ignored: 'no publicar'
};

test('extrae el token de los datos de sesión oficiales', () => {
    assert.equal(extractToken('<section data-bootstrap="{&quot;csrfToken&quot;:&quot;abc123&quot;}">'), 'abc123');
    assert.throws(() => extractToken('<section>'), /token de sesión/);
});

test('conserva únicamente los campos públicos esperados', () => {
    const snapshot = snapshotFromProfile(profile, '2026-11-06T00:00:00.000Z');
    assert.equal(snapshot.name, 'FAIRY LEGION');
    assert.equal(snapshot.online, 11);
    assert.equal(snapshot.recruiting, true);
    assert.equal(snapshot.ignored, undefined);
});

test('rechaza respuestas equivocadas o incompletas', () => {
    for (const changes of [{ id: 'incorrecto' }, { worldId: 2 }, { members: null },
        { online: -1 }, { languages: null }, { open: 'true' }, { gexp: 'invalid' }, { terms: null }]) {
        assert.throws(() => snapshotFromProfile({ ...profile, ...changes }, '2026-11-06T00:00:00.000Z'), /perfil válido/);
    }
});

test('recoge solo habilidades generales y todas sus páginas', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'guild-test-'));
    const destination = path.join(dir, 'guild.json');
    const skill = id => ({ id, name: id, tier: 0, maximum: 3, bonus: 0, nextBonus: 5, cost: 1, requiredLevel: 5 });
    const requests = [];
    try {
        await updateSnapshot({
            destination,
            request: async (url, options) => {
                if (!options.method) return {
                    ok: true, text: async () => '<section data-bootstrap="{&quot;csrfToken&quot;:&quot;abc123&quot;}">',
                    headers: { getSetCookie: () => ['PHPSESSID=test; path=/'] }
                };
                const body = JSON.parse(options.body);
                requests.push(body);
                if (body.hook === 'skills.get') assert.equal(body.payload.family, 'General');
                const data = body.hook === 'profile.get' ? profile :
                        { available: true, items: [skill(`general-${body.payload.cursor}`)], pageInfo: {
                            cursor: body.payload.cursor, next: body.payload.cursor === 1 ? 2 : null, total: 2
                        } };
                return { ok: true, json: async () => ({ ok: true, result: { ok: true, data } }) };
            }
        });
        const snapshot = JSON.parse(await fs.readFile(destination, 'utf8'));
        assert.deepEqual(snapshot.skills.general.map(item => item.id), ['general-1', 'general-2']);
        assert.equal(snapshot.skills.typeCatch, undefined);
        assert.equal(snapshot.skills.general[0].bonus, 0);
        assert.deepEqual(requests.map(body => body.requestId), ['web:1:1', 'web:1:2', 'web:1:3']);
    } finally {
        await fs.rm(destination, { force: true });
        await fs.rmdir(dir);
    }
});

test('mantiene la copia anterior si la consulta o validación falla', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'guild-test-'));
    const destination = path.join(dir, 'guild.json');
    await fs.writeFile(destination, 'copia anterior');
    try {
        const page = {
            ok: true,
            text: async () => '<section data-bootstrap="{&quot;csrfToken&quot;:&quot;abc123&quot;}">',
            headers: { getSetCookie: () => ['PHPSESSID=test; path=/'] }
        };
        for (const response of [
            { ok: false, status: 500 },
            { ok: true, json: async () => ({ ok: true, result: { ok: true, data: {} } }) }
        ]) {
            let calls = 0;
            await assert.rejects(updateSnapshot({
                destination,
                request: async () => calls++ === 0 ? page : response
            }));
            assert.equal(await fs.readFile(destination, 'utf8'), 'copia anterior');
        }
        let calls = 0;
        await assert.rejects(updateSnapshot({
            destination,
            request: async () => {
                calls++;
                if (calls === 1) return page;
                if (calls === 2) return { ok: true, json: async () => ({ ok: true, result: { ok: true, data: profile } }) };
                return { ok: true, json: async () => ({ ok: true, result: { ok: true, data: {
                    available: true, items: [], pageInfo: { cursor: 1, total: 1, next: null }
                } } }) };
            }
        }), /incompleta/);
        assert.equal(await fs.readFile(destination, 'utf8'), 'copia anterior');
    } finally {
        await fs.rm(destination, { force: true });
        await fs.rmdir(dir);
    }
});
