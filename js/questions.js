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
      }
    }
  };
})();
