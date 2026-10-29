/* ÜRETİLMİŞ DOSYA — elle düzenleme. Kaynak: assets/icons.svg · Üret: node build.js icons
   69 simge: tur-leitmotif, tur-metafor, tur-mekan, tur-diyalog, tur-anlatici, tur-zaman, tur-kanit, saatler, marti, koku, tekne, yastik, kart, anahtar, lup, otobus, hapsetti, cay, fis, eller, kol-saati, mekanizma, surcme, kutu, anlatici, saat, soru, kalp, pencere, kepenk, usta, kenan, selma, umut, bos-cerceve, maske, kese, yumruk, saat-kurdele, saat-isleyen, iki-el, palto, kapot, harf, kardes, ruzgar, merdiven, tirnak, mum, meydan, biyik, komiser, general, ates, hayalet, curuk, usul, goz, masa, p-petrovic, p-general, p-bekci, p-katip, liman, baskent, dag-ikon, koy, merkez, raptiye */
window.KB = window.KB || {};
KB.ICON_IDS = ["tur-leitmotif","tur-metafor","tur-mekan","tur-diyalog","tur-anlatici","tur-zaman","tur-kanit","saatler","marti","koku","tekne","yastik","kart","anahtar","lup","otobus","hapsetti","cay","fis","eller","kol-saati","mekanizma","surcme","kutu","anlatici","saat","soru","kalp","pencere","kepenk","usta","kenan","selma","umut","bos-cerceve","maske","kese","yumruk","saat-kurdele","saat-isleyen","iki-el","palto","kapot","harf","kardes","ruzgar","merdiven","tirnak","mum","meydan","biyik","komiser","general","ates","hayalet","curuk","usul","goz","masa","p-petrovic","p-general","p-bekci","p-katip","liman","baskent","dag-ikon","koy","merkez","raptiye"];
KB.icon = function (id, cls) { return '<svg class="ic ' + (cls || "") + '" aria-hidden="true"><use href="#ic-' + id + '"/></svg>'; };
(function () {
  const put = function () { document.body.insertAdjacentHTML("afterbegin", `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
<symbol id="ic-tur-leitmotif" viewBox="0 0 64 64">
  <path d="M32 30a2 2 0 0 1 2 2a4 4 0 0 1-4 4a6 6 0 0 1-6-6a8 8 0 0 1 8-8a10 10 0 0 1 10 10a12 12 0 0 1-12 12a14 14 0 0 1-14-14a16 16 0 0 1 16-16a18 18 0 0 1 18 18" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</symbol>
<symbol id="ic-tur-metafor" viewBox="0 0 64 64">
  <path d="M12 10Q32 2 52 10Q56 40 32 58Q8 40 12 10Z" fill="currentColor"/>
  <ellipse cx="23" cy="26" rx="6" ry="4" fill="var(--ic-bg,#ece6d7)"/>
  <ellipse cx="41" cy="26" rx="6" ry="4" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M20 40Q32 52 44 40Q32 45 20 40Z" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-tur-mekan" viewBox="0 0 64 64">
  <path d="M32 60C32 60 14 36 14 24A18 18 0 0 1 50 24C50 36 32 60 32 60Z" fill="currentColor"/>
  <circle cx="32" cy="24" r="7" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-tur-diyalog" viewBox="0 0 64 64">
  <path d="M14 10H50Q58 10 58 18V36Q58 44 50 44H30L18 56V44H14Q6 44 6 36V18Q6 10 14 10Z" fill="currentColor"/>
  <circle cx="22" cy="27" r="3" fill="var(--ic-bg,#ece6d7)"/>
  <circle cx="32" cy="27" r="3" fill="var(--ic-bg,#ece6d7)"/>
  <circle cx="42" cy="27" r="3" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-tur-anlatici" viewBox="0 0 64 64">
  <path d="M4 30Q24 10 44 30Q24 50 4 30Z" fill="currentColor"/>
  <circle cx="24" cy="30" r="8" fill="var(--ic-bg,#ece6d7)"/><circle cx="24" cy="30" r="4" fill="currentColor"/>
  <path d="M48 22L60 16M50 30H62M48 38L60 44" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
</symbol>
<symbol id="ic-tur-zaman" viewBox="0 0 64 64">
  <rect x="14" y="6" width="36" height="5" rx="1" fill="currentColor"/>
  <rect x="14" y="53" width="36" height="5" rx="1" fill="currentColor"/>
  <path d="M18 11H46V18Q46 28 34 32Q46 36 46 46V53H18V46Q18 36 30 32Q18 28 18 18Z" fill="currentColor"/>
  <path d="M22 12H42V18Q42 27 34 32Q42 37 42 46V52H22V46Q22 37 30 32Q22 27 22 18Z" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M25 15H39V18Q39 24 32 27Q25 24 25 18Z" fill="currentColor"/>
  <path d="M24 52H40V47Q36 43 32 41Q28 43 24 47Z" fill="currentColor"/>
</symbol>
<symbol id="ic-tur-kanit" viewBox="0 0 64 64">
  <circle cx="26" cy="26" r="17" fill="currentColor"/>
  <circle cx="26" cy="26" r="11" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M38 40L54 56" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
  <circle cx="22" cy="22" r="3" fill="currentColor" opacity=".35"/>
</symbol>
<symbol id="ic-saatler" viewBox="0 0 64 64">
  <circle cx="26" cy="28" r="21" fill="currentColor"/>
  <circle cx="26" cy="28" r="16" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M26 28L17.5 26.5M26 28L35 33.2" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <circle cx="26" cy="28" r="2" fill="currentColor"/>
  <circle cx="49" cy="47" r="12" fill="currentColor"/>
  <circle cx="49" cy="47" r="8.5" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M49 47L44.5 46.2M49 47L53.5 49.6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="49" cy="47" r="1.4" fill="currentColor"/>
</symbol>
<symbol id="ic-marti" viewBox="0 0 64 64">
  <path d="M6 26Q18 10 32 26Q46 10 58 26" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  <path d="M30 24L34 24L32 31Z" fill="currentColor"/>
  <rect x="12" y="42" width="18" height="14" rx="1" fill="currentColor"/>
  <rect x="34" y="42" width="18" height="14" rx="1" fill="currentColor"/>
  <path d="M14 47H28M14 52H28M36 47H50M36 52H50" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
</symbol>
<symbol id="ic-koku" viewBox="0 0 64 64">
  <path d="M20 50Q13 41 20 33Q27 25 20 16M32 50Q25 41 32 33Q39 25 32 16M44 50Q37 41 44 33Q51 25 44 16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <path d="M6 58Q14 52 22 58T38 58T54 58" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".6"/>
</symbol>
<symbol id="ic-tekne" viewBox="0 0 64 64">
  <path d="M3 34H56Q60 34 58 38Q54 48 44 50H16Q8 48 3 34Z" fill="currentColor"/>
  <path d="M12 34Q14 24 24 22H46Q50 26 50 34Z" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M20 26V34M30 23V34M40 23V34" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
  <rect x="14" y="50" width="6" height="8" fill="currentColor"/>
  <rect x="40" y="50" width="6" height="8" fill="currentColor"/>
  <path d="M6 60H58" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>
</symbol>
<symbol id="ic-yastik" viewBox="0 0 64 64">
  <path d="M12 16Q32 22 52 16Q46 32 52 48Q32 42 12 48Q18 32 12 16Z" fill="currentColor"/>
  <circle cx="32" cy="32" r="8" fill="none" stroke="var(--ic-bg,#ece6d7)" stroke-width="2" stroke-dasharray="3 3" opacity=".9"/>
  <circle cx="11" cy="15" r="3.5" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="53" cy="15" r="3.5" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="11" cy="49" r="3.5" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="53" cy="49" r="3.5" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-kart" viewBox="0 0 64 64">
  <rect x="9" y="17" width="46" height="30" rx="2" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3"/>
  <rect x="16" y="26" width="32" height="3.5" rx="1" fill="currentColor"/>
  <rect x="16" y="34" width="22" height="3.5" rx="1" fill="currentColor"/>
  <path d="M40 40L50 40" stroke="var(--ic-s,#c63b2f)" stroke-width="2.5" stroke-linecap="round"/>
</symbol>
<symbol id="ic-anahtar" viewBox="0 0 64 64">
  <circle cx="18" cy="32" r="10" fill="none" stroke="currentColor" stroke-width="5"/>
  <rect x="27" y="29.5" width="30" height="5" rx="1" fill="currentColor"/>
  <rect x="44" y="34" width="4" height="8" fill="currentColor"/>
  <rect x="52" y="34" width="4" height="6" fill="currentColor"/>
</symbol>
<symbol id="ic-lup" viewBox="0 0 64 64">
  <path d="M18 20H46L50 42H14Z" fill="currentColor"/>
  <ellipse cx="32" cy="20" rx="14" ry="5" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="2.5"/>
  <ellipse cx="32" cy="42" rx="19" ry="6" fill="currentColor"/>
  <ellipse cx="32" cy="42" rx="13" ry="3.5" fill="var(--ic-bg,#ece6d7)" opacity=".5"/>
  <ellipse cx="27" cy="41" rx="4" ry="1.5" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-otobus" viewBox="0 0 64 64">
  <rect x="6" y="18" width="52" height="30" rx="4" fill="currentColor"/>
  <rect x="10" y="22" width="11" height="11" rx="1" fill="var(--ic-bg,#ece6d7)"/>
  <rect x="25" y="22" width="14" height="11" rx="1" fill="var(--ic-bg,#ece6d7)"/>
  <rect x="43" y="22" width="11" height="11" rx="1" fill="var(--ic-bg,#ece6d7)"/>
  <circle cx="18" cy="50" r="5" fill="currentColor"/>
  <circle cx="46" cy="50" r="5" fill="currentColor"/>
  <circle cx="18" cy="50" r="2" fill="var(--ic-bg,#ece6d7)"/>
  <circle cx="46" cy="50" r="2" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M54 6a5 5 0 1 0 4 8a4 4 0 0 1-4-8Z" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-hapsetti" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="19" fill="currentColor"/>
  <circle cx="32" cy="32" r="14.5" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M32 32L24.5 30.7M32 32L40 36.6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="2" fill="currentColor"/>
  <rect x="14" y="6" width="3.5" height="52" fill="currentColor"/>
  <rect x="25" y="6" width="3.5" height="52" fill="currentColor"/>
  <rect x="36" y="6" width="3.5" height="52" fill="currentColor"/>
  <rect x="47" y="6" width="3.5" height="52" fill="currentColor"/>
</symbol>
<symbol id="ic-cay" viewBox="0 0 64 64">
  <path d="M22 10H42L40 25Q36 31 40 37L42 52H22L24 37Q28 31 24 25Z" fill="currentColor"/>
  <path d="M26 22H38L37 26Q34 31 37 36L38 48H26L27 36Q30 31 27 26Z" fill="var(--ic-a,#c9a45c)"/>
  <ellipse cx="32" cy="56" rx="17" ry="4" fill="currentColor"/>
</symbol>
<symbol id="ic-fis" viewBox="0 0 64 64">
  <path d="M18 8H46V48L42 52L38 48L34 52L30 48L26 52L22 48L18 52Z" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
  <rect x="24" y="16" width="16" height="3" fill="currentColor"/>
  <rect x="24" y="24" width="16" height="3" fill="currentColor"/>
  <rect x="24" y="32" width="10" height="3" fill="currentColor"/>
  <rect x="36" y="38" width="4" height="4" fill="var(--ic-s,#c63b2f)"/>
</symbol>
<symbol id="ic-eller" viewBox="0 0 64 64">
  <path d="M8 34H26V56Q17 60 8 56ZM9 20h3.5v16H9ZM14 14h3.5v22H14ZM19 16h3.5v20H19ZM24 20h3v16h-3ZM4 36h4.5v12H4Z" fill="currentColor"/>
  <path d="M38 34H56V56Q47 60 38 56ZM51.5 20H55v16h-3.5ZM46.5 14H50v22h-3.5ZM41.5 16H45v20h-3.5ZM37 20h3v16h-3ZM55.5 36H60v12h-4.5Z" fill="currentColor"/>
  <circle cx="16" cy="44" r="3" fill="var(--ic-bg,#ece6d7)" opacity=".35"/>
  <circle cx="48" cy="46" r="3" fill="var(--ic-bg,#ece6d7)" opacity=".35"/>
</symbol>
<symbol id="ic-kol-saati" viewBox="0 0 64 64">
  <rect x="24" y="4" width="16" height="56" rx="4" fill="currentColor"/>
  <path d="M28 8H36M28 56H36" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
  <circle cx="32" cy="32" r="15" fill="currentColor"/>
  <circle cx="32" cy="32" r="11.5" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M32 32L26 31M32 32L38.5 35.7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="1.6" fill="currentColor"/>
  <rect x="47" y="30" width="3" height="4" fill="currentColor"/>
</symbol>
<symbol id="ic-mekanizma" viewBox="0 0 64 64">
  <g fill="currentColor">
    <rect x="29" y="6" width="6" height="12" rx="1"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(45 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(90 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(135 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(180 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(225 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(270 32 32)"/>
    <rect x="29" y="6" width="6" height="12" rx="1" transform="rotate(315 32 32)"/>
    <circle cx="32" cy="32" r="17"/>
  </g>
  <circle cx="32" cy="32" r="6" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-surcme" viewBox="0 0 64 64">
  <path d="M14 10H50Q58 10 58 18V36Q58 44 50 44H30L18 56V44H14Q6 44 6 36V18Q6 10 14 10Z" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3"/>
  <rect x="16" y="20" width="20" height="4" rx="1" fill="currentColor"/>
  <path d="M14 18L39 26" stroke="var(--ic-s,#c63b2f)" stroke-width="3" stroke-linecap="round"/>
  <rect x="16" y="31" width="30" height="4" rx="1" fill="currentColor"/>
</symbol>
<symbol id="ic-kutu" viewBox="0 0 64 64">
  <rect x="14" y="28" width="36" height="26" rx="2" fill="currentColor"/>
  <path d="M10 30Q32 14 54 30Q32 38 10 30Z" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="32" cy="18" r="5" fill="currentColor"/>
  <path d="M27 18Q22 12 24 8M37 18Q42 12 40 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</symbol>
<symbol id="ic-anlatici" viewBox="0 0 64 64">
  <path d="M8 28Q32 50 56 28" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  <path d="M20 39L16 47M32 42L32 51M44 39L48 47" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</symbol>
<symbol id="ic-saat" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="24" fill="currentColor"/>
  <circle cx="32" cy="32" r="19" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M32 32L21.5 30.2M32 32L42.5 38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="2.5" fill="currentColor"/>
  <path d="M32 15V18M49 32H46M32 49V46M15 32H18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
</symbol>
<symbol id="ic-soru" viewBox="0 0 64 64">
  <path d="M21 22Q21 9 32 9Q43 9 43 20Q43 28 33 32V41" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
  <circle cx="33" cy="53" r="4.5" fill="currentColor"/>
</symbol>
<symbol id="ic-kalp" viewBox="0 0 64 64">
  <path d="M32 56C10 40 6 24 18 16Q28 12 32 22Q36 12 46 16C58 24 54 40 32 56Z" fill="currentColor"/>
</symbol>
<symbol id="ic-pencere" viewBox="0 0 64 64">
  <rect x="10" y="8" width="44" height="48" rx="2" fill="currentColor"/>
  <rect x="15" y="13" width="15" height="17" fill="var(--ic-bg,#ece6d7)"/>
  <rect x="34" y="13" width="15" height="17" fill="var(--ic-bg,#ece6d7)"/>
  <rect x="15" y="34" width="15" height="17" fill="var(--ic-bg,#ece6d7)"/>
  <rect x="34" y="34" width="15" height="17" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M44 16a5 5 0 1 0 4 7a4 4 0 0 1-4-7Z" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-kepenk" viewBox="0 0 64 64">
  <rect x="8" y="6" width="48" height="52" rx="2" fill="currentColor"/>
  <path d="M12 14H52M12 22H52M12 30H52M12 38H52M12 46H52" stroke="var(--ic-bg,#ece6d7)" stroke-width="3"/>
  <rect x="26" y="50" width="12" height="4" rx="2" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-usta" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="12" fill="currentColor"/>
  <path d="M22 16Q32 8 42 16" fill="none" stroke="var(--ic-bg,#ece6d7)" stroke-width="2" opacity=".5"/>
  <circle cx="41" cy="22" r="5.5" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="41" cy="22" r="3" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M46 20L52 16" stroke="var(--ic-a,#c9a45c)" stroke-width="2.5" stroke-linecap="round"/>
</symbol>
<symbol id="ic-kenan" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="21" r="12" fill="currentColor"/>
  <path d="M19 39L32 60L45 39L32 46Z" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M19 39L14 60M45 39L50 60" fill="none" stroke="var(--ic-bg,#ece6d7)" stroke-width="2.5" opacity=".7"/>
</symbol>
<symbol id="ic-selma" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <path d="M18 24Q18 6 32 6Q46 6 46 24L48 34Q32 30 16 34Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="9" fill="var(--ic-bg,#ece6d7)" opacity=".35"/>
  <rect x="22" y="46" width="20" height="14" rx="2" fill="var(--ic-bg,#ece6d7)" opacity=".85"/>
  <path d="M26 46V40M38 46V40" stroke="var(--ic-bg,#ece6d7)" stroke-width="2" opacity=".85"/>
</symbol>
<symbol id="ic-umut" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="12" fill="currentColor"/>
  <path d="M16 44h13v16H16ZM35 44h13v16H35Z" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M18 44v-5M22 44v-7M26 44v-5M38 44v-5M42 44v-7M46 44v-5" stroke="var(--ic-bg,#ece6d7)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="22" cy="52" r="3" fill="currentColor"/>
  <circle cx="42" cy="51" r="3.5" fill="currentColor"/>
  <circle cx="26" cy="57" r="2" fill="currentColor"/>
</symbol>
<symbol id="ic-bos-cerceve" viewBox="0 0 64 64">
  <rect x="8" y="6" width="48" height="52" rx="2" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 4"/>
  <path d="M26 36H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/>
</symbol>
<symbol id="ic-maske" viewBox="0 0 64 64">
  <path d="M12 10Q32 2 52 10Q56 40 32 58Q8 40 12 10Z" fill="currentColor"/>
  <ellipse cx="23" cy="26" rx="6" ry="4" fill="var(--ic-bg,#ece6d7)"/>
  <ellipse cx="41" cy="26" rx="6" ry="4" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M20 40Q32 52 44 40Q32 45 20 40Z" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-kese" viewBox="0 0 64 64">
  <path d="M24 20Q32 8 40 20L52 42Q52 58 32 58Q12 58 12 42Z" fill="currentColor"/>
  <rect x="25" y="16" width="14" height="6" rx="2" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M26 10H38" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  <circle cx="32" cy="42" r="8" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="32" cy="42" r="3" fill="currentColor"/>
</symbol>
<symbol id="ic-yumruk" viewBox="0 0 64 64">
  <path d="M14 34Q14 24 21 24Q25 16 31 22Q36 16 41 22Q47 18 49 26Q54 28 52 38L50 46Q50 58 36 58H26Q14 58 14 46Z" fill="currentColor"/>
  <path d="M24 26V36M33 24V36M42 25V36" stroke="var(--ic-bg,#ece6d7)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M14 42Q22 40 30 44Q24 52 14 50" fill="var(--ic-bg,#ece6d7)" opacity=".35"/>
</symbol>
<symbol id="ic-saat-kurdele" viewBox="0 0 64 64">
  <circle cx="32" cy="38" r="20" fill="currentColor"/>
  <circle cx="32" cy="38" r="15.5" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M32 38L24 36.6M32 38L39.5 42.3" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="38" r="2" fill="currentColor"/>
  <path d="M32 16Q20 4 16 12Q18 20 32 16Q44 4 48 12Q46 20 32 16Z" fill="var(--ic-s,#c63b2f)"/>
  <circle cx="32" cy="16" r="3.5" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-saat-isleyen" viewBox="0 0 64 64">
  <circle cx="28" cy="34" r="20" fill="currentColor"/>
  <circle cx="28" cy="34" r="15.5" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M28 34L22 26M28 34L38 27" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <circle cx="28" cy="34" r="2" fill="var(--ic-a,#c9a45c)"/>
  <path d="M52 22Q60 34 52 46M57 14Q68 34 57 54" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".8"/>
</symbol>
<symbol id="ic-iki-el" viewBox="0 0 64 64">
  <g fill="currentColor">
    <rect x="2" y="24" width="16" height="12" rx="2"/><rect x="17" y="21" width="11" height="3.5" rx="1.5"/><rect x="17" y="26" width="13" height="3.5" rx="1.5"/><rect x="17" y="31" width="11" height="3.5" rx="1.5"/><rect x="12" y="17" width="4" height="8" rx="2"/>
    <rect x="46" y="30" width="16" height="12" rx="2"/><rect x="36" y="27" width="11" height="3.5" rx="1.5"/><rect x="34" y="32" width="13" height="3.5" rx="1.5"/><rect x="36" y="37" width="11" height="3.5" rx="1.5"/><rect x="48" y="41" width="4" height="8" rx="2"/>
  </g>
</symbol>
<symbol id="ic-palto" viewBox="0 0 64 64">
  <path d="M20 14L32 10L44 14L52 54H12Z" fill="currentColor"/>
  <path d="M26 12Q32 24 38 12" fill="none" stroke="var(--ic-a,#c9a45c)" stroke-width="5" stroke-linecap="round"/>
  <path d="M32 24V54" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
  <circle cx="36" cy="32" r="1.8" fill="var(--ic-bg,#ece6d7)"/><circle cx="36" cy="40" r="1.8" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-kapot" viewBox="0 0 64 64">
  <path d="M20 14L32 10L44 14L52 54H12Z" fill="currentColor"/>
  <path d="M30 28h10v9H30ZM18 40h8v8h-8Z" fill="var(--ic-bg,#ece6d7)" opacity=".7"/>
  <path d="M30 28h10v9H30ZM18 40h8v8h-8Z" fill="none" stroke="var(--ic-s,#c63b2f)" stroke-width="1.5" stroke-dasharray="2 2"/>
  <path d="M44 20L50 50" stroke="var(--ic-bg,#ece6d7)" stroke-width="1.5" stroke-dasharray="3 3"/>
</symbol>
<symbol id="ic-harf" viewBox="0 0 64 64">
  <rect x="12" y="8" width="40" height="48" rx="2" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3"/>
  <path d="M24 46L32 20L40 46M27 37H37" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="ic-kardes" viewBox="0 0 64 64">
  <circle cx="22" cy="20" r="8" fill="currentColor"/><path d="M6 50Q6 32 22 32Q30 32 34 38L30 50Z" fill="currentColor"/>
  <circle cx="44" cy="24" r="7" fill="currentColor" opacity=".7"/><path d="M34 52Q34 36 44 36Q58 36 58 52Z" fill="currentColor" opacity=".7"/>
</symbol>
<symbol id="ic-ruzgar" viewBox="0 0 64 64">
  <path d="M8 24H40a6 6 0 1 0-6-6M8 34H50a6 6 0 1 1-6 6M8 44H30a5 5 0 1 1-5 5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</symbol>
<symbol id="ic-merdiven" viewBox="0 0 64 64">
  <path d="M8 56H20V44H32V32H44V20H56V8" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>
  <path d="M8 56L56 8" stroke="currentColor" stroke-width="2" opacity=".3"/>
</symbol>
<symbol id="ic-tirnak" viewBox="0 0 64 64">
  <path d="M22 58V30Q22 14 32 14Q42 14 42 30V58Z" fill="currentColor"/>
  <path d="M26 22Q32 12 38 22Q40 30 32 32Q24 30 26 22Z" fill="var(--ic-a,#c9a45c)"/>
  <path d="M28 24Q32 20 36 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>
</symbol>
<symbol id="ic-mum" viewBox="0 0 64 64">
  <rect x="24" y="26" width="16" height="30" rx="2" fill="currentColor"/>
  <path d="M28 56H36" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
  <path d="M32 24V18" stroke="currentColor" stroke-width="2"/>
  <path d="M32 6Q40 14 32 20Q24 14 32 6Z" fill="var(--ic-a,#c9a45c)"/>
  <ellipse cx="32" cy="58" rx="16" ry="4" fill="currentColor" opacity=".6"/>
</symbol>
<symbol id="ic-meydan" viewBox="0 0 64 64">
  <path d="M4 50H60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <rect x="30" y="18" width="4" height="32" fill="currentColor"/>
  <rect x="25" y="10" width="14" height="10" rx="2" fill="currentColor"/>
  <rect x="28" y="12" width="8" height="6" fill="var(--ic-a,#c9a45c)"/>
  <path d="M8 44Q16 40 24 44M40 44Q48 40 56 44" fill="none" stroke="currentColor" stroke-width="2" opacity=".4"/>
</symbol>
<symbol id="ic-biyik" viewBox="0 0 64 64">
  <path d="M32 30Q24 20 14 26Q6 32 12 38Q20 42 32 32Q44 42 52 38Q58 32 50 26Q40 20 32 30Z" fill="currentColor"/>
</symbol>
<symbol id="ic-komiser" viewBox="0 0 64 64">
  <path d="M10 36Q32 22 54 36V44H10Z" fill="currentColor"/>
  <path d="M6 44H58V50H6Z" fill="currentColor"/>
  <circle cx="32" cy="34" r="5" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-general" viewBox="0 0 64 64">
  <path d="M8 54Q8 38 24 36Q32 40 40 36Q56 38 56 54Z" fill="currentColor"/>
  <circle cx="32" cy="20" r="11" fill="currentColor"/>
  <rect x="8" y="36" width="16" height="7" rx="2" fill="var(--ic-a,#c9a45c)"/><rect x="40" y="36" width="16" height="7" rx="2" fill="var(--ic-a,#c9a45c)"/>
  <circle cx="32" cy="48" r="2" fill="var(--ic-a,#c9a45c)"/>
</symbol>
<symbol id="ic-ates" viewBox="0 0 64 64">
  <rect x="26" y="6" width="12" height="40" rx="6" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3"/>
  <rect x="30" y="18" width="4" height="26" fill="var(--ic-s,#c63b2f)"/>
  <circle cx="32" cy="50" r="9" fill="var(--ic-s,#c63b2f)"/>
  <path d="M42 16h6M42 24h6M42 32h6" stroke="currentColor" stroke-width="2"/>
</symbol>
<symbol id="ic-hayalet" viewBox="0 0 64 64">
  <path d="M14 56V30Q14 10 32 10Q50 10 50 30V56L44 50L38 56L32 50L26 56L20 50Z" fill="currentColor"/>
  <circle cx="25" cy="28" r="3.5" fill="var(--ic-bg,#ece6d7)"/><circle cx="39" cy="28" r="3.5" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-curuk" viewBox="0 0 64 64">
  <path d="M10 12H54V52H40L36 44L30 52H10Z" fill="currentColor"/>
  <path d="M22 20L28 30L22 36M40 24L34 30L42 40" fill="none" stroke="var(--ic-bg,#ece6d7)" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="18" cy="44" r="2" fill="var(--ic-bg,#ece6d7)"/><circle cx="48" cy="20" r="2" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-usul" viewBox="0 0 64 64">
  <rect x="12" y="8" width="40" height="48" rx="2" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="3"/>
  <path d="M20 20h24M20 28h24M20 36h14" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="40" cy="44" r="7" fill="none" stroke="var(--ic-s,#c63b2f)" stroke-width="2.5"/>
</symbol>
<symbol id="ic-goz" viewBox="0 0 64 64">
  <path d="M6 32Q32 8 58 32Q32 56 6 32Z" fill="currentColor"/>
  <circle cx="32" cy="32" r="10" fill="var(--ic-bg,#ece6d7)"/><circle cx="32" cy="32" r="5" fill="currentColor"/>
</symbol>
<symbol id="ic-masa" viewBox="0 0 64 64">
  <rect x="6" y="26" width="52" height="6" rx="1" fill="currentColor"/>
  <rect x="10" y="32" width="5" height="24" fill="currentColor"/><rect x="49" y="32" width="5" height="24" fill="currentColor"/>
  <rect x="34" y="32" width="18" height="12" fill="currentColor" opacity=".5"/>
  <rect x="18" y="18" width="16" height="8" rx="1" fill="var(--ic-bg,#ece6d7)" stroke="currentColor" stroke-width="2"/>
</symbol>
<symbol id="ic-p-petrovic" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="12" fill="currentColor"/>
  <circle cx="27" cy="22" r="3" fill="var(--ic-bg,#ece6d7)"/><path d="M34 22h6" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
  <path d="M46 44L58 30" stroke="var(--ic-a,#c9a45c)" stroke-width="2.5" stroke-linecap="round"/><circle cx="57" cy="31" r="2" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-p-general" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="12" fill="currentColor"/>
  <rect x="8" y="40" width="14" height="6" rx="2" fill="var(--ic-a,#c9a45c)"/><rect x="42" y="40" width="14" height="6" rx="2" fill="var(--ic-a,#c9a45c)"/>
  <path d="M32 44v14" stroke="var(--ic-bg,#ece6d7)" stroke-width="2" opacity=".6"/>
</symbol>
<symbol id="ic-p-bekci" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="24" r="11" fill="currentColor"/>
  <path d="M18 18Q32 4 46 18L46 24H18Z" fill="currentColor"/>
  <path d="M18 24H46" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
  <rect x="26" y="44" width="12" height="4" fill="var(--ic-bg,#ece6d7)" opacity=".6"/>
</symbol>
<symbol id="ic-p-katip" viewBox="0 0 64 64">
  <path d="M8 60Q8 42 24 39Q32 43 40 39Q56 42 56 60Z" fill="currentColor"/>
  <circle cx="32" cy="22" r="12" fill="currentColor"/>
  <path d="M40 58L54 38" stroke="var(--ic-bg,#ece6d7)" stroke-width="3" stroke-linecap="round"/><path d="M54 38l3-5" stroke="var(--ic-a,#c9a45c)" stroke-width="3" stroke-linecap="round"/>
</symbol>
<symbol id="ic-liman" viewBox="0 0 64 64">
  <circle cx="32" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="4"/>
  <path d="M32 17V54M20 30h24M12 40q20 26 40 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
</symbol>
<symbol id="ic-baskent" viewBox="0 0 64 64">
  <path d="M32 4L36 20H28Z" fill="currentColor"/>
  <rect x="26" y="20" width="12" height="36" fill="currentColor"/>
  <rect x="8" y="34" width="14" height="22" fill="currentColor"/><rect x="42" y="30" width="14" height="26" fill="currentColor"/>
  <path d="M12 40h6M12 48h6M46 36h6M46 44h6M30 28h4M30 36h4" stroke="var(--ic-bg,#ece6d7)" stroke-width="2"/>
</symbol>
<symbol id="ic-dag-ikon" viewBox="0 0 64 64">
  <path d="M4 54L24 20L36 40L44 28L60 54Z" fill="currentColor"/>
  <path d="M24 20L19 30H29Z" fill="var(--ic-bg,#ece6d7)"/>
</symbol>
<symbol id="ic-koy" viewBox="0 0 64 64">
  <path d="M12 32L32 14L52 32Z" fill="currentColor"/>
  <rect x="18" y="32" width="28" height="22" fill="currentColor"/>
  <rect x="28" y="40" width="8" height="14" fill="var(--ic-bg,#ece6d7)"/>
  <path d="M4 56H60" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/>
</symbol>
<symbol id="ic-merkez" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="3"/>
  <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" stroke-width="3"/>
  <circle cx="32" cy="32" r="3" fill="currentColor"/>
  <path d="M32 4V12M32 52V60M4 32H12M52 32H60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</symbol>
<symbol id="ic-raptiye" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="20" fill="var(--ic-s,#c63b2f)"/>
  <circle cx="26" cy="26" r="7" fill="#fff" opacity=".35"/>
</symbol>
</svg>`); };
  if (document.body) put(); else document.addEventListener("DOMContentLoaded", put);
})();
