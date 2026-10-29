/* Vaka 02 — "Palto" (TASLAK)
   Kaynak: Nikolay Gogol, Palto (Şinel), 1842 — telifsiz. Aşağıdaki metin bir çeviri değil, öykünün
   olay örgüsünü polisiye kurguya uyarlayan ÖZGÜN bir Türkçe yeniden anlatımdır (bkz. CLAUDE.md §10, §11).
   Anlatıcı: Akakiy Akakiyeviç'in dairedeki masa komşusu olan genç bir kâtip.
   Bu dosya taslaktır: öykü metni, ipuçları ve bağ açıklamaları öğretmen/yazar tarafından gözden geçirilmelidir.
   Sahne çizimleri js/scenes.js içinde (daire, terzi, meydan, makam). */
window.CASES = window.CASES || [];
window.CASES.push({
  id: "vaka-02",
  title: "Palto",
  draft: true,

  brief: [
    "Bir dairenin kâtibi aylarca biriktirip aldığı yeni paltoyu, ilk giydiği gece ıssız bir meydanda kaybetti. Birkaç gün sonra öldü.",
    "Paltoyu kimin aldığı belli. Peki adamı ne öldürdü? Ayrıntıları topla, tanıkları sorgula."
  ],
  flatReader: "“Paltosunu hırsızlar çaldı, adam da soğuktan hastalanıp öldü. Öykü bitti.”",

  narrator: "Dairede kâtip, Akakiy'in masa komşusu · Birinci tekil kişi",
  narratorName: "Kâtip",
  bookLabel: "Kâtibin anlatısı",
  finale: { type: "ikon", art: "palto" },   /* mendil açılır, paltoyu gösterir; saat animasyonu yok */
  story: [
    "Dairemizde herkesin bir lakabı vardı; onunki sırtındaydı. [[kapot|Eski paltosuna palto bile demezdik; “kapot” derdik, yaşlı kadınların omzundaki o biçimsiz örtüye verilen adla.]] O duymazdı. Masasında, kâğıtları temize çekerken [[harfler|bazı harflere gülümser, hatta dudaklarıyla onlara eşlik ederdi]]. Yirmi yıldır aynı masa, aynı kalem, aynı harfler.",
    "Biz ona takılırdık. Başına kâğıt kırpıntıları atar, uydurma haberler verirdik. Bir gün ben de omzuna dokunup bir şey söyledim; başını kaldırdı: [[kardes|“Bırakın beni, ne istiyorsunuz benden?” dedi. Sesinde öyle bir şey vardı ki o gün ben bambaşka bir cümle duydum: “Ben senin kardeşinim.”]] Kimse söylememişti. Ben duymuştum.",
    "Kış geldi. [[ruzgar|Bu şehirde rüzgâr dört yandan birden eser; sabah dokuzda işe gidenlerin alnına saplanır, burunlarını kızartır.]] Kapot sırtta kaldıkça incelmişti. Terzi Petroviç'e gitti.",
    "[[merdiven|Petroviç'in evine çıkan merdiven bulaşık suyu kokar, karanlıkta basamakları ezbere saymak gerekirdi.]] Terzi tek gözüyle kumaşı evirip çevirdi; [[tirnak|kaplumbağa kabuğu gibi kalın, çarpık başparmak tırnağıyla]] çürüyen yerleri gösterdi. “Olmaz,” dedi. “Yeni palto lazım.”",
    "Yeni palto seksen ruble. [[tasarruf|Akşamları mumu yakmadı, çayı bıraktı, sokakta taşlara basmamaya başladı ki tabanlar aşınmasın.]] Aylarca. Sonra bir gün palto geldi: sağlam çuha, kedi kürkünden yaka. Dairede [[yaka|herkes yakasına dokunmak istedi; yirmi yıldır ilk kez onunla konuşan oldu, hatta bir memur akşam için şerefine çay verdi.]]",
    "O gece çaydan dönerken yol [[meydan|uçsuz bucaksız bir meydandan geçiyordu; uzakta tek bir bekçi kulübesinin ışığı, karın üstünde titrek bir nokta.]] Meydanın ortasında [[biyik|bıyıklı iki adam önünü kesti. “Palto benim,” dedi biri, çok sakin.]] Sonra kar, sonra karanlık.",
    "Ertesi sabah polis komiserine gitti. [[komiser|Komiser paltoyu sormadı; “Bu saatte orada ne işin vardı?” diye sordu, gözleriyle onu tartarak.]] Dairedekiler “önemli bir kişiye” gitmesini söylediler.",
    "[[onemli|O kişi, yeni rütbesinin ağırlığını denemek ister gibi, eski bir arkadaşının önünde gürledi: “Kiminle konuştuğunuzu biliyor musunuz? Siz kimsiniz?”]] Akakiy Akakiyeviç merdivenden nasıl indiğini bilmeden kendini sokakta, ayazın ortasında buldu.",
    "[[ates|O gece ateşi çıktı. Sayıklarken “ekselans” diyor, özür diliyor, sonra birden hayatında etmediği küfürleri ediyordu.]] Üç gün sonra öldü. Haber daireye dördüncü gün geldi.",
    "Sonra şehirde bir söylenti dolaştı: [[hayalet|Kalinkin Köprüsü'nde geceleri bir hayalet, kime rastlarsa sırtından paltosunu alıyormuş; rütbeye, kürke bakmadan.]] Söylentiyi dairede anlattığımda kimse gülmedi."
  ],

  /* Sahneler: çizim yok, yedek çizim (ışık + nesne ikonları). Koordinatlar yüzde. */
  scenes: [
    { id: "daire", title: "Daire · Gündüz", light: "day",
      hotspots: [
        { clue: "harfler",  x: 6,  y: 14, w: 22, h: 34, art: "harf" },
        { clue: "kapot",    x: 32, y: 10, w: 20, h: 34, art: "kapot" },
        { clue: "kardes",   x: 56, y: 12, w: 22, h: 34, art: "kardes" },
        { clue: "tasarruf", x: 10, y: 56, w: 20, h: 34, art: "mum" },
        { clue: "yaka",     x: 60, y: 54, w: 26, h: 38, art: "palto" }
      ] },
    { id: "terzi", title: "Terzi · Merdiven", light: "lamp",
      hotspots: [
        { clue: "merdiven", x: 6,  y: 16, w: 30, h: 66, art: "merdiven" },
        { clue: "tirnak",   x: 44, y: 24, w: 20, h: 36, art: "tirnak" },
        { clue: "ruzgar",   x: 70, y: 10, w: 24, h: 30, art: "ruzgar" }
      ] },
    { id: "meydan", title: "Meydan · Gece", light: "night",
      hotspots: [
        { clue: "meydan",  x: 30, y: 10, w: 36, h: 40, art: "meydan" },
        { clue: "biyik",   x: 8,  y: 56, w: 26, h: 32, art: "biyik" },
        { clue: "hayalet", x: 66, y: 50, w: 26, h: 42, art: "hayalet" }
      ] },
    { id: "makam", title: "Makam · Oda", light: "lamp",
      hotspots: [
        { clue: "komiser", x: 6,  y: 20, w: 24, h: 36, art: "komiser" },
        { clue: "onemli",  x: 38, y: 12, w: 26, h: 44, art: "general" },
        { clue: "ates",    x: 68, y: 46, w: 24, h: 44, art: "ates" }
      ] }
  ],

  clues: {
    kapot:    { label: "Eski paltoya “kapot” denmesi",                    short: "“Kapot”",          tag: "metafor",   art: "kapot",    caption: "Eski paltosuna palto bile demezdik; “kapot” derdik, yaşlı kadınların omzundaki o biçimsiz örtüye verilen adla." },
    harfler:  { label: "Bazı harflere gülümsemesi",                       short: "Harflere gülümseme", tag: "leitmotif", art: "harf",   caption: "bazı harflere gülümser, hatta dudaklarıyla onlara eşlik ederdi" },
    kardes:   { label: "“Bırakın beni” — anlatıcının duyduğu “Ben senin kardeşinim”", short: "“Kardeşinim”", tag: "anlatici", art: "kardes", caption: "“Bırakın beni, ne istiyorsunuz benden?” dedi. Sesinde öyle bir şey vardı ki o gün ben bambaşka bir cümle duydum: “Ben senin kardeşinim.”" },
    ruzgar:   { label: "Dört yandan esen rüzgâr",                          short: "Rüzgâr",           tag: "mekan",     art: "ruzgar",   caption: "Bu şehirde rüzgâr dört yandan birden eser; sabah dokuzda işe gidenlerin alnına saplanır, burunlarını kızartır." },
    merdiven: { label: "Bulaşık suyu kokan karanlık merdiven",            short: "Karanlık merdiven", tag: "mekan",    art: "merdiven", caption: "Petroviç'in evine çıkan merdiven bulaşık suyu kokar, karanlıkta basamakları ezbere saymak gerekirdi." },
    tirnak:   { label: "Petroviç'in kaplumbağa kabuğu gibi tırnağı",      short: "Çarpık tırnak",    tag: "metafor",   art: "tirnak",   caption: "kaplumbağa kabuğu gibi kalın, çarpık başparmak tırnağıyla" },
    tasarruf: { label: "Mumsuz, çaysız aylar",                             short: "Mumsuz aylar",     tag: "zaman",     art: "mum",      caption: "Akşamları mumu yakmadı, çayı bıraktı, sokakta taşlara basmamaya başladı ki tabanlar aşınmasın." },
    yaka:     { label: "Herkesin yakaya dokunmak istemesi",               short: "Yakaya dokunmak",  tag: "diyalog",   art: "palto",    caption: "herkes yakasına dokunmak istedi; yirmi yıldır ilk kez onunla konuşan oldu, hatta bir memur akşam için şerefine çay verdi." },
    meydan:   { label: "Uçsuz bucaksız meydan, uzakta tek ışık",          short: "Issız meydan",     tag: "mekan",     art: "meydan",   caption: "uçsuz bucaksız bir meydandan geçiyordu; uzakta tek bir bekçi kulübesinin ışığı, karın üstünde titrek bir nokta." },
    biyik:    { label: "Bıyıklı adamlar: “Palto benim” (yanıltıcı ipucu)", short: "Bıyıklı adamlar",  tag: "kanit",     art: "biyik",    caption: "bıyıklı iki adam önünü kesti. “Palto benim,” dedi biri, çok sakin." },
    komiser:  { label: "Komiser: “Orada ne işin vardı?”",                  short: "Komiserin sorusu", tag: "diyalog",   art: "komiser",  caption: "Komiser paltoyu sormadı; “Bu saatte orada ne işin vardı?” diye sordu, gözleriyle onu tartarak." },
    onemli:   { label: "Önemli Kişi: “Siz kimsiniz?”",                      short: "“Siz kimsiniz?”",  tag: "diyalog",   art: "general",  caption: "O kişi, yeni rütbesinin ağırlığını denemek ister gibi, eski bir arkadaşının önünde gürledi: “Kiminle konuştuğunuzu biliyor musunuz? Siz kimsiniz?”" },
    ates:     { label: "Sayıklarken özür ve küfür, üç günde ölüm",         short: "Ateş, üç gün",     tag: "zaman",     art: "ates",     caption: "O gece ateşi çıktı. Sayıklarken “ekselans” diyor, özür diliyor, sonra birden hayatında etmediği küfürleri ediyordu." },
    hayalet:  { label: "Köprüde palto alan hayalet söylentisi",           short: "Hayalet",          tag: "metafor",   art: "hayalet",  caption: "Kalinkin Köprüsü'nde geceleri bir hayalet, kime rastlarsa sırtından paltosunu alıyormuş; rütbeye, kürke bakmadan." },
    curuk:    { label: "Eski palto onarılamazdı, kumaş çürümüştü",        short: "Çürük kumaş",      tag: "kanit",     art: "curuk",    caption: "Kumaş çürümüştü; iğne batsa dağılırdı.", src: "sorgu" },
    usul:     { label: "Önemli Kişi: “Kâtip doğrudan bana gelemez.”",      short: "Usul",             tag: "diyalog",   art: "usul",     caption: "Kâtip doğrudan gelemez.", src: "sorgu" },
    tanidik:  { label: "Bekçi hırsızı “tanıdık sandı”, bağırmadı",        short: "“Tanıdık sandım”", tag: "kanit",     art: "goz",      caption: "Tanıdık sandım; bu meydanda herkes birbirine benzer. Bağırmadım.", src: "sorgu" },
    yeni:     { label: "Masaya yeni kâtip oturdu; harflere gülümsemiyor", short: "Yeni kâtip",       tag: "leitmotif", art: "masa",     caption: "Harfleri daha düzgün. Ama onlara gülümsemiyor.", src: "sorgu" }
  },

  suspects: [
    { id: "petrovic", name: "Petroviç", role: "Terzi, tek gözlü", portrait: "p-petrovic", item: "igne", qs: [
      { icon: "kapot", q: "Eski palto onarılamaz mıydı?",       a: "Onarılmazdı. Kumaş çürümüştü; iğne batsa dağılırdı. Yama tutmaz. Bunu ona ben söyledim, kimse inanmadı.", clue: "curuk" },
      { icon: "kese",  q: "Seksen ruble çok değil miydi?",      a: "Çuha, yaka, astar. Ben hesabı kumaşa göre yaparım, adama göre değil. (Tırnağını kumaşa sürter.)" },
      { icon: "kalp",  q: "Paltoyu verirken ne hissettin?",     a: "Bir terzi kendi eseriyle sokakta yürür. Arkasından baktım, köşeyi dönene kadar." }
    ] },
    { id: "onemli", name: "Önemli Kişi", role: "Yeni rütbeli general", portrait: "p-general", item: "apolet", qs: [
      { icon: "usul",    q: "Neden onu dinlemediniz?",         a: "Dinlemek benim işim değil. Dilekçe daire müdürüne, müdürden şefe, şeften bana gelir. Kâtip doğrudan gelemez.", clue: "usul" },
      { icon: "kardes",  q: "O gün yanınızda kim vardı?",      a: "Eski bir arkadaşım. Yıllardır görmemiştim. (Duraklar.) İnsan eski arkadaşının önünde... neyse." },
      { icon: "hayalet", q: "Hayalet söylentisine ne dersiniz?", a: "Söylentiye cevap vermem. (Paltosunun yakasını kaldırır.)" }
    ] },
    { id: "bekci", name: "Bekçi", role: "Meydandaki kulübenin bekçisi", portrait: "p-bekci", item: "fener", qs: [
      { icon: "meydan",  q: "O gece ne gördün?",                a: "İki kişi. Biri paltoyu giydi, öbürü yürüdü. Tanıdık sandım; bu meydanda herkes birbirine benzer. Bağırmadım.", clue: "tanidik" },
      { icon: "pencere", q: "Kulübeden meydan görünür mü?",     a: "Kar yağınca hiçbir şey görünmez. Yağmayınca da bakmayız." },
      { icon: "goz",     q: "Adamı daha önce görmüş müydün?",   a: "Her sabah geçerdi. Hiç paltosuna bakmamıştım; demek ki ona da bakmamışım." }
    ] },
    { id: "katip", name: "Anlatıcı", role: "Kâtip, masa komşusu", portrait: "p-katip", item: "kalem", narrator: true, qs: [
      { icon: "masa",        q: "Masasına kim oturdu?",                     a: "Ertesi hafta yeni bir kâtip. Harfleri daha düzgün. Ama onlara gülümsemiyor.", clue: "yeni" },
      { icon: "tur-diyalog", q: "“Kardeşinim” sözünü gerçekten duydun mu?", a: "Söylemedi. Ben duydum. Bazı cümleleri insan söylenmeden duyar; sonra unutmak için yıllar harcar." },
      { icon: "kepenk",      q: "Cenazesine gittin mi?",                     a: "Haberi dördüncü gün aldık. Gidecek bir şey kalmamıştı." }
    ] }
  ],

  location: {
    need: ["ruzgar", "meydan", "merdiven"],
    q: "Öyküde şehrin adı hiç geçmiyor. Olay nerede geçiyor?",
    options: [
      { id: "liman",   t: "Güneyde sıcak bir liman kenti",      art: "liman" },
      { id: "baskent", t: "Kuzeyde soğuk, büyük bir başkent",   art: "baskent" },
      { id: "dag",     t: "Dağ eteğinde bir kasaba",            art: "dag-ikon" },
      { id: "koy",     t: "Küçük bir taşra köyü",               art: "koy" }
    ],
    answer: "baskent",
    evidence: ["ruzgar", "meydan", "merdiven"],
    lessonShort: "Şehir adıyla değil, rüzgârıyla kurulur.",
    lesson: "Yazar şehri adıyla söylemedi; rüzgârı, meydanı ve merdiveniyle kurdu. Dört yandan esen ayaz ve uçsuz bucaksız meydan taşraya değil, büyük ve soğuk bir başkente aittir; bulaşık sulu merdiven ise kat kat kiracıyla dolu bir şehir binasına. İyi okur söylenmeyeni ayrıntıdan çıkarır."
  },

  centerFlow: ["kapot", "harfler", "kardes", "yaka", "onemli", "ates", "hayalet", "yeni", "tasarruf", "komiser", "usul"],
  centerText: {
    guclu: { short: "Merkeze akıyor",     text: "Bu ayrıntı merkeze akıyor; olayı değil, anlamı taşıyor." },
    zayif: { short: "Delil, anlam değil", text: "Bu delil olayı çözer (kim, nasıl) ama gizli merkezi taşımaz. Delil ile anlamı ayır." }
  },
  redHerringId: "biyik",
  redHerringShort: "Yanıltıcı ipucu",
  redHerring: "Zayıf bağ. Bıyıklı adamlar paltoyu aldı, evet; ama öykü onları bir daha anmaz. Düz okur hırsızda durur; yazar başka yere bakıyor.",
  insufficientShort: "Köprü yok",
  insufficient: "Kanıt yetersiz. Metinde bu iki ayrıntıyı bağlayan bir köprü görünmüyor. İstersen panoda kalsın; raporunda savunabilirsin.",
  wrongTypeSuffix: " Bağ yerinde, ama tür olarak {types} daha uygun.",

  links: [
    { a: "harfler",  b: "yeni",     types: ["leitmotif"],            grade: "ustaca", short: "Harfler kaldı, gülümseme gitti",                       text: "Masaya yeni kâtip oturdu, harfler daha düzgün; ama onlara gülümseyen kimse yok. Leitmotif kaybın ne olduğunu söylüyor: iş değil, sevgi." },
    { a: "kapot",    b: "yaka",     types: ["metafor", "diyalog"],   grade: "guclu",  short: "Kapotla görünmez, paltoyla görünür",                   text: "Aynı adam: kapot sırtındayken alay konusu, palto sırtındayken şerefine çay verilen. Değişen o değil, kumaş." },
    { a: "kardes",   b: "onemli",   types: ["diyalog", "anlatici"],  grade: "ustaca", short: "“Kardeşinim” ile “Siz kimsiniz?” karşı karşıya",         text: "İki cümle öykünün iki kutbu: biri insanı görür, öbürü rütbeyi. Akakiy ikisinin arasında ezilir." },
    { a: "ruzgar",   b: "meydan",   types: ["mekan"],                grade: "guclu",  short: "Şehir adı anılmadan kuruluyor",                        text: "Şehir adı hiç anılmadan mekân kuruluyor." },
    { a: "ruzgar",   b: "merdiven", types: ["mekan"],                grade: "guclu",  short: "Şehir adı anılmadan kuruluyor",                        text: "Şehir adı hiç anılmadan mekân kuruluyor." },
    { a: "meydan",   b: "merdiven", types: ["mekan"],                grade: "guclu",  short: "Şehir adı anılmadan kuruluyor",                        text: "Şehir adı hiç anılmadan mekân kuruluyor." },
    { a: "tirnak",   b: "curuk",    types: ["metafor", "kanit"],     grade: "guclu",  short: "Terzinin tırnağı da kumaş gibi yıpranmış",             text: "Petroviç'in çarpık tırnağı ile çürümüş kumaş aynı yoksulluğun iki yüzü." },
    { a: "tasarruf", b: "yaka",     types: ["zaman", "diyalog"],     grade: "ustaca", short: "Aylarca yokluk, bir günlük ilgi",                      text: "Mum yakmadan geçen aylar, bir akşamlık çayla ödeniyor. Zaman ölçüsü eşitsizliği gösteriyor." },
    { a: "biyik",    b: "tanidik",  types: ["kanit"],                grade: "guclu",  short: "Bekçi hırsızı tanıdık sandı",                           text: "Bekçinin “tanıdık sandım” demesi, bıyıklıların kim olduğunu değil, kimsenin bakmadığını gösterir." },
    { a: "komiser",  b: "onemli",   types: ["diyalog"],              grade: "ustaca", short: "İki makam da suçu kurbana çeviriyor",                   text: "Komiser “orada ne işin vardı” diye sorar, Önemli Kişi “siz kimsiniz” diye gürler. Soruşturma kurbanı sorgular." },
    { a: "onemli",   b: "ates",     types: ["diyalog", "zaman"],     grade: "ustaca", short: "Azardan ateşe üç gün",                                  text: "Ayaza çıkarılan adam o gece yanar. Ateş soğuktan değil, sözden." },
    { a: "ates",     b: "hayalet",  types: ["metafor", "zaman"],     grade: "guclu",  short: "Sayıklayan küfür hayalete dönüşüyor",                  text: "Hayatında küfretmemiş adam sayıklarken küfreder; sonra hayalet olup paltoları alır. Bastırılan öfke ölümden sonra çıkar." },
    { a: "hayalet",  b: "onemli",   types: ["metafor", "diyalog"],   grade: "guclu",  short: "Hayalet rütbeye bakmıyor",                              text: "Rütbeye bakmayan hayalet, rütbeden başka bir şeye bakmayan adamın paltosunu alır." },
    { a: "kapot",    b: "tirnak",   types: ["metafor"],              grade: "guclu",  short: "Yıpranmış şeylerin dünyası",                           text: "Kapot, tırnak, merdiven: öykünün nesneleri hep aşınmış. Yoksulluk anlatılmaz, gösterilir." },
    { a: "harfler",  b: "kardes",   types: ["leitmotif", "diyalog", "anlatici"], grade: "guclu", short: "Harflere gülümseyen adam insanlardan özür diliyor", text: "Harflerle konuşan, insanlarla konuşamayan biri; “bırakın beni” derken bile özür dilercesine." },
    { a: "yaka",     b: "yeni",     types: ["diyalog", "zaman"],     grade: "guclu",  short: "Bir gün ilgi, bir hafta sonra unutuş",                 text: "Paltosunun yakasına dokunanlar, masasına oturan yeni kâtibi sormuyor." },
    { a: "usul",     b: "onemli",   types: ["diyalog"],              grade: "guclu",  short: "Usul, insanın önüne duvar",                             text: "Dilekçe yolunu anlatan usul ile “siz kimsiniz” azarı aynı kapıyı kapatır." },
    { a: "usul",     b: "komiser",  types: ["diyalog", "kanit"],     grade: "guclu",  short: "Her makam başka bir kapıyı gösteriyor",                text: "Komiser soruyu çevirir, Önemli Kişi usulü gösterir; ikisi de paltoyu aramaz." },
    { a: "biyik",    b: "meydan",   types: ["kanit", "mekan"],       grade: "guclu",  short: "Boş meydan hırsıza alan açıyor",                        text: "Hırsızlık ıssız meydanda olur; bekçi uzakta, ışık titrek. Mekân olayı hazırlıyor." },
    { a: "tasarruf", b: "harfler",  types: ["zaman", "leitmotif"],   grade: "guclu",  short: "Azla yetinmenin iki yüzü",                             text: "Harflerle mutlu olan adam mumsuz akşamlara da katlanır; öykü bunu erdem değil, görünmezlik olarak anlatır." },
    { a: "curuk",    b: "tasarruf", types: ["kanit", "zaman"],       grade: "guclu",  short: "Onarım olmayınca aylar biriktirmek",                   text: "Çürük kumaş onarılamayınca tek yol aylarca yokluk. Nesnenin hâli zamanı belirliyor." },
    { a: "kardes",   b: "yeni",     types: ["diyalog", "leitmotif", "anlatici"], grade: "ustaca", short: "Kardeş unutulur, masa dolar",               text: "“Kardeşinim” diyen adamın yerine ertesi hafta başkası oturur. Daire kardeşi değil, kâtibi hatırlar." },
    { a: "tanidik",  b: "yaka",     types: ["kanit", "diyalog"],     grade: "guclu",  short: "Herkes paltoyu tanıdı, kimse adamı",                   text: "Dairede yakasına dokunulan palto, meydanda bekçinin tanıdık sandığı palto: nesne görünür, insan değil." },
    { a: "ates",     b: "kardes",   types: ["diyalog", "anlatici"],  grade: "ustaca", short: "Sayıklarken bile özür",                                text: "“Ekselans” diye özür dileyen ve küfreden aynı ağız: kardeşlik isteğiyle öfke aynı yerde." },
    { a: "komiser",  b: "yaka",     types: ["diyalog", "metafor"],   grade: "guclu",  short: "Paltoya dokunan el, paltoyu aramayan makam",            text: "Dairede herkes paltoya dokunur; komiser paltoyu sormaz bile. Nesne görünür, insan ve kurum görünmez." },
    { a: "onemli",   b: "yaka",     types: ["diyalog", "metafor"],   grade: "guclu",  short: "Paltoyla kazanılan ses, azarla susturuluyor",          text: "Palto ona bir akşamlık ses verir; Önemli Kişi o sesi tek cümleyle alır." }
  ],

  final: {
    who: { q: "Akakiy'i ne öldürdü?", answer: "onemli", options: [
      { id: "hirsiz", t: "Bıyıklı hırsızlar",          art: "biyik" },
      { id: "soguk",  t: "Ayaz ve ateş",               art: "ruzgar" },
      { id: "onemli", t: "Önemli Kişi'nin azarı",      art: "general" },
      { id: "kimse",  t: "Kimse; yazgı",               art: "bos-cerceve" }
    ] },
    evidence: ["onemli", "ates", "komiser", "usul", "kardes", "hayalet"],
    evidenceMax: 4,
    why: { q: "Önemli Kişi neden gürledi?", answer: "rutbe", options: [
      { id: "kendi",  t: "Paltoyu kendisi almıştı",                          art: "palto" },
      { id: "rutbe",  t: "Eski arkadaşının önünde rütbesini göstermek için", art: "general" },
      { id: "nefret", t: "Akakiy'den nefret ettiği için",                    art: "yumruk" },
      { id: "kanun",  t: "Usul öyle emrettiği için",                         art: "usul" }
    ] },
    /* Ustaca seçenek, proje raporundaki B grubunun okumasından: palto giyinmek değil soyunmaktır; hırsızlık
       Akakiy'den çok bürokrasi ve hukukun üstünden paltoyu alır, kurumların yozlaşması açığa çıkar. */
    center: { q: "Gizli merkez: Bu öykü aslında ne hakkında?", options: [
      { id: "hirsizlik", t: "Bir palto hırsızlığı ve bir ölüm",                                                          grade: "duz",    art: "maske",   note: "Bu, olay örgüsü. Düz okur burada durur." },
      { id: "soyunma",   t: "Giyinmek değil soyunmak: palto çalınınca çıplak kalan Akakiy değil, bürokrasi ve hukuktur",  grade: "ustaca", art: "palto",   note: "Komiser, usul, Önemli Kişi, hayalet: hırsızlık kurumları çıplak bırakıyor. Bütün iplikler buraya akıyor." },
      { id: "gorunmez",  t: "Görünmez bir insanın bir paltoyla görünür olup yeniden silinmesi",                          grade: "guclu",  art: "kardes",  note: "Geçerli bir okuma: kapot, harfler, yaka, yeni kâtip. Kurumlar bu silinmenin failidir." },
      { id: "yoksulluk", t: "Terzilik ve yoksulluk",                                                                     grade: "zayif",  art: "tirnak",  note: "Metinde var ama merkez değil; yoksulluk zemin, sergilenme ve silinme konu." }
    ] },
    reportMin: 60
  },

  verdict: {
    who: { ok: "Doğru. Hırsızlar paltoyu aldı; adamı azar öldürdü.", no: "Hırsızlar paltoyu aldı; adamı azar öldürdü." },
    why: "Önemli Kişi yeni rütbesini eski bir arkadaşının önünde denemek için gürledi; karşısındakini görmedi."
  },

  epilogTitle: "Epilog · Söylenti",
  epilog: [
    "Söylenti büyüdü. Bir gece Önemli Kişi bir akşam yemeğinden dönerken kızağında ensesine bir elin değdiğini hissetti. Dönünce küçük, solgun bir yüz gördü; tanıdı.",
    "“Paltonu arıyordum,” dedi yüz, “benimkini aramadın.”",
    "Önemli Kişi paltosunu kendi elleriyle çıkarıp verdi. Eve paltosuz döndü; o günden sonra memurlarına “siz kimsiniz” demedi.",
    "Hayalet bir daha görülmedi. Dairede masası dolu, adı kayıtlarda; harflere gülümseyen kimse yok."
  ],
  epilogShort: [
    "“Paltonu arıyordum,” dedi yüz, “benimkini aramadın.”",
    "Önemli Kişi paltosunu kendi elleriyle çıkarıp verdi.",
    "Hayalet bir daha görülmedi."
  ]
});
