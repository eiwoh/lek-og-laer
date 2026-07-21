/* Lek & Lær! — question generators for every mode and level.

   Question kinds:
     math     — plain equation text, numeric options
     mathgap  — equation with a missing number, numeric options
     count    — count the emojis, numeric options
     word     — picture shown, choose the matching word
     pic      — word shown, choose the matching picture
     letter   — word with a missing letter, choose the letter
     rhyme    — choose the word that rhymes
     sentence — read a sentence, answer with a picture
     trivia   — quiz question, text options
     clock    — analog clock face, choose the spoken time
     pattern  — number sequence, choose what comes next
     trace    — paint over a letter/number stencil (no answer buttons)
     dots     — connect-the-dots picture (no answer buttons)
     costcompare — two/three priced things, pick the dearest/cheapest
     afford      — a wallet and a price, can you afford it? (Ja/Nei)
     moneymath   — add two prices, or work out the change (numeric options)
*/

var LekQuestions = (function () {
  'use strict';

  var D = LekData;

  function ri(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[ri(arr.length)]; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = ri(i + 1), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Numeric answer options: the answer plus two nearby distractors.
     Whole-tens/hundreds answers get similar distractors so choices look alike. */
  function numOptions(ans) {
    var step = (ans >= 100 && ans % 100 === 0) ? 100 :
               (ans >= 20 && ans % 10 === 0) ? 10 : 1;
    var opts = [ans], guard = 0;
    while (opts.length < 3 && guard++ < 80) {
      var d = ans + (ri(2) ? 1 : -1) * step * (1 + ri(3));
      if (d >= 0 && opts.indexOf(d) === -1) opts.push(d);
    }
    while (opts.length < 3) opts.push(ans + step * opts.length);
    return shuffle(opts);
  }

  /* ---------- Math ---------- */

  function qPlus(maxSum) {
    var a = 1 + ri(maxSum - 1);
    var b = 1 + ri(Math.max(1, maxSum - a));
    return { kind: 'math', text: a + ' + ' + b + ' = ?', answer: a + b };
  }

  function qMinus(max) {
    var a = 2 + ri(max - 1);
    var b = 1 + ri(a - 1);
    return { kind: 'math', text: a + ' − ' + b + ' = ?', answer: a - b };
  }

  function qCount(lo, hi) {
    var n = lo + ri(hi - lo + 1);
    return { kind: 'count', emoji: pick(D.COUNT_EMOJI), n: n, answer: n };
  }

  /* Missing number: a + _ = c  (or  c − _ = a) */
  function qGap(maxSum) {
    var a = 1 + ri(maxSum - 2);
    var b = 1 + ri(maxSum - a - 1);
    var c = a + b;
    if (ri(2)) return { kind: 'mathgap', pre: a + ' + ', post: ' = ' + c, answer: b };
    return { kind: 'mathgap', pre: c + ' − ', post: ' = ' + a, answer: b };
  }

  /* Bigger numbers for level 3 */
  function qPlusBig() {
    if (ri(2)) { // two-digit + one-digit
      var a = 10 + ri(80), b = 1 + ri(9);
      return { kind: 'math', text: a + ' + ' + b + ' = ?', answer: a + b };
    }
    var t1 = 10 * (1 + ri(5)), t2 = 10 * (1 + ri(4)); // whole tens
    return { kind: 'math', text: t1 + ' + ' + t2 + ' = ?', answer: t1 + t2 };
  }

  function qMinusBig() {
    if (ri(2)) {
      var a = 15 + ri(75), b = 1 + ri(9);
      return { kind: 'math', text: a + ' − ' + b + ' = ?', answer: a - b };
    }
    var t1 = 10 * (3 + ri(7));
    var t2 = 10 * (1 + ri(t1 / 10 - 1));
    return { kind: 'math', text: t1 + ' − ' + t2 + ' = ?', answer: t1 - t2 };
  }

  function qTimes() {
    var t = pick([2, 5, 10]);
    var n = 1 + ri(10);
    return { kind: 'math', text: t + ' · ' + n + ' = ?', answer: t * n };
  }

  /* Levels 4–5: full tables, division (Norwegian schools write «:»),
     two-digit sums, doubling/halving, three terms and whole hundreds. */

  function qTimesFull() {
    var a = 2 + ri(9), b = 1 + ri(10);
    return { kind: 'math', text: a + ' · ' + b + ' = ?', answer: a * b };
  }

  function qDivideEasy() {
    var b = pick([2, 5, 10]), q = 1 + ri(10);
    return { kind: 'math', text: (b * q) + ' : ' + b + ' = ?', answer: q };
  }

  function qDivideHard() {
    var b = 2 + ri(8), q = 2 + ri(9);
    return { kind: 'math', text: (b * q) + ' : ' + b + ' = ?', answer: q };
  }

  function qPlusTwoDigit() {
    var a = 11 + ri(70);
    var b = 11 + ri(Math.max(1, 88 - a));
    return { kind: 'math', text: a + ' + ' + b + ' = ?', answer: a + b };
  }

  function qMinusTwoDigit() {
    var a = 30 + ri(70);
    var b = 11 + ri(a - 12);
    return { kind: 'math', text: a + ' − ' + b + ' = ?', answer: a - b };
  }

  /* Missing factor: 3 · _ = 12  or  _ · 3 = 12 */
  function qGapTimes() {
    var a = 2 + ri(9), b = 2 + ri(9);
    if (ri(2)) return { kind: 'mathgap', pre: a + ' · ', post: ' = ' + (a * b), answer: b };
    return { kind: 'mathgap', pre: '', post: ' · ' + a + ' = ' + (a * b), answer: b };
  }

  function qDoubleHalf() {
    if (ri(2)) {
      var n = 3 + ri(23);
      return { kind: 'math', small: true, text: 'Dobbelt av ' + n + ' = ?', answer: 2 * n };
    }
    var half = 2 + ri(19);
    return { kind: 'math', small: true, text: 'Halvparten av ' + (half * 2) + ' = ?', answer: half };
  }

  function qThreeTerm() {
    var a = 10 + ri(11), b = 1 + ri(9), c = 1 + ri(9);
    if (ri(2)) return { kind: 'math', text: a + ' + ' + b + ' − ' + c + ' = ?', answer: a + b - c };
    return { kind: 'math', text: a + ' − ' + b + ' + ' + c + ' = ?', answer: a - b + c };
  }

  function qHundreds() {
    if (ri(2)) {
      var h1 = 100 * (1 + ri(4)), h2 = 100 * (1 + ri(4));
      return { kind: 'math', text: h1 + ' + ' + h2 + ' = ?', answer: h1 + h2 };
    }
    var a = 100 * (3 + ri(6));
    var b = 100 * (1 + ri(a / 100 - 1));
    return { kind: 'math', text: a + ' − ' + b + ' = ?', answer: a - b };
  }

  /* ---------- Reading ---------- */

  function wordPool(minLen, maxLen) {
    return D.WORDS.filter(function (x) {
      return x.w.length >= minLen && x.w.length <= maxLen;
    });
  }

  function qWord(item, pool) { // picture -> word
    var others = shuffle(pool.filter(function (x) { return x.w !== item.w; })).slice(0, 2);
    return {
      kind: 'word', emoji: item.e, answer: item.w,
      options: shuffle([item.w].concat(others.map(function (x) { return x.w; })))
    };
  }

  function qPic(item, pool) { // word -> picture
    var others = shuffle(pool.filter(function (x) { return x.e !== item.e; })).slice(0, 2);
    return {
      kind: 'pic', word: item.w, answer: item.e,
      options: shuffle([item.e].concat(others.map(function (x) { return x.e; })))
    };
  }

  function qLetter(item) { // missing letter
    var idx = ri(item.w.length);
    var letter = item.w[idx];
    var opts = [letter], guard = 0;
    while (opts.length < 3 && guard++ < 60) {
      var l = pick(D.LETTERS);
      if (opts.indexOf(l) === -1) opts.push(l);
    }
    return {
      kind: 'letter', emoji: item.e, word: item.w,
      gapIndex: idx, answer: letter, options: shuffle(opts)
    };
  }

  function qRhyme(r) {
    return {
      kind: 'rhyme', word: r.q, answer: r.a,
      options: shuffle([r.a].concat(r.d))
    };
  }

  function qSentence(s) {
    return {
      kind: 'sentence', sentence: s.s, question: s.q, answer: s.a,
      options: shuffle([s.a].concat(s.d))
    };
  }

  /* ---------- Trivia ---------- */

  function qTrivia(t) {
    return {
      kind: 'trivia', emoji: t.e, question: t.q, answer: t.a,
      options: shuffle([t.a].concat(t.d))
    };
  }

  /* ---------- English ----------
     For Norwegian kids learning English. enpic shows a picture and asks
     for the English word; entrans shows a Norwegian word and asks for the
     English one; level 3 reuses the trivia layout with English questions. */

  function enOptions(item, pool) {
    var others = shuffle(pool.filter(function (x) { return x.en !== item.en; })).slice(0, 2);
    return shuffle([item.en].concat(others.map(function (x) { return x.en; })));
  }

  function qEnPic(item, pool) { // picture -> English word
    return { kind: 'enpic', emoji: item.e, answer: item.en, options: enOptions(item, pool) };
  }

  function qEnTrans(item, pool) { // Norwegian word -> English word
    return { kind: 'entrans', word: item.no, answer: item.en, options: enOptions(item, pool) };
  }

  function qEnTrivia(t) {
    return {
      kind: 'trivia', emoji: t.e, question: t.q, answer: t.a,
      options: shuffle([t.a].concat(t.d))
    };
  }

  /* ---------- Clock ----------
     Norwegian time words: "Klokka tre" (3:00), "Halv fire" (3:30),
     "Kvart over tre" (3:15), "Kvart på fire" (3:45). */

  function timeName(h, variant) {
    var nextH = h === 12 ? 1 : h + 1;
    switch (variant) {
      case 'hel':        return 'Klokka ' + D.CLOCK_NUM[h];
      case 'halv':       return 'Halv ' + D.CLOCK_NUM[nextH];
      case 'kvart-over': return 'Kvart over ' + D.CLOCK_NUM[h];
      case 'kvart-på':   return 'Kvart på ' + D.CLOCK_NUM[nextH];
    }
  }

  function timeMinutes(variant) {
    return variant === 'hel' ? 0 : variant === 'kvart-over' ? 15 :
           variant === 'halv' ? 30 : 45;
  }

  function qClock(variants, usedNames) {
    var h, variant, name, guard = 0;
    do {
      h = 1 + ri(12);
      variant = pick(variants);
      name = timeName(h, variant);
    } while (usedNames.indexOf(name) !== -1 && guard++ < 60);
    usedNames.push(name);

    // Distractors: other times at the same difficulty
    var opts = [name], g2 = 0;
    while (opts.length < 3 && g2++ < 80) {
      var dName = timeName(1 + ri(12), pick(variants));
      if (opts.indexOf(dName) === -1) opts.push(dName);
    }

    return {
      kind: 'clock', h: h, m: timeMinutes(variant),
      answer: name,
      options: shuffle(opts)
    };
  }

  /* ---------- Number patterns ----------
     seq shows the first numbers, the child picks what comes next. */

  function qPattern(start, step, len) {
    var seq = [], v = start;
    for (var i = 0; i < len; i++) { seq.push(v); v += step; }
    return { kind: 'pattern', seq: seq, answer: v };
  }

  function qPatternDouble(start, len) {
    var seq = [], v = start;
    for (var i = 0; i < len; i++) { seq.push(v); v *= 2; }
    return { kind: 'pattern', seq: seq, answer: v };
  }

  function patternRound(level, n) {
    var qs = [], seen = [], guard = 0;
    while (qs.length < n && guard++ < 300) {
      var r = ri(10), q;
      if (level === 1) {
        q = r < 5 ? qPattern(1 + ri(6), 1, 4) :
            r < 8 ? qPattern(ri(2) ? 2 : 1, 2, 4) :
                    qPattern(6 + ri(5), -1, 4);
      } else if (level === 2) {
        q = r < 3 ? qPattern(5 * (1 + ri(3)), 5, 4) :
            r < 6 ? qPattern(10 * (1 + ri(4)), 10, 4) :
            r < 8 ? qPattern(1 + ri(6), 3, 4) :
                    qPattern(12 + ri(9), -2, 4);
      } else {
        q = r < 3 ? qPatternDouble(1 + ri(3), 4) :
            r < 5 ? qPattern(2 + ri(6), 4, 4) :
            r < 7 ? qPattern(50 + 10 * ri(5), -10, 4) :
            r < 9 ? qPattern(1 + 2 * ri(4), 2, 4) :
                    qPattern(40 + 5 * ri(5), -5, 4);
      }
      var key = q.seq.join(',');
      if (seen.indexOf(key) !== -1) continue;
      seen.push(key);
      q.options = numOptions(q.answer);
      qs.push(q);
    }
    return qs;
  }

  /* ---------- Round builders ---------- */

  function mathRound(level, n) {
    var qs = [];
    for (var i = 0; i < n; i++) {
      var r = ri(10), q;
      if (level === 1) {
        q = r < 4 ? qPlus(10) : r < 7 ? qMinus(10) : qCount(3, 8);
      } else if (level === 2) {
        q = r < 3 ? qPlus(20) : r < 6 ? qMinus(20) : r < 8 ? qCount(6, 12) : qGap(15);
      } else if (level === 3) {
        q = r < 3 ? qPlusBig() : r < 6 ? qMinusBig() : r < 8 ? qTimes() : qGap(20);
      } else if (level === 4) {
        q = r < 3 ? qTimesFull() : r < 5 ? qDivideEasy() :
            r < 7 ? qPlusTwoDigit() : r < 9 ? qMinusTwoDigit() : qGapTimes();
      } else {
        q = r < 2 ? qThreeTerm() : r < 4 ? qTimesFull() : r < 6 ? qDivideHard() :
            r < 7 ? qDoubleHalf() : r < 8 ? qHundreds() :
            r < 9 ? qGapTimes() : qPlusTwoDigit();
      }
      q.options = numOptions(q.answer);
      qs.push(q);
    }
    return qs;
  }

  function readingRound(level, n) {
    var qs = [], i, items;
    if (level === 1) {
      // Short words only, match picture<->word both ways
      items = shuffle(wordPool(2, 4)).slice(0, n);
      var pool1 = wordPool(2, 4);
      items.forEach(function (item, k) {
        qs.push(k % 2 === 0 ? qWord(item, pool1) : qPic(item, pool1));
      });
    } else if (level === 2) {
      items = shuffle(wordPool(3, 5)).slice(0, n);
      var pool2 = wordPool(3, 5);
      items.forEach(function (item, k) {
        var t = k % 3;
        qs.push(t === 0 ? qWord(item, pool2) : t === 1 ? qLetter(item) : qPic(item, pool2));
      });
    } else {
      // Long words, rhymes and sentences
      var longWords = shuffle(wordPool(5, 99));
      var rhymes = shuffle(D.RHYMES);
      var sentences = shuffle(D.SENTENCES);
      for (i = 0; i < n; i++) {
        var t3 = i % 3;
        if (t3 === 0 && sentences.length) qs.push(qSentence(sentences.pop()));
        else if (t3 === 1 && rhymes.length) qs.push(qRhyme(rhymes.pop()));
        else qs.push(qLetter(longWords[i % longWords.length]));
      }
    }
    return shuffle(qs);
  }

  function triviaRound(level, n) {
    return shuffle(D.TRIVIA[level]).slice(0, n).map(qTrivia);
  }

  function englishRound(level, n) {
    var E = D.ENGLISH, qs = [], pool;
    if (level === 1) {
      pool = E.VOCAB[1];
      shuffle(pool).slice(0, n).forEach(function (item) { qs.push(qEnPic(item, pool)); });
    } else if (level === 2) {
      pool = E.VOCAB[1].concat(E.VOCAB[2]);
      shuffle(pool).slice(0, n).forEach(function (item, k) {
        qs.push(k % 2 === 0 ? qEnTrans(item, pool) : qEnPic(item, pool));
      });
    } else {
      pool = E.VOCAB[1].concat(E.VOCAB[2]);
      var trivia = shuffle(E.TRIVIA), words = shuffle(pool);
      for (var i = 0; i < n; i++) {
        if (i % 2 === 0 && trivia.length) qs.push(qEnTrivia(trivia.pop()));
        else qs.push(qEnTrans(words[i % words.length], pool));
      }
    }
    return shuffle(qs);
  }

  /* ---------- Tegne-leken ----------
     Level 1 paints uppercase letters, 2 paints digits, 3 lowercase. */

  function traceRound(level, n) {
    var pool = level === 1 ? D.TRACE.upper :
               level === 2 ? D.TRACE.digits : D.TRACE.lower;
    return shuffle(pool).slice(0, n).map(function (ch) {
      return { kind: 'trace', ch: ch, isDigit: level === 2 };
    });
  }

  /* ---------- Prikk til prikk ----------
     Levels 1–2 count 1, 2, 3…; level 3 skip-counts by 2, 5 or 10. */

  function dotsRound(level, n) {
    var pool = level === 3 ? D.SHAPES[2] : D.SHAPES[level];
    return shuffle(pool).slice(0, n).map(function (shape) {
      var step = level === 3 ? pick([2, 5, 10]) : 1;
      var labels = shape.pts.map(function (_, i) { return String(step + i * step); });
      return { kind: 'dots', shape: shape, labels: labels, step: step };
    });
  }

  /* ---------- Butikk-leken (money) ----------
     Level 1: two cheap things — which costs the most?
     Level 2: three things — most or least expensive.
     Level 3: can you afford it, add two prices, or work out the change. */

  function moneyPool(loP, hiP) {
    return D.MONEY.ITEMS.filter(function (x) { return x.p >= loP && x.p <= hiP; });
  }

  /* k things with distinct prices, so "mest"/"minst" has one clear answer. */
  function pickPricedItems(pool, k) {
    var order = shuffle(pool), chosen = [], usedP = [];
    for (var i = 0; i < order.length && chosen.length < k; i++) {
      if (usedP.indexOf(order[i].p) === -1) { chosen.push(order[i]); usedP.push(order[i].p); }
    }
    return chosen;
  }

  function qCostCompare(pool, count, most) {
    var items = pickPricedItems(pool, count);
    var target = items[0];
    items.forEach(function (it) {
      if (most ? it.p > target.p : it.p < target.p) target = it;
    });
    return {
      kind: 'costcompare', most: most, items: items,
      answer: target.w,
      options: items.map(function (it) { return it.w; })
    };
  }

  function qAfford(pool) {
    var item = pick(pool);
    var wallet;
    if (ri(2)) {                       // give enough (sometimes exactly enough)
      wallet = item.p + 5 * ri(6);
    } else {                           // give too little
      wallet = Math.max(1, item.p - 5 * (1 + ri(5)));
    }
    var yes = wallet >= item.p;
    return {
      kind: 'afford', item: item, wallet: wallet,
      answer: yes ? 'Ja 👍' : 'Nei 👎',
      options: ['Ja 👍', 'Nei 👎']
    };
  }

  function qMoneyTotal(pool) {
    var items = pickPricedItems(pool, 2);
    return {
      kind: 'moneymath', op: 'total', a: items[0], b: items[1],
      answer: items[0].p + items[1].p
    };
  }

  function qMoneyChange(pool) {
    var item = pick(pool);
    var denoms = [5, 10, 20, 50, 100, 200, 500, 1000];
    var paid = denoms[denoms.length - 1];
    for (var i = 0; i < denoms.length; i++) {
      if (denoms[i] > item.p) { paid = denoms[i]; break; }
    }
    return {
      kind: 'moneymath', op: 'change', item: item, paid: paid,
      answer: paid - item.p
    };
  }

  function moneyRound(level, n) {
    var qs = [], i;
    if (level === 1) {
      var pool1 = moneyPool(1, 30);
      for (i = 0; i < n; i++) qs.push(qCostCompare(pool1, 2, true));
    } else if (level === 2) {
      var pool2 = moneyPool(1, 200);
      for (i = 0; i < n; i++) qs.push(qCostCompare(pool2, 3, ri(10) < 6));
    } else {
      var poolAfford = moneyPool(1, 150);
      var poolTotal = moneyPool(1, 30);
      var poolChange = moneyPool(1, 100);
      for (i = 0; i < n; i++) {
        var r = ri(9);
        qs.push(r < 3 ? qAfford(poolAfford) :
                r < 6 ? qMoneyTotal(poolTotal) :
                        qMoneyChange(poolChange));
      }
    }
    qs.forEach(function (q) {
      if (q.kind === 'moneymath') q.options = numOptions(q.answer);
    });
    return qs;
  }

  /* ---------- Kode-roboten (learn to code) ----------
     A robot on a small grid. Each option is a command (a single move on
     levels 1–2, a two-move program on level 3). The child picks the one
     that lands the robot on the goal. Movements are stored as [dx,dy]
     steps so game.js can animate them without knowing the directions. */

  var ROBOT_DIRS = {
    right: { d: [1, 0],  arrow: '➡️', name: 'Høyre' },
    left:  { d: [-1, 0], arrow: '⬅️', name: 'Venstre' },
    up:    { d: [0, -1], arrow: '⬆️', name: 'Opp' },
    down:  { d: [0, 1],  arrow: '⬇️', name: 'Ned' }
  };
  var ROBOT_KEYS = ['right', 'left', 'up', 'down'];

  function robotBase(size, start, goal, goalEmoji, steps, opts) {
    opts = shuffle(opts);
    return {
      kind: 'robot', cols: size, rows: size,
      start: start, goal: goal, goalEmoji: goalEmoji, steps: steps,
      options: opts.map(function (o) { return o.label; }),
      optionHtml: opts.map(function (o) { return o.html; }),
      commands: opts.map(function (o) { return o.cmds; })
    };
  }

  // Levels 1–2: goal is one step away; all four directions are offered.
  function qRobotStep(size) {
    var sc, sr, key, gc, gr, guard = 0;
    do {
      sc = ri(size); sr = ri(size);
      key = pick(ROBOT_KEYS);
      gc = sc + ROBOT_DIRS[key].d[0];
      gr = sr + ROBOT_DIRS[key].d[1];
    } while ((gc < 0 || gc >= size || gr < 0 || gr >= size) && guard++ < 60);

    var opts = ROBOT_KEYS.map(function (k) {
      var dir = ROBOT_DIRS[k];
      return {
        label: dir.name, cmds: [dir.d],
        html: '<span class="rb-arrow">' + dir.arrow + '</span><small>' + dir.name + '</small>'
      };
    });
    var q = robotBase(size, [sc, sr], [gc, gr], pick(D.ROBOT.GOALS), 1, opts);
    q.answer = ROBOT_DIRS[key].name;
    return q;
  }

  // Level 3: a two-command "program". Goal is two steps from the start.
  function qRobotSeq(size) {
    var sc, sr, k1, k2, mc, mr, gc, gr, guard = 0;
    do {
      sc = ri(size); sr = ri(size);
      k1 = pick(ROBOT_KEYS); k2 = pick(ROBOT_KEYS);
      mc = sc + ROBOT_DIRS[k1].d[0]; mr = sr + ROBOT_DIRS[k1].d[1];
      gc = mc + ROBOT_DIRS[k2].d[0]; gr = mr + ROBOT_DIRS[k2].d[1];
    } while ((mc < 0 || mc >= size || mr < 0 || mr >= size ||
              gc < 0 || gc >= size || gr < 0 || gr >= size ||
              (gc === sc && gr === sr)) && guard++ < 100);

    function seqOpt(a, b) {
      var da = ROBOT_DIRS[a], db = ROBOT_DIRS[b];
      return {
        keys: a + b, cmds: [da.d, db.d],
        label: da.name + ' + ' + db.name,
        html: '<span class="rb-prog">' +
                '<span class="rb-arrow">' + da.arrow + '</span>' +
                '<span class="rb-step">så</span>' +
                '<span class="rb-arrow">' + db.arrow + '</span>' +
              '</span>'
      };
    }
    var opts = [seqOpt(k1, k2)], g2 = 0;
    while (opts.length < 3 && g2++ < 80) {
      var a = pick(ROBOT_KEYS), b = pick(ROBOT_KEYS);
      var ec = sc + ROBOT_DIRS[a].d[0] + ROBOT_DIRS[b].d[0];
      var er = sr + ROBOT_DIRS[a].d[1] + ROBOT_DIRS[b].d[1];
      if (ec === gc && er === gr) continue;       // would also reach the goal
      var o = seqOpt(a, b);
      if (opts.some(function (x) { return x.keys === o.keys; })) continue;
      opts.push(o);
    }
    var q = robotBase(size, [sc, sr], [gc, gr], pick(D.ROBOT.GOALS), 2, opts);
    q.answer = ROBOT_DIRS[k1].name + ' + ' + ROBOT_DIRS[k2].name;
    return q;
  }

  /* Level 4 (Ekspert): loops + obstacles. The correct answer is a program
     of two "loop" segments — a direction repeated N times (⬆️ ×3) — that
     steers the robot around 🧱 walls to the goal. Wrong programs miss the
     goal or crash into a wall. */
  function robotFlatten(segs) {
    var out = [];
    segs.forEach(function (s) {
      var d = ROBOT_DIRS[s.key].d;
      for (var i = 0; i < s.count; i++) out.push(d);
    });
    return out;
  }
  function robotIsWall(walls, c, r) {
    return walls.some(function (w) { return w[0] === c && w[1] === r; });
  }
  // Walk a flat command list; returns where the robot stops and whether it reached the goal.
  function robotSim(sc, sr, cmds, size, walls, goal) {
    var c = sc, r = sr;
    for (var i = 0; i < cmds.length; i++) {
      var nc = c + cmds[i][0], nr = r + cmds[i][1];
      if (nc < 0 || nc >= size || nr < 0 || nr >= size || robotIsWall(walls, nc, nr))
        return false;                       // crashed — never reaches the goal
      c = nc; r = nr;
    }
    return c === goal[0] && r === goal[1];
  }
  function robotProgOpt(segs) {
    return {
      keys: segs.map(function (s) { return s.key + s.count; }).join('|'),
      cmds: robotFlatten(segs),
      label: segs.map(function (s) { return ROBOT_DIRS[s.key].name + ' ×' + s.count; }).join(' + '),
      html: '<span class="rb-prog">' +
        segs.map(function (s) {
          return '<span class="rb-loop"><span class="rb-arrow">' + ROBOT_DIRS[s.key].arrow +
                 '</span><span class="rb-times">×' + s.count + '</span></span>';
        }).join('<span class="rb-step">så</span>') +
      '</span>'
    };
  }

  function qRobotExpert(size) {
    var hKeys = ['right', 'left'], vKeys = ['up', 'down'];
    var guard = 0;
    while (guard++ < 200) {
      var h = pick(hKeys), v = pick(vKeys);
      var hdx = ROBOT_DIRS[h].d[0], vdy = ROBOT_DIRS[v].d[1];
      var a = ri(3) + 1, b = ri(3) + 1;              // 1..3 steps per loop
      if (a + b < 3 || (a < 2 && b < 2)) continue;   // expert feel + a real loop count
      var hFirst = ri(2) === 0;
      var sc = ri(size), sr = ri(size);
      var gc = sc + a * hdx, gr = sr + b * vdy;
      if (gc < 0 || gc >= size || gr < 0 || gr >= size) continue;

      var correct = hFirst ? [{ key: h, count: a }, { key: v, count: b }]
                           : [{ key: v, count: b }, { key: h, count: a }];
      var correctCmds = robotFlatten(correct);
      // Cells the correct path visits (walls must never sit on these).
      var pathSet = {}, pc = sc, pr = sr;
      pathSet[pc + ',' + pr] = 1;
      correctCmds.forEach(function (d) { pc += d[0]; pr += d[1]; pathSet[pc + ',' + pr] = 1; });

      // The opposite L-corner sits on the swapped-order route — a natural wall spot.
      var walls = [];
      var oppCorner = hFirst ? [sc, gr] : [gc, sr];
      if (!pathSet[oppCorner[0] + ',' + oppCorner[1]]) walls.push(oppCorner);
      // A couple more obstacles for maze flavour, never on the correct path.
      var wg = 0;
      while (walls.length < 3 && wg++ < 40) {
        var wc = ri(size), wr = ri(size);
        if (pathSet[wc + ',' + wr]) continue;
        if (walls.some(function (w) { return w[0] === wc && w[1] === wr; })) continue;
        walls.push([wc, wr]);
      }

      // Candidate wrong programs, then keep the ones that don't reach the goal.
      var cand = [
        hFirst ? [{ key: v, count: b }, { key: h, count: a }]      // swapped order
               : [{ key: h, count: a }, { key: v, count: b }],
        [{ key: h, count: a }, { key: v, count: b + 1 }],
        [{ key: h, count: a + 1 }, { key: v, count: b }],
        [{ key: h, count: a }, { key: v, count: Math.max(1, b - 1) }],
        [{ key: h, count: Math.max(1, a - 1) }, { key: v, count: b }],
        [{ key: h, count: a + b }],
        [{ key: v, count: a + b }],
        hFirst ? [{ key: v, count: b }, { key: h, count: a + 1 }]
               : [{ key: h, count: a + 1 }, { key: v, count: b }]
      ];
      var correctKeys = robotProgOpt(correct).keys;
      var wrongs = [], seen = {};
      shuffle(cand).forEach(function (segs) {
        if (wrongs.length >= 2) return;
        var o = robotProgOpt(segs);
        if (o.keys === correctKeys || seen[o.keys]) return;
        if (robotSim(sc, sr, o.cmds, size, walls, [gc, gr])) return; // would also win
        seen[o.keys] = 1;
        wrongs.push(o);
      });
      if (wrongs.length < 2) continue;

      var opts = [robotProgOpt(correct)].concat(wrongs);
      var q = robotBase(size, [sc, sr], [gc, gr], pick(D.ROBOT.GOALS), a + b, opts);
      q.walls = walls;
      q.answer = correct.map(function (s) { return ROBOT_DIRS[s.key].name + ' ×' + s.count; }).join(' + ');
      return q;
    }
    return qRobotSeq(size);                 // safety net — should never be hit
  }

  /* Level 5 (Mester): no ready-made options — the child assembles the whole
     program one move at a time from a palette of arrows, then runs it. We lay
     out a winding, self-avoiding path from start to goal (so a solution always
     exists) and scatter 🧱 walls off that path for maze flavour. Any program
     the child builds that reaches the goal without crashing wins. */
  function qRobotBuild(size) {
    var guard = 0;
    while (guard++ < 250) {
      var len = 4 + ri(3);                        // 4..6 moves in the shortest path
      var sc = ri(size), sr = ri(size);
      var c = sc, r = sr;
      var occ = {}; occ[c + ',' + r] = 1;
      var lastKey = null, turns = 0, dead = false;
      for (var step = 0; step < len; step++) {
        var choices = ROBOT_KEYS.filter(function (k) {
          var nc = c + ROBOT_DIRS[k].d[0], nr = r + ROBOT_DIRS[k].d[1];
          return nc >= 0 && nc < size && nr >= 0 && nr < size && !occ[nc + ',' + nr];
        });
        if (!choices.length) { dead = true; break; }
        // Prefer keeping straight only sometimes, so the path bends a couple of times.
        var key = (lastKey && choices.indexOf(lastKey) >= 0 && ri(3) > 0) ? lastKey : pick(choices);
        if (lastKey && key !== lastKey) turns++;
        lastKey = key;
        c += ROBOT_DIRS[key].d[0]; r += ROBOT_DIRS[key].d[1];
        occ[c + ',' + r] = 1;
      }
      if (dead || turns < 2) continue;            // want a genuinely bendy route
      var gc = c, gr = r;
      if (gc === sc && gr === sr) continue;

      var walls = [], wg = 0, wantWalls = 3 + ri(2);   // 3..4 obstacles
      while (walls.length < wantWalls && wg++ < 80) {
        var wc = ri(size), wr = ri(size);
        if (occ[wc + ',' + wr]) continue;              // never on the solution path
        if (wc === gc && wr === gr) continue;
        if (walls.some(function (w) { return w[0] === wc && w[1] === wr; })) continue;
        walls.push([wc, wr]);
      }

      var q = robotBase(size, [sc, sr], [gc, gr], pick(D.ROBOT.GOALS), len, []);
      q.build = true;
      q.walls = walls;
      q.palette = ROBOT_KEYS.map(function (k) {
        var dir = ROBOT_DIRS[k];
        return { arrow: dir.arrow, name: dir.name, d: dir.d };
      });
      return q;
    }
    return qRobotExpert(size);                     // safety net — should never be hit
  }

  /* Level 6 (Forvandling): the robot can change shape. Two extra commands
     join the arrow palette — 🔽 "Bli liten" and 🔼 "Bli stor". Some cells on
     the path are gates the robot can only enter in the right shape: a tunnel
     🕳️ needs a SMALL robot, deep water 💧 needs a BIG one. The child lays out
     the whole program (moves + transforms) and runs it. Shape is a state that
     sticks until the next transform, so this teaches state on top of sequencing. */
  var ROBOT_TRANSFORMS = [
    { transform: 'small', arrow: '🔽', name: 'Bli liten' },
    { transform: 'big',   arrow: '🔼', name: 'Bli stor' }
  ];
  var ROBOT_GATE_EMOJI = { small: '🕳️', big: '💧' };

  function qRobotTransform(size) {
    var guard = 0;
    while (guard++ < 300) {
      var len = 5 + ri(2);                        // 5..6 moves in the shortest path
      var sc = ri(size), sr = ri(size);
      var c = sc, r = sr;
      var occ = {}; occ[c + ',' + r] = 1;
      var path = [[c, r]];
      var lastKey = null, turns = 0, dead = false;
      for (var step = 0; step < len; step++) {
        var choices = ROBOT_KEYS.filter(function (k) {
          var nc = c + ROBOT_DIRS[k].d[0], nr = r + ROBOT_DIRS[k].d[1];
          return nc >= 0 && nc < size && nr >= 0 && nr < size && !occ[nc + ',' + nr];
        });
        if (!choices.length) { dead = true; break; }
        var key = (lastKey && choices.indexOf(lastKey) >= 0 && ri(3) > 0) ? lastKey : pick(choices);
        if (lastKey && key !== lastKey) turns++;
        lastKey = key;
        c += ROBOT_DIRS[key].d[0]; r += ROBOT_DIRS[key].d[1];
        occ[c + ',' + r] = 1;
        path.push([c, r]);
      }
      if (dead || turns < 2) continue;            // want a genuinely bendy route
      var gc = c, gr = r;
      if (gc === sc && gr === sr) continue;

      // Gates sit on interior path cells (never the start or the goal).
      var interior = shuffle(path.slice(1, path.length - 1));
      if (interior.length < 2) continue;
      var gateCount = interior.length >= 3 ? 1 + ri(2) : 1;   // 1..2 gates
      var needs = shuffle(['small', 'big']);      // when there are 2, one of each
      var gates = [];
      for (var gi = 0; gi < gateCount; gi++) {
        var cell = interior[gi], need = needs[gi % 2];
        gates.push({ c: cell[0], r: cell[1], need: need, emoji: ROBOT_GATE_EMOJI[need] });
      }

      var walls = [], wg = 0, wantWalls = 2 + ri(2);         // 2..3 obstacles
      while (walls.length < wantWalls && wg++ < 80) {
        var wc = ri(size), wr = ri(size);
        if (occ[wc + ',' + wr]) continue;                    // never on the solution path
        if (wc === gc && wr === gr) continue;
        if (walls.some(function (w) { return w[0] === wc && w[1] === wr; })) continue;
        walls.push([wc, wr]);
      }

      var q = robotBase(size, [sc, sr], [gc, gr], pick(D.ROBOT.GOALS), len, []);
      q.build = true;
      q.transform = true;
      q.walls = walls;
      q.gates = gates;
      q.palette = ROBOT_KEYS.map(function (k) {
        var dir = ROBOT_DIRS[k];
        return { arrow: dir.arrow, name: dir.name, d: dir.d };
      }).concat(ROBOT_TRANSFORMS.map(function (t) {
        return { arrow: t.arrow, name: t.name, transform: t.transform };
      }));
      return q;
    }
    return qRobotBuild(size);                       // safety net — should never be hit
  }

  function robotRound(level, n) {
    var qs = [];
    for (var i = 0; i < n; i++) {
      qs.push(level === 1 ? qRobotStep(3) :
              level === 2 ? qRobotStep(4) :
              level === 3 ? qRobotSeq(4) :
              level === 4 ? qRobotExpert(5) :
              level === 5 ? qRobotBuild(5) : qRobotTransform(5));
    }
    return qs;
  }

  function clockRound(level, n) {
    var variants = level === 1 ? ['hel'] :
                   level === 2 ? ['hel', 'halv'] :
                                 ['halv', 'kvart-over', 'kvart-på'];
    var used = [], qs = [];
    for (var i = 0; i < n; i++) qs.push(qClock(variants, used));
    return qs;
  }

  return {
    buildRound: function (mode, level, n) {
      switch (mode) {
        case 'matte':   return mathRound(level, n);
        case 'racer':   return mathRound(level, n); // the race reuses math questions
        case 'monster': return patternRound(level, n);
        case 'lesing':  return readingRound(level, n);
        case 'quiz':    return triviaRound(level, n);
        case 'klokke':  return clockRound(level, n);
        case 'engelsk': return englishRound(level, n);
        case 'penger':  return moneyRound(level, n);
        case 'tegne':   return traceRound(level, n);
        case 'prikk':   return dotsRound(level, n);
        case 'kode':    return robotRound(level, n);
      }
    }
  };
})();
