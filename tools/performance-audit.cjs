// Run: NODE_PATH=<directory containing playwright> node tools/performance-audit.cjs
// Serves the checkout on loopback only; does not modify application files.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml','.json':'application/json','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
const server = http.createServer((req,res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => { if(err) {res.writeHead(404).end();return;} res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');res.end(data); });
});
(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const results = [];
  try {
    for (const name of (process.env.AUDIT_PAGES?.split(',') || ['index.html','coleccion-silvarion.html','coleccion-nemesis.html','Proficiency.html','daily-tasks.html','pesca.html','tms.html','BossRaids.html','PokeDuel.html'])) {
      const context = await browser.newContext({viewport:{width:390,height:844}, deviceScaleFactor:1});
      const page = await context.newPage();
      const errors = [], failures = [], requests = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request',r=>requests.push(r.url()));
      page.on('response',r=>{if(r.status()>=400) failures.push({url:r.url(),status:r.status()});});
      await page.addInitScript(() => {
        window.audit = {longTasks:[], lcp:0,cls:0,shiftSources:[]};
        new PerformanceObserver(l=>l.getEntries().forEach(e=>window.audit.longTasks.push(Math.round(e.duration)))).observe({type:'longtask',buffered:true});
        new PerformanceObserver(l=>l.getEntries().forEach(e=>window.audit.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
        new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput) {window.audit.cls+=e.value;window.audit.shiftSources.push({value:e.value,nodes:(e.sources||[]).map(s=>({node:s.node?.outerHTML?.slice(0,250),previous:s.previousRect.toJSON(),current:s.currentRect.toJSON()}))});}})).observe({type:'layout-shift',buffered:true});
      });
      await page.goto(`http://127.0.0.1:${server.address().port}/${name}`,{waitUntil:'domcontentloaded',timeout:30000});
      await page.waitForTimeout(4000);
      const metrics = await page.evaluate(() => ({...window.audit,domNodes:document.querySelectorAll('*').length,images:document.images.length,lazyImages:[...document.images].filter(i=>i.loading==='lazy').length,resources:performance.getEntriesByType('resource').length,localResourceBytes:performance.getEntriesByType('resource').filter(r=>r.name.startsWith(location.origin)).reduce((s,r)=>s+r.decodedBodySize,0),dcl:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,proficiencyRows:document.querySelectorAll('#pokemonTableBody > tr').length}));
      const interactions=[];
      if(name==='daily-tasks.html') {
        const before=requests.length;
        await page.locator('#pokemon-search').pressSequentially('ala',{delay:100});
        await page.waitForTimeout(2000);
        interactions.push({action:'type ala',newRequests:requests.length-before,apiRequests:requests.slice(before).filter(u=>u.includes('pokeapi.co')).length});
      }
      results.push({page:name,...metrics,requests:requests.length,apiRequests:requests.filter(u=>u.includes('pokeapi.co')).length,errors,failures,interactions});
      console.log(name,JSON.stringify(results.at(-1)));
      await context.close();
    }
    fs.writeFileSync(path.join(root,process.env.AUDIT_OUTPUT || 'docs/performance-browser-results.json'),JSON.stringify({environment:'Local uncompressed HTTP, cold context per page, Chrome headless, 390x844, no CPU/network throttling, 4 second observation; external APIs live',results},null,2));
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
