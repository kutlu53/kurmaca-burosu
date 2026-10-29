/* audio.js — isteğe bağlı ses. Web Audio ile sentez, dosya yok. Varsayılan kapalı; düğmeyle açılır.
     KB.audio.enable() / disable() / toggle() → enabled
     KB.audio.tick()         tek tik (sırayla tik / tak)
     KB.audio.startTicking() / stopTicking()   saniyede bir tik
     KB.audio.gull()         kısa martı çığlığı (2-3 iniş)
     KB.audio.pin()          raptiye / delil "tak" sesi
   Tercih localStorage'da ("kurmaca-burosu-ses"); depolama yoksa oturumluk. */
window.KB = window.KB || {};
(function () {
  "use strict";
  const PREF = "kurmaca-burosu-ses";
  let ctx = null, timer = null, alt = false;
  const A = { enabled: false };

  function ensure() {
    if (ctx) return ctx;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; }
    return ctx;
  }
  const env = (g, t, peak, len) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + len); };

  A.enable = function () {
    if (!ensure()) return false;
    if (ctx.state === "suspended") ctx.resume();
    A.enabled = true; try { localStorage.setItem(PREF, "1"); } catch (e) { /* sessiz */ }
    return true;
  };
  A.disable = function () { A.enabled = false; A.stopTicking(); try { localStorage.setItem(PREF, "0"); } catch (e) { /* sessiz */ } };
  A.toggle = function () { if (A.enabled) A.disable(); else A.enable(); return A.enabled; };

  A.tick = function () {
    if (!A.enabled || !ctx) return;
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    alt = !alt;
    o.type = "square"; o.frequency.setValueAtTime(alt ? 1900 : 1500, t); o.frequency.exponentialRampToValueAtTime(alt ? 900 : 700, t + 0.03);
    f.type = "bandpass"; f.frequency.value = alt ? 2200 : 1800; f.Q.value = 2;
    env(g, t, 0.12, 0.05);
    o.connect(f).connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.07);
  };
  A.startTicking = function () { A.stopTicking(); if (!A.enabled) return; A.tick(); timer = setInterval(A.tick, 1000); };
  A.stopTicking = function () { clearInterval(timer); timer = null; };

  A.gull = function () {
    if (!A.enabled || !ctx) return;
    const t0 = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const t = t0 + i * 0.22, o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = "sawtooth"; o.frequency.setValueAtTime(1500 - i * 120, t); o.frequency.exponentialRampToValueAtTime(950 - i * 80, t + 0.16);
      f.type = "bandpass"; f.frequency.value = 1400; f.Q.value = 6;
      env(g, t, 0.07, 0.18);
      o.connect(f).connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.2);
    }
  };
  A.pin = function () {
    if (!A.enabled || !ctx) return;
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    env(g, t, 0.18, 0.09);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.1);
  };

  /* Kayıtlı tercih: ses bağlamı kullanıcı etkileşimi ister; ilk dokunuşta açılır */
  let wanted = false;
  try { wanted = localStorage.getItem(PREF) === "1"; } catch (e) { /* sessiz */ }
  A.wanted = () => wanted;
  if (wanted) document.addEventListener("pointerdown", function once() { document.removeEventListener("pointerdown", once); A.enable(); if (A.onchange) A.onchange(); }, { once: true });

  KB.audio = A;
})();
