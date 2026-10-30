# Çevrimdışı yazı tipleri

Oyun yazı tiplerini yalnızca buradan yükler (`css/fonts.css` → `@font-face`); Google Fonts bağlantısı yok.
Dosyalar yoksa ya da yüklenemezse CSS'teki yedeklere düşer (Courier New, Georgia, Arial Narrow).
Tek dosya pakette (`node build.js dist`) bu dosyalar base64 olarak gömülür.

| Aile | Ağırlık / stil | Dosya | Kullanım |
|---|---|---|---|
| Special Elite | 400 | special-elite-400.woff2 | başlık, etiket, damga (`--f-display`) |
| Spectral | 400, 400 italik, 600 | spectral-400.woff2, spectral-400i.woff2, spectral-600.woff2 | öykü cümleleri, balonlar (`--f-text`) |
| IBM Plex Sans Condensed | 400, 500, 600 | plex-cond-400.woff2, plex-cond-500.woff2, plex-cond-600.woff2 | arayüz (`--f-ui`) |

Kaynak: Google Fonts (30 Ekim 2026), latin + latin-ext alt kümesi; ç ğ ı İ ö ş ü â î û ve tipografik tırnaklar denetlendi, eksik yok.
Lisanslar yan dosyalarda: Special Elite → Apache 2.0, Spectral ve IBM Plex → SIL OFL 1.1.

Yeniden indirmek için: Google Fonts CSS'ini eski bir Firefox kullanıcı aracısıyla (ör. Firefox/40) ve
`&subset=latin,latin-ext` ekiyle iste; böylece her yüz tek woff2 dosyası olarak gelir (unicode-range parçalanmadan).
