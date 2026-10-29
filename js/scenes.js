/* scenes.js — olay yeri: 3 resimli sahne, dokunma noktaları, altyazı, delil tepsisi, kitap görünümü.
     KB.sceneSVG(id)              → sahne çizimi (SVG, viewBox 0 0 1000 600)
     KB.renderOlay(S, CASE)       → Olay Yeri ekranının HTML'i
     KB.renderBook(S, CASE)       → "Umut'un anlatısı" tam metin (kitap sayfası)
   Renkler yalnızca .sc-* sınıflarından (css/style.css, sahne tokenları). Metin yazılmaz; altyazı öyküden gelir. */
window.KB = window.KB || {};
(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* 9.20'de duran saat: akrep 280°, yelkovan 120° */
  function clock(cx, cy, r, rimCls) {
    const h = r * .5, m = r * .76;
    const hx = cx + Math.sin(280 * Math.PI / 180) * h, hy = cy - Math.cos(280 * Math.PI / 180) * h;
    const mx = cx + Math.sin(120 * Math.PI / 180) * m, my = cy - Math.cos(120 * Math.PI / 180) * m;
    let ticks = "";
    for (let i = 0; i < 12; i++) ticks += `<line x1="${cx}" y1="${cy - r * .88}" x2="${cx}" y2="${cy - r * (i % 3 ? .8 : .72)}" transform="rotate(${i * 30} ${cx} ${cy})" class="sc-dark-stroke" stroke-width="${r * .05}"/>`;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" class="${rimCls || "sc-dark"}"/><circle cx="${cx}" cy="${cy}" r="${r * .86}" class="sc-light"/>${ticks}
      <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" class="sc-dark-stroke" stroke-width="${r * .09}" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" class="sc-dark-stroke" stroke-width="${r * .06}" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .07}" class="sc-accent"/>`;
  }
  const gull = (x, y, s) => `<path d="M${x - s} ${y}Q${x - s / 2} ${y - s * .7} ${x} ${y}Q${x + s / 2} ${y - s * .7} ${x + s} ${y}" class="sc-dark-stroke" stroke-width="${s * .18}" fill="none" stroke-linecap="round"/>`;

  const SCENES = {
    /* ---------- Sabah · Dükkân içi (gün ışığı) ---------- */
    sabah: () => `
      <rect width="1000" height="600" class="sc-bg"/>
      <rect y="430" width="1000" height="170" class="sc-floor"/>
      <rect y="424" width="1000" height="8" class="sc-mid" opacity=".5"/>
      <rect x="0" y="0" width="1000" height="600" class="sc-daylight"/>
      <!-- raf ve duvar saatleri -->
      <rect x="30" y="262" width="460" height="12" rx="2" class="sc-dark"/>
      ${clock(110, 150, 60)}
      ${clock(245, 135, 70)}
      ${clock(378, 160, 52)}
      <path d="M430 262L445 240H475L490 262Z" class="sc-dark"/>${clock(460, 215, 24)}
      <!-- vitrin -->
      <rect x="520" y="196" width="264" height="236" rx="8" class="sc-dark"/>
      <rect x="534" y="210" width="236" height="208" rx="4" class="sc-glass"/>
      <path d="M534 210L600 210L560 418H534Z" class="sc-light" opacity=".18"/>
      <!-- kadife yastık, boş; ortada saatin izi -->
      <path d="M578 378Q652 362 726 378L734 404Q652 420 570 404Z" class="sc-velvet"/>
      <circle cx="652" cy="392" r="14" class="sc-light-stroke" stroke-width="2" stroke-dasharray="4 4" fill="none" opacity=".8"/>
      <circle cx="578" cy="378" r="5" class="sc-accent"/><circle cx="726" cy="378" r="5" class="sc-accent"/>
      <!-- "Bu saat çalışmaz" kartı -->
      <g transform="rotate(-6 640 270)"><rect x="602" y="246" width="78" height="50" rx="3" class="sc-light"/><rect x="612" y="258" width="56" height="5" class="sc-dark"/><rect x="612" y="270" width="40" height="5" class="sc-dark"/><rect x="612" y="282" width="24" height="4" class="sc-accent"/></g>
      <!-- kapı ve kilit -->
      <rect x="820" y="64" width="152" height="368" class="sc-dark"/>
      <rect x="838" y="84" width="116" height="150" class="sc-mid"/>
      <rect x="838" y="256" width="116" height="156" class="sc-mid"/>
      <circle cx="930" cy="248" r="10" class="sc-accent"/>
      <path d="M930 244v10M927 254h6" class="sc-dark-stroke" stroke-width="2.5"/>
      <rect x="914" y="300" width="22" height="30" rx="3" class="sc-accent"/><circle cx="925" cy="311" r="4" class="sc-dark"/><rect x="923" y="311" width="4" height="10" class="sc-dark"/>
      <!-- tezgâh, lup, sökülmüş kol saati -->
      <rect x="24" y="398" width="476" height="32" rx="4" class="sc-dark"/>
      <rect x="44" y="430" width="436" height="160" class="sc-mid"/>
      <rect x="60" y="470" width="400" height="6" class="sc-dark" opacity=".3"/>
      <path d="M232 348H288L298 396H222Z" class="sc-dark"/><ellipse cx="260" cy="348" rx="28" ry="9" class="sc-light"/><ellipse cx="260" cy="396" rx="38" ry="10" class="sc-dark"/><ellipse cx="252" cy="394" rx="12" ry="3" class="sc-light" opacity=".6"/>
      <circle cx="390" cy="372" r="24" class="sc-dark"/><circle cx="390" cy="372" r="18" class="sc-light"/><circle cx="390" cy="372" r="7" class="sc-accent"/>
      <circle cx="440" cy="386" r="9" class="sc-accent"/><circle cx="440" cy="386" r="3" class="sc-light"/>
      <path d="M120 386L190 372" class="sc-dark-stroke" stroke-width="5" stroke-linecap="round"/><rect x="100" y="380" width="26" height="12" rx="3" class="sc-accent" transform="rotate(-12 113 386)"/>`,

    /* ---------- Yokuş · Dışarısı (soğuk kış sabahı; deniz görünmez) ---------- */
    yokus: () => `
      <rect width="1000" height="600" class="sc-sky"/>
      <path d="M560 300L600 250L640 300ZM640 300L700 230L760 300ZM760 300L800 262L840 300ZM840 300L900 236L960 300Z" class="sc-far"/>
      <rect x="560" y="300" width="440" height="40" class="sc-far"/>
      <path d="M0 340L1000 296V600H0Z" class="sc-ground"/>
      <path d="M0 340L1000 296" class="sc-dark-stroke" stroke-width="3" opacity=".35"/>
      <!-- martılar ve balıkçı kasaları -->
      ${gull(120, 96, 46)}${gull(214, 62, 38)}${gull(176, 140, 30)}${gull(262, 118, 24)}
      <g class="sc-dark"><rect x="70" y="236" width="104" height="66" rx="3"/><rect x="186" y="236" width="104" height="66" rx="3"/><rect x="128" y="176" width="104" height="60" rx="3"/></g>
      <g class="sc-light-stroke" stroke-width="4"><path d="M82 258H162M82 280H162M198 258H278M198 280H278M140 198H220M140 218H220"/></g>
      <path d="M150 170Q158 160 172 166Q184 158 196 170Z" class="sc-mid"/>
      <!-- tuz ve mazot kokusu: varil ve yükselen dalgalı çizgiler -->
      <rect x="468" y="232" width="74" height="82" rx="6" class="sc-dark"/>
      <path d="M468 256H542M468 290H542" class="sc-light-stroke" stroke-width="4" opacity=".6"/>
      <ellipse cx="505" cy="232" rx="37" ry="8" class="sc-mid"/>
      <g class="sc-scent" fill="none" stroke-width="7" stroke-linecap="round"><path d="M484 214Q470 180 486 150Q502 120 486 86"/><path d="M510 220Q496 186 512 156Q528 126 512 92"/><path d="M536 214Q522 180 538 150Q554 120 538 86"/></g>
      <!-- kıyıya çekilmiş tekneler, brandalı -->
      <path d="M380 452H568Q582 452 574 470Q556 496 512 500H420Q392 496 380 470Z" class="sc-dark"/>
      <path d="M400 452L440 426H540L560 452Z" class="sc-tarp"/><path d="M440 426H540" class="sc-dark-stroke" stroke-width="3"/>
      <rect x="420" y="500" width="18" height="18" class="sc-dark"/><rect x="520" y="500" width="18" height="18" class="sc-dark"/>
      <path d="M60 486H440Q470 486 452 514Q420 558 340 562H170Q110 556 78 512Q56 490 60 486Z" class="sc-dark"/>
      <path d="M26 486L40 470L470 478L446 486Z" class="sc-dark"/>
      <path d="M110 486L160 430H380L430 486Z" class="sc-tarp"/><path d="M160 430H380" class="sc-dark-stroke" stroke-width="4"/>
      <path d="M200 430V486M270 430V486M340 430V486" class="sc-dark-stroke" stroke-width="3" opacity=".35"/>
      <path d="M160 430L130 404M380 430L410 404" class="sc-dark-stroke" stroke-width="3" opacity=".6"/>
      <rect x="150" y="562" width="26" height="22" class="sc-dark"/><rect x="330" y="562" width="26" height="22" class="sc-dark"/>
      <!-- otobüs durağı ve son otobüs -->
      <rect x="636" y="246" width="8" height="250" class="sc-dark"/>
      <rect x="606" y="236" width="70" height="52" rx="4" class="sc-light"/><rect x="620" y="250" width="42" height="22" rx="3" class="sc-dark"/>
      <rect x="690" y="322" width="290" height="156" rx="16" class="sc-dark"/>
      <g class="sc-light"><rect x="708" y="340" width="54" height="56" rx="4"/><rect x="774" y="340" width="54" height="56" rx="4"/><rect x="840" y="340" width="54" height="56" rx="4"/><rect x="906" y="340" width="56" height="56" rx="4"/></g>
      <circle cx="744" cy="482" r="24" class="sc-dark"/><circle cx="744" cy="482" r="9" class="sc-mid"/>
      <circle cx="922" cy="482" r="24" class="sc-dark"/><circle cx="922" cy="482" r="9" class="sc-mid"/>
      <rect x="700" y="440" width="270" height="8" class="sc-mid" opacity=".5"/>
      <rect x="960" y="420" width="18" height="14" rx="3" class="sc-accent"/>`,

    /* ---------- Akşam · Dükkân, loş (lamba ışığı) ---------- */
    aksam: () => `
      <rect width="1000" height="600" class="sc-room"/>
      <rect y="440" width="1000" height="160" class="sc-room-floor"/>
      <path d="M500 0V56" class="sc-dark-stroke" stroke-width="4"/>
      <path d="M458 56H542L576 112H424Z" class="sc-dark"/>
      <path d="M424 112H576L790 600H210Z" class="sc-lamp"/>
      <ellipse cx="500" cy="112" rx="70" ry="10" class="sc-accent" opacity=".9"/>
      <!-- vitrin (sol-orta) ve Kenan'ın silüeti -->
      <rect x="230" y="228" width="192" height="212" rx="6" class="sc-dark"/>
      <rect x="242" y="240" width="168" height="188" rx="3" class="sc-glass-dim"/>
      <path d="M278 392Q326 382 374 392L380 408Q326 418 272 408Z" class="sc-velvet"/>
      <circle cx="150" cy="168" r="34" class="sc-silhouette"/>
      <path d="M104 214Q150 190 196 214L210 426H90Z" class="sc-silhouette"/>
      <rect x="110" y="426" width="34" height="110" class="sc-silhouette"/><rect x="158" y="426" width="34" height="110" class="sc-silhouette"/>
      <path d="M196 240L236 300" class="sc-silhouette-stroke" stroke-width="22" stroke-linecap="round"/>
      <!-- tezgâh ve Selma'nın çay tepsisi -->
      <rect x="296" y="416" width="430" height="26" rx="4" class="sc-dark"/>
      <rect x="312" y="442" width="398" height="158" class="sc-counter"/>
      <ellipse cx="520" cy="428" rx="78" ry="13" class="sc-accent"/>
      <ellipse cx="520" cy="424" rx="66" ry="8" class="sc-dark" opacity=".35"/>
      <g class="sc-light"><path d="M482 372H510L508 392Q504 398 508 404L510 424H482L484 404Q488 398 484 392Z"/><path d="M532 372H560L558 392Q554 398 558 404L560 424H532L534 404Q538 398 534 392Z"/></g>
      <g class="sc-tea"><path d="M487 386H505L504 394Q501 398 504 403L505 420H487L488 403Q491 398 488 394Z"/><path d="M537 386H555L554 394Q551 398 554 403L555 420H537L538 403Q541 398 538 394Z"/></g>
      <!-- askı, Kenan'ın montu, cepten sarkan onarım fişi -->
      <rect x="846" y="78" width="12" height="364" rx="3" class="sc-dark"/>
      <path d="M852 78Q820 70 812 92M852 78Q884 70 892 92" class="sc-dark-stroke" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M786 128Q852 98 918 128L944 352H760Z" class="sc-coat"/>
      <path d="M852 128L846 352" class="sc-dark-stroke" stroke-width="3" opacity=".4"/>
      <rect x="800" y="150" width="30" height="14" rx="3" class="sc-dark" opacity=".3"/>
      <rect x="868" y="282" width="54" height="36" rx="3" class="sc-dark" opacity=".35"/>
      <g transform="rotate(8 886 330)"><path d="M872 300H900V356L894 362L888 356L882 362L876 356L872 362Z" class="sc-light"/><rect x="878" y="310" width="16" height="3" class="sc-dark"/><rect x="878" y="320" width="16" height="3" class="sc-dark"/><rect x="878" y="330" width="10" height="3" class="sc-dark"/></g>
      <!-- Umut'un kararmış elleri (ön plan) ve bileğindeki saat -->
      <g class="sc-use-silhouette"><use href="#ic-eller" x="556" y="430" width="200" height="200"/></g>
      <g transform="rotate(-18 826 528)"><rect x="806" y="474" width="40" height="108" rx="10" class="sc-strap"/>${clock(826, 528, 24, "sc-dark")}</g>`
  };

  /* ---------- Konum manzaraları (viewBox 0 0 200 120). Kıyı, deniz olmadan çizilir; reveal ile deniz belirir. ---------- */
  const LANDS = {
    dag: () => `<rect width="200" height="120" class="l-sky"/>
      <path d="M0 92L46 34L84 72L128 22L200 86V120H0Z" class="l-mid"/>
      <path d="M46 34L38 46L56 46ZM128 22L118 36L140 36Z" class="l-snow"/>
      <path d="M0 98Q100 84 200 102V120H0Z" class="l-ground"/>
      <g class="l-dark"><path d="M30 104L38 86L46 104ZM58 102L66 82L74 102ZM166 106L174 90L182 106Z"/><rect x="108" y="92" width="18" height="12"/><path d="M106 92L117 84L128 92Z"/></g>
      <rect x="114" y="96" width="5" height="5" class="l-light"/>`,
    sehir: () => `<rect width="200" height="120" class="l-sky"/>
      <g class="l-dark"><rect x="8" y="52" width="26" height="60"/><rect x="40" y="30" width="30" height="82"/><rect x="76" y="62" width="20" height="50"/><rect x="102" y="18" width="36" height="94"/><rect x="144" y="46" width="24" height="66"/><rect x="174" y="66" width="22" height="46"/></g>
      <path d="M120 18V6M116 8h8" class="l-dark-stroke" stroke-width="2"/>
      <g class="l-light">${[[8, 52, 26, 60], [40, 30, 30, 82], [76, 62, 20, 50], [102, 18, 36, 94], [144, 46, 24, 66], [174, 66, 22, 46]].map(([x, y, w, h]) => { let s = ""; for (let yy = y + 6; yy < y + h - 6; yy += 10) for (let xx = x + 4; xx < x + w - 4; xx += 8) s += `<rect x="${xx}" y="${yy}" width="4" height="5"/>`; return s; }).join("")}</g>
      <rect y="112" width="200" height="8" class="l-ground"/>`,
    kiyi: (revealed) => `<rect width="200" height="120" class="l-sky"/>
      <path d="M0 22L112 72V120H0Z" class="l-ground"/>
      <rect x="112" y="72" width="88" height="48" class="l-ground"/>
      <g class="l-dark"><rect x="14" y="40" width="22" height="16"/><path d="M12 40L25 31L38 40Z"/><rect x="48" y="54" width="22" height="16"/><path d="M46 54L59 45L72 54Z"/><rect x="82" y="68" width="22" height="16"/><path d="M80 68L93 59L106 68Z"/><rect x="104" y="76" width="4" height="28"/></g>
      <g class="l-light"><rect x="20" y="46" width="5" height="5"/><rect x="54" y="60" width="5" height="5"/><rect x="88" y="74" width="5" height="5"/></g>
      <g class="l-sea-g${revealed ? " on" : ""}">
        <rect x="112" y="72" width="88" height="48" class="l-sea"/>
        <g clip-path="url(#kiyiClip)"><g class="l-wave"><path d="M100 86q6-4 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0M100 100q6-4 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0" class="l-light-stroke" stroke-width="1.5" fill="none" opacity=".8"/></g></g>
        <path d="M150 92H176L172 98H154Z" class="l-dark"/><path d="M164 92V78L172 92Z" class="l-light"/>
      </g>
      <clipPath id="kiyiClip"><rect x="112" y="72" width="88" height="48"/></clipPath>`,
    ova: () => `<rect width="200" height="120" class="l-sky"/>
      <rect y="64" width="200" height="56" class="l-ground"/>
      <path d="M0 80L200 76M0 96L200 90M0 112L200 104" class="l-mid-stroke" stroke-width="2" opacity=".5"/>
      <g class="l-dark"><ellipse cx="150" cy="58" rx="4" ry="16"/><ellipse cx="162" cy="56" rx="4" ry="18"/><ellipse cx="174" cy="59" rx="4" ry="15"/><rect x="148" y="70" width="2" height="8"/><rect x="160" y="70" width="2" height="10"/><rect x="172" y="70" width="2" height="8"/><rect x="36" y="56" width="22" height="14"/><path d="M34 56L47 47L60 56Z"/></g>
      <rect x="42" y="60" width="5" height="5" class="l-light"/>
      <path d="M0 64H200" class="l-mid-stroke" stroke-width="1"/>`
  };
  KB.landSVG = function (id, revealed, art) {
    const fn = LANDS[id];
    const fallback = `<rect width="200" height="120" class="l-sky"/><rect y="78" width="200" height="42" class="l-ground"/><g class="l-use"><use href="#ic-${art || id}" x="64" y="20" width="72" height="72"/></g>`;
    return `<svg viewBox="0 0 200 120" aria-hidden="true">${fn ? fn(!!revealed) : fallback}</svg>`;
  };

  /* Çizimi olmayan sahne (yeni vakalar, taslak): ışığa göre zemin + dokunma noktalarının ortasında nesne ikonu. */
  function fallbackScene(scene) {
    const bg = { day: '<rect width="1000" height="600" class="sc-bg"/><rect y="430" width="1000" height="170" class="sc-floor"/>',
      winter: '<rect width="1000" height="600" class="sc-sky"/><path d="M0 340L1000 296V600H0Z" class="sc-ground"/>',
      lamp: '<rect width="1000" height="600" class="sc-room"/><rect y="440" width="1000" height="160" class="sc-room-floor"/><path d="M424 0H576L790 600H210Z" class="sc-lamp"/>' }[scene.light] || "";
    const items = (scene.hotspots || []).map((h) => {
      const cx = (h.x + h.w / 2) * 10, cy = (h.y + h.h / 2) * 6, s = Math.min(h.w * 10, h.h * 6) * .7;
      return `<g class="sc-fallback"><circle cx="${cx}" cy="${cy}" r="${s * .62}" class="sc-light" opacity=".9"/><use href="#ic-${h.art}" x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}"/></g>`;
    }).join("");
    return bg + items;
  }
  /* ---------- Vaka 02 · Palto ---------- */
  const figure = (x, y, s, cls) => `<circle cx="${x}" cy="${y - s * .78}" r="${s * .22}" class="${cls}"/><path d="M${x - s * .3} ${y - s * .5}Q${x} ${y - s * .66} ${x + s * .3} ${y - s * .5}L${x + s * .36} ${y}H${x - s * .36}Z" class="${cls}"/>`;
  Object.assign(SCENES, {
    /* Daire · Gündüz: kâtip masaları, askıdaki yamalı kapot, takılan memurlar, sönük mum, kürk yakalı yeni palto */
    daire: () => `
      <rect width="1000" height="600" class="sc-bg"/>
      <rect y="430" width="1000" height="170" class="sc-floor"/>
      <rect y="424" width="1000" height="8" class="sc-mid" opacity=".5"/>
      <g class="sc-mid" opacity=".5"><rect x="60" y="60" width="130" height="150"/><rect x="820" y="60" width="130" height="150"/></g>
      <g class="sc-light" opacity=".6"><rect x="70" y="70" width="110" height="130"/><rect x="830" y="70" width="110" height="130"/></g>
      <!-- Akakiy'in masası: kâğıt, hokka, harfler -->
      <rect x="40" y="250" width="260" height="22" rx="3" class="sc-dark"/><rect x="60" y="272" width="16" height="150" class="sc-dark"/><rect x="264" y="272" width="16" height="150" class="sc-dark"/>
      <rect x="80" y="200" width="150" height="50" rx="2" class="sc-light" transform="rotate(-4 155 225)"/>
      <path d="M100 215h110M100 228h90M100 241h60" class="sc-dark-stroke" stroke-width="4" transform="rotate(-4 155 225)"/>
      <rect x="240" y="222" width="30" height="28" rx="3" class="sc-dark"/><path d="M255 222V200" class="sc-dark-stroke" stroke-width="4"/>
      <text x="180" y="120" font-family="Special Elite, Courier New, monospace" font-size="54" class="sc-dark" opacity=".55">A ƒ</text>
      <!-- askıdaki yamalı kapot -->
      <rect x="414" y="60" width="10" height="330" rx="3" class="sc-dark"/><path d="M419 60Q392 54 386 74M419 60Q446 54 452 74" fill="none" class="sc-dark-stroke" stroke-width="8" stroke-linecap="round"/>
      <path d="M360 110Q419 86 478 110L498 290H340Z" class="sc-coat"/>
      <g class="sc-light" opacity=".55"><rect x="380" y="160" width="36" height="30"/><rect x="440" y="220" width="30" height="26"/></g>
      <path d="M380 160h36v30h-36ZM440 220h30v26h-30Z" fill="none" class="sc-dark-stroke" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M470 120L490 280" class="sc-dark-stroke" stroke-width="2" stroke-dasharray="6 6" opacity=".5"/>
      <!-- takılan memurlar, kâğıt kırpıntıları -->
      ${figure(640, 300, 150, "sc-dark")}${figure(740, 300, 150, "sc-mid")}
      <g class="sc-light"><rect x="596" y="150" width="12" height="8" transform="rotate(20 602 154)"/><rect x="620" y="130" width="10" height="7" transform="rotate(-30 625 133)"/><rect x="660" y="140" width="12" height="8" transform="rotate(50 666 144)"/></g>
      <!-- mum (yanmıyor) ve boş çay bardağı -->
      <rect x="120" y="470" width="150" height="16" rx="3" class="sc-dark"/>
      <rect x="170" y="400" width="30" height="70" rx="3" class="sc-light"/><path d="M185 400V386" class="sc-dark-stroke" stroke-width="3"/>
      <path d="M130 470V440Q130 430 140 430H150Q160 430 160 440V470Z" class="sc-light" opacity=".5"/>
      <!-- yeni palto: kürk yaka, askılık, dokunan eller -->
      <rect x="760" y="300" width="10" height="290" class="sc-dark"/>
      <path d="M700 350Q765 320 830 350L852 560H678Z" class="sc-dark"/>
      <path d="M730 350Q765 322 800 350Q782 372 765 366Q748 372 730 350Z" class="sc-accent"/>
      <path d="M765 372V560" class="sc-light-stroke" stroke-width="2" opacity=".5"/><circle cx="780" cy="420" r="4" class="sc-light"/><circle cx="780" cy="470" r="4" class="sc-light"/>
      <path d="M860 420Q900 400 920 430M650 440Q620 420 600 450" fill="none" class="sc-dark-stroke" stroke-width="14" stroke-linecap="round"/>`,

    /* Terzi · Merdiven: karanlık basamaklar, kova, iri tırnaklı el ve kumaş, rüzgârlı pencere */
    terzi: () => `
      <rect width="1000" height="600" class="sc-room"/>
      <rect y="440" width="1000" height="160" class="sc-room-floor"/>
      <path d="M40 560H120V500H200V440H280V380H360V320H440V260H520V200H600V140H640" fill="none" class="sc-dark-stroke" stroke-width="10"/>
      <path d="M40 560H120V500H200V440H280V380H360V320H440V260H520V200H600V140H640V600H40Z" class="sc-dark"/>
      <rect x="90" y="470" width="50" height="60" rx="4" class="sc-mid"/><ellipse cx="115" cy="470" rx="25" ry="7" class="sc-glass-dim"/>
      <path d="M150 480Q200 470 240 490" class="sc-light-stroke" stroke-width="3" opacity=".3"/>
      <!-- lamba ve terzi eli -->
      <path d="M560 0V60" class="sc-dark-stroke" stroke-width="4"/><path d="M520 60H600L630 110H490Z" class="sc-dark"/><path d="M490 110H630L740 600H380Z" class="sc-lamp"/>
      <path d="M470 330Q470 290 520 290H600Q640 290 640 330V400H470Z" class="sc-coat"/>
      <path d="M440 300Q420 250 470 236L520 250Q560 260 540 300Z" class="sc-silhouette"/>
      <path d="M470 236Q440 190 466 170Q492 186 488 236Z" class="sc-silhouette"/>
      <path d="M460 176Q470 160 482 174Q486 190 472 198Q458 190 460 176Z" class="sc-accent"/>
      <path d="M540 300L612 262" class="sc-light-stroke" stroke-width="3"/><circle cx="614" cy="260" r="4" class="sc-light"/>
      <!-- rüzgârlı pencere -->
      <rect x="700" y="60" width="240" height="240" rx="4" class="sc-dark"/>
      <rect x="716" y="76" width="208" height="208" class="sc-glass-dim"/>
      <path d="M820 76V284M716 180H924" class="sc-dark-stroke" stroke-width="8"/>
      <g class="sc-light-stroke" stroke-width="5" stroke-linecap="round" opacity=".85"><path d="M730 110H790a8 8 0 1 0-8-8"/><path d="M840 130H900a8 8 0 1 1-8 8"/><path d="M730 230H780a7 7 0 1 1-7 7"/><path d="M850 250H910a8 8 0 1 0-8-8"/></g>
      <g class="sc-light" opacity=".7"><circle cx="760" cy="150" r="3"/><circle cx="880" cy="100" r="3"/><circle cx="800" cy="260" r="3"/><circle cx="900" cy="200" r="3"/></g>`,

    /* Meydan · Gece: kar, ufukta tek ışıklı kulübe, bıyıklı iki adam, köprüde hayalet */
    meydan: () => `
      <rect width="1000" height="600" class="sc-night"/>
      <path d="M0 330L1000 300V600H0Z" class="sc-snow"/>
      <g class="sc-light" opacity=".5"><circle cx="120" cy="80" r="2"/><circle cx="300" cy="140" r="2"/><circle cx="520" cy="60" r="2"/><circle cx="700" cy="120" r="2"/><circle cx="880" cy="70" r="2"/><circle cx="420" cy="200" r="2"/><circle cx="620" cy="220" r="2"/></g>
      <!-- uzakta bekçi kulübesi -->
      <rect x="470" y="246" width="60" height="64" class="sc-dark"/><path d="M462 246L500 222L538 246Z" class="sc-dark"/>
      <rect x="490" y="268" width="20" height="24" class="sc-accent"/>
      <path d="M500 280L520 330H480Z" class="sc-accent" opacity=".3"/>
      <rect x="380" y="150" width="6" height="160" class="sc-dark"/><rect x="371" y="140" width="24" height="16" rx="3" class="sc-dark"/><rect x="376" y="144" width="14" height="8" class="sc-accent" opacity=".9"/>
      <!-- bıyıklı iki adam -->
      ${figure(130, 560, 240, "sc-silhouette")}${figure(260, 540, 220, "sc-silhouette")}
      <path d="M106 392Q118 378 130 390Q142 378 154 392Q142 402 130 394Q118 402 106 392ZM238 380Q250 366 260 378Q270 366 282 380Q270 390 260 382Q250 390 238 380Z" class="sc-light" opacity=".85"/>
      <path d="M150 440Q200 420 230 450" fill="none" class="sc-silhouette-stroke" stroke-width="18" stroke-linecap="round"/>
      <!-- köprü ve hayalet -->
      <path d="M640 470Q770 430 900 470" fill="none" class="sc-dark-stroke" stroke-width="10"/>
      <g class="sc-dark"><rect x="660" y="430" width="8" height="40"/><rect x="720" y="414" width="8" height="46"/><rect x="780" y="406" width="8" height="48"/><rect x="840" y="414" width="8" height="46"/><rect x="900" y="430" width="8" height="40"/></g>
      <path d="M740 540V420Q740 340 790 340Q840 340 840 420V540L824 526L808 540L792 526L776 540L760 526Z" class="sc-light" opacity=".55"/>
      <circle cx="774" cy="400" r="7" class="sc-night"/><circle cx="806" cy="400" r="7" class="sc-night"/>
      <path d="M760 440Q790 430 820 440" fill="none" class="sc-accent" stroke-width="6" stroke-linecap="round" style="stroke:var(--sc-accent);fill:none" opacity=".6"/>`,

    /* Makam · Oda: komiser tezgâhı, yüksek masasında Önemli Kişi, hasta yatağı ve mum */
    makam: () => `
      <rect width="1000" height="600" class="sc-room"/>
      <rect y="440" width="1000" height="160" class="sc-room-floor"/>
      <!-- komiser: tezgâh, kasket, dosya -->
      <rect x="40" y="330" width="260" height="20" rx="3" class="sc-dark"/><rect x="60" y="350" width="220" height="110" class="sc-counter"/>
      ${figure(170, 330, 230, "sc-silhouette")}
      <path d="M116 158Q170 136 224 158L228 174H112Z" class="sc-silhouette"/><rect x="108" y="172" width="124" height="10" rx="3" class="sc-silhouette"/>
      <circle cx="170" cy="160" r="8" class="sc-accent"/>
      <rect x="200" y="300" width="60" height="34" rx="2" class="sc-light" transform="rotate(-8 230 317)"/>
      <!-- Önemli Kişi: yüksek masa, apoletler, arkadaşı -->
      <rect x="380" y="260" width="280" height="24" rx="3" class="sc-dark"/><rect x="400" y="284" width="240" height="176" class="sc-counter"/>
      <path d="M600 140V80" class="sc-dark-stroke" stroke-width="4"/><path d="M560 80H640L670 130H530Z" class="sc-dark"/><path d="M530 130H670L740 600H460Z" class="sc-lamp"/>
      ${figure(520, 260, 240, "sc-silhouette")}
      <rect x="430" y="150" width="44" height="14" rx="3" class="sc-accent"/><rect x="566" y="150" width="44" height="14" rx="3" class="sc-accent"/>
      <path d="M520 150V260" class="sc-light-stroke" stroke-width="2" opacity=".4"/>
      ${figure(640, 240, 170, "sc-mid")}
      <!-- hasta yatağı, mum -->
      <rect x="690" y="420" width="290" height="20" rx="3" class="sc-dark"/><rect x="700" y="440" width="12" height="120" class="sc-dark"/><rect x="958" y="440" width="12" height="120" class="sc-dark"/>
      <path d="M700 420Q720 380 760 380H960Q980 380 980 420Z" class="sc-coat"/>
      <circle cx="736" cy="372" r="22" class="sc-silhouette"/>
      <rect x="880" y="320" width="20" height="60" rx="3" class="sc-light"/><path d="M890 320Q900 300 890 290Q880 300 890 320Z" class="sc-accent"/>
      <path d="M840 300Q860 280 880 300M910 290Q930 270 950 290" fill="none" class="sc-light-stroke" stroke-width="2" opacity=".35"/>`
  });

  KB.sceneSVG = function (id, scene) {
    const fn = SCENES[id];
    return `<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${fn ? fn() : fallbackScene(scene || {})}</svg>`;
  };

  /* ---------- Olay Yeri ekranı ---------- */
  /* Altyazı: öyküden birebir. Metin zaten tırnaklıysa yeniden tırnaklanmaz. */
  KB.captionHTML = function (S, CASE) {
    const c = S.caption && CASE.clues[S.caption];
    if (!c) return '<span class="muted">Nesnelere dokun.</span>';
    const t = c.caption, quoted = /^[“"]/.test(t);
    return `<span class="who">${esc(CASE.narratorName || "Umut")}</span>${quoted ? `<i>${esc(t)}</i>` : `<q>${esc(t)}</q>`}`;
  };
  KB.trayHTML = function (S, CASE) {
    const CLUE_IDS = Object.keys(CASE.clues);
    const found = CLUE_IDS.filter((i) => S.found[i]).sort((a, b) => S.found[a] - S.found[b]);
    return found.map((id) => `<span class="ev" data-ev="${id}" title="${esc(CASE.clues[id].label)}">${KB.icon(CASE.clues[id].art)}</span>`).join("") + `<span class="tray-count">${found.length}/${CLUE_IDS.length}</span>`;
  };
  KB.hotBadge = (c) => KB.icon(c.art, "hot-badge");

  KB.renderOlay = function (S, CASE) {
    const scenes = CASE.scenes, idx = Math.max(0, Math.min(scenes.length - 1, S.scene || 0)), sc = scenes[idx];
    const CLUE_IDS = Object.keys(CASE.clues);
    const textClues = CLUE_IDS.filter((i) => !CASE.clues[i].src);
    const left = textClues.filter((i) => !S.found[i]).length;
    const hots = sc.hotspots.map((h) => {
      const c = CASE.clues[h.clue], on = !!S.found[h.clue];
      return `<button class="hot${on ? " found" : ""}" data-act="hot" data-c="${h.clue}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%" aria-label="${esc(c.label)}${on ? " (bulundu)" : ""}" ${on ? 'aria-pressed="true"' : ""}>${on ? KB.hotBadge(c) : ""}</button>`;
    }).join("");
    return `<div class="olay">
      <div class="scene-nav">
        <button class="nav-btn" data-act="scene" data-d="-1" aria-label="Önceki sahne" ${idx === 0 ? "disabled" : ""}>‹</button>
        <div class="scene-dots" role="tablist">${scenes.map((s, i) => `<button class="dot-btn${i === idx ? " on" : ""}" data-act="sceneTo" data-i="${i}" role="tab" aria-selected="${i === idx}" aria-label="${esc(s.title)}"></button>`).join("")}</div>
        <span class="scene-title">${esc(sc.title)}</span>
        <button class="nav-btn" data-act="scene" data-d="1" aria-label="Sonraki sahne" ${idx === scenes.length - 1 ? "disabled" : ""}>›</button>
      </div>
      <div class="scene scene-${sc.light}" id="scene" data-scene="${sc.id}">${KB.sceneSVG(sc.id, sc)}<div class="hots">${hots}</div></div>
      <div class="caption" id="caption" aria-live="polite">${KB.captionHTML(S, CASE)}</div>
      <div class="tray-row">
        <div class="tray" id="tray" aria-label="Delil tepsisi">${KB.trayHTML(S, CASE)}</div>
        <div class="row">
          <button class="btn" data-act="hint" ${left ? "" : "disabled"} title="Bulunmamış bir ayrıntıyı parlatır">${KB.icon("tur-kanit")} Büyüteç</button>
          <button class="btn" data-act="book">${KB.icon("tur-diyalog")} ${esc(CASE.bookLabel || "Umut'un anlatısı")}</button>
        </div>
      </div>
    </div>`;
  };

  /* ---------- "Umut'un anlatısı": tam metin, kitap sayfası ---------- */
  KB.renderBook = function (S, CASE) {
    const body = CASE.story.map((p) => "<p>" + p.replace(/\[\[(\w+)\|([^\]]+)\]\]/g, (m, id, t) => `<span class="c${S.found[id] ? " found" : ""}" data-c="${id}" ${S.found[id] ? "" : 'tabindex="0" role="button"'}>${t}</span>`) + "</p>").join("");
    return `<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="${esc(CASE.bookLabel || "Umut'un anlatısı")}">
      <div class="book paper">
        <div class="book-head"><div><div class="label">Anlatan: ${esc(CASE.narrator)}</div><h2 class="story-title">${esc(CASE.title)}</h2></div><button class="btn" data-act="bookClose" aria-label="Kapat">Kapat</button></div>
        <div class="prose book-text">${body}</div>
      </div>
    </div>`;
  };
})();
