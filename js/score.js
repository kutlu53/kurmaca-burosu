/* score.js — puanlama, unvan, öğretmen özeti.
   v1 ile birebir aynı sonuç verir (aynı girdiler → aynı puan). Puan tablosu: CLAUDE.md §4.9. */
window.KB = window.KB || {};
(function () {
  "use strict";

  KB.fmtTime = function (ms) {
    const s = Math.floor(ms / 1000);
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  };

  const CONN_PTS = { ustaca: 3, guclu: 2, zayif: 0, yetersiz: 0 };
  const CENTER_PTS = { ustaca: 4, guclu: 3, zayif: 1, duz: 0 };
  const CONN_MAX = 24;

  /* S: durum, CASE: vaka. foundIds: bulunan ipucu kimlikleri (sırayla). */
  KB.score = function (S, CASE) {
    const F = CASE.final, CLUE_IDS = Object.keys(CASE.clues);
    const foundIds = CLUE_IDS.filter((id) => S.found[id]);
    let pts = 0, max = 0;

    const clues = foundIds.length; pts += clues; max += CLUE_IDS.length;

    S.conns.forEach((c) => { pts += CONN_PTS[c.grade]; });
    max += CONN_MAX;

    const L = CASE.location;
    if (S.loc.done) {
      if (S.loc.ans === L.answer) pts += 2;
      pts += S.loc.ev.filter((e) => L.evidence.includes(e)).length;
    }
    max += 5;

    const whoOk = S.fin.who === F.who.answer; if (whoOk) pts += 3; max += 3;
    const evOk = S.fin.ev.filter((e) => F.evidence.includes(e)).length; pts += evOk; max += F.evidenceMax || 4;
    const whyOk = S.fin.why === F.why.answer; if (whyOk) pts += 3; max += 3;
    const cOpt = F.center.options.find((o) => o.id === S.fin.center);
    const cPts = CENTER_PTS[cOpt && cOpt.grade] || 0; pts += cPts; max += 4;
    const rep = S.fin.report.trim().length >= (F.reportMin || 60); if (rep) pts += 2; max += 2;

    pts = Math.min(pts, max);
    const ratio = pts / max;
    const rank = ratio >= .75 ? "Düşünceli Okur" : ratio >= .5 ? "Dikkatli Okur" : "Düz Okur";
    const rankNote = ratio >= .75
      ? "Hem olayı çözdün hem de öykünün nereye aktığını gördün. Orhan Pamuk'un deyişiyle hem saf hem düşünceli okursun."
      : ratio >= .5
        ? "Olayın izini sürdün. Bir adım daha: delillerin ne olduğunu değil, ne anlama geldiğini sor."
        : "Olay örgüsünü takip ettin. Panoya dön; ayrıntılar arasındaki iplikler seni merkeze götürecek.";

    return {
      pts, max, clues, whoOk, evOk, whyOk, cOpt, rep, rank, rankNote,
      ustaca: S.conns.filter((c) => c.grade === "ustaca").length,
      guclu: S.conns.filter((c) => c.grade === "guclu").length
    };
  };

  /* CSV: tek satır (başlık + değer); sınıf tablosunda birleştirilir. Ayraç ';' (Türkçe Excel), UTF-8 BOM. */
  KB.summaryCSV = function (S, r, CASE) {
    const F = CASE.final, CLUE_IDS = Object.keys(CASE.clues);
    const nameOf = (id) => id === "merkez" ? "Gizli merkez" : CASE.clues[id].label;
    const findT = (q, v) => { const o = q.options.find((x) => x.id === v); return o ? o.t : ""; };
    const q = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""').replace(/\r?\n/g, " ") + '"';
    const head = ["vaka", "tarih", "unvan", "puan", "puan_max", "sure", "buyutec", "delil", "delil_max", "bag", "bag_ustaca", "bag_guclu", "konum", "suclu", "suclu_dogru", "neden", "neden_dogru", "gizli_merkez", "gizli_merkez_derece", "rapor", "baglar", "gerekceler"];
    const row = [
      CASE.title, new Date(S.solvedAt || Date.now()).toISOString().slice(0, 10), r.rank, r.pts, r.max,
      KB.fmtTime((S.solvedAt || Date.now()) - S.start), S.hints, r.clues, CLUE_IDS.length,
      S.conns.length, r.ustaca, r.guclu,
      S.loc.done ? (S.loc.ans === CASE.location.answer ? "doğru" : "yanlış") : "yapılmadı",
      findT(F.who, S.fin.who), r.whoOk ? 1 : 0, findT(F.why, S.fin.why), r.whyOk ? 1 : 0,
      r.cOpt ? r.cOpt.t : "", r.cOpt ? r.cOpt.grade : "", S.fin.report.trim(),
      S.conns.map((c) => `[${KB.GRADES[c.grade]}] ${nameOf(c.a)} <-> ${nameOf(c.b)} (${KB.TYPES[c.type]})`).join(" | "),
      S.conns.filter((c) => c.note).map((c) => `${nameOf(c.a)} <-> ${nameOf(c.b)}: ${c.note}`).join(" | ")
    ];
    return "﻿" + head.join(";") + "\n" + row.map(q).join(";") + "\n";
  };

  /* Öğretmen için kopyalanabilir düz metin özet. */
  KB.summaryText = function (S, r, CASE) {
    const F = CASE.final, CLUE_IDS = Object.keys(CASE.clues);
    const nameOf = (id) => id === "merkez" ? "Gizli merkez" : CASE.clues[id].label;
    const findT = (q, v) => { const o = q.options.find((x) => x.id === v); return o ? o.t : "-"; };
    return [
      `KURMACA BÜROSU · ${CASE.title}`,
      `Unvan: ${r.rank} (${r.pts}/${r.max} puan)`,
      `Süre: ${KB.fmtTime((S.solvedAt || Date.now()) - S.start)} · Büyüteç: ${S.hints}`,
      `Delil: ${r.clues}/${CLUE_IDS.length}`,
      `Bağlar: ${S.conns.length} (ustaca ${r.ustaca}, güçlü ${r.guclu})`,
      `Konum: ${S.loc.done ? (S.loc.ans === CASE.location.answer ? "doğru" : "yanlış") : "yapılmadı"}`,
      `Suçlu: ${findT(F.who, S.fin.who)} (${r.whoOk ? "doğru" : "yanlış"})`,
      `Neden: ${findT(F.why, S.fin.why)}`,
      `Gizli merkez: ${r.cOpt ? r.cOpt.t : "-"}`,
      `Rapor: ${S.fin.report.trim() || "-"}`,
      `Bağ listesi:`,
      ...S.conns.map((c) => `  - [${KB.GRADES[c.grade]}] ${nameOf(c.a)} <-> ${nameOf(c.b)} (${KB.TYPES[c.type]})${c.note ? ` · gerekçe: ${c.note}` : ""}`)
    ].join("\n");
  };
})();
