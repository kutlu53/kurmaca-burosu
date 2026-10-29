# Kurmaca Bürosu — Proje Rehberi

> Bu dosya projenin tek doğruluk kaynağıdır. Claude Code her oturumda bunu okur.
> Kararlar değişirse önce bu dosyayı güncelle, sonra kodu.

---

## 1. Proje özeti

**Kaynak:** "Öykü ve Romanlara Kurmaca Ağından Bakmak" adlı lise edebiyat projesi (BİLSEM / TÜBİTAK raporu).
Raporda kurmaca metinlerin birimleri (metafor, imge, diyalog, anlatıcı, mekân, leitmotif, bilinç akışı) 90x100 cm'lik bir kaideye örümcek ağı gibi gerilmiş iplerle üç boyutlu gösteriliyor. Ağın merkezi, metnin **"gizli merkezi"**: bütün ayrıntıların aktığı ve birleştiği yer. Raporda A (kontrol) ve B (deney) grubu karşılaştırması da var.

**Bu proje:** O fiziksel ağı tarayıcıda çalışan, **polisiye kurgulu bir okuma oyununa** çevirmek.

**Ana metafor:** Polisiye dizilerdeki kırmızı ipli dedektif panosu = kurmaca ağı.
- Okur = dedektif
- Ayrıntı = ipucu
- Gizli merkez = çözülecek dava

Her vaka iki soru taşır:
1. **Ne oldu?** (polisiye düzey, olay örgüsü)
2. **Bu öykü aslında ne anlatıyor?** (edebi düzey, gizli merkez)

**Hedef kitle:** Lise öğrencileri (edebiyat dersi, yaratıcı yazma, eleştirel okuma). Öğretmen de sonuç özetini kullanır.

---

## 2. Değişmez kurallar

