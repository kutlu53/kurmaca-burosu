/* Çalıştır: node test/verify-case.js . [vaka-02]
   Herhangi bir vaka dosyasının bütünlüğünü denetler: ipucu kimlikleri, metin işaretleri, caption birebirliği,
   sahne dokunma noktaları, bağ/son/konum başvuruları, ikon kimlikleri (assets/icons.svg). */
const fs = require("fs"), vm = require("vm");
const root = process.argv[2] || ".", want = process.argv[3];
const w = { window: null }; w.window = w; vm.createContext(w);
for (const f of fs.readdirSync(root + "/data").filter((f) => /^case-\d+\.js$/.test(f)).sort()) vm.runInContext(fs.readFileSync(root + "/data/" + f, "utf8"), w, { filename: f });
const icons = new Set([...fs.readFileSync(root + "/assets/icons.svg", "utf8").matchAll(/<symbol id="ic-([^"]+)"/g)].map((m) => m[1]));
const TYPES = ["leitmotif", "metafor", "mekan", "diyalog", "zaman", "kanit"], GRADES = ["ustaca", "guclu", "zayif", "yetersiz"];
let total = 0;
for (const C of w.CASES) {
  if (want && C.id !== want) continue;
  const errs = [], ids = Object.keys(C.clues);
  const text = ids.filter((i) => !C.clues[i].src), ask = ids.filter((i) => C.clues[i].src);
  const story = C.story.join("\n"), answers = C.suspects.flatMap((s) => s.qs.map((q) => q.a)).join("\n");
  const markers = [...story.matchAll(/\[\[(\w+)\|/g)].map((m) => m[1]);
  if (markers.length !== text.length) errs.push(`metin işareti ${markers.length}, metin ipucu ${text.length}`);
  for (const m of markers) if (!C.clues[m]) errs.push("işaret bilinmeyen ipucu: " + m);
  for (const id of ids) {
    const c = C.clues[id];
    for (const f of ["label", "short", "tag", "art", "caption"]) if (!c[f]) errs.push(`${id}: ${f} eksik`);
    if (!TYPES.includes(c.tag)) errs.push(`${id}: tür ${c.tag}`);
    if (c.caption && !(c.src ? answers : story).includes(c.caption)) errs.push(`${id}: caption birebir değil`);
    if (c.art && !icons.has(c.art)) errs.push(`${id}: ikon yok ${c.art}`);
    if (c.short && c.short.split(/\s+/).length > 3) errs.push(`${id}: short >3 kelime`);
  }
  const askClues = C.suspects.flatMap((s) => s.qs.map((q) => q.clue).filter(Boolean));
  for (const a of ask) if (!askClues.includes(a)) errs.push("sorgu ipucu hiçbir cevapta yok: " + a);
  for (const a of askClues) if (!C.clues[a] || !C.clues[a].src) errs.push("cevap ipucu src:sorgu değil: " + a);
  const hs = C.scenes.flatMap((s) => s.hotspots);
  for (const t of text) if (hs.filter((h) => h.clue === t).length !== 1) errs.push("sahnede yok/çift: " + t);
  for (const h of hs) { if (h.x + h.w > 100 || h.y + h.h > 100) errs.push("hotspot taşıyor: " + h.clue); if (!icons.has(h.art)) errs.push("hotspot ikonu yok: " + h.art); }
  for (const s of C.suspects) { if (!icons.has(s.portrait)) errs.push("portre ikonu yok: " + s.portrait); if (s.qs.length !== 3) errs.push(s.id + ": 3 soru değil"); for (const q of s.qs) if (!icons.has(q.icon)) errs.push("soru ikonu yok: " + q.icon); }
  for (const l of C.links) {
    if (!C.clues[l.a] || !C.clues[l.b]) errs.push(`bağ bilinmeyen id ${l.a}-${l.b}`);
    if (!GRADES.includes(l.grade)) errs.push(`bağ derece ${l.a}-${l.b}`);
    if (!l.types.every((t) => TYPES.includes(t))) errs.push(`bağ tür ${l.a}-${l.b}`);
    if (!l.short || !l.text) errs.push(`bağ short/text eksik ${l.a}-${l.b}`);
  }
  const seen = new Set(); for (const l of C.links) { const k = [l.a, l.b].sort().join("|"); if (seen.has(k)) errs.push("çift bağ: " + k); seen.add(k); }
  for (const c of C.centerFlow) if (!C.clues[c]) errs.push("centerFlow bilinmeyen: " + c);
  if (C.redHerringId && !C.clues[C.redHerringId]) errs.push("redHerringId bilinmeyen");
  const L = C.location;
  for (const n of [...L.need, ...L.evidence]) if (!C.clues[n]) errs.push("konum bilinmeyen: " + n);
  if (!L.options.some((o) => o.id === L.answer)) errs.push("konum cevabı seçeneklerde yok");
  for (const o of L.options) if (o.art && !icons.has(o.art) && !["dag", "sehir", "kiyi", "ova"].includes(o.id)) errs.push("konum ikonu yok: " + o.art);
  const F = C.final;
  for (const k of ["who", "why"]) if (!F[k].options.some((o) => o.id === F[k].answer)) errs.push(k + " cevabı seçeneklerde yok");
  for (const k of ["who", "why", "center"]) for (const o of F[k].options) if (!icons.has(o.art)) errs.push(`${k} ikonu yok: ${o.art}`);
  if (!F.center.options.some((o) => o.grade === "ustaca")) errs.push("merkezde ustaca seçenek yok");
  for (const e of F.evidence) if (!C.clues[e]) errs.push("final delil bilinmeyen: " + e);
  for (const p of C.epilogShort) if (!C.epilog.some((e) => e.includes(p))) errs.push("epilogShort birebir değil: " + p);
  console.log(`${C.id} "${C.title}"${C.draft ? " (taslak)" : ""}: ipucu ${ids.length} (metin ${text.length}, sorgu ${ask.length}), bağ ${C.links.length}, sahne ${C.scenes.length}`);
  console.log(errs.length ? "  " + errs.join("\n  ") : "  TAMAM");
  total += errs.length;
}
process.exit(total ? 1 : 0);
