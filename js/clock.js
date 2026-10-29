/* clock.js — tekrar kullanılabilir SVG saat bileşeni.
     KB.createClock({ size, hour, minute, ticking, style, label }) → <svg> elemanı
       style:   "duvar" | "masa" | "cep" | "kol"
       ticking: true ise saniye ibresi görünür ve ilerler
       label:   ekran okuyucu için aria-label (varsayılan "Saat 9.20")
     el.setTime(h, m, { animate, duration, turns })   akrep/yelkovanı döndürür (final animasyonu)
     el.getTime() → { hour, minute }
     el.setTicking(bool)
   Hareket azaltma tercihi varsa animasyon atlanır. Renkler yalnızca CSS tokenlarından. */
window.KB = window.KB || {};
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* Kasa çizimleri: her biri (svg) alır, kadran yarıçapını döndürür. viewBox 0 0 100 100, merkez (50,50). */
  const CASES = {
    duvar(svg) {
      el("circle", { cx: 50, cy: 50, r: 47, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 50, r: 40, class: "ck-face" }, svg);
      return 40;
    },
    masa(svg) {
      /* ayaklar ve çanlar */
      el("path", { d: "M26 84L18 96H30ZM74 84L82 96H70Z", class: "ck-rim" }, svg);
      el("circle", { cx: 30, cy: 16, r: 9, class: "ck-rim" }, svg);
      el("circle", { cx: 70, cy: 16, r: 9, class: "ck-rim" }, svg);
      el("rect", { x: 47, y: 4, width: 6, height: 10, rx: 1, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 52, r: 38, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 52, r: 32, class: "ck-face" }, svg);
      svg.dataset.cy = 52;
      return 32;
    },
    cep(svg) {
      /* halka, kurma kolu, gümüş kasa */
      el("circle", { cx: 50, cy: 7, r: 5, class: "ck-ring" }, svg);
      el("rect", { x: 45, y: 10, width: 10, height: 8, rx: 2, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 56, r: 42, class: "ck-rim ck-silver" }, svg);
      el("circle", { cx: 50, cy: 56, r: 36, class: "ck-face" }, svg);
      svg.dataset.cy = 56;
      return 36;
    },
    kol(svg) {
      el("rect", { x: 34, y: 0, width: 32, height: 100, rx: 8, class: "ck-strap" }, svg);
      el("path", { d: "M40 8H60M40 92H60", class: "ck-strap-line" }, svg);
      el("rect", { x: 84, y: 45, width: 6, height: 10, rx: 1, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 50, r: 34, class: "ck-rim" }, svg);
      el("circle", { cx: 50, cy: 50, r: 28, class: "ck-face" }, svg);
      return 28;
    }
  };

  const norm = (a) => ((a % 360) + 360) % 360;

  KB.createClock = function (opts) {
    const o = Object.assign({ size: 120, hour: 9, minute: 20, ticking: false, style: "duvar", label: null }, opts || {});
    const svg = el("svg", { viewBox: "0 0 100 100", width: o.size, height: o.size, class: "clock clock-" + o.style, role: "img" });
    svg.setAttribute("aria-label", o.label || `Saat ${o.hour}.${String(o.minute).padStart(2, "0")}`);
    const r = (CASES[o.style] || CASES.duvar)(svg);
    const cy = +(svg.dataset.cy || 50), cx = 50;

    /* kadran çizgileri: 12 tik, 4'ü kalın */
    const ticks = el("g", { class: "ck-ticks" }, svg);
    for (let i = 0; i < 12; i++) {
      const big = i % 3 === 0, len = big ? r * .16 : r * .09;
      el("line", { x1: cx, y1: cy - r + 3, x2: cx, y2: cy - r + 3 + len, transform: `rotate(${i * 30} ${cx} ${cy})`, class: big ? "ck-tick ck-tick-big" : "ck-tick" }, ticks);
    }

    /* ibreler */
    const hourG = el("g", { class: "ck-hand-g" }, svg);
    el("line", { x1: cx, y1: cy + r * .12, x2: cx, y2: cy - r * .52, class: "ck-hand ck-hour" }, hourG);
    const minG = el("g", { class: "ck-hand-g" }, svg);
    el("line", { x1: cx, y1: cy + r * .14, x2: cx, y2: cy - r * .78, class: "ck-hand ck-minute" }, minG);
    const secG = el("g", { class: "ck-hand-g ck-sec-g" }, svg);
    el("line", { x1: cx, y1: cy + r * .2, x2: cx, y2: cy - r * .84, class: "ck-hand ck-second" }, secG);
    el("circle", { cx, cy, r: r * .06, class: "ck-pin" }, svg);

    let hAng = 0, mAng = 0, sAng = 0, anim = null, tickTimer = null;
    const apply = () => {
      hourG.setAttribute("transform", `rotate(${hAng} ${cx} ${cy})`);
      minG.setAttribute("transform", `rotate(${mAng} ${cx} ${cy})`);
      secG.setAttribute("transform", `rotate(${sAng} ${cx} ${cy})`);
    };
    const anglesOf = (h, m) => ({ h: ((h % 12) + m / 60) * 30, m: m * 6 });

    svg.setTime = function (h, m, a) {
      a = Object.assign({ animate: false, duration: 1600, turns: 0 }, a || {});
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      const t = anglesOf(h, m);
      svg.setAttribute("aria-label", o.label || `Saat ${h}.${String(m).padStart(2, "0")}`);
      if (!a.animate || reduced()) { hAng = t.h; mAng = t.m; apply(); return svg; }
      /* hep saat yönünde; turns kadar fazladan tam tur */
      const h0 = hAng, m0 = mAng;
      const dh = norm(t.h - h0) + a.turns * 360, dm = norm(t.m - m0) + a.turns * 360 * 12;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / a.duration), e = 1 - Math.pow(1 - p, 3);
        hAng = h0 + dh * e; mAng = m0 + dm * e; apply();
        if (p < 1) anim = requestAnimationFrame(step); else { anim = null; hAng = t.h; mAng = t.m; apply(); svg.dispatchEvent(new CustomEvent("clockset")); }
      };
      anim = requestAnimationFrame(step);
      return svg;
    };
    svg.getTime = () => ({ hour: Math.floor(norm(hAng) / 30) % 12, minute: Math.round(norm(mAng) / 6) % 60 });
    svg.setTicking = function (on) {
      clearInterval(tickTimer); tickTimer = null;
      svg.classList.toggle("ticking", !!on);
      if (!on) return svg;
      sAng = (new Date().getSeconds()) * 6; apply();
      tickTimer = setInterval(() => {
        if (!svg.isConnected) { clearInterval(tickTimer); tickTimer = null; return; }
        sAng = norm(sAng + 6); apply();
      }, 1000);
      return svg;
    };

    svg.setTime(o.hour, o.minute);
    if (o.ticking) svg.setTicking(true);
    return svg;
  };
})();
