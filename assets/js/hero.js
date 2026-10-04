/*
 * Hero canvas: a sparsely observed, noisy axial "brain scan" made of points.
 * Points near the focus (cursor, or an autonomous scan path) snap to their true
 * position and full intensity — "recovering the signal from incomplete observations".
 */
(function () {
  'use strict';
  var scan = document.getElementById('scan');
  var canvas = document.getElementById('heroCanvas');
  if (!scan || !canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var obsEl = document.getElementById('obsPct');
  var recEl = document.getElementById('recPct');
  var sliceEl = document.getElementById('hudSlice');

  var OBSERVED = 0.34;
  var W = 0, H = 0, dpr = 1, R = 120;
  var pts = [];
  var colors = {};
  var pointer = { x: 0, y: 0, inside: false, last: 0 };
  var focus = { x: 0, y: 0 };
  var running = false, visible = true, rafId = 0, lastHud = 0;
  var t0 = performance.now();

  // Deterministic PRNG so the scan looks the same on every load.
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Implicit brain-slice shape in normalized coords (x, y ∈ [-1, 1]).
  // Returns 0 outside; otherwise a tissue intensity and a lesion flag.
  function tissue(x, y) {
    var ang = Math.atan2(y, x);
    var r = Math.hypot(x / 0.80, y / 0.96);
    var gyri = 1 + 0.022 * Math.sin(ang * 15) + 0.014 * Math.sin(ang * 27 + 1.3);
    if (r > gyri) return null;
    // interhemispheric fissure
    if (Math.abs(x) < 0.028 && (y < -0.6 || y > 0.66)) return null;
    // lateral ventricles
    if (Math.hypot((x + 0.13) / 0.075, (y + 0.04) / 0.27) < 1) return null;
    if (Math.hypot((x - 0.13) / 0.075, (y + 0.04) / 0.27) < 1) return null;
    var edge = gyri - r;
    var v = edge < 0.09 ? 1 : 0.6 + 0.12 * Math.sin(x * 9) * Math.cos(y * 7);
    var lesion = Math.hypot((x - 0.42) / 0.14, (y - 0.2) / 0.17) < 1;
    return { v: lesion ? 1 : v, lesion: lesion };
  }

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors.text = cs.getPropertyValue('--text-3').trim() || '#6f7a8c';
    colors.accent = cs.getPropertyValue('--accent').trim() || '#2dd4bf';
    colors.accent2 = cs.getPropertyValue('--accent-2').trim() || '#8b7bff';
    colors.line = cs.getPropertyValue('--border-strong').trim() || 'rgba(255,255,255,.14)';
  }

  function build() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.max(80, Math.min(W, H) * 0.24);

    var rand = rng(42);
    var step = Math.max(7, Math.min(W, H) / 62);
    var cx = W / 2, cy = H / 2 + 6, sx = W * 0.40, sy = H * 0.40;
    pts = [];
    for (var py = cy - sy * 1.05; py <= cy + sy * 1.05; py += step) {
      for (var px = cx - sx * 1.05; px <= cx + sx * 1.05; px += step) {
        var jx = px + (rand() - 0.5) * step * 0.5;
        var jy = py + (rand() - 0.5) * step * 0.5;
        var t = tissue((jx - cx) / sx, (jy - cy) / sy);
        if (!t) continue;
        pts.push({
          x: jx, y: jy, v: t.v, lesion: t.lesion,
          nx: (rand() - 0.5) * step * 1.6, ny: (rand() - 0.5) * step * 1.6,
          obs: rand() < OBSERVED, ph: rand() * Math.PI * 2
        });
      }
    }
    if (!pointer.inside) { focus.x = W * 0.66; focus.y = H * 0.56; }
  }

  function smooth(e0, e1, x) {
    var t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  }

  function frame(now) {
    var t = (now - t0) / 1000;

    // Focus follows the pointer; otherwise drifts along a slow Lissajous path.
    var idle = !pointer.inside || now - pointer.last > 4000;
    var tx = idle ? W / 2 + W * 0.26 * Math.sin(t * 0.33) : pointer.x;
    var ty = idle ? H / 2 + H * 0.22 * Math.sin(t * 0.47 + 1.1) : pointer.y;
    var k = reduce ? 1 : 0.12;
    focus.x += (tx - focus.x) * k;
    focus.y += (ty - focus.y) * k;

    ctx.clearRect(0, 0, W, H);

    // acquisition sweep line
    var sweepY = reduce ? -100 : (t * 60) % (H + 120) - 60;

    var recovered = 0, hidden = 0;
    var s = Math.max(1.7, Math.min(W, H) / 260);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var d = Math.hypot(p.x - focus.x, p.y - focus.y);
      var near = 1 - smooth(R * 0.35, R, d);
      var sweep = Math.max(0, 1 - Math.abs(p.y - sweepY) / 26) * 0.5;
      if (!p.obs) { hidden++; if (near > 0.5) recovered++; }

      var wob = reduce ? 0 : Math.sin(t * 1.6 + p.ph) * 1.2;
      var off = 1 - near;
      var x = p.x + (p.nx + wob) * off;
      var y = p.y + (p.ny - wob) * off;

      var base = p.obs ? 0.62 * p.v : 0.07;
      var a = base + (p.v * 0.95 - base) * near + sweep * (p.obs ? 0.25 : 0.12);
      if (a < 0.03) continue;

      ctx.globalAlpha = Math.min(1, a);
      ctx.fillStyle = near > 0.15 ? (p.lesion ? colors.accent2 : colors.accent) : colors.text;
      var size = s * (1 + near * 0.55);
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;

    // recovery lens
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(focus.x, focus.y, R * 0.92, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(focus.x - 7, focus.y); ctx.lineTo(focus.x + 7, focus.y);
    ctx.moveTo(focus.x, focus.y - 7); ctx.lineTo(focus.x, focus.y + 7);
    ctx.stroke();

    if (!reduce && sweepY > 0 && sweepY < H) {
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = colors.accent;
      ctx.fillRect(0, sweepY, W, 1);
      ctx.globalAlpha = 1;
    }

    if (now - lastHud > 180) {
      lastHud = now;
      if (obsEl) obsEl.textContent = Math.round(OBSERVED * 100) + '%';
      if (recEl && pts.length) recEl.textContent = '+' + Math.round(recovered / pts.length * 100) + '%';
      if (sliceEl) sliceEl.textContent = String(40 + Math.round((focus.y / H) * 8)).padStart(3, '0');
    }
  }

  function loop(now) {
    frame(now);
    if (running) rafId = requestAnimationFrame(loop);
  }
  function start() {
    if (reduce) { frame(performance.now()); return; }
    if (running || !visible || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(rafId); }

  function setPointer(e) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.inside = true;
    pointer.last = performance.now();
    scan.classList.add('touched');
    if (reduce) frame(performance.now());
  }
  scan.addEventListener('pointermove', setPointer);
  scan.addEventListener('pointerdown', setPointer);
  scan.addEventListener('pointerleave', function () { pointer.inside = false; });

  readColors();
  build();

  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { build(); if (reduce) frame(performance.now()); }).observe(scan);
  } else {
    window.addEventListener('resize', build);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(scan);
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  document.addEventListener('themechange', function () { readColors(); if (reduce) frame(performance.now()); });

  start();
})();
