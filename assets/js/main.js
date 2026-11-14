(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Case studies ---------- */
  const cases = window.CASE_STUDIES || [];
  const mockups = window.CASE_MOCKUPS || {};

  $("#cases").innerHTML = cases.map((c) => {
    const media = c.image
      ? `<img src="${esc(c.image)}" alt="${esc(c.name)}: ${esc(c.mediaLabel)}" loading="lazy" />`
      : (mockups[c.mockup] || "");
    return `
    <article class="case glass reveal" data-filter="${esc(c.filter)}" style="--c:${esc(c.color)}">
      <div class="case__media">${media}<span class="media__label">${esc(c.mediaLabel)}</span></div>
      <div class="case__body">
        <div class="case__top"><span class="case__cat">${esc(c.category)}</span><span class="case__div">${esc(c.divisions)}</span></div>
        <h3>${esc(c.name)}</h3>
        <div class="case__block"><h4>The Challenge</h4><p>${esc(c.challenge)}</p></div>
        <div class="case__block"><h4>The Zera Bytes Solution</h4><p>${esc(c.solution)}</p></div>
        <div class="case__block"><h4>Tech Stack</h4><div class="tags">${c.stack.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
        <div class="case__roi" aria-label="ROI delivered">${c.roi.map((r) => `<div class="roi"><span class="roi__v">${esc(r.v)}</span><span class="roi__k">${esc(r.k)}</span></div>`).join("")}</div>
      </div>
    </article>`;
  }).join("");

  $("#matrix-body").innerHTML = cases.map((c) => `
    <tr>
      <td>${esc(c.name)}</td>
      <td><span class="case__cat" style="--c:${esc(c.color)}">${esc(c.category)}</span></td>
      <td>${esc(c.challenge)}</td>
      <td>${esc(c.solution)}</td>
      <td>${esc(c.stack.slice(0, 4).join(", "))}</td>
      <td>${c.roi.map((r) => `<strong style="color:var(--green)">${esc(r.v)}</strong> ${esc(r.k)}`).join("<br>")}</td>
    </tr>`).join("");

  $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    $$(".filter").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    $$(".case").forEach((el) => el.classList.toggle("is-hidden", f !== "all" && el.dataset.filter !== f));
  }));

  /* ---------- Reveal on scroll ---------- */
  $$(".layer, .stat, .eco, .step, .cta, .section__head").forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 3D hero ---------- */
  const host = $("#hero-canvas");
  const start = () => {
    if (!window.THREE || !host) return;
    try { initHero(window.THREE, host); } catch (err) { console.warn("3D hero unavailable:", err); }
  };
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);

  function initHero(THREE, el) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    el.classList.add("has-webgl");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const root = new THREE.Group();
    scene.add(root);

    const CYAN = 0x22e6ff, VIOLET = 0x9d5cff, BLUE = 0x4c7dff;

    // Core: wireframe icosahedron + inner solid
    const core = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(1.55, 1);
    core.add(new THREE.LineSegments(new THREE.WireframeGeometry(icoGeo), new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.55 })));
    core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), new THREE.MeshBasicMaterial({ color: VIOLET, wireframe: true, transparent: true, opacity: 0.5 })));
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), new THREE.MeshBasicMaterial({ color: 0x9fdcff, transparent: true, opacity: 0.9 }));
    core.add(glow);
    // Vertex points on the outer shell
    const pts = new THREE.Points(icoGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.9 }));
    core.add(pts);
    root.add(core);

    // Halo sprite (canvas radial gradient)
    const haloTex = (() => {
      const c = document.createElement("canvas"); c.width = c.height = 128;
      const g = c.getContext("2d"); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, "rgba(120,200,255,0.55)"); gr.addColorStop(0.4, "rgba(157,92,255,0.18)"); gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(7, 7, 1);
    root.add(halo);

    // Three orbits = three divisions
    const orbits = [
      { color: CYAN, r: 2.7, tilt: [1.2, 0, 0.3], speed: 0.45 },
      { color: VIOLET, r: 3.2, tilt: [0.4, 0.9, -0.2], speed: -0.32 },
      { color: BLUE, r: 3.7, tilt: [-0.6, 0.3, 0.9], speed: 0.24 }
    ].map((o, i) => {
      const g = new THREE.Group();
      g.rotation.set(...o.tilt);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(o.r, 0.008, 8, 160), new THREE.MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.55 }));
      g.add(ring);
      const node = new THREE.Group();
      node.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), new THREE.MeshBasicMaterial({ color: o.color })));
      node.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.34, 0)), new THREE.LineBasicMaterial({ color: o.color, transparent: true, opacity: 0.6 })));
      g.add(node);
      root.add(g);
      return { ...o, group: g, node, phase: i * 2.1 };
    });

    // Lines from core to each node (data links)
    const linkGeo = new THREE.BufferGeometry();
    const linkPos = new Float32Array(orbits.length * 6);
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    const links = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({ color: 0xbfe9ff, transparent: true, opacity: 0.22 }));
    root.add(links);

    // Particle field
    const N = 700;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 4.5 + Math.random() * 5, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pPos[i * 3 + 2] = r * Math.cos(p);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const field = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x7fa8ff, size: 0.025, transparent: true, opacity: 0.7 }));
    scene.add(field);

    // Resize
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(el);
    window.addEventListener("resize", resize);
    resize();

    // Pointer parallax
    const target = { x: 0, y: 0 };
    window.addEventListener("pointermove", (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    }, { passive: true });

    // Pause when off-screen
    let visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(el);
    }

    const tmp = new THREE.Vector3();
    const clock = new THREE.Clock();
    const frame = () => {
      const t = clock.getElapsedTime();
      core.rotation.y = t * 0.25;
      core.rotation.x = Math.sin(t * 0.3) * 0.25;
      glow.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      orbits.forEach((o, i) => {
        const a = o.phase + t * o.speed;
        o.node.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
        o.node.rotation.y = t * 1.5;
        o.node.getWorldPosition(tmp);
        root.worldToLocal(tmp);
        linkPos.set([0, 0, 0, tmp.x, tmp.y, tmp.z], i * 6);
      });
      linkGeo.attributes.position.needsUpdate = true;
      field.rotation.y = t * 0.02;
      root.rotation.y += (target.x - root.rotation.y) * 0.04;
      root.rotation.x += (target.y - root.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };

    if (reduceMotion) { frame(); return; }
    const loop = () => { if (visible) frame(); requestAnimationFrame(loop); };
    loop();
  }
})();
