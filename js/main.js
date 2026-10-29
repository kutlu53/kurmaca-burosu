/* main.js — durum, yönlendirme, ekranların çizimi.
   Adım 2: v1 mantığı modüllere taşındı; davranış ve puan v1 ile birebir.
   Ekranlar şimdilik v1 görünümünde; v2 görselleri adım 3-9'da gelir. */
window.KB = window.KB || {};
(function () {
  "use strict";

  /* ---------- Ortak sabitler ---------- */
  KB.TYPES = { leitmotif: "Leitmotif / İmge", metafor: "Metafor", mekan: "Mekân", diyalog: "Diyalog", anlatici: "Anlatıcı / Bakış açısı", zaman: "Zaman", kanit: "Kanıt" };
  KB.GRADES = { ustaca: "Ustaca", guclu: "Güçlü", zayif: "Zayıf", yetersiz: "Kanıt yetersiz" };
  KB.STEPS = [["dosya", "Dosya"], ["olay", "Olay Yeri"], ["sorgu", "Sorgu"], ["konum", "Konum"], ["pano", "Pano"], ["sucla", "Suçlama"]];
  /* Tek cümlelik tanımlar: yalnızca yardım açıkken, dokununca görünür (rapordaki birim adlarıyla uyumlu) */
  KB.TYPE_DEFS = {
    leitmotif: "Öykü boyunca tekrar eden ayrıntı; her dönüşte yeni anlam yüklenir.",
    metafor: "Bir nesne ya da görüntüyle bir duyguyu, bir durumu anlatma.",
    mekan: "Yerin ayrıntıları: koku, ses, görüntü. Ad verilmeden kurulan mekân.",
    diyalog: "Karakterin sözü: ne dediği kadar nasıl dediği ve ne demediği.",
    anlatici: "Kimin gözünden, kimin sesiyle: anlatıcının gördüğü, sakladığı, yanıldığı yer.",
    zaman: "Ne zaman, ne kadar, hangi sırayla: günler, süreler, gecikmeler.",
    kanit: "Olayı çözen somut iz: kim, nasıl, nerede."
  };
  KB.CENTER_DEF = "Gizli merkez: bütün ayrıntıların akıp birleştiği yer; öykünün aslında anlattığı şey.";
  KB.GUIDE = [
    ["tur-kanit", "Sahnede nesnelere dokun; delil tepsiye düşer."],
    ["tur-diyalog", "Tanıklara soru sor; bazı cevaplar delil verir."],
    ["tur-mekan", "Adı geçmeyen mekânı delillerle bul."],
    ["tur-leitmotif", "Panoda iki kartı iple bağla, türünü seç."],
    ["maske", "Suçluyu, nedeni ve gizli merkezi seç; kısa rapor yaz."],
    ["merkez", KB.CENTER_DEF]
  ];

  /* Adres eki: #vaka-02&yardim=kapali */
  const H = Object.fromEntries(location.hash.slice(1).split("&").filter(Boolean).map((p) => p.includes("=") ? p.split("=") : [p, true]));
  let helpOn = H.yardim !== "kapali";
  try { if (H.yardim === "kapali") localStorage.setItem("kurmaca-burosu-yardim", "0"); else if (H.yardim === "acik") localStorage.setItem("kurmaca-burosu-yardim", "1"); const v = localStorage.getItem("kurmaca-burosu-yardim"); if (v !== null) helpOn = v !== "0"; } catch (e) { /* sessiz */ }
  KB.help = () => helpOn;

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  KB.$ = $; KB.esc = esc;
  const TYPES = KB.TYPES, GRADES = KB.GRADES;

  KB.toast = function (msg) {
    const t = $("#toast"); if (!t) return;
    t.innerHTML = msg; t.classList.add("show");
    clearTimeout(KB.toast.t); KB.toast.t = setTimeout(() => t.classList.remove("show"), 2600);
  };
  const toast = KB.toast;

  /* ---------- Vaka seçimi: #vaka-02 adres eki > kayıtlı tercih > ilk vaka ---------- */
  const CASES = window.CASES || [];
  let caseId = Object.keys(H).find((k) => /^vaka-\d+$/.test(k)) || H.vaka;
  if (!caseId) { try { caseId = localStorage.getItem("kurmaca-burosu-vaka"); } catch (e) { /* sessiz */ } }
  const CASE = CASES.find((c) => c.id === caseId) || CASES[0];
  if (!CASE) { $("#view").innerHTML = '<p class="muted">Vaka verisi yüklenemedi (data/case-01.js).</p>'; return; }
  function switchCase(id) {
    try { localStorage.setItem("kurmaca-burosu-vaka", id); } catch (e) { /* sessiz */ }
    location.hash = "#" + id + (helpOn ? "" : "&yardim=kapali"); location.reload();
  }
  KB.CASE = CASE;
  const CLUE_IDS = Object.keys(CASE.clues);
  const foundIds = () => CLUE_IDS.filter((id) => S.found[id]);
  const nameOf = (id) => id === "merkez" ? "Gizli merkez" : CASE.clues[id].label;
  const TEXT_CLUES = CLUE_IDS.filter((i) => !CASE.clues[i].src);
  const ASK_CLUES = CLUE_IDS.filter((i) => CASE.clues[i].src);

  /* ---------- Durum ve kayıt ---------- */
  const KEY = "kurmaca-burosu-v2-" + CASE.id;
  const fresh = () => ({
    view: "dosya", scene: 0, caption: null, book: false, found: {}, asked: {}, conns: [], pos: {}, sel: null, pending: null,
    activeSus: CASE.suspects[0].id,
    loc: { ans: null, ev: [], done: false },
    fin: { who: null, ev: [], why: null, center: null, report: "" },
    solved: false, hints: 0, start: Date.now(), solvedAt: null
  });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* depolama yoksa oyun yine çalışır */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sessiz */ } };
  KB.state = () => S;

  function addClue(id) {
    if (S.found[id]) return false;
    S.found[id] = Date.now();
    /* panoda ilk konum: merkez etrafında iki halka (tek/çift sırayla iç-dış) ki kartlar üst üste binmesin */
    const i = CLUE_IDS.indexOf(id), n = CLUE_IDS.length, ang = (i / n) * Math.PI * 2 - Math.PI / 2;
    const rx = i % 2 ? 43 : 27, ry = i % 2 ? 42 : 24;
    S.pos[id] = { x: 50 + Math.cos(ang) * rx, y: 50 + Math.sin(ang) * ry };
    save(); renderChips();
    toast("<b>Deftere eklendi:</b> " + esc(CASE.clues[id].label));
    return true;
  }

  /* ---------- Üst bant / sekmeler ---------- */
  $("#brand").textContent = "Kurmaca Bürosu · Vaka " + CASE.id.replace(/\D/g, "");
  $("#caseTitle").innerHTML = esc(CASE.title) + "<small>Okur dedektif, ayrıntı ipucu, gizli merkez dava.</small>";
  $("#resetZone").innerHTML = '<button class="btn ghost" data-act="askReset">Vakayı sıfırla</button>';

  function renderChips() {
    const g = S.conns.filter((c) => c.grade === "ustaca" || c.grade === "guclu").length;
    const on = KB.audio.enabled || (!KB.audio.enabled && KB.audio.wanted());
    $("#chips").innerHTML = `<span class="chip">İpucu <b>${foundIds().length}/${CLUE_IDS.length}</b></span><span class="chip">Bağlantı <b>${g}</b></span><span class="chip">Süre <b id="clock">${KB.fmtTime(elapsed())}</b></span><button class="chip chip-btn" data-act="audio" aria-pressed="${on}" aria-label="Ses ${on ? "açık" : "kapalı"}" title="Ses">${KB.icon(on ? "saat" : "kepenk")}<b>${on ? "Ses" : "Sessiz"}</b></button>${helpOn ? `<button class="chip chip-btn chip-help" data-act="guide" aria-label="Nasıl oynanır" title="Nasıl oynanır"><b>?</b></button>` : ""}`;
    const hz = $("#helpZone"); if (hz) hz.innerHTML = `<button class="btn ghost" data-act="helpToggle" aria-pressed="${helpOn}" title="Öğretmen: yardımı aç/kapat">Yardım ${helpOn ? "açık" : "kapalı"}</button>`;
  }
  /* "?" rehberi: altı resimli adım + tür tanımları. Yalnızca yardım açıkken. */
  function renderGuide() {
    return `<div class="sheet" id="guideSheet" role="dialog" aria-modal="true" aria-label="Nasıl oynanır">
      <div class="book paper guide"><div class="book-head"><div><div class="label">Nasıl oynanır</div><h2 class="story-title">Okur dedektif</h2></div><button class="btn" data-act="guideClose" aria-label="Kapat">Kapat</button></div>
        <ol class="guide-steps">${KB.GUIDE.map(([ic, t]) => `<li>${KB.icon(ic, "lg")}<span>${esc(t)}</span></li>`).join("")}</ol>
        <div class="label" style="margin-top:14px">Bağ türleri</div>
        <ul class="tdefs">${Object.entries(TYPES).map(([k, v]) => `<li style="--c:var(--ip-${k})">${KB.icon("tur-" + k)}<b>${v}</b><span>${esc(KB.TYPE_DEFS[k])}</span></li>`).join("")}</ul>
      </div></div>`;
  }
  KB.audio.onchange = renderChips;
  function renderTabs() {
    const done = {
      dosya: true,
      olay: TEXT_CLUES.every((i) => S.found[i]),
      sorgu: ASK_CLUES.every((i) => S.found[i]),
      konum: S.loc.done, pano: S.conns.length >= 5, sucla: S.solved
    };
    $("#tabs").innerHTML = KB.STEPS.map(([id, t], i) => `<button class="tab" data-act="go" data-v="${id}" ${S.view === id ? 'aria-current="page"' : ""}><span>${i + 1}</span>${t}${done[id] && id !== "dosya" ? '<i class="dot" aria-label="tamam"></i>' : ""}</button>`).join("");
  }
  /* Dosya kapanınca süre durur (solvedAt); yeniden düşünülürse akmaya devam eder */
  const elapsed = () => (S.solved && S.solvedAt ? S.solvedAt : Date.now()) - S.start;
  setInterval(() => { const c = $("#clock"); if (c) c.textContent = KB.fmtTime(elapsed()); }, 1000);

  /* ---------- Görünümler ---------- */
  /* Dosya: masada kapalı dosya; açılınca GİZLİ damgası, iki cümlelik görev, düz okur balonu, tek düğme. */
  function vDosya() {
    if (!S.fileOpen) {
      /* Birden çok vaka varsa raf: etkin dosya açılır, öbürü seçilince vaka değişir */
      const list = CASES.length > 1 ? CASES : [CASE];
      return `<div class="desk-top shelf">${list.map((c) => {
        const active = c.id === CASE.id;
        return `<button class="file closed${active ? "" : " other"}" data-act="${active ? "fileOpen" : "switchCase"}" data-id="${c.id}" aria-label="${active ? "Dosyayı aç" : esc(c.title) + " vakasına geç"}">
          <span class="file-tab">Vaka ${c.id.replace(/\D/g, "")}${c.draft ? " · Taslak" : ""}</span>
          <span class="file-body">${KB.icon("raptiye")}<span class="file-title">${esc(c.title)}</span><span class="file-hint">${active ? "Dosyayı aç" : "Vakayı seç"}</span></span></button>`;
      }).join("")}</div>`;
    }
    return `<div class="desk-top">
      <article class="file open paper"><div class="pad">
        <span class="stamp">GİZLİ</span>
        <div class="label">Görev</div>
        <div class="prose brief">${CASE.brief.map((p) => `<p>${p}</p>`).join("")}</div>
        <div class="steps" aria-label="Adımlar">${KB.STEPS.slice(1).map(([id, t], i) => `<span class="step">${KB.icon(["tur-kanit", "tur-diyalog", "tur-mekan", "tur-leitmotif", "maske"][i])}<span>${t}</span></span>`).join("")}</div>
        <div class="row" style="margin-top:14px"><button class="btn solid" data-act="go" data-v="olay">Soruşturmaya başla</button></div>
      </div></article>
      <div class="flat-reader">
        <div class="bubble a flat">${CASE.flatReader}</div>
        <div class="flat-fig">${KB.icon("bos-cerceve", "xl")}<span class="label on-desk">Düz Okur</span></div>
      </div></div>`;
  }

  /* Olay yeri: resimli sahneler (js/scenes.js). "Umut'un anlatısı" kitap görünümü üstte açılır. */
  function vOlay() {
    return KB.renderOlay(S, CASE) + (S.book ? KB.renderBook(S, CASE) : "");
  }

  /* Sorgu: portreler, ikonlu soru kartları, çizgi roman balonları. Sahne yönergeleri "(…)" soluk gösterilir. */
  const stage = (a) => esc(a).replace(/\(([^)]+)\)/g, '<i class="stage">($1)</i>');
  function vSorgu() {
    const s = CASE.suspects.find((x) => x.id === S.activeSus) || CASE.suspects[0];
    const asked = S.asked[s.id] || [];
    const portraits = CASE.suspects.map((x) => {
      const done = S.asked[x.id] || [];
      return `<button class="portrait" data-act="sus" data-id="${x.id}" aria-pressed="${x.id === s.id}" aria-label="${esc(x.name)}, ${esc(x.role)}">
        <span class="face">${KB.icon(x.portrait)}</span><span class="nm">${esc(x.name)}</span><span class="rl">${esc(x.role)}</span>
        <span class="asked" aria-hidden="true">${x.qs.map((q, i) => `<i class="${done.includes(i) ? "on" : ""}"></i>`).join("")}</span></button>`;
    }).join("");
    const cards = s.qs.map((q, i) => `<button class="qcard" data-act="ask" data-i="${i}" ${asked.includes(i) ? "disabled" : ""}>${KB.icon(q.icon)}<span>${esc(q.q)}</span></button>`).join("");
    const bubbles = asked.map((i) => {
      const q = s.qs[i];
      return `<div class="bubble q">${KB.icon(q.icon)}<span>${esc(q.q)}</span></div>
        <div class="bubble a" data-q="${i}">${stage(q.a)}${q.clue ? `<div class="clue-chip">${KB.icon(CASE.clues[q.clue].art)} Delil</div>` : ""}</div>`;
    }).join("");
    return `<div class="sorgu">
      <div class="portraits">${portraits}</div>
      ${s.narrator ? `<div class="narrator-tag">${KB.icon("tur-diyalog")} Anlatıcıyı sorguluyorsun</div>` : ""}
      <div class="qcards">${cards}</div>
      <div class="transcript2" aria-live="polite">${bubbles}</div>
      <div class="tray-row"><div class="tray" id="tray" aria-label="Delil tepsisi">${KB.trayHTML(S, CASE)}</div><button class="btn ${ASK_CLUES.every((i) => S.found[i]) ? "solid" : ""}" data-act="go" data-v="konum">Konuma geç</button></div>
    </div>`;
  }

  /* Konum: dört manzara (deniz çizilmez), delil çipleri manzaraya sürüklenir ya da dokunarak eklenir. */
  function vKonum() {
    const L = CASE.location, have = L.need.filter((i) => S.found[i]).length;
    if (have < 2) return `<div class="gate">${KB.icon("tur-mekan", "lg")}<div><div class="label on-desk">Konum</div><p>Önce olay yerine dön. <b>${have}/2</b></p></div><button class="btn solid" data-act="go" data-v="olay">Olay yerine git</button></div>`;
    const ids = foundIds(), done = S.loc.done;
    const lands = L.options.map((o) => {
      const sel = S.loc.ans === o.id;
      let cls = sel ? " sel" : "";
      if (done) { if (o.id === L.answer) cls += " right"; else if (sel) cls += " wrong"; }
      const pocket = sel ? `<span class="pocket">${S.loc.ev.map((id) => `<span class="pk${done ? (L.evidence.includes(id) ? " ok" : " no") : ""}">${KB.icon(CASE.clues[id].art)}</span>`).join("")}</span>` : "";
      return `<button class="land${cls}" data-act="land" data-id="${o.id}" aria-pressed="${sel}" ${done ? "disabled" : ""}>${KB.landSVG(o.id, done && o.id === L.answer, o.art)}<span class="land-t">${esc(o.t)}</span>${pocket}</button>`;
    }).join("");
    const chips = ids.map((id) => `<button class="evc${S.loc.ev.includes(id) ? " on" : ""}" data-act="evToggle" data-ev="${id}" aria-pressed="${S.loc.ev.includes(id)}" aria-label="${esc(CASE.clues[id].label)}" title="${esc(CASE.clues[id].label)}" ${done ? "disabled" : ""}>${KB.icon(CASE.clues[id].art)}</button>`).join("");
    return `<div class="konum">
      <div class="konum-q"><span class="who">Soru</span><span>${L.q}</span></div>
      <div class="lands">${lands}</div>
      ${done
        ? `<div class="lesson ${S.loc.ans === L.answer ? "ok" : "no"}">${KB.icon(S.loc.ans === L.answer ? "tur-mekan" : "soru", "lg")}<div><b>${S.loc.ans === L.answer ? "Doğru tespit." : "Kıyı kasabası."}</b> ${esc(L.lessonShort)} <button class="link" data-act="lessonMore" aria-expanded="${!!S.loc.more}">${S.loc.more ? "Kapat" : "Neden?"}</button>${S.loc.more ? `<p class="lesson-long">${esc(L.lesson)}</p>` : ""}</div><button class="btn solid" data-act="go" data-v="pano">Panoya geç</button></div>`
        : `<div class="ev-row"><div class="ev-tray" id="evTray">${chips}</div><button class="btn solid" data-act="locCheck">Tespiti kaydet</button></div>`}
    </div>`;
  }

  /* Pano v2: polaroid kartlar, ikonlu tür seçici, renkli ipler, rozetli tek satır geri bildirim. */
  const artOf = (id) => id === "merkez" ? "merkez" : CASE.clues[id].art;
  const openConns = new Set(); /* uzun açıklaması açık bağlar (oturumluk) */
  function vPano() {
    const ids = foundIds();
    if (ids.length < 3) return `<div class="gate">${KB.icon("raptiye", "lg")}<div><div class="label on-desk">Pano</div><p>En az 3 delil gerek. <b>${ids.length}/3</b></p></div><button class="btn solid" data-act="go" data-v="olay">Olay yerine git</button></div>`;
    const pend = S.pending;
    const card = (id) => {
      const p = id === "merkez" ? { x: 50, y: 50 } : (S.pos[id] || { x: 50, y: 20 });
      const c = id === "merkez" ? null : CASE.clues[id];
      return `<div class="card${id === "merkez" ? " center" : ""}${S.sel === id ? " sel" : ""}" data-card="${id}" style="left:${p.x}%;top:${p.y}%" tabindex="0" role="button" aria-label="${esc(nameOf(id))}" aria-pressed="${S.sel === id}">
        <span class="pin" aria-hidden="true"></span><span class="art">${KB.icon(artOf(id))}</span><span class="cap">${c ? esc(c.short) : "Gizli merkez ?"}</span></div>`;
    };
    const picker = pend
      ? `<div class="picker"><div class="pick-head">${KB.icon(artOf(pend[0]))}<span class="arrow">↔</span>${KB.icon(artOf(pend[1]))}<span>Bu bağın türü?</span>${helpOn ? `<button class="link" data-act="typeHelp" aria-expanded="${!!S.typeHelp}">Türler?</button>` : ""}</div>
         <div class="types">${Object.entries(TYPES).map(([k, v]) => `<button class="tbtn" data-act="ctype" data-t="${k}" style="--c:var(--ip-${k})" ${helpOn ? `title="${esc(KB.TYPE_DEFS[k])}"` : ""}>${KB.icon("tur-" + k)}<span>${v}</span></button>`).join("")}<button class="btn ghost" data-act="cancel">Vazgeç</button></div>
         ${helpOn && S.typeHelp ? `<ul class="tdefs">${Object.entries(TYPES).map(([k, v]) => `<li style="--c:var(--ip-${k})">${KB.icon("tur-" + k)}<b>${v}</b><span>${esc(KB.TYPE_DEFS[k])}</span></li>`).join("")}</ul>` : ""}</div>`
      : S.sel ? `<div class="picker sel-bar">${KB.icon(artOf(S.sel))}<span>İkinci karta dokun.${helpOn && S.sel === "merkez" ? ` <i class="muted">${esc(KB.CENTER_DEF)}</i>` : ""}</span><button class="btn ghost" data-act="cancel">Bırak</button></div>`
        : `<div class="hint-line muted">Kart → kart: ip. Sürükle: düzenle.</div>`;
    /* Her bağa öğrenci tek satır gerekçe yazabilir ("kendi bağım"); puanlanmaz, öğretmen özetine ve CSV'ye gider. */
    const rows = S.conns.slice().reverse().map((c) => {
      const k = c.a + "|" + c.b, open = openConns.has(k), editing = S.noteEdit === k;
      const noteUI = editing
        ? `<form class="note-form" data-k="${k}"><input name="note" maxlength="160" value="${esc(c.note || "")}" placeholder="Bu bağı neden kurdun?" aria-label="Gerekçe" autofocus><button class="btn solid" type="submit">Kaydet</button><button class="btn ghost" type="button" data-act="noteCancel">Vazgeç</button></form>`
        : c.note ? `<div class="note">${KB.icon("harf")}<span>${esc(c.note)}</span><button class="link" data-act="noteEdit" data-k="${k}">Düzenle</button></div>` : "";
      return `<div class="conn${open ? " open" : ""}${c.grade === "yetersiz" ? " own" : ""}">
        <button class="grade g-${c.grade}" data-act="connMore" data-k="${k}" aria-expanded="${open}">${GRADES[c.grade]}</button>
        <span class="pair">${KB.icon(artOf(c.a))}<i class="arrow">↔</i>${KB.icon(artOf(c.b))}<span class="ttag" style="--c:var(--ip-${c.type})" title="${TYPES[c.type]}">${KB.icon("tur-" + c.type)}</span></span>
        <span class="why">${esc(c.short || c.text)}</span>
        <span class="conn-btns">${!c.note && !editing ? `<button class="link note-btn" data-act="noteEdit" data-k="${k}" title="Kendi gerekçeni yaz">Gerekçe</button>` : ""}<button class="x" data-act="delc" data-k="${k}" aria-label="Bağı kaldır">×</button></span>
        ${open ? `<div class="long">${esc(c.text)}</div>` : ""}${noteUI}</div>`;
    }).join("");
    return `<div class="board-wrap">
      ${picker}
      <div class="board" id="board"><svg id="strings" aria-hidden="true"></svg>${card("merkez")}${ids.map(card).join("")}</div>
      <div class="conns-head"><span class="label on-desk">Bağlar</span><span class="muted">${S.conns.length}</span></div>
      ${S.conns.length ? `<div class="conns">${rows}</div>` : `<div class="empty">Henüz ip gerilmedi.</div>`}
      <div class="row" style="margin-top:6px"><button class="btn solid" data-act="go" data-v="sucla">Suçlama odasına geç</button></div>
    </div>`;
  }

  /* Suçlama v2: portreyle suçlu, dosya klasörüne delil, resimli neden ve gizli merkez kartları, rapor. */
  function vSucla() {
    const F = CASE.final, ids = foundIds();
    if (S.solved) return vSonuc();
    const warn = ids.length < 8 || S.conns.length < 3;
    const sec = (n, title, body) => `<section class="sec"><h2 class="sec-h"><span class="n">${n}</span>${esc(title)}</h2>${body}</section>`;
    const who = `<div class="who">${F.who.options.map((o) => {
      const sus = CASE.suspects.find((s) => s.id === o.id);
      return `<button class="portrait" data-act="finWho" data-id="${o.id}" aria-pressed="${S.fin.who === o.id}" aria-label="${esc(o.t)}"><span class="face">${KB.icon(o.art)}</span><span class="nm">${esc(sus ? sus.name : o.t.split(";")[0])}</span></button>`;
    }).join("")}</div>`;
    const inFolder = S.fin.ev.map((id) => `<button class="pk big" data-act="finEv" data-ev="${id}" aria-label="${esc(CASE.clues[id].label)} (çıkar)" title="${esc(CASE.clues[id].label)}">${KB.icon(CASE.clues[id].art)}</button>`).join("");
    const chips = ids.map((id) => `<button class="evc${S.fin.ev.includes(id) ? " on" : ""}" data-act="finEv" data-ev="${id}" aria-pressed="${S.fin.ev.includes(id)}" aria-label="${esc(CASE.clues[id].label)}" title="${esc(CASE.clues[id].label)}">${KB.icon(CASE.clues[id].art)}</button>`).join("");
    const evidence = `<div class="folder-row">
      <div class="folder" id="folder"><span class="tab">Dosya</span><span class="count">${S.fin.ev.length}/${F.evidenceMax}</span><div class="folder-in">${inFolder}</div></div>
      <div class="ev-tray">${chips}</div></div>`;
    const pcards = (act, q, key) => `<div class="pcards">${q.options.map((o) => `<button class="pcard" data-act="${act}" data-id="${o.id}" aria-pressed="${S.fin[key] === o.id}">${KB.icon(o.art)}<span>${esc(o.t)}</span></button>`).join("")}</div>`;
    return `<div class="sucla">
      ${warn ? `<div class="warn-line">${KB.icon("tur-kanit")} En az 8 delil, 3 bağ önerilir. <b>${ids.length} · ${S.conns.length}</b></div>` : ""}
      ${sec(1, F.who.q, who)}
      ${sec(2, "Deliller", evidence)}
      ${sec(3, F.why.q, pcards("finWhy", F.why, "why"))}
      ${sec(4, F.center.q, pcards("finCenter", F.center, "center"))}
      ${sec(5, "Dedektif raporu", `<textarea id="report" placeholder="Bu öyküde asıl çözülen şey…" aria-label="Dedektif raporu">${esc(S.fin.report)}</textarea>`)}
      <div class="row"><button class="btn solid" data-act="accuse">Dosyayı kapat ve açıkla</button><span id="accuseMsg" class="muted" style="font-size:14px" aria-live="polite"></span></div>
    </div>`;
  }

  /* Final: animasyon sahnesi, kısa epilog, rozet + çubuklar, düz okur ve rapor, öğretmen özeti. */
  let finalPlayed = false;
  function vSonuc() {
    const r = KB.score(S, CASE), V = CASE.verdict, F = CASE.final;
    const gradeName = { ustaca: "ustaca", guclu: "güçlü", zayif: "zayıf", duz: "düz okuma" };
    const pct = (a, b) => Math.round(100 * a / b);
    const who = F.who.options.find((o) => o.id === F.who.answer), why = F.why.options.find((o) => o.id === F.why.answer);
    const mark = (ok) => `<span class="mark ${ok ? "ok" : "no"}" aria-label="${ok ? "doğru" : "yanlış"}">${ok ? "✓" : "✗"}</span>`;
    const meter = (label, val, max, text) => `<div class="meter"><span class="ml">${label}</span><div class="bar"><i style="width:${pct(val, max)}%"></i></div><span class="mv">${text || `${val}/${max}`}</span></div>`;
    const fin = CASE.finale || { type: "saatler" };
    return `<div class="sonuc">
      <div class="final-stage${fin.type === "saatler" ? "" : " single"}" id="finalStage" aria-label="Final">
        ${fin.type === "saatler" ? '<div class="fs-wall" id="fsWall"></div>' : ""}
        <div class="cloth"><div class="fs-watch" id="fsWatch">${fin.type === "saatler" ? "" : KB.icon(fin.art || "merkez", "fs-icon")}</div><div class="flap l"></div><div class="flap r"></div></div>
        ${fin.type === "saatler" ? '<div class="fs-wrist" id="fsWrist"></div>' : ""}
      </div>
      <article class="paper epilog-card"><div class="pad">
        <div class="label">${esc(CASE.epilogTitle || "Epilog")}</div>
        <div class="prose epilog-text">${(S.epilogFull ? CASE.epilog : CASE.epilogShort).map((p) => `<p>${p}</p>`).join("")}</div>
        <button class="btn" data-act="epilog">${S.epilogFull ? "Kısalt" : "Epilogu oku"}</button>
      </div></article>
      <article class="paper result"><div class="pad">
        <span class="stamp">DOSYA KAPANDI</span>
        <div class="rank-row">
          <div class="rosette"><span>${esc(r.rank)}</span></div>
          <div class="meters">
            ${meter("Puan", r.pts, r.max)}
            ${meter("Delil", r.clues, CLUE_IDS.length)}
            ${meter("Bağ", r.ustaca * 3 + r.guclu * 2, 24, `<span class="grade g-ustaca">${r.ustaca}</span> <span class="grade g-guclu">${r.guclu}</span>`)}
            <div class="meter"><span class="ml">Süre</span><span class="mv wide">${KB.fmtTime((S.solvedAt || Date.now()) - S.start)} · ${KB.icon("tur-kanit")} ${S.hints}</span></div>
          </div>
        </div>
        <div class="verdicts">
          <div class="vrow">${KB.icon(who.art, "lg")}<div><div class="vt">Suçlu ${mark(r.whoOk)} <span class="chip-n">${r.evOk}/${F.evidenceMax}</span></div><div class="vx">${r.whoOk ? V.who.ok : V.who.no}</div></div></div>
          <div class="vrow">${KB.icon(why.art, "lg")}<div><div class="vt">Neden ${mark(r.whyOk)}</div><div class="vx">${V.why}</div></div></div>
          ${r.cOpt ? `<div class="vrow">${KB.icon(r.cOpt.art, "lg")}<div><div class="vt">Gizli merkez <span class="grade g-${r.cOpt.grade === "duz" ? "yetersiz" : r.cOpt.grade}">${gradeName[r.cOpt.grade]}</span></div><div class="vx">${r.cOpt.note}</div></div></div>` : ""}
        </div>
      </div></article>
      <div class="compare">
        <div class="bubble a cmp"><div class="label">Düz Okur</div><p>${CASE.flatReader}</p></div>
        <div class="bubble a cmp you"><div class="label">Senin raporun</div><p>${esc(S.fin.report.trim() || "(Rapor yazılmadı.)")}</p></div>
      </div>
      <article class="paper"><div class="pad">
        <div class="label">Öğretmen özeti</div>
        <pre class="summary" id="sumText">${esc(KB.summaryText(S, r, CASE))}</pre>
        <div class="row" style="margin-top:10px"><button class="btn solid" data-act="copy">Özeti kopyala</button><button class="btn" data-act="csv">CSV indir</button><button class="btn" data-act="reopen">Yeniden düşün</button><button class="btn" data-act="go" data-v="pano">Panoya dön</button></div>
      </div></article>
    </div>`;
  }
  /* Saatleri sahneye yerleştirir ve animasyonu bir kez oynatır. */
  function mountFinal() {
    const stage = $("#finalStage"); if (!stage) return;
    const fin = CASE.finale || { type: "saatler" };
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fin.type !== "saatler") { /* yalnızca mendil açılır */
      if (finalPlayed || reduced) stage.classList.add("open"); else { finalPlayed = true; setTimeout(() => stage.classList.add("open"), 400); }
      return;
    }
    const now = new Date(), h = now.getHours(), m = now.getMinutes();
    const cep = KB.createClock({ style: "cep", size: 150, label: fin.watchLabel || "Cep saati" }); $("#fsWatch").appendChild(cep);
    const walls = [["duvar", 112], ["masa", 96], ["duvar", 82]].map(([style, size]) => { const c = KB.createClock({ style, size }); $("#fsWall").appendChild(c); return c; });
    const kol = KB.createClock({ style: "kol", size: 100, label: fin.wristLabel || "Kol saati" }); $("#fsWrist").appendChild(kol);
    if (finalPlayed || reduced) { stage.classList.add("open", "ticking"); cep.setTicking(true); KB.audio.startTicking(); walls.forEach((c) => c.setTime(h, m)); kol.setTime(h, m); return; }
    finalPlayed = true;
    setTimeout(() => stage.classList.add("open"), 400);
    setTimeout(() => { cep.setTicking(true); stage.classList.add("ticking"); if (S.view === "sucla" && S.solved) KB.audio.startTicking(); }, 1500);
    walls.forEach((c, i) => setTimeout(() => c.setTime(h, m, { animate: true, duration: 1800, turns: 1 }), 2300 + i * 250));
    setTimeout(() => kol.setTime(h, m, { animate: true, duration: 1600, turns: 1 }), 3800);
  }

  /* ---------- Çizim ---------- */
  const VIEWS = { dosya: vDosya, olay: vOlay, sorgu: vSorgu, konum: vKonum, pano: vPano, sucla: vSucla };
  let guideOpen = false;
  function render() {
    renderChips(); renderTabs();
    const bookEl = document.querySelector(".book"), bookScroll = bookEl ? bookEl.scrollTop : 0;
    $("#view").innerHTML = (VIEWS[S.view] || vDosya)() + (guideOpen && helpOn ? renderGuide() : "");
    document.body.classList.toggle("sheet-open", (S.view === "olay" && S.book) || (guideOpen && helpOn));
    const nb = document.querySelector(".book"); if (nb) nb.scrollTop = bookScroll;
    if (S.view === "pano") requestAnimationFrame(drawStrings);
    if (S.view === "sucla" && S.solved) mountFinal(); else KB.audio.stopTicking();
  }

  /* Delil çizimi sahneden tepsiye uçar (hareket azaltma varsa atlanır). */
  function flyClue(id, from) {
    const chip = document.querySelector(`.tray .ev[data-ev="${id}"]`); if (!chip) return;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !from || !document.body.animate) { chip.classList.add("pop"); return; }
    const to = chip.getBoundingClientRect();
    const f = document.createElement("div"); f.className = "fly"; f.innerHTML = KB.icon(CASE.clues[id].art);
    f.style.left = (from.left + from.width / 2 - 18) + "px"; f.style.top = (from.top + from.height / 2 - 18) + "px";
    document.body.appendChild(f); chip.style.visibility = "hidden";
    const dx = to.left - (from.left + from.width / 2 - 18), dy = to.top - (from.top + from.height / 2 - 18);
    const a = f.animate([{ transform: "scale(1.6)", opacity: .9 }, { transform: `translate(${dx}px,${dy}px) scale(1)`, opacity: 1 }], { duration: 650, easing: "cubic-bezier(.3,.8,.3,1)" });
    a.onfinish = () => { f.remove(); chip.style.visibility = ""; chip.classList.add("pop"); };
  }
  const drawStrings = () => KB.drawStrings(S, $("#board"), $("#strings"));
  addEventListener("resize", () => { if (S.view === "pano") drawStrings(); });

  /* ---------- Pano etkileşimi ---------- */
  KB.initBoard({
    getBoard: () => $("#board"),
    onMove: (id, x, y) => { S.pos[id] = { x, y }; drawStrings(); },
    onDrop: () => save(),
    onPick: pickCard
  });
  function pickCard(id) {
    if (S.pending) return;
    if (!S.sel) { S.sel = id; }
    else if (S.sel === id) { S.sel = null; }
    else {
      const a = S.sel, b = id;
      if (S.conns.some((c) => (c.a === a && c.b === b) || (c.a === b && c.b === a))) { toast("Bu iki kart zaten bağlı."); S.sel = null; }
      else S.pending = [a, b];
    }
    save(); render();
  }

  /* ---------- Konum etkileşimi: çip dokunuşu ve sürükleme ---------- */
  function konumToggle(id, landId) {
    if (S.loc.done) return;
    if (landId) S.loc.ans = landId;
    if (!S.loc.ans) { toast("Önce bir manzara seç."); return; }
    const i = S.loc.ev.indexOf(id);
    if (i >= 0 && !landId) { S.loc.ev.splice(i, 1); toast("Çıkarıldı: " + esc(CASE.clues[id].label)); }
    else if (i < 0) { S.loc.ev.push(id); toast("Delil: " + esc(CASE.clues[id].label)); }
    save(); render();
  }
  (function initKonumDrag() {
    let d = null;
    document.addEventListener("pointerdown", (e) => {
      const chip = e.target.closest(".evc"); if (!chip || chip.disabled) return;
      d = { id: chip.dataset.ev, sx: e.clientX, sy: e.clientY, ghost: null, pid: e.pointerId };
      try { chip.setPointerCapture(e.pointerId); } catch (err) { /* sentetik olay */ }
    });
    document.addEventListener("pointermove", (e) => {
      if (!d) return;
      if (!d.ghost) {
        if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return;
        d.ghost = document.createElement("div"); d.ghost.className = "fly"; d.ghost.innerHTML = KB.icon(CASE.clues[d.id].art); document.body.appendChild(d.ghost);
      }
      d.ghost.style.transform = `translate(${e.clientX - 18}px,${e.clientY - 18}px)`;
      document.querySelectorAll(".land.over,.folder.over").forEach((l) => l.classList.remove("over"));
      const el = document.elementFromPoint(e.clientX, e.clientY), tgt = el && el.closest(".land,.folder");
      if (tgt) tgt.classList.add("over");
    });
    document.addEventListener("pointerup", (e) => {
      if (!d) return;
      const cur = d; d = null;
      if (!cur.ghost) return; /* dokunuş: click olayı toggle yapar */
      cur.ghost.remove();
      document.querySelectorAll(".land.over,.folder.over").forEach((l) => l.classList.remove("over"));
      const el = document.elementFromPoint(e.clientX, e.clientY), land = el && el.closest(".land"), folder = el && el.closest(".folder");
      if (land && !land.disabled) konumToggle(cur.id, land.dataset.id);
      else if (folder) finEvToggle(cur.id, true);
      dragDoneAt = Date.now(); /* ardından gelen click toggle yapmasın */
    });
  })();
  let dragDoneAt = 0;

  /* ---------- Suçlama seçimleri ---------- */
  function finEvToggle(id, addOnly) {
    if (S.solved) return;
    const i = S.fin.ev.indexOf(id);
    if (i >= 0) { if (addOnly) return; S.fin.ev.splice(i, 1); toast("Dosyadan çıktı: " + esc(CASE.clues[id].label)); }
    else { if (S.fin.ev.length >= CASE.final.evidenceMax) { toast(`Dosyaya en fazla ${CASE.final.evidenceMax} delil girer.`); return; } S.fin.ev.push(id); toast("Dosyaya: " + esc(CASE.clues[id].label)); }
    save(); render();
  }
  function collectForm() {
    if (S.view === "sucla" && !S.solved) { const t = $("#report"); if (t) S.fin.report = t.value; }
  }
  document.addEventListener("input", (e) => { if (e.target.id === "report") { S.fin.report = e.target.value; save(); } });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest(".note-form"); if (!f) return;
    e.preventDefault();
    const [a, b] = f.dataset.k.split("|"), c = S.conns.find((x) => x.a === a && x.b === b);
    if (c) { const v = f.querySelector("input").value.trim(); if (v) c.note = v; else delete c.note; }
    S.noteEdit = null; save(); render(); if (c && c.note) toast("Gerekçe kaydedildi; öğretmen özetinde görünür.");
  });

  /* Olay yeri parçalarını yerinde tazeler (tam çizim yok: kaydırma ve odak korunur). */
  function refreshOlay() {
    renderChips(); renderTabs();
    const cap = $("#caption"); if (cap) cap.innerHTML = KB.captionHTML(S, CASE);
    const tray = $("#tray"); if (tray) tray.innerHTML = KB.trayHTML(S, CASE);
    document.querySelectorAll(".hot").forEach((b) => {
      const id = b.dataset.c; if (!S.found[id] || b.classList.contains("found")) return;
      b.classList.add("found"); b.setAttribute("aria-pressed", "true"); b.setAttribute("aria-label", CASE.clues[id].label + " (bulundu)");
      b.innerHTML = KB.hotBadge(CASE.clues[id]);
    });
    document.querySelectorAll(".book .c").forEach((s) => { if (S.found[s.dataset.c]) { s.classList.add("found"); s.removeAttribute("tabindex"); s.removeAttribute("role"); } });
    const hb = document.querySelector('[data-act="hint"]'); if (hb) hb.disabled = !TEXT_CLUES.some((i) => !S.found[i]);
  }
  const sceneSound = () => { const sc = CASE.scenes[S.scene]; if (sc && sc.id === "yokus") KB.audio.gull(); };
  function foundClue(id, from) {
    addClue(id); S.caption = id; save();
    refreshOlay(); flyClue(id, from); KB.audio.pin();
    if (!TEXT_CLUES.some((i) => !S.found[i])) toast("Bütün ayrıntıları buldun. Sıra sorguda.");
  }
  /* Kitaptaki metinden ipucu */
  function clueClick(el) {
    const id = el.dataset.c; if (S.found[id]) return;
    foundClue(id, el.getBoundingClientRect());
  }
  /* Sahnedeki nesneye dokunma */
  function hotClick(btn) {
    const id = btn.dataset.c;
    if (S.found[id]) { S.caption = id; save(); refreshOlay(); return; }
    foundClue(id, btn.getBoundingClientRect());
  }
  function flashHotspot(id) {
    const el = document.querySelector(`.hot[data-c="${id}"]`); if (!el) return;
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /* ---------- Olaylar ---------- */
  const ACTIONS = {
    go(t) { collectForm(); S.view = t.dataset.v; S.sel = null; S.pending = null; save(); render(); scrollTo({ top: 0, behavior: "smooth" }); },
    hint() {
      /* Önce açık sahnede bulunmamış bir nesne; yoksa sırayla öbür sahneler. Kitap açıksa metinde parlatır. */
      const curScene = CASE.scenes[S.scene] || CASE.scenes[0];
      let id = curScene.hotspots.map((h) => h.clue).find((c) => !S.found[c]);
      let sceneIdx = S.scene;
      if (!id) { for (let i = 0; i < CASE.scenes.length && !id; i++) { id = CASE.scenes[i].hotspots.map((h) => h.clue).find((c) => !S.found[c]); if (id) sceneIdx = i; } }
      if (!id) return;
      S.hints++; save();
      if (S.book) {
        const el = document.querySelector(`.c[data-c="${id}"]`); if (!el) return;
        el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); el.scrollIntoView({ block: "center", behavior: "smooth" });
        return;
      }
      if (sceneIdx !== S.scene) { S.scene = sceneIdx; save(); render(); }
      flashHotspot(id);
    },
    scene(t) { S.scene = Math.max(0, Math.min(CASE.scenes.length - 1, (S.scene || 0) + (+t.dataset.d))); save(); render(); sceneSound(); },
    sceneTo(t) { S.scene = +t.dataset.i; save(); render(); sceneSound(); },
    audio() { KB.audio.toggle(); renderChips(); if (KB.audio.enabled) { KB.audio.pin(); if (S.view === "sucla" && S.solved) KB.audio.startTicking(); } },
    fileOpen() { S.fileOpen = true; save(); render(); KB.audio.pin(); },
    switchCase(t) { switchCase(t.dataset.id); },
    guide() { guideOpen = true; render(); const b = document.querySelector("#guideSheet .btn"); if (b) b.focus(); },
    guideClose() { guideOpen = false; render(); },
    typeHelp() { S.typeHelp = !S.typeHelp; save(); render(); },
    helpToggle() {
      helpOn = !helpOn; guideOpen = false;
      try { localStorage.setItem("kurmaca-burosu-yardim", helpOn ? "1" : "0"); } catch (e) { /* sessiz */ }
      render(); toast(helpOn ? "Yardım açık: “?” düğmesi ve tür tanımları görünür." : "Yardım kapalı: yalnızca oyun.");
    },
    csv() {
      const r = KB.score(S, CASE), csv = KB.summaryCSV(S, r, CASE);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      a.download = `kurmaca-burosu-${CASE.id}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast("CSV indirildi.");
    },
    hot(t) { hotClick(t); },
    book() { S.book = true; save(); render(); const b = document.querySelector(".book .btn"); if (b) b.focus(); },
    bookClose() { S.book = false; save(); render(); },
    sus(t) { S.activeSus = t.dataset.id; save(); render(); },
    ask(t) {
      const s = CASE.suspects.find((x) => x.id === S.activeSus) || CASE.suspects[0], i = +t.dataset.i;
      if ((S.asked[s.id] || []).includes(i)) return;
      S.asked[s.id] = [...(S.asked[s.id] || []), i];
      const clue = s.qs[i].clue, isNew = clue && !S.found[clue];
      if (clue) addClue(clue);
      save(); render();
      const b = document.querySelector(`.bubble.a[data-q="${i}"]`); if (b) b.scrollIntoView({ block: "nearest", behavior: "smooth" });
      if (isNew) { const chip = b && b.querySelector(".clue-chip .ic"); flyClue(clue, chip ? chip.getBoundingClientRect() : null); }
    },
    locCheck() {
      if (!S.loc.ans) { toast("Önce bir manzara seç."); return; }
      if (!S.loc.ev.length) { toast("Tespitini en az bir delille destekle."); return; }
      S.loc.done = true; save(); render();
    },
    land(t) { if (S.loc.done) return; S.loc.ans = t.dataset.id; save(); render(); },
    evToggle(t) { if (Date.now() - dragDoneAt < 300) return; konumToggle(t.dataset.ev); },
    lessonMore() { S.loc.more = !S.loc.more; save(); render(); },
    finWho(t) { if (S.solved) return; S.fin.who = t.dataset.id; save(); render(); },
    finWhy(t) { if (S.solved) return; S.fin.why = t.dataset.id; save(); render(); },
    finCenter(t) { if (S.solved) return; S.fin.center = t.dataset.id; save(); render(); },
    finEv(t) { if (Date.now() - dragDoneAt < 300) return; finEvToggle(t.dataset.ev); },
    ctype(t) {
      const [a, b] = S.pending, res = KB.evalConn(a, b, t.dataset.t, CASE);
      S.conns.push({ a, b, type: t.dataset.t, grade: res.grade, short: res.short, text: res.text, at: Date.now() });
      S.pending = null; S.sel = null; save(); render(); KB.audio.pin();
      toast(`<span class="grade g-${res.grade}">${GRADES[res.grade]}</span> ${esc(res.short)}`);
    },
    cancel() { S.pending = null; S.sel = null; save(); render(); },
    delc(t) { const [a, b] = t.dataset.k.split("|"); S.conns = S.conns.filter((c) => !(c.a === a && c.b === b)); openConns.delete(t.dataset.k); save(); render(); },
    connMore(t) { const k = t.dataset.k; if (openConns.has(k)) openConns.delete(k); else openConns.add(k); render(); },
    noteEdit(t) { S.noteEdit = t.dataset.k; render(); const i = document.querySelector(".note-form input"); if (i) i.focus(); },
    noteCancel() { S.noteEdit = null; save(); render(); },
    accuse() {
      collectForm();
      const miss = []; if (!S.fin.who) miss.push("suçlu"); if (!S.fin.why) miss.push("neden"); if (!S.fin.center) miss.push("gizli merkez");
      if (miss.length) { $("#accuseMsg").textContent = "Eksik: " + miss.join(", ") + "."; return; }
      S.solved = true; S.solvedAt = Date.now(); save(); render(); scrollTo({ top: 0, behavior: "smooth" });
    },
    reopen() { S.solved = false; finalPlayed = false; save(); render(); },
    epilog() { S.epilogFull = !S.epilogFull; save(); render(); },
    copy() {
      const el = $("#sumText"); if (!el) return;
      const txt = el.textContent;
      /* Yedek: pano yoksa metni seç. Eleman bu arada yeniden çizilmiş olabilir; yeniden bul. */
      const fallback = () => {
        const cur = $("#sumText"); if (!cur || !cur.isConnected) { toast("Kopyalanamadı; özeti elle seçip kopyala."); return; }
        try { const r = document.createRange(); r.selectNodeContents(cur); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Metni seçtim; kopyalamak için Ctrl+C / Kopyala."); }
        catch (e) { toast("Kopyalanamadı; özeti elle seçip kopyala."); }
      };
      try { navigator.clipboard.writeText(txt).then(() => toast("Özet kopyalandı."), fallback); } catch (err) { fallback(); }
    },
    askReset() { $("#resetZone").innerHTML = '<span>Bütün ilerleme silinsin mi?</span> <button class="btn" data-act="doReset" style="padding:5px 10px">Evet, sıfırla</button> <button class="btn ghost" data-act="noReset" style="padding:5px 10px">Vazgeç</button>'; },
    noReset() { $("#resetZone").innerHTML = '<button class="btn ghost" data-act="askReset">Vakayı sıfırla</button>'; },
    doReset() { S = fresh(); finalPlayed = false; openConns.clear(); save(); ACTIONS.noReset(); render(); toast("Vaka sıfırlandı."); }
  };
  document.addEventListener("click", (e) => {
    const c = e.target.closest(".c"); if (c) { clueClick(c); return; }
    const t = e.target.closest("[data-act]"); if (!t) return;
    const fn = ACTIONS[t.dataset.act]; if (fn) fn(t);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && guideOpen) { ACTIONS.guideClose(); return; }
    if (e.key === "Escape" && S.book) { ACTIONS.bookClose(); return; }
    if (e.key !== "Enter" && e.key !== " ") return;
    const c = e.target.closest(".c[tabindex]"); if (c) { e.preventDefault(); clueClick(c); }
  });

  render();
})();
