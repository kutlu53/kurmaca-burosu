/* Çalıştır: node test/verify-data.js .   — data/case-01.js ile prototip-v1.html verisini karşılaştırır, yeni alanları denetler */
const fs=require("fs"),vm=require("vm");
const root=process.argv[2];
const html=fs.readFileSync(root+"/prototip-v1.html","utf8");
const s=html.indexOf("<script>")+8, e=html.indexOf("/* ================= DURUM");
const v1={};vm.createContext(v1);vm.runInContext(html.slice(s,e)+";this.CASE=CASE;this.TYPES=TYPES;this.GRADES=GRADES;",v1);
const w={window:{}};w.window=w;vm.createContext(w);vm.runInContext(fs.readFileSync(root+"/data/case-01.js","utf8"),w);
const v2=w.CASES[0], errs=[];
const same=(a,b,name)=>{if(JSON.stringify(a)!==JSON.stringify(b))errs.push("FARK: "+name)};
same(v1.CASE.story,v2.story,"story");
same(v1.CASE.flatReader,v2.flatReader,"flatReader");
same(v1.CASE.epilog,v2.epilog,"epilog");
same(v1.CASE.centerFlow,v2.centerFlow,"centerFlow");
same(v1.CASE.redHerring,v2.redHerring,"redHerring");
same(v1.CASE.brief,v2.briefLong,"briefLong");
same(v1.CASE.location.need,v2.location.need,"location.need");
same(v1.CASE.location.q,v2.location.q,"location.q");
same(v1.CASE.location.options.map(o=>({id:o.id,t:o.t})),v2.location.options.map(o=>({id:o.id,t:o.t})),"location.options");
same(v1.CASE.location.lesson,v2.location.lesson,"location.lesson");
same(v1.CASE.final.evidence,v2.final.evidence,"final.evidence");
for(const k of["who","why","center"]){same(v1.CASE.final[k].q,v2.final[k].q,"final."+k+".q");same(v1.CASE.final[k].answer,v2.final[k].answer,"final."+k+".answer");
 same(v1.CASE.final[k].options.map(({id,t,grade,note})=>({id,t,grade,note})),v2.final[k].options.map(({id,t,grade,note})=>({id,t,grade,note})),"final."+k+".options");}
// clues
const ids1=Object.keys(v1.CASE.clues),ids2=Object.keys(v2.clues);
same(ids1,ids2,"clue ids");
for(const id of ids1){const a=v1.CASE.clues[id],b=v2.clues[id];
 // v2'de yedinci tür "anlatici": v1'de "diyalog" idi
 same({label:a.label,tag:a.tag,src:a.src},{label:b.label,tag:b.tag==="anlatici"?"diyalog":b.tag,src:b.src},"clue "+id);
 for(const f of["short","art","caption"])if(!b[f])errs.push("EKSİK "+f+": "+id);
 if(b.short&&b.short.split(/\s+/).length>3)errs.push("short >3 kelime: "+id);}
// captions verbatim
const storyText=v2.story.join("\n"), answers=v2.suspects.flatMap(s=>s.qs.map(q=>q.a)).join("\n");
for(const id of ids2){const c=v2.clues[id];const src=c.src?answers:storyText;if(!src.includes(c.caption))errs.push("caption birebir değil: "+id);}
// suspects
same(v1.CASE.suspects.map(s=>({id:s.id,name:s.name,role:s.role,qs:s.qs})),v2.suspects.map(s=>({id:s.id,name:s.name,role:s.role,qs:s.qs.map(({q,a,clue})=>clue?{q,a,clue}:{q,a})})),"suspects");
// links
same(v1.CASE.links,v2.links.map(({a,b,types,grade,text})=>({a,b,types:types.filter(t=>t!=="anlatici"),grade,text})),"links (anlatici türü hariç)");
for(const l of v2.links){if(!l.short)errs.push("link short eksik: "+l.a+"-"+l.b);if(!v2.clues[l.a]||!v2.clues[l.b])errs.push("link bilinmeyen id: "+l.a+"-"+l.b);}
// scenes cover 14 text clues exactly once
const hs=v2.scenes.flatMap(s=>s.hotspots.map(h=>h.clue));
const textClues=ids2.filter(i=>!v2.clues[i].src);
if(hs.length!==14)errs.push("hotspot sayısı "+hs.length);
for(const c of textClues)if(hs.filter(x=>x===c).length!==1)errs.push("sahnede yok/çift: "+c);
for(const sc of v2.scenes)for(const h of sc.hotspots){if(h.x+h.w>100||h.y+h.h>100)errs.push("hotspot taşıyor: "+h.clue)}
// epilogShort verbatim
for(const p of v2.epilogShort)if(!v2.epilog.some(e=>e.includes(p)))errs.push("epilogShort birebir değil: "+p);
// story has 18 markers? (14 in text)
const markers=[...storyText.matchAll(/\[\[(\w+)\|/g)].map(m=>m[1]);
if(markers.length!==14)errs.push("metinde işaret sayısı "+markers.length);
console.log("ipucu:",ids2.length,"bağ:",v2.links.length,"hotspot:",hs.length,"sahne:",v2.scenes.length);
console.log(errs.length?errs.join("\n"):"TAMAM — v1 ile birebir, yeni alanlar eksiksiz.");
process.exit(errs.length?1:0);
