import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('figure3dCanvas');
const stage = document.getElementById('viewer3dStage');
const statusEl = document.getElementById('viewer3dStatus');
const zoomInput = document.getElementById('viewer3dZoom');

const palettes = {
  omega: { primary: 0x42d8ff, secondary: 0xe044aa, suit: 0x101827, metal: 0xc9d8ea, glow: 0x684dff },
  shadow: { primary: 0x9ca3af, secondary: 0x374151, suit: 0x090b11, metal: 0xe5e7eb, glow: 0x38bdf8 },
  solar: { primary: 0xfbbf24, secondary: 0xef4444, suit: 0x24120b, metal: 0xffedd5, glow: 0xf97316 }
};

let initialized = false;
let renderer;
let scene;
let camera;
let controls;
let modelRoot;
let figureRoot;
let materials;
let animationFrame = 0;
let autoRotate = true;
let lastWidth = 0;
let lastHeight = 0;
const clock = new THREE.Clock();

function setStatus(text, hide = false) {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle('is-hidden', hide);
  window.OmegaI18n?.apply();
}

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.38,
    metalness: options.metalness ?? 0.2,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide
  });
}

function createMaterials() {
  const p = palettes.omega;
  materials = {
    primary: material(p.primary, { metalness: 0.25, roughness: 0.28 }),
    secondary: material(p.secondary, { metalness: 0.22, roughness: 0.32 }),
    suit: material(p.suit, { metalness: 0.38, roughness: 0.28 }),
    metal: material(p.metal, { metalness: 0.74, roughness: 0.18 }),
    glow: material(p.glow, { emissive: p.glow, emissiveIntensity: 1.2, metalness: 0.15, roughness: 0.2 }),
    black: material(0x050812, { metalness: 0.18, roughness: 0.36 }),
    white: material(0xf8fbff, { metalness: 0.04, roughness: 0.34 }),
    glass: material(0x9fe8ff, { transparent: true, opacity: 0.12, metalness: 0.02, roughness: 0.05, side: THREE.DoubleSide }),
    floor: material(0x0b1220, { metalness: 0.15, roughness: 0.56 })
  };
}

function mesh(geometry, mat, parent, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const item = new THREE.Mesh(geometry, mat);
  item.position.set(...position);
  item.rotation.set(...rotation);
  item.scale.set(...scale);
  item.castShadow = true;
  item.receiveShadow = true;
  parent.add(item);
  return item;
}

