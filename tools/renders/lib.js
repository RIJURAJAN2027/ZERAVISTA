// Shared helpers for the rendered concept screens (real WebGL scenes, lit and shadowed).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export { THREE, RoundedBoxGeometry };

export function makeStage({ canvas, width, height, fov = 28, exposure = 1, envIntensity = 0.9, shadows = true, pixelRatio = 2 }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = shadows;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = envIntensity;
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.05, 100);
  return { renderer, scene, camera, width, height };
}

export function keyLight(scene, { color = 0xffffff, intensity = 2.2, position = [3, 5, 2.5], size = 2.4, radius = 7, mapSize = 2048 } = {}) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...position);
  light.castShadow = true;
  light.shadow.mapSize.set(mapSize, mapSize);
  light.shadow.camera.left = -size; light.shadow.camera.right = size;
  light.shadow.camera.top = size; light.shadow.camera.bottom = -size;
  light.shadow.camera.near = 0.5; light.shadow.camera.far = 20;
  light.shadow.radius = radius; light.shadow.blurSamples = 20; light.shadow.bias = -0.0004;
  scene.add(light);
  return light;
}

export function shadowGround(scene, { y = 0, opacity = 0.26, size = 30 } = {}) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.ShadowMaterial({ opacity }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = y; ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

// Soft dark blob under an object, for contact grounding.
export function contactBlob(scene, { w = 1.4, d = 1.3, y = 0.002, x = 0, z = 0, opacity = 0.42 } = {}) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, `rgba(0,0,0,${opacity})`); gr.addColorStop(0.55, `rgba(0,0,0,${opacity * 0.45})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
  mesh.rotation.x = -Math.PI / 2; mesh.position.set(x, y, z); mesh.renderOrder = -1;
  scene.add(mesh);
  return mesh;
}

// Deterministic random so renders are repeatable.
export function rng(seed = 7) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// Bumpy "boucle" fabric height map.
export function boucleTexture(repeat = 5, seed = 3) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); const r = rng(seed);
  g.fillStyle = '#777'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 5200; i++) {
    const x = r() * 512, y = r() * 512, rad = 3 + r() * 7, v = 90 + Math.floor(r() * 150);
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, `rgba(${v},${v},${v},0.9)`); gr.addColorStop(1, `rgba(${v},${v},${v},0)`);
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 8;
  return t;
}

// Fine woven cloth height map (for speaker grilles, headbands).
export function weaveTexture(repeat = 24) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#666'; g.fillRect(0, 0, 64, 64);
  g.fillStyle = '#bbb'; for (let y = 0; y < 64; y += 8) for (let x = (y / 8) % 2 ? 4 : 0; x < 64; x += 8) g.fillRect(x, y, 4, 4);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat);
  return t;
}

// Speckled stoneware colour map.
export function speckleTexture(base = '#e9e2d6', dots = '#8a7a66', count = 900, seed = 11) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); const r = rng(seed);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512); g.fillStyle = dots;
  for (let i = 0; i < count; i++) { g.globalAlpha = 0.25 + r() * 0.6; g.beginPath(); g.arc(r() * 512, r() * 512, 0.5 + r() * 1.6, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 1);
  return t;
}

// Lathe from a few control points [radius, height], smoothed with a spline.
export function lathe(points, { segments = 96, samples = 80, closed = false } = {}) {
  const curve = new THREE.SplineCurve(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const pts = curve.getPoints(samples).map((p) => new THREE.Vector2(Math.max(p.x, 0.0001), p.y));
  if (closed) pts.push(new THREE.Vector2(0.0001, pts[pts.length - 1].y));
  const geo = new THREE.LatheGeometry(pts, segments);
  geo.computeVertexNormals();
  return geo;
}

// World point -> CSS pixel position inside the canvas box.
export function project(v, camera, width, height) {
  const p = new THREE.Vector3(...v).project(camera);
  return [(p.x * 0.5 + 0.5) * width, (-p.y * 0.5 + 0.5) * height];
}

export function shadowAll(obj) { obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return obj; }

// Render the stage to a PNG data URL at a given size (used for thumbnails / product tiles).
export function snapshot(stage, w, h) {
  const { renderer, scene, camera } = stage;
  const prev = renderer.getSize(new THREE.Vector2()); const prevAspect = camera.aspect;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  const url = renderer.domElement.toDataURL('image/png');
  renderer.setSize(prev.x, prev.y, false); camera.aspect = prevAspect; camera.updateProjectionMatrix();
  return url;
}