1. **Kurgu bozulmaz.** Vaka 01'in öykü metni, karakterleri, ipuçları ve çözümü aşağıdaki gibi kalır. Metin kısaltılmaz; parçalara bölünüp sahnelere dağıtılır.
2. **Ekranda az yazı, çok görsel.** Hiçbir ekranda 30-40 kelimeden fazla arayüz yazısı olmaz. Açıklamalar yerine çizim, ikon, animasyon kullanılır.
3. **Öykünün tamamı her zaman erişilebilir.** "Umut'un anlatısı" düğmesi tam metni kitap sayfası görünümünde açar (okuma isteyen öğrenci ve A/B ölçümü için).
4. **Tek bir doğru yorum yoktur.** Bağlantılar dereceli değerlendirilir (ustaca / güçlü / zayıf / kanıt yetersiz). Yanlış bağlantı ceza almaz. Gizli merkez için birden fazla geçerli cevap vardır.
5. **Çevrimdışı çalışır.** Sunucu yok, dış görsel yok, `fetch` ile JSON okuma yok (file:// altında çalışmaz). Tüm çizimler SVG olarak kodda.
6. **Arayüz dili Türkçe.** Türkçe karakterler (ç, ğ, ı, İ, ö, ş, ü) her yerde doğru.
7. **Telif:** Vaka 01 özgün yazıldı. Gerçek eserlerden vaka yaparken bkz. Bölüm 11.

---

## 3. Mevcut durum

- `prototip-v1.html` — çalışan ilk sürüm (tek dosya, metin ağırlıklı). Bütün oyun mantığı, veri ve puanlama burada test edildi. **v2 bu dosyadan yola çıkar ama görsel olarak baştan kurulur.**
- v1'deki akış: Dosya → Olay Yeri → Sorgu → Konum → Pano → Suçlama → Sonuç.
- v1'de çalışanlar (korunacak): ipucu toplama, sorgudan delil kazanma, konum tespiti, sürüklenebilir pano + SVG ipler, bağlantı değerlendirme, puanlama, unvan, öğretmen özeti (kopyalanabilir), localStorage kaydı, sıfırlama.
- **v2 ilerleme (29 Ekim 2026):** Yol haritası adım 1 tamam. Bölüm 6.1 iskeleti kuruldu; `data/case-01.js` v1 verisini birebir taşıyor ve yeni alanları (`short`, `art`, `caption`, `scenes`, `links[].short`, `epilogShort`, ayrıca `briefLong`, `centerText`, `verdict`) içeriyor. Ortak sabitler (`TYPES`, `GRADES`, `STEPS`) `js/main.js` başında, `window.KB` altında.
- **Adım 2 tamam (29 Ekim 2026):** v1 mantığı modüllere taşındı: `js/score.js` (`KB.score`, `KB.summaryText`, `KB.fmtTime`), `js/board.js` (`KB.evalConn`, `KB.drawStrings`, `KB.initBoard`), `js/main.js` (durum, görünümler, olaylar). `index.html` artık v1 ile aynı akışla oynanıyor; görünüm hâlâ v1 (metin ağırlıklı), v1 ekran stilleri `css/style.css` içine taşındı. Kayıt anahtarı `kurmaca-burosu-v2-vaka-01`. Eşdeğerlik testi: bütün kart çiftleri × 6 tür için `evalConn` ve 3000 rastgele senaryo için puan/unvan/özet v1 ile birebir. `clock.js`, `scenes.js`, `audio.js` hâlâ API notlu boş dosyalar. Sıradaki: adım 3 (saat bileşeni ve ikon sprite'ı).
- **Adım 3 tamam (29 Ekim 2026):** `js/clock.js` (`KB.createClock`: duvar/masa/cep/kol, `setTime` animasyonlu, `setTicking`) ve `assets/icons.svg` sprite'ı (36 simge: 6 tür, 18 delil, soru ikonları, 4 portre + boş çerçeve, merkez, raptiye). **Karar:** Chrome `file://` altında dış sprite'a `<use>` ile erişemediği için sprite `node build.js icons` ile `js/icons.js` olarak üretilip sayfaya gömülür; `icons.svg` tek kaynaktır, `js/icons.js` elle düzenlenmez. `KB.icon(id)` yardımcı fonksiyonu `<svg class="ic"><use href="#ic-id"/></svg>` döndürür; renkler `currentColor`, `--ic-bg`, `--ic-a`, `--ic-s`. Galeri: `test/icons.html` (`#auto` ile headless animasyon denetimi). Sahne nesneleri (adım 4), manzaralar (adım 6) ve suçlama kartları (adım 8) sprite'a sonradan eklenir. Sıradaki: adım 4 (olay yeri sahneleri).
- **Adım 4 tamam (29 Ekim 2026):** Olay yeri sahneleri `js/scenes.js` içinde (`KB.sceneSVG`, `KB.renderOlay`, `KB.renderBook`, `KB.captionHTML`, `KB.trayHTML`). Üç SVG sahne (viewBox 1000×600), görünmez `<button class="hot">` dokunma noktaları (`data/case-01.js` → `scenes[].hotspots`, yüzde), Umut'un altyazısı (öyküden birebir, zaten tırnaklıysa yeniden tırnaklanmaz), delil tepsisi, sahneden tepsiye uçan ikon (Web Animations, hareket azaltmada atlanır), büyüteç (önce açık sahne, sonra öbür sahneler; kitap açıksa metinde parlatır), "Umut'un anlatısı" kitap görünümü (`.sheet > .book`, Esc ile kapanır, metinden ipucu toplama v1 gibi). Sahne renkleri `css/style.css` içinde `.scene-day/.scene-winter/.scene-lamp` altında paletten `color-mix` ile türetilen `--sc-*` tokenları. Olay yerinde dokunuşlar tam çizim yerine `refreshOlay()` ile yerinde güncellenir (kaydırma/odak korunur). Durum: `S.scene`, `S.caption`, `S.book`. Görüntü testi: `test/scene-shot.html#scene=0|1|2`, `#book`, `&w=400`. Sıradaki: adım 5 (sorgu ekranı).
- **Adım 5 tamam (29 Ekim 2026):** Sorgu ekranı `js/main.js` içinde `vSorgu`: 4 portre (`ic-usta/kenan/selma/umut`, altında 3 noktayla sorulan soru sayısı), ikonlu soru kartları (`qs[].icon`), soru/cevap çizgi roman balonları, cevaptaki "(sahne yönergesi)" soluk italik, delil veren cevapta "Delil" çipi ve tepsiye uçan ikon, Umut seçiliyken "Anlatıcıyı sorguluyorsun" etiketi, altta delil tepsisi. **Not:** Soru kartlarında soru metni tam gösterilir (çoğu ≤5 kelime, ikisi 6-7); yeni kısa etiket yazmak yerine özgün soru korundu. v1 "defter" yan paneli kaldırıldı (`notebook()` silindi; `.notebook/.sus/.q` CSS'i v1 bloğunda duruyor, temizlik adım 11'de). Sıradaki: adım 6 (konum ekranı).
- **Adım 6 tamam (29 Ekim 2026):** Konum ekranı `vKonum` (main.js) + `KB.landSVG` (scenes.js): dört manzara düğmesi (dağ, şehir, kıyı, ova; kıyı denizsiz çizilir), seçili manzaranın altında "cep" (eklenen delil ikonları), delil çipleri (`.evc`, bulunan bütün ipuçları) dokunarak eklenir/çıkarılır ya da manzaraya sürüklenir (pointer olayları, 6 px eşiği, sürüklemeden sonraki click yok sayılır). "Tespiti kaydet" → `S.loc.done`; doğru manzarada `.l-sea-g.on` ile deniz belirir ve dalga animasyonu (`@keyframes wave`, clipPath sarmalayıcı `<g>` üzerinde) başlar; yanlışsa seçim kırmızı, doğru yine yeşil ve deniz görünür. Ders tek satır (`lessonShort`), "Neden?" ile uzun hâli (`S.loc.more`). Puanlama değişmedi (`loc.ans`, `loc.ev`). `#loc-*`/`#locev-*` form girdileri kalktı; testler `.land`/`.evc` kullanır. Sıradaki: adım 7 (pano v2).
- **Adım 7 tamam (29 Ekim 2026):** Pano v2. Kartlar polaroid (`.card`: raptiye, `art` ikonu, `cap` = `clues[].short`), merkez kartı pirinç çerçeveli `ic-merkez`. İlk yerleşim iki halka (tek/çift sıra iç-dış) ki kartlar üst üste binmesin. Tür seçici 6 ikonlu düğme (`.tbtn`, renk `--ip-<tür>`), seçim çubuğu ikon + "İkinci karta dokun". İpler (`KB.drawStrings`): renk türe göre (`--ip-leitmotif/metafor/mekan/diyalog/zaman/kanit`), biçim dereceye göre (ustaca kalın + parlama, güçlü düz, zayıf kesik, yetersiz ince gri noktalı); eğrinin ortasında tür ikonu rozeti (`<use>`). Bağ listesi: derece rozeti (dokununca uzun açıklama açılır, `openConns` oturumluk), iki kart ikonu, tür halkası, `short` satırı, sil. `S.conns[]` kayıtlarına `short` eklendi (eski kayıtlar `text`'e düşer). Bildirim: rozet + `short`. Puanlama değişmedi. Görüntü testi: `#pano=pick|sel|more`. Sıradaki: adım 8 (suçlama v2).
- **Adım 8 tamam (29 Ekim 2026):** Suçlama odası v2 (`vSucla`): 5 numaralı bölüm. (1) Suçlu: 5 portre düğmesi (`final.who.options[].art`, "Kimse" = `bos-cerceve`); (2) Deliller: "Dosya" klasörü (`.folder`, sekme ve n/4 sayacı) + delil tepsisi; çipler dokunarak girer/çıkar ya da klasöre sürüklenir (konum sürükleme kodu `.folder` hedefini de tanır), klasördeki çipe dokununca çıkar, 4'ten fazlası bildirimle reddedilir; (3) Neden ve (4) Gizli merkez: resimli kartlar (`.pcard`, `art` ikonu + seçenek metni); (5) Rapor: textarea. Erken suçlama uyarısı tek satır. Seçimler `finWho/finWhy/finCenter/finEv` eylemleriyle doğrudan `S.fin`'e yazılır; `collectForm` yalnızca raporu okur. Sprite'a eklendi: `maske, kese, yumruk, saat-kurdele, saat-isleyen, iki-el` (42 simge). Görüntü testi: `#sucla`, `#sucla=alt`. Sıradaki: adım 9 (final animasyonu ve sonuç ekranı).
- **Adım 9 tamam (29 Ekim 2026):** Final ve sonuç (`vSonuc` + `mountFinal`). Sahne: mendil (iki `.flap`, `rotateY` ile açılır) → gümüş cep saati belirir ve tıkırdar (`setTicking`) → üç duvar/masa saati 9.20'den gerçek saate döner (`setTime` animasyonlu, 250 ms kaydırmalı) → en son Umut'un kol saati. Animasyon oturumda bir kez oynar (`finalPlayed`; "Yeniden düşün" ve sıfırlama sıfırlar), hareket azaltmada her şey anında. Epilog kartı `epilogShort` (3 satır), "Epilogu oku" ile tamamı (`S.epilogFull`). Sonuç kâğıdı: "DOSYA KAPANDI" damgası, unvan rozeti (`.rosette`), çubuklar (puan, delil, bağ [ustaca/güçlü rozetleri], süre + büyüteç), üç karar satırı (suçlu ✓/✗ + isabetli delil n/4, neden ✓/✗, gizli merkez derece rozeti) ikonlu. Düz okur ve rapor iki balon yan yana. Öğretmen özeti (`KB.summaryText`, değişmedi) + kopyala. Görüntü testi: `#sucla=sonuc`, `#sucla=sonuc-alt`. Sıradaki: adım 10 (isteğe bağlı ses) ve 11 (kontrol/temizlik).
- **Adım 10 tamam (29 Ekim 2026):** `js/audio.js` Web Audio sentezi, dosyasız: `tick` (tik/tak sırayla), `startTicking/stopTicking` (final sahnesinde cep saati tıkırdarken), `gull` (yokuş sahnesi açılınca), `pin` (delil bulma, bağ kurma, dosya açma). Varsayılan kapalı; üst banttaki "Sessiz/Ses" çipiyle açılır (`data-act="audio"`), tercih `localStorage["kurmaca-burosu-ses"]`; açık kayıtlıysa ilk dokunuşta bağlam kurulur (tarayıcı kuralı).
- **Adım 11 tamam (29 Ekim 2026):** Dosya (giriş) ekranı rehber 5.3'e göre yeniden kuruldu: masada kapalı dosya (`.file.closed`, "Vaka 01" sekmesi, tıklanınca `S.fileOpen`), açılınca GİZLİ damgası, 2 cümlelik `brief`, 5 adım çipi, "Soruşturmaya başla", düz okur balonu. `briefLong` artık kullanılmıyor (veride duruyor). v1'den kalan kullanılmayan CSS silindi (defter, v1 sorgu, `.opts/.opt`, `.fb`, `.verdict/.vbox/.rank`, v1 `.compare/.epilog`); kalanlar: `.c`, `.story-title`, `.empty`, `textarea`, `pre.summary`. Kontrol listesi: 400 px taşma yok (otomatik akış), klavye (bütün dokunma noktaları ve kartlar `<button>` ya da `tabindex` + Enter/Space, kitap Esc), hareket azaltma (global + saat/uçuş/final), file:// açılış, Türkçe karakterler. Sıradaki: adım 12 (`node build.js dist`).
- **Adım 12 tamam (29 Ekim 2026):** `node build.js dist` → `dist/kurmaca-burosu.html` (önce sprite'ı yeniden üretir; `index.html` içindeki yerel `<link rel=stylesheet>` ve `<script src>` etiketlerini içerikle değiştirir, `</script` kaçışlanır; Google Fonts bağlantısı kalır). ~150 KB, dış yerel başvuru yok. `test/mobile-flow.html#dist` aynı akış testini paket üzerinde koşar. **Yol haritası (Bölüm 7) tamamlandı.** Her değişiklikten sonra: `node build.js dist` ve üç test.
- **Ek 1 — CSV (29 Ekim 2026):** Sonuç ekranında "CSV indir" (`KB.summaryCSV`, score.js): tek satır, `;` ayraçlı, UTF-8 BOM'lu (Türkçe Excel doğrudan açar). Sütunlar: vaka, tarih, unvan, puan, puan_max, sure, buyutec, delil, delil_max, bag, bag_ustaca, bag_guclu, konum, suclu, suclu_dogru, neden, neden_dogru, gizli_merkez, gizli_merkez_derece, rapor, baglar. Öğretmen dosyaları tek tabloda birleştirir (A/B karşılaştırması, §9).
- **Ek 2 — Çoklu vaka ve Vaka 02 taslağı (29 Ekim 2026):** `window.CASES` birden fazla vaka taşır; etkin vaka `#vaka-02` adres eki > `localStorage["kurmaca-burosu-vaka"]` > ilk vaka. Dosya ekranı birden çok vaka varsa raf gösterir; başka dosyaya dokununca `switchCase` (kayıt + hash + yeniden yükleme). Kayıt anahtarı zaten vaka kimliğiyle (`kurmaca-burosu-v2-<id>`). Yanıltıcı ipucu artık `CASE.redHerringId` (Vaka 01: `eller`). Çizimi olmayan sahneler için `scenes.js` yedek çizim (ışığa göre zemin + dokunma noktasında nesne ikonu), manzaralar için `landSVG` yedek (ikonlu kart). **`data/case-02.js` "Palto" TASLAK** (`draft: true`, rafta "Taslak" etiketi): Gogol 1842, telifsiz; metin çeviri değil, özgün Türkçe yeniden anlatım (anlatıcı: masa komşusu kâtip). 18 ipucu (14 metin, 4 sorgu), 4 sahne (yedek çizim), 4 tanık (Petroviç, Önemli Kişi, Bekçi, Anlatıcı), konum bilmecesi (şehir adı geçmez → kuzeyde soğuk başkent), 25 bağ, suçlu sorusu "Akakiy'i ne öldürdü?" (doğru: Önemli Kişi'nin azarı), gizli merkez ustaca: "görünmez insanın paltoyla görünür olup silinmesi". Yanıltıcı ipucu: `biyik`. Sprite'a 26 simge eklendi (68 simge). **Öğretmen/yazar gözden geçirmeli:** öykü metni ve bağ açıklamaları. Genel denetim: `node test/verify-case.js . [vaka-02]`.
- **Ek 3 — Vaka 02 sahne çizimleri (29 Ekim 2026):** `scenes.js` SCENES'e `daire` (gündüz: kâtip masası ve harfler, askıda yamalı kapot, takılan memurlar, sönük mum, kürk yakalı yeni palto), `terzi` (lamba: karanlık merdiven ve kova, iri tırnaklı el ve kumaş, rüzgârlı pencere), `meydan` (yeni ışık tipi `night`: `.scene-night` tokenları `--sc-night/--sc-snow`; uzakta kulübe ve fener, bıyıklı iki silüet, köprüde hayalet), `makam` (lamba: komiser tezgâhı, apoletli Önemli Kişi ve arkadaşı, hasta yatağı ve mum) eklendi. Yedek çizim artık yalnızca çizimi olmayan yeni vakalar için.
- **Ek 4 — İsteğe bağlı yardım (29 Ekim 2026):** Kendiliğinden açılan açıklama yok; kural 2 korunur. Yardım açıkken: üst bantta "?" çipi → `renderGuide()` (altı resimli adım + gizli merkez tanımı + altı tür tanımı, `KB.GUIDE`, `KB.TYPE_DEFS`, `KB.CENTER_DEF` main.js başında); panoda tür seçicide "Türler?" bağlantısı (`S.typeHelp`) ve düğmelerde `title`; merkez kartı seçilince tanım. **Öğretmen anahtarı:** adres eki `#yardim=kapali` / `#yardim=acik` (vaka ekiyle birlikte: `#vaka-02&yardim=kapali`) ya da alt banttaki "Yardım açık/kapalı" düğmesi; tercih `localStorage["kurmaca-burosu-yardim"]`. Kapalıyken "?" çipi, "Türler?" ve `title`'lar görünmez; oyun ve puanlama değişmez. A/B için kontrol grubuna kapalı verilebilir; önerilen uygulama yine öğretmenin 2-3 dakikalık sözlü girişi. Adres eki ayrıştırması artık `&` ile birden çok parametre alır (`H` nesnesi).
- **Ek 5 — Uçtan uca oyun testi ve düzeltmeler (29 Ekim 2026):** `test/playtest.html` (öğrenci gibi 100+ kontrol: kapılar, yardım/ses anahtarları, sahne/kitap/büyüteç, sorgu, konum yanlış cevap, pano çift bağ/yanlış tür/yanıltıcı/yetersiz/merkez/sil/sürükle/klavye, suçlama doğrulama ve 4 delil sınırı, kısa/uzun rapor, sonuç, CSV, kopyala, yeniden düşün, puan tutarlılığı, yeniden yükleme, sıfırlama, vaka geçişi, adres eki; `#w=400` ile mobil). Bulunup düzeltilenler: kopyalama yedeği yeniden çizilmiş elemana başvuruyordu (artık yeniden bulur, bulamazsa bildirim); `setPointerCapture` sentetik olayda hata atıyordu (try/catch); süre sayacı dosya kapandıktan sonra da akıyordu (`elapsed()` → `solvedAt`); konum/suçlama çiplerinin adı dokunmatikte görünmüyordu (ekle/çıkar bildirimi delil adını söyler); olay yeri ve sorguda sonraki adıma düğme yoktu ("Sorguya geç", "Konuma geç"; tamamlanınca vurgulu).
- **Ek 6 — Proje raporuyla hizalama (30 Ekim 2026):** Kaynak rapor (`kurmaca ağı proje raporu v.docx`, depoya girmez: `.gitignore` `*.docx`) okunup oyunla karşılaştırıldı. Yapılanlar: (1) **"Kendi bağım":** her bağ satırında "Gerekçe" düğmesi (`noteEdit` → `.note-form` → `submit`), tek satır (≤160), `conns[].note`; puanlanmaz, öğretmen özetinde "· gerekçe: …" ve CSV'de `gerekceler` sütunu. Yetersiz bağlarda düğme pirinç vurgulu (raporun "yaratıcı açıklama" bulgusuna alan). (2) **Yedinci tür `anlatici`** ("Anlatıcı / Bakış açısı", ikon `tur-anlatici`, ip rengi `--ip-anlatici`): Vaka 01'de `anlatici` ipucunun türü (v1'de diyalog) ve üç bağın `types` sonuna eklendi; Vaka 02'de `kardes`. Eşdeğerlik testi bu türü ayıklayarak v1 ile karşılaştırır (`strip`, `verify-data` eşlemesi). (3) **Vaka 02 gizli merkez** raporun B grubu okumasına göre: ustaca = "giyinmek değil soyunmak; çıplak kalan bürokrasi ve hukuk" (`soyunma`), güçlü = görünmezlik, `centerFlow`'a `komiser`, `usul`; yeni bağ `komiser–yaka`. (4) Alt banta ve README'ye konumlandırma cümlesi: oyun fiziksel kurmaca ağına hazırlık ve ölçme aracıdır. Rapor-oyun karşılaştırmasının tamamı 30 Ekim sohbet özetinde; açık kalan: Küçük Prens, İpekli Mendil, Bartleby, Mesut İnsanlar vakaları (§10).
- **Ek 7 — Vaka 03 "Kâtip Bartleby" taslağı (30 Ekim 2026):** `data/case-03.js`, `draft: true`. Melville 1853, telifsiz; özgün Türkçe yeniden anlatım, anlatıcı avukat. 18 ipucu (14 metin, 4 sorgu; ikisi anlatıcıdan: `bakmadim`, `kacti`), 4 sahne (yedek çizim: `buro`, `pazar`, `tasinma`, `avlu`), 4 tanık (Avukat = anlatıcı ve doğru "suçlu", Hindi, Kıskaç, Zencefil), konum (şehir adı yok → iş sokağı; deliller duvar, pazar, avlu), 24 bağ, yanıltıcı ipucu `kek`. Gizli merkez ustaca = raporun B grubu paravan okuması ("efendi hizmetkârını elinin altında tutar, bakışına katlanamaz"); güçlü = "tercih etmeme" hakkı. Final `ikon: paravan`. Sprite'a 19 simge eklendi (88). Metinde işaretsiz bırakılan üç ayrıntı (solgunluk, Kıskaç'ın sabahı, açılmayan kapı) 18 ölçüsü için ipucu yapılmadı; istenirse eklenebilir. Öğretmen/yazar gözden geçirmeli.
- **Doğrulama betikleri** (`test/`, Node ile, kütüphanesiz): `node test/verify-data.js .` veri bütünlüğü ve v1 ile karşılaştırma; `node test/equiv-v1.js .` puan/bağ eşdeğerliği; `test/mobile-flow.html` headless Chrome'da 400 px iframe içinde tam akış ve taşma ölçümü. Her adımdan sonra üçü de çalıştırılır. Headless Chrome penceresi en az 500 px açıldığı için mobil ölçüm iframe ile yapılır.

---

## 4. Vaka 01 — "Dokuzu Yirmi Geçe" (tam içerik)

### 4.1 Görev ve düz okur

**Görev (kısa):** Sahil yokuşundaki saatçi dükkânından bir gümüş cep saati kayboldu. Kapı zorlanmamış, kilit sağlam. Ayrıntıları topla, tanıkları sorgula, ipuçlarını bağla.

**Düz okurun ifadesi (tanık):**
> "Bir saatçinin değerli saati çalınmış. Elleri hep kirli olan çırak almıştır, zaten anahtarını da kaybetmişti. Öykü bitti."

Oyuncunun işi, düz okurun kaçırdığını bulmak.

### 4.2 Öykü metni

Anlatıcı: **Umut** (çırak), birinci tekil kişi. `[[id|metin]]` işaretli yerler ipucudur.

1. Nevzat Usta'nın dükkânında saatler hiç susmazdı ama hiçbiri doğruyu söylemezdi. Vitrindeki duvar saatleri, masa saatleri, camı çatlamış kol saatleri, [[saatler|hepsi dokuzu yirmi geçeyi gösterirdi]]. Usta onları her sabah kurar, sonra akrebi yine aynı yere çekerdi. Nedenini sormadım. Üç yıldır çırağıyım; bazı soruların cevabını sormadan öğrenirsin.
2. Perşembe sabahı dükkânı ben açtım. Yokuşun başında [[marti|martılar balıkçı kasalarının üstünde kavga ediyordu]], havada her zamanki [[koku|tuz ve mazot kokusu]] vardı. Kış gelmişti; [[tekne|kıyıya çekilmiş teknelerin brandaları rüzgârda şişiyordu]]. Kepengi kaldırdım, ışığı yaktım ve [[yastik|vitrinin ortasındaki kadife yastığın boş olduğunu]] gördüm.
3. O yastıkta Usta'nın rahmetli karısı Mürüvvet Hanım'ın gümüş cep saati dururdu. Satılık değildi. Fiyat etiketinin yerinde [[kart|Usta'nın el yazısıyla "Bu saat çalışmaz" yazan küçük bir kart]] vardı. Dükkândaki tek gerçekten durmuş saat oydu. Öbürlerini Usta durduruyordu; onu ise kimse çalıştıramamıştı.
4. Kapıda zorlama yoktu, kilit sağlamdı. [[anahtar|Dükkânın anahtarı yalnızca iki kişide vardı: Usta'da ve bir hafta önce İstanbul'dan gelen oğlu Kenan'da.]] Benim anahtarım geçen ay kaybolmuştu, Usta yenisini yaptırmamıştı. Sabahları onun evine uğrayıp anahtarı oradan alırdım. O sabah da öyle yapmıştım.
5. Usta geldiğinde boş yastığa uzun uzun baktı. Bağırmadı. [[durdum|"O saat durdu, ben de durdum," dedi. "Kim aldıysa zamanımı almış olur."]] Sonra tezgâhın arkasına geçti, lupunu taktı ve hiçbir şey olmamış gibi bir kol saatini sökmeye başladı.
6. Öğleye doğru Kenan geldi. [[otobus|Gece geç saatte şehirden dönen son otobüsle gelmişti]], gözlerinin altı mordu. Babasına sarılmadı, vitrine baktı. "Polise haber verelim," dedi. Usta başını kaldırmadı. Kenan bana döndü: [[hapsetti|"Babam bu dükkânda zamanı hapsetti, Umut. Dokuzu yirmi geçe. Annemin öldüğü saat."]]
7. Karşıdaki fırının sahibi Selma Abla akşamüstü çay getirdi. Kulağıma eğildi: [[dogumgunu|"Cuma Nevzat'ın doğum günü, yetmiş olacak. Mürüvvet her yıl o saati kurup ona hediye ederdi. Şaka gibi, her yıl aynı hediye."]] Sonra güldü ama gözleri dolmuştu.
8. Akşam dükkânı kapatırken Kenan'ın askıda unuttuğu montunu gördüm. Cebinden bir kâğıt sarkıyordu. Almadım, okumadım da. Ama [[fis|ucunda "Onarım fişi" yazdığını]] seçtim. Ellerime baktım; [[eller|parmaklarım her zamanki gibi saat yağından kapkaraydı]]. Beni ilk suçlayacakları bu ellerdi, biliyordum.
9. Eve yürürken saatime baktım. [[umutsaat|Benimki de dokuzu yirmi geçeyi gösteriyordu.]] Ne zaman durduğunu hatırlamıyordum.

### 4.3 İpuçları (18 adet)

Tür anahtarları: `leitmotif` (Leitmotif / İmge), `metafor`, `mekan`, `diyalog`, `zaman`, `kanit`.

| id | Etiket | Tür | Kaynak |
|---|---|---|---|
| saatler | Bütün saatler 9.20'yi gösteriyor | leitmotif | metin |
| marti | Martılar, balıkçı kasaları | mekan | metin |
| koku | Tuz ve mazot kokusu | mekan | metin |
| tekne | Kışa kıyıya çekilmiş tekneler | mekan | metin |
| yastik | Vitrinde boş kalan kadife yastık | metafor | metin |
| kart | "Bu saat çalışmaz" kartı | metafor | metin |
| anahtar | Anahtar yalnızca Usta'da ve Kenan'da | kanit | metin |
| durdum | Usta: "O saat durdu, ben de durdum." | diyalog | metin |
| otobus | Kenan gece son otobüsle şehirden döndü | zaman | metin |
| hapsetti | Kenan: "Babam zamanı hapsetti." | diyalog | metin |
| dogumgunu | Cuma: Usta'nın 70. doğum günü, Mürüvvet'in her yılki hediyesi | zaman | metin |
| fis | Kenan'ın montunda "Onarım fişi" | kanit | metin |
| eller | Umut'un saat yağıyla kararmış elleri (**yanıltıcı ipucu**) | kanit | metin |
| umutsaat | Umut'un saati de 9.20'de durmuş | leitmotif | metin |
| kurmadi | Usta saati onarabilirdi ama onarmadı | diyalog | sorgu |
| surcme | Kenan: "Bir saatçiye... yani bir tanıdığa uğradım." | diyalog | sorgu |
| kutu | Kenan sabah otobüse mendile sarılı bir kutuyla bindi | kanit | sorgu |
| anlatici | Anlatıcı fişi gördü ama okumadı | diyalog | sorgu |

### 4.4 Karakterler ve sorgu

Her karakterin 3 sorusu var. ★ işaretli cevap deftere delil ekler.

**Nevzat Usta** — saatçi, saatin sahibi
- Saat en son ne zaman yerindeydi? → "Dün akşam kepengi ben indirdim. Yerindeydi. Her akşam bakarım."
- ★ O saati kim onarabilirdi? → "Ben. Bu kasabada o mekanizmayı benden iyi bilen yok. Ama onarmadım. Onu Mürüvvet kurardı, ben değil." → `kurmadi`
- Neden dükkândaki bütün saatler 9.20'de? → "(Uzun bir sessizlik. Lupu gözünden çıkarmıyor.) Saati sormak için bir saatçiye mi geldin, evlat?"

**Kenan** — Usta'nın oğlu, İstanbul'dan geldi
- ★ Dün bütün gün neredeydin? → "Şehirdeydim. Bir iş görüşmem vardı. Sonra bir saatçiye... yani bir tanıdığa uğradım. Son otobüsle döndüm." → `surcme`
- Babanla aranız nasıl? → "Annem öldüğünden beri o dükkânda konuşulan tek dil tik-tak. O da durmuş bir tik-tak."
- Anahtarın şu an nerede? → "Cebimde. (Ceplerini yokluyor, montunu dükkânda unuttuğunu hatırlıyor.) Yani... montumda."

**Selma Abla** — karşıdaki fırının sahibi
- Dün gece dükkânda bir hareket gördün mü? → "Hamuru gece üçte yoğururum, camım tam karşıya bakar. Işık yanmadı, kapı açılmadı. Buna yemin ederim."
- ★ Kenan'ı dün gördün mü? → "Sabah ilk otobüse binerken gördüm. Kucağında küçük bir kutu vardı, mendile sarılıydı. Bebek taşır gibi taşıyordu." → `kutu`
- Mürüvvet Hanım nasıl biriydi? → "Bu yokuşta saatleri o kurar derdik. Nevzat tamir eder, Mürüvvet kurar. Biri gidince öbürü de durdu."

**Umut** — çırak ve **anlatıcı** (anlatıcının da sorgulanabilmesi, anlatıcı tiplerini öğretir)
- Dün akşam dükkândan ne zaman çıktın? → "Altıda. Usta kepengi indirirken yanındaydım. Anahtarım yok, biliyorsunuz."
- ★ Montun cebindeki fişi neden okumadın? → "Okusaydım bir şeyi bozacakmışım gibi geldi. Bazı şeyleri bilmemek, onları korumanın bir yolu." → `anlatici`
- Senin saatin neden durmuş? → "Fark etmemişim. Belki o dükkânda çalışan herkesin saati bir gün durur."

### 4.5 Konum tespiti

- Açılma şartı: `marti`, `koku`, `tekne` ipuçlarından en az 2'si bulunmuş olmalı.
- Soru: Öyküde "deniz" kelimesi hiç geçmiyor. Olay nerede geçiyor?
- Seçenekler: dağ köyü / büyük şehir / **kıyı kasabası (doğru)** / ova kasabası.
- Doğru deliller: `marti`, `koku`, `tekne`.
- Ders: Yazar mekânı adıyla değil ayrıntıyla kurar. Deniz kenarında yaşayan biri denizi her gün görmez; kokusu, martıları, kışa çekilmiş tekneleri ona orada olduğunu hatırlatır. (Rapordaki "deniz kenarı" örneğinin oyunlaştırılması.)

### 4.6 Pano bağlantıları

Kural:
- Tanımlı çift + doğru tür → tanımlı derece.
- Tanımlı çift + yanlış tür → bir derece düşer (ustaca→güçlü, güçlü→zayıf) ve doğru tür gösterilir.
- Tanımsız çift → "kanıt yetersiz" (gri kesik ip; panoda kalabilir, oyuncu raporunda savunabilir).
- `eller` içeren tanımsız çift → zayıf + yanıltıcı ipucu açıklaması: "Yağlı eller bir çırağın her günüdür; suçluyu değil, anlatıcının suçlanma korkusunu gösterir. Düz okur bu ayrıntıya takılır."
- **Merkez kartına bağlama:** `saatler, kart, durdum, hapsetti, umutsaat, kurmadi, dogumgunu, yastik, tekne` → güçlü ("merkeze akıyor"). Diğerleri → zayıf ("Bu delil olayı çözer ama gizli merkezi taşımaz. Delil ile anlamı ayır.").

| A | B | Uygun türler | Derece | Kısa açıklama |
|---|---|---|---|---|
| saatler | umutsaat | leitmotif | ustaca | Durmuş zaman anlatıcının bileğine kadar yayılmış |
| saatler | hapsetti | leitmotif, diyalog, zaman | güçlü | 9.20 = annenin öldüğü saat |
| saatler | durdum | leitmotif, diyalog, metafor | güçlü | Usta saatleri durdurarak kendini durdurmuş |
| saatler | kart | metafor, leitmotif | güçlü | Tek gerçekten durmuş saat Mürüvvet'inki |
| saatler | tekne | metafor, mekan | ustaca | Kışa çekilmiş tekneler de bekliyor; mevsim içerideki beklemeyi tekrarlıyor |
| tekne | durdum | metafor, mekan | ustaca | Tekneler Usta'nın beklemesinin dıştaki yansıması |
| kart | durdum | metafor, diyalog | ustaca | "Bu saat çalışmaz" Usta'nın kendini anlatışı |
| yastik | durdum | metafor, diyalog | güçlü | Boş yastık: kaybı ikinci kez yaşamak |
| yastik | kart | metafor | güçlü | Ölüye ayrılmış bir vitrin, küçük bir anıt |
| anahtar | otobus | kanit, zaman | güçlü | Anahtarı olanlardan biri gece dönmüş |
| otobus | kutu | kanit, zaman | güçlü | Sabah kutuyla gitmiş, gece dönmüş |
| kutu | fis | kanit | ustaca | Saat çalınmadı, onarıma gitti |
| fis | surcme | kanit, diyalog | güçlü | Dil sürçmesi fişi doğruluyor |
| fis | dogumgunu | zaman, kanit | ustaca | Annenin her yılki hediyesi yeniden veriliyor |
| anahtar | fis | kanit | güçlü | Anahtar sahibi ve fiş aynı kişide |
| dogumgunu | kart | zaman, metafor | güçlü | Onu kuracak kimse kalmadığı için "çalışmaz" |
| kurmadi | dogumgunu | zaman, diyalog | ustaca | Kenan annesinin boş bıraktığı yeri dolduruyor |
| kurmadi | durdum | diyalog, metafor | güçlü | Usta durmayı kendisi seçmiş |
| kurmadi | kart | metafor, diyalog | güçlü | "Çalışmaz" bir gerçek değil, bir karar |
| hapsetti | dogumgunu | zaman, diyalog | güçlü | Zamanı serbest bırakmak için bir gün seçilmiş |
| hapsetti | durdum | diyalog | güçlü | Baba "durdum", oğul "hapsetti" diyor |
| marti | koku | mekan | güçlü | Deniz anılmadan mekân kuruluyor |
| marti | tekne | mekan | güçlü | 〃 |
| koku | tekne | mekan | güçlü | 〃 |
| eller | anlatici | diyalog, kanit | güçlü | Umut suçlanmaktan korkuyor ama kendini savunmuyor |
| anlatici | fis | kanit, diyalog | ustaca | Güvenilir ama seçici anlatıcı: bozmak istemediği bir şey var |
| anlatici | umutsaat | leitmotif | güçlü | Anlatıcı olayı içeriden anlatıyor |

> Tam açıklama metinleri `prototip-v1.html` içindeki `CASE.links` dizisinde. v2'de ekranda yalnızca tek satırlık kısa hâli gösterilir; uzun hâli dokununca açılır.

### 4.7 Suçlama ve çözüm

- **Kim?** Umut / Selma / **Kenan (doğru)** / Nevzat Usta / Kimse
- **Destekleyen deliller** (en fazla 4 seçilir): doğru olanlar `anahtar, otobus, kutu, fis, surcme, dogumgunu`
- **Neden?** para / babasını cezalandırmak / **saati onartıp doğum gününde babasına vermek, durmuş zamanı yeniden işletmek (doğru)** / dükkânı kapattırmak
- **Gizli merkez:**
  - Bir hırsızlık ve çözülüşü → *düz okuma* ("Bu olay örgüsü. Düz okur burada durur.")
  - **Yasın zamanı durdurması ve sevginin onu yeniden işletmesi → ustaca**
  - Baba ile oğul arasında söylenemeyen sevgi → güçlü (geçerli okuma)
  - Saatçilik mesleğinin yok oluşu → zayıf
- **Dedektif raporu:** 2-4 cümle, serbest metin (öğretmen okur).

### 4.8 Epilog (Cuma)

Cuma sabahı dükkânı yine ben açtım. Kenan erkenden gelmişti; elinde mendile sarılı küçük bir kutu vardı. Usta gelince kutuyu tezgâha bıraktı, bir şey söylemedi.
Usta mendili açtı. Gümüş saat avucunda tıkırdıyordu.
"Annem her yıl kurardı," dedi Kenan. "Bu yıl ben kurdum."
Usta lupunu çıkardı. Uzun süre saate değil, oğluna baktı. Sonra kalktı, vitrindeki duvar saatinin camını açtı ve akrebi parmağıyla ileri itti.
Öğleden sonra dükkândaki bütün saatler doğruyu gösteriyordu. Eve yürürken ben de kendiminkini ayarladım.

### 4.9 Puanlama ve unvan

| Kalem | Puan |
|---|---|
| Her bulunan ipucu | 1 (en çok 18) |
| Bağlantı: ustaca / güçlü / zayıf / yetersiz | 3 / 2 / 0 / 0 (bağlantı toplamı en çok 24) |
| Konum doğru | 2 |
| Konum için her doğru delil | 1 (en çok 3) |
| Suçlu doğru | 3 |
| Her isabetli destek delili | 1 (en çok 4) |
| Neden doğru | 3 |
| Gizli merkez: ustaca / güçlü / zayıf / düz | 4 / 3 / 1 / 0 |
| Rapor ≥ 60 karakter | 2 |

Unvan (oran = puan / en çok puan):
- ≥ 0,75 → **Düşünceli Okur** (Orhan Pamuk'un "saf ve düşünceli okur" ayrımına gönderme)
- ≥ 0,50 → **Dikkatli Okur**
- < 0,50 → **Düz Okur**

**Öğretmen özeti** (kopyalanabilir metin): unvan, puan, süre, büyüteç kullanımı, delil sayısı, bağlantı sayısı (ustaca/güçlü), konum sonucu, suçlu, neden, gizli merkez, rapor, bütün bağlantı listesi. Raporun niteliksel A/B karşılaştırmasını ölçülebilir veriyle desteklemek için.

---

## 5. Görsel tasarım planı (v2)

### 5.1 İlke
Öykü metni ve kurgu aynen kalır, ama ekranda düz metin olarak değil **resimli sahnelerin içine dağıtılmış küçük parçalar** halinde görünür. Arayüz açıklamalarının yerini çizim, ikon ve animasyon alır.

### 5.2 Görsel kimlik
- **Stil:** Düz renkli, silüet ağırlıklı illüstrasyon. Gölgeler tek ton, çizgi az.
- **Atmosfer:** Gece bürosu. Koyu masa, sarı lamba ışığı, dosya kâğıdı, mantar pano, kırmızı ip.
- **Palet (v1'den):**

| Token | Renk | Kullanım |
|---|---|---|
| --desk | #141922 | arka plan, gece mavisi |
| --desk-2 | #1b222e | paneller |
| --line | #2d3646 | çizgiler |
| --fg | #ddd7c9 | ana yazı |
| --muted | #939aa7 | ikincil yazı |
| --paper | #ece6d7 | kâğıt, kartlar |
| --paper-2 | #ddd4bf | ikinci kâğıt |
| --ink | #221f1a | kâğıt üstü yazı |
| --brass | #c9a45c | vurgu, pirinç, "ustaca" |
| --string | #c63b2f | kırmızı ip, "güçlü" |
| --cork | #2c2620 / #3a3129 | pano |
| --ok | #8ab583 | doğru |

- **Yazı tipleri (Google Fonts, çevrimdışı için yedekli):**
  - Başlık ve etiket: Special Elite (daktilo) → yedek "Courier New"
  - Öykü cümleleri: Spectral → yedek Georgia
  - Arayüz: IBM Plex Sans Condensed → yedek "Arial Narrow", system-ui
  - Not: Tam çevrimdışı kullanım için yazı tiplerini `assets/fonts/` altına indirip `@font-face` ile bağla.
- Tek (koyu) tema bilinçli bir tercih.
- Mobil uyum: 400 px genişlikte çalışmalı, yatay kaydırma olmamalı. Dokunmatik sürükleme `pointer` olaylarıyla.
- `prefers-reduced-motion` desteklenmeli (animasyonlar kapanır, durum anında geçer).

### 5.3 Ekran ekran

**1. Dosya (giriş)**
- Masada kapalı bir dosya. Tıklanınca "GİZLİ" damgasıyla açılır, iki cümlelik görev çıkar.
- Düz okur, konuşma balonu olan bir figür: "Çırak çalmıştır. Öykü bitti."
- Tek düğme: soruşturmaya başla.

**2. Olay yeri — 3 resimli sahne** (oklarla geçiş, üstte sahne noktaları)

| Sahne | Işık | Nesneler (dokunma noktaları) |
|---|---|---|
| Sabah · Dükkân içi | gün ışığı | 9.20'de donmuş saatler (`saatler`), boş kadife yastık (`yastik`), "çalışmaz" kartı (`kart`), kapı ve sağlam kilit (`anahtar`), Usta'nın lupu ve tezgâh (`durdum`) |
| Yokuş · Dışarısı | soğuk kış sabahı | uçuşan martılar ve kasalar (`marti`), havada dalgalı koku çizgileri (`koku`), brandalı tekneler (`tekne`), otobüs durağı (`otobus`) |
| Akşam · Dükkân, loş | lamba ışığı | Kenan figürü ve vitrine bakışı (`hapsetti`), Selma'nın çay tepsisi (`dogumgunu`), askıdaki mont ve cepten sarkan fiş (`fis`), Umut'un kararmış elleri (`eller`), bilekteki 9.20 saati (`umutsaat`) |

- Dokunma noktaları görünmez; üzerine gelince hafif parlama, mobilde dokununca.
- Nesneye dokununca: öyküdeki ilgili cümle Umut'un altyazısı olarak 1-2 satır çıkar; nesnenin küçük çizimi alttaki **delil tepsisine** uçar.
- **Büyüteç** düğmesi bulunmamış bir nesneyi kısa süre parlatır; kullanım sayılır.
- **"Umut'un anlatısı"** düğmesi: tam öykü metni, kitap sayfası görünümünde. Bulunan ipuçları metinde altı çizili görünür. Metinden de ipucu toplanabilir (v1 davranışı).

**3. Sorgu**
- Dört karakter portresi (silüet ağırlıklı, her birinin ayırt edici nesnesi: Usta'nın lupu, Kenan'ın montu, Selma'nın fırın önlüğü, Umut'un kararmış elleri).
- Sorular ikonlu kartlar (saat, anahtar, otobüs, kalp, soru işareti…), altlarında en fazla 5 kelime.
- Cevaplar çizgi roman paneli gibi konuşma balonunda.
- Delil veren cevapta balondan bir ikon kopup tepsiye düşer.
- Umut seçildiğinde küçük bir etiket: "Anlatıcıyı sorguluyorsun."

**4. Konum**
- Dört küçük manzara yan yana: dağ, şehir, kıyı, ova (denizsiz çizilir).
- Oyuncu delil ikonlarını (martı, koku, tekne) manzaraların üstüne sürükler.
- Doğru eşleşmede kıyı manzarasında deniz belirir (dalga animasyonu); tek satırlık ders gösterilir.

**5. Pano**
- Mantar pano, ortada pirinç çerçeveli **GİZLİ MERKEZ ?** kartı.
- Delil kartları polaroid gibi: üstte nesnenin çizimi, altta en fazla 2-3 kelime, tepede kırmızı raptiye.
- Kart → kart dokunuşuyla ip gerilir; tür seçici 6 ikonlu düğme:

| Tür | İkon | İp rengi |
|---|---|---|
| Leitmotif / İmge | tekrar eden halka / sarmal | pirinç |
| Metafor | maske | kırmızı |
| Mekân | harita iğnesi | yeşilimsi |
| Diyalog | konuşma balonu | açık kâğıt |
| Zaman | kum saati | turuncu |
| Kanıt | büyüteç | gri-mavi |

- İp kalınlığı/çizgisi dereceyi gösterir: ustaca kalın pirinç parlama, güçlü düz kırmızı, zayıf kesik, yetersiz ince gri noktalı.
- Geri bildirim: derece rozeti + tek satır. Uzun açıklama rozete dokununca açılır.
- Kurulan bağlar listesi küçük ikonlu satırlar; silme düğmesi.

**6. Suçlama**
- Suçlu, portresine dokunularak seçilir (5. seçenek "Kimse": boş çerçeve).
- Deliller tepsiden **dosya klasörüne** sürüklenir (en fazla 4).
- Neden: 4 resimli kart (para kesesi, kırık kalp/yumruk, saat + hediye kurdelesi, inik kepenk).
- Gizli merkez: 4 resimli kart
  - maske → hırsızlık (düz okuma)
  - yeniden işleyen saat → yas ve zaman (ustaca)
  - birbirine uzanan iki el → baba-oğul (güçlü)
  - inik kepenk → meslek (zayıf)
- Rapor kutusu: kısa, isteğe bağlı ama puanlı.

**7. Final**
- Animasyon: mendil açılır, gümüş saat tıkırdamaya başlar; vitrindeki bütün akrepler 9.20'den **gerçek saate** döner; en son Umut'un bilek saati döner.
- Ekranda epilogdan yalnızca 3 satır (kısa hâl); tamamı "Epilogu oku" ile açılır.
- Sonuç: unvan rozeti, puan çubuğu, delil/bağ/süre göstergeleri (metin yerine çubuk ve rozet).
- Düz okur balonu ile oyuncunun raporu yan yana.
- Öğretmen özeti (kopyala düğmesi).

---

## 6. Teknik mimari

### 6.1 Dosya yapısı (geliştirme)

```
kurmaca-burosu/
├── CLAUDE.md               ← bu dosya
├── prototip-v1.html        ← referans, dokunma
├── index.html
├── css/
│   └── style.css           ← tokenlar en üstte (:root)
├── js/
│   ├── main.js             ← durum, yönlendirme, ekranların çizimi
│   ├── clock.js            ← tekrar kullanılabilir SVG saat bileşeni
│   ├── scenes.js           ← sahne SVG'leri ve dokunma noktaları
│   ├── board.js            ← pano, sürükleme, ipler, değerlendirme
│   ├── score.js            ← puanlama, unvan, öğretmen özeti
│   ├── audio.js            ← isteğe bağlı tik-tak / martı (Web Audio ile sentez, dosyasız)
│   └── icons.js            ← ÜRETİLMİŞ: node build.js icons (assets/icons.svg'den; file:// için gömülü sprite)
├── build.js                ← icons (sprite gömme) ve dist (tek dosya paket) görevleri
├── test/                   ← doğrulama: verify-data.js, equiv-v1.js, mobile-flow.html, icons.html
├── data/
│   └── case-01.js          ← window.CASES.push({...}) — JSON değil, file:// uyumu için
└── assets/
    ├── icons.svg           ← <symbol> sprite: tür ikonları, soru ikonları, delil çizimleri
    └── fonts/              ← çevrimdışı yazı tipleri
```

- İstenirse sonunda tek dosyalık (`dist/kurmaca-burosu.html`) bir paket üretilir: CSS/JS/SVG satır içine alınır. Basit bir Node betiği yeter (`build.js`).
- Çerçeve (framework) yok; düz HTML/CSS/JS.

### 6.2 Vaka veri şeması

v1'deki `CASE` nesnesi korunur, v2 için alanlar eklenir:

```js
window.CASES = window.CASES || [];
window.CASES.push({
  id: "vaka-01",
  title: "Dokuzu Yirmi Geçe",
  brief: ["...", "..."],           // en fazla 2 kısa cümle (v2)
  flatReader: "...",
  story: ["... [[saatler|...]] ...", ...],   // tam metin, değişmez
  scenes: [                        // YENİ
    { id: "sabah", title: "Sabah · Dükkân", light: "day",
      hotspots: [ { clue: "saatler", x: 22, y: 30, w: 30, h: 22, art: "vitrin-saatler" }, ... ] },
    { id: "yokus", ... }, { id: "aksam", ... }
  ],
  clues: {
    saatler: { label: "Bütün saatler 9.20'yi gösteriyor",
               short: "9.20'de saatler",     // YENİ: pano kartı için 2-3 kelime
               tag: "leitmotif",
               art: "saatler",               // YENİ: ikon/çizim kimliği (icons.svg)
               caption: "hepsi dokuzu yirmi geçeyi gösterirdi" // YENİ: sahne altyazısı (öyküden aynen)
             },
    ...
  },
  suspects: [ { id, name, role, portrait: "usta", qs: [ { q, icon: "saat", a, clue? } ] } ],
  location: { need, q, options: [{ id, t, art }], answer, evidence, lesson },
  centerFlow: [...],
  redHerring: "...",
  links: [ { a, b, types, grade, short, text } ],   // short YENİ: tek satır
  final: { who, evidence, why, center },            // seçeneklere art eklenir
  epilog: [...], epilogShort: [...],                // YENİ: finalde 3 satır
  narratorName: "Umut", bookLabel: "Umut'un anlatısı",   // sahne altyazısı etiketi, tam metin düğmesi
  epilogTitle: "Epilog · Cuma",                          // sonuç ekranında epilog kartı başlığı
  redHerringId: "eller",                                  // yanıltıcı ipucu (tanımsız çiftte zayıf + açıklama)
  finale: { type: "saatler" | "ikon", art, watchLabel, wristLabel }, // final sahnesi: saat animasyonu ya da mendilden çıkan ikon
  draft: true                                              // rafta "Taslak" etiketi
});
```

**Kural:** Sahne altyazıları (`caption`) öyküden **birebir** alınır; yeni metin yazılmaz.

### 6.3 Durum ve kayıt
- Tek durum nesnesi `S`: `view, scene, found{}, asked{}, conns[], pos{}, sel, pending, loc{}, fin{}, solved, hints, start, solvedAt`.
- `localStorage` anahtarı: `kurmaca-burosu-v2-<vakaId>`. Her okuma/yazma `try/catch` içinde; depolama yoksa oyun yine çalışır.
- Sıfırlama sayfa içi onayla (tarayıcı `confirm()` kullanma).

### 6.4 Saat bileşeni (`clock.js`)
- `createClock({ size, hour, minute, ticking, style })` → SVG elemanı.
- Stiller: `duvar`, `masa`, `cep` (gümüş), `kol`.
- `setTime(h, m, { animate: true, duration })` ile akrep/yelkovan dönüşü (final animasyonu).
- `ticking: true` iken saniye ibresi ilerler.

### 6.5 Pano (`board.js`)
- Kart konumları pano boyutuna göre yüzde (`x`, `y`); yeniden boyutlanmada ipler yeniden çizilir.
- İpler tek SVG katmanında, hafif sarkık eğri: `M x1 y1 Q mx my+sag x2 y2`, `sag = min(60, mesafe * 0.12)`.
- Pointer olayları: 6 px'den az hareket = dokunma (seçim), fazlası = sürükleme.
- Klavye: kartlar `tabindex="0"`, Enter/Space ile seçilir.

### 6.6 Erişilebilirlik
- Dokunma noktaları `<button>` ya da `role="button"` + `aria-label` (ör. "Vitrindeki saatler").
- Görsel ağırlık metni azaltır ama ekran okuyucu etiketleri eksiksiz olur.
- Renk tek başına anlam taşımaz: derece rozetinde yazı da var.

---

## 7. Yol haritası (Claude Code görevleri)

1. **İskelet:** Bölüm 6.1 dosya yapısını kur; `prototip-v1.html` içindeki `CASE` verisini `data/case-01.js`'e taşı ve yeni alanları (`short`, `art`, `caption`, `scenes`, `links[].short`, `epilogShort`) doldur.
2. **Mantığı taşı:** v1'deki durum, ipucu ekleme, sorgu, konum, bağlantı değerlendirme, puanlama ve özet kodunu modüllere ayır. Davranış birebir aynı kalmalı (v1 ile aynı girdiler → aynı puan).
3. **Saat bileşeni** (`clock.js`) ve **ikon sprite'ı** (`icons.svg`): 6 tür ikonu, 18 delil çizimi, soru ikonları, 4 portre.
4. **Olay yeri sahneleri:** 3 SVG sahne + dokunma noktaları + altyazı + delil tepsisi + büyüteç + "Umut'un anlatısı".
5. **Sorgu ekranı:** portreler, ikonlu soru kartları, çizgi roman balonları.
6. **Konum ekranı:** 4 manzara, sürükle-bırak, deniz belirme animasyonu.
7. **Pano v2:** polaroid kartlar, ikonlu tür seçici, renkli ipler, kısa geri bildirim.
8. **Suçlama v2:** portre seçimi, dosyaya sürükleme, resimli kartlar.
9. **Final animasyonu** ve sonuç ekranı.
10. **İsteğe bağlı ses** (Web Audio ile tik-tak ve martı; varsayılan kapalı, düğmeyle açılır).
11. **Kontrol:** 400 px mobil, dokunmatik sürükleme, klavye, `prefers-reduced-motion`, çevrimdışı (file:// ile açma), Türkçe karakterler.
12. **Paketleme:** `build.js` ile tek dosya `dist/` çıktısı.

Her adımdan sonra tarayıcıda dene; puanlama v1 ile karşılaştırılarak doğrulansın.

---

## 8. Kabul ölçütleri

- [x] Öykünün 9 paragrafı eksiksiz ve değişmeden "Umut'un anlatısı"nda var. (`test/verify-data.js`)
- [x] 18 ipucunun hepsi bulunabiliyor (14'ü sahnelerden/metinden, 4'ü sorgudan). (`test/mobile-flow.html`: found=18)
- [x] Hiçbir ekranda 40 kelimeden fazla arayüz yazısı yok (öykü altyazıları ve tam metin hariç). (en yüklü ekran pano ≈ 20 kelime)
- [x] Pano bağlantı değerlendirmesi Bölüm 4.6 tablosuyla birebir. (`test/equiv-v1.js`, 2052 çift×tür)
- [x] Puan ve unvan Bölüm 4.9 ile birebir. (`test/equiv-v1.js`, 3000 senaryo)
- [x] İnternet kapalıyken `index.html` çift tıklanınca açılıyor ve oynanıyor. (headless Chrome, file://; `dist/kurmaca-burosu.html` de aynı)
- [x] 400 px genişlikte yatay kaydırma yok; parmakla sürükleme çalışıyor. (iframe ölçümü; pointer olayları — gerçek telefonda bir kez elle denenmeli)
- [x] Öğretmen özeti kopyalanabiliyor. (Clipboard API, yoksa metin seçimi)

---

## 9. TÜBİTAK / ölçme notu

Raporun zayıf noktası, A/B karşılaştırmasının yalnızca niteliksel olması. Oyun her oturumda şu verileri üretir: süre, büyüteç kullanımı, bulunan delil sayısı, kurulan bağ sayısı ve dereceleri, konum sonucu, suçlama ve gizli merkez seçimi, serbest rapor.
Öneri: Deney grubu (kurmaca ağını öğrenmiş) ve kontrol grubu aynı vakayı oynar; öğretmen özetleri bir tabloda toplanır. İleride özetin CSV olarak dışa aktarılması eklenebilir.

---

## 10. Sonraki vakalar (fikir)

| Vaka | Eser | Odak birim | Telif durumu |
|---|---|---|---|
| 02 | Gogol, *Palto* | metafor (palto), bürokrasi | telifsiz (eser 1842; çeviriler telifli olabilir → kendi çevirini/özetini kullan) |
| 03 | Melville, *Kâtip Bartleby* | paravan metaforu, anlatıcı | telifsiz (eser 1853; çeviri için aynı not) |
| 04 | Sait Faik, *İpekli Mendil* | imge, ölümün biçimi | yazar 1954'te öldü; Türkiye'de 70 yıl kuralına göre 2025 itibarıyla serbest olması muhtemel — yine de baskı/yayınevi metnini doğrudan kopyalamadan önce kontrol et |
| 05 | Ziya Osman Saba, *Mesut İnsanlar Fotoğrafhanesi* | anlatıcı / serbest dolaylı anlatım | henüz telifli (yazar 1957'de öldü) → kısa alıntı + özet |
| — | Yusuf Atılgan, *Anayurt Oteli* | bilinç akışı | telifli → kısa alıntı + özet |

Telifli eserlerde: metnin tamamını oyuna koyma; kısa alıntı (birkaç cümle) ve kendi özetinle çalış.

---

## 11. Claude Code için çalışma notları

- Kod yorumları ve arayüz Türkçe; değişken adları İngilizce/ASCII olabilir.
- Öykü, ipucu etiketleri ve diyaloglar `data/case-01.js` dışında hiçbir yere elle kopyalanmaz.
- Yeni metin üretme: arayüze kısa etiket gerekirse en fazla birkaç kelime; öykü cümlelerine dokunma.
- Dış kütüphane eklemeden önce sor. Varsayılan: kütüphanesiz.
- Görsel değişikliklerde Bölüm 5.2'deki tokenları kullan; doğrudan renk kodu yazma.
- Büyük bir kararı değiştirirsen bu dosyayı güncelle.
