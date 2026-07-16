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
        '</div>' +
      '</div>';
    board.querySelectorAll('.mode-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        LekAudio.click();
        showLevels(b.dataset.mode);
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

  function startRound(mode, level) {
    if (mode === 'racer') { startRace(level); return; }
    state = {
      mode: mode,
      level: level,
      qs: LekQuestions.buildRound(mode, level, ROUND_LEN),
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
    for (var k = 0; k < ROUND_LEN; k++) {
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
    }
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
    var lvl = D.LEVELS[state.level - 1];
    var m = D.MODES[state.mode];

    var answersHtml = part.options.map(function (o) {
      return '<button class="ans" data-v="' + esc(o) + '">' + esc(o) + '</button>';
    }).join('');

    board.innerHTML =
      '<div class="screen">' +
        '<div class="top-row">' +
          '<button class="back-link" id="backBtn">← Til menyen</button>' +
          '<span class="chip">' + m.icon + ' ' + lvl.icon + ' ' + lvl.name + '</span>' +
        '</div>' +
        '<div class="hud">' +
          '<span class="hud-fox" id="hudFox">🦊</span>' +
          dotsHtml() +
          '<div class="streak">' + (state.streak >= 3 ? '🔥 ' + state.streak + ' på rad!' : '') + '</div>' +
        '</div>' +
        '<div class="stage">' + part.stage +
          '<div class="answers' + part.cls + '">' + answersHtml + '</div>' +
          '<div class="feedback" id="fb"></div>' +
        '</div>' +
      '</div>';

    document.getElementById('backBtn').addEventListener('click', function () {
      LekAudio.click(); showMenu();
    });
    board.querySelectorAll('.ans').forEach(function (b) {
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
    state.i++;
    if (state.i >= ROUND_LEN) showResult();
    else showQuestion();
  }

  /* ---------- Result ---------- */

  function showResult() {
    var s = state.score;
    var starCount = s >= 9 ? 3 : s >= 5 ? 2 : 1;
    var isRecord = saveBest(state.mode, state.level, starCount);
    var msg =
      s === ROUND_LEN ? 'PERFEKT! Du er en superstjerne! 🏆' :
      s >= 7 ? 'Kjempebra jobba! 🎉' :
      s >= 4 ? 'Bra jobba! 💪' :
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
        '<div class="score-line">Du klarte <strong>' + s + ' av ' + ROUND_LEN + '</strong> på første forsøk!</div>' +
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
