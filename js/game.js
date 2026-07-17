/* Lek & Lær! — screens, game state and rendering */

(function () {
  'use strict';

  var D = LekData;
  var ROUND_LEN = 10;
  var STORE_KEY = 'lekOgLaerBest';

  var board = document.getElementById('board');
  var state = null;

  function ri(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[ri(arr.length)]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ---------- Best-score storage ---------- */

  function loadBest() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveBest(mode, level, stars) {
    var best = loadBest();
    var key = mode + '-' + level;
    if ((best[key] || 0) >= stars) return false;
    best[key] = stars;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(best)); } catch (e) { /* private mode */ }
    return true;
  }
  function bestStarsHtml(mode, level) {
    var got = loadBest()[mode + '-' + level] || 0;
    var h = '';
    for (var i = 0; i < 3; i++) h += '<span class="' + (i < got ? '' : 'off') + '">⭐</span>';
    return h;
  }

  /* ---------- Menu ---------- */

  function showMenu() {
    state = null;
    board.innerHTML =
      '<div class="screen">' +
        '<div class="mascot-row">' +
          '<div class="mascot">🦊</div>' +
          '<div class="bubble">Hei! Jeg heter Rev. Hva vil du leke i dag?</div>' +
        '</div>' +
        '<div class="menu">' +
          '<button class="mode-btn eventyr" data-mode="eventyr">' +
            '<span class="big">🗺️</span>' +
            '<span>Eventyr<small>Gå på tur og lås opp nye land!</small></span>' +
          '</button>' +
          '<button class="mode-btn matte" data-mode="matte">' +
            '<span class="big">🔢</span>' +
            '<span>Matte-moro<small>Pluss, minus, ganging og mer</small></span>' +
          '</button>' +
          '<button class="mode-btn racer" data-mode="racer">' +
            '<span class="big">⚡</span>' +
            '<span>Regne-racer<small>Hvor mange klarer du på ett minutt?</small></span>' +
          '</button>' +
          '<button class="mode-btn monster" data-mode="monster">' +
            '<span class="big">🧩</span>' +
            '<span>Tall-mønster<small>Hvilket tall kommer etterpå?</small></span>' +
          '</button>' +
          '<button class="mode-btn lesing" data-mode="lesing">' +
            '<span class="big">📖</span>' +
            '<span>Lese-leken<small>Ord, bilder, rim og setninger</small></span>' +
          '</button>' +
          '<button class="mode-btn quiz" data-mode="quiz">' +
            '<span class="big">🧠</span>' +
            '<span>Quiz-tid<small>Lure spørsmål om alt mulig</small></span>' +
          '</button>' +
          '<button class="mode-btn klokke" data-mode="klokke">' +
            '<span class="big">🕐</span>' +
            '<span>Klokke-spillet<small>Hva er klokka?</small></span>' +
          '</button>' +
          '<button class="mode-btn engelsk" data-mode="engelsk">' +
            '<span class="big">🇬🇧</span>' +
            '<span>Engelsk<small>Lær engelske ord</small></span>' +
          '</button>' +
          '<button class="mode-btn tegne" data-mode="tegne">' +
            '<span class="big">🎨</span>' +
            '<span>Tegne-leken<small>Mal over bokstaver og tall</small></span>' +
          '</button>' +
          '<button class="mode-btn prikk" data-mode="prikk">' +
            '<span class="big">✏️</span>' +
            '<span>Prikk til prikk<small>Tegn streker fra tall til tall</small></span>' +
          '</button>' +
        '</div>' +
      '</div>';
    board.querySelectorAll('.mode-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        LekAudio.click();
        if (b.dataset.mode === 'eventyr') showAdventure();
        else showLevels(b.dataset.mode);
      });
    });
  }

  /* ---------- Level picker ---------- */

  function showLevels(mode) {
    var m = D.MODES[mode];
    var html =
      '<div class="screen">' +
        '<div class="top-row">' +
          '<button class="back-link" id="backBtn">← Tilbake</button>' +
          '<span class="chip">' + m.icon + ' ' + m.title + '</span>' +
        '</div>' +
        '<div class="level-title">Velg nivå!</div>' +
        '<div class="level-sub">Stjernene viser din beste runde</div>' +
        '<div class="levels">';
    D.LEVELS.slice(0, m.levels || 3).forEach(function (lvl) {
      html +=
        '<button class="level-btn" data-level="' + lvl.n + '">' +
          '<span class="lvl-icon">' + lvl.icon + '</span>' +
          '<span>' + lvl.name + '<small>' + lvl.desc + '</small></span>' +
          '<span class="best">' + bestStarsHtml(mode, lvl.n) + '</span>' +
        '</button>';
    });
    html += '</div></div>';
    board.innerHTML = html;

    document.getElementById('backBtn').addEventListener('click', function () {
      LekAudio.click(); showMenu();
    });
    board.querySelectorAll('.level-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        LekAudio.start();
        startRound(mode, Number(b.dataset.level));
      });
    });
  }

  /* ---------- Round ---------- */

  /* Drawing rounds are shorter — each picture takes a while. */
  function roundLenFor(mode) {
    return (mode === 'tegne' || mode === 'prikk') ? 4 : ROUND_LEN;
  }

  function startRound(mode, level) {
    if (mode === 'racer') { startRace(level); return; }
    var len = roundLenFor(mode);
    state = {
      mode: mode,
      level: level,
      len: len,
      qs: LekQuestions.buildRound(mode, level, len),
      i: 0,
      score: 0,
      streak: 0,
      results: [],
      firstTry: true
    };
    showQuestion();
  }

  function dotsHtml() {
    var h = '<div class="dots" aria-label="Fremdrift">';
    for (var k = 0; k < state.len; k++) {
      var cls = 'dot';
      if (k < state.results.length) cls += state.results[k] ? ' win' : ' miss';
      else if (k === state.i) cls += ' now';
      h += '<div class="' + cls + '">' + (k < state.results.length && state.results[k] ? '⭐' : '') + '</div>';
    }
    return h + '</div>';
  }

  function stageFor(q) {
    switch (q.kind) {
      case 'math':
        return {
          stage: '<div class="prompt">Kan du regne dette?</div>' +
                 '<div class="big-math' + (q.small ? ' small' : '') + '">' + q.text + '</div>',
          options: q.options,
          cls: ''
        };
      case 'pattern':
        return {
          stage: '<div class="prompt">Hvilket tall kommer etterpå?</div>' +
                 '<div class="big-math pattern-seq">' + q.seq.join(', ') +
                 ', <span class="gap-box">&nbsp;</span></div>',
          options: q.options,
          cls: ''
        };
      case 'mathgap':
        return {
          stage: '<div class="prompt">Hvilket tall mangler?</div>' +
                 '<div class="big-math">' + q.pre + '<span class="gap-box">&nbsp;</span>' + q.post + '</div>',
          options: q.options,
          cls: ''
        };
      case 'count':
        var row = '';
        for (var k = 0; k < q.n; k++) row += q.emoji;
        return {
          stage: '<div class="prompt">Hvor mange ' + q.emoji + ' ser du?</div>' +
                 '<div class="emoji-grid">' + row + '</div>',
          options: q.options,
          cls: ''
        };
      case 'word':
        return {
          stage: '<div class="prompt">Hvilket ord passer til bildet?</div>' +
                 '<div class="big-emoji">' + q.emoji + '</div>',
          options: q.options, cls: ' words'
        };
      case 'pic':
        return {
          stage: '<div class="prompt">Hvilket bilde passer til ordet?</div>' +
                 '<div class="big-word">' + esc(q.word) + '</div>',
          options: q.options, cls: ' pics'
        };
      case 'letter':
        var shown = '';
        for (var c = 0; c < q.word.length; c++) {
          shown += c === q.gapIndex ? '<span class="gap-box">&nbsp;</span>' : esc(q.word[c]);
        }
        return {
          stage: '<div class="prompt">Hvilken bokstav mangler?</div>' +
                 '<div class="big-emoji">' + q.emoji + '</div>' +
                 '<div class="big-word">' + shown + '</div>',
          options: q.options, cls: ''
        };
      case 'rhyme':
        return {
          stage: '<div class="prompt">Hvilket ord rimer på …</div>' +
                 '<div class="big-word">' + esc(q.word) + '</div>',
          options: q.options, cls: ' words'
        };
      case 'sentence':
        return {
          stage: '<div class="sentence-card">' + esc(q.sentence) + '</div>' +
                 '<div class="prompt">' + esc(q.question) + '</div>',
          options: q.options, cls: ' pics'
        };
      case 'trivia':
        return {
          stage: '<div class="big-emoji">' + q.emoji + '</div>' +
                 '<div class="trivia-q">' + esc(q.question) + '</div>',
          options: q.options, cls: ' text'
        };
      case 'enpic':
        return {
          stage: '<div class="prompt">Hva heter dette på engelsk?</div>' +
                 '<div class="big-emoji">' + q.emoji + '</div>',
          options: q.options, cls: ' words'
        };
      case 'entrans':
        return {
          stage: '<div class="prompt">Hva heter dette på engelsk?</div>' +
                 '<div class="big-word">' + esc(q.word) + '</div>',
          options: q.options, cls: ' words'
        };
      case 'clock':
        return {
          stage: '<div class="prompt">Hva er klokka?</div>' + clockSvg(q.h, q.m),
          options: q.options, cls: ' text'
        };
      case 'trace':
        return {
          stage: '<div class="prompt">Mal over hele ' + (q.isDigit ? 'tallet' : 'bokstaven') + ' med fingeren! 🖌️</div>' +
                 '<canvas id="traceCanvas" class="trace-canvas"></canvas>' +
                 '<div class="trace-bar"><div class="trace-fill" id="traceFill"></div></div>' +
                 '<button class="mini-btn" id="traceClear">Tøm 🧽</button>',
          options: null, cls: ''
        };
      case 'dots':
        return {
          stage: '<div class="prompt">' +
                   (q.step > 1
                     ? 'Tell med ' + q.step + ' — trykk tallene i rekkefølge!'
                     : 'Trykk på tallene i rekkefølge — hva blir det? 🤔') +
                 '</div>' + dotsSvg(q),
          options: null, cls: ''
        };
    }
  }

  /* Connect-the-dots board as inline SVG */
  function dotsSvg(q) {
    var h = '<svg class="dots-svg" viewBox="0 0 100 100" role="img" aria-label="Prikk til prikk">' +
            '<path id="dotsPath" d="" fill="none" stroke="#4FA8E0" stroke-width="2.4" ' +
              'stroke-linecap="round" stroke-linejoin="round"/>';
    q.shape.pts.forEach(function (p, i) {
      var label = q.labels[i];
      var fs = label.length >= 3 ? 3.4 : label.length === 2 ? 4 : 4.8;
      h += '<g class="dsdot" data-i="' + i + '">' +
             '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="transparent"/>' +
             '<circle class="face" cx="' + p[0] + '" cy="' + p[1] + '" r="5.4"/>' +
             '<text x="' + p[0] + '" y="' + (p[1] + fs * 0.36) + '" text-anchor="middle" ' +
               'font-size="' + fs + '">' + label + '</text>' +
           '</g>';
    });
    return h + '</svg>';
  }

  /* Analog clock face as inline SVG */
  function clockSvg(h, m) {
    function pt(angleDeg, len) {
      var rad = (angleDeg - 90) * Math.PI / 180;
      return { x: (50 + len * Math.cos(rad)).toFixed(1), y: (50 + len * Math.sin(rad)).toFixed(1) };
    }
    function line(fromPt, toPt, color, width) {
      return '<line x1="' + fromPt.x + '" y1="' + fromPt.y + '" x2="' + toPt.x + '" y2="' + toPt.y +
             '" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round"/>';
    }
    var center = { x: 50, y: 50 };
    var ticks = '';
    for (var i = 0; i < 12; i++) {
      var big = i % 3 === 0;
      ticks += line(pt(i * 30, big ? 36 : 39), pt(i * 30, 43), '#17395C', big ? 3 : 1.5);
    }
    var hourAngle = (h % 12) * 30 + m * 0.5;
    var minAngle = m * 6;
    return '<svg class="clock-svg" viewBox="0 0 100 100" role="img" aria-label="Klokke">' +
      '<circle cx="50" cy="50" r="46" fill="#FFFDF6" stroke="#17395C" stroke-width="5"/>' +
      ticks +
      line(center, pt(hourAngle, 22), '#17395C', 6) +
      line(center, pt(minAngle, 34), '#FF5D5D', 4) +
      '<circle cx="50" cy="50" r="4" fill="#17395C"/>' +
      '</svg>';
  }

  function showQuestion() {
    var q = state.qs[state.i];
    state.firstTry = true;

    var part = stageFor(q);
    var isAdv = state.adv != null;
    var chip, backText;
    if (isAdv) {
      var node = D.ADVENTURE.NODES[state.adv];
      var area = D.ADVENTURE.AREAS[node.area];
      chip = area.emoji + ' ' + area.name + (node.boss ? ' 👑' : '');
      backText = '← Til kartet';
    } else {
      var lvl = D.LEVELS[state.level - 1];
      var m = D.MODES[state.mode];
      chip = m.icon + ' ' + lvl.icon + ' ' + lvl.name;
      backText = '← Til menyen';
    }

    var answersHtml = part.options ? part.options.map(function (o) {
      return '<button class="ans" data-v="' + esc(o) + '">' + esc(o) + '</button>';
    }).join('') : '';

    board.innerHTML =
      '<div class="screen">' +
        '<div class="top-row">' +
          '<button class="back-link" id="backBtn">' + backText + '</button>' +
          '<span class="chip">' + chip + '</span>' +
        '</div>' +
        '<div class="hud">' +
          '<span class="hud-fox" id="hudFox">🦊</span>' +
          dotsHtml() +
          '<div class="streak">' + (state.streak >= 3 ? '🔥 ' + state.streak + ' på rad!' : '') + '</div>' +
        '</div>' +
        '<div class="stage' + (part.options ? '' : ' draw') + '">' + part.stage +
          (part.options ? '<div class="answers' + part.cls + '">' + answersHtml + '</div>' : '') +
          '<div class="feedback" id="fb"></div>' +
        '</div>' +
      '</div>';

    document.getElementById('backBtn').addEventListener('click', function () {
      LekAudio.click();
      if (isAdv) showAdventure(); else showMenu();
    });
    if (q.kind === 'trace') initTrace(q);
    else if (q.kind === 'dots') initDots(q);
    else board.querySelectorAll('.ans').forEach(function (b) {
      b.addEventListener('click', function () { answer(b, q); });
    });
  }

  function foxReact(cls) {
    var fox = document.getElementById('hudFox');
    if (!fox) return;
    fox.classList.remove('jump', 'sad');
    void fox.offsetWidth; // restart animation
    fox.classList.add(cls);
  }

  function floatStar() {
    var stage = board.querySelector('.stage');
    if (!stage) return;
    var f = document.createElement('span');
    f.className = 'floater';
    f.textContent = '+1 ⭐';
    stage.appendChild(f);
    setTimeout(function () { f.remove(); }, 1000);
  }

  function answer(btn, q) {
    var fb = document.getElementById('fb');
    var correct = String(q.answer) === btn.dataset.v;

    if (correct) {
      btn.classList.add('good');
      board.querySelectorAll('.ans').forEach(function (b) { b.disabled = true; });
      var earned = state.firstTry;
      state.results.push(earned);
      if (earned) { state.score++; state.streak++; floatStar(); }
      else { state.streak = 0; }
      fb.textContent = pick(D.PRAISE);
      fb.className = 'feedback yay';
      LekAudio.good();
      foxReact('jump');
      LekConfetti.burst(earned ? 34 : 16);
      // Reveal the full word on letter questions
      if (q.kind === 'letter') {
        var w = board.querySelector('.big-word');
        if (w) w.textContent = q.word;
      }
      setTimeout(next, 1300);
    } else {
      btn.classList.add('bad');
      btn.disabled = true;
      state.firstTry = false;
      fb.textContent = pick(D.NUDGE);
      fb.className = 'feedback oops';
      LekAudio.bad();
      foxReact('sad');
    }
  }

  function next() {
    if (!state) return; // player went back to the menu mid-celebration
    state.i++;
    if (state.i >= state.len) showResult();
    else showQuestion();
  }

  /* Shared celebration for the drawing games (no answer buttons). */
  function finishDrawing(earned, msg, delay) {
    var fb = document.getElementById('fb');
    state.results.push(earned);
    if (earned) { state.score++; state.streak++; floatStar(); }
    else { state.streak = 0; }
    if (fb) { fb.textContent = msg; fb.className = 'feedback yay'; }
    LekAudio.good();
    foxReact('jump');
    LekConfetti.burst(earned ? 34 : 16);
    setTimeout(next, delay);
  }

  /* ---------- Tegne-leken ----------
     Paint over a dashed stencil with a rainbow brush. The stencil is
     rendered to an offscreen canvas and sampled to a point grid; the
     round is done when nearly every sample has been painted over. */

  function initTrace(q) {
    var canvas = document.getElementById('traceCanvas');
    var SIZE = 320;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var FAMILY = '"Baloo 2", ui-rounded, "Comic Sans MS", sans-serif';

    // Fit the glyph inside the canvas regardless of its natural proportions
    var off = document.createElement('canvas');
    off.width = SIZE; off.height = SIZE;
    var octx = off.getContext('2d');
    var fontPx = 240;
    octx.font = '800 ' + fontPx + 'px ' + FAMILY;
    var m = octx.measureText(q.ch);
    var asc = m.actualBoundingBoxAscent || fontPx * 0.72;
    var desc = m.actualBoundingBoxDescent || fontPx * 0.05;
    var scale = Math.min(1, 246 / m.width, 258 / (asc + desc));
    if (scale < 1) {
      fontPx = Math.floor(fontPx * scale);
      octx.font = '800 ' + fontPx + 'px ' + FAMILY;
      m = octx.measureText(q.ch);
      asc = m.actualBoundingBoxAscent || fontPx * 0.72;
      desc = m.actualBoundingBoxDescent || fontPx * 0.05;
    }
    var tx = SIZE / 2, ty = SIZE / 2 + (asc - desc) / 2;

    octx.textAlign = 'center';
    octx.fillText(q.ch, tx, ty);
    var img = octx.getImageData(0, 0, SIZE, SIZE).data;
    var samples = [];
    for (var y = 3; y < SIZE; y += 7) {
      for (var x = 3; x < SIZE; x += 7) {
        if (img[(y * SIZE + x) * 4 + 3] > 140) samples.push([x, y]);
      }
    }

    function drawStencil() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.font = '800 ' + fontPx + 'px ' + FAMILY;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#E9F1F9';
      ctx.fillText(q.ch, tx, ty);
      ctx.save();
      ctx.setLineDash([9, 7]);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#8FB3CF';
      ctx.strokeText(q.ch, tx, ty);
      ctx.restore();
    }
    drawStencil();

    var covered = new Array(samples.length);
    var coveredCount = 0, painted = 0, hits = 0;
    var drawing = false, done = false, last = null;
    var hue = ri(360);
    var fill = document.getElementById('traceFill');

    function markAt(px, py) {
      var hit = false;
      for (var i = 0; i < samples.length; i++) {
        var dx = samples[i][0] - px, dy = samples[i][1] - py;
        if (dx * dx + dy * dy < 400) { // within 20px of the stencil
          hit = true;
          if (!covered[i]) { covered[i] = true; coveredCount++; }
        }
      }
      painted++;
      if (hit) hits++;
    }

    function paintTo(px, py) {
      ctx.strokeStyle = 'hsl(' + hue + ', 88%, 56%)';
      ctx.fillStyle = ctx.strokeStyle;
      hue = (hue + 4) % 360;
      if (last) {
        var dx = px - last[0], dy = py - last[1];
        var steps = Math.max(1, Math.round(Math.sqrt(dx * dx + dy * dy) / 6));
        for (var s = 1; s <= steps; s++) {
          markAt(last[0] + dx * s / steps, last[1] + dy * s / steps);
        }
        ctx.lineWidth = 26;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(last[0], last[1]);
        ctx.lineTo(px, py);
        ctx.stroke();
      } else {
        markAt(px, py);
        ctx.beginPath();
        ctx.arc(px, py, 13, 0, Math.PI * 2);
        ctx.fill();
      }
      last = [px, py];

      var pct = samples.length ? coveredCount / samples.length : 1;
      if (fill) fill.style.width = Math.min(100, Math.round(pct * 113)) + '%';
      if (pct >= 0.88) finishTrace();
    }

    function finishTrace() {
      if (done) return;
      done = true;
      var accuracy = painted ? hits / painted : 1;
      var earned = accuracy >= 0.45;
      if (fill) fill.style.width = '100%';
      finishDrawing(earned,
        earned ? pick(D.PRAISE) : 'Ferdig! Prøv å male mer innenfor streken 🖌️',
        1400);
    }

    function pos(e) {
      var r = canvas.getBoundingClientRect();
      return [(e.clientX - r.left) * SIZE / r.width, (e.clientY - r.top) * SIZE / r.height];
    }
    canvas.addEventListener('pointerdown', function (e) {
      if (done) return;
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* old browsers */ }
      drawing = true;
      last = null;
      var p = pos(e); paintTo(p[0], p[1]);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drawing || done) return;
      e.preventDefault();
      var p = pos(e); paintTo(p[0], p[1]);
    });
    canvas.addEventListener('pointerup', function () { drawing = false; last = null; });
    canvas.addEventListener('pointercancel', function () { drawing = false; last = null; });

    document.getElementById('traceClear').addEventListener('click', function () {
      if (done) return;
      LekAudio.click();
      covered = new Array(samples.length);
      coveredCount = 0; painted = 0; hits = 0; last = null;
      if (fill) fill.style.width = '0%';
      drawStencil();
    });
  }

  /* ---------- Prikk til prikk ----------
     Tap the dots in number order; lines appear and the picture reveals. */

  function initDots(q) {
    var svg = board.querySelector('.dots-svg');
    var path = svg.querySelector('#dotsPath');
    var groups = svg.querySelectorAll('.dsdot');
    var pts = q.shape.pts;
    var nextI = 0, done = false, d = '';

    groups[0].classList.add('next'); // show where to start

    function complete() {
      done = true;
      if (q.shape.close) d += ' Z';
      path.setAttribute('d', d);
      path.setAttribute('fill', '#FFE9A8');
      path.setAttribute('fill-opacity', '0.55');

      var cx = 0, cy = 0;
      pts.forEach(function (p) { cx += p[0]; cy += p[1]; });
      var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', (cx / pts.length).toFixed(1));
      t.setAttribute('y', (cy / pts.length + 7).toFixed(1));
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '20');
      t.setAttribute('class', 'ds-emoji');
      t.textContent = q.shape.emoji;
      svg.appendChild(t);

      var earned = state.firstTry;
      finishDrawing(earned,
        (earned ? pick(D.PRAISE) : 'Bra! ') + ' Det ble ' + q.shape.name.toLowerCase() + '! ' + q.shape.emoji,
        1700);
    }

    groups.forEach(function (g) {
      g.addEventListener('click', function () {
        if (done) return;
        var i = Number(g.dataset.i);
        if (i === nextI) {
          g.classList.remove('next');
          g.classList.add('done');
          d += (d ? ' L ' : 'M ') + pts[i][0] + ' ' + pts[i][1];
          path.setAttribute('d', d);
          LekAudio.click();
          nextI++;
          if (nextI === pts.length) complete();
        } else if (i > nextI) {
          state.firstTry = false;
          g.classList.remove('shake');
          void g.getBoundingClientRect(); // force reflow so the shake can replay
          g.classList.add('shake');
          var fb = document.getElementById('fb');
          if (fb) { fb.textContent = pick(D.NUDGE); fb.className = 'feedback oops'; }
          LekAudio.bad();
          foxReact('sad');
        }
      });
    });
  }

  /* ---------- Eventyr ----------
     A tall, scrollable map through themed lands. Posts unlock one by one;
     the fox stands on the next post to play and walks onward when you
     clear it. Progress (stars per post) lives in localStorage. */

  var ADV_KEY = 'lekOgLaerEventyr';
  var ADV_SPACING = 96, ADV_PAD_TOP = 110, ADV_PAD_BOT = 84;
  var advFoxFrom = null; // post the fox walks from after a first clear

  function advLoad() {
    try {
      var adv = JSON.parse(localStorage.getItem(ADV_KEY));
      if (adv && adv.stars) return adv;
    } catch (e) { /* fall through */ }
    return { stars: {} };
  }
  function advSave(adv) {
    try { localStorage.setItem(ADV_KEY, JSON.stringify(adv)); } catch (e) { /* private mode */ }
  }

  function advMapHeight() {
    return ADV_PAD_TOP + ADV_PAD_BOT + (D.ADVENTURE.NODES.length - 1) * ADV_SPACING;
  }
  /* Post i's centre: winds left/right on the way up the map. x is a
     0–1 fraction of the map width, y is in px from the top. */
  function advPos(i) {
    return {
      x: 0.5 + 0.31 * Math.sin(i * 1.7 + 0.9),
      y: advMapHeight() - ADV_PAD_BOT - i * ADV_SPACING
    };
  }
  function advUnlocked(adv, i) { return i === 0 || !!adv.stars[i - 1]; }
  /* The frontier is the first uncleared post — where the fox stands. */
  function advFrontier(adv) {
    var n = D.ADVENTURE.NODES.length, i = 0;
    while (i < n && adv.stars[i]) i++;
    return Math.min(i, n - 1);
  }
  function advNodeLen(node) {
    if (node.mode === 'tegne' || node.mode === 'prikk') return 3;
    return node.boss ? 6 : 5;
  }
  function advNodeIcon(node) {
    return node.emoji || D.MODES[node.mode].icon;
  }

  function showAdventure() {
    state = null;
    var adv = advLoad();
    var NODES = D.ADVENTURE.NODES, AREAS = D.ADVENTURE.AREAS;
    var mapH = advMapHeight();
    var frontier = advFrontier(adv);
    var allDone = !!adv.stars[NODES.length - 1];
    var total = 0;
    NODES.forEach(function (_, i) { total += adv.stars[i] || 0; });

    board.innerHTML =
      '<div class="screen adventure">' +
        '<div class="top-row">' +
          '<button class="back-link" id="backBtn">← Til menyen</button>' +
          '<span class="chip">🗺️ Eventyr · ⭐ ' + total + '/' + NODES.length * 3 + '</span>' +
        '</div>' +
        '<div class="adv-scroll" id="advScroll">' +
          '<div class="adv-map" id="advMap" style="height:' + mapH + 'px"></div>' +
        '</div>' +
      '</div>';
    document.getElementById('backBtn').addEventListener('click', function () {
      LekAudio.click(); showMenu();
    });

    var scroll = document.getElementById('advScroll');
    var map = document.getElementById('advMap');
    var W = scroll.clientWidth; // build the map in px so the path stays true

    function px(i) { var p = advPos(i); return { x: p.x * W, y: p.y }; }

    /* Land bands (with a soft lock overlay until you reach them) */
    var html = '';
    AREAS.forEach(function (a, ai) {
      var firstI = -1, lastI = -1;
      NODES.forEach(function (n, i) {
        if (n.area !== ai) return;
        if (firstI === -1) firstI = i;
        lastI = i;
      });
      var yBot = ai === 0 ? mapH : advPos(firstI).y + ADV_SPACING / 2;
      var yTop = ai === AREAS.length - 1 ? 0 : advPos(lastI).y - ADV_SPACING / 2;
      var locked = !advUnlocked(adv, firstI);
      var decor = '';
      a.decor.forEach(function (em, k) {
        var dx = (k * 47 + ai * 31) % 82 + 6;
        var dy = 14 + (k * 89 + ai * 17) % Math.max(36, yBot - yTop - 58);
        decor += '<span class="adv-decor" style="left:' + dx + '%;top:' + dy + 'px">' + em + '</span>';
      });
      html +=
        '<div class="adv-band' + (locked ? ' locked' : '') + (a.dark ? ' dark' : '') + '"' +
          ' style="top:' + yTop + 'px;height:' + (yBot - yTop) + 'px;background:' + a.sky + '">' +
          decor +
          '<div class="adv-area-name">' + (locked ? '🔒 ' : '') + a.emoji + ' ' + a.name + '</div>' +
        '</div>';
    });

    /* The trail: dotted overall, solid gold up to the frontier */
    var dFull = '', dDone = '';
    NODES.forEach(function (_, i) {
      var p = px(i);
      var seg = (i ? ' L ' : 'M ') + p.x.toFixed(1) + ' ' + p.y;
      dFull += seg;
      if (i <= frontier) dDone += seg;
    });
    html +=
      '<svg class="adv-path" width="' + W + '" height="' + mapH + '" viewBox="0 0 ' + W + ' ' + mapH + '">' +
        '<path d="' + dFull + '" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="7" ' +
          'stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.5 14"/>' +
        '<path d="' + dDone + '" fill="none" stroke="#FFC53D" stroke-width="7" ' +
          'stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.5 14"/>' +
      '</svg>';

    /* Posts */
    NODES.forEach(function (node, i) {
      var p = px(i);
      var stars = adv.stars[i] || 0;
      var unlocked = advUnlocked(adv, i);
      var cls = 'adv-node' + (node.boss ? ' boss' : '') +
        (stars ? ' done' : unlocked ? ' next' : ' locked');
      var starsHtml = '';
      if (stars) {
        for (var k = 0; k < 3; k++) starsHtml += '<span class="' + (k < stars ? '' : 'off') + '">⭐</span>';
      }
      html +=
        '<button class="' + cls + '" data-i="' + i + '" ' +
          'style="left:' + p.x.toFixed(1) + 'px;top:' + p.y + 'px" ' +
          'aria-label="Post ' + (i + 1) + (unlocked ? '' : ' (låst)') + '">' +
          (node.boss ? '<span class="crown">👑</span>' : '') +
          '<span class="face">' + (unlocked ? advNodeIcon(node) : '🔒') + '</span>' +
          (stars ? '<span class="adv-stars">' + starsHtml + '</span>' : '') +
        '</button>';
    });

    /* The fox stands on the frontier post */
    var foxP = px(frontier);
    var fromP = advFoxFrom != null ? px(advFoxFrom) : foxP;
    html += '<div class="adv-fox" id="advFox" style="left:' + fromP.x.toFixed(1) + 'px;top:' + fromP.y + 'px">' +
            (allDone ? '🦊🏆' : '🦊') + '</div>';

    map.innerHTML = html;

    /* Walk the fox onward after a fresh clear (and celebrate new lands) */
    var startTop = Math.max(0, fromP.y - scroll.clientHeight / 2);
    scroll.scrollTop = startTop;
    if (advFoxFrom != null && advFoxFrom !== frontier) {
      var newLand = NODES[frontier].area !== NODES[advFoxFrom].area;
      var fox = document.getElementById('advFox');
      setTimeout(function () {
        fox.style.left = foxP.x.toFixed(1) + 'px';
        fox.style.top = foxP.y + 'px';
        scroll.scrollTo({ top: Math.max(0, foxP.y - scroll.clientHeight / 2), behavior: 'smooth' });
        if (newLand) {
          var a = AREAS[NODES[frontier].area];
          var banner = document.createElement('div');
          banner.className = 'adv-banner';
          banner.textContent = 'Nytt land: ' + a.emoji + ' ' + a.name + '!';
          scroll.parentElement.appendChild(banner);
          LekConfetti.burst(50);
          LekAudio.fanfare();
          setTimeout(function () { banner.remove(); }, 2600);
        }
      }, 350);
    }
    advFoxFrom = null;

    map.querySelectorAll('.adv-node').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.dataset.i);
        if (!advUnlocked(adv, i)) {
          LekAudio.bad();
          btn.classList.remove('shake');
          void btn.offsetWidth;
          btn.classList.add('shake');
          return;
        }
        LekAudio.start();
        if (i === frontier) {
          var fox = document.getElementById('advFox');
          if (fox) fox.classList.add('hop');
          setTimeout(function () { startAdventureNode(i); }, 420);
        } else {
          startAdventureNode(i); // replaying a cleared post
        }
      });
    });
  }

  function startAdventureNode(i) {
    var node = D.ADVENTURE.NODES[i];
    var len = advNodeLen(node);
    var qs;
    if (node.mix) {
      qs = [];
      for (var k = 0; k < len; k++) {
        var spec = node.mix[k % node.mix.length];
        qs.push(LekQuestions.buildRound(spec[0], spec[1], 1)[0]);
      }
      for (var j = qs.length - 1; j > 0; j--) {
        var r = ri(j + 1), t = qs[j]; qs[j] = qs[r]; qs[r] = t;
      }
    } else {
      qs = LekQuestions.buildRound(node.mode, node.level, len);
    }
    state = {
      mode: node.mode || 'mix',
      level: node.level || 3,
      len: len,
      qs: qs,
      i: 0,
      score: 0,
      streak: 0,
      results: [],
      firstTry: true,
      adv: i
    };
    showQuestion();
  }

  function showAdventureResult() {
    var i = state.adv, node = D.ADVENTURE.NODES[i];
    var s = state.score, len = state.len;
    var passed = s >= Math.ceil(len * 0.5);
    var starCount = !passed ? 0 :
      s >= Math.ceil(len * 0.85) ? 3 :
      s >= Math.ceil(len * 0.6) ? 2 : 1;

    var adv = advLoad();
    var firstClear = passed && !adv.stars[i];
    if (passed && starCount > (adv.stars[i] || 0)) {
      adv.stars[i] = starCount;
      advSave(adv);
    }
    if (firstClear) advFoxFrom = i;

    var lastNode = i === D.ADVENTURE.NODES.length - 1;
    var nextNode = lastNode ? null : D.ADVENTURE.NODES[i + 1];
    var opensLand = firstClear && nextNode && nextNode.area !== node.area;

    var msg = !passed ? 'Nesten! Prøv en gang til 💪' :
      lastNode && firstClear ? 'Du klarte hele eventyret! 🏆👑' :
      opensLand ? 'Du åpnet ' + D.ADVENTURE.AREAS[nextNode.area].name + '! 🎉' :
      s === len ? 'PERFEKT! Du er en superstjerne! 🏆' :
      'Kjempebra jobba! 🎉';

    var starsHtml = '';
    for (var k = 0; k < 3; k++) {
      starsHtml += '<span class="' + (k < starCount ? 'lit' : '') + '">⭐</span>';
    }

    board.innerHTML =
      '<div class="screen"><div class="result">' +
        '<div class="result-fox' + (passed ? ' dance' : '') + '">🦊' + (passed ? '🎉' : '') + '</div>' +
        '<h2>' + msg + '</h2>' +
        '<div class="stars" aria-label="' + starCount + ' av 3 stjerner">' + starsHtml + '</div>' +
        '<div class="score-line">Du klarte <strong>' + s + ' av ' + len + '</strong> på første forsøk!</div>' +
        '<div class="btn-row">' +
          (passed
            ? '<button class="cta primary" id="advNextBtn">Videre på kartet! 🗺️</button>' +
              '<button class="cta ghost" id="advRetryBtn">Spill igjen 🔁</button>'
            : '<button class="cta primary" id="advRetryBtn">Prøv igjen! 💪</button>' +
              '<button class="cta ghost" id="advNextBtn">Til kartet 🗺️</button>') +
        '</div>' +
      '</div></div>';

    if (passed) {
      LekAudio.fanfare();
      LekConfetti.burst(60);
      if (s === len) setTimeout(function () { LekConfetti.burst(40); }, 500);
      if (lastNode && firstClear) LekConfetti.goldRain(3500);
    } else {
      LekAudio.bad();
    }

    document.getElementById('advNextBtn').addEventListener('click', function () {
      LekAudio.click(); showAdventure();
    });
    document.getElementById('advRetryBtn').addEventListener('click', function () {
      advFoxFrom = null;
      LekAudio.start(); startAdventureNode(i);
    });
  }

  /* ---------- Result ---------- */

  function showResult() {
    if (state.adv != null) { showAdventureResult(); return; }
    var s = state.score, len = state.len;
    var starCount = s >= Math.ceil(len * 0.85) ? 3 : s >= Math.ceil(len * 0.5) ? 2 : 1;
    var isRecord = saveBest(state.mode, state.level, starCount);
    var msg =
      s === len ? 'PERFEKT! Du er en superstjerne! 🏆' :
      s >= len * 0.7 ? 'Kjempebra jobba! 🎉' :
      s >= len * 0.4 ? 'Bra jobba! 💪' :
      'God innsats! Øvelse gjør mester 🍀';

    var starsHtml = '';
    for (var k = 0; k < 3; k++) {
      starsHtml += '<span class="' + (k < starCount ? 'lit' : '') + '">⭐</span>';
    }

    var mode = state.mode, level = state.level;

    board.innerHTML =
      '<div class="screen"><div class="result">' +
        '<div class="result-fox' + (s >= 7 ? ' dance' : '') + '">🦊' + (s >= 7 ? '🎉' : '') + '</div>' +
        '<h2>' + msg + '</h2>' +
        '<div class="stars" aria-label="' + starCount + ' av 3 stjerner">' + starsHtml + '</div>' +
        (isRecord ? '<div class="record">Ny rekord! 🏅</div>' : '') +
        '<div class="score-line">Du klarte <strong>' + s + ' av ' + len + '</strong> på første forsøk!</div>' +
        '<div class="btn-row">' +
          '<button class="cta primary" id="againBtn">Spill igjen! 🔁</button>' +
          '<button class="cta ghost" id="levelBtn">Velg nivå 🎯</button>' +
          '<button class="cta ghost" id="menuBtn">Til menyen 🏠</button>' +
        '</div>' +
      '</div></div>';

    LekAudio.fanfare();
    LekConfetti.burst(60);
    setTimeout(function () { LekConfetti.burst(40); }, 500);
    if (s === ROUND_LEN) LekConfetti.goldRain(3000);

    document.getElementById('againBtn').addEventListener('click', function () {
      LekAudio.start(); startRound(mode, level);
    });
    document.getElementById('levelBtn').addEventListener('click', function () {
      LekAudio.click(); showLevels(mode);
    });
    document.getElementById('menuBtn').addEventListener('click', function () {
      LekAudio.click(); showMenu();
    });
  }

  /* ---------- Regne-racer ----------
     One minute on the clock: answer as many math questions as you can.
     Wrong answers cost nothing but time. */

  var RACE_SECONDS = 60;

  function saveRaceBest(level, count) {
    var best = loadBest();
    var key = 'racer-count-' + level;
    var prev = best[key] || 0;
    if (count <= prev) return { record: false, best: prev };
    best[key] = count;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(best)); } catch (e) { /* private mode */ }
    return { record: true, best: count };
  }

  function stopRaceTimer() {
    if (state && state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  }

  function startRace(level) {
    state = {
      mode: 'racer',
      level: level,
      queue: LekQuestions.buildRound('racer', level, 30),
      score: 0,
      timeLeft: RACE_SECONDS,
      timerId: null
    };
    raceCountdown(3);
  }

  function raceCountdown(n) {
    if (!state || state.mode !== 'racer') return;
    if (n === 0) {
      board.innerHTML = '<div class="screen"><div class="count-big go">GÅ! 🏁</div></div>';
      LekAudio.start();
      setTimeout(raceGo, 600);
      return;
    }
    board.innerHTML =
      '<div class="screen">' +
        '<div class="count-label">Klar… ferdig…</div>' +
        '<div class="count-big">' + n + '</div>' +
      '</div>';
    LekAudio.click();
    setTimeout(function () { raceCountdown(n - 1); }, 700);
  }

  function raceGo() {
    if (!state || state.mode !== 'racer') return;
    state.timerId = setInterval(raceTick, 1000);
    showRaceQuestion();
  }

  function raceTick() {
    if (!state || state.mode !== 'racer') return;
    state.timeLeft--;
    var el = document.getElementById('timer');
    if (el) {
      el.textContent = '⏱️ ' + state.timeLeft;
      if (state.timeLeft <= 10) el.classList.add('low');
    }
    if (state.timeLeft <= 0) endRace();
  }

  function showRaceQuestion() {
    if (!state.queue.length) state.queue = LekQuestions.buildRound('racer', state.level, 30);
    var q = state.queue.shift();
    var part = stageFor(q);
    var lvl = D.LEVELS[state.level - 1];

    var answersHtml = part.options.map(function (o) {
      return '<button class="ans" data-v="' + esc(o) + '">' + esc(o) + '</button>';
    }).join('');

    board.innerHTML =
      '<div class="screen">' +
        '<div class="top-row">' +
          '<button class="back-link" id="backBtn">← Til menyen</button>' +
          '<span class="chip">⚡ ' + lvl.icon + ' ' + lvl.name + '</span>' +
        '</div>' +
        '<div class="hud">' +
          '<span class="hud-fox" id="hudFox">🦊</span>' +
          '<span class="timer' + (state.timeLeft <= 10 ? ' low' : '') + '" id="timer">⏱️ ' + state.timeLeft + '</span>' +
          '<span class="race-score">⭐ ' + state.score + '</span>' +
        '</div>' +
        '<div class="stage">' + part.stage +
          '<div class="answers' + part.cls + '">' + answersHtml + '</div>' +
          '<div class="feedback" id="fb"></div>' +
        '</div>' +
      '</div>';

    document.getElementById('backBtn').addEventListener('click', function () {
      stopRaceTimer(); LekAudio.click(); showMenu();
    });
    board.querySelectorAll('.ans').forEach(function (b) {
      b.addEventListener('click', function () { answerRace(b, q); });
    });
  }

  function answerRace(btn, q) {
    if (!state || state.mode !== 'racer') return;
    if (String(q.answer) === btn.dataset.v) {
      btn.classList.add('good');
      board.querySelectorAll('.ans').forEach(function (b) { b.disabled = true; });
      state.score++;
      LekAudio.good();
      foxReact('jump');
      setTimeout(function () {
        if (state && state.mode === 'racer' && state.timerId) showRaceQuestion();
      }, 350);
    } else {
      btn.classList.add('bad');
      btn.disabled = true;
      LekAudio.bad();
      foxReact('sad');
    }
  }

  function endRace() {
    stopRaceTimer();
    var s = state.score, level = state.level;
    var starCount = s >= 15 ? 3 : s >= 8 ? 2 : 1;
    saveBest('racer', level, starCount);
    var raceBest = saveRaceBest(level, s);
    var msg =
      s >= 20 ? 'LYNRASK! Du er en racerstjerne! 🏎️' :
      s >= 15 ? 'Vanvittig fort! 🏆' :
      s >= 8 ? 'Kjempebra racet! 🎉' :
      'God innsats! Prøv en gang til 🍀';

    var starsHtml = '';
    for (var k = 0; k < 3; k++) {
      starsHtml += '<span class="' + (k < starCount ? 'lit' : '') + '">⭐</span>';
    }

    board.innerHTML =
      '<div class="screen"><div class="result">' +
        '<div class="result-fox' + (s >= 8 ? ' dance' : '') + '">🦊' + (s >= 8 ? '🏁' : '') + '</div>' +
        '<h2>' + msg + '</h2>' +
        '<div class="stars" aria-label="' + starCount + ' av 3 stjerner">' + starsHtml + '</div>' +
        (raceBest.record ? '<div class="record">Ny rekord! 🏅</div>' : '') +
        '<div class="score-line">Du klarte <strong>' + s + '</strong> på ett minutt!' +
          (raceBest.record ? '' : ' Rekorden din er <strong>' + raceBest.best + '</strong>.') +
        '</div>' +
        '<div class="btn-row">' +
          '<button class="cta primary" id="againBtn">Ny runde! 🔁</button>' +
          '<button class="cta ghost" id="levelBtn">Velg nivå 🎯</button>' +
          '<button class="cta ghost" id="menuBtn">Til menyen 🏠</button>' +
        '</div>' +
      '</div></div>';

    LekAudio.fanfare();
    LekConfetti.burst(60);
    if (s >= 15) LekConfetti.goldRain(2500);

    document.getElementById('againBtn').addEventListener('click', function () {
      LekAudio.start(); startRace(level);
    });
    document.getElementById('levelBtn').addEventListener('click', function () {
      LekAudio.click(); showLevels('racer');
    });
    document.getElementById('menuBtn').addEventListener('click', function () {
      LekAudio.click(); showMenu();
    });
  }

  /* ---------- Sound toggle ---------- */

  document.getElementById('soundBtn').addEventListener('click', function () {
    var on = !LekAudio.isEnabled();
    LekAudio.setEnabled(on);
    this.textContent = on ? '🔊' : '🔇';
    if (on) LekAudio.click();
  });

  showMenu();
})();
