"""Generate WebP delivery assets; keep original PNGs and full-size gallery links.

Requires Pillow. Run from any directory: python tools/optimize-site-images.py
The manifest preserves source paths so reruns regenerate existing derivatives.
"""
from pathlib import Path
from PIL import Image
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'optimized-images'
OUTPUT.mkdir(exist_ok=True)
manifest_path = OUTPUT / 'manifest.json'
manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
documents = list(ROOT.glob('*.html')) + [ROOT / 'padventures.css']
sources = set(manifest)
for document in documents:
    text = document.read_text(encoding='utf-8')
    sources.update(re.findall(r'(?:src=["\']|url\(["\']?)([^"\'\)]+\.png)', text))

for source in sorted(sources):
    original = ROOT / source.lstrip('/')
    if not original.is_file() or original.stat().st_size < 100_000:
        continue
    image = Image.open(original)
    # Full screenshots and diagrams retain their exact pixels. Only delivery
    # versions of the gallery/banner/hero are scaled; originals remain intact.
    display_variant = source.lstrip('/').startswith('guild-quests/') or original.name in ['BannerSilvarion.png', 'hero-main.png', 'hero-bottom.png']
    if display_variant:
        image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
    fingerprint = hashlib.sha256(original.read_bytes()).hexdigest()[:10]
    target = OUTPUT / f'{original.stem}-{fingerprint}.webp'
    image.save(target, 'WEBP', lossless=not display_variant, quality=90, method=6)
    if target.stat().st_size >= original.stat().st_size:
        target.unlink()
        continue
    manifest[source] = {'path': 'optimized-images/' + target.name, 'width': image.width, 'height': image.height}

for document in documents:
    text = document.read_text(encoding='utf-8')
    for source, asset in manifest.items():
        prefix = '/' if source.startswith('/') else ''
        replacement = prefix + asset['path']
        if document.suffix == '.html':
            # Only src/data-src attributes: never replace original-view links.
            text = re.sub(r'((?:data-)?src=["\'])' + re.escape(source) + r'(["\'])', lambda m: m[1] + replacement + m[2], text)
        else:
            text = text.replace("url('" + source + "')", "url('" + replacement + "')")
    document.write_text(text, encoding='utf-8')
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Generated {len(manifest)} optimized image references')