function createFigure() {
  modelRoot = new THREE.Group();
  scene.add(modelRoot);

  const base = new THREE.Group();
  modelRoot.add(base);
  mesh(new THREE.CylinderGeometry(1.52, 1.68, 0.24, 96), materials.black, base, [0, 0.12, 0]);
  mesh(new THREE.CylinderGeometry(1.38, 1.44, 0.08, 96), materials.suit, base, [0, 0.31, 0]);
  mesh(new THREE.TorusGeometry(1.48, 0.026, 12, 128), materials.glow, base, [0, 0.25, 0], [Math.PI / 2, 0, 0]);
  mesh(new THREE.TorusGeometry(1.1, 0.012, 12, 96), materials.secondary, base, [0, 0.36, 0], [Math.PI / 2, 0, 0]);

  const caseGroup = new THREE.Group();
  modelRoot.add(caseGroup);
  mesh(new THREE.CylinderGeometry(1.23, 1.23, 2.54, 80, 1, true), materials.glass, caseGroup, [0, 1.62, 0]);
  mesh(new THREE.TorusGeometry(1.23, 0.012, 10, 96), materials.glow, caseGroup, [0, 0.35, 0], [Math.PI / 2, 0, 0]);
  mesh(new THREE.TorusGeometry(1.23, 0.012, 10, 96), materials.glow, caseGroup, [0, 2.88, 0], [Math.PI / 2, 0, 0]);

  figureRoot = new THREE.Group();
  figureRoot.position.y = 0.36;
  modelRoot.add(figureRoot);

  mesh(new THREE.CapsuleGeometry(0.14, 0.64, 8, 18), materials.suit, figureRoot, [-0.23, 0.48, 0.02], [0, 0, 0.02]);
  mesh(new THREE.CapsuleGeometry(0.14, 0.64, 8, 18), materials.suit, figureRoot, [0.23, 0.48, 0.02], [0, 0, -0.02]);
  mesh(new THREE.BoxGeometry(0.34, 0.12, 0.58), materials.metal, figureRoot, [-0.23, 0.12, 0.05]);
  mesh(new THREE.BoxGeometry(0.34, 0.12, 0.58), materials.metal, figureRoot, [0.23, 0.12, 0.05]);

  mesh(new THREE.CapsuleGeometry(0.38, 0.76, 14, 28), materials.primary, figureRoot, [0, 1.18, 0]);
  mesh(new THREE.CapsuleGeometry(0.31, 0.58, 12, 24), materials.suit, figureRoot, [0, 1.22, 0.02], [0.04, 0, 0], [1.02, 1, 0.72]);
  mesh(new THREE.TorusGeometry(0.39, 0.025, 10, 80), materials.secondary, figureRoot, [0, 0.98, 0], [Math.PI / 2, 0, 0]);
  mesh(new THREE.CircleGeometry(0.15, 32), materials.glow, figureRoot, [0, 1.34, 0.34]);
  mesh(new THREE.ConeGeometry(0.1, 0.2, 3), materials.white, figureRoot, [0, 1.36, 0.352], [0, 0, Math.PI]);

  mesh(new THREE.SphereGeometry(0.43, 36, 20), materials.white, figureRoot, [0, 1.94, 0]);
  mesh(new THREE.SphereGeometry(0.45, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.58), materials.suit, figureRoot, [0, 2.02, -0.02]);
  mesh(new THREE.BoxGeometry(0.46, 0.11, 0.045), materials.glow, figureRoot, [0, 1.98, 0.39]);
  mesh(new THREE.SphereGeometry(0.035, 16, 8), materials.black, figureRoot, [-0.14, 1.98, 0.425]);
  mesh(new THREE.SphereGeometry(0.035, 16, 8), materials.black, figureRoot, [0.14, 1.98, 0.425]);

  mesh(new THREE.SphereGeometry(0.16, 20, 12), materials.metal, figureRoot, [-0.46, 1.47, 0]);
  mesh(new THREE.SphereGeometry(0.16, 20, 12), materials.metal, figureRoot, [0.46, 1.47, 0]);
  mesh(new THREE.CapsuleGeometry(0.11, 0.6, 8, 16), materials.suit, figureRoot, [-0.68, 1.17, 0.03], [0, 0, -0.72]);
  mesh(new THREE.CapsuleGeometry(0.11, 0.6, 8, 16), materials.suit, figureRoot, [0.68, 1.17, 0.03], [0, 0, 0.72]);
  mesh(new THREE.SphereGeometry(0.13, 18, 10), materials.white, figureRoot, [-0.88, 0.94, 0.07]);
  mesh(new THREE.SphereGeometry(0.13, 18, 10), materials.white, figureRoot, [0.88, 0.94, 0.07]);

  mesh(new THREE.ConeGeometry(0.24, 0.58, 3), materials.secondary, figureRoot, [0, 1.54, -0.46], [Math.PI / 2, 0, Math.PI / 6]);
  mesh(new THREE.ConeGeometry(0.16, 0.42, 3), materials.primary, figureRoot, [0, 2.28, -0.12], [-0.34, 0, 0]);

  const miniBox = new THREE.Group();
  miniBox.position.set(-1.92, 0.6, -0.58);
  modelRoot.add(miniBox);
  mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), materials.suit, miniBox);
  mesh(new THREE.BoxGeometry(0.31, 0.08, 0.02), materials.glow, miniBox, [0, 0.08, 0.24]);
  mesh(new THREE.BoxGeometry(0.18, 0.18, 0.02), materials.secondary, miniBox, [0, -0.09, 0.25]);

  const tag = new THREE.Group();
  tag.position.set(1.78, 0.92, -0.68);
  tag.rotation.y = -0.3;
  modelRoot.add(tag);
  mesh(new THREE.BoxGeometry(0.44, 0.58, 0.045), materials.black, tag);
  mesh(new THREE.CircleGeometry(0.06, 20), materials.glow, tag, [0, 0.18, 0.026]);
  mesh(new THREE.TorusGeometry(0.14, 0.014, 10, 36), materials.secondary, tag, [0, -0.08, 0.03]);
}

