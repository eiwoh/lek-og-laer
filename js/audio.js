/* Lek & Lær! — tiny WebAudio sound effects (no audio files needed) */

var LekAudio = (function () {
  'use strict';

  var enabled = true;
  var actx = null;

  function tone(freq, start, dur, type, vol) {
    if (!enabled) return;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = type || 'triangle';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, actx.currentTime + start);
      g.gain.exponentialRampToValueAtTime(vol || 0.18, actx.currentTime + start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + start + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(actx.currentTime + start);
      o.stop(actx.currentTime + start + dur + 0.05);
    } catch (e) { /* sound unavailable — play on silently */ }
  }

  return {
    setEnabled: function (on) { enabled = on; },
    isEnabled:  function () { return enabled; },

    click:   function () { tone(600, 0, .08, 'sine', .08); },
    good:    function () { tone(523, 0, .15); tone(659, .09, .15); tone(784, .18, .25); },
    bad:     function () { tone(200, 0, .2, 'sine', .12); },
    start:   function () { tone(392, 0, .12); tone(523, .1, .12); tone(659, .2, .2); },
    fanfare: function () {
      [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * .12, .3); });
      tone(1319, .5, .5);
    }
  };
})();
