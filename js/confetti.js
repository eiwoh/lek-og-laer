/* Lek & Lær! — canvas confetti: bursts and golden rain */

var LekConfetti = (function () {
  'use strict';

  var cvs = document.getElementById('confetti');
  var ctx = cvs.getContext('2d');
  var parts = [];
  var rafId = null;

  var COLORS = ['#FFC53D', '#FF5D5D', '#53B865', '#4FA8E0', '#B57EDC', '#FF9A3D'];
  var GOLD = ['#FFC53D', '#FFD97A', '#F5A623', '#FFE9A8'];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size() { cvs.width = innerWidth; cvs.height = innerHeight; }
  addEventListener('resize', size);
  size();

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function spawnBurst(n, palette) {
    for (var i = 0; i < n; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - .5) * 200,
        y: innerHeight * 0.35,
        vx: (Math.random() - .5) * 11,
        vy: -Math.random() * 10 - 4,
        s: 6 + Math.random() * 7,
        c: pick(palette),
        r: Math.random() * Math.PI,
        vr: (Math.random() - .5) * .3,
        life: 90 + Math.random() * 40
      });
    }
  }

  function spawnRainDrop(palette) {
    parts.push({
      x: Math.random() * innerWidth,
      y: -20,
      vx: (Math.random() - .5) * 1.5,
      vy: 2 + Math.random() * 3,
      s: 6 + Math.random() * 8,
      c: pick(palette),
      r: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .2,
      life: 200,
      floaty: true
    });
  }

  function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < innerHeight + 40; });
    parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      p.vy += p.floaty ? 0.02 : 0.35;
      p.r += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
      ctx.restore();
    });
    if (parts.length) { rafId = requestAnimationFrame(loop); }
    else { rafId = null; ctx.clearRect(0, 0, cvs.width, cvs.height); }
  }

  function kick() { if (!rafId) rafId = requestAnimationFrame(loop); }

  return {
    burst: function (n) {
      if (reduceMotion) return;
      spawnBurst(n, COLORS);
      kick();
    },
    // Golden rain for a perfect score, runs ~ms milliseconds
    goldRain: function (ms) {
      if (reduceMotion) return;
      var end = performance.now() + ms;
      (function drip() {
        if (performance.now() > end) return;
        spawnRainDrop(GOLD);
        spawnRainDrop(GOLD);
        kick();
        setTimeout(drip, 60);
      })();
    }
  };
})();
