"""Prepare the static site for GitHub Pages' repository subdirectory."""
from pathlib import Path
import re
import shutil
import os
import hashlib
root = Path(__file__).resolve().parents[1]
out = root / '_site'
out.mkdir(exist_ok=True)
prefix = os.environ.get('SITE_BASE_PATH', '/smile-dental-care/').rstrip('/')
for name in ['index.html', 'style.css', 'script.js', 'detail.css', 'assets', 'brand', 'clinics', 'international', 'services']:
    src = root / name
    dst = out / name
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
    else:
        shutil.copy2(src, dst)
for path in out.rglob('*'):
    if path.suffix in {'.html', '.css', '.js', '.json', '.svg'}:
        text = path.read_text()
        text = re.sub(r'''(["'(])/(?=[A-Za-z#]|["'])''', lambda m: m.group(1) + prefix + '/', text)
        path.write_text(text)
(out / '.nojekyll').touch()
print('Prepared GitHub Pages site at', out)

# Fingerprint linked scripts/styles so browsers do not retain a stale switcher.
for path in out.rglob('*.html'):
    text = path.read_text()
    def version_asset(match):
        url = match.group(2)
        relative = url.removeprefix(prefix + '/')
        asset = out / relative
        if not asset.is_file():
            return match.group(0)
        digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
        return match.group(1) + url + '?v=' + digest + match.group(3)
    text = re.sub(r"""(\b(?:src|href)=["'])([^"']+\.(?:js|css))(["'])""", version_asset, text)
    path.write_text(text)
