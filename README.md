# Kurmaca Bürosu

Lise edebiyat dersi için **polisiye kurgulu bir okuma oyunu**. "Öykü ve Romanlara Kurmaca Ağından Bakmak" projesindeki fiziksel kurmaca ağı (kaideye gerilmiş iplerle gösterilen metafor, imge, diyalog, mekân, leitmotif bağlantıları) tarayıcıda çalışan bir dedektif panosuna çevrildi.

- Okur = dedektif · Ayrıntı = ipucu · Gizli merkez = çözülecek dava
- Her vaka iki soru taşır: **Ne oldu?** (olay örgüsü) ve **Bu öykü aslında ne anlatıyor?** (gizli merkez)

**Oyna:** https://kutlu53.github.io/kurmaca-burosu/

## Akış

1. **Dosya** — masadaki kapalı dosyayı aç.
2. **Olay yeri** — resimli sahnelerde nesnelere dokun; anlatıcının cümlesi altyazı olarak gelir, delil tepsiye düşer. Tam metin "anlatı" düğmesinde, kitap sayfası görünümünde.
3. **Sorgu** — dört tanık, ikonlu sorular, çizgi roman balonlu cevaplar; bazı cevaplar delil verir.
4. **Konum** — öyküde adı geçmeyen mekânı delillerle tespit et.
5. **Pano** — polaroid kartlar arasına ip ger, türünü seç (leitmotif, metafor, mekân, diyalog, zaman, kanıt); bağ derecelendirilir: ustaca / güçlü / zayıf / kanıt yetersiz.
6. **Suçlama** — suçlu, deliller, neden, gizli merkez ve kısa rapor.
7. **Final** — animasyon, epilog, unvan rozeti (Düz / Dikkatli / Düşünceli Okur), öğretmen özeti (kopyala ya da CSV indir).

## Oyun öncesi açıklama

Oyun kendiliğinden açıklama göstermez; öğretmenin 2-3 dakikalık sözlü girişi önerilir ("Okur dedektif, ayrıntı ipucu; önce ne olduğunu, sonra öykünün aslında neyi anlattığını bulacaksınız"). İsteğe bağlı yardım **varsayılan olarak açıktır**: üst banttaki **?** düğmesi altı resimli adımı ve bağ türlerinin tek cümlelik tanımlarını gösterir; panoda "Türler?" bağlantısı aynı tanımları açar.

Öğretmen yardımı kapatabilir (örneğin kontrol grubu için): adrese `#yardim=kapali` ekleyin (`…/kurmaca-burosu/#yardim=kapali`, ikinci vaka için `#vaka-02&yardim=kapali`) ya da sayfanın altındaki "Yardım açık/kapalı" düğmesini kullanın. Tercih tarayıcıda saklanır; puanlama değişmez.

## Vakalar

| Vaka | Eser | Durum |
|---|---|---|
| 01 · Dokuzu Yirmi Geçe | Bu oyun için yazılmış özgün öykü | tamam |
| 02 · Palto | Gogol'ün *Palto*'sundan (1842, telifsiz) özgün Türkçe yeniden anlatım | taslak, gözden geçirilecek |

## Çevrimdışı kullanım

Sunucu gerekmez. `index.html` dosyasını çift tıklayarak açmak yeterlidir. Tek dosyalık paket: `dist/kurmaca-burosu.html` (öğrencilere bu dosya dağıtılabilir). Yazı tipleri çevrimiçiyken Google Fonts'tan gelir, çevrimdışıyken yedek tiplere düşer; tam çevrimdışı görünüm için `assets/fonts/OKUBENI.md`.

## Geliştirme

Çerçeve ve kütüphane yok; düz HTML, CSS, JavaScript. Node yalnızca derleme ve test için.

```
node build.js icons      # assets/icons.svg → js/icons.js (sprite sayfaya gömülür)
node build.js dist       # tek dosyalık paket
node test/verify-data.js .   # Vaka 01 verisi v1 prototipiyle birebir mi
node test/equiv-v1.js .      # puanlama ve bağ değerlendirmesi v1 ile birebir mi
node test/verify-case.js .   # bütün vakaların bütünlüğü
```

`test/mobile-flow.html`, `test/scene-shot.html` ve `test/icons.html` headless Chrome ile görsel/akış denetimi içindir (açıklamalar dosya başlarında).

Proje kararları ve veri şeması: `CLAUDE.md`. Yeni vaka eklemek için `data/case-02.js` örnek alınır; çizimi olmayan sahneler yedek çizimle oynanır.

## Ölçme

Her oturum süre, büyüteç kullanımı, bulunan delil, kurulan bağ ve dereceleri, konum, suçlama, gizli merkez seçimi ve serbest raporu üretir. "CSV indir" ile tek satırlık dosya alınır; öğretmen sınıf tablosunda birleştirir (deney ve kontrol grubu karşılaştırması).

## Lisans ve telif

Vaka 01'in öyküsü bu proje için özgün yazılmıştır. Vaka 02, telifsiz bir eserin özgün yeniden anlatımıdır; hiçbir çeviri metni kopyalanmamıştır. Yazı tipleri: Special Elite (Apache 2.0), Spectral ve IBM Plex (OFL).
