#!/usr/bin/env python3
"""Turn the blue-backdrop dog film into a white-backdrop copy for the light hero.

Reads source/azaka-scrub.mp4 (the original, fetched by `npm run assets`) and writes
public/dog-white.mp4 (all-intra, only the frames the gaze table uses, so the file is a
third of the size), public/dog-white.jpg (the forward-looking frame, used as the poster)
and src/gaze-frames.json (the original table from tools/gaze-frames.source.json with its
times shifted to the trimmed clip).

Needs ffmpeg, numpy and Pillow.   Usage: python3 tools/make-white-dog.py [--frame SECONDS out.png]
"""
import json, subprocess, sys
import numpy as np
from PIL import Image

W, H, FPS = 1280, 720, 24
SRC, OUT, POSTER = 'source/azaka-scrub.mp4', 'public/dog-white.mp4', 'public/dog-white.jpg'
T0, T1 = 6.0, 40.0          # blue-difference key: below T0 is dog, above T1 is backdrop
POSTER_FRAME = 132          # 5.5 s, the forward gaze
FIRST, LAST = 88, 161       # frames kept (the gaze table uses 90 to 159)


def box(a, r):
    """Box blur of a 2-D float array with radius r (integral image, edge-clamped)."""
    if r <= 0:
        return a
    p = np.pad(a, r, mode='edge')
    c = np.cumsum(np.cumsum(p, 0, dtype=np.float64), 1)
    c = np.pad(c, ((1, 0), (1, 0)))
    k = 2 * r + 1
    out = c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]
    return (out / (k * k)).astype(np.float32)


def shadow_map():
    """A soft neutral floor shadow under the dog (the original one is baked into the blue)."""
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    core = 0.30 * np.exp(-(((x - 655) / 200) ** 2 + ((y - 694) / 11) ** 2))
    cast = 0.16 * np.exp(-(((x - 575) / 330) ** 2 + ((y - 696) / 20) ** 2))
    return np.clip(core + cast, 0, 0.45)


TARGET = (255.0 * (1.0 - shadow_map()))[..., None]   # what the backdrop becomes


def process(frame):
    a = frame.astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    key = b - np.maximum(r, g)
    t = np.clip((key - T0) / (T1 - T0), 0, 1)
    alpha_bg = t * t * (3 - 2 * t)                       # smoothstep
    pure = (key >= T1).astype(np.float32)
    # Only let pixels close to real backdrop go transparent (keeps eye highlights solid).
    near = np.clip(box(pure, 14) * 841.0, 0, 1)           # 1 where any backdrop within 14 px
    near = box(near, 2)
    # Local backdrop colour, spread from pure backdrop pixels into the fur edge.
    wgt = box(pure, 14)
    local = np.empty_like(a)
    mean_bg = a[pure > 0].mean(0) if pure.any() else np.array([120, 160, 225], np.float32)
    for ch in range(3):
        num = box(a[..., ch] * pure, 14)
        local[..., ch] = np.where(wgt > 1e-3, num / np.maximum(wgt, 1e-3), mean_bg[ch])
    # Local fur colour, spread from solid fur pixels. A fur/backdrop mix sits on the line
    # between the two, so its position on that line is how much backdrop it contains.
    sure_fg = (key < -30).astype(np.float32)
    fwgt = box(sure_fg, 6)
    fur = np.empty_like(a)
    for ch in range(3):
        fur[..., ch] = box(a[..., ch] * sure_fg, 6) / np.maximum(fwgt, 1e-3)
    d = local - fur
    proj = ((a - fur) * d).sum(-1) / np.maximum((d * d).sum(-1), 1.0)
    proj = np.clip((proj - 0.04) / 0.92, 0, 1)
    both = (fwgt > 1e-3) & (wgt > 1e-3)
    alpha_bg = np.where(both, np.maximum(proj, alpha_bg), alpha_bg)
    alpha_bg = np.where(sure_fg > 0, 0.0, alpha_bg) * near
    out = a + alpha_bg[..., None] * (TARGET - local)
    # Where a pixel is mostly backdrop, its own colour is mostly blue spill, so lean on the
    # local fur colour there instead: clean orange strands that fade to white, no fringe.
    fur_based = fur * (1.0 - alpha_bg[..., None]) + TARGET * alpha_bg[..., None]
    mix = np.where(both, alpha_bg, 0.0)[..., None]
    out = out * (1.0 - mix) + fur_based * mix
    out = np.where(pure[..., None] > 0, TARGET, out)
    # Remove the blue cast the backdrop left on fur and in the eyes.
    limit = np.maximum(out[..., 0], out[..., 1]) + 3.0
    out[..., 2] = np.minimum(out[..., 2], limit)
    # In the fur edge the colour must sit between orange and white, so blue can never exceed green.
    edge = (alpha_bg > 0) & (pure == 0)
    out[..., 2] = np.where(edge, np.minimum(out[..., 2], out[..., 1] + 2.0), out[..., 2])
    # Fur over white is always warm: compared with green, blue falls further below the
    # backdrop and red stays closer to it. Enforce that on edge pixels to remove grey wisps.
    t = TARGET[..., 0]
    dg = np.maximum(t - out[..., 1], 0.0)
    out[..., 2] = np.where(edge, np.minimum(out[..., 2], t - 1.15 * dg), out[..., 2])
    out[..., 0] = np.where(edge, np.maximum(out[..., 0], t - 0.75 * dg), out[..., 0])
    return np.clip(out + 0.5, 0, 255).astype(np.uint8)


def reader():
    cmd = ['ffmpeg', '-v', 'error', '-i', SRC, '-vf', 'scale=in_color_matrix=bt709:in_range=tv:out_range=pc',
           '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    n = W * H * 3
    while True:
        buf = p.stdout.read(n)
        if len(buf) < n:
            break
        yield np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    p.wait()


def main():
    if len(sys.argv) >= 4 and sys.argv[1] == '--frame':
        want = round(float(sys.argv[2]) * FPS)
        for i, f in enumerate(reader()):
            if i == want:
                Image.fromarray(process(f)).save(sys.argv[3]); return
        return
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-vf', 'scale=in_range=pc:out_color_matrix=bt709:out_range=tv', '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow',
                            '-crf', '19', '-g', '1', '-keyint_min', '1', '-bf', '0', '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709',
                            '-color_trc', 'bt709', '-color_range', 'tv', '-video_track_timescale', '12288', '-movflags', '+faststart', '-an', OUT], stdin=subprocess.PIPE)
    count = 0
    for i, f in enumerate(reader()):
        if i < FIRST or i > LAST:
            continue
        out = process(f)
        if i == POSTER_FRAME:
            Image.fromarray(out).save(POSTER, quality=88)
        enc.stdin.write(out.tobytes()); count += 1
    enc.stdin.close(); enc.wait()
    table = json.load(open('tools/gaze-frames.source.json'))
    shifted = [[gaze, round(time - FIRST / FPS, 5)] for gaze, time in table]
    assert all(0 <= t <= (LAST - FIRST) / FPS for _, t in shifted), 'gaze table outside the trimmed clip'
    with open('src/gaze-frames.json', 'w') as fh:
        fh.write('[\n' + ',\n'.join('  ' + json.dumps(row) for row in shifted) + '\n]\n')
    print('frames written:', count, '| gaze rows:', len(shifted))


if __name__ == '__main__':
    main()
