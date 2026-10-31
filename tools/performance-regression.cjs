// Requires Playwright via NODE_PATH, like performance-audit.cjs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml','.json':'application/json'};
const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
    fs.readFile(file, (error, data) => {
        if (error) return res.writeHead(404).end();
        res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
        res.end(data);
    });
});
(async () => {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const browser = await chromium.launch({executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true});
    const base = `http://127.0.0.1:${server.address().port}`;
    const errors = [];
    const failures = [];
    async function open(name, offline = false) {
        const context = await browser.newContext({viewport:{width:1280,height:800}, reducedMotion:'reduce'});
        const page = await context.newPage();
        page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
        page.on('response', r => {if(r.url().startsWith(base) && r.status() >= 400) failures.push(r.url());});
        if (offline) await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
        await page.goto(`${base}/${name}`, {waitUntil:'load'});
        return {context, page};
    }
    try {
        {
            const {context, page} = await open('index.html');
            await page.waitForTimeout(300);
            assert.equal(await page.locator('.gallery img[src]').count(), 0, 'offscreen gallery should not load');
            assert.equal(await page.locator('audio').getAttribute('preload'), 'none');
            await page.locator('.gallery').scrollIntoViewIfNeeded();
            await page.waitForFunction(() => document.querySelector('.gallery img.active').naturalWidth > 0);
            assert.equal(await page.locator('.gallery img[src]').count(), 1);
            const first = await page.locator('.gallery img.active').getAttribute('data-original');
            assert.equal(await page.locator('#gallery-original').getAttribute('href'), first);
            await page.evaluate(() => prevImage());
            assert.equal(await page.locator('#currentImage').textContent(), '33');
            await page.waitForFunction(() => document.querySelector('.gallery img.active').naturalWidth > 0);
            await page.evaluate(() => nextImage());
            assert.equal(await page.locator('#currentImage').textContent(), '1');
            assert.equal(await page.locator('.gallery img[src]').count(), 2, 'only visited slides load');
            await page.locator('.gallery img.active').evaluate(img=>img.decode());
            await page.screenshot({path:path.join(root,'docs/homepage-after.png')});
            await context.close();
            console.log('PASS homepage deferred loading, wrapping navigation, original links');
        }
        {
            const {context, page} = await open('daily-tasks.html', true);
            assert.equal(await page.locator('.pokemon-task').count(), 36);
            assert.equal(await page.locator('.map-image[src]').count(), 0);
            await page.locator('#pokemon-search').pressSequentially('ala', {delay:20});
            assert.equal(await page.locator('.pokemon-task:visible').count(), 1);
            assert.equal(await page.locator('.pokemon-task:visible h3').textContent(), 'Alakazam');
            await page.locator('.pokemon-task:visible .show-map-btn').click();
            await page.waitForFunction(() => document.querySelector('.map-image[src]').naturalWidth > 0);
            assert.equal(await page.locator('.map-image[src]').count(), 1);
            await page.locator('#pokemon-search').fill('<missing>');
            assert.equal(await page.locator('.pokemon-task:visible').count(), 0);
            assert.match(await page.locator('.error-message').textContent(), /<missing>/);
            await page.locator('#clear-search-btn').click();
            assert.equal(await page.locator('.pokemon-task:visible').count(), 36);
            await page.evaluate(async () => {
                for(const img of document.querySelectorAll('.pokemon-task > img')) {img.loading='eager'; await img.decode();}
            });
            assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').filter(r=>r.name.includes('pokeapi.co')).length),0);
            await context.close();
            console.log('PASS Daily Tasks offline content, all sprites, filtering, map loading, no API requests');
        }
        {
            const {context, page} = await open('coleccion-silvarion.html');
            await page.waitForFunction(() => document.querySelectorAll('.pokemon-card .type-icon').length > 100);
            assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').filter(r=>/\/(PokeDuel-Script|BugNet|FieryFisherRod|GhostDetector|IceHammer|LeadPickaxe|MagneticDetector)\.js$/.test(r.name)).length),0);
            assert.equal(await page.locator('.banner-silvarion-img').evaluate(img=>img.naturalWidth>0),true);
            await page.waitForTimeout(1100);
            await page.screenshot({path:path.join(root,'docs/collection-after.png')});
            await context.close();
            console.log('PASS collection type manifest and optimized banner');
        }
        {
            const {context, page} = await open('Proficiency.html');
            assert.equal(await page.locator('#pokemonTableBody .pokemon-result-row').count(), 25);
            assert.equal(await page.locator('#profTableBody > tr').count(), 25);
            assert.ok(await page.locator('*').count() < 5000);
            const first = await page.locator('.pokemon-result-row').first().getAttribute('data-pokemon-name');
            await page.locator('#pokemon-pagination button').last().click();
            assert.notEqual(await page.locator('.pokemon-result-row').first().getAttribute('data-pokemon-name'), first);
            await page.locator('#pokemon-pagination button').first().click();
            assert.equal(await page.locator('.pokemon-result-row').first().getAttribute('data-pokemon-name'), first);
            await page.evaluate(() => window.retainedRow = document.querySelectorAll('.pokemon-result-row')[1]);
            await page.locator('.pokemon-toggle-row').first().click();
            assert.equal(await page.locator('.pokemon-detail-row').count(), 1);
            assert.equal(await page.evaluate(() => window.retainedRow === document.querySelectorAll('.pokemon-result-row')[1]), true);
            await page.locator('.pokemon-toggle-row').first().click();
            assert.equal(await page.locator('.pokemon-detail-row').count(), 0);
            const toggle = page.locator('#profTableBody .pokemon-toggle').first();
            const tagsId = await toggle.getAttribute('aria-controls');
            assert.equal(await page.locator(`#${tagsId} > span`).count(), 5);
            await toggle.click();
            assert.ok(await page.locator(`#${tagsId} > span`).count() > 5);
            await toggle.click();
            assert.equal(await page.locator(`#${tagsId} > span`).count(), 5);
            await page.locator('#pokemonSearch').fill('pikachu');
            await page.waitForTimeout(220);
            assert.equal(await page.locator('.pokemon-result-row').count(), await page.evaluate(() => getFilteredPokemonRows('pikachu').length));
            await page.locator('#pokemonClear').click();
            await page.locator('#pokemonSort').selectOption('name-desc');
            const sorted = await page.locator('.pokemon-result-row').first().getAttribute('data-pokemon-name');
            assert.equal(sorted, await page.evaluate(() => sortPokemonRows(getFilteredPokemonRows(''), 'name-desc')[0].name));
            await page.locator('#languageToggle').click();
            assert.match(await page.locator('#pokemon-pagination').textContent(), /Page 1/);
            await page.locator('#pokemonSearch').fill('zzzz-no-result');
            await page.waitForTimeout(220);
            assert.equal(await page.locator('.pokemon-result-row').count(), 0);
            assert.equal(await page.locator('#pokemon-pagination button:disabled').count(), 2);
            await context.close();
            console.log('PASS Proficiency bounded DOM, paging, incremental expansion, search, sort, translation, empty results');
        }
        {
            const {context, page} = await open('pesca.html');
            assert.ok(await page.locator('.pokemon-grid-card').count()>100);
            assert.equal(await page.locator('#pokemon-grid').evaluate(grid=>Math.round(grid.getBoundingClientRect().height)),420);
            await page.locator('#pokemon-search-grid').fill('magikarp');
            assert.match(await page.locator('.pokemon-grid-card').first().textContent(),/Magikarp/);
            await page.locator('.pokemon-grid-card').first().click();
            assert.match(await page.locator('#pokemon-info h3').textContent(),/Magikarp/);
            await context.close();
            console.log('PASS fishing scrollable picker, search, and selection');
        }
        {
            const context = await browser.newContext({viewport:{width:390,height:844}});
            const page = await context.newPage();
            page.on('pageerror', e => errors.push(`PokeLegion: ${e.message}`));
            await page.addInitScript(() => {
                window.activeAuditIntervals = new Set();
                window.auditResizeListeners = new Set();
                const interval = window.setInterval, clear = window.clearInterval;
                window.setInterval = (...args) => {const id=interval(...args);activeAuditIntervals.add(id);return id;};
                window.clearInterval = id => {activeAuditIntervals.delete(id);return clear(id);};
                const add = window.addEventListener, remove = window.removeEventListener;
                window.addEventListener = function(type, listener, options) {if(type==='resize')auditResizeListeners.add(listener);return add.call(this,type,listener,options);};
                window.removeEventListener = function(type, listener, options) {if(type==='resize')auditResizeListeners.delete(listener);return remove.call(this,type,listener,options);};
            });
            await page.goto(`${base}/PokeLegion.html`,{waitUntil:'load'});
            await page.locator('#playerName').fill('Performance Test');
            await page.locator('.avatar-choice').first().evaluate(button => button.click());
            await page.evaluate(() => document.querySelectorAll('.starter-choice.selected').forEach(button=>button.classList.remove('selected')));
            for(let i=0;i<3;i++) await page.locator('.starter-choice').nth(i).evaluate(button => button.click());
            await page.locator('#createBtn').click();
            await page.waitForFunction(() => window.PokeLegion?.player()?.name === 'Performance Test', null, {timeout:3000}).catch(async error => {
                console.log('Trainer creation diagnostic', await page.evaluate(() => ({name:document.getElementById('playerName').value, avatars:document.querySelectorAll('.avatar-choice.selected').length, starters:document.querySelectorAll('.starter-choice.selected').length, player:window.PokeLegion?.player(), text:document.body.innerText.slice(-1600)})));
                throw error;
            });
            const result = await page.evaluate(() => {
                const player = PokeLegion.player();
                player.tasksCycleStartedAt = Date.now(); player.tasksChosenCount = 2;
                const intervals = activeAuditIntervals.size, resize = auditResizeListeners.size;
                for(let i=0;i<50;i++) {
                    Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Manage Tasks').click();
                    Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Close').click();
                }
                return {intervals, afterIntervals:activeAuditIntervals.size, resize};
            });
            assert.equal(result.afterIntervals,result.intervals,'Tasks should not retain intervals');
            await page.setViewportSize({width:1280,height:900});
            await page.locator('#depotBtn').click();
            await page.evaluate(() => {
                const input=document.querySelector('#depotRoot input[type=search]');
                for(let i=0;i<100;i++) {input.value=i%2?'a':'';input.dispatchEvent(new Event('input'));}
            });
            assert.equal(await page.evaluate(() => auditResizeListeners.size),result.resize,'Depot renders should not register resize callbacks');
            await page.locator('#depotBackTop').click();
            assert.equal(await page.locator('#depotRoot').count(),0);
            assert.equal(await page.evaluate(() => auditResizeListeners.size),result.resize);
            await context.close();
            console.log('PASS PokeLegion trainer creation, 50 task dialog cycles, 100 depot searches, timer/listener cleanup');
        }
        assert.deepEqual(errors, [], 'uncaught script errors');
        assert.deepEqual(failures, [], 'missing local resources');
    } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
