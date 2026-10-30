/* build.js — kütüphanesiz derleme betiği (Node ≥ 18).
     node build.js icons   assets/icons.svg → js/icons.js  (sprite'ı sayfaya gömen betik)
     node build.js dist    tek dosyalık paket (adım 12'de eklenecek)
   Chrome file:// altında dış SVG sprite'a <use> ile erişemediği için sprite JS ile gömülür. */
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

function buildIcons() {
  const src = path.join(ROOT, "assets", "icons.svg");
  let svg = fs.readFileSync(src, "utf8");
  svg = svg.replace(/<!--[\s\S]*?-->/g, "").replace(/\n\s*\n/g, "\n").trim();
  const ids = [...svg.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]);
  const body = svg.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  const out = `/* ÜRETİLMİŞ DOSYA — elle düzenleme. Kaynak: assets/icons.svg · Üret: node build.js icons
   ${ids.length} simge: ${ids.map((i) => i.replace(/^ic-/, "")).join(", ")} */
window.KB = window.KB || {};
KB.ICON_IDS = ${JSON.stringify(ids.map((i) => i.replace(/^ic-/, "")))};
KB.icon = function (id, cls) { return '<svg class="ic ' + (cls || "") + '" aria-hidden="true"><use href="#ic-' + id + '"/></svg>'; };
(function () {
  const put = function () { document.body.insertAdjacentHTML("afterbegin", \`${body}\`); };
  if (document.body) put(); else document.addEventListener("DOMContentLoaded", put);
})();
`;
  fs.writeFileSync(path.join(ROOT, "js", "icons.js"), out);
  console.log("js/icons.js yazıldı:", ids.length, "simge");
}

/* Tek dosya: index.html içindeki yerel <link rel=stylesheet> ve <script src> etiketleri içerikleriyle değiştirilir.
   css/fonts.css içindeki ../assets/fonts/*.woff2 başvuruları base64 data: olarak gömülür (dış dosya kalmaz). */
function buildDist() {
  buildIcons();
  let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const safe = (s) => s.replace(/<\/(script|style)/gi, "<\\/$1");
  let n = 0, fonts = 0;
  html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, (m, href) => {
    let css = fs.readFileSync(path.join(ROOT, href), "utf8");
    css = css.replace(/url\("\.\.\/assets\/fonts\/([^"]+\.woff2)"\)/g, (m2, file) => {
      fonts++; return `url("data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, "assets", "fonts", file)).toString("base64")}")`;
    });
    n++; return `<style>\n${safe(css)}\n</style>`;
  });
  html = html.replace(/<script src="((?:data|js)\/[^"]+)"><\/script>/g, (m, src) => {
    n++; return `<script>\n${safe(fs.readFileSync(path.join(ROOT, src), "utf8"))}\n</script>`;
  });
  html = html.replace("<title>", `<!-- Kurmaca Bürosu — tek dosyalık paket. Üretildi: ${new Date().toISOString().slice(0, 10)} (node build.js dist). Kaynak: index.html + css/ + js/ + data/ -->\n<title>`);
  const dir = path.join(ROOT, "dist"); if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const out = path.join(dir, "kurmaca-burosu.html");
  fs.writeFileSync(out, html);
  console.log("dist/kurmaca-burosu.html yazıldı:", n, "dosya +", fonts, "yazı tipi gömüldü,", Math.round(html.length / 1024), "KB");
}

const task = process.argv[2];
if (task === "icons") buildIcons();
else if (task === "dist") buildDist();
else { console.log("Kullanım: node build.js icons | dist"); process.exit(1); }
