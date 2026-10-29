/* Vaka 01 — "Dokuzu Yirmi Geçe"
   Tek veri kaynağı. Öykü, ipucu etiketleri ve diyaloglar başka hiçbir yere elle kopyalanmaz.
   JSON değil, script: file:// altında fetch çalışmadığı için window.CASES dizisine itilir.
   caption alanları öyküden (sorgu ipuçlarında sorgu cevabından) birebir alınmıştır. */
window.CASES = window.CASES || [];
window.CASES.push({
  id: "vaka-01",
  title: "Dokuzu Yirmi Geçe",

  /* Dosya ekranı: en fazla 2 kısa cümle */
  brief: [
    "Sahil yokuşundaki saatçi dükkânından bir gümüş cep saati kayboldu. Kapı zorlanmamış, kilit sağlam.",
    "Ayrıntıları topla, tanıkları sorgula, ipuçlarını bağla."
  ],
  /* v1'deki uzun görev emri (istenirse "Umut'un anlatısı" kapağında kullanılır) */
  briefLong: [
    "Sahil yokuşundaki saatçi dükkânından bir gümüş cep saati kayboldu. Kapı zorlanmamış, kilit sağlam.",
    "Olayı anlatan, dükkânın çırağı Umut. Onun anlattıklarını oku, ayrıntıları topla, tanıkları sorgula ve ipuçlarını panoda birbirine bağla.",
    "Bu bürodaki her dava iki soru taşır: <b>Ne oldu?</b> ve <b>Bu öykü aslında ne anlatıyor?</b> Birincisini çözen iyi bir polistir. İkincisini çözen, iyi bir okurdur."
  ],
  flatReader: "“Bir saatçinin değerli saati çalınmış. Elleri hep kirli olan çırak almıştır, zaten anahtarını da kaybetmişti. Öykü bitti.”",

  /* Öykü metni — değişmez. [[id|metin]] işaretli yerler ipucudur. */
  narrator: "Umut, çırak · Birinci tekil kişi",
  narratorName: "Umut",                 /* sahne altyazısındaki konuşan etiketi */
  bookLabel: "Umut'un anlatısı",        /* tam metin düğmesi */
  finale: { type: "saatler", watchLabel: "Mürüvvet Hanım'ın gümüş saati", wristLabel: "Umut'un saati" }, /* final animasyonu: mendil → cep saati → duvar saatleri → kol saati */
  story: [
    "Nevzat Usta'nın dükkânında saatler hiç susmazdı ama hiçbiri doğruyu söylemezdi. Vitrindeki duvar saatleri, masa saatleri, camı çatlamış kol saatleri, [[saatler|hepsi dokuzu yirmi geçeyi gösterirdi]]. Usta onları her sabah kurar, sonra akrebi yine aynı yere çekerdi. Nedenini sormadım. Üç yıldır çırağıyım; bazı soruların cevabını sormadan öğrenirsin.",
    "Perşembe sabahı dükkânı ben açtım. Yokuşun başında [[marti|martılar balıkçı kasalarının üstünde kavga ediyordu]], havada her zamanki [[koku|tuz ve mazot kokusu]] vardı. Kış gelmişti; [[tekne|kıyıya çekilmiş teknelerin brandaları rüzgârda şişiyordu]]. Kepengi kaldırdım, ışığı yaktım ve [[yastik|vitrinin ortasındaki kadife yastığın boş olduğunu]] gördüm.",
    "O yastıkta Usta'nın rahmetli karısı Mürüvvet Hanım'ın gümüş cep saati dururdu. Satılık değildi. Fiyat etiketinin yerinde [[kart|Usta'nın el yazısıyla “Bu saat çalışmaz” yazan küçük bir kart]] vardı. Dükkândaki tek gerçekten durmuş saat oydu. Öbürlerini Usta durduruyordu; onu ise kimse çalıştıramamıştı.",
    "Kapıda zorlama yoktu, kilit sağlamdı. [[anahtar|Dükkânın anahtarı yalnızca iki kişide vardı: Usta'da ve bir hafta önce İstanbul'dan gelen oğlu Kenan'da.]] Benim anahtarım geçen ay kaybolmuştu, Usta yenisini yaptırmamıştı. Sabahları onun evine uğrayıp anahtarı oradan alırdım. O sabah da öyle yapmıştım.",
    "Usta geldiğinde boş yastığa uzun uzun baktı. Bağırmadı. [[durdum|“O saat durdu, ben de durdum,” dedi. “Kim aldıysa zamanımı almış olur.”]] Sonra tezgâhın arkasına geçti, lupunu taktı ve hiçbir şey olmamış gibi bir kol saatini sökmeye başladı.",
    "Öğleye doğru Kenan geldi. [[otobus|Gece geç saatte şehirden dönen son otobüsle gelmişti]], gözlerinin altı mordu. Babasına sarılmadı, vitrine baktı. “Polise haber verelim,” dedi. Usta başını kaldırmadı. Kenan bana döndü: [[hapsetti|“Babam bu dükkânda zamanı hapsetti, Umut. Dokuzu yirmi geçe. Annemin öldüğü saat.”]]",
    "Karşıdaki fırının sahibi Selma Abla akşamüstü çay getirdi. Kulağıma eğildi: [[dogumgunu|“Cuma Nevzat'ın doğum günü, yetmiş olacak. Mürüvvet her yıl o saati kurup ona hediye ederdi. Şaka gibi, her yıl aynı hediye.”]] Sonra güldü ama gözleri dolmuştu.",
    "Akşam dükkânı kapatırken Kenan'ın askıda unuttuğu montunu gördüm. Cebinden bir kâğıt sarkıyordu. Almadım, okumadım da. Ama [[fis|ucunda “Onarım fişi” yazdığını]] seçtim. Ellerime baktım; [[eller|parmaklarım her zamanki gibi saat yağından kapkaraydı]]. Beni ilk suçlayacakları bu ellerdi, biliyordum.",
    "Eve yürürken saatime baktım. [[umutsaat|Benimki de dokuzu yirmi geçeyi gösteriyordu.]] Ne zaman durduğunu hatırlamıyordum."
  ],

  /* Olay yeri: 3 resimli sahne. Dokunma noktaları yüzde cinsinden (x,y sol-üst köşe; w,h boyut). */
  scenes: [
    /* Koordinatlar js/scenes.js içindeki çizimlerle hizalıdır (viewBox 1000x600). */
    { id: "sabah", title: "Sabah · Dükkân", light: "day",
      hotspots: [
        { clue: "saatler", x: 4,  y: 10, w: 44, h: 36, art: "saatler" },
        { clue: "yastik",  x: 56, y: 60, w: 20, h: 12, art: "yastik" },
        { clue: "kart",    x: 59, y: 40, w: 10, h: 11, art: "kart" },
        { clue: "anahtar", x: 82, y: 12, w: 15, h: 60, art: "anahtar" },
        { clue: "durdum",  x: 3,  y: 56, w: 47, h: 42, art: "lup" }
      ] },
    { id: "yokus", title: "Yokuş · Dışarısı", light: "winter",
      hotspots: [
        { clue: "marti",  x: 4,  y: 6,  w: 30, h: 46, art: "marti" },
        { clue: "koku",   x: 44, y: 10, w: 14, h: 44, art: "koku" },
        { clue: "tekne",  x: 7,  y: 64, w: 50, h: 32, art: "tekne" },
        { clue: "otobus", x: 60, y: 40, w: 38, h: 46, art: "otobus" }
      ] },
    { id: "aksam", title: "Akşam · Dükkân, loş", light: "lamp",
      hotspots: [
        { clue: "hapsetti",  x: 8,  y: 18, w: 34, h: 56, art: "hapsetti" },
        { clue: "dogumgunu", x: 44, y: 60, w: 16, h: 14, art: "cay" },
        { clue: "fis",       x: 76, y: 12, w: 18, h: 56, art: "fis" },
        { clue: "eller",     x: 55, y: 74, w: 22, h: 25, art: "eller" },
        { clue: "umutsaat",  x: 77, y: 78, w: 12, h: 20, art: "kol-saati" }
      ] }
  ],

  /* 18 ipucu. short: pano kartı (2-3 kelime). art: icons.svg kimliği. caption: sahne altyazısı (birebir). */
  clues: {
    saatler:   { label: "Bütün saatler 9.20'yi gösteriyor",                 short: "9.20'de saatler",   tag: "leitmotif", art: "saatler",   caption: "hepsi dokuzu yirmi geçeyi gösterirdi" },
    marti:     { label: "Martılar, balıkçı kasaları",                        short: "Martılar",          tag: "mekan",     art: "marti",     caption: "martılar balıkçı kasalarının üstünde kavga ediyordu" },
    koku:      { label: "Tuz ve mazot kokusu",                               short: "Tuz, mazot kokusu", tag: "mekan",     art: "koku",      caption: "tuz ve mazot kokusu" },
    tekne:     { label: "Kışa kıyıya çekilmiş tekneler",                     short: "Kıyıdaki tekneler", tag: "mekan",     art: "tekne",     caption: "kıyıya çekilmiş teknelerin brandaları rüzgârda şişiyordu" },
    yastik:    { label: "Vitrinde boş kalan kadife yastık",                  short: "Boş yastık",        tag: "metafor",   art: "yastik",    caption: "vitrinin ortasındaki kadife yastığın boş olduğunu" },
    kart:      { label: "“Bu saat çalışmaz” kartı",                          short: "“Çalışmaz” kartı",  tag: "metafor",   art: "kart",      caption: "Usta'nın el yazısıyla “Bu saat çalışmaz” yazan küçük bir kart" },
    anahtar:   { label: "Anahtar yalnızca Usta'da ve Kenan'da",              short: "İki anahtar",       tag: "kanit",     art: "anahtar",   caption: "Dükkânın anahtarı yalnızca iki kişide vardı: Usta'da ve bir hafta önce İstanbul'dan gelen oğlu Kenan'da." },
    durdum:    { label: "Usta: “O saat durdu, ben de durdum.”",              short: "“Ben de durdum”",   tag: "diyalog",   art: "lup",       caption: "“O saat durdu, ben de durdum,” dedi. “Kim aldıysa zamanımı almış olur.”" },
    otobus:    { label: "Kenan gece son otobüsle şehirden döndü",            short: "Son otobüs",        tag: "zaman",     art: "otobus",    caption: "Gece geç saatte şehirden dönen son otobüsle gelmişti" },
    hapsetti:  { label: "Kenan: “Babam zamanı hapsetti.”",                   short: "“Zamanı hapsetti”", tag: "diyalog",   art: "hapsetti",  caption: "“Babam bu dükkânda zamanı hapsetti, Umut. Dokuzu yirmi geçe. Annemin öldüğü saat.”" },
    dogumgunu: { label: "Cuma: Usta'nın 70. doğum günü, Mürüvvet'in her yılki hediyesi", short: "Cuma, 70. yaş", tag: "zaman", art: "cay", caption: "“Cuma Nevzat'ın doğum günü, yetmiş olacak. Mürüvvet her yıl o saati kurup ona hediye ederdi. Şaka gibi, her yıl aynı hediye.”" },
    fis:       { label: "Kenan'ın montunda “Onarım fişi”",                   short: "Onarım fişi",       tag: "kanit",     art: "fis",       caption: "ucunda “Onarım fişi” yazdığını" },
    eller:     { label: "Umut'un saat yağıyla kararmış elleri",              short: "Yağlı eller",       tag: "kanit",     art: "eller",     caption: "parmaklarım her zamanki gibi saat yağından kapkaraydı" },
    umutsaat:  { label: "Umut'un saati de 9.20'de durmuş",                   short: "Umut'un saati",     tag: "leitmotif", art: "kol-saati", caption: "Benimki de dokuzu yirmi geçeyi gösteriyordu." },
    kurmadi:   { label: "Usta saati onarabilirdi ama onarmadı",              short: "Onarmadı",          tag: "diyalog",   art: "mekanizma", caption: "Ama onarmadım. Onu Mürüvvet kurardı, ben değil.", src: "sorgu" },
    surcme:    { label: "Kenan: “Bir saatçiye... yani bir tanıdığa uğradım.”", short: "Dil sürçmesi",    tag: "diyalog",   art: "surcme",    caption: "Sonra bir saatçiye... yani bir tanıdığa uğradım.", src: "sorgu" },
    kutu:      { label: "Kenan sabah otobüse mendile sarılı bir kutuyla bindi", short: "Mendilli kutu",  tag: "kanit",     art: "kutu",      caption: "Kucağında küçük bir kutu vardı, mendile sarılıydı.", src: "sorgu" },
    anlatici:  { label: "Anlatıcı fişi gördü ama okumadı",                   short: "Okumadı",           tag: "anlatici",  art: "anlatici",  caption: "Okusaydım bir şeyi bozacakmışım gibi geldi.", src: "sorgu" } /* v1'de "diyalog"; v2'de yedinci tür */
  },

  /* Sorgu. Her karakterin 3 sorusu; clue alanı olan cevap deftere delil ekler. icon: soru kartı ikonu. */
  suspects: [
    { id: "usta", name: "Nevzat Usta", role: "Saatçi, saatin sahibi", portrait: "usta", item: "lup", qs: [
      { icon: "saat",      q: "Saat en son ne zaman yerindeydi?",            a: "Dün akşam kepengi ben indirdim. Yerindeydi. Her akşam bakarım." },
      { icon: "mekanizma", q: "O saati kim onarabilirdi?",                   a: "Ben. Bu kasabada o mekanizmayı benden iyi bilen yok. Ama onarmadım. Onu Mürüvvet kurardı, ben değil.", clue: "kurmadi" },
      { icon: "soru",      q: "Neden dükkândaki bütün saatler 9.20'de?",     a: "(Uzun bir sessizlik. Lupu gözünden çıkarmıyor.) Saati sormak için bir saatçiye mi geldin, evlat?" }
    ] },
    { id: "kenan", name: "Kenan", role: "Usta'nın oğlu, İstanbul'dan geldi", portrait: "kenan", item: "mont", qs: [
      { icon: "otobus",  q: "Dün bütün gün neredeydin?",  a: "Şehirdeydim. Bir iş görüşmem vardı. Sonra bir saatçiye... yani bir tanıdığa uğradım. Son otobüsle döndüm.", clue: "surcme" },
      { icon: "kalp",    q: "Babanla aranız nasıl?",       a: "Annem öldüğünden beri o dükkânda konuşulan tek dil tik-tak. O da durmuş bir tik-tak." },
      { icon: "anahtar", q: "Anahtarın şu an nerede?",     a: "Cebimde. (Ceplerini yokluyor, montunu dükkânda unuttuğunu hatırlıyor.) Yani... montumda." }
    ] },
    { id: "selma", name: "Selma Abla", role: "Karşıdaki fırının sahibi", portrait: "selma", item: "onluk", qs: [
      { icon: "pencere", q: "Dün gece dükkânda bir hareket gördün mü?", a: "Hamuru gece üçte yoğururum, camım tam karşıya bakar. Işık yanmadı, kapı açılmadı. Buna yemin ederim." },
      { icon: "kutu",    q: "Kenan'ı dün gördün mü?",                   a: "Sabah ilk otobüse binerken gördüm. Kucağında küçük bir kutu vardı, mendile sarılıydı. Bebek taşır gibi taşıyordu.", clue: "kutu" },
      { icon: "kalp",    q: "Mürüvvet Hanım nasıl biriydi?",            a: "Bu yokuşta saatleri o kurar derdik. Nevzat tamir eder, Mürüvvet kurar. Biri gidince öbürü de durdu." }
    ] },
    { id: "umut", name: "Umut", role: "Çırak ve anlatıcı", portrait: "umut", item: "eller", narrator: true, qs: [
      { icon: "kepenk",    q: "Dün akşam dükkândan ne zaman çıktın?",      a: "Altıda. Usta kepengi indirirken yanındaydım. Anahtarım yok, biliyorsunuz." },
      { icon: "fis",       q: "Montun cebindeki fişi neden okumadın?",     a: "Okusaydım bir şeyi bozacakmışım gibi geldi. Bazı şeyleri bilmemek, onları korumanın bir yolu.", clue: "anlatici" },
      { icon: "kol-saati", q: "Senin saatin neden durmuş?",                a: "Fark etmemişim. Belki o dükkânda çalışan herkesin saati bir gün durur." }
    ] }
  ],

  /* Konum tespiti */
  location: {
    need: ["marti", "koku", "tekne"],
    q: "Öyküde “deniz” kelimesi bir kez bile geçmiyor. Olay nerede geçiyor?",
    options: [
      { id: "dag",   t: "Bir dağ köyünde",               art: "dag" },
      { id: "sehir", t: "Büyük bir şehrin merkezinde",   art: "sehir" },
      { id: "kiyi",  t: "Bir kıyı kasabasında",          art: "kiyi" },
      { id: "ova",   t: "Bir ova kasabasında",           art: "ova" }
    ],
    answer: "kiyi",
    evidence: ["marti", "koku", "tekne"],
    lessonShort: "Yazar mekânı adıyla değil, ayrıntıyla kurar.",
    lesson: "Yazar mekânı adıyla söylemedi, ayrıntılarla kurdu. Deniz kenarında yaşayan biri de denizi her gün görmez; kokusu, martıları, kışa çekilmiş tekneleri ona orada olduğunu hatırlatır. İyi okur, söylenmeyeni ayrıntıdan çıkarır."
  },

  /* Pano */
  centerFlow: ["saatler", "kart", "durdum", "hapsetti", "umutsaat", "kurmadi", "dogumgunu", "yastik", "tekne"],
  centerText: {
    guclu: { short: "Merkeze akıyor",     text: "Bu ayrıntı merkeze akıyor; olayı değil, anlamı taşıyor." },
    zayif: { short: "Delil, anlam değil", text: "Bu delil olayı çözer (kim, nasıl) ama gizli merkezi taşımaz. Delil ile anlamı ayır." }
  },
  redHerringId: "eller",
  redHerringShort: "Yanıltıcı ipucu",
  redHerring: "Zayıf bağ. Yağlı eller bir çırağın her günüdür; suçluyu değil, anlatıcının suçlanma korkusunu gösterir. Düz okur bu ayrıntıya takılır.",
  insufficientShort: "Köprü yok",
  insufficient: "Kanıt yetersiz. Metinde bu iki ayrıntıyı bağlayan bir köprü görünmüyor. İstersen panoda kalsın; raporunda savunabilirsin.",
  wrongTypeSuffix: " Bağ yerinde, ama tür olarak {types} daha uygun.",

  /* short: ekranda tek satır. text: dokununca açılan uzun açıklama (v1). */
  links: [
    { a: "saatler",   b: "umutsaat",  types: ["leitmotif"],                       grade: "ustaca", short: "Durmuş zaman anlatıcının bileğine kadar yayılmış",            text: "Durmuş zaman Usta'yla sınırlı kalmamış, anlatıcının bileğine kadar yayılmış. 9.20 bütün öyküyü saran bir leitmotif." },
    { a: "saatler",   b: "hapsetti",  types: ["leitmotif", "diyalog", "zaman"],   grade: "guclu",  short: "9.20 = annenin öldüğü saat",                                   text: "Kenan'ın cümlesi 9.20'nin sırrını açıyor: annenin öldüğü saat." },
    { a: "saatler",   b: "durdum",    types: ["leitmotif", "diyalog", "metafor"], grade: "guclu",  short: "Usta saatleri durdurarak kendini durdurmuş",                   text: "Usta saatleri durdurarak aslında kendini durdurmuş." },
    { a: "saatler",   b: "kart",      types: ["metafor", "leitmotif"],            grade: "guclu",  short: "Tek gerçekten durmuş saat Mürüvvet'inki",                      text: "Öbür saatleri Usta durduruyor; tek gerçekten durmuş saat Mürüvvet'inki." },
    { a: "saatler",   b: "tekne",     types: ["metafor", "mekan"],                grade: "ustaca", short: "Kışa çekilmiş tekneler de bekliyor; mevsim içerideki beklemeyi tekrarlıyor", text: "Kışa çekilmiş tekneler de baharı bekliyor. Mevsim, dükkânın içindeki beklemeyi dışarıda tekrarlıyor." },
    { a: "tekne",     b: "durdum",    types: ["metafor", "mekan"],                grade: "ustaca", short: "Tekneler Usta'nın beklemesinin dıştaki yansıması",             text: "Kıyıda bekleyen tekneler, Usta'nın beklemesinin dış dünyadaki yansıması. Mekân, karakterin ruh hâlini taşıyor." },
    { a: "kart",      b: "durdum",    types: ["metafor", "diyalog"],              grade: "ustaca", short: "“Bu saat çalışmaz” Usta'nın kendini anlatışı",                 text: "“Bu saat çalışmaz” kartı aslında Usta'nın kendini anlatışı. Nesne, karakterin ruh hâlinin metaforu." },
    { a: "yastik",    b: "durdum",    types: ["metafor", "diyalog"],              grade: "guclu",  short: "Boş yastık: kaybı ikinci kez yaşamak",                         text: "Boş yastık bir yokluk. Usta kaybı ikinci kez yaşıyor." },
    { a: "yastik",    b: "kart",      types: ["metafor"],                         grade: "guclu",  short: "Ölüye ayrılmış bir vitrin, küçük bir anıt",                    text: "Yastık ve kart birlikte küçük bir anıt kuruyor: ölüye ayrılmış bir vitrin." },
    { a: "anahtar",   b: "otobus",    types: ["kanit", "zaman"],                  grade: "guclu",  short: "Anahtarı olanlardan biri gece dönmüş",                         text: "Anahtarı olan iki kişiden biri gece geç saatte dönmüş." },
    { a: "otobus",    b: "kutu",      types: ["kanit", "zaman"],                  grade: "guclu",  short: "Sabah kutuyla gitmiş, gece dönmüş",                            text: "Sabah kutuyla gitmiş, gece dönmüş. Şehre bir şey götürmüş." },
    { a: "kutu",      b: "fis",       types: ["kanit"],                           grade: "ustaca", short: "Saat çalınmadı, onarıma gitti",                                text: "Mendile sarılı kutu ve onarım fişi: saat çalınmadı, onarıma gitti." },
    { a: "fis",       b: "surcme",    types: ["kanit", "diyalog"],                grade: "guclu",  short: "Dil sürçmesi fişi doğruluyor",                                 text: "“Bir saatçiye... yani bir tanıdığa.” Dil sürçmesi fişi doğruluyor." },
    { a: "fis",       b: "dogumgunu", types: ["zaman", "kanit"],                  grade: "ustaca", short: "Annenin her yılki hediyesi yeniden veriliyor",                 text: "Onarım fişi ve Cuma günü yan yana: Kenan annesinin her yılki hediyesini yeniden vermeye hazırlanıyor." },
    { a: "anahtar",   b: "fis",       types: ["kanit"],                           grade: "guclu",  short: "Anahtar sahibi ve fiş aynı kişide",                            text: "Anahtar sahibi ve onarım fişi aynı kişide buluşuyor." },
    { a: "dogumgunu", b: "kart",      types: ["zaman", "metafor"],                grade: "guclu",  short: "Onu kuracak kimse kalmadığı için “çalışmaz”",                  text: "Mürüvvet her yıl durmuş saati kurarmış. Kart “çalışmaz” diyor çünkü onu kuracak kimse kalmamış." },
    { a: "kurmadi",   b: "dogumgunu", types: ["zaman", "diyalog"],                grade: "ustaca", short: "Kenan annesinin boş bıraktığı yeri dolduruyor",                text: "Saati kurmak Mürüvvet'in işiydi. Kenan, annesinin boş bıraktığı yeri doldurmaya çalışıyor." },
    { a: "kurmadi",   b: "durdum",    types: ["diyalog", "metafor"],              grade: "guclu",  short: "Usta durmayı kendisi seçmiş",                                  text: "Usta onarabileceği hâlde onarmamış. Durmayı kendisi seçmiş." },
    { a: "kurmadi",   b: "kart",      types: ["metafor", "diyalog"],              grade: "guclu",  short: "“Çalışmaz” bir gerçek değil, bir karar",                       text: "“Çalışmaz” yazan kart bir gerçek değil, bir karar." },
    { a: "hapsetti",  b: "dogumgunu", types: ["zaman", "diyalog"],                grade: "guclu",  short: "Zamanı serbest bırakmak için bir gün seçilmiş",                text: "Zamanı hapsedilmiş bulan oğul, onu serbest bırakmak için bir gün seçmiş." },
    { a: "hapsetti",  b: "durdum",    types: ["diyalog"],                         grade: "guclu",  short: "Baba “durdum”, oğul “hapsetti” diyor",                         text: "Baba ve oğul aynı şeyi iki ağızdan söylüyor: biri “durdum” diyor, öbürü “hapsetti”." },
    { a: "marti",     b: "koku",      types: ["mekan"],                           grade: "guclu",  short: "Deniz anılmadan mekân kuruluyor",                              text: "Deniz hiç anılmadan mekân kuruluyor." },
    { a: "marti",     b: "tekne",     types: ["mekan"],                           grade: "guclu",  short: "Deniz anılmadan mekân kuruluyor",                              text: "Deniz hiç anılmadan mekân kuruluyor." },
    { a: "koku",      b: "tekne",     types: ["mekan"],                           grade: "guclu",  short: "Deniz anılmadan mekân kuruluyor",                              text: "Deniz hiç anılmadan mekân kuruluyor." },
    /* "anlatici" türü v1'de yoktu; dizilerin sonuna eklendi (eşdeğerlik testi bu eki yok sayar) */
    { a: "eller",     b: "anlatici",  types: ["diyalog", "kanit", "anlatici"],    grade: "guclu",  short: "Umut suçlanmaktan korkuyor ama kendini savunmuyor",            text: "Umut suçlanmaktan korkuyor ama kendini savunmuyor. Anlatıcı neyi koruyor?" },
    { a: "anlatici",  b: "fis",       types: ["kanit", "diyalog", "anlatici"],    grade: "ustaca", short: "Güvenilir ama seçici anlatıcı: bozmak istemediği bir şey var", text: "Anlatıcı fişi gördü, okumadı. Bilmek istemediği değil, bozmak istemediği bir şey var. Güvenilir ama seçici bir anlatıcı." },
    { a: "anlatici",  b: "umutsaat",  types: ["leitmotif", "anlatici"],           grade: "guclu",  short: "Anlatıcı olayı içeriden anlatıyor",                            text: "Anlatıcı da durmuş zamanın içinde. Olayı dışarıdan değil içeriden anlatıyor." }
  ],

  /* Suçlama */
  final: {
    who: { q: "Saati vitrinden kim aldı?", answer: "kenan", options: [
      { id: "umut",  t: "Umut, çırak",                    art: "umut" },
      { id: "selma", t: "Selma Abla",                     art: "selma" },
      { id: "kenan", t: "Kenan, oğlu",                    art: "kenan" },
      { id: "usta",  t: "Nevzat Usta, kendisi",           art: "usta" },
      { id: "kimse", t: "Kimse; saat hiç orada değildi",  art: "bos-cerceve" }
    ] },
    evidence: ["anahtar", "otobus", "kutu", "fis", "surcme", "dogumgunu"],
    evidenceMax: 4,
    why: { q: "Neden aldı?", answer: "onar", options: [
      { id: "para",  t: "Satıp parasını almak için",                                                        art: "kese" },
      { id: "ceza",  t: "Babasını cezalandırmak için",                                                      art: "yumruk" },
      { id: "onar",  t: "Saati onartıp doğum gününde babasına vermek, durmuş zamanı yeniden işletmek için", art: "saat-kurdele" },
      { id: "kapat", t: "Babasını dükkânı kapatmaya ikna etmek için",                                       art: "kepenk" }
    ] },
    center: { q: "Gizli merkez: Bu öykü aslında ne hakkında?", options: [
      { id: "hirsiz",   t: "Bir hırsızlık ve çözülüşü",                                 grade: "duz",    art: "maske",        note: "Bu, olay örgüsü. Düz okur burada durur." },
      { id: "yas",      t: "Yasın zamanı durdurması ve sevginin onu yeniden işletmesi", grade: "ustaca", art: "saat-isleyen", note: "Saatler, kart, tekneler, Umut'un saati: bütün iplikler buraya akıyor." },
      { id: "babaogul", t: "Baba ile oğul arasında söylenemeyen sevgi",                 grade: "guclu",  art: "iki-el",       note: "Geçerli bir okuma. Kenan sözle değil, bir nesneyle konuşuyor." },
      { id: "meslek",   t: "Saatçilik mesleğinin yok oluşu",                            grade: "zayif",  art: "kepenk",       note: "Metinde bunu destekleyen ayrıntı az." }
    ] },
    reportMin: 60
  },

  /* Sonuç ekranı açıklamaları (v1) */
  verdict: {
    who: { ok: "Doğru. Saati Kenan aldı.", no: "Saati Kenan aldı." },
    why: "Kenan saati çalmadı; annesinin her yıl yaptığı gibi, babasının doğum gününde onu yeniden kurmak için onarıma götürdü."
  },

  /* Epilog (Cuma). epilogShort: finalde gösterilen 3 satır, epilogdan birebir. */
  epilogTitle: "Epilog · Cuma",
  epilog: [
    "Cuma sabahı dükkânı yine ben açtım. Kenan erkenden gelmişti; elinde mendile sarılı küçük bir kutu vardı. Usta gelince kutuyu tezgâha bıraktı, bir şey söylemedi.",
    "Usta mendili açtı. Gümüş saat avucunda tıkırdıyordu.",
    "“Annem her yıl kurardı,” dedi Kenan. “Bu yıl ben kurdum.”",
    "Usta lupunu çıkardı. Uzun süre saate değil, oğluna baktı. Sonra kalktı, vitrindeki duvar saatinin camını açtı ve akrebi parmağıyla ileri itti.",
    "Öğleden sonra dükkândaki bütün saatler doğruyu gösteriyordu. Eve yürürken ben de kendiminkini ayarladım."
  ],
  epilogShort: [
    "Usta mendili açtı. Gümüş saat avucunda tıkırdıyordu.",
    "“Annem her yıl kurardı,” dedi Kenan. “Bu yıl ben kurdum.”",
    "Öğleden sonra dükkândaki bütün saatler doğruyu gösteriyordu."
  ]
});
