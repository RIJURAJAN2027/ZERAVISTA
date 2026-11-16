import json, sys
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
S = sys.argv[1]; OUT = sys.argv[2]
d = json.load(open(S + '/page.json'))
full = Image.open(S + '/page.png').convert('RGB')
K = full.size[0] / 1440            # device pixels per CSS pixel
arr = np.asarray(full)

# blocks: hero, clients, then each section; each runs to the next block's start
starts = [(0, 'hero', []), (900, 'clients', [])] + [(s['box'][0], s['cls'], s['cuts']) for s in d['sections']]
starts.sort()
blocks = []
for i, (y0, name, cuts) in enumerate(starts):
    y1 = starts[i + 1][0] if i + 1 < len(starts) else d['height']
    blocks.append((name, y0, y1, sorted(c for c in set(cuts) if y0 + 150 < c < y1 - 150)))

MAX_GAP, KEEP = 150, 80             # CSS px: blank bands taller than MAX_GAP shrink to KEEP

def rows_blank(a):
    a = a.astype(np.int16)
    return (a.max(axis=1) - a.min(axis=1)).max(axis=1) < 3

def squeeze(y0, y1):
    """Crop [y0,y1) and shrink tall blank bands. Returns image."""
    a = arr[int(y0 * K):int(y1 * K)]
    blank = rows_blank(a)
    keep = np.ones(len(a), bool)
    i = 0
    while i < len(a):
        if blank[i]:
            j = i
            while j < len(a) and blank[j]: j += 1
            if (j - i) > MAX_GAP * K:
                lo = i + int(KEEP * K / 2); hi = j - int(KEEP * K / 2)
                # keep the blank band at the very top/bottom short too
                if i == 0: lo = i + int(KEEP * K / 2) - int(KEEP * K / 2) + int(40 * K); hi = j
                if j == len(a): lo = i + int(KEEP * K / 2); hi = j
                keep[lo:hi] = False
            i = j
        else:
            i += 1
    return Image.fromarray(a[keep])

# split tall blocks at child boundaries into pieces no taller than LIMIT
LIMIT = 2000
pieces = []
for name, y0, y1, cuts in blocks:
    cur = y0
    while y1 - cur > LIMIT * 1.15:
        options = [c for c in cuts if cur + 500 < c <= cur + LIMIT]
        if not options: break
        nxt = max(options); pieces.append((name, cur, nxt)); cur = nxt
    pieces.append((name, cur, y1))

imgs = [(n, squeeze(a, b)) for n, a, b in pieces]
for n, im in imgs: print(n, round(im.size[1] / K))

# pack pieces onto pages, top to bottom, without exceeding PAGE (CSS px)
PAGE = 2040
pages, cur, h = [], [], 0
for n, im in imgs:
    ih = im.size[1] / K
    if n == 'hero':                      # the hero is the cover, on its own
        pages.append([im]); continue
    if cur and h + ih > PAGE:
        pages.append(cur); cur, h = [], 0
    cur.append(im); h += ih
if cur: pages.append(cur)

out = []
for pg in pages:
    H = sum(i.size[1] for i in pg)
    c = Image.new('RGB', (full.size[0], H), 'white'); y = 0
    for i in pg: c.paste(i, (0, y)); y += i.size[1]
    out.append(c)
print('pages', len(out), [round(o.size[1] / K) for o in out])
dpi = full.size[0] / (1440 / 96 * 0.75) * 0.75  # keep 1 CSS px = 0.75 pt wide... set below
# page width 1440 CSS px shown at 96 dpi would be 15 inches; use resolution so width = 15in
res = full.size[0] / 15.0
out[0].save(OUT, 'PDF', save_all=True, append_images=out[1:], resolution=res, quality=88)
for k, o in enumerate(out):
    o.resize((o.size[0] // 6, o.size[1] // 6)).save(f'{S}/prev-{k:02d}.png')
