/* board.js — pano: bağlantı değerlendirme, ip çizimi, sürükleme ve seçim.
   evalConn v1 ile birebir aynı derece ve metni verir. Görsel v2 (polaroid kart, tür ikonları) adım 7'de gelir. */
window.KB = window.KB || {};
(function () {
  "use strict";

  /* Bağ değerlendirme. Kural: CLAUDE.md §4.6.
     Dönüş: { grade, short, text } — text v1 ile aynı; short tek satır (v2 ekranı için). */
  KB.evalConn = function (a, b, type, CASE) {
    if (a === "merkez" || b === "merkez") {
      const o = a === "merkez" ? b : a;
      const g = CASE.centerFlow.includes(o) ? "guclu" : "zayif";
      return { grade: g, short: CASE.centerText[g].short, text: CASE.centerText[g].text };
    }
    const L = CASE.links.find((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a));
    if (!L) {
      const rh = CASE.redHerringId || "eller";
      if (a === rh || b === rh) return { grade: "zayif", short: CASE.redHerringShort, text: CASE.redHerring };
      return { grade: "yetersiz", short: CASE.insufficientShort, text: CASE.insufficient };
    }
    if (L.types.includes(type)) return { grade: L.grade, short: L.short, text: L.text };
    const better = L.types.map((t) => KB.TYPES[t]).join(" / ");
    return {
      grade: L.grade === "ustaca" ? "guclu" : "zayif",
      short: L.short,
      text: L.text + CASE.wrongTypeSuffix.replace("{types}", better)
    };
  };

  /* Kart merkezi (piksel). Konumlar yüzde cinsinden S.pos içinde. */
  function cardCenter(id, S, w, h) {
    if (id === "merkez") return { x: w / 2, y: h / 2 };
    const p = S.pos[id] || { x: 50, y: 50 };
    return { x: p.x / 100 * w, y: p.y / 100 * h };
  }

  /* İp rengi türe, biçimi dereceye göre: ustaca kalın + parlama, güçlü düz, zayıf kesik, yetersiz ince gri noktalı. */
  const GRADE_STYLE = {
    ustaca: { w: 3.6, dash: "", glow: true },
    guclu: { w: 2.6, dash: "", glow: false },
    zayif: { w: 2, dash: "7 6", glow: false },
    yetersiz: { w: 1.4, dash: "2 6", glow: false }
  };
  const stringColor = (c) => c.grade === "yetersiz" ? "var(--muted)" : `var(--ip-${c.type})`;

  /* İpleri tek SVG katmanına çizer: hafif sarkık eğri, sag = min(60, mesafe*0.12); ortada tür ikonu. */
  KB.drawStrings = function (S, board, svg) {
    if (!board || !svg) return;
    const w = board.clientWidth, h = board.clientHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const narrow = w < 600, r = narrow ? 9 : 11, ic = r * 1.6;
    svg.innerHTML = S.conns.map((c) => {
      const p1 = cardCenter(c.a, S, w, h), p2 = cardCenter(c.b, S, w, h);
      const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
      const d = Math.hypot(p2.x - p1.x, p2.y - p1.y), sag = Math.min(60, d * .12);
      const g = GRADE_STYLE[c.grade] || GRADE_STYLE.yetersiz, col = stringColor(c);
      const path = `M${p1.x} ${p1.y} Q${mx} ${my + sag} ${p2.x} ${p2.y}`;
      const glow = g.glow ? `<path d="${path}" fill="none" stroke="${col}" stroke-width="${g.w * 3}" opacity=".22" stroke-linecap="round"/>` : "";
      /* eğrinin orta noktası (t=0.5): kontrol noktasının yarı ağırlığı */
      const cx = (p1.x + 2 * mx + p2.x) / 4, cy = (p1.y + 2 * (my + sag) + p2.y) / 4;
      const badge = `<g transform="translate(${cx} ${cy})" style="color:var(--paper);--ic-bg:var(--cork)"><circle r="${r}" fill="var(--cork)" stroke="${col}" stroke-width="1.5"/><use href="#ic-tur-${c.type}" x="${-ic / 2}" y="${-ic / 2}" width="${ic}" height="${ic}"/></g>`;
      return `${glow}<path d="${path}" fill="none" stroke="${col}" stroke-width="${g.w}" ${g.dash ? `stroke-dasharray="${g.dash}"` : ""} stroke-linecap="round" opacity=".95"/>${badge}`;
    }).join("");
  };

  /* Pointer etkileşimi: 6 px altı hareket = dokunma (seçim), üstü = sürükleme.
     opts.getBoard(): pano elemanı · opts.onMove(id, x, y) · opts.onPick(id) · opts.onDrop() */
  KB.initBoard = function (opts) {
    let drag = null;
    document.addEventListener("pointerdown", (e) => {
      const card = e.target.closest(".card"); if (!card) return;
      const id = card.dataset.card;
      drag = { id, card, sx: e.clientX, sy: e.clientY, moved: false };
      if (id !== "merkez") card.setPointerCapture(e.pointerId);
    });
    document.addEventListener("pointermove", (e) => {
      if (!drag || drag.id === "merkez") return;
      if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
      drag.moved = true; drag.card.classList.add("dragging");
      const r = opts.getBoard().getBoundingClientRect();
      const x = Math.max(7, Math.min(93, (e.clientX - r.left) / r.width * 100));
      const y = Math.max(6, Math.min(94, (e.clientY - r.top) / r.height * 100));
      drag.card.style.left = x + "%"; drag.card.style.top = y + "%";
      opts.onMove(drag.id, x, y);
    });
    document.addEventListener("pointerup", () => {
      if (!drag) return;
      const d = drag; drag = null; d.card.classList.remove("dragging");
      if (d.moved) { opts.onDrop(); return; }
      opts.onPick(d.id);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".card"); if (!card) return;
      e.preventDefault(); opts.onPick(card.dataset.card);
    });
  };
})();
