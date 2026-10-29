# Çevrimdışı yazı tipleri

`index.html` çevrimiçiyken Google Fonts'tan yükler; bağlantı yoksa CSS'teki yedeklere düşer
(Courier New, Georgia, Arial Narrow). Tam çevrimdışı görünüm için dosyaları buraya indirip
`css/style.css` başına `@font-face` ekle.

İndirilecekler (woff2, latin-ext alt kümesi Türkçe karakterler için şart):

| Aile | Ağırlık / stil | Dosya adı |
|---|---|---|
| Special Elite | 400 | special-elite-400.woff2 |
| Spectral | 400, 400 italik, 600 | spectral-400.woff2, spectral-400i.woff2, spectral-600.woff2 |
| IBM Plex Sans Condensed | 400, 500, 600 | plex-cond-400.woff2, plex-cond-500.woff2, plex-cond-600.woff2 |

Örnek:

```css
@font-face{font-family:"Special Elite";src:url("../assets/fonts/special-elite-400.woff2") format("woff2");font-weight:400;font-display:swap}
```

Lisans: Special Elite (Apache 2.0), Spectral ve IBM Plex (OFL). Dosyaların yanına lisans metnini koy.
