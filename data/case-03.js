/* Vaka 03 — "Kâtip Bartleby" (TASLAK)
   Kaynak: Herman Melville, Bartleby, the Scrivener (1853) — telifsiz. Aşağıdaki metin çeviri değil, öykünün
   olay örgüsünü polisiye kurguya uyarlayan ÖZGÜN bir Türkçe yeniden anlatımdır (bkz. CLAUDE.md §10, §11).
   Anlatıcı: Bartleby'yi işe alan avukat. Bu vakada anlatıcı aynı zamanda şüphelidir; "anlatıcıyı sorgulama"
   mekaniği merkezdedir. Gizli merkez, proje raporundaki B grubunun paravan okumasından alınmıştır:
   efendi hizmetkârını elinin altında ama bir paravanın arkasında tutar; onun bakışına maruz kalmak istemez.
   Sahne çizimi yok; yedek çizim (zemin + nesne ikonları) kullanılır. Öğretmen/yazar gözden geçirmelidir. */
window.CASES = window.CASES || [];
window.CASES.push({
  id: "vaka-03",
  title: "Kâtip Bartleby",
  draft: true,

  brief: [
    "Bir avukatın bürosuna sessiz bir kâtip girdi; bir gün kopya etmeyi, sonra her şeyi “yapmamayı tercih etti”. Birkaç ay sonra hapishane avlusunda ölü bulundu.",
    "Kimse ona el kaldırmadı. Peki onu kim bıraktı? Ayrıntıları topla; anlatıcıyı da sorgula."
  ],
  flatReader: "“Tuhaf bir kâtip işini yapmayı reddetmiş, işten atılmış, sonra hapiste açlıktan ölmüş. Öykü bitti.”",

  narrator: "Avukat, Bartleby'nin işvereni · Birinci tekil kişi",
  narratorName: "Avukat",
  bookLabel: "Avukatın anlatısı",
  epilogTitle: "Epilog · Söylenti",
  finale: { type: "ikon", art: "paravan" },

  story: [
    "Ben güvenli yolu seven bir avukatım; mahkemede bağırmam, tapu ve senet işleriyle uğraşırım. Bürom bir iş sokağındadır. [[duvar|Pencerelerimden biri üç adım ötedeki kararmış tuğla duvara bakar; öbürü, aydınlık dediğimiz bir hava boşluğuna.]] İki kâtibim vardı. [[hindi|Hindi sabahları melek gibi yazar, öğleden sonra yüzü közlenir, kalemiyle kâğıtları kavga eder gibi yırtardı.]] Kıskaç ise tersine, sabahları masasının yüksekliğiyle boğuşur, dişlerini sıkar, öğleden sonra yumuşardı. Bir de getir götür işlerine bakan on iki yaşında bir çocuk: Zencefil.",
    "İş artınca ilan verdim. Kapıda solgun, derli toplu, acınası ölçüde saygılı bir genç adam belirdi: Bartleby. Onu kendi odama aldım, [[paravan|masasını köşeye, pencerenin duvara bakan tarafına koydum ve aramıza yeşil bir paravan çektim; sesimi duysun, yüzümü görmesin diye.]]",
    "[[kopya|İlk günler gündüz gün ışığında, gece mum ışığında, hiç durmadan kopya etti; sessiz, solgun, makine gibi.]] Üçüncü gün kopyaları birlikte karşılaştırmak için onu çağırdım. Paravanın arkasından, yumuşak ama kesin bir sesle [[tercih|“Yapmamayı tercih ederim,” dedi.]] Ne öfke, ne küstahlık. Sadece tercih.",
    "Bu cümle büroya yerleşti. Hindi, Kıskaç, hatta Zencefil ağızlarında “tercih” kelimesiyle dolaşmaya başladılar. Ben her seferinde ona bir şey yaptırmaya çalıştım, her seferinde aynı cevabı aldım ve her seferinde kendimi geri çektim. [[kek|Zencefil'e göre öğle yemeği olarak yalnızca zencefilli kurabiye yiyordu; başka hiçbir şey.]]",
    "Bir pazar sabahı kiliseye giderken büroya uğradım. [[pazar|Kapı içeriden kilitliydi; Bartleby gömleğiyle açtı, biraz dolaşmamı rica etti.]] Dolaştım. Dönünce onun orada yaşadığını anladım: [[sabun|bir sabun ve havlu, köşede katlanmış bir battaniye, çekmecede bozuk paralar.]] O boş pazar sokağında, o koca binada tek başına. İçimde ilk kez ona karşı bir şey kıpırdadı; sonra bunun merhamet değil, korku olduğunu anladım.",
    "Ertesi hafta kopya etmeyi de bıraktı. [[duvarbakis|Günlerce paravanın arkasında durdu, gözleri karşıdaki kör tuğla duvarda.]] Ona para teklif ettim, gitmesini söyledim, kapıyı açık bıraktım. Gitmedi. Bir sabah kapımı kendi anahtarımla açamadım; o içerideydi ve meşguldü.",
    "Onu çıkaramayınca ben çıktım. [[tasinma|Büroyu başka bir binaya taşıdım; eşyalar giderken o, boş odanın ortasında kımıldamadan duruyordu.]] Yeni kiracılar onu merdivene, sonra sokağa çıkarmış. Bir gün beni buldular: “Sizin adamınız,” dediler, “sorumlusu sizsiniz.” Değildim; öyle söyledim.",
    "Yine de gittim. [[merdiven|Onu eski binanın merdiven korkuluğunda otururken buldum; gündüz merdivende, gece sokak kapısının eşiğinde uyuyormuş.]] Ona iş, hatta kendi evimi teklif ettim. “Şimdilik hiçbir değişiklik yapmamayı tercih ederim,” dedi. Kaçtım; şehirde günlerce dolaştım, büroya uğramadım.",
    "Sonunda polis onu serseri diye hapishaneye götürdü. [[avlu|Avluda, yüksek duvarların dibinde onu gördüm; çimenler taşların arasından yeşeriyordu.]] Yemek yedirene para verdim, iyi baksın diye. [[yemek|“Bugün yemek yemiyorum,” dedi Bartleby, “yemek yememeyi tercih ederim.”]] Birkaç gün sonra aynı avluda, duvara dönük, dizlerini çekmiş, uyur gibi buldum. Uyumuyordu.",
    "Sonradan bir söylenti duydum; doğru mu bilmiyorum. [[mektup|Bartleby daha önce Ölü Mektuplar Bürosu'nda çalışmış: sahibine ulaşmayan mektupları yakmak için ayıklayan bir memur.]] Bağışlanmaya giden bir yüzük, borcu ödenen bir banknot, umutla gönderilen bir haber; hepsi ölü. Ah Bartleby, ah insanlık."
  ],

  scenes: [
    { id: "buro", title: "Büro · Gündüz", light: "day",
      hotspots: [
        { clue: "duvar",   x: 4,  y: 8,  w: 22, h: 40, art: "duvar" },
        { clue: "paravan", x: 30, y: 10, w: 24, h: 44, art: "paravan" },
        { clue: "kopya",   x: 58, y: 14, w: 18, h: 30, art: "kopya" },
        { clue: "tercih",  x: 78, y: 8,  w: 18, h: 28, art: "tercih" },
        { clue: "hindi",   x: 8,  y: 58, w: 22, h: 32, art: "ofke" },
        { clue: "kek",     x: 52, y: 62, w: 18, h: 26, art: "kek" }
      ] },
    { id: "pazar", title: "Pazar · Boş büro", light: "lamp",
      hotspots: [
        { clue: "pazar",      x: 6,  y: 14, w: 26, h: 40, art: "pazar" },
        { clue: "sabun",      x: 38, y: 50, w: 24, h: 36, art: "tabak" },
        { clue: "duvarbakis", x: 66, y: 10, w: 28, h: 44, art: "goz" }
      ] },
    { id: "tasinma", title: "Taşınma · Merdiven", light: "winter",
      hotspots: [
        { clue: "tasinma",  x: 8,  y: 12, w: 32, h: 46, art: "tasinma" },
        { clue: "merdiven", x: 54, y: 36, w: 36, h: 54, art: "merdiven" }
      ] },
    { id: "avlu", title: "Avlu · Duvarlar", light: "lamp",
      hotspots: [
        { clue: "avlu",   x: 6,  y: 10, w: 36, h: 50, art: "parmaklik" },
        { clue: "yemek",  x: 50, y: 50, w: 20, h: 34, art: "tabak" },
        { clue: "mektup", x: 72, y: 12, w: 22, h: 32, art: "mektup" }
      ] }
  ],

  clues: {
    duvar:      { label: "Pencere üç adım ötedeki kör duvara bakıyor",          short: "Kör duvar",         tag: "mekan",     art: "duvar",     caption: "Pencerelerimden biri üç adım ötedeki kararmış tuğla duvara bakar; öbürü, aydınlık dediğimiz bir hava boşluğuna." },
    hindi:      { label: "Hindi: sabah melek, öğleden sonra közlenmiş yüz",     short: "Hindi'nin öğlesi",  tag: "zaman",     art: "ofke",      caption: "Hindi sabahları melek gibi yazar, öğleden sonra yüzü közlenir, kalemiyle kâğıtları kavga eder gibi yırtardı." },
    paravan:    { label: "Yeşil paravan: sesi duysun, yüzü görmesin",           short: "Yeşil paravan",     tag: "metafor",   art: "paravan",   caption: "masasını köşeye, pencerenin duvara bakan tarafına koydum ve aramıza yeşil bir paravan çektim; sesimi duysun, yüzümü görmesin diye." },
    kopya:      { label: "Gündüz gece, makine gibi kopya",                       short: "Makine gibi kopya", tag: "leitmotif", art: "kopya",     caption: "İlk günler gündüz gün ışığında, gece mum ışığında, hiç durmadan kopya etti; sessiz, solgun, makine gibi." },
    tercih:     { label: "“Yapmamayı tercih ederim.”",                           short: "“Tercih ederim”",   tag: "diyalog",   art: "tercih",    caption: "“Yapmamayı tercih ederim,” dedi." },
    kek:        { label: "Yalnızca zencefilli kurabiye yiyor",                   short: "Zencefilli kurabiye", tag: "kanit",   art: "kek",       caption: "Zencefil'e göre öğle yemeği olarak yalnızca zencefilli kurabiye yiyordu; başka hiçbir şey." },
    pazar:      { label: "Pazar sabahı kapı içeriden kilitli",                   short: "Pazar, kilitli kapı", tag: "zaman",   art: "pazar",     caption: "Kapı içeriden kilitliydi; Bartleby gömleğiyle açtı, biraz dolaşmamı rica etti." },
    sabun:      { label: "Sabun, havlu, battaniye, bozuk paralar: büroda yaşıyor", short: "Büroda yaşıyor",  tag: "kanit",     art: "tabak",     caption: "bir sabun ve havlu, köşede katlanmış bir battaniye, çekmecede bozuk paralar." },
    duvarbakis: { label: "Günlerce gözleri kör duvarda",                         short: "Duvara bakış",      tag: "leitmotif", art: "goz",       caption: "Günlerce paravanın arkasında durdu, gözleri karşıdaki kör tuğla duvarda." },
    tasinma:    { label: "Avukat onu değil, büroyu taşıdı",                      short: "Büro taşındı",      tag: "kanit",     art: "tasinma",   caption: "Büroyu başka bir binaya taşıdım; eşyalar giderken o, boş odanın ortasında kımıldamadan duruyordu." },
    merdiven:   { label: "Merdiven korkuluğunda, eşikte uyuyor",                 short: "Korkulukta",        tag: "mekan",     art: "merdiven",  caption: "Onu eski binanın merdiven korkuluğunda otururken buldum; gündüz merdivende, gece sokak kapısının eşiğinde uyuyormuş." },
    avlu:       { label: "Yüksek duvarların dibinde çimen",                      short: "Avluda çimen",      tag: "mekan",     art: "parmaklik", caption: "Avluda, yüksek duvarların dibinde onu gördüm; çimenler taşların arasından yeşeriyordu." },
    yemek:      { label: "“Yemek yememeyi tercih ederim.”",                      short: "Yemeği reddediş",   tag: "diyalog",   art: "tabak",     caption: "“Bugün yemek yemiyorum,” dedi Bartleby, “yemek yememeyi tercih ederim.”" },
    mektup:     { label: "Ölü Mektuplar Bürosu söylentisi",                      short: "Ölü mektuplar",     tag: "metafor",   art: "mektup",    caption: "Bartleby daha önce Ölü Mektuplar Bürosu'nda çalışmış: sahibine ulaşmayan mektupları yakmak için ayıklayan bir memur." },
    bakmadim:   { label: "Avukat: “Paravanı ona değil, kendime çektim.”",       short: "Kendine paravan",   tag: "anlatici",  art: "anlatici",  caption: "Paravanı ona değil, kendime çektim.", src: "sorgu" },
    kacti:      { label: "Avukat günlerce şehirde dolaşıp büroya uğramadı",     short: "Avukat kaçtı",      tag: "anlatici",  art: "p-avukat",  caption: "Kaçtım. Günlerce şehirde dolaştım, büroya uğramadım.", src: "sorgu" },
    yumusak:    { label: "Hindi: “Hiç bağırmadı; en çok bu sinirlendirdi.”",     short: "Hiç bağırmadı",     tag: "diyalog",   art: "ofke",      caption: "Hiç bağırmadı. En çok bu sinirlendirdi beni.", src: "sorgu" },
    kurabiye:   { label: "Zencefil: “Parayı hep veriyordu, kurabiyeyi hep yiyordu.”", short: "Para ve kurabiye", tag: "kanit", art: "kek",       caption: "Parayı hep verirdi, kurabiyeyi hep yerdi.", src: "sorgu" }
  },

  suspects: [
    { id: "avukat", name: "Avukat", role: "İşveren ve anlatıcı", portrait: "p-avukat", item: "gozluk", narrator: true, qs: [
      { icon: "paravan", q: "Paravanı neden çektiniz?",           a: "Sesini duymak, yüzünü görmemek için. (Durur.) Paravanı ona değil, kendime çektim.", clue: "bakmadim" },
      { icon: "tasinma", q: "Onu neden bırakıp taşındınız?",      a: "Çıkaramadım. Polis çağırmak da elimden gelmedi. Bir insanı değil, bir odayı terk ettim; öyle dedim kendime." },
      { icon: "goz",     q: "Merdivende bulduktan sonra ne yaptınız?", a: "Kaçtım. Günlerce şehirde dolaştım, büroya uğramadım. Döndüğümde onu götürmüşlerdi.", clue: "kacti" }
    ] },
    { id: "hindi", name: "Hindi", role: "Yaşlı kâtip, öğleden sonraları öfkeli", portrait: "p-hindi", item: "kalem", qs: [
      { icon: "ofke",   q: "Bartleby sizi neden kızdırıyordu?",   a: "Hiç bağırmadı. En çok bu sinirlendirdi beni. Bir adam reddediyorsa bağırmalı; o sadece tercih ediyordu.", clue: "yumusak" },
      { icon: "ogle",   q: "Öğleden sonraları ne oluyordu size?", a: "(Yüzü kızarır.) Yaş, efendim. Ve sabah kalan şey. Ama kâğıtlarımı hep bitirirdim." },
      { icon: "tercih", q: "Siz de “tercih” der miydiniz?",       a: "Ağzımdan kaçtı, evet. Bulaşıcıydı. Avukat Bey bile demeye başlamıştı." }
    ] },
    { id: "kiskac", name: "Kıskaç", role: "Genç kâtip, sabahları huzursuz", portrait: "p-kiskac", item: "masa", qs: [
      { icon: "sabah",   q: "Sabahları masanla derdin neydi?",      a: "Yüksekliği. Bir türlü doğru değildi. (Gülümser.) Şimdi düşünüyorum da masa değildi sorun." },
      { icon: "kopya",   q: "Bartleby iyi kopya eder miydi?",      a: "En iyimizdi. Ama kopyayı karşılaştırmazdı; kendi yazdığına bile bakmazdı." },
      { icon: "duvar",   q: "Onu en son nerede gördün?",            a: "Pencerede, duvara bakarken. Ben de baktım bir an. Duvarda bir şey yoktu. Belki mesele de buydu." }
    ] },
    { id: "zencefil", name: "Zencefil", role: "On iki yaşında getir götürcü", portrait: "p-zencefil", item: "kek", qs: [
      { icon: "kek",     q: "Ona her gün ne alıyordun?",            a: "Zencefilli kurabiye. Parayı hep verirdi, kurabiyeyi hep yerdi. Başka bir şey istemedi.", clue: "kurabiye" },
      { icon: "pazar",   q: "Pazarları büroda biri olur muydu?",    a: "Ben olmazdım. (Omuz silker.) Pazarları o sokakta kimse olmaz; dükkânlar bile kapalı." },
      { icon: "kardes",  q: "Ondan korkar mıydın?",                 a: "Hayır. Biraz delidir derdim. Sonra bir gün bana teşekkür etti. Kimse etmez." }
    ] }
  ],

  location: {
    need: ["duvar", "avlu", "pazar"],
    q: "Öyküde şehrin adı geçmiyor. Büro nerede?",
    options: [
      { id: "kasaba",     t: "Küçük bir taşra kasabası",                 art: "koy" },
      { id: "issokagi",   t: "Büyük bir ticaret şehrinin iş sokağı",     art: "is-sokagi" },
      { id: "kiyi",       t: "Bir kıyı köyü",                           art: "liman" },
      { id: "universite", t: "Bir üniversite kenti",                     art: "universite" }
    ],
    answer: "issokagi",
    evidence: ["duvar", "pazar", "avlu"],
    lessonShort: "Mekân adıyla değil, duvarlarıyla kurulur.",
    lesson: "Yazar şehri adıyla söylemedi; üç adım ötedeki tuğla duvarla, pazar günü bomboş kalan sokakla, yüksek duvarlı avluyla kurdu. Pencerenin duvara bakması taşrada olmaz; pazar günü ıssızlaşan sokak ise yalnızca iş yapılan bir sokaktır. İyi okur söylenmeyeni ayrıntıdan çıkarır."
  },

  centerFlow: ["paravan", "duvar", "duvarbakis", "tercih", "bakmadim", "kacti", "tasinma", "mektup", "avlu"],
  centerText: {
    guclu: { short: "Merkeze akıyor",     text: "Bu ayrıntı merkeze akıyor; olayı değil, anlamı taşıyor." },
    zayif: { short: "Delil, anlam değil", text: "Bu delil olayı çözer (kim, nasıl) ama gizli merkezi taşımaz. Delil ile anlamı ayır." }
  },
  redHerringId: "kek",
  redHerringShort: "Yanıltıcı ipucu",
  redHerring: "Zayıf bağ. Zencefilli kurabiye bir tuhaflık; düz okur Bartleby'yi 'deli' sayıp burada durur. Yazar bakışı kurabiyeye değil, paravana çekiyor.",
  insufficientShort: "Köprü yok",
  insufficient: "Kanıt yetersiz. Metinde bu iki ayrıntıyı bağlayan bir köprü görünmüyor. İstersen panoda kalsın; raporunda savunabilirsin.",
  wrongTypeSuffix: " Bağ yerinde, ama tür olarak {types} daha uygun.",

  links: [
    { a: "paravan",    b: "bakmadim",   types: ["metafor", "anlatici"],              grade: "ustaca", short: "Paravan, efendinin kendine çektiği perde",             text: "Avukat paravanı Bartleby'yi gizlemek için değil, onun bakışından korunmak için çeker. Efendi hizmetkârını elinin altında tutar ama ona bakmak istemez." },
    { a: "paravan",    b: "duvar",      types: ["metafor", "mekan"],                 grade: "ustaca", short: "Paravan ile kör duvar aynı şeyi yapıyor",               text: "Pencere duvara, Bartleby paravana bakıyor: iki engel de görmeyi keser. Mekân, ilişkinin biçimini veriyor." },
    { a: "duvar",      b: "duvarbakis", types: ["mekan", "leitmotif"],               grade: "guclu",  short: "Duvar, Bartleby'nin tek manzarası",                     text: "Kör duvar önce mekânın ayrıntısıdır, sonra Bartleby'nin günlerce baktığı tek şey olur. Ayrıntı leitmotife dönüşür." },
    { a: "duvarbakis", b: "avlu",       types: ["leitmotif", "mekan"],               grade: "ustaca", short: "Duvara bakış avluda duvara dönük ölümle bitiyor",        text: "Büroda duvara bakan adam, avluda duvara dönük ölür. Leitmotif son sahnede kapanır." },
    { a: "tercih",     b: "yemek",      types: ["diyalog"],                          grade: "ustaca", short: "Aynı cümle kopyadan yemeğe uzanıyor",                    text: "“Yapmamayı tercih ederim” önce kopyayı, sonra her şeyi, sonunda yemeği reddeder. Diyalog bir akım gibi bütün ağa yayılıyor." },
    { a: "tercih",     b: "yumusak",    types: ["diyalog"],                          grade: "guclu",  short: "Bağırmayan ret, bağıran retten güçlü",                   text: "Hindi'yi deliye döndüren, reddin yumuşaklığı. Diyalogun tonu anlamını belirliyor." },
    { a: "tercih",     b: "kopya",      types: ["diyalog", "leitmotif"],             grade: "guclu",  short: "Makine gibi kopyadan sonra ilk ret",                     text: "Hiç durmadan kopya eden adamın ilk tercihi, kopyayı karşılaştırmayı reddetmek: kendi yazdığına bakmak istemez." },
    { a: "bakmadim",   b: "kacti",      types: ["anlatici"],                         grade: "ustaca", short: "Bakmamak ve kaçmak: aynı anlatıcı",                      text: "Paravanı kendine çeken anlatıcı, merdivende bulduğu adamdan kaçar. Anlatıcının merhameti görmemek üzerine kurulu." },
    { a: "kacti",      b: "tasinma",    types: ["anlatici", "kanit"],                grade: "guclu",  short: "Adamı değil odayı terk etmek",                            text: "Büroyu taşımak ve şehirde dolaşmak aynı kaçışın iki adımı. Delil, anlatıcının seçimini gösteriyor." },
    { a: "tasinma",    b: "merdiven",   types: ["kanit", "mekan"],                   grade: "guclu",  short: "Taşınma Bartleby'yi merdivene itiyor",                   text: "Büro gidince Bartleby önce boş odada, sonra korkulukta, sonra eşikte. Her adım biraz daha dışarı." },
    { a: "merdiven",   b: "avlu",       types: ["mekan"],                            grade: "guclu",  short: "Eşikten avluya: duvarlar yükseliyor",                    text: "Sokak kapısının eşiğinden hapishane avlusuna. Mekânlar daralırken duvarlar yükseliyor." },
    { a: "pazar",      b: "sabun",      types: ["zaman", "kanit"],                   grade: "guclu",  short: "Boş pazar, büroda yaşayan adam",                          text: "Pazar sabahı kilitli kapı ile sabun, havlu, battaniye birleşince Bartleby'nin evsizliği görünür." },
    { a: "sabun",      b: "tasinma",    types: ["kanit"],                            grade: "guclu",  short: "Evi olan büro taşınınca adam evsiz",                      text: "Büroda yaşayan adamın evi, avukat büroyu taşıyınca ortadan kalkar. İki delil yan yana gelince taşınmanın ne olduğu görünür." },
    { a: "pazar",      b: "duvar",      types: ["zaman", "mekan"],                   grade: "guclu",  short: "Pazar günü ıssız iş sokağı",                              text: "Hafta içi kalabalık, pazar bomboş: bu bir iş sokağı. Zaman mekânı ele veriyor." },
    { a: "hindi",      b: "yumusak",    types: ["zaman", "diyalog"],                 grade: "guclu",  short: "Öğleden sonra kızaran adam, bağırmayana kızıyor",          text: "Hindi'nin öfkesinin saati var; Bartleby'nin reddinin yok. Öfke, karşısında öfke bulamayınca büyüyor." },
    { a: "hindi",      b: "tercih",     types: ["zaman", "diyalog"],                 grade: "guclu",  short: "Öfkenin saati var, tercihin yok",                         text: "Hindi'nin öfkesi öğleden sonraya bağlı; Bartleby'nin tercihi saatsiz. Zaman düzenine girmeyen tek kişi o." },
    { a: "kopya",      b: "mektup",     types: ["leitmotif", "metafor"],             grade: "ustaca", short: "Ölü mektupları ayıklayan el, şimdi ölü kopyalar",         text: "Sahibine ulaşmayan mektupları yakmak için ayıklayan adam, kimseye ulaşmayan kopyaları makine gibi çoğaltıyor. Söylenti, leitmotifi açıklıyor." },
    { a: "mektup",     b: "yemek",      types: ["metafor", "diyalog"],               grade: "guclu",  short: "Ulaşmayan mektup gibi ulaşmayan adam",                    text: "Ölü mektup gönderilmiş ama alınmamıştır; Bartleby de teklifleri almaz, sonunda yemeği de. Metafor son cümleyi açıklıyor." },
    { a: "paravan",    b: "kopya",      types: ["metafor", "leitmotif"],             grade: "guclu",  short: "Perde arkasında makine gibi çalışan gölge",               text: "Görünmeyen bir adam perde arkasında durmadan kopya eder: yazar görünmezliği iki kat yapıyor, emeği de görünmez kılıyor." },
    { a: "kek",        b: "kurabiye",   types: ["kanit"],                            grade: "guclu",  short: "Kurabiye tek düzen: parayı hep verir",                    text: "Zencefil'in ifadesi kurabiyeyi doğrular ama asıl şunu söyler: Bartleby düzenli ve dürüsttü. Tuhaflık değil, tutarlılık." },
    { a: "bakmadim",   b: "tercih",     types: ["anlatici", "diyalog"],              grade: "guclu",  short: "Bakmayan efendi, reddeden kâtip",                         text: "Biri görmeyi reddediyor, öbürü yapmayı. Anlatıcı ile kâtip aynı cümlenin iki yüzü." },
    { a: "avlu",       b: "yemek",      types: ["mekan", "diyalog"],                 grade: "guclu",  short: "Çimenin yeşerdiği avluda yemeği reddediş",                text: "Taşların arasından yeşeren çimen umudu, “yemek yememeyi tercih ederim” umutsuzluğu taşıyor. Mekân ve söz çelişiyor." },
    { a: "kacti",      b: "mektup",     types: ["anlatici", "metafor"],              grade: "guclu",  short: "Söylentiyi anlatan, kaçan anlatıcı",                      text: "Söylentiyi “doğru mu bilmiyorum” diye aktaran anlatıcı, Bartleby'yi anlamak için en sonunda bir açıklamaya sığınıyor. Kaçışın son biçimi: açıklamak." }
  ],

  final: {
    who: { q: "Bartleby'yi kim bıraktı?", answer: "avukat", options: [
      { id: "bartleby", t: "Kendisi; her şeyi reddetti",        art: "tercih" },
      { id: "avukat",   t: "Avukat; bakmadı ve taşındı",        art: "p-avukat" },
      { id: "kiraci",   t: "Yeni kiracılar ve polis",           art: "parmaklik" },
      { id: "kimse",    t: "Kimse; yazgı",                      art: "bos-cerceve" }
    ] },
    evidence: ["paravan", "bakmadim", "kacti", "tasinma", "sabun", "merdiven"],
    evidenceMax: 4,
    why: { q: "Avukat neden bıraktı?", answer: "bakmamak", options: [
      { id: "para",     t: "İşine yaramadığı için",                                   art: "kese" },
      { id: "bakmamak", t: "Ona bakmaya dayanamadığı için; merhameti görmemek istedi", art: "paravan" },
      { id: "korku",    t: "Deli olduğundan korktuğu için",                           art: "yumruk" },
      { id: "kanun",    t: "Kanun öyle emrettiği için",                               art: "usul" }
    ] },
    /* Ustaca seçenek, proje raporundaki B grubunun paravan okumasından. */
    center: { q: "Gizli merkez: Bu öykü aslında ne hakkında?", options: [
      { id: "tuhaf",    t: "Tuhaf bir kâtibin işten çıkarılışı ve ölümü",                                              grade: "duz",    art: "maske",   note: "Bu, olay örgüsü. Düz okur burada durur." },
      { id: "paravan",  t: "Paravan: efendinin hizmetkârını elinin altında tutup bakışına katlanamaması",               grade: "ustaca", art: "paravan", note: "Paravan, kör duvar, kaçış, taşınma: bütün iplikler buraya akıyor. Görmek istemeyen merhamet." },
      { id: "ret",      t: "Bir insanın “tercih etmeme” hakkı ve bunun karşısında çaresiz kalan düzen",               grade: "guclu",  art: "tercih",  note: "Geçerli bir okuma: tercih cümlesi, Hindi'nin öfkesi, polis. Düzen reddi anlayamaz." },
      { id: "buro",     t: "Kâtiplik işinin tekdüzeliği",                                                              grade: "zayif",  art: "kopya",   note: "Metinde var ama merkez değil; tekdüzelik zemin, bakış konu." }
    ] },
    reportMin: 60
  },

  verdict: {
    who: { ok: "Doğru. Kimse ona el kaldırmadı; avukat bakmadı ve gitti.", no: "Kimse ona el kaldırmadı; avukat bakmadı ve gitti." },
    why: "Avukat onu kovamadı, polise de veremedi; bakmaya dayanamadığı için odayı terk etti ve şehirde dolaştı. Merhameti görmemek istedi."
  },

  epilog: [
    "Yeni büromda da bir paravan var. Kâtiplerim arkasında kim olduğunu sormuyor; ben de söylemiyorum.",
    "Bazen pencereye gidip karşıdaki duvara bakıyorum. Duvarda bir şey yok. Belki mesele de bu.",
    "Söylentiyi anlatmaya devam ediyorum; her anlatışta ona biraz daha inanıyorum. Ah Bartleby, ah insanlık."
  ],
  epilogShort: [
    "Yeni büromda da bir paravan var.",
    "Duvarda bir şey yok. Belki mesele de bu.",
    "Ah Bartleby, ah insanlık."
  ]
});
