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
    core = 0.28 * np.exp(-(((x - 650) / 190) ** 2 + ((y - 684) / 9) ** 2))
    cast = 0.14 * np.exp(-(((x - 590) / 280) ** 2 + ((y - 684) / 13) ** 2))   # fades out before the frame edge
    return np.clip(core + cast, 0, 0.45)


TARGET = (255.0 * (1.0 - shadow_map()))[..., None]   # what the backdrop becomes


def process(frame):
    a = frame.astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    key = b - np.maximum(r, g)                          # how much bluer than warm a pixel is
    pure = (key >= T1).astype(np.float32)               # clean backdrop

    # Local backdrop colour, spread from clean backdrop pixels into the hair.
    wgt = box(pure, 14)
    mean_bg = a[pure > 0].mean(0) if pure.any() else np.array([120, 160, 225], np.float32)
    local_b = np.empty_like(a)
    for ch in range(3):
        local_b[..., ch] = np.where(wgt > 1e-3, box(a[..., ch] * pure, 14) / np.maximum(wgt, 1e-3), mean_bg[ch])
    key_b = local_b[..., 2] - np.maximum(local_b[..., 0], local_b[..., 1])

    # Local hair colour, spread from clearly-dog pixels. Pale strands near the top of the head
    # pick up a pale estimate, orange fur an orange one.
    sure = (key < -30).astype(np.float32)
    fw = box(sure, 8)
    key_f_raw = box(key * sure, 8) / np.maximum(fw, 1e-3)
    key_f = np.where(fw > 1e-3, np.minimum(key_f_raw, -25.0), -60.0)

    # A strand pixel is a mix of hair and backdrop; its key sits between the two keys,
    # so its position on that line is the share of backdrop showing through.
    alpha_bg = np.clip((key - key_f) / np.maximum(key_b - key_f, 1.0), 0, 1)
    near = np.clip(box(pure, 14) * 841.0, 0, 1)         # only near real backdrop (keeps eye whites)
    near = box(near, 2)
    alpha_bg = np.where(pure > 0, 1.0, alpha_bg * near)
    alpha_bg = 0.65 * alpha_bg + 0.35 * box(alpha_bg, 1)  # light anti-aliasing of the edge

    # Swap the backdrop share for white, keeping the hair's own detail.
    out = a + alpha_bg[..., None] * (TARGET - local_b)
    out = np.where(pure[..., None] > 0, TARGET, out)
    # Despill: no blue or lilac cast left in the hair.
    edge = (alpha_bg > 0.01) & (pure == 0)
    out[..., 2] = np.where(edge, np.minimum(out[..., 2], out[..., 1] + 2.0), out[..., 2])   # warm hair: blue never above green
    return np.clip(out + 0.5, 0, 255).astype(np.uint8)


def reader():
    cmd = ['ffmpeg', '-v', 'error', '-i', SRC, '-vf', 'scale=flags=lanczos+accurate_rnd+full_chroma_int+full_chroma_inp:in_color_matrix=bt709:in_range=tv:out_range=pc',
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
