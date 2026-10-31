"""Diagnostic only: execute maintenance workflows in isolated temporary copies.

Run: python tools/admin-performance-investigation.py
Requires Pillow and Node. Writes only docs/admin-performance-results.json here.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageChops, ImageSequence, __version__ as pillow_version
import hashlib
import importlib.util
import json
import platform
import re
import shutil
import statistics
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
RESULTS = {'environment': {'python': sys.version.split()[0], 'pillow': pillow_version, 'platform': platform.platform(), 'scope': 'local temporary copies; no deployment or production writes'}}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def run(args, cwd):
    start = time.perf_counter()
    result = subprocess.run(args, cwd=cwd, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=600)
    return {'seconds': time.perf_counter()-start, 'exitCode': result.returncode, 'stdout': result.stdout.strip(), 'stderr': result.stderr.strip()}

def copy(relative, target):
    dest = target / relative
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / relative, dest)

def proficiency():
    with TemporaryDirectory(prefix='fairylegion-prof-') as folder:
        work = Path(folder)
        for name in ['generate_proficiency_data.py','proficiencyFinal.lua','proficiency-test.lua']: copy(name, work)
        trials = [run([sys.executable, 'generate_proficiency_data.py'], work) for _ in range(3)]
        outputs = ['proficiency-pokemon-data.js','pokemon-proficiency-level-data.js']
        identical = {name: digest(work/name)==digest(ROOT/name) for name in outputs}
        source = (work/'proficiencyFinal.lua').read_text(encoding='utf-8')
        position = source.index('PROFICIENCY_OPTIONS')
        tail, count = re.subn(r'\bPROFICIENCY_[A-Z0-9_]+\b', 'PROFICIENCY_AUDIT_UNKNOWN', source[position+len('PROFICIENCY_OPTIONS'):], count=1)
        (work/'proficiencyFinal.lua').write_text(source[:position+len('PROFICIENCY_OPTIONS')]+tail, encoding='utf-8')
        invalid = run([sys.executable,'generate_proficiency_data.py'],work)
        return {'trials':trials,'medianSeconds':statistics.median(t['seconds'] for t in trials),'baselineOutputIdentical':identical,'unknownConstantInjection':{'injections':count,'exitCode':invalid['exitCode'],'warningLines':[line for line in invalid['stdout'].splitlines() if 'WARNING' in line][:5],'outputsChanged':{name:digest(work/name)!=digest(ROOT/name) for name in outputs}}}

def types():
    with TemporaryDirectory(prefix='fairylegion-types-') as folder:
        work = Path(folder)
        for name in ['tools/generate-pokemon-types.cjs','PokeDuel-Script.js','BugNet.js','FieryFisherRod.js','GhostDetector.js','IceHammer.js','LeadPickaxe.js','MagneticDetector.js']: copy(name,work)
        trials = [run(['node','tools/generate-pokemon-types.cjs'],work) for _ in range(3)]
        return {'trials':trials,'medianSeconds':statistics.median(t['seconds'] for t in trials),'baselineOutputIdentical':digest(work/'pokemon-types.json')==digest(ROOT/'pokemon-types.json')}

def images():
    with TemporaryDirectory(prefix='fairylegion-images-') as folder:
        work = Path(folder)
        manifest = json.loads((ROOT/'optimized-images/manifest.json').read_text())
        names = {'tools/optimize-site-images.py','optimized-images/manifest.json','padventures.css'}
        names.update(p.name for p in ROOT.glob('*.html'))
        names.update(source.lstrip('/') for source in manifest)
        names.update(asset['path'] for asset in manifest.values())
        for name in names: copy(name,work)
        before = {str(p.relative_to(work)): (digest(p), p.stat().st_mtime_ns) for p in work.rglob('*') if p.is_file() and p.suffix in ['.webp','.html','.css','.json']}
        result = run([sys.executable,'-m','cProfile','-o','optimizer.prof','tools/optimize-site-images.py'],work)
        import pstats
        stats = pstats.Stats(str(work/'optimizer.prof'))
        hottest = sorted(stats.stats.items(), key=lambda item:item[1][3],reverse=True)[:12]
        rewritten = [name for name,(_,mtime) in before.items() if (work/name).stat().st_mtime_ns != mtime]
        changed = [name for name,(hash,_) in before.items() if digest(work/name)!=hash]
        return {'unchangedInputRun':result,'filesRewritten':len(rewritten),'contentChanged':changed,'webpFilesRewritten':sum(name.endswith('.webp') for name in rewritten),'topCumulativeCalls':[{'file':Path(key[0]).name,'line':key[1],'function':key[2],'calls':value[1],'cumulativeSeconds':value[3]} for key,value in hottest]}

def stale_derivative():
    with TemporaryDirectory(prefix='fairylegion-invalidation-') as folder:
        work=Path(folder)
        copy('tools/optimize-site-images.py',work)
        image=Image.open(ROOT/'ColeccionSilvarion/BannerSilvarion.png')
        image.save(work/'banner.png')
        (work/'index.html').write_text('<img src="banner.png">',encoding='utf-8')
        (work/'padventures.css').write_text('',encoding='utf-8')
        first=run([sys.executable,'tools/optimize-site-images.py'],work)
        old=json.loads((work/'optimized-images/manifest.json').read_text())['banner.png']['path']
        image.putpixel((0,0),(255,0,255))
        image.save(work/'banner.png')
        second=run([sys.executable,'tools/optimize-site-images.py'],work)
        new=json.loads((work/'optimized-images/manifest.json').read_text())['banner.png']['path']
        html=(work/'index.html').read_text()
        return {'firstExit':first['exitCode'],'secondExit':second['exitCode'],'newDerivativeCreated':new!=old and (work/new).exists(),'htmlStillReferencesOldDerivative':old in html,'htmlReferencesNewDerivative':new in html,'oldDerivativeRetained':(work/old).exists()}

def trim():
    spec=importlib.util.spec_from_file_location('trim',ROOT/'trim_silvarion_images.py')
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    def vector(image, white, alpha):
        r,g,b,a=image.split()
        lookup=[255 if value < white else 0 for value in range(256)]
        rgb=ImageChops.lighter(ImageChops.lighter(r.point(lookup),g.point(lookup)),b.point(lookup))
        opacity=a.point([255 if value > alpha else 0 for value in range(256)])
        return ImageChops.darker(rgb,opacity).getbbox() or opacity.getbbox()
    samples=['ColeccionSilvarion/BannerSilvarion.png','ColeccionSilvarion/shinyDitto.gif','PokeLegion/Pokemon/pikachu.png']
    rows=[]
    for name in samples:
        with Image.open(ROOT/name) as image: rgba=image.convert('RGBA')
        timings={}
        boxes=[]
        for label,fn in [('current',module.detect_foreground_bbox),('prototype',vector)]:
            runs=[]
            for _ in range(3):
                start=time.perf_counter();box=fn(rgba,248,10);runs.append(time.perf_counter()-start)
            timings[label]=statistics.median(runs);boxes.append(box)
        rows.append({'image':name,'size':rgba.size,'medianSeconds':timings,'bboxIdentical':boxes[0]==boxes[1]})
    gifs=[]
    for file in (ROOT/'ColeccionSilvarion').glob('*.gif'):
        with Image.open(file) as image:
            frames=getattr(image,'n_frames',1)
            gifs.append({'file':file.relative_to(ROOT).as_posix(),'frames':frames,'width':image.width,'height':image.height,'rgbaFrameBytesLowerBound':frames*image.width*image.height*4})
    return {'firstFrameBBoxMicrobenchmarks':rows,'gifs':len(gifs),'largestRGBAFrameSets':sorted(gifs,key=lambda row:-row['rgbaFrameBytesLowerBound'])[:5],'prototypeScope':'bbox computation only; not full animated crop/encode; not an implemented replacement'}

def inventory():
    files=[p for p in ROOT.rglob('*') if p.is_file() and not any(part.startswith('.') for part in p.relative_to(ROOT).parts)]
    html=(ROOT/'coleccion-silvarion.html').read_text(encoding='utf-8')
    return {'nonHiddenFiles':len(files),'nonHiddenBytes':sum(p.stat().st_size for p in files),'rootHTMLPages':len(list(ROOT.glob('*.html'))),'silvarionCollectionBytes':len(html.encode()),'silvarionPokemonCardOccurrences':len(re.findall(r'class="pokemon-card"',html)),'gitObjectStats':run(['git','count-objects','-v'],ROOT),'recent30CommitSubjects':run(['git','log','-30','--format=%s'],ROOT)['stdout'].splitlines()}

if __name__=='__main__':
    RESULTS['inventory']=inventory()
    # Independent workflows use separate scratch copies. No production writes.
    with ThreadPoolExecutor(max_workers=3) as pool:
        jobs={name:pool.submit(fn) for name,fn in [('imageOptimizer',images),('proficiencyGenerator',proficiency),('typeGenerator',types)]}
        for name,job in jobs.items():
            RESULTS[name]=job.result();print(name,json.dumps(RESULTS[name]),flush=True)
    RESULTS['derivativeInvalidation']=stale_derivative();print('derivativeInvalidation',json.dumps(RESULTS['derivativeInvalidation']),flush=True)
    RESULTS['spriteTrimming']=trim();print('spriteTrimming',json.dumps(RESULTS['spriteTrimming']),flush=True)
    output=ROOT/'docs/admin-performance-results.json';output.write_text(json.dumps(RESULTS,indent=2),encoding='utf-8')
    print('Results:',output,flush=True)