function createWorld() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x08111f, 7.5, 13.5);

  createMaterials();

  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(3.3, 2.2, 4.65);

  const ambient = new THREE.HemisphereLight(0xa6efff, 0x13091f, 1.8);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 3.4);
  key.position.set(3.8, 5.2, 3.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const rim = new THREE.PointLight(0xe044aa, 18, 8);
  rim.position.set(-3.2, 2.4, -2.8);
  scene.add(rim);

  const cyan = new THREE.PointLight(0x42d8ff, 16, 8);
  cyan.position.set(3.2, 1.7, 2.8);
  scene.add(cyan);

  mesh(new THREE.PlaneGeometry(18, 18), materials.floor, scene, [0, -0.01, 0], [-Math.PI / 2, 0, 0]);
  const grid = new THREE.GridHelper(8, 18, 0x42d8ff, 0x24364f);
  grid.position.y = 0.002;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  createFigure();
}

function resize() {
  if (!renderer || !stage || !camera) return;
  const width = Math.max(1, stage.clientWidth);
  const height = Math.max(1, stage.clientHeight);
  if (width === lastWidth && height === lastHeight) return;
  lastWidth = width;
  lastHeight = height;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function distanceFromZoom(value) {
  const t = (Number(value) - 34) / 42;
  return 7.6 - (t * 4.4);
}

function zoomFromDistance(distance) {
  return Math.round(34 + ((7.6 - distance) / 4.4) * 42);
}

function setCameraDistance(distance) {
  const target = controls.target;
  const direction = camera.position.clone().sub(target).normalize();
  camera.position.copy(target).add(direction.multiplyScalar(distance));
  controls.update();
}

function syncZoomInput() {
  if (!zoomInput || !controls || !camera) return;
  const distance = camera.position.distanceTo(controls.target);
  zoomInput.value = String(Math.max(34, Math.min(76, zoomFromDistance(distance))));
}

function setPalette(name) {
  const palette = palettes[name] || palettes.omega;
  materials.primary.color.setHex(palette.primary);
  materials.secondary.color.setHex(palette.secondary);
  materials.suit.color.setHex(palette.suit);
  materials.metal.color.setHex(palette.metal);
  materials.glow.color.setHex(palette.glow);
  materials.glow.emissive.setHex(palette.glow);
}

function resetView() {
  if (!camera || !controls || !modelRoot) return;
  const compact = stage?.clientWidth < 640;
  modelRoot.rotation.set(0, 0.15, 0);
  camera.position.set(compact ? 0.45 : 3.3, compact ? 2.05 : 2.2, compact ? 7.35 : 4.65);
  controls.target.set(0, compact ? 1.32 : 1.35, 0);
  controls.update();
  syncZoomInput();
}

function bindControls() {
  document.querySelectorAll('[data-viewer-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.viewerAction;
      if (action === 'rotate-left') modelRoot.rotation.y -= Math.PI / 8;
      if (action === 'rotate-right') modelRoot.rotation.y += Math.PI / 8;
      if (action === 'reset') resetView();
      if (action === 'auto') {
        autoRotate = !autoRotate;
        button.classList.toggle('active', autoRotate);
        button.querySelector('i').className = autoRotate ? 'bi bi-play-circle' : 'bi bi-pause-circle';
      }
    });
  });

  document.querySelectorAll('[data-palette]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-palette]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      setPalette(button.dataset.palette);
    });
  });

  zoomInput?.addEventListener('input', () => setCameraDistance(distanceFromZoom(zoomInput.value)));
}

function animate() {
  animationFrame = requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.04);
  const elapsed = clock.elapsedTime;

  if (modelRoot) {
    if (autoRotate) modelRoot.rotation.y += delta * 0.36;
    modelRoot.position.y = Math.sin(elapsed * 1.25) * 0.025;
  }

  controls?.update();
  syncZoomInput();
  resize();
  renderer?.render(scene, camera);
}

function init() {
  if (initialized || !canvas || !stage) return;
  initialized = true;
  setStatus('Cargando visor 3D');

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  createWorld();

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.minDistance = 3.2;
  controls.maxDistance = 7.8;
  controls.maxPolarAngle = Math.PI * 0.86;
  controls.target.set(0, 1.35, 0);
  controls.update();

  bindControls();
  resize();
  resetView();
  cancelAnimationFrame(animationFrame);
  animate();
  setStatus('Visor 3D listo.', true);
}

function activate() {
  init();
  requestAnimationFrame(() => {
    resize();
    renderer?.render(scene, camera);
  });
}

window.Omega3D = { activate, reset: resetView };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if ((window.location.hash.replace('#', '') || 'inicio') === 'visor-3d') activate();
  });
} else if ((window.location.hash.replace('#', '') || 'inicio') === 'visor-3d') {
  activate();
}
